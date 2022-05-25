import {
  portServerMaxMoney,
  portServerMinSecurityLevel,
  portServerMoneyAvailable,
  portServerSecurityLevel,
  portTarget,
  portAffectStockMarket,
} from "/constants.js";

/**
 * @param {NS} ns
 * @param {string} sym
 **/
export async function BuyStocks(ns, sym) {
  let playerMoney = ns.getPlayer().money;
  let orders = ns.stock.getOrders();
  let price = ns.stock.getAskPrice(sym);
  let maxShares = ns.stock.getMaxShares(sym);
  let purchaseCost = ns.stock.getPurchaseCost(sym, maxShares, "Long");
  let targetShareCount = maxShares;

  if (purchaseCost > playerMoney) {
    let totalValue = await TotalValue(ns);
    let budget = Math.max(100000, totalValue / 10);
    targetShareCount = budget / price;
  }

  if (ns.stock.getPurchaseCost(sym, targetShareCount, "Long") > playerMoney) {
    return;
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

  ns.print(`Buying ${targetShareCount} stocks at ${price}`);
  let sharesPurchased = ns.stock.buy(sym, targetShareCount);
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

  return;
}

/**
 * @param {NS} ns
 * @param {string} sym
 **/
export function ShortStock(ns, sym) {
  let playerMoney = ns.getPlayer().money;
  let price = ns.stock.getAskPrice(sym);
  let maxShares = ns.stock.getMaxShares(sym);
  let purchaseCost = ns.stock.getPurchaseCost(sym, maxShares, "Short");
  let targetShareCount = maxShares;

  if (purchaseCost > playerMoney) {
    let budget = playerMoney - 100000;
    targetShareCount = budget / price;
  }

  while (
    ns.stock.getPurchaseCost(sym, targetShareCount, "Short") > playerMoney
  ) {
    playerMoney = ns.getPlayer().money;
    targetShareCount = targetShareCount * 0.95;

    /**
     * This could lead to a endless loop if you for some reason end up having not enough money to short any shares.
     */
    if (targetShareCount < 100) {
      throw "Too poor to dabble in stocks";
    }
  }

  ns.print(`Shorting ${targetShareCount} stocks at ${price}`);
  return ns.stock.short(sym, targetShareCount);
}

/**
 * @param {NS} ns
 * @param {string} target
 **/
export async function Grow(ns, target) {
  ns.clearPort(portTarget);
  await ns.writePort(portTarget, target);
  ns.clearPort(portAffectStockMarket);
  await ns.writePort(portAffectStockMarket, JSON.stringify([true, false]));
  ns.print(`Growing server ${target} now affects the stock-market`);
}

/**
 * @param {NS} ns
 * @param {string} target
 **/
export async function Hack(ns, target) {
  ns.clearPort(portTarget);
  await ns.writePort(portTarget, target);
  ns.clearPort(portAffectStockMarket);
  await ns.writePort(portAffectStockMarket, JSON.stringify([false, true]));
  ns.print(`Hacking server ${target} now affects the stock-market`);
}

/**
 * @param {NS} ns
 * @param {string} sym
 **/
export function SellStock(ns, sym) {
  let position = ns.stock.getPosition(sym);
  let shareCount = position[0];
  ns.print(`Selling ${shareCount} stocks at ${ns.stock.getPrice(sym)}`);
  return ns.stock.sell(sym, shareCount);
}

/**
 * @param {NS} ns
 * @returns {number} TotalValueOfMoney
 **/
export async function TotalValue(ns) {
  let sum = ns.getPlayer().money;
  let symbols = ns.stock.getSymbols();
  for (let i = 0; i < symbols.length; i++) {
    const [shares, avgPx, sharesShort, avgPxShort] = ns.stock.getPosition(
      symbols[i]
    );
    if (shares == 0) continue;
    let price = ns.stock.getPrice(symbols[i]);
    sum += shares * price;
  }

  return sum;
}

/**
 * @param {NS} ns
 * @param {string} sym Stock symbol to print
 * @returns {string} Graphical representation of stock position
 **/
export async function StockPositionToString(ns, sym) {
  const strLength = 50;
  let orders = ns.stock.getOrders();
  if (!orders || !orders[sym] || orders[sym].length !== 2) return "No position";

  let price = ns.stock.getPrice(sym);

  let stockTradeOrders = orders[sym];
  let stopSellOrder = stockTradeOrders.find(
    (order) => order.type === "Stop Sell Order"
  );
  let limitSellOrder = stockTradeOrders.find(
    (order) => order.type === "Limit Sell Order"
  );

  let span = Math.ceil(Math.abs(limitSellOrder.price - stopSellOrder.price));
  let currentValueMinusStop = Math.floor(Math.abs(price - stopSellOrder.price));
  let percentageFill = currentValueMinusStop / span;
  let fillPosition = Math.ceil(percentageFill * strLength);

  let str =
    "[".padEnd(fillPosition, "-") +
    "|" +
    "]".padStart(strLength - fillPosition, "-");

  return str;
}

/**
 * @param {NS} ns
 * @param {string} sym
 **/
export function ShortSellStock(ns, sym) {
  let position = ns.stock.getPosition(sym);
  let shareCount = position[2];
  ns.print(`Selling ${shareCount} stocks at ${ns.stock.getPrice(sym)}`);
  return ns.stock.sellShort(sym, shareCount);
}

/**
 * @param {NS} ns
 * @param {string} companyName
 * @param {string} field
 **/
export function StartWork(ns, companyName, field) {
  ns.singularity.applyToCompany(companyName, field);
  ns.print("Starting work");
  return ns.singularity.workForCompany(companyName, true);
}

/**
 * @param {NS} ns
 **/
export function StopWork(ns) {
  ns.print("Stopping work");
  return ns.singularity.stopAction();
}

/**
 * @param {NS} ns
 * @param {string} sym
 * @param {string} companyName
 * @param {string} serverName
 * @param {string} field
 **/
export async function Loop(ns, sym, companyName, serverName, field) {
  let stage = 0;
  let position = ns.stock.getPosition(sym);
  if (position[0] > 0) {
    stage = 1;
  } else if (position[2] > 0) {
    stage = 3;
  }

  while (true) {
    ns.clearLog();
    ns.print(`Currently on stage ${stage}`);

    let position = ns.stock.getPosition(sym);

    switch (stage) {
      case 0: //buy stock (long) and start working
        BuyStocks(ns, sym);
        StartWork(ns, companyName, field);
        stage++;
        break;
      case 1: //wait for value-increase
        let targetValueIncrease = position[1] * 1.5;
        if (targetValueIncrease < ns.stock.getPrice(sym)) {
          stage++;
          break;
        }
        if (!ns.singularity.isBusy()) StartWork(ns, companyName, field);
        await Grow(ns, serverName);
        ns.print(
          `Waiting for stock to increase to ${targetValueIncrease.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}, currently at ${ns.stock.getPrice(sym).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`
        );
        break;
      case 2: //Sell stock, stop working, and short it.
        SellStock(ns, sym);
        StopWork(ns);
        ShortStock(ns, sym);
        stage++;
        break;
      case 3: //wait for value-decrease
        let targetValueDecrease = position[3] * 0.5;
        if (targetValueDecrease > ns.stock.getPrice(sym)) {
          ShortSellStock(ns, sym);
          stage = 0;
          break;
        }
        await Hack(ns, serverName);
        ns.print(
          `Waiting for stock to decrease to ${targetValueDecrease.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}, currently at ${ns.stock.getPrice(sym).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`
        );
        break;
    }

    await ns.sleep(6000);
  }
}
