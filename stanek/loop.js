/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  while (true) {
    let fragments = ns.stanek.activeFragments();
    for (let i = 0; i < fragments.length; i++) {
      let fragment = fragments[i];
      if (fragment.limit === 99) continue;

      await ns.stanek.chargeFragment(fragment.x, fragment.y);
    }

    await ns.sleep(1000);
  }
}
