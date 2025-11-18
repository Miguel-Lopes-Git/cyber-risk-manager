import Server from "../classes/Server.js";
import Brand from "../classes/Brand.js";
import {
    processors,
    motherboards,
    graphicsCards,
    ramModules,
    powerSupplies,
    cases,
    cpuCoolers,
} from "../data/initialData.js";

console.log("=== DÉBUT DES TESTS ===");

// ---------------------------------------------------------
// TEST 1 : Configuration Compatible
// ---------------------------------------------------------
console.log("\n--- TEST 1 : Configuration Compatible ---");
const server1 = new Server();

// Sélection des composants (Intel i9 + Z790 + RTX 4090 + 1000W PSU)
const cpu1 = processors.i9_13900k; // i9-13900K
const cooler1 = cpuCoolers.corsair_h150i; // Corsair AIO (LGA1700 compatible)
const mb1 = motherboards.asus_z790; // ASUS Z790
const gpu1 = graphicsCards.rtx_4090; // RTX 4090
const ram1 = ramModules.corsair_ddr5_16gb; // Corsair DDR5
const psu1 = powerSupplies.corsair_rm1000x; // Corsair 1000W
const case1 = cases.lianli_o11; // Lian Li O11

server1.addProcessor(cpu1);
server1.addCpuCooler(cooler1);
server1.setMotherboard(mb1);
server1.setGPU(gpu1);
server1.addRAM(ram1);
server1.addStorage({ type: "M2", price: 100 }); // Mock storage
server1.setPowerSupply(psu1);
server1.setCase(case1);

console.log("Composants sélectionnés :");
console.log(`- CPU: ${cpu1.brand.name} ${cpu1.model} (${cpu1.price}€)`);
console.log(
    `- Cooler: ${cooler1.brand.name} ${cooler1.model} (${cooler1.price}€)`
);
console.log(`- MB: ${mb1.brand.name} ${mb1.model} (${mb1.price}€)`);
console.log(`- GPU: ${gpu1.brand.name} ${gpu1.model} (${gpu1.price}€)`);
console.log(`- RAM: ${ram1.brand.name} ${ram1.model} (${ram1.price}€)`);
console.log(`- PSU: ${psu1.brand.name} ${psu1.model} (${psu1.price}€)`);
console.log(`- Case: ${case1.brand.name} ${case1.model} (${case1.price}€)`);

console.log("\nVérification de la compatibilité :");
server1.printStatus();

const totalPrice1 = server1.calculateTotalPrice();
console.log(`Prix total de la configuration : ${totalPrice1}€`);

// ---------------------------------------------------------
// TEST 2 : Configuration Incompatible
// ---------------------------------------------------------
console.log("\n--- TEST 2 : Configuration Incompatible ---");
const server2 = new Server();

// Sélection des composants incompatibles (AMD CPU + Intel MB)
const cpu2 = processors.ryzen9_7950x; // Ryzen 9 7950X (AM5)
const cooler2 = cpuCoolers.noctua_nhd15; // Noctua (AM5 compatible)
const mb2 = motherboards.asus_z790; // ASUS Z790 (LGA1700) - INCOMPATIBLE SOCKET
const gpu2 = graphicsCards.rtx_4090; // RTX 4090
const ram2 = ramModules.corsair_ddr5_16gb; // DDR5
const psu2 = powerSupplies.corsair_rm1000x; // 1000W

server2.addProcessor(cpu2);
server2.addCpuCooler(cooler2);
server2.setMotherboard(mb2);
server2.setGPU(gpu2);
server2.addRAM(ram2);
server2.addStorage({ type: "M2", price: 100 });
server2.setPowerSupply(psu2);

console.log("Composants sélectionnés (Incompatibles) :");
console.log(`- CPU: ${cpu2.brand.name} ${cpu2.model} (Socket: ${cpu2.socket})`);
console.log(`- MB: ${mb2.brand.name} ${mb2.model} (Socket: ${mb2.socket})`);

console.log("\nVérification de la compatibilité :");
server2.printStatus();

// ---------------------------------------------------------
// TEST 3 : Puissance insuffisante
// ---------------------------------------------------------
console.log("\n--- TEST 3 : Puissance Insuffisante ---");
const server3 = new Server();

// RTX 4090 (450W) + i9 (125W+) avec une petite alim
import PowerSupply from "../classes/PowerSupply.js";
const weakPsu = new PowerSupply({
    brand: new Brand({ name: "Generic", country: "Unknown" }),
    model: "Weak 400W",
    wattage: 400,
    efficiency: "None",
    modularity: "None",
    formFactor: "ATX",
    rails12V: 30,
    length: 140,
    price: 30,
});

server3.addProcessor(cpu1);
server3.addCpuCooler(cooler1);
server3.setMotherboard(mb1);
server3.setGPU(gpu1); // RTX 4090 needs 850W+
server3.addRAM(ram1);
server3.addStorage({ type: "M2", price: 100 });
server3.setPowerSupply(weakPsu);

console.log(
    `- PSU: ${weakPsu.brand.name} ${weakPsu.model} (${weakPsu.wattage}W)`
);
console.log(
    `- GPU: ${gpu1.brand.name} ${gpu1.model} (Rec PSU: ${gpu1.recommendedPSU}W)`
);

console.log("\nVérification de la compatibilité :");
server3.printStatus();

// ---------------------------------------------------------
// TEST 4 : Composants Manquants
// ---------------------------------------------------------
console.log("\n--- TEST 4 : Composants Manquants ---");
const server4 = new Server();
// Rien ajouté

console.log("\nVérification de la compatibilité :");
server4.printStatus();

console.log("\n=== FIN DES TESTS ===");
