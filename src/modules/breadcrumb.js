import { hashColor, pastel } from "../utils/color";

export function _50_breadcrumb() {
  let card = document.querySelector("#qa");
  let breadcrumb = document.querySelector("#qa .breadcrumb");
  if (!breadcrumb) return;
  breadcrumb.innerHTML = breadcrumb.innerHTML.split("::").join(" :: ");
  card.style = `--deckcolor:${pastel(hashColor(breadcrumb.innerHTML))};`;
  console.log("breadcrumb installed");
}
