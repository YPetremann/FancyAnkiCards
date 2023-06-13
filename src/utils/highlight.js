import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";

export function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang))
    try {
      return hljs.highlight(str, { language: lang }).value;
    } catch (__) {}
  return "";
}
