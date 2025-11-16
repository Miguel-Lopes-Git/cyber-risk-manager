import Image from "next/image";
import Draggable from "react-draggable";
import { useRef, useEffect, useState } from "react";
import { useWindows } from "@/contexts/WindowContext";

export default function Window({
    id,
    title,
    className,
    children,
    isMinimized,
    isMaximized,
    zIndex,
    position,
    size,
}) {
    const nodeRef = useRef(null);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null); // 'right', 'bottom', 'corner'
    const [resizeStart, setResizeStart] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const minSize = { width: 384, height: 384 }; // Taille minimale (w-96 h-96)

    const {
        closeWindow,
        minimizeWindow,
        toggleMaximize,
        bringToFront,
        updateWindowPosition,
        updateWindowSize,
    } = useWindows();

    useEffect(() => {
        const updateBounds = () => {
            const screenElement = document.getElementById("screen");
            const windowElement = nodeRef.current;

            if (screenElement && windowElement) {
                const screenRect = screenElement.getBoundingClientRect();
                const windowRect = windowElement.getBoundingClientRect();

                // Calculer les limites pour que la fenêtre ne puisse sortir que de la moitié max
                setBounds({
                    left: -windowRect.width / 2,
                    top: 0,
                    right: screenRect.width - windowRect.width / 2,
                    bottom: screenRect.height - windowRect.height / 2,
                });
            }
        };

        // Mettre à jour les limites au montage et lors du redimensionnement
        updateBounds();
        window.addEventListener("resize", updateBounds);

        return () => window.removeEventListener("resize", updateBounds);
    }, [isMaximized, size]);

    // Gestion du redimensionnement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const screenElement = document.getElementById("screen");
            if (!screenElement) return;

            const screenRect = screenElement.getBoundingClientRect();
            const maxWidth = screenRect.width;
            const maxHeight = screenRect.height - 64; // Moins la hauteur du footer (4rem = 64px)

            const deltaX = e.clientX - resizeStart.x;
            const deltaY = e.clientY - resizeStart.y;

            let newWidth = resizeStart.width;
            let newHeight = resizeStart.height;

            // Redimensionner selon la direction
            if (resizeDirection === "right" || resizeDirection === "corner") {
                newWidth = Math.max(minSize.width, resizeStart.width + deltaX);
                newWidth = Math.min(newWidth, maxWidth);
            }

            if (resizeDirection === "bottom" || resizeDirection === "corner") {
                newHeight = Math.max(
                    minSize.height,
                    resizeStart.height + deltaY
                );
                newHeight = Math.min(newHeight, maxHeight);
            }

            updateWindowSize(id, { width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setResizeDirection(null);
        };

        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, resizeStart, resizeDirection, id, updateWindowSize]);

    const handleResizeStart = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height,
        });
        bringToFront(id);
    };

    if (isMinimized) {
        return null;
    }

    const windowStyle = isMaximized
        ? "!absolute !top-4 !left-0 !w-full !h-[calc(100%-6.5rem)] !transform-none"
        : "";

    return (
        <Draggable
            handle=".header"
            nodeRef={nodeRef}
            bounds={bounds}
            disabled={isMaximized}
            position={position}
            onStart={() => {
                bringToFront(id);
            }}
            onStop={(e, data) => {
                updateWindowPosition(id, { x: data.x, y: data.y });
            }}
        >
            <div
                ref={nodeRef}
                className={`${className} ${windowStyle}`}
                style={{
                    zIndex,
                    width: isMaximized ? undefined : `${size.width}px`,
                    height: isMaximized ? undefined : `${size.height}px`,
                }}
                onMouseDown={() => bringToFront(id)}
            >
                {/* Window controls */}
                <div
                    className={`w-full h-10 bg-blue-500 flex justify-between items-center header cursor-move ${
                        isMaximized ? " px-8" : "px-2"
                    }`}
                >
                    <h2 className="text-2xl text-white select-none">{title}</h2>
                    <div className="flex gap-2 select-none">
                        <button
                            className="bg-blue-600 p-1 border-2 border-white rounded-lg hover:bg-blue-700"
                            onClick={() => minimizeWindow(id)}
                        >
                            <Image
                                src={"/images/window/reduce.png"}
                                width={20}
                                height={20}
                                alt="reduce window button"
                            />
                        </button>
                        <button
                            className="bg-blue-600 p-1 border-2 border-white rounded-lg hover:bg-blue-700"
                            onClick={() => toggleMaximize(id)}
                        >
                            <Image
                                src={"/images/window/fullscreen.png"}
                                width={20}
                                height={20}
                                alt="fullscreen window button"
                            />
                        </button>
                        <button
                            className="bg-red-500 p-1 border-2 border-white rounded-lg hover:bg-red-600"
                            onClick={() => closeWindow(id)}
                        >
                            <Image
                                src={"/images/window/close.png"}
                                width={20}
                                height={20}
                                alt="close window button"
                            />
                        </button>
                    </div>
                </div>

                {/* Window content */}
                <div
                    className={`bg-[#e0dbba] w-full overflow-auto ${
                        isMaximized ? "px-6" : ""
                    }`}
                    style={{ height: "calc(100% - 2.5rem)" }}
                    onMouseDown={() => bringToFront(id)}
                >
                    {children}
                </div>

                {/* Resize handles */}
                {!isMaximized && (
                    <>
                        {/* Bord droit - redimensionner la largeur */}
                        <div
                            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize"
                            onMouseDown={(e) => handleResizeStart(e, "right")}
                        />

                        {/* Bord bas - redimensionner la hauteur */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize"
                            onMouseDown={(e) => handleResizeStart(e, "bottom")}
                        />

                        {/* Coin inférieur droit - redimensionner largeur et hauteur */}
                        <div
                            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
                            onMouseDown={(e) => handleResizeStart(e, "corner")}
                        />
                    </>
                )}
            </div>
        </Draggable>
    );
}
