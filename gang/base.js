export function GetRandomName() {
  let member =
    "Member-" +
    Math.ceil(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

  return member;
}
