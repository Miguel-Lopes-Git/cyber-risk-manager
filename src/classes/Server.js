/**
 * Représente un serveur complet composé de plusieurs composants matériels.
 */
export default class Server {
    /**
     * Constructeur de la classe Server.
     * Initialise les listes de composants vides.
     */
    constructor() {
        this.processors = [];
        this.cpuCoolers = [];
        this.motherboard = null;
        this.gpus = [];
        this.psu = null;
        this.ram = [];
        this.storage = [];
        this.case = null;
    }

    /**
     * Ajoute un processeur au serveur.
     * @param {Processor} cpu - Le processeur à ajouter.
     */
    addProcessor(cpu) {
        this.processors.push(cpu);
    }

    /**
     * Ajoute un refroidisseur CPU au serveur.
     * @param {CpuCooler} cooler - Le refroidisseur à ajouter.
     */
    addCpuCooler(cooler) {
        this.cpuCoolers.push(cooler);
    }

    /**
     * Définit la carte mère du serveur.
     * @param {Motherboard} mb - La carte mère à installer.
     */
    setMotherboard(mb) {
        this.motherboard = mb;
    }

    /**
     * Ajoute une carte graphique au serveur.
     * @param {GraphicsCard} gpu - La carte graphique à ajouter.
     */
    addGPU(gpu) {
        this.gpus.push(gpu);
    }

    /**
     * Définit l'alimentation du serveur.
     * @param {PowerSupply} psu - L'alimentation à installer.
     */
    setPowerSupply(psu) {
        this.psu = psu;
    }

    /**
     * Ajoute une barrette de RAM au serveur.
     * @param {Ram} module - La barrette de mémoire à ajouter.
     */
    addRAM(module) {
        this.ram.push(module);
    }

    /**
     * Ajoute un périphérique de stockage au serveur.
     * @param {Object} drive - Le disque dur ou SSD à ajouter.
     */
    addStorage(drive) {
        this.storage.push(drive);
    }

    /**
     * Définit le boîtier du serveur.
     * @param {Case} pcCase - Le boîtier à utiliser.
     */
    setCase(pcCase) {
        this.case = pcCase;
    }

    /**
     * Calcule le prix total du serveur en additionnant le prix de tous les composants.
     * @returns {number} - Le prix total en €.
     */
    calculateTotalPrice() {
        let total = 0;
        this.processors.forEach((p) => (total += p.price || 0));
        this.cpuCoolers.forEach((c) => (total += c.price || 0));
        if (this.motherboard) total += this.motherboard.price || 0;
        this.gpus.forEach((g) => (total += g.price || 0));
        if (this.psu) total += this.psu.price || 0;
        if (this.case) total += this.case.price || 0;

        this.ram.forEach((r) => (total += r.price || 0));
        this.storage.forEach((s) => (total += s.price || 0));

        return total;
    }

    // --------------------------------------------------------------------------
    //                     VÉRIFICATION DE LA COMPATIBILITÉ
    // --------------------------------------------------------------------------

    /**
     * Vérifie la compatibilité entre tous les composants du serveur.
     * @returns {string[]} - Une liste de chaînes de caractères décrivant les problèmes trouvés.
     */
    checkCompatibility() {
        const issues = [];

        const cpus = this.processors;
        const coolers = this.cpuCoolers;
        const mb = this.motherboard;
        const gpus = this.gpus;
        const psu = this.psu;
        const ram = this.ram;
        const storage = this.storage;

        // ---------------------- Vérification des composants obligatoires ----------------------
        if (cpus.length === 0) issues.push("Manquant : Processeur(s).");
        if (!mb) issues.push("Manquant : Carte mère.");
        if (ram.length === 0) issues.push("Manquant : Mémoire RAM.");
        if (storage.length === 0) issues.push("Manquant : Stockage."); // On suppose que le stockage est obligatoire
        if (!psu) issues.push("Manquant : Alimentation.");
        if (coolers.length === 0)
            issues.push("Manquant : Refroidissement CPU.");

        // ---------------------- CPU <-> Carte Mère ----------------------
        if (mb) {
            if (cpus.length > mb.cpuSockets) {
                issues.push(
                    `CPU ↔ Carte mère : trop de processeurs (${cpus.length}) pour la carte mère (${mb.cpuSockets} sockets).`
                );
            }

            cpus.forEach((cpu, index) => {
                if (cpu.socket !== mb.socket)
                    issues.push(
                        `CPU #${
                            index + 1
                        } ↔ Carte mère : le socket ne correspond pas.`
                    );

                // Vérification de la compatibilité mémoire via la méthode de la carte mère si disponible
                if (
                    mb.isProcessorCompatible &&
                    typeof mb.isProcessorCompatible === "function"
                ) {
                    // Cette méthode vérifie déjà la mémoire, mais on veut un message d'erreur spécifique pour la RAM
                    // On réplique donc la logique ici :
                    const supportedTypes = cpu.memorySupport
                        ? cpu.memorySupport.split("/").map((t) => t.trim())
                        : [];
                    if (!supportedTypes.includes(mb.memoryType)) {
                        issues.push(
                            `CPU #${
                                index + 1
                            } ↔ Carte mère : type de RAM incompatible (${
                                cpu.memorySupport
                            } vs ${mb.memoryType}).`
                        );
                    }
                } else if (cpu.memorySupport !== mb.memoryType) {
                    // Fallback pour l'ancienne logique si nécessaire
                    const supportedTypes = cpu.memorySupport
                        ? cpu.memorySupport.split("/").map((t) => t.trim())
                        : [];
                    if (!supportedTypes.includes(mb.memoryType)) {
                        issues.push(
                            `CPU #${
                                index + 1
                            } ↔ Carte mère : type de RAM incompatible.`
                        );
                    }
                }
            });
        }

        // ---------------------- CPU <-> Refroidissement ----------------------
        if (cpus.length > 0) {
            if (coolers.length < cpus.length) {
                issues.push(
                    `Refroidissement : pas assez de refroidisseurs (${coolers.length}) pour les processeurs (${cpus.length}).`
                );
            }

            cpus.forEach((cpu, index) => {
                const cooler = coolers[index];
                if (cooler) {
                    if (!cooler.isCompatibleWithSocket(cpu.socket)) {
                        issues.push(
                            `Cooler #${index + 1} ↔ CPU #${
                                index + 1
                            } : socket incompatible.`
                        );
                    }
                    if (!cooler.isSufficientForTDP(cpu.tdp)) {
                        issues.push(
                            `Cooler #${index + 1} ↔ CPU #${
                                index + 1
                            } : TDP insuffisant.`
                        );
                    }
                }
            });
        }

        // ---------------------- RAM <-> Carte Mère <-> CPU ----------------------
        if (ram.length > 0 && mb) {
            // Nombre total de slots utilisés
            const totalModules = ram.reduce((sum, r) => sum + r.modules, 0);
            if (totalModules > mb.memorySlots)
                issues.push("RAM ↔ Carte mère : trop de barrettes installées.");

            // Vérification pour chaque kit de RAM
            ram.forEach((r) => {
                if (r.type !== mb.memoryType)
                    issues.push(
                        `RAM ${r.model} : type incompatible avec carte mère.`
                    );

                cpus.forEach((cpu, index) => {
                    if (r.type !== cpu.memorySupport)
                        issues.push(
                            `RAM ${r.model} : type incompatible avec CPU #${
                                index + 1
                            }.`
                        );

                    if (r.speed > cpu.memorySpeed)
                        issues.push(
                            `RAM ${
                                r.model
                            } : fréquence trop élevée pour le CPU #${
                                index + 1
                            }.`
                        );
                });

                if (r.speed > mb.memorySpeed)
                    issues.push(
                        `RAM ${r.model} : fréquence trop élevée pour la carte mère.`
                    );
            });
        }

        // ---------------------- GPU <-> Carte Mère ----------------------
        if (gpus.length > 0 && mb) {
            gpus.forEach((gpu, index) => {
                if (gpu.pcieVersion > mb.pcieVersion)
                    issues.push(
                        `GPU #${
                            index + 1
                        } ↔ Carte mère : PCIe de la carte mère trop ancien.`
                    );
            });

            // Vérification des slots disponibles (simplifié)
            // On suppose que chaque GPU prend un slot x16 pour l'instant
            const x16Slots = mb.pcieSlots.filter(
                (s) => s.type === "x16"
            ).length;
            if (gpus.length > x16Slots) {
                issues.push(
                    `GPU ↔ Carte mère : pas assez de slots PCIe x16 (${x16Slots} dispos, ${gpus.length} requis).`
                );
            }
        }

        // ---------------------- GPU <-> Alimentation (PSU) ----------------------
        if (gpus.length > 0 && psu) {
            gpus.forEach((gpu, index) => {
                // Cette vérification est par GPU vs PSU wattage ? Non, le wattage PSU est total.
                // Une vérification individuelle pourrait concerner les connecteurs.
                // Nous vérifions la puissance totale plus tard.
            });
        }

        // ---------------------- Puissance totale PSU <-> TOUS LES COMPOSANTS ----------------------
        if (psu) {
            let totalPower = 0;

            cpus.forEach((c) => (totalPower += c.tdp));
            gpus.forEach((g) => (totalPower += g.tdp));
            ram.forEach((r) => (totalPower += 5 * r.modules));
            storage.forEach((s) => (totalPower += s.type === "M2" ? 5 : 8));

            // Marge de sécurité de 20%
            const requiredPSU = Math.round(totalPower * 1.2);

            if (psu.wattage < requiredPSU)
                issues.push(
                    `PSU : puissance insuffisante (nécessaire : ${requiredPSU}W minimum).`
                );
        }

        // ---------------------- Stockage <-> Carte Mère ----------------------
        if (storage.length > 0 && mb) {
            const m2Used = storage.filter((s) => s.type === "M2").length;
            const sataUsed = storage.filter((s) => s.type === "SATA").length;

            if (m2Used > mb.m2Slots.length)
                issues.push(
                    "Stockage : trop de SSD M.2 pour les slots disponibles."
                );

            if (sataUsed > mb.sataPorts)
                issues.push(
                    "Stockage : trop de disques SATA pour les ports disponibles."
                );
        }

        // ---------------------- GPU/RAM/Cooler <-> Boîtier (optionnel) ----------------------
        if (this.case) {
            gpus.forEach((gpu, index) => {
                if (gpu.length > this.case.gpuMaxLength)
                    issues.push(
                        `GPU #${
                            index + 1
                        } ↔ Boîtier : la carte graphique est trop longue.`
                    );
            });

            ram.forEach((r) => {
                if (r.height > this.case.maxRamHeight)
                    issues.push(
                        `RAM ${r.model} : trop haute pour le boîtier / ventirad.`
                    );
            });

            coolers.forEach((c, index) => {
                if (c.height > this.case.cpuCoolerMaxHeight) {
                    issues.push(
                        `Cooler #${index + 1} ↔ Boîtier : trop haut (${
                            c.height
                        }mm > ${this.case.cpuCoolerMaxHeight}mm).`
                    );
                }
            });
        }

        return issues;
    }
}
