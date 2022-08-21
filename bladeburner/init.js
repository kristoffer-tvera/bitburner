import { GetActions, SwitchCity, SpendSkillpoints } from "/bladeburner/base.js";
import { StartWork } from "/stocks/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  if (!ns.isRunning("/sleeves/bladeburner-loop.js", "home")) {
    ns.exec("/sleeves/bladeburner-loop.js", "home");
  }

  if (!ns.isRunning("/hacknet/loop.js", "home", 1, "--upgrade", true)) {
    ns.exec("/hacknet/loop.js", "home", 1, "--upgrade", true);
  }

  if (!ns.isRunning("/util/faction-joiner.js", "home", 1)) {
    ns.exec("/util/faction-joiner.js", "home", 1);
  }

  ns.exec("/stock/init.js", "home", 1);
  ns.exec("/reinit.js", "home", 1);

  while (!ns.bladeburner.joinBladeburnerDivision()) {
    let companyName = "Joe's Guns";
    let field = "employee";

    let factionWorkSucceded = ns.singularity.workForFaction(
      "Sector-12",
      "Security Work",
      true
    );

    if (!factionWorkSucceded) {
      StartWork(ns, companyName, field);
    }
    await ns.sleep(60000);
  }

  if (ns.singularity.isBusy()) ns.singularity.stopAction();

  if (!ns.isRunning("/bladeburner/loop.js", "home")) {
    ns.spawn("/bladeburner/loop.js", 1);
  }

  // while (true) {
  //   ns.clearLog();
  //   await ns.sleep(30000);
  // }
}
