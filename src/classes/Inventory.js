/**
 * Gère l'inventaire du joueur (composants achetés).
 */
export default class Inventory {
    constructor() {
        // Stocke les items sous la forme : { "Nom du modèle": { component: Object, quantity: number, type: string } }
        this.items = {};
    }

    /**
     * Ajoute un composant à l'inventaire.
     * @param {Object} component - L'objet composant (ex: un processeur).
     * @param {string} type - Le type de composant (ex: "cpu", "ram").
     */
    add(component, type) {
        const key = component.model; // On utilise le modèle comme clé unique

        if (this.items[key]) {
            this.items[key].quantity += 1;
        } else {
            this.items[key] = {
                component: component,
                quantity: 1,
                type: type,
            };
        }
    }

    /**
     * Retire un composant de l'inventaire.
     * @param {Object} component - L'objet composant à retirer.
     * @returns {boolean} - True si retiré avec succès, False si pas assez de stock.
     */
    remove(component) {
        const key = component.model;
        if (this.items[key] && this.items[key].quantity > 0) {
            this.items[key].quantity -= 1;
            if (this.items[key].quantity === 0) {
                delete this.items[key];
            }
            return true;
        }
        return false;
    }

    /**
     * Vérifie si un composant est en stock.
     * @param {Object} component
     * @returns {boolean}
     */
    has(component) {
        const key = component.model;
        return this.items[key] && this.items[key].quantity > 0;
    }

    /**
     * Récupère la quantité d'un composant spécifique.
     * @param {Object} component
     * @returns {number}
     */
    getCount(component) {
        const key = component.model;
        return this.items[key] ? this.items[key].quantity : 0;
    }

    /**
     * Récupère tous les composants d'un certain type disponibles.
     * @param {string} type - Le type de composant (ex: "cpu", "motherboard").
     * @returns {Array} - Liste des composants (avec leur quantité attachée virtuellement si besoin, ou juste l'objet).
     */
    getItemsByType(type) {
        // Mappe les types du catalogue vers les types de l'inventaire si nécessaire
        // Ici on suppose que "type" correspond aux clés utilisées dans ServerWindow (cpu, ram, etc.)

        // Note: Dans le catalogue on a "processors", "motherboards". Dans ServerWindow on a "cpu", "motherboard".
        // Il faudra gérer ce mapping.

        return Object.values(this.items)
            .filter((item) => item.type === type)
            .map((item) => {
                // On doit conserver le prototype pour avoir accès aux méthodes de classe (ex: isCompatibleWithSocket)
                // On crée un nouvel objet qui hérite du prototype du composant original
                const componentWithQuantity = Object.create(
                    Object.getPrototypeOf(item.component)
                );
                // On copie les propriétés de l'instance
                Object.assign(componentWithQuantity, item.component);
                // On ajoute la quantité
                componentWithQuantity.inventoryQuantity = item.quantity;
                return componentWithQuantity;
            });
    }

    /**
     * Retourne tout l'inventaire sous forme de liste.
     */
    getAllItems() {
        return Object.values(this.items);
    }
}
