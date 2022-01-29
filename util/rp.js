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

	let targetServers = ['CSEC', 'avmnite-02h', 'I.I.I.I', 'run4theh111z'];

	async function RecursiveGetServers(knownServers, path, serverName) {
		if(serverName != 'home') path.push(serverName);

		if (targetServers.indexOf(serverName) >= 0) {
			if(!ns.hasRootAccess(serverName)){
				await Pwn(serverName);
			}

			let fullPath = 'home;';
			path.forEach(function (node) { fullPath += 'connect ' + node + ';' });
			ns.tprint('Path to ['+serverName+']: ' +fullPath + 'backdoor');
		}

		var servers = ns.scan(serverName);
		for (var i = 0; i < servers.length; i++) {
			var server = servers[i];

			if (knownServers.indexOf(server) == -1) {
				knownServers.push(server);
				await RecursiveGetServers(knownServers, path, server);
			}

		}
		if(serverName != 'home') path.pop();
	}

	async function Pwn(server) {
		if (!ns.hasRootAccess(server)) {
			switch (ns.getServerNumPortsRequired(server)) {
				case 5:
					while (!ns.fileExists("SQLInject.exe", "home")) {
						await ns.sleep(6000);
					}
					ns.sqlinject(server);
				case 4:
					while (!ns.fileExists("HTTPWorm.exe", "home")) {
						await ns.sleep(6000);
					}
					ns.httpworm(server);
				case 3:
					while (!ns.fileExists("relaySMTP.exe", "home")) {
						await ns.sleep(6000);
					}
					ns.relaysmtp(server);
				case 2:
					while (!ns.fileExists("FTPCrack.exe", "home")) {
						await ns.sleep(6000);
					}
					ns.ftpcrack(server);
				case 1:
					while (!ns.fileExists("BruteSSH.exe", "home")) {
						await ns.sleep(6000);
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
	}

	await RecursiveGetServers(["home"], [], "home");
}