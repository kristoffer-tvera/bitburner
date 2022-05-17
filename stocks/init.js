import { initialTarget, attackScript } from "/constants.js";
/** @param {NS} ns **/
export async function main(ns) {
  await ns.writePort(20, attackScript);
  await ns.writePort(1, initialTarget);

  if (ns.sleeve) {
    ns.exec("/sleeves/loop.js", "home");
    await ns.sleep(1000);
  }

  ns.exec("/stocks/joesguns.js", "home");
  await ns.sleep(1000);

  ns.exec("/attack/deploy.js", "home");
  await ns.sleep(1000);

  ns.tprint("Done initializing stock-scripts");
}
