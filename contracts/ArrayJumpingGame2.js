/** @param {NS} ns **/
export async function main(ns) {
  function Jump(inputList) {
    if (inputList.length === 1) return true;
    let currentElement = inputList[0];
    if (currentElement >= inputList.length) return true;

    for (let i = 1; i < currentElement; i++) {
      if (Jump(inputList.slice(i))) {
        return true;
      }
    }

    return false;
  }

  let filename = ns.args[0];
  let host = ns.args[1];
  let input = ns.codingcontract.getData(filename, host);
  // let answer = Jump(input) ? 1 : 0;
  let answer = 0;
  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );

  if (!result) {
    ns.tprint("Debug-information from failed submission: " + input);
  }
}
