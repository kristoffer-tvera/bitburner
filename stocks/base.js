import { portStockStage } from "/constants.js";

/**
 * @param {NS} ns
 * @param {string} sym
 **/
export function BuyStocks(ns, sym) {
  let playerMoney = ns.getPlayer().money;
  let price = ns.stock.getAskPrice(sym);
  let maxShares = ns.stock.getMaxShares(sym);
  let purchaseCost = ns.stock.getPurchaseCost(sym, maxShares, "Long");
  let targetShareCount = maxShares;

  if (purchaseCost > playerMoney) {
    let budget = playerMoney - 100000;
    targetShareCount = budget / price;
  }

  while (
    ns.stock.getPurchaseCost(sym, targetShareCount, "Long") > playerMoney
  ) {
    playerMoney = ns.getPlayer().money;
    targetShareCount = targetShareCount * 0.95;

    /**
     * This could lead to a endless loop if you for some reason end up having not enough money to buy any shares.
     */
    if (targetShareCount < 100) {
      throw "Too poor to dabble in stocks";
    }
  }

  ns.print(`Buying ${targetShareCount} stocks at ${price}`);
  return ns.stock.buy(sym, targetShareCount);
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
  let attackScript = "/attack/loop.js";
  await ns.writePort(1, target);
  await ns.writePort(2, 2);
  await ns.writePort(3, ns.getServerMinSecurityLevel(target) + 5);
  await ns.writePort(4, ns.getServerSecurityLevel(target));
  await ns.writePort(5, 1);
  await ns.writePort(20, attackScript);
  ns.print(`Growing server ${target}`);
}

/**
 * @param {NS} ns
 * @param {string} target
 **/
export async function Hack(ns, target) {
  let attackScript = "/attack/loop.js";
  await ns.writePort(1, target);
  await ns.writePort(2, 1);
  await ns.writePort(3, ns.getServerMinSecurityLevel(target) + 5);
  await ns.writePort(4, ns.getServerSecurityLevel(target));
  await ns.writePort(5, 2);
  await ns.writePort(20, attackScript);
  ns.print(`Hacking server ${target}`);
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
  let lastSoldStockPrice = 0;

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
        lastSoldStockPrice = ns.stock.getPrice(sym);
        SellStock(ns, sym);
        StopWork(ns);
        ShortStock(ns, sym);
        stage++;
        break;
      case 3: //wait for value-decrease
        let targetValueDecrease = lastSoldStockPrice * 0.5;
        if (targetValueDecrease > ns.stock.getPrice(sym)) {
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
