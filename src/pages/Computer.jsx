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
import ServerWindow from "@/components/window/ServerWindow";
import Browser from "@/components/window/Browser";
import InventoryWindow from "@/components/window/InventoryWindow";
import IaPannel from "@/components/UI/IaPannel";
import BootScreen from "@/components/UI/BootScreen";
import AuthScreen from "@/components/UI/AuthScreen";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { supabase } from "@/lib/supabase";

/**
 * Composant principal du contenu de l'ordinateur.
 * Gère l'écran de connexion, le bureau, les icônes et les fenêtres.
 *
 * @returns {JSX.Element} Le contenu de l'interface de l'ordinateur.
 */
function ComputerContent() {
    // États pour la gestion de la connexion et du joueur
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [player, setPlayer] = useState(new Player("", 0));
    const [showIaPanel, setShowIaPanel] = useState(false);
    const [isBooting, setIsBooting] = useState(true);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [autoLoginName, setAutoLoginName] = useState(null);
    const [mails, setMails] = useState([]);

    /**
     * Gère la connexion réussie (depuis AuthScreen ou session existante).
     */
    const handleLoginSuccess = (username) => {
        player.setName(username);
        player.credit(5000); // TODO: Récupérer le vrai solde depuis la DB si possible
        console.log(
            `Le solde actuel de ${player.name} est de ${player.getSolde()}€.`
        );
        setIsLoggedIn(true);
    };

    // -------------------------------------------------------------------------
    // LOGIQUE DE JEU (Offres & Revenus)
    // -------------------------------------------------------------------------

    // Génération d'offres périodiques
    useEffect(() => {
        if (!isLoggedIn) return;

        const generateOffer = () => {
            const types = ["WEB", "GAME", "DB", "CLOUD"];
            const type = types[Math.floor(Math.random() * types.length)];
            const id = Date.now();

            // Difficulté / Niveau (basique pour l'instant)
            const cpuReq = Math.floor(Math.random() * 10) + 1; // 1-10 pts
            const ramReq = Math.floor(Math.random() * 8) + 1; // 1-8 GB
            const storageReq = Math.floor(Math.random() * 100) + 10; // 10-110 GB

            // Calcul du revenu proposé (formule simple)
            // Base: 1€/pt CPU + 0.5€/GB RAM + 0.1€/GB Storage
            const baseRevenue =
                cpuReq * 1.0 + ramReq * 0.5 + storageReq * 0.1;
            const revenue = Math.round(baseRevenue * (0.8 + Math.random() * 0.4)); // Variation +/- 20%

            const newMail = {
                id: id,
                sender: "Client Potentiel",
                subject: `Demande d'hébergement ${type}`,
                content: `Bonjour,\n\nNous cherchons un fournisseur pour héberger nos services ${type}.\nVoici nos besoins techniques ci-dessous.\n\nCordialement.`,
                type: "offer",
                offerData: {
                    id: id,
                    clientName: `Client #${id.toString().slice(-4)}`,
                    type: type,
                    revenue: revenue,
                    requirements: {
                        cpu: cpuReq,
                        ram: ramReq,
                        storage: storageReq,
                    },
                },
            };

            setMails((prev) => [newMail, ...prev].slice(0, 20)); // Garde les 20 derniers mails
        };

        // Génère une offre toutes les 30 secondes
        const offerInterval = setInterval(generateOffer, 30000);
        
        // Génère une première offre immédiatement pour tester
        setTimeout(generateOffer, 2000);

        return () => clearInterval(offerInterval);
    }, [isLoggedIn]);

    // Collecte des revenus (Cycle de facturation)
    useEffect(() => {
        if (!isLoggedIn) return;

        const collectRevenue = () => {
            let totalRevenue = 0;
            const rack = player.getRackBay();

            // Parcourt tous les serveurs
            for (let u = 1; u <= rack.totalU; u++) {
                const installed = rack.getCaseAt(u);
                if (installed && installed.startU === u && installed.component.serverInstance) {
                    const server = installed.component.serverInstance;
                    server.clients.forEach(client => {
                        totalRevenue += client.revenue;
                    });
                }
            }

            if (totalRevenue > 0) {
                player.credit(totalRevenue);
                // Optionnel : Notification de revenu ?
                // console.log(`Revenu encaissé : ${totalRevenue}€`);
            }
        };

        // Cycle de 10 secondes (1 heure dans le jeu ?)
        const revenueInterval = setInterval(collectRevenue, 10000);

        return () => clearInterval(revenueInterval);
    }, [isLoggedIn, player]);

    const handleAcceptOffer = (mail) => {
        const offer = mail.offerData;
        const rack = player.getRackBay();
        let accepted = false;

        // Cherche un serveur compatible
        // Stratégie simple : Premier serveur qui accepte
        for (let u = 1; u <= rack.totalU; u++) {
            const installed = rack.getCaseAt(u);
            if (installed && installed.startU === u && installed.component.serverInstance) {
                const server = installed.component.serverInstance;
                
                // Vérifie si le serveur est compatible (Type et Ressources)
                try {
                    // Si le serveur n'a pas de type, il prendra le type de l'offre
                    if (!server.hostingType || server.hostingType === offer.type) {
                        server.addClient(offer);
                        accepted = true;
                        alert(`Offre acceptée ! Client hébergé sur le serveur en U${u}.`);
                        break; // Stop après avoir trouvé un serveur
                    }
                } catch (e) {
                    // Continue de chercher si ressources insuffisantes
                    continue;
                }
            }
        }

        if (accepted) {
            setMails((prev) => prev.filter((m) => m.id !== mail.id));
        } else {
            alert("Aucun serveur disponible ou ressources insuffisantes pour cette offre.");
        }
    };

    const handleRefuseOffer = (mail) => {
        setMails((prev) => prev.filter((m) => m.id !== mail.id));
    };

    // Vérification de la session Supabase au démarrage
    useEffect(() => {
        const checkSession = async () => {
            // On attend que le boot soit terminé avant de vérifier/afficher la session
            if (isBooting) return;

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                const username =
                    session.user.user_metadata.username || "Joueur";
                setAutoLoginName(username);
                // Si session existe, on simule un chargement de 3s minimum
                setTimeout(() => {
                    handleLoginSuccess(username);
                    setIsCheckingSession(false);
                }, 3000);
            } else {
                setIsCheckingSession(false);
            }
        };

        checkSession();
    }, [isBooting]); // Dépendance ajoutée sur isBooting

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
            {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
            <div
                id="screen"
                ref={screenRef}
                className={isBooting ? "hidden" : ""}
            >
                {/* Écran de connexion ou Chargement Session */}
                {!isLoggedIn && (
                    <AuthScreen
                        onLogin={handleLoginSuccess}
                        isLoading={isCheckingSession && !!autoLoginName}
                        loadingMessage={
                            autoLoginName
                                ? `Bienvenue ${autoLoginName}`
                                : undefined
                        }
                    />
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
                                    <Mail 
                                        mails={mails} 
                                        onAcceptOffer={handleAcceptOffer} 
                                        onRefuseOffer={handleRefuseOffer} 
                                    />,
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
                            text={"Internet"}
                            onClick={() =>
                                openWindow(
                                    "browser",
                                    "Internet Explorer",
                                    <Browser player={player} />,
                                    "/images/icons/shop.png"
                                )
                            }
                        />
                        <Icon
                            className="row-start-2 row-span-2 col-start-10 col-span-2"
                            imagePath={"/images/icons/folder.png"} // Utilisation d'une icône existante pour l'instant
                            text={"Inventaire"}
                            onClick={() =>
                                openWindow(
                                    "inventory",
                                    "Inventaire",
                                    <InventoryWindow player={player} />,
                                    "/images/icons/folder.png"
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
                        <div className={showIaPanel ? "block" : "hidden"}>
                            <IaPannel onClose={() => setShowIaPanel(false)} />
                        </div>
                        {/* Barre des tâches (Footer) */}
                        <Footer
                            className="z-100 row-end-13 col-span-full bg-linear-180 from-[#84A9FF] to-[#AAC4FF]"
                            onToggleIaPanel={() => setShowIaPanel(!showIaPanel)}
                        />
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
