/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = 0;

  for (let i = 1; i < input.length; i++) {
    for (let j = 0; j < i; j++) {
      let sum = input[i] - input[j];
      if (sum > answer) answer = sum;
    }
  }

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
