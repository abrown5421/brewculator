import { select } from "@inquirer/prompts";
import { abv } from "./calculators/abv";
import { ibu } from "./calculators/ibu";
import { srm } from "./calculators/srm";

export async function mainMenu(): Promise<void> {
  const choice = await select({
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
      await abv();
      break;
    case "ibu":
      await ibu();
      break;
    case "srm":
      await srm();
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
