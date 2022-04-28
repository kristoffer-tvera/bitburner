/** @param {NS} ns **/
export async function main(ns) {
  while (ns.isBusy()) {
    await ns.sleep(60000);
  }

  // while (ns.getFactionRep('Netburners') < 12500) {
  // 	ns.workForFaction('Netburners', 'Hacking Contracts');
  // 	await ns.sleep(60000);
  // }

  while (ns.getFactionRep("Sector-12") < 7500) {
    ns.workForFaction("Sector-12", "Hacking Contracts");
    await ns.sleep(60000);
  }

  while (ns.getFactionRep("CyberSec") < 18750) {
    ns.workForFaction("CyberSec", "Hacking Contracts");
    await ns.sleep(60000);
  }

  while (ns.getFactionRep("Tian Di Hui") < 7500) {
    ns.workForFaction("Tian Di Hui", "Hacking Contracts");
    await ns.sleep(60000);
  }

  while (ns.getFactionRep("Aevum") < 50000) {
    ns.workForFaction("Aevum", "Hacking Contracts");
    await ns.sleep(60000);
  }

  while (true) {
    ns.workForFaction("Slum Snakes", "Security Work");
    await ns.sleep(60000);
  }
}
