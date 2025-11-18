export default class Case {
    constructor({
        brand,
        model,

        formFactor, // ATX, Micro-ATX, Mini-ITX, E-ATX
        supportedMotherboards, // ["ATX", "Micro-ATX", "Mini-ITX"]

        gpuMaxLength, // longueur max GPU en mm
        gpuMaxWidthSlots, // nombre de slots max (2.5, 3)

        cpuCoolerMaxHeight, // hauteur max ventirad en mm

        psuMaxLength, // taille max PSU (en mm)

        driveBays35, // nombre de baies 3.5" (HDD)
        driveBays25, // nombre de baies 2.5" (SSD SATA)

        frontFans = [], // [{ size: 120, count: 2 }]
        topFans = [],
        rearFans = [],
        bottomFans = [],

        radiatorSupport = [], // support watercooling : [120, 240, 360]

        cableManagementSpace, // espace derrière le panneau (mm)
        hasPsuShroud, // cache alimentation oui/non

        maxRamHeight = 60, // par sécurité

        sizeU = 2, // Taille en U pour boîtiers serveurs
        price = 0, // Prix en €
    }) {
        this.brand = brand;
        this.model = model;

        this.formFactor = formFactor;
        this.supportedMotherboards = supportedMotherboards;

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

    // Vérifie compatibilité boîtier <-> GPU
    fitsGPU(gpu) {
        if (!gpu) return true;
        if (this.gpuMaxLength && gpu.length > this.gpuMaxLength) return false;
        if (this.gpuMaxWidthSlots && gpu.width > this.gpuMaxWidthSlots)
            return false;
        return true;
    }

    // Compatibilité boîtier <-> PSU
    fitsPSU(psu) {
        if (!psu || !this.psuMaxLength) return true;
        return psu.length <= this.psuMaxLength;
    }

    // Compatibilité boîtier <-> Carte mère
    fitsMotherboard(mb) {
        if (!mb) return true;
        return this.supportedMotherboards.includes(mb.formFactor);
    }

    // Compatibilité boîtier <-> Ventirad CPU
    fitsCPUCooler(coolerHeight) {
        return coolerHeight <= this.cpuCoolerMaxHeight;
    }

    // Compatibilité boîtier <-> RAM
    fitsRAM(module) {
        return module.height <= this.maxRamHeight;
    }
}
