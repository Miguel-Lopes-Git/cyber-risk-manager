import React from "react";

export default function Taxes() {
    return (
        <div className="h-full bg-white font-sans overflow-auto">
            <div className="bg-[#8B0000] text-white p-4 shadow-md">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <div className="text-4xl">🏛️</div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-wider">
                            République Numérique
                        </h1>
                        <p className="text-sm font-light">
                            Direction Générale des Finances Publiques
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                La campagne de déclaration des revenus 2024 est
                                close.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Situation Fiscale
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Numéro fiscal
                            </p>
                            <p className="font-mono font-bold">
                                12 34 56 789 012
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">
                                Référence de l'avis
                            </p>
                            <p className="font-mono font-bold">
                                24 123 456 789
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded border border-green-100 text-center">
                        <p className="text-green-800 font-bold text-lg">
                            Aucun impôt à payer
                        </p>
                        <p className="text-green-600 text-sm">
                            Vous êtes à jour dans vos déclarations.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-500 text-xs">
                    <p>
                        © Direction Générale des Finances Publiques - Tous
                        droits réservés
                    </p>
                </div>
            </div>
        </div>
    );
}
