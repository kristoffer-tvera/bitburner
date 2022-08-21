/** @param {NS} ns **/
/** @param {Number} count **/
/** @param {String} industry **/
export async function expandOffice(ns, count, industry) {
  let corporation = ns.corporation.getCorporation();
  let divisions = corporation.divisions;
  let division = divisions.find((element) => {
    return element.type === industry;
  });

  if (!division) {
    ns.tprint(`No ${industry}-division found`);
    return;
  }

  ns.toast(`${industry}, ${count} iterations.`, "info");
  for (let inc = 0; inc < count; inc++) {
    let totalCost = 0;
    for (let i = 0; i < division.cities.length; i++) {
      let city = division.cities[i];
      let officeSizeUpgradeCost = ns.corporation.getOfficeSizeUpgradeCost(
        division.name,
        city,
        5
      );
      totalCost += officeSizeUpgradeCost;
    }

    if (corporation.funds < totalCost) {
      ns.tprint(
        `Not enough money to add 5 more employees to all cities (current: ${corporation.funds.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        )}, needed: ${totalCost.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })})`
      );
      return;
    }

    for (let i = 0; i < division.cities.length; i++) {
      let city = division.cities[i];
      let positions = [
        "Operations",
        "Engineer",
        "Business",
        "Management",
        "Research & Development",
      ];

      ns.corporation.upgradeOfficeSize(division.name, city, positions.length);

      for (let position = 0; position < positions.length; position++) {
        let employee = ns.corporation.hireEmployee(division.name, city);
      }

      let office = ns.corporation.getOffice(division.name, city);
      let count = Math.round(office.employees.length / 5);
      let reminder = office.employees.length - 4 * count;

      await ns.corporation.setAutoJobAssignment(
        industry,
        city,
        "Operations",
        count
      );
      await ns.corporation.setAutoJobAssignment(
        industry,
        city,
        "Engineer",
        count
      );
      await ns.corporation.setAutoJobAssignment(
        industry,
        city,
        "Business",
        reminder
      );
      await ns.corporation.setAutoJobAssignment(
        industry,
        city,
        "Management",
        count
      );
      await ns.corporation.setAutoJobAssignment(
        industry,
        city,
        "Research & Development",
        count
      );
    }
    ns.toast(`Round ${inc + 1} out of ${count} (${industry})`, "info");
  }

  ns.toast(`Finished incrementing all ${industry}-offices.`, "info");
}

export function GetRandomProductName() {
  let member =
    "Product-" +
    Math.ceil(Math.random() * 100000)
      .toString()
      .padStart(5, "0");

  return member;
}
