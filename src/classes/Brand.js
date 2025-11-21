/**
 * Représente une marque de composant informatique.
 */
export default class Brand {
    /**
     * Constructeur de la classe Brand.
     * @param {Object} params - Les paramètres de la marque.
     * @param {string} params.name - Le nom de la marque.
     * @param {string} params.country - Le pays d'origine de la marque.
     */
    constructor({ name, country }) {
        this.name = name;
        this.country = country;
    }
}
