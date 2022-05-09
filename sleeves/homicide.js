/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
    ns.sleeve.setToCommitCrime(i, "Homicide");
  }
}
