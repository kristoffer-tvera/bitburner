import { TotalValue, StockPositionToString } from "/stocks/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let tradeFee = 100000;
  let symbols = ns.stock.getSymbols();

  let stockPredictions = [];

  for (let i = 0; i < symbols.length; i++) {
    let sym = symbols[i];
    stockPredictions[sym] = {
      lastPrices: [],
      lastPrice: ns.stock.getAskPrice(sym),
    };
  }

  while (true) {
    ns.clearLog();
    let orders = ns.stock.getOrders();

    for (let i = 0; i < symbols.length; i++) {
      let sym = symbols[i];
      let price = ns.stock.getAskPrice(sym);
      let stockHistory = stockPredictions[sym];
      let direction = price > stockHistory.lastPrice ? 1 : -1;

      stockHistory.lastPrices.push(direction);
      stockHistory.lastPrice = price;

      if (stockHistory.lastPrices.length > 30) {
        stockHistory.lastPrices.splice(0, 1);
      }

      stockPredictions[sym] = stockHistory;

      if (stockHistory.lastPrices.length < 30) {
        continue;
      }

      let score = stockHistory.lastPrices.reduce(
        (element, total) => element + total
      );
      const [shares, avgPx, sharesShort, avgPxShort] =
        ns.stock.getPosition(sym);

      let graphic = await StockPositionToString(ns, sym);

      ns.print(`${sym} (${score}):`.padStart(11, " ") + graphic);

      if (score > 15 && shares === 0) {
        let totalValue = await TotalValue(ns);
        let budget = Math.max(100000, totalValue / 10);
        let maxShares = ns.stock.getMaxShares(sym);
        let targetShareCount = (budget - tradeFee) / price;
        targetShareCount =
          targetShareCount > maxShares ? maxShares : targetShareCount;

        let purchaseCost = ns.stock.getPurchaseCost(
          sym,
          targetShareCount,
          "Long"
        );
        let playerMoney = ns.getPlayer().money;

        let sharesPurchased = false;

        if (orders[sym]) {
          for (let i = 0; i < orders[sym].length; i++) {
            let order = orders[sym][i];
            ns.stock.cancelOrder(
              sym,
              order.shares,
              order.price,
              order.type,
              order.position
            );
          }
        }

        if (purchaseCost <= playerMoney) {
          sharesPurchased = ns.stock.buy(sym, targetShareCount) !== 0;
        }

        if (sharesPurchased) {
          ns.tprint(`Purchased ${targetShareCount} of ${sym} at ${price} each`);
          let stopSellOrder = ns.stock.placeOrder(
            sym,
            targetShareCount,
            0.8 * price,
            "Stop Sell Order",
            "Long"
          );
          if (stopSellOrder) {
            ns.tprint(`Placed stop sell order on ${0.8 * price}`);
          }
          let limitSellOrder = ns.stock.placeOrder(
            sym,
            targetShareCount,
            1.2 * price,
            "Limit Sell Order",
            "Long"
          );
          if (limitSellOrder) {
            ns.tprint(`Placed limit sell order on ${1.2 * price}`);
          }
        }
      }
    }

    await ns.sleep(6000);
  }
}
