/** @param {NS} ns **/
export async function main(ns) {
  let filename = ns.args[0];
  let host = ns.args[1];
  var input = ns.codingcontract.getData(filename, host);
  //   var input = "1000101001110110";
  let bits = input.split("").map(Number);
  let error = bits.reduce((previousValue, currentValue, currentIndex) => {
    if (currentValue === 1) {
      console.log(currentIndex);
      return previousValue ^ currentIndex;
    } else {
      return previousValue;
    }
  }, 0);
  let errorBit = error.toString(2);

  // let answer = 0;
  if (errorBit !== "0") {
    let errorBitArray = errorBit.split("").reverse();
    for (let i = 0; i < errorBitArray.length; i++) {
      if (errorBitArray[i] === "0") continue;
      let tempInput = input.split("");
      tempInput[i] = 1;
      input = tempInput.join("");
    }
  }

  let answer = Number.parseInt(input, 2);

  let result = ns.codingcontract.attempt(answer, filename, host);
  ns.tprint(
    `Attempting ${filename} (${host}) with '${answer}' returned the following result: ${result}`
  );
}
