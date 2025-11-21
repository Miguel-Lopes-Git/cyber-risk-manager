"use client";

import { use, useEffect, useRef, useState } from "react";
import { initScreenEffect } from "@/lib/crtEffect";
import { WindowProvider, useWindows } from "@/contexts/WindowContext";
import Image from "next/image";
import Footer from "@/components/Footer";
import Icon from "@/components/UI/Icon";
import Window from "@/components/UI/Window";
import Player from "@/classes/Player";
import Folder from "@/components/window/Folder";
import Mail from "@/components/window/Mail";
import Catalogue from "@/components/window/Catalogue";
import ServerWindow from "@/components/window/ServerWindow";

/**
 * Composant principal du contenu de l'ordinateur.
 * Gère l'écran de connexion, le bureau, les icônes et les fenêtres.
 *
 * @returns {JSX.Element} Le contenu de l'interface de l'ordinateur.
 */
function ComputerContent() {
    // États pour la gestion de la connexion et du joueur
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [player, setPlayer] = useState(new Player("", 0));

    /**
     * Gère la tentative de connexion de l'utilisateur.
     * Vérifie les champs et initialise le joueur.
     */
    function handleLogin() {
        // Vérification basique des champs
        if (!username && !password) {
            setLoginError(
                "Veuillez entrer un nom d'utilisateur et un mot de passe."
            );
            return;
        }
        // Initialisation du joueur avec un solde de départ
        player.setName(username);
        player.credit(5000);
        console.log(
            `Le solde actuel de ${player.name} est de ${player.getSolde()}€.`
        );
        setIsLoggedIn(true);
    }

    // Référence à l'élément DOM de l'écran pour l'effet CRT
    const screenRef = useRef(null);
    // Utilisation du contexte des fenêtres pour gérer l'ouverture/fermeture
    const { windows, openWindow } = useWindows();

    /**
     * Effet pour initialiser l'effet CRT et gérer le menu contextuel.
     */
    useEffect(() => {
        if (typeof window !== "undefined" && screenRef.current) {
            const screen = initScreenEffect("#screen");

            // Désactive le menu contextuel par défaut du navigateur pour une immersion totale
            const handleContextMenu = (e) => {
                e.preventDefault();
            };

            document.addEventListener("contextmenu", handleContextMenu);

            // Nettoyage lors du démontage du composant
            return () => {
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
                {/* Écran de connexion */}
                {!isLoggedIn && (
                    <div className="absolute top-0 left-0 w-full h-full bg-opacity-80 z-50 flex flex-col justify-center items-center">
                        <Image
                            src="/images/login-image.webp"
                            alt="Login"
                            width={200}
                            height={200}
                            className="border-6 border-blue-600 rounded-lg"
                        />
                        <h1 className="text-white text-4xl my-4">Connexion</h1>

                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nom d'utilisateur"
                            className="w-50 h-12 p-2 text-2xl border-4 border-black bg-gray-300 rounded-lg mb-2"
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                            className="w-50 h-12 p-2 text-2xl border-4 border-black bg-gray-300 rounded-lg mb-2"
                        />
                        {loginError && (
                            <p className="text-red-500 mb-2 text-3xl font-bold">
                                {loginError}
                            </p>
                        )}
                        <button
                            className="w-50 text-2xl cursor-pointer px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleLogin}
                        >
                            Se connecter
                        </button>
                    </div>
                )}

                {/* Bureau (affiché une fois connecté) */}
                {isLoggedIn && (
                    <div
                        className="w-full h-full relative z-10 grid gap-0 p-2"
                        style={{
                            gridTemplateColumns: "repeat(16, 1fr)",
                            gridTemplateRows: "repeat(12, 1fr)",
                        }}
                    >
                        {/* Section des icônes du bureau */}
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
                        />{" "}
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
                                    <ServerWindow Player={player} />,
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
                        <Icon
                            className="row-start-2 row-span-2 col-start-10 col-span-2"
                            imagePath={"/images/icons/shop.png"}
                            text={"Catalogue"}
                            onClick={() =>
                                openWindow(
                                    "catalogue",
                                    "Catalogue Composants",
                                    <Catalogue />,
                                    "/images/icons/shop.png"
                                )
                            }
                        />
                        {/* Rendu de toutes les fenêtres ouvertes */}
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
                        {/* Barre des tâches (Footer) */}
                        <Footer className="z-100 row-end-13 col-span-full bg-gray-400" />
                    </div>
                )}
            </div>
        </>
    );
}

/**
 * Page principale de l'ordinateur.
 * Enveloppe le contenu dans le fournisseur de contexte des fenêtres.
 *
 * @returns {JSX.Element} La page Computer.
 */
export default function Computer() {
    return (
        <WindowProvider>
            <ComputerContent />
        </WindowProvider>
    );
}
