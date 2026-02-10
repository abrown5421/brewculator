import { input, confirm } from "@inquirer/prompts";

export async function abv(): Promise<void> {
  console.clear();
  console.log("ABV Calculator\n");

  try {
    const ogIn: string = await input({
      message: "Enter Original Gravity (OG):",
      validate: (value) => {
        if (isNaN(Number(value))) return "Must be a number";
        return true;
      }
    });
    const og: number = Number(ogIn)

    const fgIn: string = await input({
      message: "Enter Final Gravity (FG):",
      validate: (value) => {
        if (isNaN(Number(value))) return "Must be a number";
        return true;
      }
    });
    const fg: number = Number(fgIn)

    const result: string = (131.25 * (og - fg)).toFixed(2)

    console.log(`A starting gravity of ${og} and a finishing gravity of ${fg} will yield a beer with a ${result}% ABV`)

    const goBack = await confirm({
      message: "Return to main menu?",
      default: true
    });

    if (!goBack) {
      process.exit(0);
    }

  } catch (err) {
    console.error("Something went wrong:", err);
  }
}
