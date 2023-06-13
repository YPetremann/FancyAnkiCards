function postProcess(state, delimiters) {
  for (let i = delimiters.length - 1; i >= 0; i--) {
    const startDelim = delimiters[i];
    if (![0x5f, 0x2a].includes(startDelim.marker)) continue;
    if (startDelim.end === -1) continue;
    const endDelim = delimiters[startDelim.end];

    let ch = String.fromCharCode(startDelim.marker);
    let isUnder = ch === "_";
    const isStrong =
      i > 0 &&
      delimiters[i - 1].marker === startDelim.marker &&
      delimiters[i - 1].end === startDelim.end + 1 &&
      delimiters[i - 1].token === startDelim.token - 1 &&
      delimiters[startDelim.end + 1].token === endDelim.token + 1;
    let token = state.tokens[startDelim.token];

    const type = isStrong * 2 + isUnder;
    token.type = ["mark", "em", "strong", "under"][type] + "_open";
    token.tag = ["mark", "em", "strong", "u"][type];
    token.nesting = 1;
    token.markup = isStrong ? ch + ch : ch;
    token.content = "";

    token = state.tokens[endDelim.token];
    token.type = ["mark", "em", "strong", "under"][type] + "_close";
    token.tag = ["mark", "em", "strong", "u"][type];
    token.nesting = -1;
    token.markup = isStrong ? ch + ch : ch;
    token.content = "";

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = "";
      state.tokens[delimiters[startDelim.end + 1].token].content = "";
      i--;
    }
  }
}
function emphasis(state) {
  let curr;
  let tokens_meta = state.tokens_meta;
  let max = state.tokens_meta.length;

  postProcess(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
}
export function discordEmphasis(md) {
  md.inline.ruler2.at("emphasis", emphasis);
}
