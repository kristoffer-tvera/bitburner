/** @param {NS} ns **/
export async function main(ns) {

	let ramSizes = [];
	for (let i = 2; i < 18; i++) {
		ramSizes.push(Math.pow(2, i))
	}

	let playerMoney = ns.getPlayer().money;
	let maxAffordableRamSize = -1;

	for (let i = 0; i < ramSizes.length; i++) {
		let cost = ns.getPurchasedServerCost(ramSizes[i]) * 25;

		if (cost < playerMoney) {
			maxAffordableRamSize = ramSizes[i];
		}
	}

	let currentServerRam = -1;
	if (ns.getPurchasedServers() && ns.getPurchasedServers()[0]) {
		currentServerRam = ns.getServerMaxRam(ns.getPurchasedServers()[0]);
	}

	if (maxAffordableRamSize <= currentServerRam) {
		ns.tprint('You cannot currently afford to purchase an upgrade of all your servers');
		return;
	}

	if (maxAffordableRamSize > ns.getPurchasedServerMaxRam()) {
		maxAffordableRamSize = ns.getPurchasedServerMaxRam();
		ns.print('Max ram reached');
	}

	var totalCost = 0;
	for (var i = 0; i < ns.getPurchasedServerLimit(); i++) {
		totalCost += ns.getPurchasedServerCost(maxAffordableRamSize);
	}

	ns.tprint(`Uprade available! ${currentServerRam} to ${maxAffordableRamSize}. Cost: ${totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}\n run /util/new-server.js ${maxAffordableRamSize}`)
}