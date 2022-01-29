/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerRequiredHackingLevel');
	ns.disableLog('getHackingLevel');
	ns.disableLog('hasRootAccess');
	ns.disableLog('getScriptRam');
	ns.disableLog('fileExists');
	ns.disableLog('getServerNumPortsRequired');
	ns.disableLog('scriptRunning');
	ns.disableLog('sleep');
	ns.disableLog('scan');
	ns.disableLog('scp');
	ns.disableLog('exec');

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

	let skip = ns.args[0] == 'skip';

	var servers = RecursiveGetServers(["home"], "home");
	let scriptName = ns.peek(20);
	servers.sort((a, b) => ns.getServerRequiredHackingLevel(a) - ns.getServerRequiredHackingLevel(b));

	ns.print('Server-list-size: ' + servers.length);
	servers = servers.filter(server => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel());
	ns.print('Server-list-size after filter: ' + servers.length);

	for (var i = 0; i < servers.length; i++) {
		var server = servers[i];

		if (server == "darkweb") continue;

		if (ns.hasRootAccess(server) && skip) continue;

		await ns.scp(scriptName, server);

		if (!ns.hasRootAccess(server)) {
			switch (ns.getServerNumPortsRequired(server)) {
				case 5:
					while (!ns.fileExists("SQLInject.exe", "home")) {
						await ns.sleep(60000);
					}
					ns.sqlinject(server);
				case 4:
					while (!ns.fileExists("HTTPWorm.exe", "home")) {
						await ns.sleep(60000);
					}
					ns.httpworm(server);
				case 3:
					while (!ns.fileExists("relaySMTP.exe", "home")) {
						await ns.sleep(60000);
					}
					ns.relaysmtp(server);
				case 2:
					while (!ns.fileExists("FTPCrack.exe", "home")) {
						await ns.sleep(60000);
					}
					ns.ftpcrack(server);
				case 1:
					while (!ns.fileExists("BruteSSH.exe", "home")) {
						await ns.sleep(60000);
					}
					ns.brutessh(server);
					break;
				case 0:
					ns.print('No additional hacking needed');
					break;
				default:
					ns.alert('Encountered server (' + server + ') that requires tweak to deploy.js');
					break;
			}

			ns.nuke(server);
		}

		if (ns.scriptRunning(scriptName, server)) {
			ns.scriptKill(scriptName, server);
		}

		let freeRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);

		if (server === 'home') {
			freeRam -= ns.getScriptRam('/attack/cc.js');
			freeRam -= ns.getScriptRam('/attack/heartbeat.js');
			freeRam -= ns.getScriptRam('/util/new-servers.js');
		}

		var threadCount = Math.floor(freeRam / ns.getScriptRam(scriptName, server));
		if (threadCount > 0) {
			ns.tprint('Server: ' + server + ', with threadCount: ' + threadCount);
			ns.exec(scriptName, server, threadCount)
		}
	}

}