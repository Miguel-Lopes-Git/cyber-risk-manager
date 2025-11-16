"use client";

import { useEffect, useRef } from "react";
import { initScreenEffect } from "@/lib/crtEffect";
import Footer from "@/components/Footer";
import Icon from "@/components/UI/Icon";
import Window from "@/components/UI/Window";
import { WindowProvider, useWindows } from "@/contexts/WindowContext";
import Player from "@/classes/Player";
import Folder from "@/components/window/Folder";
import Mail from "@/components/window/Mail";

function ComputerContent() {
    // Initialisation du joueur
    const player = new Player("John Doe", 1000);
    player.credit(500);
    console.log(
        `Le solde actuel de ${player.name} est de ${player.getSolde()}€.`
    );

    // Référence à l'écran
    const screenRef = useRef(null);
    const { windows, openWindow } = useWindows();

    useEffect(() => {
        if (typeof window !== "undefined" && screenRef.current) {
            const screen = initScreenEffect("#screen");

            // Désactiver le menu contextuel du navigateur
            const handleContextMenu = (e) => {
                e.preventDefault();
            };

            document.addEventListener("contextmenu", handleContextMenu);

            // Cleanup function
            return () => {
                // Clean up the screen effect if needed
                if (screen && screen.nodes && screen.nodes.container) {
                    screen.nodes.container.remove();
                }
                document.removeEventListener("contextmenu", handleContextMenu);
            };
        }
    }, []);

    return (
        <>
            <div id="screen" ref={screenRef}>
                {/* Grid section */}
                <div
                    className="w-full h-full relative z-10 grid gap-0 p-2"
                    style={{
                        gridTemplateColumns: "repeat(16, 1fr)",
                        gridTemplateRows: "repeat(12, 1fr)",
                    }}
                >
                    {/* Icone section */}
                    <Icon
                        className="row-start-2 row-span-2 col-start-2 col-span-2"
                        imagePath={"/images/icons/folder.png"}
                        text={"Dossiers"}
                        onClick={() =>
                            openWindow(
                                "folder",
                                "Dossiers",
                                <Folder />,
                                "/images/icons/folder.png"
                            )
                        }
                    />

                    <Icon
                        className="row-start-2 row-span-2 col-start-4 col-span-2"
                        imagePath={"/images/icons/mail.png"}
                        text={"Mail"}
                        onClick={() =>
                            openWindow(
                                "mail",
                                "Mail",
                                <Mail />,
                                "/images/icons/mail.png"
                            )
                        }
                    />

                    <Icon
                        className="row-start-2 row-span-2 col-start-6 col-span-2"
                        imagePath={"/images/icons/server.png"}
                        text={"Serveur"}
                        onClick={() =>
                            openWindow(
                                "server",
                                "Serveur",
                                <p>Contenu du serveur</p>,
                                "/images/icons/server.png"
                            )
                        }
                    />

                    <Icon
                        className="row-start-2 row-span-2 col-start-8 col-span-2"
                        imagePath={"/images/icons/shop.png"}
                        text={"Boutique"}
                        onClick={() =>
                            openWindow(
                                "shop",
                                "Boutique",
                                <p>Contenu de la boutique</p>,
                                "/images/icons/shop.png"
                            )
                        }
                    />

                    {/* Render all windows */}
                    {windows.map((window) => (
                        <Window
                            key={window.id}
                            id={window.id}
                            title={window.title}
                            className="absolute top-10 left-10"
                            isMinimized={window.isMinimized}
                            isMaximized={window.isMaximized}
                            zIndex={window.zIndex}
                            position={window.position}
                            size={window.size}
                        >
                            {window.content}
                        </Window>
                    ))}

                    {/* Footer section */}
                    <Footer className="row-end-13 col-span-full bg-gray-400" />
                </div>
            </div>
        </>
    );
}

export default function Computer() {
    return (
        <WindowProvider>
            <ComputerContent />
        </WindowProvider>
    );
}
