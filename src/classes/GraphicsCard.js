/**
 * Représente une carte graphique (GPU).
 */
export default class GraphicsCard {
    /**
     * Constructeur de la classe GraphicsCard (Carte Graphique).
     * @param {Object} params - Les paramètres de la carte graphique.
     * @param {string} params.brand - La marque (ex: NVIDIA, AMD, Intel).
     * @param {string} params.model - Le modèle (ex: RTX 4080, RX 7900 XTX).
     * @param {string} params.chipset - Le chipset graphique (ex: AD103, Navi 31).
     * @param {string} params.architecture - L'architecture (ex: Ada Lovelace, RDNA3).
     * @param {number} params.vram - Quantité de mémoire vidéo (VRAM) en Go.
     * @param {string} params.vramType - Type de mémoire vidéo (ex: GDDR6, GDDR6X).
     * @param {number} params.memoryBus - Largeur du bus mémoire en bits (ex: 256-bit).
     * @param {number} params.memoryBandwidth - Bande passante mémoire en GB/s.
     * @param {number} params.baseClock - Fréquence de base en MHz.
     * @param {number} params.boostClock - Fréquence boost en MHz.
     * @param {number} params.tdp - Consommation électrique (TDP) en Watts.
     * @param {number} params.recommendedPSU - Puissance recommandée pour l'alimentation en Watts.
     * @param {string[]} params.powerConnectors - Connecteurs d'alimentation requis (ex: ["1x 12VHPWR"] ou ["2x 8-pin"]).
     * @param {string} params.pcieVersion - Version du port PCIe (ex: 4.0, 5.0).
     * @param {number} params.pcieLanes - Nombre de lignes PCIe utilisées (ex: x16).
     * @param {string[]} params.outputs - Ports de sortie vidéo (ex: HDMI, DisplayPort, USB-C).
     * @param {string} params.cooling - Type de refroidissement (ex: Air, Water, Hybrid).
     * @param {number} params.fans - Nombre de ventilateurs.
     * @param {number} params.length - Longueur de la carte en mm.
     * @param {number} params.width - Largeur de la carte en slots (ex: 2, 2.5, 3).
     * @param {number} params.height - Hauteur de la carte en mm.
     * @param {boolean} params.rayTracing - Support du Ray Tracing.
     * @param {string} params.dlss - Support des technologies d'upscaling (ex: DLSS, FSR, XeSS).
     * @param {string[]} params.features - Autres fonctionnalités (ex: AV1, HDR10+).
     * @param {number} params.price - Prix de la carte graphique en €.
     */
    constructor({
        brand,
        model,
        chipset,
        architecture,

        vram,
        vramType,
        memoryBus,
        memoryBandwidth,

        baseClock,
        boostClock,

        tdp,
        recommendedPSU,
        powerConnectors,

        pcieVersion,
        pcieLanes,

        outputs = [],
        cooling,
        fans,

        length,
        width,
        height,

        rayTracing,
        dlss,
        features = [],
        price = 0,
    }) {
        this.brand = brand;
        this.model = model;
        this.chipset = chipset;
        this.architecture = architecture;

        this.vram = vram;
        this.vramType = vramType;
        this.memoryBus = memoryBus;
        this.memoryBandwidth = memoryBandwidth;

        this.baseClock = baseClock;
        this.boostClock = boostClock;

        this.tdp = tdp;
        this.recommendedPSU = recommendedPSU;
        this.powerConnectors = powerConnectors;

        this.pcieVersion = pcieVersion;
        this.pcieLanes = pcieLanes;

        this.outputs = outputs;

        this.cooling = cooling;
        this.fans = fans;

        this.length = length;
        this.width = width;
        this.height = height;

        this.rayTracing = rayTracing;
        this.dlss = dlss;
        this.features = features;
        this.price = price;
    }

    /**
     * Vérifie si la carte graphique rentre dans un boîtier donné.
     * @param {number} maxLength - Longueur maximale acceptée par le boîtier en mm.
     * @param {number} maxWidthSlots - Largeur maximale acceptée par le boîtier en slots.
     * @returns {boolean} - Retourne true si la carte rentre, sinon false.
     */
    fitsInCase(maxLength, maxWidthSlots) {
        return this.length <= maxLength && this.width <= maxWidthSlots;
    }

    /**
     * Vérifie si une alimentation est suffisante pour cette carte graphique.
     * @param {number} psuWattage - Puissance de l'alimentation en Watts.
     * @returns {boolean} - Retourne true si l'alimentation est suffisante, sinon false.
     */
    isPSUSufficient(psuWattage) {
        return psuWattage >= this.recommendedPSU;
    }
}
