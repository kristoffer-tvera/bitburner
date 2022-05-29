import { SellStock, ShortSellStock } from "/stocks/base.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let symbols = ns.stock.getSymbols();
  let orders = ns.stock.getOrders();

  for (let i = 0; i < symbols.length; i++) {
    let sym = symbols[i];
    let [shares, avgPx, sharesShort, avgPxShort] = ns.stock.getPosition(sym);

    if (shares > 0) {
      SellStock(ns, sym);
    }

    if (sharesShort > 0) {
      ShortSellStock(ns, sym);
    }

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
  }
}
