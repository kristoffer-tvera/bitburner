/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    if (ns.stock.purchase4SMarketDataTixApi()) {
      ns.spawn("/stocks/smart-loop.js", 1);
    }
    await ns.sleep(1000);
  }
}
