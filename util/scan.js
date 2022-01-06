/** @param {NS} ns **/
export async function main(ns) {
	await ns.sleep(5000);

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

	var servers = RecursiveGetServers(["home"], "home");
	servers.sort((a, b) => ns.getServerMaxMoney(a) - ns.getServerMaxMoney(b));
	
	ns.print('Server-list-size: ' + servers.length);
	servers = servers.filter(server => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel());
	servers = servers.filter(server => ns.getServerMaxMoney(server) > 0);
	ns.print('Server-list-size after filter: ' + servers.length);

	for (var i = 0; i < servers.length; i++) {
		var server = servers[i];
		let serverMaxMoney = ns.getServerMaxMoney(server);
		let moneyPerSecond = serverMaxMoney/ns.getWeakenTime(server);
		ns.tprint('Server: ' + server + ', with max-money: ' + serverMaxMoney.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ', money-per-second: ' + moneyPerSecond.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
	}
}