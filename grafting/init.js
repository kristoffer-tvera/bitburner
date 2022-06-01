/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");
  let blacklist = ["NeuroFlux Governor"];
  let factions = ["CyberSec", "NiteSec", "The Black Hand", "BitRunners"];

  while (ns.singularity.isBusy()) {
    await ns.sleep(1000);
  }

  let currentAugs = ns.singularity.getOwnedAugmentations(true);
  let graftable = ns.grafting.getGraftableAugmentations();
  ns.singularity.travelToCity("New Tokyo");

  for (let i = 0; i < factions.length; i++) {
    const faction = factions[i];
    let augs = ns.singularity.getAugmentationsFromFaction(faction);

    for (let j = 0; j < augs.length; j++) {
      const aug = augs[j];

      if (blacklist.indexOf(aug) >= 0) {
        ns.tprint(`Aug: "${aug}" cannot be grafted (blacklist)`);
        continue;
      }

      let reqs = ns.singularity.getAugmentationPrereq(aug);
      let eligible = true;
      for (let m = 0; m < reqs.length; m++) {
        const req = reqs[m];
        if (currentAugs.indexOf(req) === -1) eligible = false;
      }

      if (!eligible) {
        ns.tprint(`Aug: "${aug}" cannot be grafted (missing pre-requisite)`);
        continue;
      }

      if (graftable.indexOf(aug) === -1) {
        ns.tprint(`Aug: "${aug}" cannot be grafted (not graftable)`);
        continue;
      }

      ns.grafting.graftAugmentation(aug, true);
      currentAugs.push(aug);

      while (ns.singularity.isBusy()) {
        await ns.sleep(1000);
      }
    }
  }

  for (let i = 0; i < graftable.length; i++) {
    const aug = graftable[i];

    let reqs = ns.singularity.getAugmentationPrereq(aug);
    let eligible = true;
    for (let m = 0; m < reqs.length; m++) {
      const req = reqs[m];
      if (currentAugs.indexOf(req) === -1) eligible = false;
    }

    if (!eligible) {
      ns.tprint(`Aug: "${aug}" cannot be grafted (missing pre-requisite)`);
      continue;
    }

    ns.grafting.graftAugmentation(aug, true);
    currentAugs.push(aug);

    while (ns.singularity.isBusy()) {
      await ns.sleep(1000);
    }
  }
}
