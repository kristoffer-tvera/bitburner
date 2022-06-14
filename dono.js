/** @param {NS} ns **/
export async function main(ns) {
  let data = ns.flags([
    ["amount", 0],
    ["sum", 0],
  ]);

  let donationAmount = data.amount + data.sum;

  let factions = ns.getPlayer().factions;
  for (let i = 0; i < factions.length; i++) {
    let success = ns.singularity.donateToFaction(factions[i], donationAmount);

    if (!success) {
      ns.tprint("Unable to donate to " + factions[i]);
    }
  }
}
