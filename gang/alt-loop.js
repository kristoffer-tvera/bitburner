/** @param {NS} ns **/
export async function main(ns) {
  let initialTask = "Train Combat";

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
    let bestHacker = { str: 0 };
    let hackers = [];
    for (let i = 0; i < gangMembers.length; i++) {
      let member = gangMembers[i];
      let info = ns.gang.getMemberInformation(member);

      if (info.str > bestHacker.str) {
        bestHacker = info;
      }

      hackers.push(info);

      // let ascendTreshhold = 60 * info.str_asc_mult * info.str_asc_mult;
      let ascendTreshhold = 80 * info.str_asc_mult;

      ns.print(
        `Gang Member '${member}' (str: ${info.str}, str_exp: ${info.str_exp}, will ascend on ${ascendTreshhold} str`
      );

      if (info.str > ascendTreshhold) {
        ns.gang.ascendMember(member);
        ns.gang.setMemberTask(member, initialTask);
        continue;
      }

      if (info.str < 80) {
        ns.gang.setMemberTask(member, initialTask);
        continue;
      }

      if (info.str < 100) {
        ns.gang.setMemberTask(member, "Mug People");
        continue;
      }

      if (info.str < 200) {
        ns.gang.setMemberTask(member, "Strongarm Civilians");
        continue;
      }

      if (info.str < 300) {
        ns.gang.setMemberTask(member, "Run a Con");
        continue;
      }

      if (info.str < 400) {
        ns.gang.setMemberTask(member, "Armed Robbery");
        continue;
      }

      if (info.str < 500) {
        ns.gang.setMemberTask(member, "Traffick Illegal Arms");
        continue;
      }

      if (info.str < 600) {
        ns.gang.setMemberTask(member, "Threaten & Blackmail");
        continue;
      }

      if (info.str < 700) {
        ns.gang.setMemberTask(member, "Human Trafficking");
        continue;
      }

      if (info.str < 2500) {
        ns.gang.setMemberTask(member, "Terrorism");
        continue;
      }

      ns.gang.setMemberTask(member, "Human Trafficking");
    }

    hackers = hackers.sort((a, b) => {
      return b.str - a.str;
    });

    let gangInfo = ns.gang.getGangInformation();

    if (hackers[0].hack > 0 && gangInfo.wantedLevel > 2) {
      ns.gang.setMemberTask(hackers[0].name, "Vigilante Justice");
      ns.print("Using " + hackers[0].name + " to decrease wanted level");
    }
    if (hackers[1].hack > 0 && gangInfo.wantedLevel > 50) {
      ns.gang.setMemberTask(hackers[1].name, "Vigilante Justice");
      ns.print("Using " + hackers[1].name + " to decrease wanted level");
    }

    await ns.sleep(1000);
  }
}
