import { mainMenu } from "./menu";

async function start() {
  console.clear();
  console.log("🍺 Brewing Calculator CLI\n");

  await mainMenu();
}

start();
