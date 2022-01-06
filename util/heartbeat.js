/** @param {NS} ns **/
export async function main(ns) {
	function RecursiveGetServers(knownServers, serverName) {
		var servers = ns.scan(serverName);
		for (var i = 0; i < servers.length; i++) {
			var server = servers[i];
			if (knownServers.indexOf(server) == -1) {
				knownServers.push(server);
				knownServers = RecursiveGetServers(knownServers, server);
			}
		}
		return knownServers;
	}

	let scriptName = ns.peek(20);
	while (true) {
		var servers = RecursiveGetServers(["home"], "home");
		servers.sort((a, b) => ns.getServerRequiredHackingLevel(a) - ns.getServerRequiredHackingLevel(b));
		servers = servers.filter(server => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel());

		for (var i = 0; i < servers.length; i++) {
			var server = servers[i];
			let scriptSize = ns.getScriptRam(scriptName, 'home');

			let freeRam = ns.getServerMaxRam(server)-ns.getServerUsedRam(server);
			if(freeRam < scriptSize){
				continue;
			}

			let potential = Math.floor(freeRam/scriptSize);

			ns.tprint('Server ' + server + ' has untapped potential (' + Math.floor(freeRam) + 'gb ram). Add '+ potential + ' extra threads.');
		}

		await ns.sleep(1000 * 60 * 30); // every 30 minute
	}
}