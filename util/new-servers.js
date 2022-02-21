/** @param {NS} ns **/
export async function main(ns) {
  let scriptName = ns.peek(20);
  let ram = 8;
  if (ns.args[0]) {
    ram = Number.parseInt(ns.args[0]);
  }

  let purchasedServers = ns.getPurchasedServers();

  if (
    purchasedServers.length > 0 &&
    ns.getServerMaxRam(purchasedServers[0]) >= ram
  )
    ns.exit();

  for (let i = 0; i < purchasedServers.length; i++) {
    ns.killall(purchasedServers[i]);
    ns.deleteServer(purchasedServers[i]);
  }

  let server = 0;
  while (server < ns.getPurchasedServerLimit()) {
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
      var hostname = ns.purchaseServer("pserv-" + server, ram);
      await ns.scp(scriptName, hostname);

      var treadCount = Math.floor(ram / ns.getScriptRam(scriptName, hostname));
      ns.exec(scriptName, hostname, treadCount);
      ++server;
    }

    await ns.sleep(100);
  }
}
