/** @param {NS} ns **/
export async function main(ns) {
  let flags = ns.flags([["upgrade", false]]);
  ns.disableLog("sleep");

  let startTime = new Date();
  while (true) {
    let duration = Math.abs(new Date() - startTime);
    let durationInHours = Math.ceil(duration / (1000 * 60 * 60));
    if (durationInHours > 6) {
      flags.upgrade = false;
    }

    let upgradeToPerform = "";
    let bestUpgradeValue = 0;
    let playerProductionMultiplier = 1;

    let newServerValue = ns.formulas.hacknetServers.hashGainRate(
      1,
      0,
      1,
      1,
      playerProductionMultiplier
    );
    let newServerCost = ns.hacknet.getPurchaseNodeCost();
    let newServerCostPerValue = newServerCost / newServerValue;

    bestUpgradeValue = newServerCostPerValue;
    upgradeToPerform = `New server`;

    let autoUpgradeIndex = -1;
    let autoUpgradeType = "newServer";

    let cheapestUpgrade = ns.hacknet.getPurchaseNodeCost();

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      let stats = ns.hacknet.getNodeStats(i);
      let hashRate = ns.formulas.hacknetServers.hashGainRate(
        stats.level,
        stats.ramUsed,
        stats.ram,
        stats.cores
      );

      let levelValue =
        ns.formulas.hacknetServers.hashGainRate(
          stats.level + 1,
          stats.ramUsed,
          stats.ram,
          stats.cores
        ) - hashRate;
      let levelCost = ns.hacknet.getLevelUpgradeCost(i, 1);
      if (levelCost < cheapestUpgrade) cheapestUpgrade = levelCost;

      let levelCostPerValue = levelCost / levelValue;
      if (levelCostPerValue < bestUpgradeValue) {
        bestUpgradeValue = levelCostPerValue;
        upgradeToPerform = `Level on ${stats.name}`;

        autoUpgradeIndex = i;
        autoUpgradeType = "level";
      }

      let ramValue =
        ns.formulas.hacknetServers.hashGainRate(
          stats.level,
          stats.ramUsed,
          stats.ram * 2,
          stats.cores
        ) - hashRate;
      let ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
      if (ramCost < cheapestUpgrade) cheapestUpgrade = ramCost;

      let ramCostPerValue = ramCost / ramValue;
      if (ramCostPerValue < bestUpgradeValue) {
        bestUpgradeValue = ramCostPerValue;
        upgradeToPerform = `Ram on ${stats.name}`;

        autoUpgradeIndex = i;
        autoUpgradeType = "ram";
      }

      let coreValue =
        ns.formulas.hacknetServers.hashGainRate(
          stats.level,
          stats.ramUsed,
          stats.ram,
          stats.cores + 1
        ) - hashRate;
      let coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
      if (coreCost < cheapestUpgrade) cheapestUpgrade = coreCost;

      let coreCostPerValue = coreCost / coreValue;
      if (coreCostPerValue < bestUpgradeValue) {
        bestUpgradeValue = coreCostPerValue;
        upgradeToPerform = `Core on ${stats.name}`;

        autoUpgradeIndex = i;
        autoUpgradeType = "core";
      }
    }

    if (cheapestUpgrade === ns.hacknet.getPurchaseNodeCost()) {
      autoUpgradeType = "newServer";
    }

    if (flags.upgrade) {
      switch (autoUpgradeType) {
        case "newServer":
          ns.hacknet.purchaseNode();
          //   ns.toast("newServer");
          break;
        case "level":
          ns.hacknet.upgradeLevel(autoUpgradeIndex, 1);
          //   ns.toast("level");
          break;
        case "ram":
          ns.hacknet.upgradeRam(autoUpgradeIndex, 1);
          //   ns.toast("ram");
          break;
        case "core":
          ns.hacknet.upgradeCore(autoUpgradeIndex, 1);
          //   ns.toast("core");
          break;
        default:
          break;
      }
    }

    let hashes = ns.hacknet.numHashes();
    let maxHashes = ns.hacknet.hashCapacity();

    while (0.8 * maxHashes < hashes) {
      ns.hacknet.spendHashes("Sell for Money");
      ns.print("Sold hashes for money to prevent capping");

      hashes = ns.hacknet.numHashes();
      maxHashes = ns.hacknet.hashCapacity();
    }

    await ns.sleep(100);
  }
}
