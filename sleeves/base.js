export const Activities = ["Crime", "University", "Gym"];
export const Crimes = [
  "Shoplift",
  "Rob Store",
  "Mug",
  "Larceny",
  "Deal Drugs",
  "Bond Forgery",
  "Traffick Arms",
  "Homicide",
  "Grand Theft Auto",
  "Kidnap",
  "Assassination",
  "Heis",
];
export const Sector12UniversityCourses = [
  "Study Computer Science",
  "Data Structures",
  "Networks",
  "Algorithms",
  "Management",
  "Leadership",
];

export const Sector12Gyms = ["Iron Gym", "Powerhouse Gym"];
export const Stats = ["Strength", "Defense", "Dexterity", "Agility"];

/** @param {NS} ns **/
/** @param {string} crime **/
export function SetAllSleevesCrime(ns, crime) {
  for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
    ns.print(`Sleeve ${i} will do "${crime}" `);
    ns.sleeve.setToCommitCrime(i, crime);
  }
}

/** @param {NS} ns **/
/** @param {string} university **/
/** @param {string} course **/
export function SetAllSleevesUniveristy(ns, university, course) {
  for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
    ns.print(`Sleeve ${i} will do "${course}" at "${university}"`);
    ns.sleeve.setToUniversityCourse(i, university, course);
  }
}

/** @param {NS} ns **/
/** @param {string} gym **/
/** @param {string} stat **/
export function SetAllSleevesGym(ns, gym, stat) {
  for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
    ns.print(`Sleeve ${i} will train "${stat}" at "${gym}"`);
    ns.sleeve.setToGymWorkout(i, gym, stat);
  }
}
