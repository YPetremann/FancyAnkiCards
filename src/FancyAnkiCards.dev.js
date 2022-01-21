function loadScript(url, id) {
  if (id && document.getElementById(id + "_JS")) return;
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    if (id) { script.id = id + "_JS"; }
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
function loadStyle(url, id) {
  if (id && document.getElementById(id + "_CSS")) return;
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    if (id) { script.id = id + "_CSS"; }
    link.rel = 'stylesheet';
    link.type = "text/css";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

async function main() {
  try {
    await loadScript("http://127.0.0.1:5500/src/FancyAnkiCards.js", "FAC");
    await loadStyle("http://127.0.0.1:5500/src/FancyAnkiCards.css", "FAC");
  } catch {
    await loadScript("https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.js", "FAC");
    await loadStyle("https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.css", "FAC");
  }
}

main();
