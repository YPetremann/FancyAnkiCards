//import hljs from "highlight.js";
import "./md.css";
import MarkdownIt from "markdown-it";
import { discordEmphasis } from "./discordEmphasis";
import { radioCheckbox } from "./radioCheckbox";
import { highlight } from "./highlight";

export let md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  highlight,
})
  .use(discordEmphasis)
  .use(radioCheckbox, { enabled: true });
