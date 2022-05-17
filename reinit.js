import { initialTarget, attackScript, attackScriptPort } from "/constants.js";
/** @param {NS} ns **/
export async function main(ns) {
  await ns.writePort(attackScriptPort, attackScript);
  await ns.sleep(1000);
  ns.exec("/attack/cc.js", "home", 1, initialTarget);
  await ns.sleep(1000);
  ns.exec("/attack/cc.js", "home");
}
