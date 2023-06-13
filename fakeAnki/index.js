import { replaceHTML } from "./replaceHtml";
import deck from "/deck.yaml";
import front from "/front.html?raw";
import back from "/back.html?raw";
import style from "/style.css?raw";

//const deck = await fetch("/deck.json").then((r) => r.json());
//const front = await fetch("/front.html").then((r) => r.text());
//const back = await fetch("/back.html").then((r) => r.text());
//const style = await fetch("/style.css").then((r) => r.text());

const studyButton = document.querySelector("#studybut");
const answerButton = document.querySelector("#ansbuta");
const easeButtons = document.querySelectorAll("#easebuts .btn");
const qa_box = document.querySelector("#qa_box");

const modes = [
  document.getElementById("study"),
  document.getElementById("ansbut"),
  document.getElementById("easebuts"),
];

studyButton.disabled = false;
let index = -1;
nextQuestion();

/*
console.group("data");
console.log("%cfront:%c\n%s", "font-weight:bold", "", front);
console.log("%cback:%c\n%s", "font-weight:bold", "", back);
console.log(
  "%cdeck:%c\n%s",
  "font-weight:bold",
  "",
  JSON.stringify(deck, null, 2)
);
console.log("%cstyle:%c\n%s", "font-weight:bold", "", style);
console.groupEnd();
*/

function switchMode(mode) {
  modes.forEach((mode) => mode.classList.add("d-none"));
  if (mode === "landing") modes[0].classList.remove("d-none");
  if (mode === "front") modes[1].classList.remove("d-none");
  if (mode === "back") modes[2].classList.remove("d-none");
}

async function nextQuestion() {
  index++;
  if (deck[index]) showQuestion();
  else showEnd();
}
/**
 * @param {string} template
 * @param {[string,string][]} fields
 */
function render(template, fields) {
  return fields.reduce(
    (tpl, [name, value]) => tpl.replaceAll(`{{${name}}}`, value),
    template
  );
  return template;
}
function showQuestion() {
  // console.table(deck[index]);
  const fields = Object.entries(deck[index]);
  const qa = document.getElementById("qa");
  replaceHTML(qa, `<style>${style}</style>${render(front, fields)}`);
  switchMode("front");
}
function showAnswer() {
  console.log(`back ${index}`);
  const fields = Object.entries(deck[index]);
  fields.unshift(["FrontSide", front]);
  const qa = document.getElementById("qa");
  replaceHTML(qa, `<style>${style}</style>${render(back, fields)}`);
  switchMode("back");
}
function showEnd() {
  qa_box.innerHTML = "<h1>End of Deck</h1>";
  switchMode("none");
}

studyButton.addEventListener("click", nextQuestion);
answerButton.addEventListener("click", showAnswer);
easeButtons.forEach((btn) => btn.addEventListener("click", nextQuestion));
