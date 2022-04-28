export const sizeModifiers = [
  { factor: "Hardware", size: 0.6 },
  { factor: "Robots", size: 5.0 },
  { factor: "AI Cores", size: 1.0 },
  { factor: "Real Estate", size: 0.05 },
];
export const fillFactor = 0.8;

export async function DeployScript(ns, server, script) {
  await ns.scp(script, server);

  if (ns.scriptRunning(script, server)) {
    // ns.scriptKill(script, server);
    return;
  }

  let freeRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);

  // if (server === "home") {
  //   freeRam -= 12;
  // }

  var threadCount = Math.floor(freeRam / ns.getScriptRam(script, server));
  if (threadCount > 0) {
    ns.tprint("Server: " + server + ", with threadCount: " + threadCount);
    ns.exec(script, server, threadCount);
  }
}

/** @param {NS} ns **/
export async function Pwn(ns, server) {
  ns.print(
    "Attacking: " +
      server +
      " with port requirement: " +
      ns.getServerNumPortsRequired(server)
  );
  switch (ns.getServerNumPortsRequired(server)) {
    case 5:
      while (!ns.fileExists("SQLInject.exe", "home")) {
        await ns.sleep(1000);
      }
      ns.sqlinject(server);
    case 4:
      while (!ns.fileExists("HTTPWorm.exe", "home")) {
        await ns.sleep(1000);
      }
      ns.httpworm(server);
    case 3:
      while (!ns.fileExists("relaySMTP.exe", "home")) {
        await ns.sleep(1000);
      }
      ns.relaysmtp(server);
    case 2:
      while (!ns.fileExists("FTPCrack.exe", "home")) {
        await ns.sleep(1000);
      }
      ns.ftpcrack(server);
    case 1:
      while (!ns.fileExists("BruteSSH.exe", "home")) {
        await ns.sleep(1000);
      }
      ns.brutessh(server);
      break;
    case 0:
      ns.print("No additional hacking needed");
      break;
    default:
      ns.alert(
        "Encountered server (" + server + ") that requires tweak to deploy.js"
      );
      break;
  }

  ns.nuke(server);
}

/** @param {NS} NS **/
export function RecursiveGetServers(NS, knownServers, serverName) {
  var servers = NS.scan(serverName);
  for (var i = 0; i < servers.length; i++) {
    var server = servers[i];

    if (server === "darkweb") continue;
    if (server.startsWith("hacknet-node")) continue;

    if (knownServers.indexOf(server) == -1) {
      knownServers.push(server);
      knownServers = RecursiveGetServers(NS, knownServers, server);
    }
  }
  return knownServers;
}

/** @param {NS} NS **/
export function Graph(NS, timeSeries) {
  let output = "\n";
  for (let i = 0; i < timeSeries.length; i++) {
    output += "\t";
  }
  output += "\n";

  let maxValue = Math.max(...timeSeries.map((entry) => entry.value));

  for (let j = 0; j < 20; j++) {
    let percentage = (20 - j) / 20;

    output += Math.floor(percentage * 100)
      .toString()
      .padStart(3, "0");
    for (let i = 0; i < timeSeries.length; i++) {
      let empty = timeSeries[i].value < maxValue * percentage;

      if (empty) {
        output += "\t";
      } else {
        output += "\t **";
      }
    }

    output += "\n";
  }

  for (let i = 0; i < timeSeries.length; i++) {
    output += "\t----";
  }

  output += "\n";

  for (let i = 0; i < timeSeries.length; i++) {
    output += "\t " + i.toString().padStart(2, "0");
  }

  output += `\n Table shows 5% to 100% of ${maxValue}, ${timeSeries.length} datapoints`;

  NS.tprint(output);
}
