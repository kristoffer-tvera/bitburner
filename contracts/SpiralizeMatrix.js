/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = [];

  while (input.length > 0) {
    answer.push(...input[0]);
    input.shift();

    if (input.length > 0) {
      input = input[0]
        .map((_, colIndex) => input.map((row) => row[colIndex]))
        .reverse();
    }
  }

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
