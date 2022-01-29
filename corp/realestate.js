import * as Base from '/corp/base.js'
/** @param {NS} ns **/
export async function main(ns) {
	let data = ns.flags([
		['count', 1]
	]);

	await Base.expandOffice(ns, data.count, 'RealEstate');
}