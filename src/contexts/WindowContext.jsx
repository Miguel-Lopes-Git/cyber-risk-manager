"use client";

import { createContext, useContext, useState, useCallback } from "react";

// Création du contexte pour la gestion des fenêtres
const WindowContext = createContext();

/**
 * Fournisseur de contexte pour gérer l'état et les actions des fenêtres.
 * Permet d'ouvrir, fermer, minimiser, restaurer et gérer l'ordre d'affichage (z-index) des fenêtres.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants qui auront accès au contexte.
 */
export function WindowProvider({ children }) {
    const [windows, setWindows] = useState([]);

    /**
     * Ouvre une nouvelle fenêtre ou restaure une fenêtre existante.
     *
     * @param {string} id - L'identifiant unique de la fenêtre.
     * @param {string} title - Le titre de la fenêtre.
     * @param {React.ReactNode} content - Le contenu à afficher dans la fenêtre.
     * @param {string} iconPath - Le chemin de l'icône associée à la fenêtre.
     */
    const openWindow = (id, title, content, iconPath) => {
        setWindows((prev) => {
            const existingWindow = prev.find((w) => w.id === id);
            if (existingWindow) {
                // Si la fenêtre existe déjà, on la restaure (si minimisée) et on la met au premier plan
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
            // Sinon, on crée une nouvelle instance de fenêtre
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
                    position: { x: 0, y: 0 }, // Position initiale par défaut
                    size: { width: 700, height: 450 }, // Taille initiale par défaut
                },
            ];
        });
    };

    /**
     * Ferme une fenêtre spécifique.
     *
     * @param {string} id - L'identifiant de la fenêtre à fermer.
     */
    const closeWindow = (id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
    };

    /**
     * Minimise une fenêtre (la cache du bureau mais la garde dans la barre des tâches).
     *
     * @param {string} id - L'identifiant de la fenêtre à minimiser.
     */
    const minimizeWindow = (id) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
    };

    /**
     * Restaure une fenêtre minimisée et la met au premier plan.
     *
     * @param {string} id - L'identifiant de la fenêtre à restaurer.
     */
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

    /**
     * Bascule l'état maximisé/restauré d'une fenêtre.
     *
     * @param {string} id - L'identifiant de la fenêtre.
     */
    const toggleMaximize = (id) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
            )
        );
    };

    /**
     * Met une fenêtre au premier plan en augmentant son z-index.
     *
     * @param {string} id - L'identifiant de la fenêtre à mettre en avant.
     */
    const bringToFront = (id) => {
        setWindows((prev) => {
            const maxZIndex = Math.max(...prev.map((w) => w.zIndex), 0);
            return prev.map((w) =>
                w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
            );
        });
    };

    /**
     * Met à jour la position d'une fenêtre (utilisé lors du déplacement).
     *
     * @param {string} id - L'identifiant de la fenêtre.
     * @param {Object} position - La nouvelle position {x, y}.
     */
    const updateWindowPosition = useCallback((id, position) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, position } : w))
        );
    }, []);

    /**
     * Met à jour la taille d'une fenêtre (utilisé lors du redimensionnement).
     *
     * @param {string} id - L'identifiant de la fenêtre.
     * @param {Object} size - La nouvelle taille {width, height}.
     */
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

/**
 * Hook personnalisé pour utiliser le contexte des fenêtres.
 *
 * @returns {Object} Le contexte des fenêtres.
 * @throws {Error} Si utilisé en dehors d'un WindowProvider.
 */
export function useWindows() {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error("useWindows must be used within a WindowProvider");
    }
    return context;
}
