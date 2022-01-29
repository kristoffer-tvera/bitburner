/** @param {NS} ns **/
export async function main(ns) {
	async function RecursiveGetServers(knownServers, path, serverName, level, maxLevel) {
		if (serverName != 'home') path.push(serverName);
		if(level > maxLevel) return;
		if(serverName.startsWith('pserv')) return;

		let fullPath = 'home;';
		path.forEach(function (node) { fullPath += 'connect ' + node + ';' });

		let files = ns.ls(serverName);

		let startPadding = '    '.repeat(level);
		output.push('');
		output.push(startPadding + `[${serverName}] ${level}`);
		output.push(startPadding + `-- Rooted: ${ns.hasRootAccess(serverName)}, Ports: ${ns.getServerNumPortsRequired(serverName)}, Skill: ${ns.getServerRequiredHackingLevel(serverName)}`);
		output.push(startPadding + '-- Path: ' + fullPath);
		if(files.length > 0){
			output.push(startPadding + '-- Files : ' + files.toString());
		}
		output.push(startPadding + `-- Security: (min: ${ns.getServerMinSecurityLevel(serverName)}) ${ns.getServerSecurityLevel(serverName)}`);
		output.push(startPadding + `-- Money: ${ns.getServerMoneyAvailable(serverName).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (max: ${ns.getServerMaxMoney(serverName).toLocaleString('en-US', { style: 'currency', currency: 'USD' })})`);
		output.push(startPadding + `-- Ram: ${ns.getServerMaxRam(serverName)}GB, free: ${ns.getServerMaxRam(serverName)-ns.getServerUsedRam(serverName)}GB `);

		var servers = ns.scan(serverName);
		for (var i = 0; i < servers.length; i++) {
			var server = servers[i];

			if (knownServers.indexOf(server) == -1) {
				knownServers.push(server);
				await RecursiveGetServers(knownServers, [...path], server, level + 1, maxLevel);
			}

		}

		if (serverName != 'home') path.pop();
	}

	let maxLevel = 15;
	if(ns.args[0]){
		maxLevel = Number.parseInt(ns.args[0]);
	}

	let output = [];
	await RecursiveGetServers(["home"], [], "home", 0, maxLevel);
	let outputString = 'Displaying connected nodes down to level ' + maxLevel;
	for(let i = 0; i < output.length; i++){
		outputString += '\n' + output[i];
	}

	ns.tprint(outputString);
}