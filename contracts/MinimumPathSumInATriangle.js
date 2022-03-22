/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);

  for (let row = input.length - 2; row > -1; row--)
    for (let col = 0; col < input[row].length; col++)
      input[row][col] += Math.min(input[-~row][col], input[-~row][-~col]);
  let answer = input[0][0];

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
