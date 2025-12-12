/**
 * Registre central de tous les composants du jeu.
 * Permet de retrouver un composant par son modèle.
 */

import {
    processors,
    motherboards,
    graphicsCards,
    ramModules,
    powerSupplies,
    cases,
    cpuCoolers,
    storageDevices,
} from "@/data/initialData";

/**
 * Crée un registre global de tous les composants indexés par modèle.
 */
function createComponentRegistry() {
    const registry = new Map();

    // Helper pour ajouter des composants au registre
    const addComponents = (components, type) => {
        Object.values(components).forEach((component) => {
            const key = component.model;
            if (registry.has(key)) {
                console.warn(`⚠️ Doublon détecté: ${key}`);
            }
            registry.set(key, { component, type });
        });
    };

    // Ajout de tous les types de composants
    addComponents(processors, "cpu");
    addComponents(motherboards, "motherboard");
    addComponents(graphicsCards, "gpu");
    addComponents(ramModules, "ram");
    addComponents(powerSupplies, "psu");
    addComponents(cases, "case");
    addComponents(cpuCoolers, "cooler");
    addComponents(storageDevices, "storage");

    console.log(`✅ Registre des composants créé: ${registry.size} composants`);
    return registry;
}

// Registre global
const COMPONENT_REGISTRY = createComponentRegistry();

/**
 * Récupère un composant par son modèle.
 * @param {string} model - Le nom du modèle.
 * @returns {Object|null} - {component, type} ou null si non trouvé.
 */
export function getComponentByModel(model) {
    const result = COMPONENT_REGISTRY.get(model);
    if (!result) {
        console.warn(`⚠️ Composant non trouvé: ${model}`);
        return null;
    }
    return result;
}

/**
 * Vérifie si un composant existe dans le registre.
 * @param {string} model - Le nom du modèle.
 * @returns {boolean}
 */
export function hasComponent(model) {
    return COMPONENT_REGISTRY.has(model);
}

/**
 * Récupère tous les composants d'un type donné.
 * @param {string} type - Le type (cpu, ram, etc.)
 * @returns {Array} - Liste des composants de ce type.
 */
export function getComponentsByType(type) {
    const results = [];
    COMPONENT_REGISTRY.forEach((value, key) => {
        if (value.type === type) {
            results.push(value.component);
        }
    });
    return results;
}
