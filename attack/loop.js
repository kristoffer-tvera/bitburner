/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		let target = ns.peek(1);
		var serverMaxMoney = ns.peek(2); //getServerMaxMoney
		var serverMinSecurityLevel = ns.peek(3); //getServerMinSecurityLevel
		let serverSecurityLevel = ns.peek(4);
		let serverMoneyAvailable = ns.peek(5);

		if (serverSecurityLevel > serverMinSecurityLevel) { //getServerSecurityLevel
			await ns.weaken(target);
			await ns.sleep(Math.floor(Math.random()*1000));
		} else if (serverMoneyAvailable < serverMaxMoney) { //getServerMoneyAvailable 
			await ns.grow(target);
			await ns.sleep(Math.floor(Math.random()*1000));
		} else {
			await ns.hack(target);
		}
	}
}