/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  while (true) {
    ns.clearLog();

    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
      // let info = ns.sleeve.getInformation(i);
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

      ns.print(
        `Sleeve ${i} will perform default activity ("Rothman University", "Study Computer Science")`
      );

      ns.sleeve.setToUniversityCourse(
        i,
        "Rothman University",
        "Study Computer Science"
      );
    }

    await ns.sleep(10000);
  }
}
