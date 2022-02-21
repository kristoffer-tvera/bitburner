/** @param {NS} ns **/
export async function main(ns) {
  let done = false;
  //   let purchasedAugmentations = [];

  while (!done) {
    let summary = [];
    let player = ns.getPlayer();
    for (let i = 0; i < player.factions.length; i++) {
      let faction = player.factions[i];
      let factionReputation = ns.getFactionRep(faction);
      let augmentations = ns.getAugmentationsFromFaction(faction);
      let getOwnedAugmentations = ns.getOwnedAugmentations(true);
      for (let j = 0; j < augmentations.length; j++) {
        let augmentation = augmentations[j];
        let price = ns.getAugmentationPrice(augmentation);
        let reputationRequirement = ns.getAugmentationRepReq(augmentation);

        if (factionReputation < reputationRequirement) continue;
        if (getOwnedAugmentations.indexOf(augmentation) !== -1) continue;

        summary.push({
          Faction: faction,
          Augmentation: augmentation,
          Price: price,
        });
      }
    }

    summary.sort((a, b) => b.Price - a.Price);

    if (summary.length == 0) {
      done = true;
      continue;
    }

    ns.toast(`Get ${summary[0].Augmentation} from ${summary[0].Faction}`);
    await ns.sleep(2350);
  }
}
