/**
 * Système de sauvegarde et de chargement des données du jeu.
 * Gère la sérialisation/désérialisation et le stockage dans localStorage.
 *
 * STRATÉGIE: On sauvegarde uniquement les RÉFÉRENCES (nom du modèle + quantité)
 * et on reconstruit les objets à partir du registre des composants.
 */

import Player from "@/classes/Player";
import Server from "@/classes/Server";
import { getComponentByModel } from "@/lib/componentRegistry";

const SAVE_KEY = "cyber_risk_manager_save";

/**
 * Sauvegarde l'état complet du jeu dans le localStorage.
 * @param {Player} player - L'instance du joueur.
 * @param {Array} mails - La liste des mails.
 */
export function saveGame(player, mails = []) {
    try {
        const saveData = {
            version: "2.0", // Nouvelle version du format
            timestamp: Date.now(),
            player: {
                name: player.name,
                solde: player.getSolde(),
                rackBay: {
                    totalU: player.getRackBay().totalU,
                    cases: player.getRackBay().cases.map((caseEntry) => ({
                        componentModel: caseEntry.component.model,
                        startU: caseEntry.startU,
                        serverInstance: caseEntry.component.serverInstance
                            ? serializeServer(
                                  caseEntry.component.serverInstance
                              )
                            : null,
                    })),
                },
                inventory: {
                    // Format simple: { "model": { quantity: X, type: "cpu" } }
                    items: Object.keys(player.inventory.items).reduce(
                        (acc, key) => {
                            const item = player.inventory.items[key];
                            if (!item || !item.component) {
                                console.warn(
                                    `Item invalide dans l'inventaire: ${key}`
                                );
                                return acc;
                            }

                            acc[key] = {
                                model: item.component.model,
                                quantity: item.quantity || 0,
                                type: item.type || "unknown",
                            };
                            return acc;
                        },
                        {}
                    ),
                },
            },
            mails: mails,
        };

        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        console.log("✅ Sauvegarde réussie !");
        return true;
    } catch (error) {
        console.error("❌ Erreur lors de la sauvegarde:", error);
        return false;
    }
}

/**
 * Sérialise un objet Server (sauvegarde uniquement les modèles).
 */
function serializeServer(server) {
    return {
        hostingType: server.hostingType,
        status: server.status,
        clients: server.clients || [],
        processors: (server.processors || []).map((p) => p.model),
        cpuCoolers: (server.cpuCoolers || []).map((c) => c.model),
        motherboard: server.motherboard ? server.motherboard.model : null,
        gpus: (server.gpus || []).map((g) => g.model),
        psu: server.psu ? server.psu.model : null,
        ram: (server.ram || []).map((r) => r.model),
        storage: (server.storage || []).map((s) => s.model),
        case: server.case ? server.case.model : null,
    };
}

/**
 * Désérialise un objet Server (reconstruit à partir des modèles).
 */
function deserializeServer(data) {
    if (!data) return null;

    const server = new Server();
    server.hostingType = data.hostingType;
    server.status = data.status;
    server.clients = data.clients || [];

    // Reconstruit le case
    if (data.case) {
        const caseData = getComponentByModel(data.case);
        if (caseData) {
            server.case = caseData.component;
        } else {
            console.warn(`⚠️ Case non trouvé: ${data.case}`);
        }
    }

    // Reconstruit la carte mère
    if (data.motherboard) {
        const mbData = getComponentByModel(data.motherboard);
        if (mbData) {
            server.motherboard = mbData.component;
        } else {
            console.warn(`⚠️ Motherboard non trouvé: ${data.motherboard}`);
        }
    }

    // Reconstruit l'alimentation
    if (data.psu) {
        const psuData = getComponentByModel(data.psu);
        if (psuData) {
            server.psu = psuData.component;
        } else {
            console.warn(`⚠️ PSU non trouvé: ${data.psu}`);
        }
    }

    // Reconstruit les processeurs
    data.processors?.forEach((model) => {
        const cpuData = getComponentByModel(model);
        if (cpuData) {
            server.processors.push(cpuData.component);
        } else {
            console.warn(`⚠️ CPU non trouvé: ${model}`);
        }
    });

    // Reconstruit les coolers
    data.cpuCoolers?.forEach((model) => {
        const coolerData = getComponentByModel(model);
        if (coolerData) {
            server.cpuCoolers.push(coolerData.component);
        } else {
            console.warn(`⚠️ Cooler non trouvé: ${model}`);
        }
    });

    // Reconstruit la RAM
    data.ram?.forEach((model) => {
        const ramData = getComponentByModel(model);
        if (ramData) {
            server.ram.push(ramData.component);
        } else {
            console.warn(`⚠️ RAM non trouvée: ${model}`);
        }
    });

    // Reconstruit les GPUs
    data.gpus?.forEach((model) => {
        const gpuData = getComponentByModel(model);
        if (gpuData) {
            server.gpus.push(gpuData.component);
        } else {
            console.warn(`⚠️ GPU non trouvé: ${model}`);
        }
    });

    // Reconstruit le stockage
    data.storage?.forEach((model) => {
        const storageData = getComponentByModel(model);
        if (storageData) {
            server.storage.push(storageData.component);
        } else {
            console.warn(`⚠️ Storage non trouvé: ${model}`);
        }
    });

    return server;
}

/**
 * Charge l'état du jeu depuis le localStorage.
 * @returns {Object|null} - Les données chargées ou null si aucune sauvegarde.
 */
export function loadGame() {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (!savedData) {
            console.log("ℹ️ Aucune sauvegarde trouvée.");
            return null;
        }

        const data = JSON.parse(savedData);
        console.log(
            "📂 Sauvegarde chargée (version " + (data.version || "1.0") + ")"
        );

        // Reconstruit le joueur
        const player = new Player(data.player.name, data.player.solde);

        // Reconstruit le RackBay
        if (data.player.rackBay) {
            player.getRackBay().totalU = data.player.rackBay.totalU || 2;
            player.getRackBay().cases = (data.player.rackBay.cases || [])
                .map((caseEntry) => {
                    if (!caseEntry || !caseEntry.componentModel) {
                        console.warn("Case invalide dans le rack, ignorée");
                        return null;
                    }

                    // Récupère le composant depuis le registre
                    const caseData = getComponentByModel(
                        caseEntry.componentModel
                    );
                    if (!caseData) {
                        console.warn(
                            `⚠️ Case non trouvé: ${caseEntry.componentModel}`
                        );
                        return null;
                    }

                    const reconstructedCase = caseData.component;

                    // Reconstruit le serveur attaché si présent
                    if (caseEntry.serverInstance) {
                        reconstructedCase.serverInstance = deserializeServer(
                            caseEntry.serverInstance
                        );
                    }

                    return {
                        component: reconstructedCase,
                        startU: caseEntry.startU,
                    };
                })
                .filter((entry) => entry !== null);
        }

        // Reconstruit l'inventaire
        if (data.player.inventory && data.player.inventory.items) {
            player.inventory.items = Object.keys(
                data.player.inventory.items
            ).reduce((acc, key) => {
                const item = data.player.inventory.items[key];

                if (!item || !item.model || !item.type) {
                    console.warn(
                        `Item invalide dans l'inventaire (${key}), ignoré`
                    );
                    return acc;
                }

                // Récupère le composant depuis le registre
                const componentData = getComponentByModel(item.model);
                if (!componentData) {
                    console.warn(`⚠️ Composant non trouvé: ${item.model}`);
                    return acc;
                }

                acc[key] = {
                    component: componentData.component,
                    quantity: item.quantity || 0,
                    type: item.type,
                };
                return acc;
            }, {});
        }

        console.log("✅ Chargement réussi !");
        return {
            player: player,
            mails: data.mails || [],
        };
    } catch (error) {
        console.error("❌ Erreur lors du chargement:", error);
        return null;
    }
}

/**
 * Supprime la sauvegarde du localStorage.
 */
export function deleteSave() {
    try {
        localStorage.removeItem(SAVE_KEY);
        console.log("🗑️ Sauvegarde supprimée.");
        return true;
    } catch (error) {
        console.error("❌ Erreur lors de la suppression:", error);
        return false;
    }
}

/**
 * Vérifie si une sauvegarde existe.
 */
export function hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null;
}
