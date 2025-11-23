import { React, useEffect, useState } from "react";
import {
    cases,
    motherboards,
    processors,
    cpuCoolers,
    ramModules,
    graphicsCards,
    powerSupplies,
    storageDevices,
} from "@/data/initialData";
import Server from "@/classes/Server";

/**
 * Composant interne pour l'interface de construction de serveur.
 * Permet de sélectionner les composants et de valider la configuration.
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onCancel - Fonction appelée pour annuler la construction.
 * @param {Function} props.onComplete - Fonction appelée pour valider la construction.
 * @param {number} props.initialSlot - Le slot U de départ sélectionné.
 * @param {number} props.playerBalance - Le solde actuel du joueur.
 */
function ServerBuilder({ onCancel, onComplete, initialSlot, playerBalance }) {
    const [config, setConfig] = useState({
        case: null,
        motherboard: null,
        cpu: null,
        cooler: null,
        ram: [],
        gpu: [],
        storage: [],
        psu: null,
    });

    const [showSelector, setShowSelector] = useState(null); // 'case', 'motherboard', etc.

    // Calcul du prix total de la configuration
    const totalPrice = Object.entries(config).reduce((sum, [key, item]) => {
        if (Array.isArray(item)) {
            return sum + item.reduce((s, i) => s + i.price, 0);
        }
        return sum + (item ? item.price : 0);
    }, 0);

    // Gestion de la sélection des composants
    const handleSelect = (type, item) => {
        setConfig((prev) => {
            const newConfig = { ...prev };

            if (type === "ram") {
                // Vérifie si l'ajout de RAM est possible (limite de slots de la carte mère)
                if (prev.motherboard) {
                    // Suppose 1 item = 1 slot par défaut, sinon utilise item.modules
                    // Compte 1 slot si non spécifié
                    const currentSlotsUsed = prev.ram.reduce(
                        (acc, r) => acc + (r.modules || 1),
                        0
                    );
                    const newSlotsNeeded = item.modules || 1;

                    if (
                        currentSlotsUsed + newSlotsNeeded >
                        prev.motherboard.memorySlots
                    ) {
                        alert(
                            `Pas assez de slots mémoire ! (${currentSlotsUsed}/${prev.motherboard.memorySlots} utilisés)`
                        );
                        return prev;
                    }
                }
                newConfig.ram = [...prev.ram, item];
            } else if (type === "gpu") {
                // Vérifie la disponibilité des slots PCIe (simplifié)
                if (prev.motherboard) {
                    const x16Slots = prev.motherboard.pcieSlots.filter(
                        (s) => s.type === "x16"
                    ).length;
                    if (prev.gpu.length >= x16Slots) {
                        alert(
                            `Maximum ${x16Slots} cartes graphiques (slots x16) !`
                        );
                        return prev;
                    }
                }
                newConfig.gpu = [...prev.gpu, item];
            } else if (type === "storage") {
                // Vérifie la disponibilité des ports SATA / slots M.2
                if (prev.motherboard) {
                    const isM2 = item.formFactor === "M.2";

                    if (isM2) {
                        const m2Used = prev.storage.filter(
                            (s) => s.formFactor === "M.2"
                        ).length;
                        if (m2Used >= prev.motherboard.m2Slots.length) {
                            alert(
                                `Plus de slots M.2 disponibles ! (${m2Used}/${prev.motherboard.m2Slots.length})`
                            );
                            return prev;
                        }
                    } else {
                        const sataUsed = prev.storage.filter(
                            (s) => s.formFactor !== "M.2"
                        ).length;
                        if (sataUsed >= prev.motherboard.sataPorts) {
                            alert(
                                `Plus de ports SATA disponibles ! (${sataUsed}/${prev.motherboard.sataPorts})`
                            );
                            return prev;
                        }
                    }
                }
                newConfig.storage = [...prev.storage, item];
            } else {
                newConfig[type] = item;

                // Réinitialise les composants dépendants si nécessaire
                if (type === "case") {
                    newConfig.motherboard = null;
                    newConfig.cpu = null;
                    newConfig.cooler = null;
                    newConfig.ram = [];
                    newConfig.gpu = [];
                    newConfig.storage = [];
                    newConfig.psu = null;
                } else if (type === "motherboard") {
                    newConfig.cpu = null;
                    newConfig.cooler = null;
                    newConfig.ram = [];
                    newConfig.gpu = [];
                    newConfig.storage = [];
                } else if (type === "cpu") {
                    newConfig.cooler = null;
                }
            }

            return newConfig;
        });

        // Maintient le sélecteur ouvert pour RAM, GPU et Stockage (sélection multiple)
        if (type !== "ram" && type !== "gpu" && type !== "storage") {
            setShowSelector(null);
        }
    };

    // Retire un composant de la liste (RAM/GPU/Stockage)
    const handleRemove = (type, index) => {
        setConfig((prev) => {
            const newConfig = { ...prev };
            if (Array.isArray(newConfig[type])) {
                newConfig[type] = newConfig[type].filter((_, i) => i !== index);
            }
            return newConfig;
        });
    };

    // Filtre les composants compatibles
    const getFilteredItems = (type) => {
        switch (type) {
            case "case":
                return Object.values(cases);
            case "motherboard":
                if (!config.case) return [];
                return Object.values(motherboards).filter((mb) =>
                    config.case.supportedMotherboards.includes(mb.formFactor)
                );
            case "cpu":
                if (!config.motherboard) return [];
                return Object.values(processors).filter(
                    (cpu) => cpu.socket === config.motherboard.socket
                );
            case "cooler":
                if (!config.cpu || !config.case) return [];
                return Object.values(cpuCoolers).filter(
                    (c) =>
                        c.isCompatibleWithSocket(config.cpu.socket) &&
                        c.height <= config.case.cpuCoolerMaxHeight
                );
            case "ram":
                if (!config.motherboard) return [];
                return Object.values(ramModules).filter(
                    (r) => r.type === config.motherboard.memoryType
                );
            case "gpu":
                if (!config.motherboard || !config.case) return [];
                // Vérifie la compatibilité avec la longueur maximale du boîtier
                return Object.values(graphicsCards).filter(
                    (g) => g.length <= config.case.gpuMaxLength
                );
            case "storage":
                if (!config.motherboard) return [];
                return Object.values(storageDevices).filter((s) => {
                    if (s.formFactor === "M.2")
                        return config.motherboard.m2Slots.length > 0;
                    return config.motherboard.sataPorts > 0;
                });
            case "psu":
                if (!config.case) return [];
                // Vérifie la compatibilité avec la longueur maximale de l'alimentation
                return Object.values(powerSupplies).filter((p) =>
                    config.case.psuMaxLength
                        ? p.length <= config.case.psuMaxLength
                        : true
                );
            default:
                return [];
        }
    };

    const canSelect = (type) => {
        switch (type) {
            case "case":
                return true;
            case "motherboard":
                return !!config.case;
            case "cpu":
                return !!config.motherboard;
            case "cooler":
                return !!config.cpu;
            case "ram":
                return !!config.motherboard;
            case "gpu":
                return !!config.motherboard;
            case "storage":
                return !!config.motherboard;
            case "psu":
                return !!config.case;
            default:
                return false;
        }
    };

    const handleBuy = () => {
        if (playerBalance < totalPrice) {
            alert("Fonds insuffisants !");
            return;
        }
        // Vérification finale avant achat (suppose que les filtres ont fonctionné)
        if (
            !config.case ||
            !config.motherboard ||
            !config.cpu ||
            !config.cooler ||
            config.ram.length === 0 ||
            config.storage.length === 0 ||
            !config.psu
        ) {
            alert("Configuration incomplète !");
            return;
        }

        onComplete(config, totalPrice);
    };

    return (
        <div className="absolute inset-0 bg-[#ECE9D8] z-50 flex flex-col p-1 font-sans">
            {/* En-tête style Windows XP */}
            <div className="bg-linear-to-r from-[#0058EE] to-[#3593FF] p-2 flex justify-between items-center rounded-t-lg border-b-2 border-[#003C74]">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                    Configurateur de Serveur (Slot U{initialSlot})
                </h2>
                <button
                    onClick={onCancel}
                    className="bg-[#D83B01] hover:bg-[#E8501E] text-white font-bold px-3 py-1 rounded border border-white shadow-md"
                >
                    X
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden bg-[#ECE9D8] p-2 gap-2">
                {/* Onglets latéraux style Windows XP */}
                <div className="w-1/3 flex flex-col gap-2 overflow-auto pr-2">
                    {[
                        { id: "case", label: "Boîtier" },
                        { id: "motherboard", label: "Carte Mère" },
                        { id: "cpu", label: "Processeur" },
                        { id: "cooler", label: "Refroidissement" },
                        { id: "ram", label: "Mémoire RAM" },
                        { id: "gpu", label: "Carte Graphique" },
                        { id: "storage", label: "Stockage" },
                        { id: "psu", label: "Alimentation" },
                    ].map((part) => (
                        <div
                            key={part.id}
                            className={`relative p-3 rounded-t-lg border-t-2 border-l-2 border-r-2 cursor-pointer transition-all ${
                                canSelect(part.id)
                                    ? "bg-white border-[#ACA899] shadow-[2px_-2px_5px_rgba(0,0,0,0.1)]"
                                    : "bg-[#F0F0F0] border-[#D0D0D0] text-gray-400"
                            } ${
                                showSelector === part.id
                                    ? "z-10 -mr-2 border-b-0 pb-4"
                                    : "border-b-2"
                            }`}
                            onClick={() =>
                                canSelect(part.id) && setShowSelector(part.id)
                            }
                        >
                            <div className="flex justify-between items-center">
                                <h3
                                    className={`font-bold text-lg ${
                                        canSelect(part.id)
                                            ? "text-[#0B318F]"
                                            : ""
                                    }`}
                                >
                                    {part.label}
                                </h3>
                                {(Array.isArray(config[part.id])
                                    ? config[part.id].length > 0
                                    : config[part.id]) && (
                                    <span className="text-green-600 font-bold text-xl">
                                        ✓
                                    </span>
                                )}
                            </div>
                            {Array.isArray(config[part.id]) ? (
                                config[part.id].length > 0 ? (
                                    <div className="text-sm text-gray-700 mt-1">
                                        {config[part.id].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center group/item"
                                            >
                                                <span className="truncate">
                                                    - {item.brand.name}{" "}
                                                    {item.model}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemove(
                                                            part.id,
                                                            i
                                                        );
                                                    }}
                                                    className="text-red-500 font-bold ml-1 hover:text-red-700 px-1"
                                                    title="Retirer"
                                                >
                                                    x
                                                </button>
                                            </div>
                                        ))}
                                        <div className="text-xs text-blue-600 mt-1 italic">
                                            Cliquez pour ajouter plus
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic mt-1">
                                        {canSelect(part.id)
                                            ? "Cliquez pour ajouter"
                                            : "Verrouillé"}
                                    </p>
                                )
                            ) : config[part.id] ? (
                                <p className="text-sm text-gray-700 mt-1 truncate">
                                    {config[part.id].brand.name}{" "}
                                    {config[part.id].model}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400 italic mt-1">
                                    {canSelect(part.id)
                                        ? "Cliquez pour choisir"
                                        : "Verrouillé"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Zone principale (Sélecteur de composants) */}
                <div className="flex-1 bg-white border-2 border-[#ACA899] shadow-inner p-4 overflow-auto relative">
                    {showSelector ? (
                        <div className="h-full flex flex-col">
                            <h3 className="text-xl font-bold text-[#0B318F] mb-4 border-b-2 border-[#ACA899] pb-2 capitalize">
                                Sélection : {showSelector}
                            </h3>
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#ECE9D8] sticky top-0 shadow-sm">
                                        <tr>
                                            <th className="p-2 border border-[#ACA899] text-lg text-[#0B318F]">
                                                Modèle
                                            </th>
                                            <th className="p-2 border border-[#ACA899] text-lg text-right text-[#0B318F]">
                                                Prix
                                            </th>
                                            <th className="p-2 border border-[#ACA899] text-lg text-center text-[#0B318F]">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getFilteredItems(showSelector).length >
                                        0 ? (
                                            getFilteredItems(showSelector).map(
                                                (item, idx) => (
                                                    <tr
                                                        key={idx}
                                                        className="hover:bg-[#316AC5] hover:text-white group transition-colors"
                                                    >
                                                        <td className="p-2 border border-[#E0DFE3] text-lg">
                                                            <span className="font-bold">
                                                                {
                                                                    item.brand
                                                                        .name
                                                                }
                                                            </span>{" "}
                                                            {item.model}
                                                            {item.sizeU && (
                                                                <span className="text-sm ml-2 opacity-75">
                                                                    (
                                                                    {item.sizeU}
                                                                    U)
                                                                </span>
                                                            )}
                                                            {item.capacity && (
                                                                <span className="text-sm ml-2 opacity-75">
                                                                    (
                                                                    {
                                                                        item.capacity
                                                                    }
                                                                    GB)
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="p-2 border border-[#E0DFE3] text-lg text-right font-mono">
                                                            {item.price} €
                                                        </td>
                                                        <td className="p-2 border border-[#E0DFE3] text-center">
                                                            <button
                                                                onClick={() =>
                                                                    handleSelect(
                                                                        showSelector,
                                                                        item
                                                                    )
                                                                }
                                                                className="bg-[#ECE9D8] text-black border border-[#ACA899] px-3 py-1 rounded shadow-sm hover:bg-white active:bg-[#D4D0C8] group-hover:text-black"
                                                            >
                                                                Choisir
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="p-8 text-center text-xl text-gray-500 italic"
                                                >
                                                    Aucun composant compatible
                                                    trouvé.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <p className="text-2xl mb-2">
                                Sélectionnez un composant à gauche
                            </p>
                            <p className="text-lg">
                                pour commencer la configuration
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions du pied de page (Total et Achat) */}
            <div className="mt-2 border-t-2 border-[#ACA899] pt-2 flex justify-between items-center bg-[#ECE9D8] p-2">
                <div className="text-2xl font-bold text-[#0B318F]">
                    Total:{" "}
                    <span className="text-green-700">{totalPrice} €</span>
                </div>
                <button
                    onClick={handleBuy}
                    disabled={
                        !config.case ||
                        !config.motherboard ||
                        !config.cpu ||
                        !config.cooler ||
                        config.ram.length === 0 ||
                        config.storage.length === 0 ||
                        !config.psu
                    }
                    className={`px-6 py-2 rounded text-xl font-bold border-2 shadow-md transition-all ${
                        !config.case ||
                        !config.motherboard ||
                        !config.cpu ||
                        !config.cooler ||
                        config.ram.length === 0 ||
                        config.storage.length === 0 ||
                        !config.psu
                            ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed"
                            : "bg-[#0058EE] border-[#003C74] text-white hover:bg-[#3593FF]"
                    }`}
                >
                    Acheter et Assembler
                </button>
            </div>
        </div>
    );
}

/**
 * Composant ServerWindow (Fenêtre de gestion du serveur).
 * Affiche le rack du joueur et permet d'ajouter/configurer des serveurs.
 * @param {Object} props - Les propriétés du composant.
 * @param {Player} props.Player - L'instance du joueur connecté.
 */
export default function ServerWindow({ Player }) {
    // Force le re-rendu lors d'une modification de l'état du joueur
    const [, setRender] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfiguring, setIsConfiguring] = useState(false);

    const forceUpdate = () => setRender((prev) => prev + 1);

    // Vérifie si un joueur est connecté
    if (!Player) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Serveur</h2>
                <p>Aucun joueur n'est connecté.</p>
            </div>
        );
    }

    const rackBay = Player.getRackBay();
    const totalU = rackBay.totalU;

    const handleSlotClick = (u) => {
        // Si le slot est occupé, affiche les infos du serveur installé
        if (rackBay.getCaseAt(u)) {
            const installed = rackBay.getCaseAt(u);
            alert(
                `Serveur: ${installed.component.brand.name} ${installed.component.model}`
            );
            return;
        }
        setSelectedSlot(u);
        setIsConfiguring(true);
    };

    const handleBuildComplete = (config, totalPrice) => {
        try {
            // Instancie un nouveau serveur
            const newServer = new Server();
            newServer.setCase(config.case);
            newServer.setMotherboard(config.motherboard);
            newServer.addProcessor(config.cpu);
            newServer.addCpuCooler(config.cooler);

            config.ram.forEach((r) => newServer.addRAM(r));
            config.gpu.forEach((g) => newServer.addGPU(g));
            config.storage.forEach((s) => newServer.addStorage(s));

            newServer.setPowerSupply(config.psu);

            // Ajoute le serveur au rack
            rackBay.addCase(config.case, selectedSlot);

            // Débite le coût du serveur au joueur
            Player.debit(totalPrice);

            // Réinitialise l'interface utilisateur
            setIsConfiguring(false);
            setSelectedSlot(null);
            forceUpdate();
        } catch (error) {
            alert(`Erreur lors de l'achat : ${error.message}`);
        }
    };

    const handleUpgradeRack = () => {
        try {
            // Coût de l'amélioration : 100€ pour 2U supplémentaires
            const upgradeCost = 100;
            if (Player.getSolde() < upgradeCost) {
                alert("Fonds insuffisants pour agrandir le rack.");
                return;
            }
            Player.upgradeRackBay(2, upgradeCost);
            forceUpdate();
        } catch (error) {
            alert(`Erreur : ${error.message}`);
        }
    };

    // Génère l'affichage des slots du rack
    const renderSlots = () => {
        const slots = [];
        // Parcourt tous les slots de 1 à totalU
        for (let u = 1; u <= totalU; u++) {
            const installedCase = rackBay.getCaseAt(u);

            if (installedCase) {
                if (installedCase.startU === u) {
                    // Début d'un boîtier installé
                    const heightStyle = {
                        height: `${installedCase.component.sizeU * 40}px`,
                    }; // Hauteur ajustée à 40px par U pour une meilleure lisibilité
                    slots.push(
                        <div
                            key={u}
                            className="border-2 border-black bg-gray-300 m-1 flex items-center justify-center cursor-pointer hover:bg-gray-400 relative shadow-md"
                            style={heightStyle}
                            onClick={() =>
                                alert(
                                    `Serveur: ${installedCase.component.brand.name} ${installedCase.component.model}`
                                )
                            }
                        >
                            <span className="font-bold text-xl text-gray-800">
                                {installedCase.component.brand.name}{" "}
                                {installedCase.component.model}
                            </span>
                            <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-bold px-2 py-1">
                                U{u}
                            </div>
                        </div>
                    );
                }
                // Saute les slots occupés par ce boîtier
                u += installedCase.component.sizeU - 1;
            } else {
                // Slot vide
                slots.push(
                    <div
                        key={u}
                        className="h-10 border-2 border-gray-500 border-dashed m-1 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => handleSlotClick(u)}
                    >
                        <span className="text-gray-400 text-lg font-semibold">
                            Slot U{u} - Vide (Cliquer pour configurer)
                        </span>
                    </div>
                );
            }
        }
        return slots;
    };

    return (
        <div className="p-4 flex flex-col h-full relative">
            {isConfiguring && (
                <ServerBuilder
                    onCancel={() => setIsConfiguring(false)}
                    onComplete={handleBuildComplete}
                    initialSlot={selectedSlot}
                    playerBalance={Player.getSolde()}
                />
            )}

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                    Serveur de {Player.name}
                </h2>
                <div className="text-right">
                    <p className="font-bold text-2xl text-green-700">
                        Solde : {Player.getSolde()} €
                    </p>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded text-lg mt-2 hover:bg-blue-700 shadow"
                        onClick={handleUpgradeRack}
                    >
                        Agrandir Rack (+2U / 100€)
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto border-4 border-gray-600 bg-gray-800 p-6 rounded-lg shadow-inner">
                {/* Visualisation du rack */}
                <div className="bg-gray-900 p-4 w-full max-w-3xl mx-auto border-x-8 border-gray-700 min-h-[300px] shadow-2xl">
                    {renderSlots()}
                </div>
            </div>
        </div>
    );
}
