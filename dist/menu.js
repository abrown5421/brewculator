"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = mainMenu;
const prompts_1 = require("@inquirer/prompts");
const abv_1 = require("./calculators/abv");
const ibu_1 = require("./calculators/ibu");
async function mainMenu() {
    const choice = await (0, prompts_1.select)({
        message: "Select a brewing calculator:",
        choices: [
            { name: "ABV Calculator", value: "abv" },
            { name: "IBU Calculator", value: "ibu" },
            { name: "SRM Calculator", value: "srm" },
            { name: "Dilution Calculator", value: "dilution" },
            { name: "Boil-off Calculator", value: "boiloff" },
            { name: "Hydrometer Temp Adjustment", value: "hydrometer" },
            { name: "Exit", value: "exit" }
        ]
    });
    switch (choice) {
        case "abv":
            await (0, abv_1.abv)();
            break;
        case "ibu":
            await (0, ibu_1.ibu)();
            break;
        case "srm":
            await console.log("srm");
            break;
        case "dilution":
            await console.log("dilution");
            break;
        case "boiloff":
            await console.log("boiloff");
            break;
        case "hydrometer":
            await console.log("hydrometer");
            break;
        case "exit":
            console.log("🍻 Cheers!");
            process.exit(0);
    }
    await mainMenu();
}
