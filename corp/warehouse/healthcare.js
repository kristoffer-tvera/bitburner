import {sizeModifiers, fillFactor} from '/corp/warehouse/base.js'

/** @param {NS} ns **/
export async function main(ns) {
	let data = ns.flags([
		['size', 300]
	]);

	let industryFactors = [{ 'factor': 'Hardware', 'rate': 0.25 }, { 'factor': 'Robots', 'rate': 0.25 }, { 'factor': 'AI Cores', 'rate': 0.25 }, { 'factor': 'Real Estate', 'rate': 0.25 }]

	let availableSize = Math.floor(data.size * fillFactor);
	let output = `Optimal warehouse fill (size: ${data.size}):`;

	for (let i = 0; i < industryFactors.length; i++) {
		let material = industryFactors[i];
		let idealSize = availableSize * material.rate;
		let modifier = sizeModifiers.find(element => { return element.factor === material.factor });
		let actualBuyCount = idealSize / modifier.size;
		output += `\n${material.factor}: ${actualBuyCount} (for a total of ${10 * actualBuyCount})`
	}

	ns.tprint(output);
}