import { Pwn, RecursiveGetServers, DeployScript } from "/util/base.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");

  var servers = RecursiveGetServers(ns, ["home"], "home");
  let scriptName = ns.peek(20);
  servers.sort(
    (a, b) => ns.getServerNumPortsRequired(a) - ns.getServerNumPortsRequired(b)
  );
  servers = ["home", ...servers];
  ns.print(servers);

  for (var i = 0; i < servers.length; i++) {
    ns.print("Attacking server: " + servers[i]);

    if (servers[i] !== "home" && !ns.hasRootAccess(servers[i])) {
      await Pwn(ns, servers[i]);
    }

    await DeployScript(ns, servers[i], scriptName);
  }
}
