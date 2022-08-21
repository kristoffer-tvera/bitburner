/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  let ready = false;

  while (!ready) {
    ns.clearLog();

    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
      let stats = ns.sleeve.getSleeveStats(i);

      if (stats.sync < 100) {
        ns.sleeve.setToSynchronize(i);
        ns.print(`Sleeve ${i} will syncronize (${stats.sync} out of 100)`);
        continue;
      }

      if (stats.shock > 5) {
        ns.sleeve.setToShockRecovery(i);
        ns.print(`Sleeve ${i} will recover shock (${stats.shock}, target 5)`);
        continue;
      }

      ready = true;
    }

    await ns.sleep(10000);
  }

  while (!ns.bladeburner.joinBladeburnerDivision()) {
    for (let i = 1; i < ns.sleeve.getNumSleeves(); i++) {
      ns.sleeve.setToCommitCrime(i, "Mug");
    }
    await ns.sleep(30000);
  }

  ns.sleeve.setToBladeburnerAction(0, "Diplomacy");

  for (let i = 1; i < ns.sleeve.getNumSleeves(); i++) {
    ns.sleeve.setToBladeburnerAction(i, "Infiltrate synthoids");
  }
}
