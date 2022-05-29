import {
  StockPositionToString,
  BuyStock,
  SellStock,
  ShortStock,
  ShortSellStock,
} from "/stocks/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let symbols = ns.stock.getSymbols();

  let stockPredictions = [];

  for (let i = 0; i < symbols.length; i++) {
    let sym = symbols[i];
    const [shares, avgPx, sharesShort, avgPxShort] = ns.stock.getPosition(sym);

    // stockPredictions[sym] = {
    //   sym,
    //   shares,
    //   avgPx,
    //   sharesShort,
    //   avgPxShort,
    //   score: 0,
    //   lastPrices: [],
    //   lastPrice: ns.stock.getAskPrice(sym),
    // };

    stockPredictions.push({
      sym,
      shares,
      avgPx,
      sharesShort,
      avgPxShort,
      score: 0,
      lastPrices: [],
      lastPrice: ns.stock.getAskPrice(sym),
    });
  }

  let ready = false;
  while (true) {
    ns.clearLog();
    let orders = ns.stock.getOrders();

    for (let i = 0; i < stockPredictions.length; i++) {
      const [shares, avgPx, sharesShort, avgPxShort] = ns.stock.getPosition(
        stockPredictions[i].sym
      );

      let price = ns.stock.getAskPrice(stockPredictions[i].sym);
      let direction = price > stockPredictions[i].lastPrice ? 1 : -1;

      stockPredictions[i].lastPrices.push(direction);
      stockPredictions[i].lastPrice = price;

      if (stockPredictions[i].lastPrices.length > 30) {
        stockPredictions[i].lastPrices.splice(0, 1);
      }

      let score = stockPredictions[i].lastPrices.reduce(
        (element, total) => element + total
      );

      stockPredictions[i].shares = shares;
      stockPredictions[i].avgPx = avgPx;
      stockPredictions[i].sharesShort = sharesShort;
      stockPredictions[i].avgPxShort = avgPxShort;
      stockPredictions[i].score = score;

      ready = stockPredictions[i].lastPrices.length === 30;

      if (
        orders[stockPredictions[i].sym] &&
        orders[stockPredictions[i].sym].length === 1
      ) {
        ns.stock.cancelOrder(
          stockPredictions[i].sym,
          orders[stockPredictions[i].sym][0].shares,
          orders[stockPredictions[i].sym][0].price,
          orders[stockPredictions[i].sym][0].type,
          orders[stockPredictions[i].sym][0].position
        );
      }
    }

    if (!ready) {
      await ns.sleep(6000);
      continue;
    }

    for (let i = 0; i < stockPredictions.length; i++) {
      let prediction = stockPredictions[i];
      if (prediction.score < 0 && prediction.shares > 0) {
        SellStock(ns, prediction.sym);
      }

      if (prediction.score > 0 && prediction.sharesShort > 0) {
        ShortSellStock(ns, prediction.sym);
      }
    }

    stockPredictions = stockPredictions.sort(
      (a, d) => Math.abs(30 - (d.score + 30)) - Math.abs(30 - (a.score + 30))
    );

    for (let i = 0; i < stockPredictions.length; i++) {
      let prediction = stockPredictions[i];
      if (prediction.score > 15 && prediction.shares === 0) {
        BuyStock(ns, prediction.sym);
      }

      if (prediction.score < -15 && prediction.sharesShort === 0) {
        ShortStock(ns, prediction.sym);
      }
    }

    stockPredictions = stockPredictions.sort((a, d) => d.score - a.score);

    for (let i = 0; i < stockPredictions.length; i++) {
      let graphic = StockPositionToString(
        ns,
        stockPredictions[i].sym,
        stockPredictions[i].shares > 0 ? "L" : "S"
      );

      ns.print(
        `${stockPredictions[i].sym} (${stockPredictions[i].score}):`.padStart(
          11,
          " "
        ) + graphic
      );
    }

    await ns.sleep(6000);
  }
}
