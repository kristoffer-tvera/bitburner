/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('sleep');
	ns.disableLog('peek');
	ns.disableLog('writePort');
	ns.disableLog('getServerMaxMoney');
	ns.disableLog('getServerMinSecurityLevel');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMoneyAvailable');

	var attackTarget = ns.args[0];

	if (attackTarget == 'peek') {
		ns.tprint('[1]: ' + ns.peek(1) + ', attackTarget');
		ns.tprint('[2]: ' + ns.peek(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ', getServerMaxMoney');
		ns.tprint('[3]: ' + ns.peek(3) + ', getServerMinSecurityLevel');
		ns.tprint('[4]: ' + ns.peek(4) + ', getServerSecurityLevel');
		ns.tprint('[5]: ' + ns.peek(5).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ', getServerMoneyAvailable');
		ns.exit();
	}

	if (attackTarget) {
		ns.clearPort(1);
		await ns.writePort(1, attackTarget);
		ns.exit();
	}

	let i = 0;
	while (true) {
		await ns.sleep(50);

		let target = ns.peek(1);

		if(i++ == 50){
			i = 0;
			ns.print('Scanning ' +target);
		}

		let serverMaxMoney = ns.getServerMaxMoney(target) * 0.75;
		await ns.writePort(2, serverMaxMoney);

		let serverMinSecurityLevel = ns.getServerMinSecurityLevel(target) + 5;
		await ns.writePort(3, serverMinSecurityLevel);

		let serverSecurityLevel = ns.getServerSecurityLevel(target);
		await ns.writePort(4, serverSecurityLevel);

		let serverMoneyAvailable = ns.getServerMoneyAvailable(target);
		await ns.writePort(5, serverMoneyAvailable);
	}
}