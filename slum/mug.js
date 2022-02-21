/** @param {NS} ns **/
export async function main(ns) {
  let data = ns.flags([["count", 10]]);

  for (var i = 0; i < data.count; i++) {
    while (ns.isBusy()) {
      await ns.sleep(1000);
    }

    ns.commitCrime("mug someone");
    ns.toast(`${i + 1}/${data.count}`, "info");
  }
}
