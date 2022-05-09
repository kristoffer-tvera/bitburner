/** @param {NS} ns **/
export async function main(ns) {
  let server = "home";
  let script = "/stanek/loop.js";

  if (ns.scriptRunning(script, server)) {
    ns.scriptKill(script, server);
  }

  let freeRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);

  var threadCount = Math.floor(freeRam / ns.getScriptRam(script, server));
  if (threadCount > 0) {
    ns.tprint("Server: " + server + ", with threadCount: " + threadCount);
    ns.exec(script, server, threadCount);
  }
}
