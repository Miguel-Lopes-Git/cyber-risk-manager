/**
 * Représente une baie de serveur (Rack) pouvant contenir plusieurs boîtiers.
 */
export default class RackBay {
    /**
     * Constructeur de la classe RackBay (Baie de serveur).
     * @param {Object} params - Les paramètres de la baie.
     * @param {string} params.brand - La marque de la baie.
     * @param {string} params.model - Le modèle de la baie.
     * @param {number} params.totalU - Hauteur totale disponible en unités (U).
     * @param {number} params.price - Prix de la baie en €.
     */
    constructor({ brand, model, totalU, price = 0 }) {
        this.brand = brand;
        this.model = model;
        this.totalU = totalU; // Hauteur totale disponible du rack
        this.cases = []; // Liste des boîtiers installés
        this.price = price; // Prix en €
    }

    /**
     * Ajoute un boîtier dans le rack à une position donnée.
     * @param {Object} serverCase - Le boîtier à ajouter.
     * @param {number} startU - La position de départ (en U) dans le rack.
     * @returns {boolean} - Retourne true si l'ajout a réussi.
     * @throws {Error} - Si le boîtier dépasse la hauteur ou si l'emplacement est occupé.
     */
    addCase(serverCase, startU) {
        // Vérifier si le boîtier rentre dans le rack
        if (startU < 1 || startU + serverCase.sizeU - 1 > this.totalU) {
            throw new Error("Le boîtier dépasse la hauteur du rack.");
        }

        // Vérifier si l'espace est libre
        for (let i = 0; i < serverCase.sizeU; i++) {
            if (this.getCaseAt(startU + i)) {
                throw new Error(`Le slot ${startU + i} est déjà occupé.`);
            }
        }

        // Ajouter la position au boîtier (stocké sous forme d'objet avec sa position)
        this.cases.push({ component: serverCase, startU: startU });

        console.log(
            `✔️ ${serverCase.brand} ${serverCase.model} ajouté au rack (Slot ${startU}, ${serverCase.sizeU}U).`
        );
        return true;
    }

    /**
     * Récupère le boîtier installé à une position donnée (U).
     * @param {number} u - La position en U à vérifier.
     * @returns {Object|undefined} - L'objet contenant le boîtier et sa position, ou undefined si vide.
     */
    getCaseAt(u) {
        return this.cases.find(
            (c) => u >= c.startU && u < c.startU + c.component.sizeU
        );
    }

    /**
     * Retire un boîtier du rack à une position donnée.
     * @param {number} u - La position en U où se trouve le boîtier.
     * @returns {boolean} - Retourne true si un boîtier a été retiré, sinon false.
     */
    removeCase(u) {
        const index = this.cases.findIndex(
            (c) => u >= c.startU && u < c.startU + c.component.sizeU
        );
        if (index !== -1) {
            this.cases.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Améliore le rack en ajoutant des unités supplémentaires.
     * @param {number} additionalU - Nombre d'unités (U) à ajouter.
     */
    upgrade(additionalU) {
        this.totalU += additionalU;
    }

    /**
     * Calcule l'espace restant total dans le rack (somme des U libres).
     * @returns {number} - Nombre d'unités (U) disponibles.
     */
    availableU() {
        const usedU = this.cases.reduce((sum, c) => sum + c.component.sizeU, 0);
        return this.totalU - usedU;
    }
}
