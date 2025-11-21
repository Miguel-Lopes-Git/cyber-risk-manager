import CpuCooler from "../classes/CpuCooler.js";
import { brands } from "./brands.js";

const modernSockets = [
    "LGA1700",
    "LGA1200",
    "LGA1151",
    "LGA1150",
    "LGA1155",
    "AM5",
    "AM4",
    "AM3+",
];
const legacySockets = ["LGA775", "LGA1156", "LGA1366", "AM2", "AM2+", "AM3"];
const allSockets = [...modernSockets, ...legacySockets];

export const cpuCoolers = {
    // =================================================================================================
    // Air Coolers
    // =================================================================================================
    pintel_stock: new CpuCooler({
        brand: brands.pintel,
        model: "Stock Cooler",
        type: "Air",
        tdp: 65,
        price: 0,
        sockets: allSockets,
        height: 50,
    }),
    mad_stock_wraith_stealth: new CpuCooler({
        brand: brands.mad,
        model: "Wraith Stealth",
        type: "Air",
        tdp: 65,
        price: 0,
        sockets: ["AM4", "AM5"],
        height: 55,
    }),
    mad_stock_wraith_prism: new CpuCooler({
        brand: brands.mad,
        model: "Wraith Prism",
        type: "Air",
        tdp: 105,
        price: 0,
        sockets: ["AM4", "AM5", "AM3+"],
        height: 90,
    }),

    heater_master_hyper_212: new CpuCooler({
        brand: brands.heater_master,
        model: "Hyper 212 Evo",
        type: "Air",
        tdp: 150,
        price: 30,
        sockets: allSockets,
        height: 159,
    }),
    heater_master_hyper_212_rgb: new CpuCooler({
        brand: brands.heater_master,
        model: "Hyper 212 RGB",
        type: "Air",
        tdp: 150,
        price: 40,
        sockets: allSockets,
        height: 159,
    }),

    deepcool_ak400: new CpuCooler({
        brand: brands.deepcool,
        model: "AK400",
        type: "Air",
        tdp: 180,
        price: 35,
        sockets: modernSockets,
        height: 155,
    }),
    deepcool_ak620: new CpuCooler({
        brand: brands.deepcool,
        model: "AK620",
        type: "Air",
        tdp: 260,
        price: 65,
        sockets: modernSockets,
        height: 160,
    }),

    beloud_pure_rock_2: new CpuCooler({
        brand: brands.beloud,
        model: "Pure Rock 2",
        type: "Air",
        tdp: 150,
        price: 40,
        sockets: modernSockets,
        height: 155,
    }),
    beloud_dark_rock_pro_4: new CpuCooler({
        brand: brands.beloud,
        model: "Dark Rock Pro 4",
        type: "Air",
        tdp: 250,
        price: 90,
        sockets: modernSockets,
        height: 163,
    }),

    owlcool_nh_u12s: new CpuCooler({
        brand: brands.owlcool,
        model: "NH-U12S",
        type: "Air",
        tdp: 170,
        price: 60,
        sockets: allSockets,
        height: 158,
    }),
    owlcool_nh_d15: new CpuCooler({
        brand: brands.owlcool,
        model: "NH-D15",
        type: "Air",
        tdp: 250,
        price: 100,
        sockets: allSockets,
        height: 165,
    }),
    owlcool_nh_l9i: new CpuCooler({
        brand: brands.owlcool,
        model: "NH-L9i",
        type: "Air",
        tdp: 95,
        price: 45,
        sockets: ["LGA1700", "LGA1200", "LGA115x"],
        height: 37,
    }), // Low profile

    scythe_fuma_2: new CpuCooler({
        brand: brands.scythe,
        model: "Fuma 2",
        type: "Air",
        tdp: 200,
        price: 60,
        sockets: modernSockets,
        height: 155,
    }),
    arctic_freezer_34: new CpuCooler({
        brand: brands.arctic,
        model: "Freezer 34 eSports",
        type: "Air",
        tdp: 180,
        price: 40,
        sockets: modernSockets,
        height: 157,
    }),

    // =================================================================================================
    // AIO (Liquid Coolers)
    // =================================================================================================

    // 120mm
    pirate_h60: new CpuCooler({
        brand: brands.pirate,
        model: "H60",
        type: "AIO",
        tdp: 150,
        price: 70,
        sockets: allSockets,
        height: 55,
    }),
    heater_master_ml120l: new CpuCooler({
        brand: brands.heater_master,
        model: "MasterLiquid ML120L",
        type: "AIO",
        tdp: 150,
        price: 60,
        sockets: allSockets,
        height: 55,
    }),

    // 240mm
    pirate_h100i_rgb: new CpuCooler({
        brand: brands.pirate,
        model: "H100i RGB Pro",
        type: "AIO",
        tdp: 250,
        price: 120,
        sockets: allSockets,
        height: 55,
    }),
    next_kraken_x53: new CpuCooler({
        brand: brands.next,
        model: "Kraken X53",
        type: "AIO",
        tdp: 250,
        price: 130,
        sockets: modernSockets,
        height: 55,
    }),
    arctic_liquid_freezer_ii_240: new CpuCooler({
        brand: brands.arctic,
        model: "Liquid Freezer II 240",
        type: "AIO",
        tdp: 250,
        price: 90,
        sockets: modernSockets,
        height: 65,
    }),
    deepcool_ls520: new CpuCooler({
        brand: brands.deepcool,
        model: "LS520",
        type: "AIO",
        tdp: 250,
        price: 100,
        sockets: modernSockets,
        height: 55,
    }),
    lean_lee_galahad_240: new CpuCooler({
        brand: brands.lean_lee,
        model: "Galahad 240",
        type: "AIO",
        tdp: 250,
        price: 120,
        sockets: modernSockets,
        height: 60,
    }),

    // 280mm
    pirate_h115i_rgb: new CpuCooler({
        brand: brands.pirate,
        model: "H115i RGB Pro",
        type: "AIO",
        tdp: 280,
        price: 140,
        sockets: allSockets,
        height: 55,
    }),
    next_kraken_x63: new CpuCooler({
        brand: brands.next,
        model: "Kraken X63",
        type: "AIO",
        tdp: 280,
        price: 150,
        sockets: modernSockets,
        height: 55,
    }),
    arctic_liquid_freezer_ii_280: new CpuCooler({
        brand: brands.arctic,
        model: "Liquid Freezer II 280",
        type: "AIO",
        tdp: 280,
        price: 110,
        sockets: modernSockets,
        height: 65,
    }),

    // 360mm
    pirate_h150i_elite: new CpuCooler({
        brand: brands.pirate,
        model: "H150i Elite Capellix",
        type: "AIO",
        tdp: 350,
        price: 180,
        sockets: modernSockets,
        height: 55,
    }),
    next_kraken_x73: new CpuCooler({
        brand: brands.next,
        model: "Kraken X73",
        type: "AIO",
        tdp: 350,
        price: 180,
        sockets: modernSockets,
        height: 55,
    }),
    arctic_liquid_freezer_ii_360: new CpuCooler({
        brand: brands.arctic,
        model: "Liquid Freezer II 360",
        type: "AIO",
        tdp: 350,
        price: 130,
        sockets: modernSockets,
        height: 65,
    }),
    deepcool_ls720: new CpuCooler({
        brand: brands.deepcool,
        model: "LS720",
        type: "AIO",
        tdp: 350,
        price: 140,
        sockets: modernSockets,
        height: 55,
    }),
    lean_lee_galahad_360: new CpuCooler({
        brand: brands.lean_lee,
        model: "Galahad 360",
        type: "AIO",
        tdp: 350,
        price: 160,
        sockets: modernSockets,
        height: 60,
    }),
    mzi_mag_coreliquid_360r: new CpuCooler({
        brand: brands.mzi,
        model: "MAG CoreLiquid 360R",
        type: "AIO",
        tdp: 350,
        price: 130,
        sockets: modernSockets,
        height: 55,
    }),

    // 420mm
    pirate_h170i_elite: new CpuCooler({
        brand: brands.pirate,
        model: "H170i Elite Capellix",
        type: "AIO",
        tdp: 400,
        price: 230,
        sockets: modernSockets,
        height: 55,
    }),
    arctic_liquid_freezer_ii_420: new CpuCooler({
        brand: brands.arctic,
        model: "Liquid Freezer II 420",
        type: "AIO",
        tdp: 400,
        price: 150,
        sockets: modernSockets,
        height: 65,
    }),
};
