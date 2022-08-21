/** @param {NS} ns **/
export async function main(ns) {
  let data = ns.flags([
    ["count", 10],
    ["timed", false],
    ["endless", false],
  ]);

  let crime = "mug someone";

  let timeLimit = 0;
  if (data.timed) {
    let seconds = await ns.prompt("Seconds:", { type: "text" });
    seconds = Number.parseInt(seconds);
    seconds = Number.isSafeInteger(seconds) ? seconds : 0;

    let minutes = await ns.prompt("Minutes:", { type: "text" });
    minutes = Number.parseInt(minutes);
    minutes = Number.isSafeInteger(minutes) ? minutes : 0;

    let hours = await ns.prompt("Hours:", { type: "text" });
    hours = Number.parseInt(hours);
    hours = Number.isSafeInteger(hours) ? hours : 0;

    timeLimit += seconds * 1000;
    timeLimit += minutes * 60 * 1000;
    timeLimit += hours * 60 * 60 * 1000;

    while (timeLimit > 0) {
      while (ns.singularity.isBusy()) {
        await ns.sleep(1000);
      }

      let time = ns.commitCrime(crime);
      timeLimit -= time;
    }

    return;
  }

  let endlessStop = 0;
  if (data.endless) {
    while (true) {
      while (ns.singularity.isBusy()) {
        await ns.sleep(1000);
      }

      ns.singularity.commitCrime(crime);
      ns.toast(`Break in ${50 - endlessStop++} actions`, "info");

      if (endlessStop === 50) {
        await ns.sleep(15000);
        if (ns.singularity.isBusy()) {
          ns.toast(`Stopping endless-mode`, "info");
          return;
        }

        endlessStop = 0;
      }
    }
  }

  for (var i = 0; i < data.count; i++) {
    while (ns.singularity.isBusy()) {
      await ns.sleep(1000);
    }

    ns.singularity.commitCrime(crime);
    ns.toast(`${i + 1}/${data.count}`, "info");
  }
}
