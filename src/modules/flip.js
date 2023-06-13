import "./flip.css";
let page = document.querySelector(".card");
let card = document.getElementById("qa");
let shadow = document.createElement("div");
shadow.id = "shadow";
card.after(shadow);
function cloneFlip() {
  console.log("clone");
  const shadow = document.getElementById("shadow");
  const cardClone = card.cloneNode(true);
  cardClone.id = "shadow";
  cardClone.classList.add("hidden");
  shadow.parentElement.replaceChild(cardClone, shadow);
}
export function _70_flip() {
  console.log(page.className);
  const shadow = document.getElementById("shadow");
  shadow.classList.remove("hidden");
  if (!page.classList.contains("front")) {
    page.classList.remove("back");
    page.classList.add("front");
  } else if (!page.classList.contains("back")) {
    page.classList.add("back");
    page.classList.remove("front");
  }
  card.addEventListener("animationend", cloneFlip, { once: true });
}
