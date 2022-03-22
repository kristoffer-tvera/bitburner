/** @param {NS} ns **/
export async function main(ns) {
  let production = 0;

  for (let i = 0; i < ns.hacknet.numNodes(); i++) {
    let node = ns.hacknet.getNodeStats(i);
    production += node.production;
  }

  let moneyPerSecond = (production / 4) * 1000000;
  let moneyPerMinute = moneyPerSecond * 60;
  let moneyPerHour = moneyPerMinute * 60;

  ns.tprint(
    `-- Money-rate from current hacknet nodes (hashrate/s: ${production} -- )`
  );
  ns.tprint(
    "Per second: \t" +
      moneyPerSecond.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
  );
  ns.tprint(
    "Per minute: \t" +
      moneyPerMinute.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
  );
  ns.tprint(
    "Per hour: \t" +
      moneyPerHour.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
  );
  ns.tprint(
    "Per 8 hour: \t" +
      (moneyPerHour * 8).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
  );
}
