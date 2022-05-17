/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  let currentlyWorking = true;

  while (true) {
    ns.clearLog();

    let symbols = ns.stock.getSymbols();

    for (let i = 0; i < symbols.length; i++) {
      let sym = symbols[i];
      // let bid = ns.stock.getBidPrice(sym);
      // let ask = ns.stock.getAskPrice(sym);

      let purchaseCost = ns.stock.getPurchaseCost(sym, 1, "Long");
      let maxShares = ns.stock.getMaxShares(sym);

      // let price = ns.stock.getPrice(sym);
      let price = ns.stock.getAskPrice(sym);
      // let forecast = ns.stock.getForecast(sym);
      let forecast = -1;
      // let volatility = ns.stock.getVolatility(sym);
      let volatility = -1;

      ns.print(
        `Stock "${sym}", price: ${Math.floor(price).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}, purchase cost (1): ${purchaseCost.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })} forecast: ${forecast}, volatility: ${volatility}, max shares: ${maxShares}`
      );
    }

    await ns.sleep(6000);
  }
}
