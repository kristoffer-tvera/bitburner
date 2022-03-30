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
