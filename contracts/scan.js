import { RecursiveGetServers } from "/util/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  let servers = await RecursiveGetServers(ns, ["home"], "home");
  for (let i = 0; i < servers.length; i++) {
    let contracts = ns.ls(servers[i], "cct");
    for (let j = 0; j < contracts.length; j++) {
      let contractType = ns.codingcontract.getContractType(
        contracts[j],
        servers[i]
      );
      switch (contractType) {
        case "Unique Paths in a Grid I":
          ns.run(
            "/contracts/UniquePathsinaGrid.js",
            1,
            contracts[j],
            servers[i]
          );
          await ns.sleep(1000);
          break;
        case "Spiralize Matrix":
          ns.run("/contracts/SpiralizeMatrix.js", 1, contracts[j], servers[i]);
          await ns.sleep(1000);
          break;
        case "Find Largest Prime Factor":
          ns.run(
            "/contracts/FindLargestPrimeFactor.js",
            1,
            contracts[j],
            servers[i]
          );
          await ns.sleep(1000);
          break;
        case "Merge Overlapping Intervals":
          ns.run(
            "/contracts/MergeOverlappingIntervals.js",
            1,
            contracts[j],
            servers[i]
          );
          await ns.sleep(1000);
          break;
        // case "SanitizeParenthesesInExpression.js":
        // ns.run(
        //   "/contracts/SanitizeParenthesesInExpression.js",
        //   1,
        //   contracts[j],
        //   servers[i]
        // );
        // await ns.sleep(1000);
        // break;
        // case "Generate IP Addresses":
        // ns.run(
        //   "GenerateIpAddresses.js",
        //   1,
        //   contracts[j],
        //   servers[i]
        // );
        // await ns.sleep(1000);
        // break;
        case "Subarray with Maximum Sum":
          ns.run(
            "/contracts/SubarraywithMaximumSum.js",
            1,
            contracts[j],
            servers[i]
          );
          await ns.sleep(1000);
          break;
        case "Total Ways to Sum":
          ns.run("/contracts/TotalWaysToSum.js", 1, contracts[j], servers[i]);
          await ns.sleep(1000);
          break;
        case "Algorithmic Stock Trader I":
          ns.run(
            "/contracts/AlgorithmicStockTrader.js",
            1,
            contracts[j],
            servers[i]
          );
          await ns.sleep(1000);
          break;
        case "Array Jumping Game":
          ns.run("/contracts/ArrayJumpingGame.js", 1, contracts[j], servers[i]);
          await ns.sleep(1000);
          break;
        case "Minimum Path Sum in a Triangle":
          ns.run(
            "/contracts/MinimumPathSumInATriangle.js",
            1,
            contracts[j],
            servers[i]
          );
          await ns.sleep(1000);
          break;
        default:
          ns.tprint(
            `Unhandled contract '${contracts[j]}' (${contractType}), on server: ${servers[i]}`
          );
          break;
      }
    }
  }
}
