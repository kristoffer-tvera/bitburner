/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = [];

  let result = "";
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
