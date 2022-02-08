/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);

  function numberOfPaths(first, second) {
    if (first == 1 || second == 1) {
      return 1;
    }

    return numberOfPaths(first - 1, second) + numberOfPaths(first, second - 1);
  }

  let answer = numberOfPaths(input[0], input[1]);

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
