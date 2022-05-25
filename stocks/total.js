import { TotalValue } from "/stocks/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  let sum = await TotalValue(ns);

  ns.tprint(
    `Total value including stocks: ${sum.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`
  );
}
