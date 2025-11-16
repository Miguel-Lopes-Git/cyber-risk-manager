"use client";

import { useState } from "react";

export default function Mail() {
    const [selectedMail, setSelectedMail] = useState(null);

    const mails = [
        { id: 1, subject: "mail 1", content: "Contenu du mail 1" },
        { id: 2, subject: "mail 2", content: "Contenu du mail 2" },
        { id: 3, subject: "mail 3", content: "Contenu du mail 3" },
        { id: 4, subject: "mail 4", content: "Contenu du mail 4" },
        { id: 5, subject: "mail 5", content: "Contenu du mail 5" },
        { id: 6, subject: "mail 6", content: "Contenu du mail 6" },
    ];

    return (
        <div className="flex h-full w-full">
            {/* Liste des mails à gauche */}
            <div className="w-48 border-r-2 border-black">
                {mails.map((mail) => (
                    <div
                        key={mail.id}
                        onClick={() => setSelectedMail(mail)}
                        className={`p-4 border-b-2 border-black cursor-pointer hover:bg-gray-400 ${
                            selectedMail?.id === mail.id ? "bg-gray-400" : ""
                        }`}
                    >
                        <p className="text-lg font-medium">{mail.subject}</p>
                    </div>
                ))}
            </div>

            {/* Contenu du mail à droite */}
            <div className="flex-1 flex items-center justify-center">
                {selectedMail ? (
                    <div className="p-8">
                        <p className="text-xl">*{selectedMail.content}</p>
                    </div>
                ) : (
                    <div className="p-8">
                        <p className="text-xl">*contenu du mail</p>
                    </div>
                )}
            </div>
        </div>
    );
}
