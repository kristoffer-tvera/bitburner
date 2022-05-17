import { Loop } from "/stocks/base.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");

  let sym = "JGN";
  let companyName = "Joe's Guns";
  let serverName = "joesguns";
  let field = "employee";

  await Loop(ns, sym, companyName, serverName, field);
}
