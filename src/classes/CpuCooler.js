/**
 * Représente un système de refroidissement pour processeur (Ventirad ou AIO).
 */
export default class CpuCooler {
    /**
     * Constructeur de la classe CpuCooler (Refroidisseur CPU).
     * @param {Object} params - Les paramètres du refroidisseur.
     * @param {string} params.brand - La marque du refroidisseur.
     * @param {string} params.model - Le modèle du refroidisseur.
     * @param {string} params.type - Le type de refroidissement (ex: "Air", "AIO", "Custom").
     * @param {string[]} params.sockets - Liste des sockets supportés (ex: ["LGA1700", "AM5"]).
     * @param {number} params.height - Hauteur en mm (important pour la compatibilité avec le boîtier).
     * @param {number} params.tdp - Capacité de dissipation thermique en Watts (TDP).
     * @param {number} params.price - Prix du refroidisseur en €.
     */
    constructor({ brand, model, type, sockets = [], height, tdp, price = 0 }) {
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.sockets = sockets;
        this.height = height;
        this.tdp = tdp;
        this.price = price;
    }

    /**
     * Vérifie si le refroidisseur est compatible avec un socket donné.
     * @param {string} socket - Le type de socket à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    isCompatibleWithSocket(socket) {
        return this.sockets.includes(socket);
    }

    /**
     * Vérifie si le refroidisseur est suffisant pour dissiper la chaleur du processeur (TDP).
     * @param {number} cpuTdp - Le TDP du processeur en Watts.
     * @returns {boolean} - Retourne true si le refroidisseur est suffisant, sinon false.
     */
    isSufficientForTDP(cpuTdp) {
        return this.tdp >= cpuTdp;
    }
}
