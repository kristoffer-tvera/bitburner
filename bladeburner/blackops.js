/** @param {NS} ns **/
export async function main(ns) {
  let blackops = ns.bladeburner.getBlackOpNames();
  for (let i = 0; i < blackops.length; i++) {
    let time = ns.bladeburner.getActionTime("BlackOps", blackops[i]);
    let started = ns.bladeburner.startAction("BlackOps", blackops[i]);
    if (started) {
      await ns.sleep(time);
    }
  }
}
