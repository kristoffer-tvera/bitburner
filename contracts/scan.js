/** @param {NS} ns **/
export async function main(ns) {
  async function RecursiveGetServers(knownServers, path, serverName, level) {
    if (serverName != "home") path.push(serverName);
    if (serverName.startsWith("pserv")) return;

    let fullPath = "home;";
    path.forEach(function (node) {
      fullPath += "connect " + node + ";";
    });

    let contracts = ns.ls(serverName, "cct");
    if (contracts.length > 0) {
      output.push("");
      output.push(`-- [${serverName}] (${level}), ${fullPath}`);

      for (let i = 0; i < contracts.length; i++) {
        output.push(
          "-- " +
            contracts[i] +
            ` (${ns.codingcontract.getContractType(contracts[i], serverName)})`
        );
      }
    }

    var servers = ns.scan(serverName);
    for (var i = 0; i < servers.length; i++) {
      var server = servers[i];

      if (knownServers.indexOf(server) == -1) {
        knownServers.push(server);
        await RecursiveGetServers(knownServers, [...path], server, level + 1);
      }
    }

    if (serverName != "home") path.pop();
  }

  let output = [];
  await RecursiveGetServers(["home"], [], "home", 0);
  let outputString = "Displaying all contracts";
  for (let i = 0; i < output.length; i++) {
    outputString += "\n" + output[i];
  }

  ns.tprint(outputString);
}
