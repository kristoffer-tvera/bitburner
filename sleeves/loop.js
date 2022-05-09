/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  while (true) {
    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
      // let info = ns.sleeve.getInformation(i);
      let stats = ns.sleeve.getSleeveStats(i);

      if (stats.sync < 100) {
        ns.sleeve.setToSynchronize(i);
        continue;
      }

      if (stats.shock > 0) {
        ns.sleeve.setToShockRecovery(i);
        continue;
      }

      ns.sleeve.setToUniversityCourse(
        i,
        "Rothman University",
        "Study Computer Science"
      );
    }

    await ns.sleep(1000);
  }
}
