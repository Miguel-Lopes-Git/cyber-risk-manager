import Case from "../classes/Case.js";
import { brands } from "./brands.js";

export const cases = {
    // =================================================================================================
    // Mini-ITX
    // =================================================================================================
    next_h210: new Case({
        brand: brands.next,
        model: "H210",
        formFactor: "Mini-ITX",
        price: 80,
        cpuCoolerMaxHeight: 165,
    }),
    fractal_mess_node_202: new Case({
        brand: brands.fractal_mess,
        model: "Node 202",
        formFactor: "Mini-ITX",
        price: 90,
        cpuCoolerMaxHeight: 56,
        gpuMaxLength: 310,
    }),
    thermalfake_core_v1: new Case({
        brand: brands.thermalfake,
        model: "Core V1",
        formFactor: "Mini-ITX",
        price: 50,
        cpuCoolerMaxHeight: 140,
        gpuMaxLength: 285,
    }),
    lean_lee_q58: new Case({
        brand: brands.lean_lee,
        model: "Q58",
        formFactor: "Mini-ITX",
        price: 120,
        cpuCoolerMaxHeight: 67,
        gpuMaxLength: 320,
    }),
    heater_master_nr200: new Case({
        brand: brands.heater_master,
        model: "NR200",
        formFactor: "Mini-ITX",
        price: 80,
        cpuCoolerMaxHeight: 155,
    }),

    // =================================================================================================
    // Micro-ATX
    // =================================================================================================
    heater_master_q300l: new Case({
        brand: brands.heater_master,
        model: "MasterBox Q300L",
        formFactor: "Micro-ATX",
        price: 50,
        cpuCoolerMaxHeight: 159,
        gpuMaxLength: 360,
    }),
    fractal_mess_focus_g_mini: new Case({
        brand: brands.fractal_mess,
        model: "Focus G Mini",
        formFactor: "Micro-ATX",
        price: 60,
        cpuCoolerMaxHeight: 165,
    }),
    thermalfake_versa_h18: new Case({
        brand: brands.thermalfake,
        model: "Versa H18",
        formFactor: "Micro-ATX",
        price: 55,
        cpuCoolerMaxHeight: 155,
    }),
    sus_prime_ap201: new Case({
        brand: brands.sus,
        model: "Prime AP201",
        formFactor: "Micro-ATX",
        price: 80,
        cpuCoolerMaxHeight: 170,
    }),
    dark_flash_dlm21: new Case({
        brand: brands.noname,
        model: "DLM21 Mesh",
        formFactor: "Micro-ATX",
        price: 60,
        cpuCoolerMaxHeight: 160,
    }),

    // =================================================================================================
    // ATX
    // =================================================================================================
    next_h510: new Case({
        brand: brands.next,
        model: "H510",
        formFactor: "ATX",
        price: 70,
        cpuCoolerMaxHeight: 165,
    }),
    next_h5_flow: new Case({
        brand: brands.next,
        model: "H5 Flow",
        formFactor: "ATX",
        price: 90,
        cpuCoolerMaxHeight: 165,
    }),
    next_h7_flow: new Case({
        brand: brands.next,
        model: "H7 Flow",
        formFactor: "ATX",
        price: 130,
        cpuCoolerMaxHeight: 185,
    }),

    fractal_mess_meshify_c: new Case({
        brand: brands.fractal_mess,
        model: "Meshify C",
        formFactor: "ATX",
        price: 90,
        cpuCoolerMaxHeight: 170,
    }),
    fractal_mess_define_7: new Case({
        brand: brands.fractal_mess,
        model: "Define 7",
        formFactor: "ATX",
        price: 160,
        cpuCoolerMaxHeight: 185,
    }),
    fractal_mess_north: new Case({
        brand: brands.fractal_mess,
        model: "North",
        formFactor: "ATX",
        price: 140,
        cpuCoolerMaxHeight: 170,
    }),

    pirate_4000d_airflow: new Case({
        brand: brands.pirate,
        model: "4000D Airflow",
        formFactor: "ATX",
        price: 90,
        cpuCoolerMaxHeight: 170,
    }),
    pirate_5000d_airflow: new Case({
        brand: brands.pirate,
        model: "5000D Airflow",
        formFactor: "ATX",
        price: 150,
        cpuCoolerMaxHeight: 170,
    }),
    pirate_icue_465x: new Case({
        brand: brands.pirate,
        model: "iCUE 465X",
        formFactor: "ATX",
        price: 140,
        cpuCoolerMaxHeight: 170,
    }),

    lean_lee_o11_dynamic: new Case({
        brand: brands.lean_lee,
        model: "O11 Dynamic",
        formFactor: "ATX",
        price: 140,
        cpuCoolerMaxHeight: 155,
    }),
    lean_lee_lancool_ii_mesh: new Case({
        brand: brands.lean_lee,
        model: "Lancool II Mesh",
        formFactor: "ATX",
        price: 110,
        cpuCoolerMaxHeight: 176,
        gpuMaxLength: 384,
    }),
    lean_lee_lancool_216: new Case({
        brand: brands.lean_lee,
        model: "Lancool 216",
        formFactor: "ATX",
        price: 100,
        cpuCoolerMaxHeight: 180,
    }),

    beloud_pure_base_500dx: new Case({
        brand: brands.beloud,
        model: "Pure Base 500DX",
        formFactor: "ATX",
        price: 100,
        cpuCoolerMaxHeight: 190,
    }),
    beloud_silent_base_802: new Case({
        brand: brands.beloud,
        model: "Silent Base 802",
        formFactor: "ATX",
        price: 170,
        cpuCoolerMaxHeight: 185,
    }),

    phanteks_p400a: new Case({
        brand: brands.phanteks,
        model: "Eclipse P400A",
        formFactor: "ATX",
        price: 90,
        cpuCoolerMaxHeight: 160,
    }),
    phanteks_g360a: new Case({
        brand: brands.phanteks,
        model: "Eclipse G360A",
        formFactor: "ATX",
        price: 100,
        cpuCoolerMaxHeight: 162,
        gpuMaxLength: 400,
    }),

    // =================================================================================================
    // E-ATX (Full Tower)
    // =================================================================================================
    pirate_7000d_airflow: new Case({
        brand: brands.pirate,
        model: "7000D Airflow",
        formFactor: "E-ATX",
        price: 250,
        cpuCoolerMaxHeight: 190,
    }),
    pirate_1000d: new Case({
        brand: brands.pirate,
        model: "Obsidian 1000D",
        formFactor: "E-ATX",
        price: 500,
        cpuCoolerMaxHeight: 180,
    }),

    fractal_mess_define_7_xl: new Case({
        brand: brands.fractal_mess,
        model: "Define 7 XL",
        formFactor: "E-ATX",
        price: 220,
        cpuCoolerMaxHeight: 185,
    }),
    fractal_mess_meshify_2_xl: new Case({
        brand: brands.fractal_mess,
        model: "Meshify 2 XL",
        formFactor: "E-ATX",
        price: 200,
        cpuCoolerMaxHeight: 185,
    }),

    lean_lee_o11_dynamic_xl: new Case({
        brand: brands.lean_lee,
        model: "O11 Dynamic XL",
        formFactor: "E-ATX",
        price: 220,
        cpuCoolerMaxHeight: 167,
    }),
    heater_master_cosmos_c700m: new Case({
        brand: brands.heater_master,
        model: "Cosmos C700M",
        formFactor: "E-ATX",
        price: 450,
        cpuCoolerMaxHeight: 198,
        gpuMaxLength: 490,
    }),
};
