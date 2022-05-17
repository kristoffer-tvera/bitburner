import { initialTarget, attackScript, attackScriptPort } from "/constants.js";

/** @param {NS} ns **/
export async function main(ns) {
  await ns.writePort(attackScriptPort, attackScript);
  await ns.sleep(100);
  ns.exec("/attack/cc.js", "home", 1, initialTarget);
  await ns.sleep(100);
  ns.exec("/attack/cc.js", "home");
  await ns.sleep(100);
  ns.exec("/hacknet/loop.js", "home", 1, "--upgrade", true);
  await ns.sleep(100);

  if (ns.bladeburner.joinBladeburnerDivision()) {
    ns.exec("/bladeburner/loop.js", "home");
    await ns.sleep(100);
  }

  if (ns.gang.inGang()) {
    if (ns.gang.getGangInformation().isHacking) {
      ns.exec("/gang/loop.js", "home");
    } else {
      ns.exec("/gang/alt-loop.js", "home");
    }

    await ns.sleep(100);
  }

  if (ns.sleeve) {
    ns.exec("/sleeves/loop.js", "home");
    await ns.sleep(100);
  }

  ns.exec("/attack/deploy.js", "home");
  // await ns.sleep(1000 * 15);
  // ns.exec('/util/heartbeat.js', 'home');
  await ns.sleep(100);
  ns.tprint(
    'Initial setup complete. Execute "run /attack/deploy.js" again later when scripts has run for a few minutes'
  );
  // await ns.sleep(1000);
  // ns.exec('/util/new-servers.js', 'home');
}
