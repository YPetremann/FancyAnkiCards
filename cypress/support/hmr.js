const LOG_TAG = "[CY-HMR]";
function getUrl() {
  const url = Cypress.config("hmrUrl");
  if (url) return url;
  const baseUrl = Cypress.config("baseUrl");
  if (baseUrl) return baseUrl.replace(/^http(s?)/, "ws$1") + "/";
  throw new Error(
    `${LOG_TAG} Need endpoint to connect to. Add either \`baseUrl\` or \`hmrUrl\` to \`cypress.json\`.`
  );
}

Cypress.on("window:load", (win) => {
  if (!Cypress.config("isInteractive")) return;
  const delay = Cypress.config("hmrRestartDelay") || 500;
  const url = getUrl();
  const socket = new WebSocket(url, "vite-hmr");
  let timeout;
  socket.onopen = () => console.debug(LOG_TAG, "Connected");
  socket.onclose = () => console.debug(LOG_TAG, "Disconnected");
  socket.onmessage = (e) => {
    let event;

    try {
      event = JSON.parse(e.data);
    } catch (err) {
      console.debug(
        LOG_TAG,
        `Failed to parse event data.`,
        `\nError:`,
        err.message,
        `\nData:`,
        e.data
      );
      return;
    }

    switch (event.type) {
      case "full-reload":
        console.clear();
        console.debug(LOG_TAG, `Restarting due to HMR in ${delay}ms...`);
        clickStop();
        clearTimeout(timeout);
        timeout = setTimeout(clickRestart, delay);
        break;
      default:
        console.debug(LOG_TAG, event);
    }
  };
  const clickStop = () => click("stop", "Stopped running tests.");
  const clickRestart = () => click("restart", "Restarted.");
  function click(btnClass, log) {
    const btn = win.top.document.querySelector(`.reporter .${btnClass}`);
    if (!btn) return;
    btn.click();
    console.debug(LOG_TAG, log);
  }
});
