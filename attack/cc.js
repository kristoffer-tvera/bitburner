/** @param {NS} ns **/
export async function main(ns) {
  ns.clearLog();
  ns.disableLog("ALL");

  var attackTarget = ns.args[0];

  if (attackTarget == "peek") {
  }

  if (attackTarget) {
    ns.clearPort(1);
    await ns.writePort(1, attackTarget);
    ns.exit();
  }

  let i = 0;
  while (true) {
    await ns.sleep(500);

    let target = ns.peek(1);

    let serverMaxMoney = ns.getServerMaxMoney(target) * 0.75;
    await ns.writePort(2, serverMaxMoney);

    let serverMinSecurityLevel = ns.getServerMinSecurityLevel(target) + 5;
    await ns.writePort(3, serverMinSecurityLevel);

    let serverSecurityLevel = ns.getServerSecurityLevel(target);
    await ns.writePort(4, serverSecurityLevel);

    let serverMoneyAvailable = ns.getServerMoneyAvailable(target);
    await ns.writePort(5, serverMoneyAvailable);

    ns.clearLog();
    ns.print("[1]: " + ns.peek(1) + ", attackTarget");
    ns.print(
      "[2]: " +
        ns
          .peek(2)
          .toLocaleString("en-US", { style: "currency", currency: "USD" }) +
        ", getServerMaxMoney"
    );
    ns.print("[3]: " + ns.peek(3) + ", getServerMinSecurityLevel");
    ns.print("[4]: " + ns.peek(4) + ", getServerSecurityLevel");
    ns.print(
      "[5]: " +
        ns
          .peek(5)
          .toLocaleString("en-US", { style: "currency", currency: "USD" }) +
        ", getServerMoneyAvailable"
    );
  }
}
