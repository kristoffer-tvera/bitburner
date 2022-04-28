/** @param {NS} ns **/
export async function main(ns) {
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
    ns.disableLog("ALL");
    while (ns.gang.canRecruitMember()) {
      let member = "Member-" + ns.gang.getMemberNames().length;
      ns.gang.recruitMember(member);
      ns.gang.setMemberTask(member, initialTask);
    }

    let gangMembers = ns.gang.getMemberNames();
    let bestHacker = { hack: 0 };
    let hackers = [];
    for (let i = 0; i < gangMembers.length; i++) {
      let member = gangMembers[i];
      let info = ns.gang.getMemberInformation(member);

      if (info.hack > bestHacker.hack) {
        bestHacker = info;
      }

      hackers.push(info);

      ns.print(
        `Gang Member '${member}' (str: ${info.str}, chr: ${info.cha}, hack: ${
          info.hack
        }, hack-mult: ${info.hack_asc_mult}, hack-exp: ${
          info.hack_exp
        }) will ascend on ${4000 * info.hack_asc_mult} exp`
      );

      if (info.hack_exp > 4000 * info.hack_asc_mult) {
        ns.gang.ascendMember(member);
        ns.gang.setMemberTask(member, initialTask);

        if (info.hack_asc_mult > 5) {
          //   while (
          //     ns.gang.getEquipmentCost(defaultEquipment[0]) > ns.getPlayer().money
          //   ) {
          //     await ns.sleep(500);
          //   }
          if (
            ns.gang.getEquipmentCost(defaultEquipment[0]) > ns.getPlayer().money
          ) {
            ns.gang.purchaseEquipment(member, defaultEquipment[0]);
          }
        }

        if (info.hack_asc_mult > 10) {
          //   while (
          //     ns.gang.getEquipmentCost(defaultEquipment[1]) > ns.getPlayer().money
          //   ) {
          //     await ns.sleep(500);
          //   }
          if (
            ns.gang.getEquipmentCost(defaultEquipment[1]) > ns.getPlayer().money
          ) {
            ns.gang.purchaseEquipment(member, defaultEquipment[1]);
          }
        }

        if (info.hack_asc_mult > 15) {
          //   while (
          //     ns.gang.getEquipmentCost(defaultEquipment[2]) > ns.getPlayer().money
          //   ) {
          //     await ns.sleep(500);
          //   }
          if (
            ns.gang.getEquipmentCost(defaultEquipment[2]) > ns.getPlayer().money
          ) {
            ns.gang.purchaseEquipment(member, defaultEquipment[2]);
          }
        }

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

      if (info.hack < 15000) {
        ns.gang.setMemberTask(member, "Cyberterrorism");
        continue;
      }

      ns.gang.setMemberTask(member, "Money Laundering");
    }

    hackers = hackers.sort((a, b) => {
      return b.hack - a.hack;
    });

    let gangInfo = ns.gang.getGangInformation();
    // if (bestHacker.hack > 0 && gangInfo.wantedLevel > 50) {
    //   ns.gang.setMemberTask(bestHacker.name, "Ethical Hacking");
    // }

    if (hackers[0].hack > 0 && gangInfo.wantedLevel > 50) {
      ns.gang.setMemberTask(hackers[0].name, "Ethical Hacking");
      ns.print("Using " + hackers[0].name + " to decrease wanted level");
    }
    if (hackers[1].hack > 0 && gangInfo.wantedLevel > 100) {
      ns.gang.setMemberTask(hackers[1].name, "Ethical Hacking");
      ns.print("Using " + hackers[1].name + " to decrease wanted level");
    }

    await ns.sleep(1000);
  }
}
