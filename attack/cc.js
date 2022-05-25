import {
  portServerMaxMoney,
  portServerMinSecurityLevel,
  portServerMoneyAvailable,
  portServerSecurityLevel,
  portTarget,
  portAffectStockMarket,
} from "/constants.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");

  var attackTarget = ns.args[0];

  if (attackTarget == "peek") {
    return;
  }

  if (attackTarget) {
    ns.clearPort(portTarget);
    await ns.writePort(portTarget, attackTarget);
    ns.exit();
  }

  let i = 0;
  while (true) {
    ns.clearLog();

    let target = ns.peek(portTarget);

    let serverMaxMoney = ns.getServerMaxMoney(target) * 0.75;
    await ns.writePort(portServerMaxMoney, serverMaxMoney);

    let serverMinSecurityLevel = ns.getServerMinSecurityLevel(target) + 5;
    await ns.writePort(portServerMinSecurityLevel, serverMinSecurityLevel);

    let serverSecurityLevel = ns.getServerSecurityLevel(target);
    await ns.writePort(portServerSecurityLevel, serverSecurityLevel);

    let serverMoneyAvailable = ns.getServerMoneyAvailable(target);
    await ns.writePort(portServerMoneyAvailable, serverMoneyAvailable);

    let affectsStockMarket = ns.peek(portAffectStockMarket);

    ns.clearLog();
    ns.print("[1]: " + target + ", attackTarget");
    ns.print(
      "[2]: " +
        serverMaxMoney.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }) +
        ", getServerMaxMoney"
    );
    ns.print("[3]: " + serverMinSecurityLevel + ", getServerMinSecurityLevel");
    ns.print("[4]: " + serverSecurityLevel + ", getServerSecurityLevel");
    ns.print(
      "[5]: " +
        serverMoneyAvailable.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }) +
        ", getServerMoneyAvailable"
    );
    ns.print(
      "[6]: " +
        affectsStockMarket +
        ", affectsStockMarket: [growAffectsStockmarket, hackAffectsStockmarket]"
    );

    await ns.sleep(500);
  }
}
