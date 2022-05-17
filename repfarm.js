/** @param {NS} ns **/
export async function main(ns) {
  while (ns.singularity.isBusy()) {
    await ns.sleep(60000);
  }

  // while (ns.singularity.getFactionRep('Netburners') < 12500) {
  // 	let success = ns.singularity.workForFaction('Netburners', 'Hacking Contracts');
  // 	await ns.sleep(60000);
  // }

  while (ns.singularity.getFactionRep("Sector-12") < 7500) {
    let success = ns.singularity.workForFaction(
      "Sector-12",
      "Hacking Contracts"
    );
    if (!success) break;
    await ns.sleep(60000);
  }

  while (ns.singularity.getFactionRep("Netburners") < 12500) {
    let success = ns.singularity.workForFaction(
      "Netburners",
      "Hacking Contracts"
    );
    if (!success) break;
    await ns.sleep(60000);
  }

  while (ns.singularity.getFactionRep("CyberSec") < 18750) {
    let success = ns.singularity.workForFaction(
      "CyberSec",
      "Hacking Contracts"
    );
    if (!success) break;
    await ns.sleep(60000);
  }

  while (ns.singularity.getFactionRep("Tian Di Hui") < 7500) {
    ns.singularity.singularity.workForFaction(
      "Tian Di Hui",
      "Hacking Contracts"
    );
    if (!success) break;
    await ns.sleep(60000);
  }

  while (ns.singularity.getFactionRep("Aevum") < 50000) {
    let success = ns.singularity.workForFaction("Aevum", "Hacking Contracts");
    if (!success) break;
    await ns.sleep(60000);
  }

  while (true) {
    let success = ns.singularity.workForFaction("NiteSec", "Hacking Contracts");
    if (!success) break;
    await ns.sleep(60000);
  }
}
