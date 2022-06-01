import { Grow } from "/stocks/base.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");

  let sym = "RHOC";
  let serverName = "rho-construction";
  await Grow(ns, serverName);
}
