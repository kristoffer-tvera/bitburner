import { programs } from "/constants.js";
/** @param {NS} ns **/
export async function main(ns) {
  while (ns.singularity.isBusy()) {
    await ns.sleep(1000);
  }

  for (let i = 0; i < programs.length; i++) {
    const prgram = programs[i];
    ns.singularity.createProgram(prgram, true);
    while (ns.singularity.isBusy()) {
      await ns.sleep(1000);
    }
  }
}
