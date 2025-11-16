"use client";

import { createContext, useContext, useState, useCallback } from "react";

const WindowContext = createContext();

export function WindowProvider({ children }) {
    const [windows, setWindows] = useState([]);

    const openWindow = (id, title, content, iconPath) => {
        setWindows((prev) => {
            const existingWindow = prev.find((w) => w.id === id);
            if (existingWindow) {
                // Si la fenêtre existe, la remettre au premier plan et la restaurer
                return prev.map((w) =>
                    w.id === id
                        ? {
                              ...w,
                              isMinimized: false,
                              zIndex:
                                  Math.max(
                                      ...prev.map((win) => win.zIndex),
                                      0
                                  ) + 1,
                          }
                        : w
                );
            }
            // Sinon, créer une nouvelle fenêtre
            return [
                ...prev,
                {
                    id,
                    title,
                    content,
                    iconPath,
                    isMinimized: false,
                    isMaximized: false,
                    zIndex: prev.length,
                    position: { x: 0, y: 0 }, // Position initiale
                    size: { width: 700, height: 450 }, // Taille initiale (w-96 h-96)
                },
            ];
        });
    };

    const closeWindow = (id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
    };

    const minimizeWindow = (id) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
    };

    const restoreWindow = (id) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id
                    ? {
                          ...w,
                          isMinimized: false,
                          zIndex:
                              Math.max(...prev.map((win) => win.zIndex), 0) + 1,
                      }
                    : w
            )
        );
    };

    const toggleMaximize = (id) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
            )
        );
    };

    const bringToFront = (id) => {
        setWindows((prev) => {
            const maxZIndex = Math.max(...prev.map((w) => w.zIndex), 0);
            return prev.map((w) =>
                w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
            );
        });
    };

    const updateWindowPosition = useCallback((id, position) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, position } : w))
        );
    }, []);

    const updateWindowSize = useCallback((id, size) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, size } : w))
        );
    }, []);

    return (
        <WindowContext.Provider
            value={{
                windows,
                openWindow,
                closeWindow,
                minimizeWindow,
                restoreWindow,
                toggleMaximize,
                bringToFront,
                updateWindowPosition,
                updateWindowSize,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
}

export function useWindows() {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error("useWindows must be used within a WindowProvider");
    }
    return context;
}
