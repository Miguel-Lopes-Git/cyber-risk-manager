export default class GraphicsCard {
    constructor({
        brand, // NVIDIA, AMD, Intel
        model, // RTX 4080, RX 7900 XTX…
        chipset, // AD103, Navi 31…
        architecture, // Ada Lovelace, RDNA3…

        vram,
        vramType, // GDDR6, GDDR6X
        memoryBus, // 256-bit
        memoryBandwidth, // en GB/s

        baseClock,
        boostClock,

        tdp, // Consommation
        recommendedPSU, // Puissance recommandée alim
        powerConnectors, // Exemple : ["1x 12VHPWR"] ou ["2x 8-pin"]

        pcieVersion,
        pcieLanes, // x16 en général

        outputs = [], // Ports vidéo : HDMI, DisplayPort, USB-C
        cooling, // Air, Water, Hybrid
        fans, // Nombre de ventilateurs

        length, // Longueur en mm
        width, // Largeur en slots (2, 2.5, 3)
        height, // Hauteur en mm

        rayTracing,
        dlss, // DLSS / FSR / XeSS support
        features = [], // Autres features (AV1, HDR10+, etc.)
        price = 0, // Prix en €
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

    // Vérifier si la carte rentre dans un boîtier
    fitsInCase(maxLength, maxWidthSlots) {
        return this.length <= maxLength && this.width <= maxWidthSlots;
    }

    // Vérifier si une alimentation suffit
    isPSUSufficient(psuWattage) {
        return psuWattage >= this.recommendedPSU;
    }
}
