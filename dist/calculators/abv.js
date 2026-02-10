"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abv = abv;
const prompts_1 = require("@inquirer/prompts");
async function abv() {
    console.clear();
    console.log("ABV Calculator\n");
    try {
        const ogIn = await (0, prompts_1.input)({
            message: "Enter Original Gravity (OG):",
            validate: (value) => {
                if (isNaN(Number(value)))
                    return "Must be a number";
                return true;
            }
        });
        const og = Number(ogIn);
        const fgIn = await (0, prompts_1.input)({
            message: "Enter Final Gravity (FG):",
            validate: (value) => {
                if (isNaN(Number(value)))
                    return "Must be a number";
                return true;
            }
        });
        const fg = Number(fgIn);
        const result = 131.25 * (og - fg);
        console.log(`A starting gravity of ${og} and a finishing gravity of ${fg} will yield a beer with a ${result}% ABV`);
        const goBack = await (0, prompts_1.confirm)({
            message: "Return to main menu?",
            default: true
        });
        if (!goBack) {
            process.exit(0);
        }
    }
    catch (err) {
        console.error("Something went wrong:", err);
    }
}
