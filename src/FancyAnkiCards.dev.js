function loadScript(url, id) {
  if (id && document.getElementById(id + "_JS")) return;
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    if (id) { script.id = id + "_JS"; }
    script.src = url;
    script.onload = () => {
      console.info(`Succesfully loaded : ${url}`);
      resolve();
    };
    script.onerror = (e) => {
      console.error(`Error while loading : ${url}`);
      script.remove();
      reject(e);
    };
    document.head.appendChild(script);
  });
}
function loadStyle(url, id) {
  if (id && document.getElementById(id + "_CSS")) return;
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    if (id) { link.id = id + "_CSS"; }
    link.rel = 'stylesheet';
    link.type = "text/css";
    link.href = url;
    link.onload = () => {
      console.info(`Succesfully loaded : ${url}}`);
      resolve();
    };
    link.onerror = (e) => {
      console.error(`Error while loading : ${url}}`);
      link.remove();
      reject(e);
    };
    document.head.appendChild(link);
  });
}

(async () => {
  try {
    console.log("Start loading in dev");
    await loadScript("http://127.0.0.1:5500/src/FancyAnkiCards.js", "FAC");
    await loadStyle("http://127.0.0.1:5500/src/FancyAnkiCards.css", "FAC");
    console.log("End loading in dev");
  } catch {
    console.log("Start loading in prod");
    await loadScript("https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.js", "FAC");
    await loadStyle("https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.css", "FAC");
    console.log("End loading in prod");
  }
})();
