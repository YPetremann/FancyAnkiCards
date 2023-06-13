import { hashCode } from "./hashCode";

export function hashColor(text) {
  return "#" + Math.abs(hashCode(text)).toString(16).slice(0, 6).padEnd(6, "0");
}

export function dark(text) {
  return text
    .replace(/0/gi, "8")
    .replace(/1/gi, "9")
    .replace(/2/gi, "A")
    .replace(/B/gi, "3")
    .replace(/C/gi, "4")
    .replace(/D/gi, "5")
    .replace(/E/gi, "6")
    .replace(/F/gi, "7");
}
export function medium(text) {
  return text
    .replace(/C/g, "4")
    .replace(/D/g, "5")
    .replace(/E/g, "6")
    .replace(/F/g, "7")
    .replace(/0/g, "8")
    .replace(/1/g, "9")
    .replace(/2/g, "A")
    .replace(/3/g, "B");
}
export function pastel(text) {
  return text
    .replace(/0/g, "C")
    .replace(/1/g, "D")
    .replace(/2/g, "E")
    .replace(/3/g, "F")
    .replace(/4/g, "C")
    .replace(/5/g, "D")
    .replace(/6/g, "E")
    .replace(/7/g, "F")
    .replace(/8/g, "C")
    .replace(/9/g, "D")
    .replace(/A/g, "E")
    .replace(/B/g, "F");
}

export function light(text) {
  return text
    .replace(/0/g, "8")
    .replace(/1/g, "9")
    .replace(/2/g, "A")
    .replace(/3/g, "B")
    .replace(/4/g, "C")
    .replace(/5/g, "D")
    .replace(/6/g, "E")
    .replace(/7/g, "F");
}
