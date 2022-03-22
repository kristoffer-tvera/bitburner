import { cities } from "/constants.js";
import { GetActions } from "/bladeburner/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  let initialCity = ns.bladeburner.getCity();
  for (let j = 0; j < cities.length; j++) {
    ns.bladeburner.switchCity(cities[j]);
    let actions = GetActions(ns);
    let score = actions.reduce(
      (prev, current) => prev + current.successChance[0],
      0
    );
    ns.tprint("City: " + cities[j] + " has a score of " + score);
  }

  ns.bladeburner.switchCity(initialCity);
}
