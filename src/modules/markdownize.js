import { md } from "../utils/md";
import "./markdownize.css";
function transform(node) {
  if (!node) return;
  const content = node.innerHTML
    .replace(/style="zoom: 1;"/gi, "")
    .replace(/<[\/]?div\s*>/gi, "\n")
    .replace(/<br\s*[\/]?>/gi, "\n");
  var decoded = new DOMParser().parseFromString(
    "<!doctype html><body>" + content,
    "text/html"
  ).body.textContent;
  const encoded = md.render(decoded);
  node.innerHTML = encoded;
}

export function _50_markdownize() {
  transform(document.querySelector("header"));
  transform(document.querySelector("footer"));
}
