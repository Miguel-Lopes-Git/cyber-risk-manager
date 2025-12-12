import { useEffect, useState } from "react";
import { useWindows } from "@/contexts/WindowContext";
import Image from "next/image";

/**
 * Composant Footer (Barre des tâches).
 * Affiche les fenêtres ouvertes, le menu contextuel, la météo et l'heure.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.className - Classes CSS supplémentaires.
 * @param {Function} props.onToggleIaPanel - Callback pour afficher le panneau IA.
 * @param {Function} props.onSaveGame - Callback pour sauvegarder la partie.
 */
export default function Footer({ className, onToggleIaPanel, onSaveGame }) {
    const [currentWeather, setCurrentWeather] = useState("");
    const [contextMenu, setContextMenu] = useState(null);
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const { windows, restoreWindow, closeWindow } = useWindows();

    const handleContextMenu = (e, windowId) => {
        e.preventDefault();
        setContextMenu({
            windowId,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleCloseWindow = (windowId) => {
        closeWindow(windowId);
        setContextMenu(null);
    };

    useEffect(() => {
        document.addEventListener("click", handleCloseContextMenu);
        return () => {
            document.removeEventListener("click", handleCloseContextMenu);
        };
    }, []);

    useEffect(() => {
        // Récupère les données météo actuelles depuis une API
        async function fetchWeather() {
            try {
                const response = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=4.03&hourly=temperature_2m&forecast_hours=1"
                );
                const data = await response.json();
                if (data && data.hourly && data.hourly.temperature_2m) {
                    setCurrentWeather(data.hourly.temperature_2m[0] + "°C");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }

        fetchWeather();
    }, []);

    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
        })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                })
            );
        }, 10000); // Met à jour l'heure toutes les 10 secondes

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={"flex flex-col select-none " + className}>
            {/* Effet de relief style Windows XP */}
            <div className="w-full h-0.5 bg-linear-to-r from-white/40 via-white/60 to-white/40 border-b border-white/20 shadow-sm"></div>

            <div className="flex justify-between w-full h-full">
                {/* Container Gauche : Menu Démarrer + Fenêtres */}
                <div className="flex items-center gap-4 px-4 py-2">
                    {/* Menu démarrer */}
                    <div className="flex items-center hover:brightness-110 transition-all cursor-pointer active:scale-95">
                        <Image
                            src="/images/footer/icon_user.png"
                            alt="Menu Démarrer"
                            width={40}
                            height={40}
                            className="drop-shadow-lg"
                        />
                    </div>

                    {/* Fenêtres ouvertes */}
                    <div className="flex gap-2 items-center relative">
                        {windows.map((window) => (
                            <button
                                key={window.id}
                                onClick={() => restoreWindow(window.id)}
                                onContextMenu={(e) =>
                                    handleContextMenu(e, window.id)
                                }
                                className={`p-1.5 rounded border-2 flex items-center justify-center w-10 h-10 shadow-md ${
                                    window.isMinimized
                                        ? "bg-gray-200 border-gray-400 opacity-80"
                                        : "bg-blue-500 border-blue-700"
                                } hover:bg-blue-400 hover:border-blue-600 transition-all active:inset-shadow`}
                                title={window.title}
                            >
                                <Image
                                    src={window.iconPath}
                                    alt={window.title}
                                    width={28}
                                    height={28}
                                />
                            </button>
                        ))}

                        {/* Menu contextuel */}
                        {contextMenu && (
                            <div
                                className="fixed bg-white border-2 border-gray-300 rounded shadow-lg z-50"
                                style={{
                                    left: `${contextMenu.x}px`,
                                    top: `${contextMenu.y - 50}px`,
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() =>
                                        handleCloseWindow(contextMenu.windowId)
                                    }
                                    className="px-4 py-2 hover:bg-gray-200 w-full text-left text-gray-800"
                                >
                                    Fermer la fenêtre
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Informations de droite (Météo, Heure) */}
                <div className="flex gap-4 bg-linear-to-r from-[#7195FF] to-[#9EDCFF] rounded-bl-2xl px-6 items-center shadow-md border-l border-b border-white/30 h-full">
                    {/* Bouton Sauvegarder */}
                    <button
                        onClick={() => {
                            if (onSaveGame) {
                                onSaveGame();
                                setShowSaveNotification(true);
                                setTimeout(
                                    () => setShowSaveNotification(false),
                                    2000
                                );
                            }
                        }}
                        className="flex items-center justify-center px-3 py-1 bg-green-600 rounded border-2 border-white shadow-lg hover:bg-green-500 active:scale-95 transition-all relative"
                        title="Sauvegarder la partie"
                    >
                        <span className="text-white font-bold text-sm">💾</span>

                        {/* Notification de sauvegarde */}
                        {showSaveNotification && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                                ✓ Sauvegardé !
                            </div>
                        )}
                    </button>

                    {/* Bouton IA */}
                    <button
                        onClick={onToggleIaPanel}
                        className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-full border-2 border-white shadow-lg hover:bg-blue-500 active:scale-95 transition-all"
                        title="Assistant IA"
                    >
                        <span className="text-white font-bold text-xs">IA</span>
                    </button>

                    {/* Météo */}
                    <div className="flex items-center">
                        <span className="text-2xl px-3 py-1 bg-white/20 rounded-full text-balck font-bold shadow-inner border border-white/10 backdrop-blur-sm">
                            {currentWeather || "--°C"}
                        </span>
                    </div>

                    {/* Heure */}
                    <div className="flex items-center">
                        <span className="text-2xl px-3 py-1 bg-white/20 rounded-full text-balck font-bold shadow-inner border border-white/10 backdrop-blur-sm">
                            {currentTime}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
