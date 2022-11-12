function hashCode(s) {
  return s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}
function hashColor(text) {
  return "#" + Math.abs(hashCode(text)).toString(16).slice(0, 6).padEnd(6, "0")
}
function pastel(text) {
  return text
    .replace(/0/g, "C")
    .replace(/1/g, "D")
    .replace(/2/g, "E")
    .replace(/3/g, "F")
    .replace(/4/g, "C")
    .replace(/5/g, "D")
    .replace(/6/g, "E")
    .replace(/7/g, "F")
    .replace(/8/g, "C")
    .replace(/9/g, "D")
    .replace(/A/g, "E")
    .replace(/B/g, "F")
}
function light(text) {
  return text
    .replace(/0/g, "8")
    .replace(/1/g, "9")
    .replace(/2/g, "A")
    .replace(/3/g, "B")
    .replace(/4/g, "C")
    .replace(/5/g, "D")
    .replace(/6/g, "E")
    .replace(/7/g, "F")
}
function medium(text) {
  return text
    .replace(/C/g, "4")
    .replace(/D/g, "5")
    .replace(/E/g, "6")
    .replace(/F/g, "7")
    .replace(/0/g, "8")
    .replace(/1/g, "9")
    .replace(/2/g, "A")
    .replace(/3/g, "B")
}
function dark(text) {
  return text
    .replace(/0/gi, "8")
    .replace(/1/gi, "9")
    .replace(/2/gi, "A")
    .replace(/B/gi, "3")
    .replace(/C/gi, "4")
    .replace(/D/gi, "5")
    .replace(/E/gi, "6")
    .replace(/F/gi, "7")
}
function breadcrumb() {
  let card = document.querySelector("#qa")
  let breadcrumb = document.querySelector(".breadcrumb")
  if (!breadcrumb) return
  breadcrumb.innerHTML = breadcrumb.innerHTML.split("::").join(" :: ")
  card.style = `
    --deck-medium:${medium(hashColor(breadcrumb.innerHTML))};
  `
  background()
}
function background() {
  try {
    let page = document.querySelector(".card")
    let breadcrumb = document.querySelector(".breadcrumb")
    var pattern = GeoPattern.generate(breadcrumb.innerHTML)
    page.style = `--image: ${pattern.toDataUrl()}`
  } catch (e) {
    if (e instanceof ReferenceError) window.requestAnimationFrame(background)
  }
}
function tags() {
  let tags = document.querySelector(".tags")
  if (tags.classList.contains("tagged")) return
  if (!tags) return
  tags.innerHTML = tags.innerHTML
    .split(" ")
    .filter((e) => e !== "")
    .map(
      (text) => `<li style="--tagcolor:${medium(hashColor(text))}">${text}</li>`
    )
    .join("")
  tags.classList.add("tagged")
}
function markdownize(node) {
  if (!node) return
  const content = node.innerHTML
    .replace(/style="zoom: 1;"/gi, "")
    .replace(/<[\/]?div\s*>/gi, "\n")
    .replace(/<br\s*[\/]?>/gi, "\n")

  var decoded = new DOMParser().parseFromString(
    "<!doctype html><body>" + content,
    "text/html"
  ).body.textContent

  node.innerHTML = window.FAC.md.render(decoded)
}

/////
/////
/////

let module = { exports: {} }

module.exports.tokenize = function emphasis(state, silent) {
  var i,
    scanned,
    token,
    start = state.pos,
    marker = state.src.charCodeAt(start)

  if (silent) {
    return false
  }

  if (marker !== 0x5f /* _ */ && marker !== 0x2a /* * */) {
    return false
  }

  scanned = state.scanDelims(state.pos, marker === 0x2a)

  for (i = 0; i < scanned.length; i++) {
    token = state.push("text", "", 0)
    token.content = String.fromCharCode(marker)

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close,
    })
  }

  state.pos += scanned.length

  return true
}
function postProcess(state, delimiters) {
  var i,
    startDelim,
    endDelim,
    token,
    ch,
    isStrong,
    max = delimiters.length

  for (i = max - 1; i >= 0; i--) {
    startDelim = delimiters[i]

    if (
      startDelim.marker !== 0x5f /* _ */ &&
      startDelim.marker !== 0x2a /* * */
    ) {
      continue
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue
    }

    endDelim = delimiters[startDelim.end]

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    isStrong =
      i > 0 &&
      delimiters[i - 1].end === startDelim.end + 1 &&
      // check that first two markers match and adjacent
      delimiters[i - 1].marker === startDelim.marker &&
      delimiters[i - 1].token === startDelim.token - 1 &&
      // check that last two markers are adjacent (we can safely assume they match)
      delimiters[startDelim.end + 1].token === endDelim.token + 1

    ch = String.fromCharCode(startDelim.marker)
    console.log(ch)
    let isUnder = ch === "_"
    token = state.tokens[startDelim.token]
    token.type = isStrong
      ? isUnder
        ? "under_open"
        : "strong_open"
      : isUnder
      ? "em_open"
      : "mark_open"
    token.tag = isStrong ? (isUnder ? "u" : "strong") : isUnder ? "em" : "mark"
    token.nesting = 1
    token.markup = isStrong ? ch + ch : ch
    token.content = ""

    token = state.tokens[endDelim.token]
    token.type = isStrong
      ? isUnder
        ? "under_close"
        : "strong_close"
      : isUnder
      ? "em_close"
      : "mark_close"
    token.tag = isStrong ? (isUnder ? "u" : "strong") : isUnder ? "em" : "mark"
    token.nesting = -1
    token.markup = isStrong ? ch + ch : ch
    token.content = ""

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = ""
      state.tokens[delimiters[startDelim.end + 1].token].content = ""
      i--
    }
  }
}
module.exports.postProcess = function emphasis(state) {
  var curr
  var tokens_meta = state.tokens_meta
  var max = state.tokens_meta.length

  postProcess(state, state.delimiters)

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters)
    }
  }
}
function discordEmphasis(md) {
  md.inline.ruler2.at("emphasis", module.exports.postProcess)
}
/////
/////
/////

async function load() {
  await Promise.all([
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js"
    ),
    loadScript(
      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/highlight.min.js"
    ),
    //loadStyle("https://cdn.jsdelivr.net/npm/highlight.js@11.4.0/styles/default.css"),
    loadStyle(
      "https://cdn.jsdelivr.net/npm/highlight.js@11.4.0/styles/a11y-dark.css"
    ),
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"
    ),
  ])

  window.FAC.md = window
    .markdownit({
      html: true,
      xhtmlOut: true,
      breaks: false,
      linkify: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang))
          try {
            return hljs.highlight(str, { language: lang }).value
          } catch (__) {}
        return "" // use external default escaping
      },
    })
    .use(discordEmphasis)
}

const qa = document.getElementById("qa")
const config = { attributes: false, childList: true, subtree: true }
const observer = new MutationObserver((mutationsList, observer) => redraw())

function redraw() {
  observer.disconnect()
  markdownize(document.querySelector("header"))
  markdownize(document.querySelector("footer"))
  breadcrumb()
  tags()
  observer.observe(qa, config)
}

// Later, you can stop observing

async function main() {
  if (!window.FAC) {
    window.FAC = {}
    await load()
  }
  redraw()
}
main()
