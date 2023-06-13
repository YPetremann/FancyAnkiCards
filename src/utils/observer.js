let observerElement;
const observerConfig = { attributes: false, childList: true, subtree: true };
let observer;
export function setup(element, action) {
  observerElement = element;
  observer = new MutationObserver(action);
}
export function resume() {
  observer.observe(observerElement, observerConfig);
}
export function pause() {
  observer.disconnect();
}
