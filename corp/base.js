/** @param {NS} ns **/
/** @param {Number} count **/
/** @param {String} industry **/
export async function expandOffice(ns, count, industry) {

	let corporation = ns.corporation.getCorporation();
	let divisions = corporation.divisions;
	let division = divisions.find(element => { return element.type === industry });

	if (!division) {
		ns.tprint(`No ${industry}-division found`);
		return;
	}

	ns.toast(`${industry}, ${count} iterations.`, 'info');
	for (let inc = 0; inc < count; inc++) {
		let totalCost = 0;
		for (let i = 0; i < division.cities.length; i++) {
			let city = division.cities[i];
			let officeSizeUpgradeCost = ns.corporation.getOfficeSizeUpgradeCost(division.name, city, 5);
			totalCost += officeSizeUpgradeCost;
		}

		if (corporation.funds < totalCost) {
			ns.tprint(`Not enough money to add 5 more employees to all cities (current: ${corporation.funds.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}, needed: ${totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})`)
			return;
		}

		for (let i = 0; i < division.cities.length; i++) {
			let city = division.cities[i];
			ns.corporation.upgradeOfficeSize(division.name, city, 5);
			let positions = ['Operations', 'Engineer', 'Business', 'Management', 'Research & Development']
			for (let position = 0; position < 5; position++) {
				let employee = ns.corporation.hireEmployee(division.name, city);
				await ns.corporation.assignJob(division.name, city, employee.name, positions[position]);
			}
		}
		ns.toast(`Round ${inc+1} out of ${count} (${industry})`, 'info');
	}

	ns.toast(`Finished incrementing all ${industry}-offices.`, 'info');
}