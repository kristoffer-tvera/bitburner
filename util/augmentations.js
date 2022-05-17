/** @param {NS} ns **/
export async function main(ns) {
  let done = false;
  //   let purchasedAugmentations = [];

  while (!done) {
    let summary = [];
    let player = ns.getPlayer();
    for (let i = 0; i < player.factions.length; i++) {
      let faction = player.factions[i];
      let factionReputation = ns.singularity.getFactionRep(faction);
      let augmentations = ns.singularity.getAugmentationsFromFaction(faction);
      let getOwnedAugmentations = ns.singularity.getOwnedAugmentations(true);
      for (let j = 0; j < augmentations.length; j++) {
        let augmentation = augmentations[j];
        let price = ns.singularity.getAugmentationPrice(augmentation);
        let reputationRequirement =
          ns.singularity.getAugmentationRepReq(augmentation);

        let pepe = ns.getaug;

        if (factionReputation < reputationRequirement) continue;
        if (player.money < price) continue;
        if (getOwnedAugmentations.indexOf(augmentation) !== -1) continue;
        if (
          ns.singularity.getAugmentationRepReq(augmentation).length > 0 &&
          getOwnedAugmentations.indexOf(
            ns.singularity.getAugmentationRepReq(augmentation)
          ) !== -1
        )
          continue;

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
