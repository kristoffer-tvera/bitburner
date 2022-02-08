/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  let answer = -1;

  const isPrime = (num) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  while (input % 2 == 0) {
    input = input / 2;
    answer = 2;
  }

  while (input % 3 == 0) {
    input = input / 3;
    answer = 3;
  }

  for (let i = 5; i <= Math.sqrt(input); i += 6) {
    while (input % i == 0) {
      answer = i;
      input = input / i;
    }
    while (input % (i + 2) == 0) {
      answer = i + 2;
      input = input / (i + 2);
    }
  }

  answer = input > 4 ? input : answer;

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
