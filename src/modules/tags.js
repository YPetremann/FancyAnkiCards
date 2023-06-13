import { pastel, hashColor } from "../utils/color";

export function _50_tags() {
  let tags = document.querySelector(".tags");
  if (tags.classList.contains("tagged")) return;
  if (!tags) return;
  tags.innerHTML = tags.innerHTML
    .split(" ")
    .filter((e) => e !== "")
    .map(
      (text) => `<li style="--tagcolor:${pastel(hashColor(text))}">${text}</li>`
    )
    .join("");
  tags.classList.add("tagged");
}
