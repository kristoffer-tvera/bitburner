/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  let gym = "Powerhouse Gym";
  let university = "Rothman University";

  ns.sleeve.setToCommitCrime(0, "Mug");
  ns.sleeve.setToCommitCrime(1, "Mug");

  ns.sleeve.setToUniversityCourse(2, university, "Algorithms");
  ns.sleeve.setToUniversityCourse(3, university, "Leadership");

  ns.sleeve.setToGymWorkout(4, gym, "Strength");
  ns.sleeve.setToGymWorkout(5, gym, "Defense");
  ns.sleeve.setToGymWorkout(6, gym, "Dexterity");
  ns.sleeve.setToGymWorkout(7, gym, "Agility");

  let hasMoreHashes = true;
  while (hasMoreHashes) {
    hasMoreHashes =
      ns.hacknet.spendHashes("Improve Studying") &&
      ns.hacknet.spendHashes("Improve Gym Training");
  }
}
