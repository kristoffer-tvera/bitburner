/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = [];

  let allNumbers = [];
  let max = -1;
  input.forEach((element) => {
    max = element[1] > max ? element[1] : max;
  });
  for (let i = 0; i < max; i++) {
    allNumbers[i] = false;
  }

  for (let i = 0; i < input.length; i++) {
    let start = input[i][0];
    let end = input[i][1];

    for (let j = start; j < end; j++) {
      allNumbers[j] = true;
    }
  }

  let start = -1;
  for (let i = 0; i < max + 2; i++) {
    if (allNumbers[i] && start === -1) {
      start = i;
    }

    if (!allNumbers[i] && start !== -1) {
      answer.push([start, i]);
      start = -1;
    }
  }

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
