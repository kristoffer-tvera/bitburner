import * as Base from "/corp/base.js";
import { cities } from "/constants.js";
/** @param {NS} ns **/
export async function main(ns) {
  let industry = "Tobacco";

  //check if you have 170b
  //300000000000
  let corp = ns.corporation.getCorporation();
  if (corp.funds < 170000000000) {
    ns.alert("This operation costs 170b");
    return;
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

    while (ns.corporation.getWarehouse(industry, cities[i]).size < 599) {
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

    ns.corporation.buyMaterial(industry, cities[i], "Hardware", 160);
    ns.corporation.buyMaterial(industry, cities[i], "Robots", 39);
    ns.corporation.buyMaterial(industry, cities[i], "AI Cores", 96);
    ns.corporation.buyMaterial(industry, cities[i], "Real Estate", 1920);

    while (
      ns.corporation.getMaterial(industry, cities[i], "Hardware").qty < 100
    ) {
      await ns.sleep(500);
    }

    ns.corporation.buyMaterial(industry, cities[i], "Hardware", 0);
    ns.corporation.buyMaterial(industry, cities[i], "Robots", 0);
    ns.corporation.buyMaterial(industry, cities[i], "AI Cores", 0);
    ns.corporation.buyMaterial(industry, cities[i], "Real Estate", 0);
  }
}
