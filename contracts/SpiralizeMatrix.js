/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = [];

  let matrix = [...input];
  while (matrix.length) {
    answer.push(
      ...matrix.shift(),
      ...matrix.map((a) => a.pop()),
      ...matrix.pop().reverse(),
      ...matrix.map((a) => a.shift()).reverse()
    );
  }

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
