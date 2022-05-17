import { cities } from "/constants.js";

/** @param {NS} ns **/
export function GetActions(ns) {
  let index = 0;
  let actions = [];
  // for (let c = 0; c < cities.length; c++) {
  //   let city = cities[c];
  // }

  for (let i = 0; i < ns.bladeburner.getContractNames().length; i++) {
    let action = ns.bladeburner.getContractNames()[i];
    let successChance = ns.bladeburner.getActionEstimatedSuccessChance(
      "Contracts",
      action
    );
    // let level = ns.bladeburner.getActionCurrentLevel('contract', action);
    // let repGain = ns.bladeburner.getActionRepGain('contract', action, level);
    let remaining = ns.bladeburner.getActionCountRemaining("contract", action);

    actions.push({
      index: index++,
      name: action,
      successChance: successChance,
      type: "Contracts",
      // 'level': level,
      // 'rep': repGain,
      remaining: remaining,
    });
  }

  for (let i = 0; i < ns.bladeburner.getOperationNames().length; i++) {
    let action = ns.bladeburner.getOperationNames()[i];
    let successChance = ns.bladeburner.getActionEstimatedSuccessChance(
      "operation",
      action
    );
    // let level = ns.bladeburner.getActionCurrentLevel('operation', action);
    // let repGain = ns.bladeburner.getActionRepGain('operation', action, level);
    let remaining = ns.bladeburner.getActionCountRemaining("operation", action);

    actions.push({
      index: index++,
      name: action,
      successChance: successChance,
      type: "operation",
      // 'level': level,
      // 'rep': repGain,
      remaining: remaining,
    });
  }

  actions.sort((action1, action2) => {
    // let successChance = action1.successChance[0] - action2.successChance[0];
    // let index = action1.index - action2.index;
    // if (successChance != 0) return successChance;
    // return index;

    return action2.index - action1.index;
  });
  return actions;
}

/** @param {NS} ns **/
export function SwitchCity(ns) {
  let initialCity = ns.bladeburner.getCity();
  let bestCity = initialCity;
  let bestCityScore = 0;
  for (let j = 0; j < cities.length; j++) {
    ns.bladeburner.switchCity(cities[j]);
    let actions = GetActions(ns);
    let score = actions.reduce(
      (prev, current) => prev + current.successChance[0],
      0
    );
    ns.print("City: " + cities[j] + " has a score of " + score);

    if (score > bestCityScore) {
      bestCity = cities[j];
      bestCityScore = score;
    }
  }

  ns.bladeburner.switchCity(bestCity);
}

/** @param {NS} ns **/
export function SpendSkillpoints(ns) {
  let upgrades = [
    { skillName: "Digital Observer", weight: 1, limit: 999 },
    { skillName: "Blade's Intuition", weight: 0.75, limit: 999 },
    { skillName: "Reaper", weight: 0.6, limit: 999 },
    { skillName: "Evasive System", weight: 0.6, limit: 999 },
    { skillName: "Overclock", weight: 0.7, limit: 90 },
    { skillName: "Cloak", weight: 0.15, limit: 30 },
    { skillName: "Short-Circuit", weight: 0.15, limit: 30 },
    { skillName: "Hyperdrive", weight: 0.2, limit: 20 },
  ];

  let failsafeIteration = 50;

  while (true) {
    if (failsafeIteration-- < 0) {
      ns.print("Failsafe exit");
      return;
    }

    let sortedSkillUpgrades = [];
    for (let i = 0; i < upgrades.length; i++) {
      const element = upgrades[i];

      if (ns.bladeburner.getSkillLevel(element.skillName) >= element.limit)
        continue;

      sortedSkillUpgrades.push({
        skillName: element.skillName,
        weightScore:
          ns.bladeburner.getSkillUpgradeCost(element.skillName) /
          element.weight,
      });
    }

    if (sortedSkillUpgrades.length === 0) return;

    sortedSkillUpgrades.sort((a, b) => a.weightScore - b.weightScore);
    let currentSkillPoints = ns.bladeburner.getSkillPoints();
    let upgradeSkillCost = ns.bladeburner.getSkillUpgradeCost(
      sortedSkillUpgrades[0].skillName
    );

    if (currentSkillPoints >= upgradeSkillCost) {
      ns.bladeburner.upgradeSkill(sortedSkillUpgrades[0].skillName);
      ns.tprint("Upgrading " + sortedSkillUpgrades[0].skillName);
      ns.print("Upgrading " + sortedSkillUpgrades[0].skillName);
    } else {
      return;
    }
  }
}
