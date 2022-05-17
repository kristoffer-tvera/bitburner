import { GetRandomName } from "/gang/base";

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");
  let initialTask = "Train Hacking";
  let defaultEquipment = [
    "NUKE Rootkit",
    "Soulstealer Rootkit",
    "Hmap Node",
    "Demon Rootkit",
    "Jack the Ripper",
  ];

  while (true) {
    ns.clearLog();
    // ns.disableLog("sleep");
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
        ascensionResult = { hack: 1 };
      }

      ns.print(
        `Gang Member '${member}' (hack: ${
          info.hack
        }, ascend multiplier: hack ${(ascensionResult.hack * 100 - 100).toFixed(
          2
        )}), doing "${info.task}"`
      );

      if (ascensionResult.hack > 1.1) {
        ns.gang.ascendMember(member);
        ns.gang.setMemberTask(member, initialTask);

        continue;
      }

      if (info.hack < 50) {
        ns.gang.setMemberTask(member, "Train Hacking");
        continue;
      }

      if (info.hack < 60) {
        ns.gang.setMemberTask(member, "Ransomware");
        continue;
      }

      if (info.hack < 400) {
        ns.gang.setMemberTask(member, "Train Hacking");
        continue;
      }

      if (info.hack < 500) {
        ns.gang.setMemberTask(member, "Phishing");
        continue;
      }

      if (info.hack < 600) {
        ns.gang.setMemberTask(member, "Identity Theft");
        continue;
      }

      if (info.hack < 700) {
        ns.gang.setMemberTask(member, "DDoS Attacks");
        continue;
      }

      if (info.hack < 800) {
        ns.gang.setMemberTask(member, "Fraud & Counterfeiting");
        continue;
      }

      if (info.hack < 5000) {
        ns.gang.setMemberTask(member, "Money Laundering");
        continue;
      }

      // if (info.hack < 9000) {
      //   ns.gang.setMemberTask(member, "Cyberterrorism");
      //   continue;
      // }

      // if (info.hack < 10000) {
      //   ns.gang.setMemberTask(member, "Territory Warfare");
      //   continue;
      // }

      if (info.hack < 15000) {
        ns.gang.setMemberTask(member, "Cyberterrorism");
        continue;
      }

      if (info.hack < 17500) {
        ns.gang.setMemberTask(member, "Territory Warfare");
        continue;
      }

      ns.gang.setMemberTask(member, "Money Laundering");
    }

    hackers = hackers.sort((a, b) => {
      return b.hack - a.hack;
    });

    let gangInfo = ns.gang.getGangInformation();

    if (gangInfo.wantedLevel > 5 && hackers.length > 0) {
      ns.gang.setMemberTask(hackers[0].name, "Ethical Hacking");
    }
    if (gangInfo.wantedLevel > 10 && hackers.length > 1) {
      ns.gang.setMemberTask(hackers[1].name, "Ethical Hacking");
    }
    if (gangInfo.wantedLevel > 25 && hackers.length > 2) {
      ns.gang.setMemberTask(hackers[2].name, "Ethical Hacking");
    }
    if (gangInfo.wantedLevel > 50 && hackers.length > 3) {
      ns.gang.setMemberTask(hackers[3].name, "Ethical Hacking");
    }
    if (gangInfo.wantedLevel > 75 && hackers.length > 4) {
      ns.gang.setMemberTask(hackers[4].name, "Ethical Hacking");
    }

    await ns.sleep(10000);
  }
}
