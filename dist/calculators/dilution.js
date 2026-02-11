"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dilution = dilution;
const prompts_1 = require("@inquirer/prompts");
async function dilution() {
    console.clear();
    console.log("Dilution/Concentration Calculator\n");
    try {
        const mode = await (0, prompts_1.select)({
            message: "What do you need to do?",
            choices: [
                { name: "Dilute (add water to lower gravity)", value: "dilute" },
                { name: "Concentrate (boil off to raise gravity)", value: "concentrate" },
            ],
        });
        const currentVolume = Number(await (0, prompts_1.input)({
            message: "Enter current volume (gallons):",
            validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
        }));
        const currentGravity = Number(await (0, prompts_1.input)({
            message: "Enter current gravity (e.g., 1.050):",
            validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
        }));
        const targetGravity = Number(await (0, prompts_1.input)({
            message: "Enter target gravity (e.g., 1.045):",
            validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
        }));
        if (mode === "dilute") {
            const targetVolume = (currentVolume * (currentGravity - 1)) / (targetGravity - 1);
            const waterToAdd = targetVolume - currentVolume;
            if (waterToAdd < 0) {
                console.log("\n⚠️  Target gravity is higher than current - you need to concentrate, not dilute!");
            }
            else {
                console.log("\nResults:");
                console.log(`Water to add: ${waterToAdd.toFixed(2)} gallons`);
                console.log(`Final volume: ${targetVolume.toFixed(2)} gallons`);
            }
        }
        else {
            const targetVolume = (currentVolume * (currentGravity - 1)) / (targetGravity - 1);
            const waterToBoilOff = currentVolume - targetVolume;
            if (waterToBoilOff < 0) {
                console.log("\nTarget gravity is lower than current - you need to dilute, not concentrate!");
            }
            else {
                console.log("\nResults:");
                console.log(`Water to boil off: ${waterToBoilOff.toFixed(2)} gallons`);
                console.log(`Final volume: ${targetVolume.toFixed(2)} gallons`);
            }
        }
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
