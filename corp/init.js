import * as Base from "/corp/base.js";
import { cities } from "/constants.js";
/** @param {NS} ns **/
export async function main(ns) {
  let data = ns.flags([["count", 1]]);

  let created = ns.corporation.createCorporation("Pepega Inc", true);
  if (!created) return;

  ns.corporation.expandIndustry("Agriculture", "Agriculture");

  for (let i = 1; i < cities.length; i++) {
    ns.corporation.expandCity("Agriculture", cities[i]);
  }

  ns.corporation.unlockUpgrade("Smart Supply");
  let upgrades = [
    "FocusWires",
    "Neural Accelerators",
    "Speech Processor Implants",
    "Nuoptimal Nootropic Injector Implants",
    "Smart Factories",
  ];

  for (let i = 0; i < upgrades.length; i++) {
    ns.corporation.levelUpgrade(upgrades[i]);
  }

  for (let i = 0; i < upgrades.length; i++) {
    ns.corporation.levelUpgrade(upgrades[i]);
  }

  for (let i = 0; i < cities.length; i++) {
    if (!ns.corporation.hasWarehouse("Agriculture", cities[i])) {
      ns.corporation.purchaseWarehouse("Agriculture", cities[i]);
    }
    ns.corporation.setSmartSupply("Agriculture", cities[i], true);

    while (ns.corporation.getWarehouse("Agriculture", cities[i]).size < 299) {
      ns.corporation.upgradeWarehouse("Agriculture", cities[i]);
    }

    ns.corporation.sellMaterial("Agriculture", cities[i], "Food", "MAX", "MP");
    ns.corporation.sellMaterial(
      "Agriculture",
      cities[i],
      "Plants",
      "MAX",
      "MP"
    );

    let employee1 = ns.orporation.hireEmployee("Agriculture", cities[i]);
    let employee2 = ns.corporation.hireEmployee("Agriculture", cities[i]);
    let employee3 = ns.corporation.hireEmployee("Agriculture", cities[i]);

    await ns.corporation.setAutoJobAssignment(
      "Agriculture",
      cities[i],
      "Operations",
      1
    );
    await ns.corporation.setAutoJobAssignment(
      "Agriculture",
      cities[i],
      "Engineer",
      1
    );
    await ns.corporation.setAutoJobAssignment(
      "Agriculture",
      cities[i],
      "Business",
      1
    );

    ns.corporation.buyMaterial("Agriculture", cities[i], "Hardware", 12.5);
    ns.corporation.buyMaterial("Agriculture", cities[i], "AI Cores", 7.5);
    ns.corporation.buyMaterial("Agriculture", cities[i], "Real Estate", 2700);

    while (
      ns.corporation.getMaterial("Agriculture", cities[i], "Hardware").qty < 100
    ) {
      await ns.sleep(500);
    }

    ns.corporation.buyMaterial("Agriculture", cities[i], "Hardware", 0);
    ns.corporation.buyMaterial("Agriculture", cities[i], "AI Cores", 0);
    ns.corporation.buyMaterial("Agriculture", cities[i], "Real Estate", 0);
  }

  if (ns.corporation.getDivision("Agriculture").awareness === 0) {
    ns.corporation.hireAdVert("Agriculture");
  }

  let awaitingInvestmentOffer = true;
  while (awaitingInvestmentOffer) {
    ns.toast("Awaiting investment offer (>3b)");
    let offer = ns.corporation.getInvestmentOffer();
    if (offer.round === 1 && offer.funds > 300000000000) {
      ns.corporation.acceptInvestmentOffer();
      awaitingInvestmentOffer = false;
    }

    await ns.sleep(2500);
  }

  // await Base.expandOffice(ns, data.count, 'RealEstate');
}
