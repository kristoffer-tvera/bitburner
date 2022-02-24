import * as Base from "/corp/base.js";
import { cities } from "/constants.js";
/** @param {NS} ns **/
export async function main(ns) {
  let industry = "Tobacco";

  //check if you have 170b
  let corp = ns.corporation.getCorporation();
  if (corp.funds < 325000000000) {
    ns.alert("This operation costs 325b");
    return;
  }

  for (let i = 0; i < 5; i++) {
    ns.corporation.levelUpgrade("Smart Storage");
  }

  ns.corporation.expandIndustry(industry, industry);

  for (let i = 1; i < cities.length; i++) {
    ns.corporation.expandCity(industry, cities[i]);
  }

  for (let i = 0; i < cities.length; i++) {
    if (!ns.corporation.hasWarehouse(industry, cities[i])) {
      ns.corporation.purchaseWarehouse(industry, cities[i]);
    }
    ns.corporation.setSmartSupply(industry, cities[i], true);

    while (ns.corporation.getWarehouse(industry, cities[i]).size < 2199) {
      ns.corporation.upgradeWarehouse(industry, cities[i]);
    }

    let upgradeSize = 9 - ns.corporation.getOffice(industry, cities[i]).size;
    ns.corporation.upgradeOfficeSize(industry, cities[i], upgradeSize);

    for (let j = 0; j < 9; j++) {
      ns.corporation.hireEmployee(industry, cities[i]);
    }

    await ns.corporation.setAutoJobAssignment(
      industry,
      cities[i],
      "Operations",
      2
    );
    await ns.corporation.setAutoJobAssignment(
      industry,
      cities[i],
      "Engineer",
      2
    );
    await ns.corporation.setAutoJobAssignment(
      industry,
      cities[i],
      "Business",
      1
    );
    await ns.corporation.setAutoJobAssignment(
      industry,
      cities[i],
      "Management",
      2
    );
    await ns.corporation.setAutoJobAssignment(
      industry,
      cities[i],
      "Research & Development",
      2
    );

    ns.corporation.buyMaterial(industry, cities[i], "Hardware", 586);
    ns.corporation.buyMaterial(industry, cities[i], "Robots", 140);
    ns.corporation.buyMaterial(industry, cities[i], "AI Cores", 352);
    ns.corporation.buyMaterial(industry, cities[i], "Real Estate", 7040);

    while (
      ns.corporation.getMaterial(industry, cities[i], "Hardware").qty < 2000
    ) {
      await ns.sleep(500);
    }

    ns.corporation.buyMaterial(industry, cities[i], "Hardware", 0);
    ns.corporation.buyMaterial(industry, cities[i], "Robots", 0);
    ns.corporation.buyMaterial(industry, cities[i], "AI Cores", 0);
    ns.corporation.buyMaterial(industry, cities[i], "Real Estate", 0);
  }

  let upgrades = [
    "FocusWires",
    "Neural Accelerators",
    "Speech Processor Implants",
    "Nuoptimal Nootropic Injector Implants",
    "Smart Factories",
    "Project Insight",
  ];

  for (let j = 0; j < 17; j++) {
    for (let i = 0; i < upgrades.length; i++) {
      ns.corporation.levelUpgrade(upgrades[i]);
    }
  }

  ns.corporation.makeProduct(
    "Tobacco",
    "Aevum",
    "Tobacco v0",
    1000000000,
    1000000000
  );

  ns.spawn("/corp/tobacco.js", 1, "--count", 3);

  ns.alert("Tobacco established");
}
