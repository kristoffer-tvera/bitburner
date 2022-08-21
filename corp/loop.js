import { GetRandomProductName } from "/corp/base";
import { cities } from "/constants.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let divisionName = "Tobacco";

  let upgrades = [
    "FocusWires",
    "Neural Accelerators",
    "Speech Processor Implants",
    "Nuoptimal Nootropic Injector Implants",
    "Smart Factories",
    "ABC SalesBots",
    "Project Insight",
    "Wilson Analytics",
    "DreamSense",
  ];

  while (true) {
    ns.clearLog();

    let division = ns.corporation.getDivision(divisionName);
    let products = division.products;
    let productData = [];
    for (let i = 0; i < products.length; i++) {
      let product = ns.corporation.getProduct(divisionName, products[i]);
      productData.push(product);
    }

    productData.sort((a, d) => a.rat - d.rat);

    let anyProductInDevelopment =
      productData.findIndex((p) => p.developmentProgress < 100) >= 0;

    let worstProduct = productData[0];

    if (!anyProductInDevelopment && productData.length === 3) {
      ns.corporation.discontinueProduct(divisionName, worstProduct.name);

      while (ns.corporation.getCorporation().funds < 6000000000) {
        await ns.sleep(1000);
      }

      ns.corporation.makeProduct(
        divisionName,
        "Aevum",
        GetRandomProductName(),
        3000000000,
        3000000000
      );
    }

    let upgradeCost = [];
    for (let i = 0; i < upgrades.length; i++) {
      upgradeCost.push({
        name: upgrades[i],
        cost: ns.corporation.getUpgradeLevelCost(upgrades[i]),
      });
    }

    upgradeCost.sort((a, d) => a.cost - d.cost);

    let cheapestUpgrade = upgradeCost[0];
    let advertCost = ns.corporation.getHireAdVertCost(divisionName);

    if (
      ns.corporation.getCorporation().funds > advertCost ||
      ns.corporation.getCorporation().funds > cheapestUpgrade.cost
    ) {
      if (advertCost < cheapestUpgrade.cost) {
        ns.corporation.hireAdVert(divisionName);
      } else {
        ns.corporation.levelUpgrade(cheapestUpgrade.name);
      }
    }

    products = ns.corporation.getDivision(divisionName).products;
    for (let i = 0; i < products.length; i++) {
      let product = ns.corporation.getProduct(divisionName, products[i]);

      if (product.developmentProgress < 100) continue;

      await PriceAdjustProduct(ns, divisionName, product.name);
    }

    await ns.sleep(1000);
  }
}

/** @param {NS} ns
 *  @param {string} divisionName
 *  @param {string} productName **/
async function PriceAdjustProduct(ns, divisionName, productName) {
  let product = ns.corporation.getProduct(divisionName, productName);
  let price =
    product.sCost.length === 0 || product.sCost === 0
      ? product.pCost
      : product.sCost;
  let newPrice = price * 1.01;

  let cities = ["Aevum"];
  let startingScore = await ProductPriceScore(product);

  ns.print("Score before price increase: ", startingScore);

  for (let i = 0; i < cities.length; i++) {
    ns.corporation.sellProduct(
      divisionName,
      cities[i],
      productName,
      "MAX",
      newPrice,
      false
    );
  }

  await MarketCycle(ns);

  product = ns.corporation.getProduct(divisionName, productName);
  let scoreAfterPriceIncrease = await ProductPriceScore(product);

  ns.print("Score after price increase: ", scoreAfterPriceIncrease);

  if (scoreAfterPriceIncrease < startingScore) {
    for (let i = 0; i < cities.length; i++) {
      ns.corporation.sellProduct(
        divisionName,
        cities[i],
        productName,
        "MAX",
        price,
        false
      );
    }
  }
}

/** @param {Product } product **/
async function ProductPriceScore(product) {
  let totalScore = 0;

  for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    let [quantity, production, sale] = product.cityData[city];
    let score = sale - production;
    totalScore += score;
  }

  return totalScore;
}

/** @param {NS} ns **/
async function MarketCycle(ns) {
  let funds = ns.corporation.getCorporation().funds;

  while (ns.corporation.getCorporation().funds === funds) {
    await ns.sleep(100);
  }

  return;
}
