/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("getServerMaxRam");
  ns.disableLog("getServerRequiredHackingLevel");
  ns.disableLog("getHackingLevel");
  ns.disableLog("hasRootAccess");
  ns.disableLog("getScriptRam");
  ns.disableLog("fileExists");
  ns.disableLog("getServerNumPortsRequired");
  ns.disableLog("scriptRunning");
  ns.disableLog("sleep");
  ns.disableLog("scan");
  ns.disableLog("scp");
  ns.disableLog("exec");

  let targetServers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"];

  async function RecursiveGetServers(knownServers, path, serverName) {
    if (serverName != "home") path.push(serverName);

    if (
      targetServers.indexOf(serverName) >= 0 &&
      ns.hasRootAccess(serverName)
    ) {
      let fullPath = "home;";
      path.forEach(function (node) {
        fullPath += "connect " + node + ";";
      });
      ns.tprint("Path to [" + serverName + "]: \n" + fullPath + "backdoor");
    }

    var servers = ns.scan(serverName);
    for (var i = 0; i < servers.length; i++) {
      var server = servers[i];

      if (knownServers.indexOf(server) == -1) {
        knownServers.push(server);
        await RecursiveGetServers(knownServers, path, server);
      }
    }
    if (serverName != "home") path.pop();
  }

  await RecursiveGetServers(["home"], [], "home");
}
