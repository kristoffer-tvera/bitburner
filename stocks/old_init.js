import {
  attackScriptPort,
  portTarget,
  initialTarget,
  attackScript,
} from "/constants.js";

/** @param {NS} ns **/
export async function main(ns) {
  await ns.writePort(attackScriptPort, attackScript);
  await ns.writePort(portTarget, initialTarget);

  ns.exec("/attack/cc.js", "home");
  await ns.sleep(100);

  if (ns.sleeve) {
    ns.exec("/sleeves/loop.js", "home");
    await ns.sleep(1000);
  }

  if (ns.gang.inGang()) {
    if (ns.gang.getGangInformation().isHacking) {
      ns.exec("/gang/loop.js", "home");
    } else {
      ns.exec("/gang/alt-loop.js", "home");
    }

    await ns.sleep(100);
  }

  if (ns.stock.purchase4SMarketDataTixApi()) {
    ns.exec("/stocks/smart-loop.js", "home");
  } else {
    ns.exec("/stocks/loop.js", "home");
  }
  await ns.sleep(1000);

  ns.exec("/attack/deploy.js", "home");
  await ns.sleep(1000);

  ns.tprint("Done initializing stock-scripts");
}
