/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = -1;

  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    for (let j = i; j < input.length; j++) {
      sum += input[j];

      if (sum > answer) {
        answer = sum;
      }
    }
  }

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
