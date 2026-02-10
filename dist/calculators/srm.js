"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.srm = srm;
const prompts_1 = require("@inquirer/prompts");
const srmToHex = {
    1: "#FFE699", 2: "#FFD878", 3: "#FFCA5A", 4: "#FFBF42",
    5: "#FBB123", 6: "#F8A600", 7: "#F39C00", 8: "#EA8F00",
    9: "#E58500", 10: "#DE7C00", 11: "#D77200", 12: "#CF6900",
    13: "#CB6200", 14: "#C35900", 15: "#BB5100", 16: "#B54C00",
    17: "#B04500", 18: "#A63E00", 19: "#A13700", 20: "#9B3200",
    21: "#952D00", 22: "#8E2900", 23: "#882300", 24: "#821E00",
    25: "#7B1A00", 26: "#771900", 27: "#701400", 28: "#6A0E00",
    29: "#660D00", 30: "#5E0B00", 31: "#5A0A02", 32: "#560A05",
    33: "#520907", 34: "#4C0505", 35: "#470606", 36: "#440607",
    37: "#3F0708", 38: "#3B0607", 39: "#3A070B", 40: "#36080A"
};
function getSrmColor(srm) {
    const roundedSrm = Math.min(40, Math.max(1, Math.round(srm)));
    return srmToHex[roundedSrm] || "#000000";
}
function displayColorBox(hexColor, srm) {
    const colorBar = `\x1b[48;2;${parseInt(hexColor.slice(1, 3), 16)};${parseInt(hexColor.slice(3, 5), 16)};${parseInt(hexColor.slice(5, 7), 16)}m          \x1b[0m`;
    console.log("\nBeer Color Preview:");
    console.log(colorBar);
    console.log(colorBar);
    console.log(colorBar);
    console.log(`SRM: ${srm.toFixed(1)} | Hex: ${hexColor}`);
}
async function srm() {
    console.clear();
    console.log("SRM Calculator\n");
    try {
        const batchSize = Number(await (0, prompts_1.input)({
            message: "Enter Batch Size (gallons):",
            validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
        }));
        const grains = [];
        let addMoreGrains = true;
        while (addMoreGrains) {
            console.log(`\n--- Adding Grain #${grains.length + 1} ---\n`);
            const pounds = Number(await (0, prompts_1.input)({
                message: "Enter grain weight (pounds):",
                validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
            }));
            const lovibond = Number(await (0, prompts_1.input)({
                message: "Enter grain color (Lovibond):",
                validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
            }));
            grains.push({ pounds, lovibond });
            addMoreGrains = await (0, prompts_1.confirm)({
                message: "Add another grain?",
                default: true,
            });
        }
        let totalMCU = 0;
        let totalGrainWeight = 0;
        for (const grain of grains) {
            const mcu = (grain.pounds * grain.lovibond) / batchSize;
            totalMCU += mcu;
            totalGrainWeight += grain.pounds;
        }
        const srm = 1.4922 * Math.pow(totalMCU, 0.6859);
        const hexColor = getSrmColor(srm);
        console.log("\nBatch Info:");
        console.log(`Batch Size: ${batchSize} gallons`);
        console.log(`Total Grain: ${totalGrainWeight.toFixed(2)} lbs`);
        console.log(`Grain Additions: ${grains.length}`);
        console.log(`Calculated SRM: ${srm.toFixed(1)}`);
        displayColorBox(hexColor, srm);
        const goBack = await (0, prompts_1.confirm)({
            message: "\nReturn to main menu?",
            default: true,
        });
        if (!goBack) {
            process.exit(0);
        }
    }
    catch (err) {
        console.error("Something went wrong:", err);
    }
}
