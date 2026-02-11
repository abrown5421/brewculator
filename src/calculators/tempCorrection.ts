import { input, confirm } from "@inquirer/prompts";

export async function tempCorrection(): Promise<void> {
  console.clear();
  console.log("Hydrometer Temperature Correction\n");

  try {
    const measuredGravity = Number(await input({
      message: "Enter measured gravity (e.g., 1.050):",
      validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
    }));

    const measuredTemp = Number(await input({
      message: "Enter wort temperature (°F):",
      validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
    }));

    const calibrationTemp = Number(await input({
      message: "Enter hydrometer calibration temp (°F, typically 60 or 68):",
      default: "60",
      validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
    }));

    const tr = measuredTemp;
    const tc = calibrationTemp;
    
    const numerator = 1.00130346 - (0.000134722124 * tr) + (0.00000204052596 * tr * tr) - (0.00000000232820948 * tr * tr * tr);
    const denominator = 1.00130346 - (0.000134722124 * tc) + (0.00000204052596 * tc * tc) - (0.00000000232820948 * tc * tc * tc);
    
    const correctedGravity = measuredGravity * (numerator / denominator);
    const gravityDifference = correctedGravity - measuredGravity;
    const pointsDifference = gravityDifference * 1000;

    console.log("\nResults:");
    console.log(`Measured gravity: ${measuredGravity.toFixed(3)} @ ${measuredTemp}°F`);
    console.log(`Corrected gravity: ${correctedGravity.toFixed(3)} @ ${calibrationTemp}°F`);
    console.log(`Correction: ${pointsDifference > 0 ? '+' : ''}${pointsDifference.toFixed(1)} points`);
    
    if (Math.abs(pointsDifference) < 0.5) {
      console.log("✓ Temperature correction is minimal");
    } else if (measuredTemp > calibrationTemp) {
      console.log("Hot wort reads lower - actual gravity is higher");
    } else {
      console.log("Cold wort reads higher - actual gravity is lower");
    }

    const goBack = await confirm({
      message: "\nReturn to main menu?",
      default: true,
    });

    if (!goBack) {
      process.exit(0);
    }

  } catch (err) {
    console.error("Something went wrong:", err);
  }
}