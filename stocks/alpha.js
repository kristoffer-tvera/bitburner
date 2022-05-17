import { Loop } from "/stocks/base.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");

  let sym = "APHE";
  let companyName = "Alpha Enterprises";
  let serverName = "alpha-ent";
  let field = "software";

  await Loop(ns, sym, companyName, serverName, field);
}
