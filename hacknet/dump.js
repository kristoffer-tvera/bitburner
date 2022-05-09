/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  while (true) {
    let hashes = ns.hacknet.numHashes();

    while (4 < hashes) {
      ns.hacknet.spendHashes("Sell for Money");
      ns.print("Sold hashes for money to prevent capping");

      hashes = ns.hacknet.numHashes();
      await ns.sleep(5);
    }

    await ns.sleep(100);
  }
}
