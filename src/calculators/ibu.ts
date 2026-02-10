import { input, confirm } from "@inquirer/prompts";

interface HopAddition {
  ounces: number;
  alphaAcid: number;
  boilTime: number;
}

const utilizationTable: Record<number, Record<number, number>> = {
  0:   { 1.03: 0.000, 1.04: 0.000, 1.05: 0.000, 1.06: 0.000, 1.07: 0.000, 1.08: 0.000, 1.09: 0.000, 1.10: 0.000 },
  5:   { 1.03: 0.055, 1.04: 0.050, 1.05: 0.046, 1.06: 0.042, 1.07: 0.038, 1.08: 0.035, 1.09: 0.032, 1.10: 0.029 },
  10:  { 1.03: 0.100, 1.04: 0.091, 1.05: 0.084, 1.06: 0.076, 1.07: 0.070, 1.08: 0.064, 1.09: 0.058, 1.10: 0.053 },
  30:  { 1.03: 0.212, 1.04: 0.194, 1.05: 0.177, 1.06: 0.162, 1.07: 0.148, 1.08: 0.135, 1.09: 0.124, 1.10: 0.113 },
  60:  { 1.03: 0.276, 1.04: 0.252, 1.05: 0.231, 1.06: 0.211, 1.07: 0.193, 1.08: 0.176, 1.09: 0.161, 1.10: 0.147 },
  90:  { 1.03: 0.295, 1.04: 0.270, 1.05: 0.247, 1.06: 0.226, 1.07: 0.206, 1.08: 0.188, 1.09: 0.172, 1.10: 0.157 },
};

const gravityKeys = [1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.10];
const timeKeys = [0, 5, 10, 30, 60, 90];

function getUtilization(gravity: number, boilTime: number): number {
  const nearestGravity = gravityKeys.reduce((prev, curr) =>
    Math.abs(curr - gravity) < Math.abs(prev - gravity) ? curr : prev
  );

  const nearestTime = timeKeys.reduce((prev, curr) =>
    Math.abs(curr - boilTime) < Math.abs(prev - boilTime) ? curr : prev
  );

  return utilizationTable[nearestTime][nearestGravity];
}

export async function ibu(): Promise<void> {
  console.clear();
  console.log("IBU Calculator\n");

  try {
    const preBoilSize = Number(await input({
      message: "Enter Pre Boil Size (gal):",
      validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
    }));

    const postBoilSize = Number(await input({
      message: "Enter Post Boil Size (gal):",
      validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
    }));

    const targetOg = Number(await input({
      message: "Enter Target OG:",
      validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
    }));
    const boilGravity = 1 + ((targetOg - 1) * postBoilSize / preBoilSize);
    const hops: HopAddition[] = [];
    let addMoreHops = true;

    while (addMoreHops) {
      console.log(`\n--- Adding Hop Charge #${hops.length + 1} ---\n`);

      const ounces = Number(await input({
        message: "Enter ounces:",
        validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
      }));

      const alphaAcid = Number(await input({
        message: "Enter Alpha Acid (%):",
        validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
      }));

      const boilTime = Number(await input({
        message: "Enter Boil Time (minutes):",
        validate: (value) => isNaN(Number(value)) ? "Must be a number" : true,
      }));

      hops.push({ ounces, alphaAcid, boilTime });

      addMoreHops = await confirm({
        message: "Add another hop charge?",
        default: true,
      });
    }

    let totalIBU = 0;
    let totalHopOz = 0;

    for (const hop of hops) {
        const util = getUtilization(boilGravity, hop.boilTime);
        const aau = hop.ounces * hop.alphaAcid;
        const ibu = (aau * util * 75) / postBoilSize;
        totalIBU += ibu;
        totalHopOz += hop.ounces;
    }

    console.log("\nBatch Info:");
    console.log(`Pre Boil (gal): ${preBoilSize}`);
    console.log(`Post Boil (gal): ${postBoilSize}`);
    console.log(`Target OG: ${targetOg}`);
    console.log(`Hop Charges: ${hops.length} charges, ${totalHopOz} ounces`);
    console.log(`Batch IBU: ${totalIBU.toFixed(2)}`);

    const goBack = await confirm({
      message: "Return to main menu?",
      default: true,
    });

    if (!goBack) {
      process.exit(0);
    }

  } catch (err) {
    console.error("Something went wrong:", err);
  }
}
