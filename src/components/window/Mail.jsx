"use client";

import { useState } from "react";

/**
 * Composant Mail simulant une application de messagerie.
 * @param {Object} props
 * @param {Array} props.mails - Liste des mails.
 * @param {Function} props.onAcceptOffer - Callback pour accepter une offre.
 * @param {Function} props.onRefuseOffer - Callback pour refuser une offre.
 */
export default function Mail({ mails = [], onAcceptOffer, onRefuseOffer }) {
    const [selectedMail, setSelectedMail] = useState(null);

    return (
        <div className="flex h-full w-full bg-white font-sans">
            {/* Liste des e-mails (colonne de gauche) */}
            <div className="w-64 border-r-2 border-[#ACA899] bg-[#F0F0F0] overflow-y-auto">
                {mails.length === 0 && (
                    <div className="p-4 text-gray-500 italic text-center">
                        Aucun message.
                    </div>
                )}
                {mails.map((mail) => (
                    <div
                        key={mail.id}
                        onClick={() => setSelectedMail(mail)}
                        className={`p-3 border-b border-[#D0D0D0] cursor-pointer hover:bg-[#316AC5] hover:text-white transition-colors ${
                            selectedMail?.id === mail.id
                                ? "bg-[#316AC5] text-white"
                                : "text-black"
                        }`}
                    >
                        <p className="font-bold truncate text-sm">
                            {mail.sender || "Inconnu"}
                        </p>
                        <p className="truncate text-sm">{mail.subject}</p>
                    </div>
                ))}
            </div>

            {/* Contenu de l'e-mail sélectionné (colonne de droite) */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {selectedMail ? (
                    <div className="flex flex-col h-full">
                        {/* En-tête du mail */}
                        <div className="p-4 border-b border-[#ACA899] bg-[#F9F9F9]">
                            <h2 className="text-xl font-bold text-[#0B318F] mb-1">
                                {selectedMail.subject}
                            </h2>
                            <p className="text-sm text-gray-600">
                                De :{" "}
                                <span className="font-bold">
                                    {selectedMail.sender}
                                </span>
                            </p>
                        </div>

                        {/* Corps du mail */}
                        <div className="p-6 flex-1 overflow-y-auto">
                            <p className="text-gray-800 whitespace-pre-wrap mb-6">
                                {selectedMail.content}
                            </p>

                            {/* Zone d'offre spéciale */}
                            {selectedMail.type === "offer" &&
                                selectedMail.offerData && (
                                    <div className="border-2 border-[#0B318F] bg-[#F0F8FF] p-4 rounded shadow-md max-w-md mx-auto">
                                        <h3 className="text-lg font-bold text-[#0B318F] mb-3 border-b border-blue-200 pb-2">
                                            Détails de l'offre de contrat
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                            <div className="font-bold text-gray-700">
                                                Type :
                                            </div>
                                            <div>
                                                {selectedMail.offerData.type}
                                            </div>

                                            <div className="font-bold text-gray-700">
                                                Revenu :
                                            </div>
                                            <div className="text-green-600 font-bold">
                                                {selectedMail.offerData.revenue}
                                                € / heure
                                            </div>

                                            <div className="font-bold text-gray-700">
                                                CPU requis :
                                            </div>
                                            <div>
                                                {
                                                    selectedMail.offerData
                                                        .requirements.cpu
                                                }{" "}
                                                pts
                                            </div>

                                            <div className="font-bold text-gray-700">
                                                RAM requise :
                                            </div>
                                            <div>
                                                {
                                                    selectedMail.offerData
                                                        .requirements.ram
                                                }{" "}
                                                GB
                                            </div>

                                            <div className="font-bold text-gray-700">
                                                Stockage :
                                            </div>
                                            <div>
                                                {
                                                    selectedMail.offerData
                                                        .requirements.storage
                                                }{" "}
                                                GB
                                            </div>
                                        </div>

                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => {
                                                    onAcceptOffer(selectedMail);
                                                    setSelectedMail(null);
                                                }}
                                                className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 shadow"
                                            >
                                                Accepter l'offre
                                            </button>
                                            <button
                                                onClick={() => {
                                                    onRefuseOffer(selectedMail);
                                                    setSelectedMail(null);
                                                }}
                                                className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 shadow"
                                            >
                                                Refuser
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                        Sélectionnez un message pour le lire.
                    </div>
                )}
            </div>
        </div>
    );
}
