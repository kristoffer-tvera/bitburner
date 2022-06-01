import { Loop, StartWork, Grow } from "/stocks/base.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");

  let sym = "JGN";
  let companyName = "Joe's Guns";
  let serverName = "joesguns";
  let field = "employee";
  await Grow(ns, serverName);
  StartWork(ns, companyName, field);
  // await Loop(ns, sym, companyName, serverName, field);
}
