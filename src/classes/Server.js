export default class Server {
    constructor() {
        this.processors = [];
        this.cpuCoolers = [];
        this.motherboard = null;
        this.gpu = null;
        this.psu = null;
        this.ram = [];
        this.storage = [];
        this.case = null; // optionnel
    }

    addProcessor(cpu) {
        this.processors.push(cpu);
    }
    addCpuCooler(cooler) {
        this.cpuCoolers.push(cooler);
    }
    setMotherboard(mb) {
        this.motherboard = mb;
    }
    setGPU(gpu) {
        this.gpu = gpu;
    }
    setPowerSupply(psu) {
        this.psu = psu;
    }
    addRAM(module) {
        this.ram.push(module);
    }
    addStorage(drive) {
        this.storage.push(drive);
    }
    setCase(pcCase) {
        this.case = pcCase;
    }

    // Calculer le prix total du serveur
    calculateTotalPrice() {
        let total = 0;
        this.processors.forEach((p) => (total += p.price || 0));
        this.cpuCoolers.forEach((c) => (total += c.price || 0));
        if (this.motherboard) total += this.motherboard.price || 0;
        if (this.gpu) total += this.gpu.price || 0;
        if (this.psu) total += this.psu.price || 0;
        if (this.case) total += this.case.price || 0;

        this.ram.forEach((r) => (total += r.price || 0));
        this.storage.forEach((s) => (total += s.price || 0));

        return total;
    }

    // --------------------------------------------------------------------------
    //                     CHECK COMPATIBILITY BETWEEN ALL PARTS
    // --------------------------------------------------------------------------

    checkCompatibility() {
        const issues = [];

        const cpus = this.processors;
        const coolers = this.cpuCoolers;
        const mb = this.motherboard;
        const gpu = this.gpu;
        const psu = this.psu;
        const ram = this.ram;
        const storage = this.storage;

        // ---------------------- Mandatory Components Check ----------------------
        if (cpus.length === 0) issues.push("Manquant : Processeur(s).");
        if (!mb) issues.push("Manquant : Carte mère.");
        if (ram.length === 0) issues.push("Manquant : Mémoire RAM.");
        if (storage.length === 0) issues.push("Manquant : Stockage."); // Assuming storage is mandatory
        if (!psu) issues.push("Manquant : Alimentation.");
        if (coolers.length === 0)
            issues.push("Manquant : Refroidissement CPU.");

        // ---------------------- CPU <-> Motherboard ----------------------
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

                if (cpu.memorySupport !== mb.memoryType)
                    issues.push(
                        `CPU #${
                            index + 1
                        } ↔ Carte mère : type de RAM incompatible.`
                    );
            });
        }

        // ---------------------- CPU <-> Cooler ----------------------
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

        // ---------------------- RAM <-> Motherboard <-> CPU ----------------------
        if (ram.length > 0 && mb) {
            // total slots used
            const totalModules = ram.reduce((sum, r) => sum + r.modules, 0);
            if (totalModules > mb.memorySlots)
                issues.push("RAM ↔ Carte mère : trop de barrettes installées.");

            // each kit
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

        // ---------------------- GPU <-> Motherboard ----------------------
        if (gpu && mb) {
            if (gpu.pcieVersion > mb.pcieVersion)
                issues.push(
                    "GPU ↔ Carte mère : PCIe de la carte mère trop ancien."
                );

            const x16Slot = mb.pcieSlots.find((s) => s.type === "x16");
            if (!x16Slot)
                issues.push(
                    "GPU ↔ Carte mère : aucun slot PCIe x16 disponible."
                );
        }

        // ---------------------- GPU <-> PSU ----------------------
        if (gpu && psu) {
            if (psu.wattage < gpu.recommendedPSU)
                issues.push("GPU ↔ PSU : puissance insuffisante pour le GPU.");
        }

        // ---------------------- PSU total wattage <-> ALL COMPONENTS ----------------------
        if (psu) {
            let totalPower = 0;

            cpus.forEach((c) => (totalPower += c.tdp));
            if (gpu) totalPower += gpu.tdp;
            ram.forEach((r) => (totalPower += 5 * r.modules));
            storage.forEach((s) => (totalPower += s.type === "M2" ? 5 : 8));

            // 20% headroom
            const requiredPSU = Math.round(totalPower * 1.2);

            if (psu.wattage < requiredPSU)
                issues.push(
                    `PSU : puissance insuffisante (nécessaire : ${requiredPSU}W minimum).`
                );
        }

        // ---------------------- Storage <-> Motherboard ----------------------
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

        // ---------------------- GPU/RAM/Cooler <-> Case (optionnel) ----------------------
        if (this.case) {
            if (gpu && gpu.length > this.case.gpuMaxLength)
                issues.push(
                    "GPU ↔ Boîtier : la carte graphique est trop longue."
                );

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

    printStatus() {
        const issues = this.checkCompatibility();

        console.log("────────────────────────────────────────");
        if (issues.length === 0) {
            console.log("✔️ TOUT EST COMPATIBLE !");
        } else {
            console.log("❌ INCOMPATIBILITÉS DÉTECTÉES :");
            issues.forEach((i) => console.log(" - " + i));
        }
        console.log("────────────────────────────────────────");
    }
}
