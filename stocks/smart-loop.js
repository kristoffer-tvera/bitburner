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

  while (true) {
    ns.clearLog();
    let stocks = [];
    let orders = ns.stock.getOrders();

    for (let i = 0; i < symbols.length; i++) {
      let sym = symbols[i];
      let price = ns.stock.getAskPrice(sym);
      let forecast = ns.stock.getForecast(sym);
      let volatility = ns.stock.getVolatility(sym);

      let [shares, avgPx, sharesShort, avgPxShort] = ns.stock.getPosition(sym);

      let graphic = StockPositionToString(ns, sym, shares > 0 ? "L" : "S");

      if (shares > 0 && forecast < 0.5) {
        SellStock(ns, sym);
        shares = 0;
      }

      if (sharesShort > 0 && forecast > 0.5) {
        ShortSellStock(ns, sym);
        sharesShort = 0;
      }

      if (orders[sym] && orders[sym].length === 1) {
        ns.stock.cancelOrder(
          sym,
          orders[sym][0].shares,
          orders[sym][0].price,
          orders[sym][0].type,
          orders[sym][0].position
        );
      }

      stocks.push({
        sym,
        price,
        forecast,
        volatility,
        shares,
        sharesShort,
        graphic,
      });
    }

    stocks = stocks.sort(
      (a, d) => Math.abs(0.5 - d.forecast) - Math.abs(0.5 - a.forecast)
    );

    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];

      if (stock.forecast > 0.55 && stock.shares === 0) {
        BuyStock(ns, stock.sym);
      }

      if (stock.forecast < 0.45 && stock.sharesShort === 0) {
        ShortStock(ns, stock.sym);
      }
    }

    stocks = stocks.sort((a, d) => d.forecast - a.forecast);

    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];

      ns.print(
        `${stock.sym} (${stock.forecast.toFixed(4)}):`.padStart(15, " ") +
          stock.graphic
      );
    }

    await ns.sleep(6000);
  }
}
