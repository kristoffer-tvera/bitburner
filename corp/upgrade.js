/** @param {NS} ns **/
export async function main(ns) {
  let data = ns.flags([
    ["count", 1],
    ["gui", false],
  ]);

  let upgrades = [
    "FocusWires",
    "Neural Accelerators",
    "Speech Processor Implants",
    "Nuoptimal Nootropic Injector Implants",
    "Smart Factories",
    "ABC SalesBots",
  ];

  if (data.gui) {
    upgrades = [];
    if (await ns.prompt("Focus Wire?")) {
      upgrades.push("FocusWires");
    }

    if (await ns.prompt("Neural Accelerators?")) {
      upgrades.push("Neural Accelerators");
    }

    if (await ns.prompt("Speech Processor Implants?")) {
      upgrades.push("Speech Processor Implants");
    }

    if (await ns.prompt("Nuoptimal Nootropic Injector Implants")) {
      upgrades.push("Nuoptimal Nootropic Injector Implants");
    }

    if (await ns.prompt("Smart Factories?")) {
      upgrades.push("Smart Factories");
    }

    if (await ns.prompt("ABC SalesBots?")) {
      upgrades.push("ABC SalesBots");
    }

    if (await ns.prompt("Project Insight")) {
      upgrades.push("Project Insight");
    }

    if (await ns.prompt("DreamSense")) {
      upgrades.push("DreamSense");
    }
  }

  for (let i = 0; i < upgrades.length; i++) {
    let currentLevel = ns.corporation.getUpgradeLevel(upgrades[i]);
    let upgradesToPerform = data.count - currentLevel;

    if (upgradesToPerform <= 0) continue;

    for (let j = 0; j < upgradesToPerform; j++) {
      ns.corporation.levelUpgrade(upgrades[i]);
      // ns.tprint('Upgrading ' + upgrades[i] + 'one time');
    }
  }
}
