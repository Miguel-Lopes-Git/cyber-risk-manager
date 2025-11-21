/**
 * Représente une unité d'alimentation électrique (PSU).
 */
export default class PowerSupply {
    /**
     * Constructeur de la classe PowerSupply (Alimentation).
     * @param {Object} params - Les paramètres de l'alimentation.
     * @param {string} params.brand - La marque (ex: Corsair, Seasonic, BeQuiet).
     * @param {string} params.model - Le modèle de l'alimentation.
     * @param {number} params.wattage - Puissance totale en Watts (ex: 750).
     * @param {string} params.efficiency - Certification d'efficacité (ex: 80+ Bronze, Gold, Platinum, Titanium).
     * @param {string} params.modularity - Modularité des câbles (ex: none, semi, full).
     * @param {string} params.formFactor - Format de l'alimentation (ex: ATX, SFX, SFX-L).
     * @param {number} params.rails12V - Ampérage sur le rail 12V (important pour les GPU).
     * @param {number} params.length - Longueur en mm (pour compatibilité boîtier).
     * @param {number} params.price - Prix de l'alimentation en €.
     */
    constructor({
        brand,
        model,
        wattage,
        efficiency,
        modularity,
        formFactor,

        rails12V,

        length = null,
        price = 0,
    }) {
        this.brand = brand;
        this.model = model;
        this.wattage = wattage;
        this.efficiency = efficiency;
        this.modularity = modularity;
        this.formFactor = formFactor;

        this.rails12V = rails12V;

        this.length = length;
        this.price = price;
    }

    /**
     * Vérifie si l'alimentation est suffisante pour une carte graphique donnée.
     * @param {Object} gpu - La carte graphique à alimenter.
     * @returns {boolean} - Retourne true si la puissance est suffisante, sinon false.
     */
    isEnoughForGPU(gpu) {
        if (!gpu) return false;
        return this.wattage >= gpu.recommendedPSU;
    }

    /**
     * Vérifie si l'alimentation rentre dans un boîtier donné.
     * @param {number} maxLength - Longueur maximale acceptée par le boîtier en mm.
     * @returns {boolean} - Retourne true si l'alimentation rentre, sinon false.
     */
    fitsInCase(maxLength) {
        if (!this.length) return true;
        return this.length <= maxLength;
    }
}
