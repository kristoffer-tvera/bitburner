/** @param {NS} ns **/
export async function main(ns) {
  let data = ns.flags([["limit", 500000000]]);

  let numberOfSleeves = ns.sleeve.getNumSleeves();

  for (let i = 0; i < numberOfSleeves; i++) {
    let purchaseableAugs = ns.sleeve.getSleevePurchasableAugs(i);
    let purchasedAugs = false;
    for (let j = 0; j < purchaseableAugs.length; j++) {
      if (
        ns.getPlayer().money >= purchaseableAugs[j].cost &&
        purchaseableAugs[j].cost < data.limit
      ) {
        ns.sleeve.purchaseSleeveAug(i, purchaseableAugs[j].name);
        purchasedAugs = true;
      }
    }

    if (purchaseableAugs) {
      ns.tprint("Purchased augs (and reset) Sleeve " + i);
    }
  }
}
