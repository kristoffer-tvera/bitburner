import { cities } from "/constants.js";
import { GetActions } from "/bladeburner/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    let actions = GetActions(ns);
    const [current, max] = ns.bladeburner.getStamina();
    let currentAction = ns.bladeburner.getCurrentAction();
    let targetAction = actions.find(
      (action) => action.successChance[0] > 0.75 && action.remaining > 0
    );
    if (!targetAction) {
      targetAction = {
        name: "Training",
        type: "General",
      };
    }

    ns.print("Actions:");
    ns.print(actions);
    ns.print("Target Actions");
    ns.print(targetAction);

    let sleepTime =
      currentAction.type === "Idle"
        ? 5000
        : ns.bladeburner.getActionTime(currentAction.type, currentAction.name);

    if (current < max / 2) {
      if (currentAction.name !== "Field Analysis") {
        ns.bladeburner.stopBladeburnerAction();
        ns.bladeburner.startAction("General", "Field Analysis");
        sleepTime = ns.bladeburner.getActionTime("General", "Field Analysis");
      }
    } else {
      if (currentAction.name !== targetAction.name) {
        ns.bladeburner.stopBladeburnerAction();
        ns.bladeburner.startAction(targetAction.type, targetAction.name);
        sleepTime = ns.bladeburner.getActionTime(
          targetAction.type,
          targetAction.name
        );
      }
    }

    await ns.sleep(sleepTime);
  }
}
