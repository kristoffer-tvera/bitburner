/** @param {NS} ns **/
export async function main(ns) {

	for (let i = 0; i < ns.hacknet.numNodes(); i++) {
		let node = ns.hacknet.getNodeStats(i);
		ns.tprint('hacknet-node-' + i + ', level: ' + node.level + ', ram: ' + node.ram + 'GB, cores: ' + node.cores + ' ');
	}
}