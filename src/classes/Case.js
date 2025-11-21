/**
 * Représente un boîtier d'ordinateur (PC Case).
 */
export default class Case {
    /**
     * Constructeur de la classe Case (Boîtier).
     * @param {Object} params - Les paramètres du boîtier.
     * @param {string} params.brand - La marque du boîtier.
     * @param {string} params.model - Le modèle du boîtier.
     * @param {string} params.formFactor - Le format du boîtier (ex: ATX, Micro-ATX, Mini-ITX, E-ATX).
     * @param {string[]} params.supportedMotherboards - Liste des formats de cartes mères supportés (ex: ["ATX", "Micro-ATX"]).
     * @param {number} params.gpuMaxLength - Longueur maximale de la carte graphique en mm.
     * @param {number} params.gpuMaxWidthSlots - Nombre de slots maximum pour la carte graphique (ex: 2.5, 3).
     * @param {number} params.cpuCoolerMaxHeight - Hauteur maximale du ventirad CPU en mm.
     * @param {number} params.psuMaxLength - Longueur maximale de l'alimentation en mm.
     * @param {number} params.driveBays35 - Nombre de baies 3.5" (pour disques durs HDD).
     * @param {number} params.driveBays25 - Nombre de baies 2.5" (pour SSD SATA).
     * @param {Object[]} params.frontFans - Ventilateurs avant inclus (ex: [{ size: 120, count: 2 }]).
     * @param {Object[]} params.topFans - Ventilateurs supérieurs inclus.
     * @param {Object[]} params.rearFans - Ventilateurs arrière inclus.
     * @param {Object[]} params.bottomFans - Ventilateurs inférieurs inclus.
     * @param {number[]} params.radiatorSupport - Tailles de radiateurs watercooling supportées (ex: [120, 240, 360]).
     * @param {number} params.cableManagementSpace - Espace disponible pour le câble management en mm.
     * @param {boolean} params.hasPsuShroud - Indique si un cache alimentation est présent.
     * @param {number} params.maxRamHeight - Hauteur maximale de la RAM en mm (par sécurité).
     * @param {number} params.sizeU - Taille en unités de rack (U) pour les boîtiers serveurs.
     * @param {number} params.price - Prix du boîtier en €.
     */
    constructor({
        brand,
        model,

        formFactor,
        supportedMotherboards,

        gpuMaxLength,
        gpuMaxWidthSlots,

        cpuCoolerMaxHeight,

        psuMaxLength,

        driveBays35,
        driveBays25,

        frontFans = [],
        topFans = [],
        rearFans = [],
        bottomFans = [],

        radiatorSupport = [],

        cableManagementSpace,
        hasPsuShroud,

        maxRamHeight = 60,

        sizeU = 2,
        price = 0,
    }) {
        this.brand = brand;
        this.model = model;

        this.formFactor = formFactor;
        // Si la liste des cartes mères supportées n'est pas définie, on la déduit du format du boîtier (formFactor)
        if (supportedMotherboards) {
            this.supportedMotherboards = supportedMotherboards;
        } else {
            switch (formFactor) {
                case "E-ATX":
                    this.supportedMotherboards = [
                        "E-ATX",
                        "ATX",
                        "Micro-ATX",
                        "Mini-ITX",
                    ];
                    break;
                case "ATX":
                    this.supportedMotherboards = [
                        "ATX",
                        "Micro-ATX",
                        "Mini-ITX",
                    ];
                    break;
                case "Micro-ATX":
                    this.supportedMotherboards = ["Micro-ATX", "Mini-ITX"];
                    break;
                case "Mini-ITX":
                    this.supportedMotherboards = ["Mini-ITX"];
                    break;
                default:
                    this.supportedMotherboards = [];
            }
        }

        this.gpuMaxLength = gpuMaxLength;
        this.gpuMaxWidthSlots = gpuMaxWidthSlots;

        this.cpuCoolerMaxHeight = cpuCoolerMaxHeight;

        this.psuMaxLength = psuMaxLength;

        this.driveBays35 = driveBays35;
        this.driveBays25 = driveBays25;

        this.frontFans = frontFans;
        this.topFans = topFans;
        this.rearFans = rearFans;
        this.bottomFans = bottomFans;

        this.radiatorSupport = radiatorSupport;

        this.cableManagementSpace = cableManagementSpace;
        this.hasPsuShroud = hasPsuShroud;

        this.maxRamHeight = maxRamHeight;

        this.sizeU = sizeU;
        this.price = price;
    }

    /**
     * Vérifie la compatibilité entre le boîtier et la carte graphique (GPU).
     * @param {Object} gpu - L'objet carte graphique à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    fitsGPU(gpu) {
        if (!gpu) return true;
        if (this.gpuMaxLength && gpu.length > this.gpuMaxLength) return false;
        if (this.gpuMaxWidthSlots && gpu.width > this.gpuMaxWidthSlots)
            return false;
        return true;
    }

    /**
     * Vérifie la compatibilité entre le boîtier et l'alimentation (PSU).
     * @param {Object} psu - L'objet alimentation à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    fitsPSU(psu) {
        if (!psu || !this.psuMaxLength) return true;
        return psu.length <= this.psuMaxLength;
    }

    /**
     * Vérifie la compatibilité entre le boîtier et la carte mère.
     * @param {Object} mb - L'objet carte mère à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    fitsMotherboard(mb) {
        if (!mb) return true;
        return this.supportedMotherboards.includes(mb.formFactor);
    }

    /**
     * Vérifie la compatibilité entre le boîtier et le ventirad CPU.
     * @param {number} coolerHeight - La hauteur du ventirad en mm.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    fitsCPUCooler(coolerHeight) {
        return coolerHeight <= this.cpuCoolerMaxHeight;
    }

    /**
     * Vérifie la compatibilité entre le boîtier et la mémoire RAM (hauteur).
     * @param {Object} module - L'objet module de RAM à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    fitsRAM(module) {
        return module.height <= this.maxRamHeight;
    }
}
