/**
 * Représente de la mémoire vive (RAM).
 */
export default class RAM {
    /**
     * Constructeur de la classe RAM (Mémoire Vive).
     * @param {Object} params - Les paramètres de la RAM.
     * @param {string} params.brand - La marque (ex: Corsair, G.Skill, Kingston).
     * @param {string} params.model - Le modèle de la RAM.
     * @param {string} params.type - Le type de mémoire (ex: DDR4, DDR5).
     * @param {number} params.capacity - Capacité par module en Go.
     * @param {number} params.modules - Nombre de barrettes (ex: 2).
     * @param {number} params.speed - Fréquence en MHz (ex: 6000).
     * @param {string} params.timings - Timings de la mémoire (ex: "CL36-36-36-76").
     * @param {number} params.voltage - Tension en Volts.
     * @param {boolean} params.ecc - Support ECC (Error Correction Code).
     * @param {boolean} params.rgb - Présence d'éclairage RGB.
     * @param {number} params.height - Hauteur en mm (utile pour la compatibilité avec les ventirads).
     * @param {number} params.price - Prix de la RAM en €.
     */
    constructor({
        brand,
        model,
        type,
        capacity,
        modules,
        speed,
        timings,
        voltage,
        ecc = false,
        rgb = false,
        height = null,
        price = 0,
    }) {
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.capacity = capacity;
        this.modules = modules;
        this.speed = speed;
        this.timings = timings;
        this.voltage = voltage;
        this.ecc = ecc;
        this.rgb = rgb;
        this.height = height;
        this.price = price;
    }

    /**
     * Calcule la capacité totale de la mémoire (capacité par module * nombre de modules).
     * @returns {number} - Capacité totale en Go.
     */
    totalCapacity() {
        return this.capacity * this.modules;
    }

    /**
     * Vérifie la compatibilité avec une carte mère donnée.
     * @param {Object} motherboard - La carte mère à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    isCompatibleWithMotherboard(motherboard) {
        if (!motherboard) return false;

        // Vérification du type de mémoire (DDR4, DDR5...)
        if (this.type !== motherboard.memoryType) return false;

        // Vérification de la vitesse (on accepte si <= max supporté par la CM)
        if (this.speed > motherboard.memorySpeed) return false;

        // Vérification du nombre de slots disponibles
        if (this.modules > motherboard.memorySlots) return false;

        return true;
    }
}
