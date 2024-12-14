import GeoPattern from "../vendor/geopattern";

export function _50_background() {
    let page = document.querySelector("#qa").parentElement;
    let breadcrumb = document.querySelector(".breadcrumb");
    var pattern = GeoPattern.generate(breadcrumb.innerHTML);
    page.style = `--image: ${pattern.toDataUrl()}`;
    page.classList.add("--module-background");
    console.log("background installed");
}
