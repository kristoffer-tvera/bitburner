/** @param {NS} ns **/
export async function main(ns) {
	if(ns.args.length == 0){
		ns.tprint('Upgrade "level", "ram", "core", or "node"');
		ns.exit();
	}


	let ramUpgrade = 0;
	let levelUpgrade = 0;
	let coreUpgrade = 0;
	let serverUpgrade = 0;

	for (let i = 0; i < ns.args.length; i++) {
		let arg = ns.args[i];

		if (arg.startsWith('level')) {
			let value = arg.substring(arg.indexOf('=') + 1);
			levelUpgrade = Number.parseInt(value);
		}

		if (arg.startsWith('ram')) {
			let value = arg.substring(arg.indexOf('=') + 1);
			ramUpgrade = Number.parseInt(value);
		}

		if (arg.startsWith('memory')) {
			let value = arg.substring(arg.indexOf('=') + 1);
			ramUpgrade = Number.parseInt(value);
		}

		if (arg.startsWith('core')) {
			let value = arg.substring(arg.indexOf('=') + 1);
			coreUpgrade = Number.parseInt(value);
		}

		if (arg.startsWith('server')) {
			let value = arg.substring(arg.indexOf('=') + 1);
			serverUpgrade = Number.parseInt(value);
		}

		if (arg.startsWith('node')) {
			let value = arg.substring(arg.indexOf('=') + 1);
			serverUpgrade = Number.parseInt(value);
		}
	}

	let production = 0;
	for (let i = 0; i < ns.hacknet.numNodes(); i++) {
		let node = ns.hacknet.getNodeStats(i);
		production += node.production;
	}

	ns.tprint('Production before upgrades: ' + production.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))

	if (levelUpgrade > 0) {
		let cost = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			let node = ns.hacknet.getNodeStats(i);

			if (levelUpgrade <= node.level) continue;
			let upgrade = levelUpgrade - node.level;

			cost += ns.hacknet.getLevelUpgradeCost(i, upgrade);
		}

		let confirmation = await ns.prompt('Level upgrade cost: ' + cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
		if (confirmation) {
			for (let i = 0; i < ns.hacknet.numNodes(); i++) {
				let node = ns.hacknet.getNodeStats(i);

				if (levelUpgrade <= node.level) continue;
				let upgrade = levelUpgrade - node.level;

				ns.hacknet.upgradeLevel(i, upgrade);
			}
		};
	}

	if (ramUpgrade > 0) {
		let cost = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			let node = ns.hacknet.getNodeStats(i);
			let ramUpgrades = Math.log2(node.ram) + 1;

			if (ramUpgrade <= ramUpgrades) continue;
			let upgrade = ramUpgrade - ramUpgrades;

			cost += ns.hacknet.getRamUpgradeCost(i, upgrade);
		}

		let confirmation = await ns.prompt('Ram upgrade cost: ' + cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
		if (confirmation) {
			for (let i = 0; i < ns.hacknet.numNodes(); i++) {
				let node = ns.hacknet.getNodeStats(i);
				let ramUpgrades = Math.log2(node.ram) + 1;

				if (ramUpgrade <= ramUpgrades) continue;
				let upgrade = ramUpgrade - ramUpgrades;

				ns.hacknet.upgradeRam(i, upgrade);
			}
		};
	}

	if (coreUpgrade > 0) {
		let cost = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			let node = ns.hacknet.getNodeStats(i);

			if (coreUpgrade <= node.cores) continue;
			let upgrade = coreUpgrade - node.cores;

			cost += ns.hacknet.getCoreUpgradeCost(i, upgrade);
		}

		let confirmation = await ns.prompt('Core upgrade cost: ' + cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
		if (confirmation) {
			for (let i = 0; i < ns.hacknet.numNodes(); i++) {
				let node = ns.hacknet.getNodeStats(i);

				if (coreUpgrade <= node.cores) continue;
				let upgrade = coreUpgrade - node.cores;

				ns.hacknet.upgradeCore(i, upgrade);
			}
		};
	}

	if (serverUpgrade > 0 && serverUpgrade > ns.hacknet.numNodes()) {
		let upgrade = serverUpgrade - ns.hacknet.numNodes();
		let cost = ns.hacknet.getPurchaseNodeCost();
		let confirmation = await ns.prompt('Buying more nodes: ' + cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
		if (confirmation) {
			for (let i = 0; i < upgrade; i++) {
				ns.hacknet.purchaseNode()
			}
		}
	}

	if (coreUpgrade + levelUpgrade + ramUpgrade + serverUpgrade > 0) {
		production = 0;
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			let node = ns.hacknet.getNodeStats(i);
			production += node.production;
		}

		ns.tprint('Production after upgrades: ' + production.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
		ns.exec('hacknet/list.js', 'home');
	}

}