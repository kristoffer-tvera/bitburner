/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);

  let listOfCombinations = Array.from({ length: input + 1 }, (_, i) => 0);
  listOfCombinations[0] = 1;

  for (let row = 1; row < input - 1 + 1; row++) {
    for (let col = 1; col < input + 1; col++) {
      if (col >= row)
        listOfCombinations[col] =
          listOfCombinations[col] + listOfCombinations[col - row];
    }
  }

  let answer = listOfCombinations[input];

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
