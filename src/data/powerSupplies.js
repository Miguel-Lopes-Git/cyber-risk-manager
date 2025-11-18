import PowerSupply from "../classes/PowerSupply.js";
import { brands } from "./brands.js";

export const powerSupplies = {
    // =================================================================================================
    // Entry Level (Non-Modular / Bronze)
    // =================================================================================================
    noname_300w: new PowerSupply({
        brand: brands.noname,
        model: "Generic 300W",
        wattage: 300,
        efficiency: "None",
        modularity: "Non-Modular",
        price: 15,
    }),
    explosive_400w: new PowerSupply({
        brand: brands.explosive,
        model: "FireHazard 400W",
        wattage: 400,
        efficiency: "None",
        modularity: "Non-Modular",
        price: 20,
    }),

    evg_450w_bronze: new PowerSupply({
        brand: brands.evg,
        model: "450 BR",
        wattage: 450,
        efficiency: "80+ Bronze",
        modularity: "Non-Modular",
        price: 35,
    }),
    pirate_450w_bronze: new PowerSupply({
        brand: brands.pirate,
        model: "CV450",
        wattage: 450,
        efficiency: "80+ Bronze",
        modularity: "Non-Modular",
        price: 40,
    }),

    evg_500w_white: new PowerSupply({
        brand: brands.evg,
        model: "500 W1",
        wattage: 500,
        efficiency: "80+ White",
        modularity: "Non-Modular",
        price: 40,
    }),
    thermalfake_500w_white: new PowerSupply({
        brand: brands.thermalfake,
        model: "Smart 500W",
        wattage: 500,
        efficiency: "80+ White",
        modularity: "Non-Modular",
        price: 40,
    }),

    pirate_550w_bronze: new PowerSupply({
        brand: brands.pirate,
        model: "CV550",
        wattage: 550,
        efficiency: "80+ Bronze",
        modularity: "Non-Modular",
        price: 50,
    }),
    seasoned_550w_bronze: new PowerSupply({
        brand: brands.seasoned,
        model: "S12III 550",
        wattage: 550,
        efficiency: "80+ Bronze",
        modularity: "Non-Modular",
        price: 55,
    }),

    // =================================================================================================
    // Mid Range (Semi-Modular / Gold)
    // =================================================================================================
    pirate_650w_bronze_semi: new PowerSupply({
        brand: brands.pirate,
        model: "CX650M",
        wattage: 650,
        efficiency: "80+ Bronze",
        modularity: "Semi-Modular",
        price: 70,
    }),
    evg_650w_gold_semi: new PowerSupply({
        brand: brands.evg,
        model: "650 GQ",
        wattage: 650,
        efficiency: "80+ Gold",
        modularity: "Semi-Modular",
        price: 80,
    }),

    seasoned_650w_gold_semi: new PowerSupply({
        brand: brands.seasoned,
        model: "Focus GM-650",
        wattage: 650,
        efficiency: "80+ Gold",
        modularity: "Semi-Modular",
        price: 90,
    }),
    heater_master_650w_gold_full: new PowerSupply({
        brand: brands.heater_master,
        model: "MWE Gold 650",
        wattage: 650,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 95,
    }),

    pirate_750w_gold_full: new PowerSupply({
        brand: brands.pirate,
        model: "RM750x",
        wattage: 750,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 110,
    }),
    evg_750w_gold_full: new PowerSupply({
        brand: brands.evg,
        model: "750 G5",
        wattage: 750,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 115,
    }),
    seasoned_750w_gold_full: new PowerSupply({
        brand: brands.seasoned,
        model: "Focus GX-750",
        wattage: 750,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 120,
    }),

    // =================================================================================================
    // High End (Full-Modular / Platinum / Titanium)
    // =================================================================================================
    pirate_850w_gold_full: new PowerSupply({
        brand: brands.pirate,
        model: "RM850x",
        wattage: 850,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 130,
    }),
    evg_850w_gold_full: new PowerSupply({
        brand: brands.evg,
        model: "850 G6",
        wattage: 850,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 135,
    }),
    seasoned_850w_platinum_full: new PowerSupply({
        brand: brands.seasoned,
        model: "Focus PX-850",
        wattage: 850,
        efficiency: "80+ Platinum",
        modularity: "Full-Modular",
        price: 160,
    }),

    pirate_1000w_gold_full: new PowerSupply({
        brand: brands.pirate,
        model: "RM1000x",
        wattage: 1000,
        efficiency: "80+ Gold",
        modularity: "Full-Modular",
        price: 180,
    }),
    evg_1000w_platinum_full: new PowerSupply({
        brand: brands.evg,
        model: "1000 P6",
        wattage: 1000,
        efficiency: "80+ Platinum",
        modularity: "Full-Modular",
        price: 220,
    }),
    seasoned_1000w_titanium_full: new PowerSupply({
        brand: brands.seasoned,
        model: "Prime TX-1000",
        wattage: 1000,
        efficiency: "80+ Titanium",
        modularity: "Full-Modular",
        price: 280,
    }),

    pirate_1200w_platinum_full: new PowerSupply({
        brand: brands.pirate,
        model: "HX1200",
        wattage: 1200,
        efficiency: "80+ Platinum",
        modularity: "Full-Modular",
        price: 250,
    }),
    beloud_1200w_titanium_full: new PowerSupply({
        brand: brands.beloud,
        model: "Dark Power Pro 12 1200W",
        wattage: 1200,
        efficiency: "80+ Titanium",
        modularity: "Full-Modular",
        price: 350,
    }),

    pirate_1600w_titanium_full: new PowerSupply({
        brand: brands.pirate,
        model: "AX1600i",
        wattage: 1600,
        efficiency: "80+ Titanium",
        modularity: "Full-Modular",
        price: 500,
    }),
    evg_1600w_titanium_full: new PowerSupply({
        brand: brands.evg,
        model: "1600 T2",
        wattage: 1600,
        efficiency: "80+ Titanium",
        modularity: "Full-Modular",
        price: 550,
    }),
};
