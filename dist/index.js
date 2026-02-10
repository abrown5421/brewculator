"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./menu");
async function start() {
    console.clear();
    console.log("🍺 Brewing Calculator CLI\n");
    await (0, menu_1.mainMenu)();
}
start();
