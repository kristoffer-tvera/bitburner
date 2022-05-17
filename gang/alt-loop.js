import { GetRandomName } from "/gang/base";

/** @param {NS} ns **/
export async function main(ns) {
  let initialTask = "Train Combat";
  ns.disableLog("ALL");

  while (true) {
    ns.clearLog();
    while (ns.gang.canRecruitMember()) {
      let member = GetRandomName();
      ns.gang.recruitMember(member);
      ns.gang.setMemberTask(member, initialTask);
    }

    let gangMembers = ns.gang.getMemberNames();
    let hackers = [];
    for (let i = 0; i < gangMembers.length; i++) {
      let member = gangMembers[i];
      let info = ns.gang.getMemberInformation(member);

      hackers.push(info);

      let ascensionResult = ns.gang.getAscensionResult(member);
      if (!ascensionResult) {
        ascensionResult = { str: 1 };
      }

      ns.print(
        `Gang Member '${member}' (str: ${info.str}, ascend multiplier: str ${(
          ascensionResult.str * 100 -
          100
        ).toFixed(2)}), doing "${info.task}"`
      );

      if (ascensionResult.str > 1.1) {
        // 10% increased str
        ns.gang.ascendMember(member);
        ns.gang.setMemberTask(member, initialTask);
        continue;
      }

      if (info.str < 450) {
        ns.gang.setMemberTask(member, initialTask);
        continue;
      }

      if (info.str < 400) {
        ns.gang.setMemberTask(member, "Mug People");
        continue;
      }

      if (info.str < 450) {
        ns.gang.setMemberTask(member, "Strongarm Civilians");
        continue;
      }

      if (info.str < 500) {
        ns.gang.setMemberTask(member, "Run a Con");
        continue;
      }

      if (info.str < 550) {
        ns.gang.setMemberTask(member, "Armed Robbery");
        continue;
      }

      if (info.str < 600) {
        ns.gang.setMemberTask(member, "Traffick Illegal Arms");
        continue;
      }

      if (info.str < 650) {
        ns.gang.setMemberTask(member, "Threaten & Blackmail");
        continue;
      }

      if (info.str < 700) {
        ns.gang.setMemberTask(member, "Human Trafficking");
        continue;
      }

      if (info.str < 3500) {
        ns.gang.setMemberTask(member, "Terrorism");
        continue;
      }

      ns.gang.setMemberTask(member, "Terrorism");
    }

    hackers = hackers.sort((a, b) => {
      return b.str - a.str;
    });

    let gangInfo = ns.gang.getGangInformation();

    if (gangInfo.wantedLevel > 5 && hackers.length > 0) {
      ns.gang.setMemberTask(hackers[0].name, "Vigilante Justice");
    }
    if (gangInfo.wantedLevel > 10 && hackers.length > 1) {
      ns.gang.setMemberTask(hackers[1].name, "Vigilante Justice");
    }
    if (gangInfo.wantedLevel > 25 && hackers.length > 2) {
      ns.gang.setMemberTask(hackers[2].name, "Vigilante Justice");
    }
    if (gangInfo.wantedLevel > 50 && hackers.length > 3) {
      ns.gang.setMemberTask(hackers[3].name, "Vigilante Justice");
    }
    if (gangInfo.wantedLevel > 75 && hackers.length > 4) {
      ns.gang.setMemberTask(hackers[4].name, "Vigilante Justice");
    }

    await ns.sleep(1000);
  }
}
