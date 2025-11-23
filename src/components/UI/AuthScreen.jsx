import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

export default function AuthScreen({
    onLogin,
    isLoading = false,
    loadingMessage = "",
}) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [localLoading, setLocalLoading] = useState(false);

    const showLoading = isLoading || localLoading;
    const currentLoadingMessage =
        loadingMessage ||
        (isRegistering ? "Création du compte..." : "Connexion en cours...");

    const handleAuth = async () => {
        setError("");
        if (!username || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        if (isRegistering && password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLocalLoading(true);
        const email = `${username
            .toLowerCase()
            .replace(/\s+/g, "")}@cyber-risk.game`;

        try {
            if (isRegistering) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            username: username,
                        },
                    },
                });
                if (error) throw error;
                if (data.session) {
                    onLogin(username);
                } else {
                    const { data: loginData, error: loginError } =
                        await supabase.auth.signInWithPassword({
                            email,
                            password,
                        });
                    if (loginError) throw loginError;
                    onLogin(username);
                }
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                const userUsername =
                    data.user.user_metadata.username || username;
                onLogin(userUsername);
            }
        } catch (err) {
            console.error(err);
            setError(
                err.message === "Invalid login credentials"
                    ? "Identifiants incorrects."
                    : err.message
            );
            setLocalLoading(false);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-50 flex flex-col justify-center items-center backdrop-blur-sm font-sans">
            <div className="bg-[#ECE9D8] border-2 border-white border-r-gray-500 border-b-gray-500 shadow-[4px_4px_10px_rgba(0,0,0,0.5)] max-w-lg w-full p-1">
                {/* Header style XP */}
                <div className="bg-linear-to-r from-[#0058EE] to-[#3593FF] p-3 flex items-center justify-between mb-1 border-b-2 border-[#003C74]">
                    <h2 className="text-white font-bold text-2xl italic text-shadow-sm">
                        {isRegistering
                            ? "Inscription CyberOS"
                            : "Connexion CyberOS"}
                    </h2>
                    <Image
                        src="/images/footer/icon_user.png"
                        width={32}
                        height={32}
                        alt="User"
                        className="drop-shadow-md"
                    />
                </div>

                <div className="bg-[#ECE9D8] p-6 flex flex-col gap-6 border-2 border-[#ACA899] border-t-white border-l-white">
                    {showLoading ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <LoadingSpinner />
                            <p className="text-[#0B318F] text-2xl font-bold mt-6 animate-pulse">
                                {currentLoadingMessage}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-center mb-2">
                                <Image
                                    src="/images/login-image.webp"
                                    alt="Login"
                                    width={120}
                                    height={120}
                                    className="border-4 border-white outline-1 outline-gray-400 rounded-full shadow-lg bg-white"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[#0B318F] font-bold text-xl">
                                    Nom d'utilisateur :
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="p-3 text-xl border-2 border-[#7F9DB9] rounded-sm focus:outline-none focus:border-[#0058EE] shadow-inner"
                                    placeholder="Votre pseudo"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[#0B318F] font-bold text-xl">
                                    Mot de passe :
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="p-3 text-xl border-2 border-[#7F9DB9] rounded-sm focus:outline-none focus:border-[#0058EE] shadow-inner"
                                    placeholder="******"
                                />
                            </div>

                            {isRegistering && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#0B318F] font-bold text-xl">
                                        Confirmer le mot de passe :
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        className="p-3 text-xl border-2 border-[#7F9DB9] rounded-sm focus:outline-none focus:border-[#0058EE] shadow-inner"
                                        placeholder="******"
                                    />
                                </div>
                            )}

                            {error && (
                                <div className="bg-[#FFFFE1] border border-red-500 text-red-600 px-4 py-3 rounded relative text-lg flex items-center gap-2">
                                    <span className="font-bold">⚠</span> {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-3 mt-4">
                                <button
                                    onClick={handleAuth}
                                    className="bg-green-600 text-white font-bold text-xl py-3 px-6 rounded border-2 border-white outline-1 outline-green-800 shadow-md hover:bg-green-500 active:bg-green-700 active:translate-y-0.5 transition-all"
                                >
                                    {isRegistering
                                        ? "S'inscrire"
                                        : "Se connecter"}
                                </button>

                                <button
                                    onClick={() => {
                                        setIsRegistering(!isRegistering);
                                        setError("");
                                    }}
                                    className="text-[#0058EE] underline text-lg hover:text-[#3593FF] text-center mt-2 font-semibold"
                                >
                                    {isRegistering
                                        ? "Déjà un compte ? Se connecter"
                                        : "Pas de compte ? Créer un profil"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
