import { setup } from "./utils/observer";
const modules = import.meta.glob(["./modules/{*,*/index}.js"], { eager: true });
const transformers = sort(Object.assign({}, ...Object.values(modules)));
function sort(unordered) {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}

import "./index.css";

function redraw() {
  Object.values(transformers).forEach((v) => v());
}
setup(document.getElementById("qa"), redraw);
redraw();
