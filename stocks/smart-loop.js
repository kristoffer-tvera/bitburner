import {
  TotalValue,
  StockPositionToString,
  BuyStocks,
  SellStock,
} from "/stocks/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let symbols = ns.stock.getSymbols();

  while (true) {
    ns.clearLog();
    let orders = ns.stock.getOrders();
    let stocks = [];

    for (let i = 0; i < symbols.length; i++) {
      let sym = symbols[i];
      let price = ns.stock.getAskPrice(sym);
      let forecast = ns.stock.getForecast(sym);
      let volatility = ns.stock.getVolatility(sym);

      const [shares, avgPx, sharesShort, avgPxShort] =
        ns.stock.getPosition(sym);

      let graphic = await StockPositionToString(ns, sym);

      stocks.push({
        sym,
        price,
        forecast,
        volatility,
        shares,
        graphic,
      });

      if (shares > 0 && forecast < 0.45) {
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

        SellStock(ns, sym);
      }
    }

    stocks = stocks.sort((a, d) => d.forecast - a.forecast);

    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];

      ns.print(
        `${stock.sym} (${stock.forecast.toFixed(4)}):`.padStart(15, " ") +
          stock.graphic
      );

      if (stock.forecast > 0.6 && stock.shares === 0) {
        await BuyStocks(ns, stock.sym);
      }
    }

    await ns.sleep(6000);
  }
}
