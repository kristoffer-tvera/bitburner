import {
  Activities,
  Crimes,
  Sector12UniversityCourses,
  Sector12Gyms,
  Stats,
  SetAllSleevesCrime,
  SetAllSleevesUniveristy,
  SetAllSleevesGym,
} from "/sleeves/base";
/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let result = await ns.prompt("Crime, Research, or Gym?", {
    type: "select",
    choices: Activities,
  });

  switch (result) {
    case Activities[0]: //Crime
      let crime = await ns.prompt("What crime?", {
        type: "select",
        choices: Crimes,
      });
      SetAllSleevesCrime(ns, crime);
      break;
    case Activities[1]: //University
      let course = await ns.prompt("What course?", {
        type: "select",
        choices: Sector12UniversityCourses,
      });
      SetAllSleevesUniveristy(ns, "Rothman University", course);
      break;
    case Activities[2]: //Gym
      let gym = await ns.prompt("What Gym?", {
        type: "select",
        choices: Sector12Gyms,
      });

      let stat = await ns.prompt(`What stat at ${gym}?`, {
        type: "select",
        choices: Stats,
      });
      SetAllSleevesGym(ns, gym, stat);

      break;
  }
}
