/** @param {NS} ns **/
export async function main(ns) {
    let initialAttackTarget = 'foodnstuff';
	let attackScript = '/attack/loop.js';

	await ns.writePort(20, attackScript);
	await ns.sleep(1000);
	ns.exec('/attack/cc.js', 'home', 1, initialAttackTarget);
	await ns.sleep(1000);
	if(!ns.scriptRunning('/attack/cc.js', 'home')) ns.exec('/attack/cc.js', 'home');
	await ns.sleep(1000);
	ns.exec('/attack/deploy.js', 'home');
	await ns.sleep(1000);
	while(ns.scriptRunning('attack/deploy.js', 'home')) await ns.sleep(1000);
	if(!ns.scriptRunning('/util/new-servers.js', 'home')) ns.exec('/util/new-servers.js', 'home');
	await ns.sleep(1000);
	if(!ns.scriptRunning('/util/heartbeat.js', 'home')) ns.exec('/util/heartbeat.js', 'home');
	await ns.sleep(1000);
	ns.tprint('Initial setup complete. Execute "run /attack/deploy.js" again later when scripts has run for a few minutes');
}