import { Hack } from "/stocks/base.js";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");
  let serverName = "joesguns";
  await Hack(ns, serverName);
}
