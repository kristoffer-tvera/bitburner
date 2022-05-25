/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    ns.clearLog();

    let target = ns.peek(1);
    var serverMaxMoney = ns.peek(2); //getServerMaxMoney
    var serverMinSecurityLevel = ns.peek(3); //getServerMinSecurityLevel
    let serverSecurityLevel = ns.peek(4);
    let serverMoneyAvailable = ns.peek(5);
    let growAffectsStockmarket = false;
    let hackAffectsStockmarket = false;
    let stockmarketData = ns.peek(6);
    if (stockmarketData !== "NULL PORT DATA") {
      [growAffectsStockmarket, hackAffectsStockmarket] =
        JSON.parse(stockmarketData);
    }

    if (serverSecurityLevel > serverMinSecurityLevel) {
      await ns.weaken(target);
    } else if (serverMoneyAvailable < serverMaxMoney) {
      ns.print("Growth affects stockmarket: " + growAffectsStockmarket);
      await ns.grow(target, { stock: growAffectsStockmarket });
    } else {
      ns.print("Hack affects stockmarket: " + hackAffectsStockmarket);
      await ns.hack(target, { stock: hackAffectsStockmarket });
    }
  }
}
