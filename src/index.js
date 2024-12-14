import { setup } from "./utils/observer";
import "./index.css";
const modules = import.meta.glob(["./modules/{*,*/index}.js"], { eager: true });
const transformers = Object.entries(Object.assign({}, ...Object.values(modules)))
  .map(([name,fn])=>({name,fn}))
  .sort((a, b) => a.name.localeCompare(b.name));

function redraw() {
  console.log("redraw");
  transformers.forEach(({name,fn}) => {
    console.group("module", name);
    try{
      fn()
    } catch (e) {
      console.error(e);
    }finally{
      console.groupEnd();
    }
  });
}
setup(document.getElementById("qa"), redraw);
redraw();
