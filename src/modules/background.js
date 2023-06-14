import GeoPattern from "../vendor/geopattern";

export function _50_background() {
  try {
    let page = document.querySelector(".card");
    let breadcrumb = document.querySelector(".breadcrumb");
    var pattern = GeoPattern.generate(breadcrumb.innerHTML);
    page.style = `--image: ${pattern.toDataUrl()}`;
  } catch (e) {
    console.error(e);
  }
}
