import Jt from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
function Yt(t) {
  t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, n, s, a) {
    return n + n + s + s + a + a;
  });
  var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
}
function Ce(t) {
  return "rgb(" + [t.r, t.g, t.b].join(",") + ")";
}
function Kt() {
  var t = 1732584193, r = 4023233417, e = 2562383102, n = 271733878, s = 3285377520, a = new Uint32Array(80), o = 0, i = 24, c = 0;
  function u() {
    for (var h = 16; h < 80; h++) {
      var d = a[h - 3] ^ a[h - 8] ^ a[h - 14] ^ a[h - 16];
      a[h] = d << 1 | d >>> 31;
    }
    var g, f, _ = t, m = r, k = e, v = n, C = s;
    for (h = 0; h < 80; h++) {
      h < 20 ? (g = v ^ m & (k ^ v), f = 1518500249) : h < 40 ? (g = m ^ k ^ v, f = 1859775393) : h < 60 ? (g = m & k | v & (m | k), f = 2400959708) : (g = m ^ k ^ v, f = 3395469782);
      var b = (_ << 5 | _ >>> 27) + g + C + f + (0 | a[h]);
      C = v, v = k, k = m << 30 | m >>> 2, m = _, _ = b;
    }
    for (t = t + _ | 0, r = r + m | 0, e = e + k | 0, n = n + v | 0, s = s + C | 0, o = 0, h = 0; h < 16; h++)
      a[h] = 0;
  }
  function l(h) {
    a[o] |= (255 & h) << i, i ? i -= 8 : (o++, i = 24), o === 16 && u();
  }
  function p(h) {
    for (var d = "", g = 28; g >= 0; g -= 4)
      d += (h >> g & 15).toString(16);
    return d;
  }
  return { update: function(h) {
    if (typeof h == "string")
      return function(f) {
        var _ = f.length;
        c += 8 * _;
        for (var m = 0; m < _; m++)
          l(f.charCodeAt(m));
      }(h);
    var d = h.length;
    c += 8 * d;
    for (var g = 0; g < d; g++)
      l(h[g]);
  }, digest: function() {
    l(128), (o > 14 || o === 14 && i < 24) && u(), o = 14, i = 24, l(0), l(0), l(c > 1099511627775 ? c / 1099511627776 : 0), l(c > 4294967295 ? c / 4294967296 : 0);
    for (var h = 24; h >= 0; h -= 8)
      l(c >> h);
    return p(t) + p(r) + p(e) + p(n) + p(s);
  } };
}
class P {
  constructor(r) {
    return this instanceof P ? (this.tagName = r, this.attributes = /* @__PURE__ */ Object.create(null), this.children = [], this.lastChild = null, this) : new P(r);
  }
  appendChild(r) {
    return this.children.push(r), this.lastChild = r, this;
  }
  setAttribute(r, e) {
    return this.attributes[r] = e, this;
  }
  toString() {
    var r = this;
    return ["<", r.tagName, Object.keys(r.attributes).map(function(e) {
      return [" ", e, '="', r.attributes[e], '"'].join("");
    }).join(""), ">", r.children.map(function(e) {
      return e.toString();
    }).join(""), "</", r.tagName, ">"].join("");
  }
}
class xe {
  constructor() {
    return this.width = 100, this.height = 100, this.svg = new P("svg"), this.context = [], this.setAttributes(this.svg, { xmlns: "http://www.w3.org/2000/svg", width: this.width, height: this.height }), this;
  }
  currentContext() {
    return this.context[this.context.length - 1] || this.svg;
  }
  end() {
    return this.context.pop(), this;
  }
  currentNode() {
    var r = this.currentContext();
    return r.lastChild || r;
  }
  transform(r) {
    return this.currentNode().setAttribute("transform", Object.keys(r).map(function(e) {
      return e + "(" + r[e].join(",") + ")";
    }).join(" ")), this;
  }
  setAttributes(r, e) {
    Object.keys(e).forEach(function(n) {
      r.setAttribute(n, e[n]);
    });
  }
  setWidth(r) {
    this.svg.setAttribute("width", Math.floor(r));
  }
  setHeight(r) {
    this.svg.setAttribute("height", Math.floor(r));
  }
  toString() {
    return this.svg.toString();
  }
  rect(r, e, n, s, a) {
    var o = this;
    if (Array.isArray(r))
      return r.forEach(function(c) {
        o.rect.apply(o, c.concat(a));
      }), this;
    var i = new P("rect");
    return this.currentContext().appendChild(i), this.setAttributes(i, Object.assign({ x: r, y: e, width: n, height: s }, a)), this;
  }
  circle(r, e, n, s) {
    var a = new P("circle");
    return this.currentContext().appendChild(a), this.setAttributes(a, Object.assign({ cx: r, cy: e, r: n }, s)), this;
  }
  path(r, e) {
    var n = new P("path");
    return this.currentContext().appendChild(n), this.setAttributes(n, Object.assign({ d: r }, e)), this;
  }
  polyline(r, e) {
    var n = this;
    if (Array.isArray(r))
      return r.forEach(function(a) {
        n.polyline(a, e);
      }), this;
    var s = new P("polyline");
    return this.currentContext().appendChild(s), this.setAttributes(s, Object.assign({ points: r }, e)), this;
  }
  group(r) {
    var e = new P("g");
    return this.currentContext().appendChild(e), this.context.push(e), this.setAttributes(e, Object.assign({}, r)), this;
  }
}
var Ae = { baseColor: "#933c3c" }, Qt = ["octogons", "overlappingCircles", "plusSigns", "xes", "sineWaves", "hexagons", "overlappingRings", "plaid", "triangles", "squares", "concentricCircles", "diamonds", "tessellation", "nestedSquares", "mosaicSquares", "chevrons"], we = "#222", De = "#ddd", M = "#000", I = 0.02, Ee = 0.02, qe = 0.15;
function y(t, r, e) {
  return parseInt(t.substr(r, e || 1), 16);
}
function D(t, r, e, n, s) {
  return (parseFloat(t) - r) * (s - n) / (e - r) + n;
}
function E(t) {
  return t % 2 == 0 ? De : we;
}
function q(t) {
  return D(t, 0, 15, Ee, qe);
}
class Se {
  constructor(r, e) {
    return this.opts = Object.assign({}, Ae, e), this.hash = e.hash || function(n) {
      if (n === void 0)
        return Kt();
      var s = Kt();
      return s.update(n), s.digest();
    }(r), this.svg = new xe(), this.generateBackground(), this.generatePattern(), this;
  }
  toSvg() {
    return this.svg.toString();
  }
  toString() {
    return this.toSvg();
  }
  toBase64() {
    var r = this.toSvg();
    return typeof window < "u" && typeof window.btoa == "function" ? window.btoa(r) : new Buffer(r).toString("base64");
  }
  toDataUri() {
    return "data:image/svg+xml;base64," + this.toBase64();
  }
  toDataUrl() {
    return 'url("' + this.toDataUri() + '")';
  }
  generateBackground() {
    var r, e, n, s;
    this.opts.color ? n = Yt(this.opts.color) : (e = D(y(this.hash, 14, 3), 0, 4095, 0, 359), s = y(this.hash, 17), r = function(a) {
      var o = a.r, i = a.g, c = a.b;
      o /= 255, i /= 255, c /= 255;
      var u, l, p = Math.max(o, i, c), h = Math.min(o, i, c), d = (p + h) / 2;
      if (p === h)
        u = l = 0;
      else {
        var g = p - h;
        switch (l = d > 0.5 ? g / (2 - p - h) : g / (p + h), p) {
          case o:
            u = (i - c) / g + (i < c ? 6 : 0);
            break;
          case i:
            u = (c - o) / g + 2;
            break;
          case c:
            u = (o - i) / g + 4;
        }
        u /= 6;
      }
      return { h: u, s: l, l: d };
    }(Yt(this.opts.baseColor)), r.h = (360 * r.h - e + 360) % 360 / 360, r.s = s % 2 == 0 ? Math.min(1, (100 * r.s + s) / 100) : Math.max(0, (100 * r.s - s) / 100), n = function(a) {
      function o(f, _, m) {
        return m < 0 && (m += 1), m > 1 && (m -= 1), m < 1 / 6 ? f + 6 * (_ - f) * m : m < 0.5 ? _ : m < 2 / 3 ? f + (_ - f) * (2 / 3 - m) * 6 : f;
      }
      var i, c, u, l = a.h, p = a.s, h = a.l;
      if (p === 0)
        i = c = u = h;
      else {
        var d = h < 0.5 ? h * (1 + p) : h + p - h * p, g = 2 * h - d;
        i = o(g, d, l + 1 / 3), c = o(g, d, l), u = o(g, d, l - 1 / 3);
      }
      return { r: Math.round(255 * i), g: Math.round(255 * c), b: Math.round(255 * u) };
    }(r)), this.color = function(a) {
      return "#" + ["r", "g", "b"].map(function(o) {
        return ("0" + a[o].toString(16)).slice(-2);
      }).join("");
    }(n), this.svg.rect(0, 0, "100%", "100%", { fill: Ce(n) });
  }
  generatePattern() {
    var r = this.opts.generator;
    if (r) {
      if (Qt.indexOf(r) < 0)
        throw new Error("The generator " + r + " does not exist.");
    } else
      r = Qt[y(this.hash, 20)];
    return this["geo" + r.slice(0, 1).toUpperCase() + r.slice(1)]();
  }
  geoHexagons() {
    var r, e, n, s, a, o, i, c = D(y(this.hash, 0), 0, 15, 8, 60), u = c * Math.sqrt(3), l = 2 * c, p = function(h) {
      var d = h, g = d / 2, f = Math.sin(60 * Math.PI / 180) * d;
      return [0, f, g, 0, g + d, 0, 2 * d, f, g + d, 2 * f, g, 2 * f, 0, f].join(",");
    }(c);
    for (this.svg.setWidth(3 * l + 3 * c), this.svg.setHeight(6 * u), e = 0, i = 0; i < 6; i++)
      for (o = 0; o < 6; o++)
        r = o % 2 == 0 ? i * u : i * u + u / 2, n = q(a = y(this.hash, e)), s = { fill: E(a), "fill-opacity": n, stroke: M, "stroke-opacity": I }, this.svg.polyline(p, s).transform({ translate: [o * c * 1.5 - l / 2, r - u / 2] }), o === 0 && this.svg.polyline(p, s).transform({ translate: [6 * c * 1.5 - l / 2, r - u / 2] }), i === 0 && (r = o % 2 == 0 ? 6 * u : 6 * u + u / 2, this.svg.polyline(p, s).transform({ translate: [o * c * 1.5 - l / 2, r - u / 2] })), o === 0 && i === 0 && this.svg.polyline(p, s).transform({ translate: [6 * c * 1.5 - l / 2, 5 * u + u / 2] }), e++;
  }
  geoSineWaves() {
    var r, e, n, s, a, o, i = Math.floor(D(y(this.hash, 0), 0, 15, 100, 400)), c = Math.floor(D(y(this.hash, 1), 0, 15, 30, 100)), u = Math.floor(D(y(this.hash, 2), 0, 15, 3, 30));
    for (this.svg.setWidth(i), this.svg.setHeight(36 * u), r = 0; r < 36; r++)
      e = q(a = y(this.hash, r)), s = { fill: "none", stroke: E(a), opacity: e, "stroke-width": u + "px" }, n = "M0 " + c + " C " + (o = i / 4 * 0.7) + " 0, " + (i / 2 - o) + " 0, " + i / 2 + " " + c + " S " + (i - o) + " " + 2 * c + ", " + i + " " + c + " S " + (1.5 * i - o) + " 0, " + 1.5 * i + ", " + c, this.svg.path(n, s).transform({ translate: [-i / 4, u * r - 1.5 * c] }), this.svg.path(n, s).transform({ translate: [-i / 4, u * r - 1.5 * c + 36 * u] });
  }
  geoChevrons() {
    var r, e, n, s, a, o, i, c, u, l, p = D(y(this.hash, 0), 0, 15, 30, 80), h = D(y(this.hash, 0), 0, 15, 30, 80), d = [[0, 0, (r = p) / 2, (e = h) - (n = 0.66 * e), r / 2, e, 0, n, 0, 0], [r / 2, e - n, r, 0, r, n, r / 2, e, r / 2, e - n]].map(function(g) {
      return g.join(",");
    });
    for (this.svg.setWidth(6 * p), this.svg.setHeight(6 * h * 0.66), a = 0, l = 0; l < 6; l++)
      for (u = 0; u < 6; u++)
        o = q(c = y(this.hash, a)), s = E(c), i = { stroke: M, "stroke-opacity": I, fill: s, "fill-opacity": o, "stroke-width": 1 }, this.svg.group(i).transform({ translate: [u * p, l * h * 0.66 - h / 2] }).polyline(d).end(), l === 0 && this.svg.group(i).transform({ translate: [u * p, 6 * h * 0.66 - h / 2] }).polyline(d).end(), a += 1;
  }
  geoPlusSigns() {
    var r, e, n, s, a, o, i, c = D(y(this.hash, 0), 0, 15, 10, 25), u = 3 * c, l = Xt(c);
    for (this.svg.setWidth(12 * c), this.svg.setHeight(12 * c), e = 0, i = 0; i < 6; i++)
      for (o = 0; o < 6; o++)
        n = q(a = y(this.hash, e)), r = i % 2 == 0 ? 0 : 1, s = { fill: E(a), stroke: M, "stroke-opacity": I, "fill-opacity": n }, this.svg.group(s).transform({ translate: [o * u - o * c + r * c - c, i * u - i * c - u / 2] }).rect(l).end(), o === 0 && this.svg.group(s).transform({ translate: [4 * u - o * c + r * c - c, i * u - i * c - u / 2] }).rect(l).end(), i === 0 && this.svg.group(s).transform({ translate: [o * u - o * c + r * c - c, 4 * u - i * c - u / 2] }).rect(l).end(), o === 0 && i === 0 && this.svg.group(s).transform({ translate: [4 * u - o * c + r * c - c, 4 * u - i * c - u / 2] }).rect(l).end(), e++;
  }
  geoXes() {
    var r, e, n, s, a, o, i, c = D(y(this.hash, 0), 0, 15, 10, 25), u = Xt(c), l = 3 * c * 0.943;
    for (this.svg.setWidth(3 * l), this.svg.setHeight(3 * l), e = 0, i = 0; i < 6; i++)
      for (o = 0; o < 6; o++)
        n = q(a = y(this.hash, e)), r = o % 2 == 0 ? i * l - 0.5 * l : i * l - 0.5 * l + l / 4, s = { fill: E(a), opacity: n }, this.svg.group(s).transform({ translate: [o * l / 2 - l / 2, r - i * l / 2], rotate: [45, l / 2, l / 2] }).rect(u).end(), o === 0 && this.svg.group(s).transform({ translate: [6 * l / 2 - l / 2, r - i * l / 2], rotate: [45, l / 2, l / 2] }).rect(u).end(), i === 0 && (r = o % 2 == 0 ? 6 * l - l / 2 : 6 * l - l / 2 + l / 4, this.svg.group(s).transform({ translate: [o * l / 2 - l / 2, r - 6 * l / 2], rotate: [45, l / 2, l / 2] }).rect(u).end()), i === 5 && this.svg.group(s).transform({ translate: [o * l / 2 - l / 2, r - 11 * l / 2], rotate: [45, l / 2, l / 2] }).rect(u).end(), o === 0 && i === 0 && this.svg.group(s).transform({ translate: [6 * l / 2 - l / 2, r - 6 * l / 2], rotate: [45, l / 2, l / 2] }).rect(u).end(), e++;
  }
  geoOverlappingCircles() {
    var r, e, n, s, a, o, i = D(y(this.hash, 0), 0, 15, 25, 200) / 2;
    for (this.svg.setWidth(6 * i), this.svg.setHeight(6 * i), r = 0, o = 0; o < 6; o++)
      for (a = 0; a < 6; a++)
        e = q(s = y(this.hash, r)), n = { fill: E(s), opacity: e }, this.svg.circle(a * i, o * i, i, n), a === 0 && this.svg.circle(6 * i, o * i, i, n), o === 0 && this.svg.circle(a * i, 6 * i, i, n), a === 0 && o === 0 && this.svg.circle(6 * i, 6 * i, i, n), r++;
  }
  geoOctogons() {
    var r, e, n, s, a, o, i = D(y(this.hash, 0), 0, 15, 10, 60), c = function(u) {
      var l = u, p = 0.33 * l;
      return [p, 0, l - p, 0, l, p, l, l - p, l - p, l, p, l, 0, l - p, 0, p, p, 0].join(",");
    }(i);
    for (this.svg.setWidth(6 * i), this.svg.setHeight(6 * i), e = 0, o = 0; o < 6; o++)
      for (a = 0; a < 6; a++)
        n = q(s = y(this.hash, e)), r = E(s), this.svg.polyline(c, { fill: r, "fill-opacity": n, stroke: M, "stroke-opacity": I }).transform({ translate: [a * i, o * i] }), e += 1;
  }
  geoSquares() {
    var r, e, n, s, a, o, i = D(y(this.hash, 0), 0, 15, 10, 60);
    for (this.svg.setWidth(6 * i), this.svg.setHeight(6 * i), e = 0, o = 0; o < 6; o++)
      for (a = 0; a < 6; a++)
        n = q(s = y(this.hash, e)), r = E(s), this.svg.rect(a * i, o * i, i, i, { fill: r, "fill-opacity": n, stroke: M, "stroke-opacity": I }), e += 1;
  }
  geoConcentricCircles() {
    var r, e, n, s, a, o, i = D(y(this.hash, 0), 0, 15, 10, 60), c = i / 5;
    for (this.svg.setWidth(6 * (i + c)), this.svg.setHeight(6 * (i + c)), e = 0, o = 0; o < 6; o++)
      for (a = 0; a < 6; a++)
        n = q(s = y(this.hash, e)), r = E(s), this.svg.circle(a * i + a * c + (i + c) / 2, o * i + o * c + (i + c) / 2, i / 2, { fill: "none", stroke: r, opacity: n, "stroke-width": c + "px" }), n = q(s = y(this.hash, 39 - e)), r = E(s), this.svg.circle(a * i + a * c + (i + c) / 2, o * i + o * c + (i + c) / 2, i / 4, { fill: r, "fill-opacity": n }), e += 1;
  }
  geoOverlappingRings() {
    var r, e, n, s, a, o, i = D(y(this.hash, 0), 0, 15, 10, 60), c = i / 4;
    for (this.svg.setWidth(6 * i), this.svg.setHeight(6 * i), r = 0, o = 0; o < 6; o++)
      for (a = 0; a < 6; a++)
        e = q(s = y(this.hash, r)), n = { fill: "none", stroke: E(s), opacity: e, "stroke-width": c + "px" }, this.svg.circle(a * i, o * i, i - c / 2, n), a === 0 && this.svg.circle(6 * i, o * i, i - c / 2, n), o === 0 && this.svg.circle(a * i, 6 * i, i - c / 2, n), a === 0 && o === 0 && this.svg.circle(6 * i, 6 * i, i - c / 2, n), r += 1;
  }
  geoTriangles() {
    var r, e, n, s, a, o, i, c = D(y(this.hash, 0), 0, 15, 15, 80), u = c / 2 * Math.sqrt(3), l = function(p, h) {
      var d = p / 2;
      return [d, 0, p, h, 0, h, d, 0].join(",");
    }(c, u);
    for (this.svg.setWidth(3 * c), this.svg.setHeight(6 * u), r = 0, i = 0; i < 6; i++)
      for (o = 0; o < 6; o++)
        e = q(a = y(this.hash, r)), s = { fill: E(a), "fill-opacity": e, stroke: M, "stroke-opacity": I }, n = i % 2 == 0 ? o % 2 == 0 ? 180 : 0 : o % 2 != 0 ? 180 : 0, this.svg.polyline(l, s).transform({ translate: [o * c * 0.5 - c / 2, u * i], rotate: [n, c / 2, u / 2] }), o === 0 && this.svg.polyline(l, s).transform({ translate: [6 * c * 0.5 - c / 2, u * i], rotate: [n, c / 2, u / 2] }), r += 1;
  }
  geoDiamonds() {
    var r, e, n, s, a, o, i, c, u, l = D(y(this.hash, 0), 0, 15, 10, 50), p = D(y(this.hash, 1), 0, 15, 10, 50), h = [(r = l) / 2, 0, r, (e = p) / 2, r / 2, e, 0, e / 2].join(",");
    for (this.svg.setWidth(6 * l), this.svg.setHeight(3 * p), s = 0, u = 0; u < 6; u++)
      for (c = 0; c < 6; c++)
        a = q(i = y(this.hash, s)), o = { fill: E(i), "fill-opacity": a, stroke: M, "stroke-opacity": I }, n = u % 2 == 0 ? 0 : l / 2, this.svg.polyline(h, o).transform({ translate: [c * l - l / 2 + n, p / 2 * u - p / 2] }), c === 0 && this.svg.polyline(h, o).transform({ translate: [6 * l - l / 2 + n, p / 2 * u - p / 2] }), u === 0 && this.svg.polyline(h, o).transform({ translate: [c * l - l / 2 + n, p / 2 * 6 - p / 2] }), c === 0 && u === 0 && this.svg.polyline(h, o).transform({ translate: [6 * l - l / 2 + n, p / 2 * 6 - p / 2] }), s += 1;
  }
  geoNestedSquares() {
    var r, e, n, s, a, o, i = D(y(this.hash, 0), 0, 15, 4, 12), c = 7 * i;
    for (this.svg.setWidth(6 * (c + i) + 6 * i), this.svg.setHeight(6 * (c + i) + 6 * i), r = 0, o = 0; o < 6; o++)
      for (a = 0; a < 6; a++)
        e = q(s = y(this.hash, r)), n = { fill: "none", stroke: E(s), opacity: e, "stroke-width": i + "px" }, this.svg.rect(a * c + a * i * 2 + i / 2, o * c + o * i * 2 + i / 2, c, c, n), e = q(s = y(this.hash, 39 - r)), n = { fill: "none", stroke: E(s), opacity: e, "stroke-width": i + "px" }, this.svg.rect(a * c + a * i * 2 + i / 2 + 2 * i, o * c + o * i * 2 + i / 2 + 2 * i, 3 * i, 3 * i, n), r += 1;
  }
  geoMosaicSquares() {
    var r, e, n, s = D(y(this.hash, 0), 0, 15, 15, 50);
    for (this.svg.setWidth(8 * s), this.svg.setHeight(8 * s), r = 0, n = 0; n < 4; n++)
      for (e = 0; e < 4; e++)
        e % 2 == 0 ? n % 2 == 0 ? rr(this.svg, e * s * 2, n * s * 2, s, y(this.hash, r)) : tr(this.svg, e * s * 2, n * s * 2, s, [y(this.hash, r), y(this.hash, r + 1)]) : n % 2 == 0 ? tr(this.svg, e * s * 2, n * s * 2, s, [y(this.hash, r), y(this.hash, r + 1)]) : rr(this.svg, e * s * 2, n * s * 2, s, y(this.hash, r)), r += 1;
  }
  geoPlaid() {
    var r, e, n, s, a, o, i = 0, c = 0;
    for (e = 0; e < 36; )
      i += y(this.hash, e) + 5, n = q(o = y(this.hash, e + 1)), r = E(o), s = o + 5, this.svg.rect(0, i, "100%", s, { opacity: n, fill: r }), i += s, e += 2;
    for (e = 0; e < 36; )
      c += y(this.hash, e) + 5, n = q(o = y(this.hash, e + 1)), r = E(o), a = o + 5, this.svg.rect(c, 0, a, "100%", { opacity: n, fill: r }), c += a, e += 2;
    this.svg.setWidth(c), this.svg.setHeight(i);
  }
  geoTessellation() {
    var r, e, n, s, a, o = D(y(this.hash, 0), 0, 15, 5, 40), i = o * Math.sqrt(3), c = 2 * o, u = o / 2 * Math.sqrt(3), l = function(d, g) {
      var f = d / 2;
      return [0, 0, g, f, 0, d, 0, 0].join(",");
    }(o, u), p = 3 * o + 2 * u, h = 2 * i + 2 * o;
    for (this.svg.setWidth(p), this.svg.setHeight(h), e = 0; e < 20; e++)
      switch (n = q(a = y(this.hash, e)), r = E(a), s = { stroke: M, "stroke-opacity": I, fill: r, "fill-opacity": n, "stroke-width": 1 }, e) {
        case 0:
          this.svg.rect(-o / 2, -o / 2, o, o, s), this.svg.rect(p - o / 2, -o / 2, o, o, s), this.svg.rect(-o / 2, h - o / 2, o, o, s), this.svg.rect(p - o / 2, h - o / 2, o, o, s);
          break;
        case 1:
          this.svg.rect(c / 2 + u, i / 2, o, o, s);
          break;
        case 2:
          this.svg.rect(-o / 2, h / 2 - o / 2, o, o, s), this.svg.rect(p - o / 2, h / 2 - o / 2, o, o, s);
          break;
        case 3:
          this.svg.rect(c / 2 + u, 1.5 * i + o, o, o, s);
          break;
        case 4:
          this.svg.polyline(l, s).transform({ translate: [o / 2, -o / 2], rotate: [0, o / 2, u / 2] }), this.svg.polyline(l, s).transform({ translate: [o / 2, h - -o / 2], rotate: [0, o / 2, u / 2], scale: [1, -1] });
          break;
        case 5:
          this.svg.polyline(l, s).transform({ translate: [p - o / 2, -o / 2], rotate: [0, o / 2, u / 2], scale: [-1, 1] }), this.svg.polyline(l, s).transform({ translate: [p - o / 2, h + o / 2], rotate: [0, o / 2, u / 2], scale: [-1, -1] });
          break;
        case 6:
          this.svg.polyline(l, s).transform({ translate: [p / 2 + o / 2, i / 2] });
          break;
        case 7:
          this.svg.polyline(l, s).transform({ translate: [p - p / 2 - o / 2, i / 2], scale: [-1, 1] });
          break;
        case 8:
          this.svg.polyline(l, s).transform({ translate: [p / 2 + o / 2, h - i / 2], scale: [1, -1] });
          break;
        case 9:
          this.svg.polyline(l, s).transform({ translate: [p - p / 2 - o / 2, h - i / 2], scale: [-1, -1] });
          break;
        case 10:
          this.svg.polyline(l, s).transform({ translate: [o / 2, h / 2 - o / 2] });
          break;
        case 11:
          this.svg.polyline(l, s).transform({ translate: [p - o / 2, h / 2 - o / 2], scale: [-1, 1] });
          break;
        case 12:
          this.svg.rect(0, 0, o, o, s).transform({ translate: [o / 2, o / 2], rotate: [-30, 0, 0] });
          break;
        case 13:
          this.svg.rect(0, 0, o, o, s).transform({ scale: [-1, 1], translate: [o / 2 - p, o / 2], rotate: [-30, 0, 0] });
          break;
        case 14:
          this.svg.rect(0, 0, o, o, s).transform({ translate: [o / 2, h / 2 - o / 2 - o], rotate: [30, 0, o] });
          break;
        case 15:
          this.svg.rect(0, 0, o, o, s).transform({ scale: [-1, 1], translate: [o / 2 - p, h / 2 - o / 2 - o], rotate: [30, 0, o] });
          break;
        case 16:
          this.svg.rect(0, 0, o, o, s).transform({ scale: [1, -1], translate: [o / 2, h / 2 - h - o / 2 - o], rotate: [30, 0, o] });
          break;
        case 17:
          this.svg.rect(0, 0, o, o, s).transform({ scale: [-1, -1], translate: [o / 2 - p, h / 2 - h - o / 2 - o], rotate: [30, 0, o] });
          break;
        case 18:
          this.svg.rect(0, 0, o, o, s).transform({ scale: [1, -1], translate: [o / 2, o / 2 - h], rotate: [-30, 0, 0] });
          break;
        case 19:
          this.svg.rect(0, 0, o, o, s).transform({ scale: [-1, -1], translate: [o / 2 - p, o / 2 - h], rotate: [-30, 0, 0] });
      }
  }
}
function Xt(t) {
  return [[t, 0, t, 3 * t], [0, t, 3 * t, t]];
}
function Xr(t) {
  return [0, 0, t, t, 0, t, 0, 0].join(",");
}
function tr(t, r, e, n, s) {
  var a = Xr(n), o = q(s[0]), i = E(s[0]), c = { stroke: M, "stroke-opacity": I, "fill-opacity": o, fill: i };
  t.polyline(a, c).transform({ translate: [r + n, e], scale: [-1, 1] }), t.polyline(a, c).transform({ translate: [r + n, e + 2 * n], scale: [1, -1] }), o = q(s[1]), i = E(s[1]), c = { stroke: M, "stroke-opacity": I, "fill-opacity": o, fill: i }, t.polyline(a, c).transform({ translate: [r + n, e + 2 * n], scale: [-1, -1] }), t.polyline(a, c).transform({ translate: [r + n, e], scale: [1, 1] });
}
function rr(t, r, e, n, s) {
  var a = q(s), o = E(s), i = Xr(n), c = { stroke: M, "stroke-opacity": I, "fill-opacity": a, fill: o };
  t.polyline(i, c).transform({ translate: [r, e + n], scale: [1, -1] }), t.polyline(i, c).transform({ translate: [r + 2 * n, e + n], scale: [-1, -1] }), t.polyline(i, c).transform({ translate: [r, e + n], scale: [1, 1] }), t.polyline(i, c).transform({ translate: [r + 2 * n, e + n], scale: [-1, 1] });
}
const Le = { generate: (er = function(t, r) {
  return new Se(t, r);
}, function(t, r) {
  return typeof t == "object" && (r = t, t = null), t == null && (t = new Date().toString()), r || (r = {}), er.call(this, t, r);
}) };
var er;
const Fe = Object.freeze(Object.defineProperty({ __proto__: null, _50_background: function() {
  try {
    let r = document.querySelector(".card"), e = document.querySelector(".breadcrumb");
    var t = Le.generate(e.innerHTML);
    r.style = `--image: ${t.toDataUrl()}`;
  } catch (r) {
    console.error(r);
  }
} }, Symbol.toStringTag, { value: "Module" }));
function te(t) {
  return "#" + Math.abs((r = t, r.split("").reduce((e, n) => (e = (e << 5) - e + n.charCodeAt(0)) & e, 0))).toString(16).slice(0, 6).padEnd(6, "0");
  var r;
}
function re(t) {
  return t.replace(/0/g, "C").replace(/1/g, "D").replace(/2/g, "E").replace(/3/g, "F").replace(/4/g, "C").replace(/5/g, "D").replace(/6/g, "E").replace(/7/g, "F").replace(/8/g, "C").replace(/9/g, "D").replace(/A/g, "E").replace(/B/g, "F");
}
const ze = Object.freeze(Object.defineProperty({ __proto__: null, _50_breadcrumb: function() {
  let t = document.querySelector("#qa"), r = document.querySelector("#qa .breadcrumb");
  r && (r.innerHTML = r.innerHTML.split("::").join(" :: "), t.style = `--deckcolor:${re(te(r.innerHTML))};`);
} }, Symbol.toStringTag, { value: "Module" }));
let $ = document.querySelector(".card"), Bt = document.getElementById("qa"), nr = document.createElement("div");
function Te() {
  console.log("clone");
  const t = document.getElementById("shadow"), r = Bt.cloneNode(!0);
  r.id = "shadow", r.classList.add("hidden"), t.parentElement.replaceChild(r, t);
}
nr.id = "shadow", Bt.after(nr);
const Me = Object.freeze(Object.defineProperty({ __proto__: null, _70_flip: function() {
  console.log($.className), document.getElementById("shadow").classList.remove("hidden"), $.classList.contains("front") ? $.classList.contains("back") || ($.classList.add("back"), $.classList.remove("front")) : ($.classList.remove("back"), $.classList.add("front")), Bt.addEventListener("animationend", Te, { once: !0 });
} }, Symbol.toStringTag, { value: "Module" }));
function Ie(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Oe(t) {
  if (t.__esModule)
    return t;
  var r = t.default;
  if (typeof r == "function") {
    var e = function n() {
      if (this instanceof n) {
        var s = [null];
        return s.push.apply(s, arguments), new (Function.bind.apply(r, s))();
      }
      return r.apply(this, arguments);
    };
    e.prototype = r.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(e, n, s.get ? s : { enumerable: !0, get: function() {
      return t[n];
    } });
  }), e;
}
var It = {}, je = { get exports() {
  return It;
}, set exports(t) {
  It = t;
} }, x = {}, ft = {};
const Re = { Aacute: "Á", aacute: "á", Abreve: "Ă", abreve: "ă", ac: "∾", acd: "∿", acE: "∾̳", Acirc: "Â", acirc: "â", acute: "´", Acy: "А", acy: "а", AElig: "Æ", aelig: "æ", af: "⁡", Afr: "𝔄", afr: "𝔞", Agrave: "À", agrave: "à", alefsym: "ℵ", aleph: "ℵ", Alpha: "Α", alpha: "α", Amacr: "Ā", amacr: "ā", amalg: "⨿", amp: "&", AMP: "&", andand: "⩕", And: "⩓", and: "∧", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angmsd: "∡", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", Aogon: "Ą", aogon: "ą", Aopf: "𝔸", aopf: "𝕒", apacir: "⩯", ap: "≈", apE: "⩰", ape: "≊", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", Aring: "Å", aring: "å", Ascr: "𝒜", ascr: "𝒶", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", Bcy: "Б", bcy: "б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", Beta: "Β", beta: "β", beth: "ℶ", between: "≬", Bfr: "𝔅", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bNot: "⫭", bnot: "⌐", Bopf: "𝔹", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxHd: "╤", boxhD: "╥", boxHD: "╦", boxhu: "┴", boxHu: "╧", boxhU: "╨", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsolb: "⧅", bsol: "\\", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", Bumpeq: "≎", bumpeq: "≏", Cacute: "Ć", cacute: "ć", capand: "⩄", capbrcup: "⩉", capcap: "⩋", cap: "∩", Cap: "⋒", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", Ccaron: "Č", ccaron: "č", Ccedil: "Ç", ccedil: "ç", Ccirc: "Ĉ", ccirc: "ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", Cdot: "Ċ", cdot: "ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", CHcy: "Ч", chcy: "ч", check: "✓", checkmark: "✓", Chi: "Χ", chi: "χ", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cir: "○", cirE: "⧃", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", Colone: "⩴", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", Cscr: "𝒞", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cup: "∪", Cup: "⋓", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", Darr: "↡", dArr: "⇓", dash: "‐", Dashv: "⫤", dashv: "⊣", dbkarow: "⤏", dblac: "˝", Dcaron: "Ď", dcaron: "ď", Dcy: "Д", dcy: "д", ddagger: "‡", ddarr: "⇊", DD: "ⅅ", dd: "ⅆ", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", Delta: "Δ", delta: "δ", demptyv: "⦱", dfisht: "⥿", Dfr: "𝔇", dfr: "𝔡", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", DJcy: "Ђ", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", Dopf: "𝔻", dopf: "𝕕", Dot: "¨", dot: "˙", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrowBar: "⤓", downarrow: "↓", DownArrow: "↓", Downarrow: "⇓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVectorBar: "⥖", DownLeftVector: "↽", DownRightTeeVector: "⥟", DownRightVectorBar: "⥗", DownRightVector: "⇁", DownTeeArrow: "↧", DownTee: "⊤", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", Dscr: "𝒟", dscr: "𝒹", DScy: "Ѕ", dscy: "ѕ", dsol: "⧶", Dstrok: "Đ", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", DZcy: "Џ", dzcy: "џ", dzigrarr: "⟿", Eacute: "É", eacute: "é", easter: "⩮", Ecaron: "Ě", ecaron: "ě", Ecirc: "Ê", ecirc: "ê", ecir: "≖", ecolon: "≕", Ecy: "Э", ecy: "э", eDDot: "⩷", Edot: "Ė", edot: "ė", eDot: "≑", ee: "ⅇ", efDot: "≒", Efr: "𝔈", efr: "𝔢", eg: "⪚", Egrave: "È", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", Emacr: "Ē", emacr: "ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp13: " ", emsp14: " ", emsp: " ", ENG: "Ŋ", eng: "ŋ", ensp: " ", Eogon: "Ę", eogon: "ę", Eopf: "𝔼", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", Epsilon: "Ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", Esim: "⩳", esim: "≂", Eta: "Η", eta: "η", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", Fcy: "Ф", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", Ffr: "𝔉", ffr: "𝔣", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", Fopf: "𝔽", fopf: "𝕗", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", Gamma: "Γ", gamma: "γ", Gammad: "Ϝ", gammad: "ϝ", gap: "⪆", Gbreve: "Ğ", gbreve: "ğ", Gcedil: "Ģ", Gcirc: "Ĝ", gcirc: "ĝ", Gcy: "Г", gcy: "г", Gdot: "Ġ", gdot: "ġ", ge: "≥", gE: "≧", gEl: "⪌", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", gescc: "⪩", ges: "⩾", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", Gfr: "𝔊", gfr: "𝔤", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", GJcy: "Ѓ", gjcy: "ѓ", gla: "⪥", gl: "≷", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", Gopf: "𝔾", gopf: "𝕘", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", gtcc: "⪧", gtcir: "⩺", gt: ">", GT: ">", Gt: "≫", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", HARDcy: "Ъ", hardcy: "ъ", harrcir: "⥈", harr: "↔", hArr: "⇔", harrw: "↭", Hat: "^", hbar: "ℏ", Hcirc: "Ĥ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", Hstrok: "Ħ", hstrok: "ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", Iacute: "Í", iacute: "í", ic: "⁣", Icirc: "Î", icirc: "î", Icy: "И", icy: "и", Idot: "İ", IEcy: "Е", iecy: "е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", Igrave: "Ì", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", IJlig: "Ĳ", ijlig: "ĳ", Imacr: "Ī", imacr: "ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", Im: "ℑ", imof: "⊷", imped: "Ƶ", Implies: "⇒", incare: "℅", in: "∈", infin: "∞", infintie: "⧝", inodot: "ı", intcal: "⊺", int: "∫", Int: "∬", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", IOcy: "Ё", iocy: "ё", Iogon: "Į", iogon: "į", Iopf: "𝕀", iopf: "𝕚", Iota: "Ι", iota: "ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", Itilde: "Ĩ", itilde: "ĩ", Iukcy: "І", iukcy: "і", Iuml: "Ï", iuml: "ï", Jcirc: "Ĵ", jcirc: "ĵ", Jcy: "Й", jcy: "й", Jfr: "𝔍", jfr: "𝔧", jmath: "ȷ", Jopf: "𝕁", jopf: "𝕛", Jscr: "𝒥", jscr: "𝒿", Jsercy: "Ј", jsercy: "ј", Jukcy: "Є", jukcy: "є", Kappa: "Κ", kappa: "κ", kappav: "ϰ", Kcedil: "Ķ", kcedil: "ķ", Kcy: "К", kcy: "к", Kfr: "𝔎", kfr: "𝔨", kgreen: "ĸ", KHcy: "Х", khcy: "х", KJcy: "Ќ", kjcy: "ќ", Kopf: "𝕂", kopf: "𝕜", Kscr: "𝒦", kscr: "𝓀", lAarr: "⇚", Lacute: "Ĺ", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", Lambda: "Λ", lambda: "λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larrb: "⇤", larrbfs: "⤟", larr: "←", Larr: "↞", lArr: "⇐", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", latail: "⤙", lAtail: "⤛", lat: "⪫", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", Lcaron: "Ľ", lcaron: "ľ", Lcedil: "Ļ", lcedil: "ļ", lceil: "⌈", lcub: "{", Lcy: "Л", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", LeftArrowBar: "⇤", leftarrow: "←", LeftArrow: "←", Leftarrow: "⇐", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVectorBar: "⥙", LeftDownVector: "⇃", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", LeftRightArrow: "↔", Leftrightarrow: "⇔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTeeArrow: "↤", LeftTee: "⊣", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangleBar: "⧏", LeftTriangle: "⊲", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVectorBar: "⥘", LeftUpVector: "↿", LeftVectorBar: "⥒", LeftVector: "↼", lEg: "⪋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", lescc: "⪨", les: "⩽", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", Lfr: "𝔏", lfr: "𝔩", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", LJcy: "Љ", ljcy: "љ", llarr: "⇇", ll: "≪", Ll: "⋘", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", Lmidot: "Ŀ", lmidot: "ŀ", lmoustache: "⎰", lmoust: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", LongLeftArrow: "⟵", Longleftarrow: "⟸", longleftrightarrow: "⟷", LongLeftRightArrow: "⟷", Longleftrightarrow: "⟺", longmapsto: "⟼", longrightarrow: "⟶", LongRightArrow: "⟶", Longrightarrow: "⟹", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", Lopf: "𝕃", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", Lstrok: "Ł", lstrok: "ł", ltcc: "⪦", ltcir: "⩹", lt: "<", LT: "<", Lt: "≪", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", Map: "⤅", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", Mcy: "М", mcy: "м", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", mfr: "𝔪", mho: "℧", micro: "µ", midast: "*", midcir: "⫰", mid: "∣", middot: "·", minusb: "⊟", minus: "−", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", Mopf: "𝕄", mopf: "𝕞", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", Mu: "Μ", mu: "μ", multimap: "⊸", mumap: "⊸", nabla: "∇", Nacute: "Ń", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natural: "♮", naturals: "ℕ", natur: "♮", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", Ncaron: "Ň", ncaron: "ň", Ncedil: "Ņ", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", Ncy: "Н", ncy: "н", ndash: "–", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", ne: "≠", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: `
`, nexist: "∄", nexists: "∄", Nfr: "𝔑", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", nGt: "≫⃒", ngt: "≯", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", NJcy: "Њ", njcy: "њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nlE: "≦̸", nle: "≰", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nLt: "≪⃒", nlt: "≮", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", Not: "⫬", not: "¬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangleBar: "⧏̸", NotLeftTriangle: "⋪", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangleBar: "⧐̸", NotRightTriangle: "⋫", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", nparallel: "∦", npar: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", nprec: "⊀", npreceq: "⪯̸", npre: "⪯̸", nrarrc: "⤳̸", nrarr: "↛", nrArr: "⇏", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", Nscr: "𝒩", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", Ntilde: "Ñ", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", Nu: "Ν", nu: "ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", Oacute: "Ó", oacute: "ó", oast: "⊛", Ocirc: "Ô", ocirc: "ô", ocir: "⊚", Ocy: "О", ocy: "о", odash: "⊝", Odblac: "Ő", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", OElig: "Œ", oelig: "œ", ofcir: "⦿", Ofr: "𝔒", ofr: "𝔬", ogon: "˛", Ograve: "Ò", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", Omacr: "Ō", omacr: "ō", Omega: "Ω", omega: "ω", Omicron: "Ο", omicron: "ο", omid: "⦶", ominus: "⊖", Oopf: "𝕆", oopf: "𝕠", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", orarr: "↻", Or: "⩔", or: "∨", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", Oscr: "𝒪", oscr: "ℴ", Oslash: "Ø", oslash: "ø", osol: "⊘", Otilde: "Õ", otilde: "õ", otimesas: "⨶", Otimes: "⨷", otimes: "⊗", Ouml: "Ö", ouml: "ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", para: "¶", parallel: "∥", par: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", Pcy: "П", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", Pfr: "𝔓", pfr: "𝔭", Phi: "Φ", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", Pi: "Π", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plus: "+", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", prap: "⪷", Pr: "⪻", pr: "≺", prcue: "≼", precapprox: "⪷", prec: "≺", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", pre: "⪯", prE: "⪳", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportional: "∝", Proportion: "∷", propto: "∝", prsim: "≾", prurel: "⊰", Pscr: "𝒫", pscr: "𝓅", Psi: "Ψ", psi: "ψ", puncsp: " ", Qfr: "𝔔", qfr: "𝔮", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", Qscr: "𝒬", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", Racute: "Ŕ", racute: "ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarr: "→", Rarr: "↠", rArr: "⇒", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", Rarrtl: "⤖", rarrtl: "↣", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", Rcaron: "Ř", rcaron: "ř", Rcedil: "Ŗ", rcedil: "ŗ", rceil: "⌉", rcub: "}", Rcy: "Р", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", Re: "ℜ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", Rho: "Ρ", rho: "ρ", rhov: "ϱ", RightAngleBracket: "⟩", RightArrowBar: "⇥", rightarrow: "→", RightArrow: "→", Rightarrow: "⇒", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVectorBar: "⥕", RightDownVector: "⇂", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTeeArrow: "↦", RightTee: "⊢", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangleBar: "⧐", RightTriangle: "⊳", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVectorBar: "⥔", RightUpVector: "↾", RightVectorBar: "⥓", RightVector: "⇀", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoustache: "⎱", rmoust: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", Sacute: "Ś", sacute: "ś", sbquo: "‚", scap: "⪸", Scaron: "Š", scaron: "š", Sc: "⪼", sc: "≻", sccue: "≽", sce: "⪰", scE: "⪴", Scedil: "Ş", scedil: "ş", Scirc: "Ŝ", scirc: "ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", Scy: "С", scy: "с", sdotb: "⊡", sdot: "⋅", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", Sfr: "𝔖", sfr: "𝔰", sfrown: "⌢", sharp: "♯", SHCHcy: "Щ", shchcy: "щ", SHcy: "Ш", shcy: "ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", Sigma: "Σ", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", SOFTcy: "Ь", softcy: "ь", solbar: "⌿", solb: "⧄", sol: "/", Sopf: "𝕊", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squ: "□", squf: "▪", srarr: "→", Sscr: "𝒮", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", Star: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", subE: "⫅", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succapprox: "⪸", succ: "≻", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup1: "¹", sup2: "²", sup3: "³", sup: "⊃", Sup: "⋑", supdot: "⪾", supdsub: "⫘", supE: "⫆", supe: "⊇", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "	", target: "⌖", Tau: "Τ", tau: "τ", tbrk: "⎴", Tcaron: "Ť", tcaron: "ť", Tcedil: "Ţ", tcedil: "ţ", Tcy: "Т", tcy: "т", tdot: "⃛", telrec: "⌕", Tfr: "𝔗", tfr: "𝔱", there4: "∴", therefore: "∴", Therefore: "∴", Theta: "Θ", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", ThinSpace: " ", thinsp: " ", thkap: "≈", thksim: "∼", THORN: "Þ", thorn: "þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", timesbar: "⨱", timesb: "⊠", times: "×", timesd: "⨰", tint: "∭", toea: "⤨", topbot: "⌶", topcir: "⫱", top: "⊤", Topf: "𝕋", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", Tscr: "𝒯", tscr: "𝓉", TScy: "Ц", tscy: "ц", TSHcy: "Ћ", tshcy: "ћ", Tstrok: "Ŧ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", Uacute: "Ú", uacute: "ú", uarr: "↑", Uarr: "↟", uArr: "⇑", Uarrocir: "⥉", Ubrcy: "Ў", ubrcy: "ў", Ubreve: "Ŭ", ubreve: "ŭ", Ucirc: "Û", ucirc: "û", Ucy: "У", ucy: "у", udarr: "⇅", Udblac: "Ű", udblac: "ű", udhar: "⥮", ufisht: "⥾", Ufr: "𝔘", ufr: "𝔲", Ugrave: "Ù", ugrave: "ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", Umacr: "Ū", umacr: "ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", uogon: "ų", Uopf: "𝕌", uopf: "𝕦", UpArrowBar: "⤒", uparrow: "↑", UpArrow: "↑", Uparrow: "⇑", UpArrowDownArrow: "⇅", updownarrow: "↕", UpDownArrow: "↕", Updownarrow: "⇕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", Upsilon: "Υ", upsilon: "υ", UpTeeArrow: "↥", UpTee: "⊥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", Uring: "Ů", uring: "ů", urtri: "◹", Uscr: "𝒰", uscr: "𝓊", utdot: "⋰", Utilde: "Ũ", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", Uuml: "Ü", uuml: "ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", Vcy: "В", vcy: "в", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", veebar: "⊻", vee: "∨", Vee: "⋁", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", Vopf: "𝕍", vopf: "𝕧", vprop: "∝", vrtri: "⊳", Vscr: "𝒱", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", Vvdash: "⊪", vzigzag: "⦚", Wcirc: "Ŵ", wcirc: "ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", Wfr: "𝔚", wfr: "𝔴", Wopf: "𝕎", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", Wscr: "𝒲", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", Xfr: "𝔛", xfr: "𝔵", xharr: "⟷", xhArr: "⟺", Xi: "Ξ", xi: "ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", Xopf: "𝕏", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", Xscr: "𝒳", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", Yacute: "Ý", yacute: "ý", YAcy: "Я", yacy: "я", Ycirc: "Ŷ", ycirc: "ŷ", Ycy: "Ы", ycy: "ы", yen: "¥", Yfr: "𝔜", yfr: "𝔶", YIcy: "Ї", yicy: "ї", Yopf: "𝕐", yopf: "𝕪", Yscr: "𝒴", yscr: "𝓎", YUcy: "Ю", yucy: "ю", yuml: "ÿ", Yuml: "Ÿ", Zacute: "Ź", zacute: "ź", Zcaron: "Ž", zcaron: "ž", Zcy: "З", zcy: "з", Zdot: "Ż", zdot: "ż", zeetrf: "ℨ", ZeroWidthSpace: "​", Zeta: "Ζ", zeta: "ζ", zfr: "𝔷", Zfr: "ℨ", ZHcy: "Ж", zhcy: "ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", Zscr: "𝒵", zscr: "𝓏", zwj: "‍", zwnj: "‌" };
({ get exports() {
  return ft;
}, set exports(t) {
  ft = t;
} }).exports = Re;
var Pt = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, X = {}, sr = {};
function dt(t, r, e) {
  var n, s, a, o, i, c = "";
  for (typeof r != "string" && (e = r, r = dt.defaultChars), e === void 0 && (e = !0), i = function(u) {
    var l, p, h = sr[u];
    if (h)
      return h;
    for (h = sr[u] = [], l = 0; l < 128; l++)
      p = String.fromCharCode(l), /^[0-9a-z]$/i.test(p) ? h.push(p) : h.push("%" + ("0" + l.toString(16).toUpperCase()).slice(-2));
    for (l = 0; l < u.length; l++)
      h[u.charCodeAt(l)] = u[l];
    return h;
  }(r), n = 0, s = t.length; n < s; n++)
    if (a = t.charCodeAt(n), e && a === 37 && n + 2 < s && /^[0-9a-f]{2}$/i.test(t.slice(n + 1, n + 3)))
      c += t.slice(n, n + 3), n += 2;
    else if (a < 128)
      c += i[a];
    else if (a >= 55296 && a <= 57343) {
      if (a >= 55296 && a <= 56319 && n + 1 < s && (o = t.charCodeAt(n + 1)) >= 56320 && o <= 57343) {
        c += encodeURIComponent(t[n] + t[n + 1]), n++;
        continue;
      }
      c += "%EF%BF%BD";
    } else
      c += encodeURIComponent(t[n]);
  return c;
}
dt.defaultChars = ";/?:@&=+$,-_.!~*'()#", dt.componentChars = "-_.!~*'()";
var Be = dt, ir = {};
function gt(t, r) {
  var e;
  return typeof r != "string" && (r = gt.defaultChars), e = function(n) {
    var s, a, o = ir[n];
    if (o)
      return o;
    for (o = ir[n] = [], s = 0; s < 128; s++)
      a = String.fromCharCode(s), o.push(a);
    for (s = 0; s < n.length; s++)
      o[a = n.charCodeAt(s)] = "%" + ("0" + a.toString(16).toUpperCase()).slice(-2);
    return o;
  }(r), t.replace(/(%[a-f0-9]{2})+/gi, function(n) {
    var s, a, o, i, c, u, l, p = "";
    for (s = 0, a = n.length; s < a; s += 3)
      (o = parseInt(n.slice(s + 1, s + 3), 16)) < 128 ? p += e[o] : (224 & o) == 192 && s + 3 < a && (192 & (i = parseInt(n.slice(s + 4, s + 6), 16))) == 128 ? (p += (l = o << 6 & 1984 | 63 & i) < 128 ? "��" : String.fromCharCode(l), s += 3) : (240 & o) == 224 && s + 6 < a && (i = parseInt(n.slice(s + 4, s + 6), 16), c = parseInt(n.slice(s + 7, s + 9), 16), (192 & i) == 128 && (192 & c) == 128) ? (p += (l = o << 12 & 61440 | i << 6 & 4032 | 63 & c) < 2048 || l >= 55296 && l <= 57343 ? "���" : String.fromCharCode(l), s += 6) : (248 & o) == 240 && s + 9 < a && (i = parseInt(n.slice(s + 4, s + 6), 16), c = parseInt(n.slice(s + 7, s + 9), 16), u = parseInt(n.slice(s + 10, s + 12), 16), (192 & i) == 128 && (192 & c) == 128 && (192 & u) == 128) ? ((l = o << 18 & 1835008 | i << 12 & 258048 | c << 6 & 4032 | 63 & u) < 65536 || l > 1114111 ? p += "����" : (l -= 65536, p += String.fromCharCode(55296 + (l >> 10), 56320 + (1023 & l))), s += 9) : p += "�";
    return p;
  });
}
gt.defaultChars = ";/?:@&=+$,#", gt.componentChars = "";
var Pe = gt;
function mt() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var Ne = /^([a-z0-9.+-]+:)/i, Ue = /:[0-9]*$/, He = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Ve = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", `
`, "	"]), $e = ["'"].concat(Ve), or = ["%", "/", "?", ";", "#"].concat($e), ar = ["/", "?", "#"], cr = /^[+a-z0-9A-Z_-]{0,63}$/, Ze = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, lr = { javascript: !0, "javascript:": !0 }, ur = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 };
mt.prototype.parse = function(t, r) {
  var e, n, s, a, o, i = t;
  if (i = i.trim(), !r && t.split("#").length === 1) {
    var c = He.exec(i);
    if (c)
      return this.pathname = c[1], c[2] && (this.search = c[2]), this;
  }
  var u = Ne.exec(i);
  if (u && (s = (u = u[0]).toLowerCase(), this.protocol = u, i = i.substr(u.length)), (r || u || i.match(/^\/\/[^@\/]+@[^@\/]+/)) && (!(o = i.substr(0, 2) === "//") || u && lr[u] || (i = i.substr(2), this.slashes = !0)), !lr[u] && (o || u && !ur[u])) {
    var l, p, h = -1;
    for (e = 0; e < ar.length; e++)
      (a = i.indexOf(ar[e])) !== -1 && (h === -1 || a < h) && (h = a);
    for ((p = h === -1 ? i.lastIndexOf("@") : i.lastIndexOf("@", h)) !== -1 && (l = i.slice(0, p), i = i.slice(p + 1), this.auth = l), h = -1, e = 0; e < or.length; e++)
      (a = i.indexOf(or[e])) !== -1 && (h === -1 || a < h) && (h = a);
    h === -1 && (h = i.length), i[h - 1] === ":" && h--;
    var d = i.slice(0, h);
    i = i.slice(h), this.parseHost(d), this.hostname = this.hostname || "";
    var g = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!g) {
      var f = this.hostname.split(/\./);
      for (e = 0, n = f.length; e < n; e++) {
        var _ = f[e];
        if (_ && !_.match(cr)) {
          for (var m = "", k = 0, v = _.length; k < v; k++)
            _.charCodeAt(k) > 127 ? m += "x" : m += _[k];
          if (!m.match(cr)) {
            var C = f.slice(0, e), b = f.slice(e + 1), A = _.match(Ze);
            A && (C.push(A[1]), b.unshift(A[2])), b.length && (i = b.join(".") + i), this.hostname = C.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > 255 && (this.hostname = ""), g && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var S = i.indexOf("#");
  S !== -1 && (this.hash = i.substr(S), i = i.slice(0, S));
  var U = i.indexOf("?");
  return U !== -1 && (this.search = i.substr(U), i = i.slice(0, U)), i && (this.pathname = i), ur[s] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, mt.prototype.parseHost = function(t) {
  var r = Ue.exec(t);
  r && ((r = r[0]) !== ":" && (this.port = r.substr(1)), t = t.substr(0, t.length - r.length)), t && (this.hostname = t);
};
var Ge = function(t, r) {
  if (t && t instanceof mt)
    return t;
  var e = new mt();
  return e.parse(t, r), e;
};
X.encode = Be, X.decode = Pe, X.format = function(t) {
  var r = "";
  return r += t.protocol || "", r += t.slashes ? "//" : "", r += t.auth ? t.auth + "@" : "", t.hostname && t.hostname.indexOf(":") !== -1 ? r += "[" + t.hostname + "]" : r += t.hostname || "", r += t.port ? ":" + t.port : "", r += t.pathname || "", r += t.search || "", r += t.hash || "";
}, X.parse = Ge;
var hr, pr, fr, dr, gr, mr, _r, kr, br, W = {};
function ee() {
  return pr ? hr : (pr = 1, hr = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
}
function ne() {
  return dr ? fr : (dr = 1, fr = /[\0-\x1F\x7F-\x9F]/);
}
function se() {
  return kr ? _r : (kr = 1, _r = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/);
}
function We() {
  return br || (br = 1, W.Any = ee(), W.Cc = ne(), W.Cf = mr ? gr : (mr = 1, gr = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), W.P = Pt, W.Z = se()), W;
}
(function(t) {
  var r = Object.prototype.hasOwnProperty;
  function e(f, _) {
    return r.call(f, _);
  }
  function n(f) {
    return !(f >= 55296 && f <= 57343) && !(f >= 64976 && f <= 65007) && (65535 & f) != 65535 && (65535 & f) != 65534 && !(f >= 0 && f <= 8) && f !== 11 && !(f >= 14 && f <= 31) && !(f >= 127 && f <= 159) && !(f > 1114111);
  }
  function s(f) {
    if (f > 65535) {
      var _ = 55296 + ((f -= 65536) >> 10), m = 56320 + (1023 & f);
      return String.fromCharCode(_, m);
    }
    return String.fromCharCode(f);
  }
  var a = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, o = new RegExp(a.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source, "gi"), i = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, c = ft, u = /[&<>"]/, l = /[&<>"]/g, p = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  function h(f) {
    return p[f];
  }
  var d = /[.?*+^$[\]\\(){}|-]/g, g = Pt;
  t.lib = {}, t.lib.mdurl = X, t.lib.ucmicro = We(), t.assign = function(f) {
    return Array.prototype.slice.call(arguments, 1).forEach(function(_) {
      if (_) {
        if (typeof _ != "object")
          throw new TypeError(_ + "must be object");
        Object.keys(_).forEach(function(m) {
          f[m] = _[m];
        });
      }
    }), f;
  }, t.isString = function(f) {
    return function(_) {
      return Object.prototype.toString.call(_);
    }(f) === "[object String]";
  }, t.has = e, t.unescapeMd = function(f) {
    return f.indexOf("\\") < 0 ? f : f.replace(a, "$1");
  }, t.unescapeAll = function(f) {
    return f.indexOf("\\") < 0 && f.indexOf("&") < 0 ? f : f.replace(o, function(_, m, k) {
      return m || function(v, C) {
        var b = 0;
        return e(c, C) ? c[C] : C.charCodeAt(0) === 35 && i.test(C) && n(b = C[1].toLowerCase() === "x" ? parseInt(C.slice(2), 16) : parseInt(C.slice(1), 10)) ? s(b) : v;
      }(_, k);
    });
  }, t.isValidEntityCode = n, t.fromCodePoint = s, t.escapeHtml = function(f) {
    return u.test(f) ? f.replace(l, h) : f;
  }, t.arrayReplaceAt = function(f, _, m) {
    return [].concat(f.slice(0, _), m, f.slice(_ + 1));
  }, t.isSpace = function(f) {
    switch (f) {
      case 9:
      case 32:
        return !0;
    }
    return !1;
  }, t.isWhiteSpace = function(f) {
    if (f >= 8192 && f <= 8202)
      return !0;
    switch (f) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
  }, t.isMdAsciiPunct = function(f) {
    switch (f) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }, t.isPunctChar = function(f) {
    return g.test(f);
  }, t.escapeRE = function(f) {
    return f.replace(d, "\\$&");
  }, t.normalizeReference = function(f) {
    return f = f.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (f = f.replace(/ẞ/g, "ß")), f.toLowerCase().toUpperCase();
  };
})(x);
var ct = {}, vr = x.unescapeAll, Je = x.unescapeAll;
ct.parseLinkLabel = function(t, r, e) {
  var n, s, a, o, i = -1, c = t.posMax, u = t.pos;
  for (t.pos = r + 1, n = 1; t.pos < c; ) {
    if ((a = t.src.charCodeAt(t.pos)) === 93 && --n === 0) {
      s = !0;
      break;
    }
    if (o = t.pos, t.md.inline.skipToken(t), a === 91) {
      if (o === t.pos - 1)
        n++;
      else if (e)
        return t.pos = u, -1;
    }
  }
  return s && (i = t.pos), t.pos = u, i;
}, ct.parseLinkDestination = function(t, r, e) {
  var n, s, a = r, o = { ok: !1, pos: 0, lines: 0, str: "" };
  if (t.charCodeAt(r) === 60) {
    for (r++; r < e; ) {
      if ((n = t.charCodeAt(r)) === 10 || n === 60)
        return o;
      if (n === 62)
        return o.pos = r + 1, o.str = vr(t.slice(a + 1, r)), o.ok = !0, o;
      n === 92 && r + 1 < e ? r += 2 : r++;
    }
    return o;
  }
  for (s = 0; r < e && (n = t.charCodeAt(r)) !== 32 && !(n < 32 || n === 127); )
    if (n === 92 && r + 1 < e) {
      if (t.charCodeAt(r + 1) === 32)
        break;
      r += 2;
    } else {
      if (n === 40 && ++s > 32)
        return o;
      if (n === 41) {
        if (s === 0)
          break;
        s--;
      }
      r++;
    }
  return a === r || s !== 0 || (o.str = vr(t.slice(a, r)), o.lines = 0, o.pos = r, o.ok = !0), o;
}, ct.parseLinkTitle = function(t, r, e) {
  var n, s, a = 0, o = r, i = { ok: !1, pos: 0, lines: 0, str: "" };
  if (r >= e || (s = t.charCodeAt(r)) !== 34 && s !== 39 && s !== 40)
    return i;
  for (r++, s === 40 && (s = 41); r < e; ) {
    if ((n = t.charCodeAt(r)) === s)
      return i.pos = r + 1, i.lines = a, i.str = Je(t.slice(o + 1, r)), i.ok = !0, i;
    if (n === 40 && s === 41)
      return i;
    n === 10 ? a++ : n === 92 && r + 1 < e && (r++, t.charCodeAt(r) === 10 && a++), r++;
  }
  return i;
};
var Ye = x.assign, Ke = x.unescapeAll, J = x.escapeHtml, j = {};
function K() {
  this.rules = Ye({}, j);
}
j.code_inline = function(t, r, e, n, s) {
  var a = t[r];
  return "<code" + s.renderAttrs(a) + ">" + J(t[r].content) + "</code>";
}, j.code_block = function(t, r, e, n, s) {
  var a = t[r];
  return "<pre" + s.renderAttrs(a) + "><code>" + J(t[r].content) + `</code></pre>
`;
}, j.fence = function(t, r, e, n, s) {
  var a, o, i, c, u, l = t[r], p = l.info ? Ke(l.info).trim() : "", h = "", d = "";
  return p && (h = (i = p.split(/(\s+)/g))[0], d = i.slice(2).join("")), (a = e.highlight && e.highlight(l.content, h, d) || J(l.content)).indexOf("<pre") === 0 ? a + `
` : p ? (o = l.attrIndex("class"), c = l.attrs ? l.attrs.slice() : [], o < 0 ? c.push(["class", e.langPrefix + h]) : (c[o] = c[o].slice(), c[o][1] += " " + e.langPrefix + h), u = { attrs: c }, "<pre><code" + s.renderAttrs(u) + ">" + a + `</code></pre>
`) : "<pre><code" + s.renderAttrs(l) + ">" + a + `</code></pre>
`;
}, j.image = function(t, r, e, n, s) {
  var a = t[r];
  return a.attrs[a.attrIndex("alt")][1] = s.renderInlineAsText(a.children, e, n), s.renderToken(t, r, e);
}, j.hardbreak = function(t, r, e) {
  return e.xhtmlOut ? `<br />
` : `<br>
`;
}, j.softbreak = function(t, r, e) {
  return e.breaks ? e.xhtmlOut ? `<br />
` : `<br>
` : `
`;
}, j.text = function(t, r) {
  return J(t[r].content);
}, j.html_block = function(t, r) {
  return t[r].content;
}, j.html_inline = function(t, r) {
  return t[r].content;
}, K.prototype.renderAttrs = function(t) {
  var r, e, n;
  if (!t.attrs)
    return "";
  for (n = "", r = 0, e = t.attrs.length; r < e; r++)
    n += " " + J(t.attrs[r][0]) + '="' + J(t.attrs[r][1]) + '"';
  return n;
}, K.prototype.renderToken = function(t, r, e) {
  var n, s = "", a = !1, o = t[r];
  return o.hidden ? "" : (o.block && o.nesting !== -1 && r && t[r - 1].hidden && (s += `
`), s += (o.nesting === -1 ? "</" : "<") + o.tag, s += this.renderAttrs(o), o.nesting === 0 && e.xhtmlOut && (s += " /"), o.block && (a = !0, o.nesting === 1 && r + 1 < t.length && ((n = t[r + 1]).type === "inline" || n.hidden || n.nesting === -1 && n.tag === o.tag) && (a = !1)), s += a ? `>
` : ">");
}, K.prototype.renderInline = function(t, r, e) {
  for (var n, s = "", a = this.rules, o = 0, i = t.length; o < i; o++)
    a[n = t[o].type] !== void 0 ? s += a[n](t, o, r, e, this) : s += this.renderToken(t, o, r);
  return s;
}, K.prototype.renderInlineAsText = function(t, r, e) {
  for (var n = "", s = 0, a = t.length; s < a; s++)
    t[s].type === "text" ? n += t[s].content : t[s].type === "image" ? n += this.renderInlineAsText(t[s].children, r, e) : t[s].type === "softbreak" && (n += `
`);
  return n;
}, K.prototype.render = function(t, r, e) {
  var n, s, a, o = "", i = this.rules;
  for (n = 0, s = t.length; n < s; n++)
    (a = t[n].type) === "inline" ? o += this.renderInline(t[n].children, r, e) : i[a] !== void 0 ? o += i[t[n].type](t, n, r, e, this) : o += this.renderToken(t, n, r, e);
  return o;
};
var Qe = K;
function T() {
  this.__rules__ = [], this.__cache__ = null;
}
T.prototype.__find__ = function(t) {
  for (var r = 0; r < this.__rules__.length; r++)
    if (this.__rules__[r].name === t)
      return r;
  return -1;
}, T.prototype.__compile__ = function() {
  var t = this, r = [""];
  t.__rules__.forEach(function(e) {
    e.enabled && e.alt.forEach(function(n) {
      r.indexOf(n) < 0 && r.push(n);
    });
  }), t.__cache__ = {}, r.forEach(function(e) {
    t.__cache__[e] = [], t.__rules__.forEach(function(n) {
      n.enabled && (e && n.alt.indexOf(e) < 0 || t.__cache__[e].push(n.fn));
    });
  });
}, T.prototype.at = function(t, r, e) {
  var n = this.__find__(t), s = e || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__[n].fn = r, this.__rules__[n].alt = s.alt || [], this.__cache__ = null;
}, T.prototype.before = function(t, r, e, n) {
  var s = this.__find__(t), a = n || {};
  if (s === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(s, 0, { name: r, enabled: !0, fn: e, alt: a.alt || [] }), this.__cache__ = null;
}, T.prototype.after = function(t, r, e, n) {
  var s = this.__find__(t), a = n || {};
  if (s === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(s + 1, 0, { name: r, enabled: !0, fn: e, alt: a.alt || [] }), this.__cache__ = null;
}, T.prototype.push = function(t, r, e) {
  var n = e || {};
  this.__rules__.push({ name: t, enabled: !0, fn: r, alt: n.alt || [] }), this.__cache__ = null;
}, T.prototype.enable = function(t, r) {
  Array.isArray(t) || (t = [t]);
  var e = [];
  return t.forEach(function(n) {
    var s = this.__find__(n);
    if (s < 0) {
      if (r)
        return;
      throw new Error("Rules manager: invalid rule name " + n);
    }
    this.__rules__[s].enabled = !0, e.push(n);
  }, this), this.__cache__ = null, e;
}, T.prototype.enableOnly = function(t, r) {
  Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(e) {
    e.enabled = !1;
  }), this.enable(t, r);
}, T.prototype.disable = function(t, r) {
  Array.isArray(t) || (t = [t]);
  var e = [];
  return t.forEach(function(n) {
    var s = this.__find__(n);
    if (s < 0) {
      if (r)
        return;
      throw new Error("Rules manager: invalid rule name " + n);
    }
    this.__rules__[s].enabled = !1, e.push(n);
  }, this), this.__cache__ = null, e;
}, T.prototype.getRules = function(t) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
};
var Nt = T, Xe = /\r\n?|\n/g, tn = /\0/g, rn = x.arrayReplaceAt;
function en(t) {
  return /^<\/a\s*>/i.test(t);
}
var ie = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, nn = /\((c|tm|r)\)/i, sn = /\((c|tm|r)\)/gi, on = { c: "©", r: "®", tm: "™" };
function an(t, r) {
  return on[r.toLowerCase()];
}
function cn(t) {
  var r, e, n = 0;
  for (r = t.length - 1; r >= 0; r--)
    (e = t[r]).type !== "text" || n || (e.content = e.content.replace(sn, an)), e.type === "link_open" && e.info === "auto" && n--, e.type === "link_close" && e.info === "auto" && n++;
}
function ln(t) {
  var r, e, n = 0;
  for (r = t.length - 1; r >= 0; r--)
    (e = t[r]).type !== "text" || n || ie.test(e.content) && (e.content = e.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), e.type === "link_open" && e.info === "auto" && n--, e.type === "link_close" && e.info === "auto" && n++;
}
var yr = x.isWhiteSpace, Cr = x.isPunctChar, xr = x.isMdAsciiPunct, un = /['"]/, Ar = /['"]/g, wr = "’";
function it(t, r, e) {
  return t.slice(0, r) + e + t.slice(r + 1);
}
function hn(t, r) {
  var e, n, s, a, o, i, c, u, l, p, h, d, g, f, _, m, k, v, C, b, A;
  for (C = [], e = 0; e < t.length; e++) {
    for (n = t[e], c = t[e].level, k = C.length - 1; k >= 0 && !(C[k].level <= c); k--)
      ;
    if (C.length = k + 1, n.type === "text") {
      o = 0, i = (s = n.content).length;
      t:
        for (; o < i && (Ar.lastIndex = o, a = Ar.exec(s)); ) {
          if (_ = m = !0, o = a.index + 1, v = a[0] === "'", l = 32, a.index - 1 >= 0)
            l = s.charCodeAt(a.index - 1);
          else
            for (k = e - 1; k >= 0 && t[k].type !== "softbreak" && t[k].type !== "hardbreak"; k--)
              if (t[k].content) {
                l = t[k].content.charCodeAt(t[k].content.length - 1);
                break;
              }
          if (p = 32, o < i)
            p = s.charCodeAt(o);
          else
            for (k = e + 1; k < t.length && t[k].type !== "softbreak" && t[k].type !== "hardbreak"; k++)
              if (t[k].content) {
                p = t[k].content.charCodeAt(0);
                break;
              }
          if (h = xr(l) || Cr(String.fromCharCode(l)), d = xr(p) || Cr(String.fromCharCode(p)), g = yr(l), (f = yr(p)) ? _ = !1 : d && (g || h || (_ = !1)), g ? m = !1 : h && (f || d || (m = !1)), p === 34 && a[0] === '"' && l >= 48 && l <= 57 && (m = _ = !1), _ && m && (_ = h, m = d), _ || m) {
            if (m) {
              for (k = C.length - 1; k >= 0 && (u = C[k], !(C[k].level < c)); k--)
                if (u.single === v && C[k].level === c) {
                  u = C[k], v ? (b = r.md.options.quotes[2], A = r.md.options.quotes[3]) : (b = r.md.options.quotes[0], A = r.md.options.quotes[1]), n.content = it(n.content, a.index, A), t[u.token].content = it(t[u.token].content, u.pos, b), o += A.length - 1, u.token === e && (o += b.length - 1), i = (s = n.content).length, C.length = k;
                  continue t;
                }
            }
            _ ? C.push({ token: e, pos: a.index, single: v, level: c }) : m && v && (n.content = it(n.content, a.index, wr));
          } else
            v && (n.content = it(n.content, a.index, wr));
        }
    }
  }
}
function Q(t, r, e) {
  this.type = t, this.tag = r, this.attrs = null, this.map = null, this.nesting = e, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
Q.prototype.attrIndex = function(t) {
  var r, e, n;
  if (!this.attrs)
    return -1;
  for (e = 0, n = (r = this.attrs).length; e < n; e++)
    if (r[e][0] === t)
      return e;
  return -1;
}, Q.prototype.attrPush = function(t) {
  this.attrs ? this.attrs.push(t) : this.attrs = [t];
}, Q.prototype.attrSet = function(t, r) {
  var e = this.attrIndex(t), n = [t, r];
  e < 0 ? this.attrPush(n) : this.attrs[e] = n;
}, Q.prototype.attrGet = function(t) {
  var r = this.attrIndex(t), e = null;
  return r >= 0 && (e = this.attrs[r][1]), e;
}, Q.prototype.attrJoin = function(t, r) {
  var e = this.attrIndex(t);
  e < 0 ? this.attrPush([t, r]) : this.attrs[e][1] = this.attrs[e][1] + " " + r;
};
var Ut = Q, pn = Ut;
function oe(t, r, e) {
  this.src = t, this.env = e, this.tokens = [], this.inlineMode = !1, this.md = r;
}
oe.prototype.Token = pn;
var fn = oe, dn = Nt, At = [["normalize", function(t) {
  var r;
  r = (r = t.src.replace(Xe, `
`)).replace(tn, "�"), t.src = r;
}], ["block", function(t) {
  var r;
  t.inlineMode ? ((r = new t.Token("inline", "", 0)).content = t.src, r.map = [0, 1], r.children = [], t.tokens.push(r)) : t.md.block.parse(t.src, t.md, t.env, t.tokens);
}], ["inline", function(t) {
  var r, e, n, s = t.tokens;
  for (e = 0, n = s.length; e < n; e++)
    (r = s[e]).type === "inline" && t.md.inline.parse(r.content, t.md, t.env, r.children);
}], ["linkify", function(t) {
  var r, e, n, s, a, o, i, c, u, l, p, h, d, g, f, _, m, k, v = t.tokens;
  if (t.md.options.linkify) {
    for (e = 0, n = v.length; e < n; e++)
      if (v[e].type === "inline" && t.md.linkify.pretest(v[e].content))
        for (d = 0, r = (s = v[e].children).length - 1; r >= 0; r--)
          if ((o = s[r]).type !== "link_close") {
            if (o.type === "html_inline" && (k = o.content, /^<a[>\s]/i.test(k) && d > 0 && d--, en(o.content) && d++), !(d > 0) && o.type === "text" && t.md.linkify.test(o.content)) {
              for (u = o.content, m = t.md.linkify.match(u), i = [], h = o.level, p = 0, m.length > 0 && m[0].index === 0 && r > 0 && s[r - 1].type === "text_special" && (m = m.slice(1)), c = 0; c < m.length; c++)
                g = m[c].url, f = t.md.normalizeLink(g), t.md.validateLink(f) && (_ = m[c].text, _ = m[c].schema ? m[c].schema !== "mailto:" || /^mailto:/i.test(_) ? t.md.normalizeLinkText(_) : t.md.normalizeLinkText("mailto:" + _).replace(/^mailto:/, "") : t.md.normalizeLinkText("http://" + _).replace(/^http:\/\//, ""), (l = m[c].index) > p && ((a = new t.Token("text", "", 0)).content = u.slice(p, l), a.level = h, i.push(a)), (a = new t.Token("link_open", "a", 1)).attrs = [["href", f]], a.level = h++, a.markup = "linkify", a.info = "auto", i.push(a), (a = new t.Token("text", "", 0)).content = _, a.level = h, i.push(a), (a = new t.Token("link_close", "a", -1)).level = --h, a.markup = "linkify", a.info = "auto", i.push(a), p = m[c].lastIndex);
              p < u.length && ((a = new t.Token("text", "", 0)).content = u.slice(p), a.level = h, i.push(a)), v[e].children = s = rn(s, r, i);
            }
          } else
            for (r--; s[r].level !== o.level && s[r].type !== "link_open"; )
              r--;
  }
}], ["replacements", function(t) {
  var r;
  if (t.md.options.typographer)
    for (r = t.tokens.length - 1; r >= 0; r--)
      t.tokens[r].type === "inline" && (nn.test(t.tokens[r].content) && cn(t.tokens[r].children), ie.test(t.tokens[r].content) && ln(t.tokens[r].children));
}], ["smartquotes", function(t) {
  var r;
  if (t.md.options.typographer)
    for (r = t.tokens.length - 1; r >= 0; r--)
      t.tokens[r].type === "inline" && un.test(t.tokens[r].content) && hn(t.tokens[r].children, t);
}], ["text_join", function(t) {
  var r, e, n, s, a, o, i = t.tokens;
  for (r = 0, e = i.length; r < e; r++)
    if (i[r].type === "inline") {
      for (a = (n = i[r].children).length, s = 0; s < a; s++)
        n[s].type === "text_special" && (n[s].type = "text");
      for (s = o = 0; s < a; s++)
        n[s].type === "text" && s + 1 < a && n[s + 1].type === "text" ? n[s + 1].content = n[s].content + n[s + 1].content : (s !== o && (n[o] = n[s]), o++);
      s !== o && (n.length = o);
    }
}]];
function Ot() {
  this.ruler = new dn();
  for (var t = 0; t < At.length; t++)
    this.ruler.push(At[t][0], At[t][1]);
}
Ot.prototype.process = function(t) {
  var r, e, n;
  for (r = 0, e = (n = this.ruler.getRules("")).length; r < e; r++)
    n[r](t);
}, Ot.prototype.State = fn;
var gn = Ot, wt = x.isSpace;
function Dt(t, r) {
  var e = t.bMarks[r] + t.tShift[r], n = t.eMarks[r];
  return t.src.slice(e, n);
}
function Dr(t) {
  var r, e = [], n = 0, s = t.length, a = !1, o = 0, i = "";
  for (r = t.charCodeAt(n); n < s; )
    r === 124 && (a ? (i += t.substring(o, n - 1), o = n) : (e.push(i + t.substring(o, n)), i = "", o = n + 1)), a = r === 92, n++, r = t.charCodeAt(n);
  return e.push(i + t.substring(o)), e;
}
var Er = x.isSpace, mn = x.isSpace, ae = x.isSpace;
function qr(t, r) {
  var e, n, s, a;
  return n = t.bMarks[r] + t.tShift[r], s = t.eMarks[r], (e = t.src.charCodeAt(n++)) !== 42 && e !== 45 && e !== 43 || n < s && (a = t.src.charCodeAt(n), !ae(a)) ? -1 : n;
}
function Sr(t, r) {
  var e, n = t.bMarks[r] + t.tShift[r], s = n, a = t.eMarks[r];
  if (s + 1 >= a || (e = t.src.charCodeAt(s++)) < 48 || e > 57)
    return -1;
  for (; ; ) {
    if (s >= a)
      return -1;
    if (!((e = t.src.charCodeAt(s++)) >= 48 && e <= 57)) {
      if (e === 41 || e === 46)
        break;
      return -1;
    }
    if (s - n >= 10)
      return -1;
  }
  return s < a && (e = t.src.charCodeAt(s), !ae(e)) ? -1 : s;
}
var _n = x.normalizeReference, ot = x.isSpace, _t = {}, ce = `<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`, le = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", kn = new RegExp("^(?:" + ce + "|" + le + "|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?][\\s\\S]*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"), bn = new RegExp("^(?:" + ce + "|" + le + ")");
_t.HTML_TAG_RE = kn, _t.HTML_OPEN_CLOSE_TAG_RE = bn;
var vn = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "section", "source", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], yn = _t.HTML_OPEN_CLOSE_TAG_RE, Y = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0], [/^<!--/, /-->/, !0], [/^<\?/, /\?>/, !0], [/^<![A-Z]/, />/, !0], [/^<!\[CDATA\[/, /\]\]>/, !0], [new RegExp("^</?(" + vn.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0], [new RegExp(yn.source + "\\s*$"), /^$/, !1]], Lr = x.isSpace, Fr = Ut, lt = x.isSpace;
function R(t, r, e, n) {
  var s, a, o, i, c, u, l, p;
  for (this.src = t, this.md = r, this.env = e, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", p = !1, o = i = u = l = 0, c = (a = this.src).length; i < c; i++) {
    if (s = a.charCodeAt(i), !p) {
      if (lt(s)) {
        u++, s === 9 ? l += 4 - l % 4 : l++;
        continue;
      }
      p = !0;
    }
    s !== 10 && i !== c - 1 || (s !== 10 && i++, this.bMarks.push(o), this.eMarks.push(i), this.tShift.push(u), this.sCount.push(l), this.bsCount.push(0), p = !1, u = 0, l = 0, o = i + 1);
  }
  this.bMarks.push(a.length), this.eMarks.push(a.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
R.prototype.push = function(t, r, e) {
  var n = new Fr(t, r, e);
  return n.block = !0, e < 0 && this.level--, n.level = this.level, e > 0 && this.level++, this.tokens.push(n), n;
}, R.prototype.isEmpty = function(t) {
  return this.bMarks[t] + this.tShift[t] >= this.eMarks[t];
}, R.prototype.skipEmptyLines = function(t) {
  for (var r = this.lineMax; t < r && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++)
    ;
  return t;
}, R.prototype.skipSpaces = function(t) {
  for (var r, e = this.src.length; t < e && (r = this.src.charCodeAt(t), lt(r)); t++)
    ;
  return t;
}, R.prototype.skipSpacesBack = function(t, r) {
  if (t <= r)
    return t;
  for (; t > r; )
    if (!lt(this.src.charCodeAt(--t)))
      return t + 1;
  return t;
}, R.prototype.skipChars = function(t, r) {
  for (var e = this.src.length; t < e && this.src.charCodeAt(t) === r; t++)
    ;
  return t;
}, R.prototype.skipCharsBack = function(t, r, e) {
  if (t <= e)
    return t;
  for (; t > e; )
    if (r !== this.src.charCodeAt(--t))
      return t + 1;
  return t;
}, R.prototype.getLines = function(t, r, e, n) {
  var s, a, o, i, c, u, l, p = t;
  if (t >= r)
    return "";
  for (u = new Array(r - t), s = 0; p < r; p++, s++) {
    for (a = 0, l = i = this.bMarks[p], c = p + 1 < r || n ? this.eMarks[p] + 1 : this.eMarks[p]; i < c && a < e; ) {
      if (o = this.src.charCodeAt(i), lt(o))
        o === 9 ? a += 4 - (a + this.bsCount[p]) % 4 : a++;
      else {
        if (!(i - l < this.tShift[p]))
          break;
        a++;
      }
      i++;
    }
    u[s] = a > e ? new Array(a - e + 1).join(" ") + this.src.slice(i, c) : this.src.slice(i, c);
  }
  return u.join("");
}, R.prototype.Token = Fr;
var Cn = R, xn = Nt, at = [["table", function(t, r, e, n) {
  var s, a, o, i, c, u, l, p, h, d, g, f, _, m, k, v, C, b;
  if (r + 2 > e || (u = r + 1, t.sCount[u] < t.blkIndent) || t.sCount[u] - t.blkIndent >= 4 || (o = t.bMarks[u] + t.tShift[u]) >= t.eMarks[u] || (C = t.src.charCodeAt(o++)) !== 124 && C !== 45 && C !== 58 || o >= t.eMarks[u] || (b = t.src.charCodeAt(o++)) !== 124 && b !== 45 && b !== 58 && !wt(b) || C === 45 && wt(b))
    return !1;
  for (; o < t.eMarks[u]; ) {
    if ((s = t.src.charCodeAt(o)) !== 124 && s !== 45 && s !== 58 && !wt(s))
      return !1;
    o++;
  }
  for (l = (a = Dt(t, r + 1)).split("|"), d = [], i = 0; i < l.length; i++) {
    if (!(g = l[i].trim())) {
      if (i === 0 || i === l.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(g))
      return !1;
    g.charCodeAt(g.length - 1) === 58 ? d.push(g.charCodeAt(0) === 58 ? "center" : "right") : g.charCodeAt(0) === 58 ? d.push("left") : d.push("");
  }
  if ((a = Dt(t, r).trim()).indexOf("|") === -1 || t.sCount[r] - t.blkIndent >= 4 || ((l = Dr(a)).length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop(), (p = l.length) === 0 || p !== d.length))
    return !1;
  if (n)
    return !0;
  for (m = t.parentType, t.parentType = "table", v = t.md.block.ruler.getRules("blockquote"), (h = t.push("table_open", "table", 1)).map = f = [r, 0], (h = t.push("thead_open", "thead", 1)).map = [r, r + 1], (h = t.push("tr_open", "tr", 1)).map = [r, r + 1], i = 0; i < l.length; i++)
    h = t.push("th_open", "th", 1), d[i] && (h.attrs = [["style", "text-align:" + d[i]]]), (h = t.push("inline", "", 0)).content = l[i].trim(), h.children = [], h = t.push("th_close", "th", -1);
  for (h = t.push("tr_close", "tr", -1), h = t.push("thead_close", "thead", -1), u = r + 2; u < e && !(t.sCount[u] < t.blkIndent); u++) {
    for (k = !1, i = 0, c = v.length; i < c; i++)
      if (v[i](t, u, e, !0)) {
        k = !0;
        break;
      }
    if (k || !(a = Dt(t, u).trim()) || t.sCount[u] - t.blkIndent >= 4)
      break;
    for ((l = Dr(a)).length && l[0] === "" && l.shift(), l.length && l[l.length - 1] === "" && l.pop(), u === r + 2 && ((h = t.push("tbody_open", "tbody", 1)).map = _ = [r + 2, 0]), (h = t.push("tr_open", "tr", 1)).map = [u, u + 1], i = 0; i < p; i++)
      h = t.push("td_open", "td", 1), d[i] && (h.attrs = [["style", "text-align:" + d[i]]]), (h = t.push("inline", "", 0)).content = l[i] ? l[i].trim() : "", h.children = [], h = t.push("td_close", "td", -1);
    h = t.push("tr_close", "tr", -1);
  }
  return _ && (h = t.push("tbody_close", "tbody", -1), _[1] = u), h = t.push("table_close", "table", -1), f[1] = u, t.parentType = m, t.line = u, !0;
}, ["paragraph", "reference"]], ["code", function(t, r, e) {
  var n, s, a;
  if (t.sCount[r] - t.blkIndent < 4)
    return !1;
  for (s = n = r + 1; n < e; )
    if (t.isEmpty(n))
      n++;
    else {
      if (!(t.sCount[n] - t.blkIndent >= 4))
        break;
      s = ++n;
    }
  return t.line = s, (a = t.push("code_block", "code", 0)).content = t.getLines(r, s, 4 + t.blkIndent, !1) + `
`, a.map = [r, t.line], !0;
}], ["fence", function(t, r, e, n) {
  var s, a, o, i, c, u, l, p = !1, h = t.bMarks[r] + t.tShift[r], d = t.eMarks[r];
  if (t.sCount[r] - t.blkIndent >= 4 || h + 3 > d || (s = t.src.charCodeAt(h)) !== 126 && s !== 96 || (c = h, (a = (h = t.skipChars(h, s)) - c) < 3) || (l = t.src.slice(c, h), o = t.src.slice(h, d), s === 96 && o.indexOf(String.fromCharCode(s)) >= 0))
    return !1;
  if (n)
    return !0;
  for (i = r; !(++i >= e) && !((h = c = t.bMarks[i] + t.tShift[i]) < (d = t.eMarks[i]) && t.sCount[i] < t.blkIndent); )
    if (t.src.charCodeAt(h) === s && !(t.sCount[i] - t.blkIndent >= 4 || (h = t.skipChars(h, s)) - c < a || (h = t.skipSpaces(h)) < d)) {
      p = !0;
      break;
    }
  return a = t.sCount[r], t.line = i + (p ? 1 : 0), (u = t.push("fence", "code", 0)).info = o, u.content = t.getLines(r + 1, i, a, !0), u.markup = l, u.map = [r, t.line], !0;
}, ["paragraph", "reference", "blockquote", "list"]], ["blockquote", function(t, r, e, n) {
  var s, a, o, i, c, u, l, p, h, d, g, f, _, m, k, v, C, b, A, S, U = t.lineMax, w = t.bMarks[r] + t.tShift[r], L = t.eMarks[r];
  if (t.sCount[r] - t.blkIndent >= 4 || t.src.charCodeAt(w++) !== 62)
    return !1;
  if (n)
    return !0;
  for (i = h = t.sCount[r] + 1, t.src.charCodeAt(w) === 32 ? (w++, i++, h++, s = !1, v = !0) : t.src.charCodeAt(w) === 9 ? (v = !0, (t.bsCount[r] + h) % 4 == 3 ? (w++, i++, h++, s = !1) : s = !0) : v = !1, d = [t.bMarks[r]], t.bMarks[r] = w; w < L && (a = t.src.charCodeAt(w), Er(a)); )
    a === 9 ? h += 4 - (h + t.bsCount[r] + (s ? 1 : 0)) % 4 : h++, w++;
  for (g = [t.bsCount[r]], t.bsCount[r] = t.sCount[r] + 1 + (v ? 1 : 0), u = w >= L, m = [t.sCount[r]], t.sCount[r] = h - i, k = [t.tShift[r]], t.tShift[r] = w - t.bMarks[r], b = t.md.block.ruler.getRules("blockquote"), _ = t.parentType, t.parentType = "blockquote", p = r + 1; p < e && (S = t.sCount[p] < t.blkIndent, !((w = t.bMarks[p] + t.tShift[p]) >= (L = t.eMarks[p]))); p++)
    if (t.src.charCodeAt(w++) !== 62 || S) {
      if (u)
        break;
      for (C = !1, o = 0, c = b.length; o < c; o++)
        if (b[o](t, p, e, !0)) {
          C = !0;
          break;
        }
      if (C) {
        t.lineMax = p, t.blkIndent !== 0 && (d.push(t.bMarks[p]), g.push(t.bsCount[p]), k.push(t.tShift[p]), m.push(t.sCount[p]), t.sCount[p] -= t.blkIndent);
        break;
      }
      d.push(t.bMarks[p]), g.push(t.bsCount[p]), k.push(t.tShift[p]), m.push(t.sCount[p]), t.sCount[p] = -1;
    } else {
      for (i = h = t.sCount[p] + 1, t.src.charCodeAt(w) === 32 ? (w++, i++, h++, s = !1, v = !0) : t.src.charCodeAt(w) === 9 ? (v = !0, (t.bsCount[p] + h) % 4 == 3 ? (w++, i++, h++, s = !1) : s = !0) : v = !1, d.push(t.bMarks[p]), t.bMarks[p] = w; w < L && (a = t.src.charCodeAt(w), Er(a)); )
        a === 9 ? h += 4 - (h + t.bsCount[p] + (s ? 1 : 0)) % 4 : h++, w++;
      u = w >= L, g.push(t.bsCount[p]), t.bsCount[p] = t.sCount[p] + 1 + (v ? 1 : 0), m.push(t.sCount[p]), t.sCount[p] = h - i, k.push(t.tShift[p]), t.tShift[p] = w - t.bMarks[p];
    }
  for (f = t.blkIndent, t.blkIndent = 0, (A = t.push("blockquote_open", "blockquote", 1)).markup = ">", A.map = l = [r, 0], t.md.block.tokenize(t, r, p), (A = t.push("blockquote_close", "blockquote", -1)).markup = ">", t.lineMax = U, t.parentType = _, l[1] = t.line, o = 0; o < k.length; o++)
    t.bMarks[o + r] = d[o], t.tShift[o + r] = k[o], t.sCount[o + r] = m[o], t.bsCount[o + r] = g[o];
  return t.blkIndent = f, !0;
}, ["paragraph", "reference", "blockquote", "list"]], ["hr", function(t, r, e, n) {
  var s, a, o, i, c = t.bMarks[r] + t.tShift[r], u = t.eMarks[r];
  if (t.sCount[r] - t.blkIndent >= 4 || (s = t.src.charCodeAt(c++)) !== 42 && s !== 45 && s !== 95)
    return !1;
  for (a = 1; c < u; ) {
    if ((o = t.src.charCodeAt(c++)) !== s && !mn(o))
      return !1;
    o === s && a++;
  }
  return !(a < 3) && (n || (t.line = r + 1, (i = t.push("hr", "hr", 0)).map = [r, t.line], i.markup = Array(a + 1).join(String.fromCharCode(s))), !0);
}, ["paragraph", "reference", "blockquote", "list"]], ["list", function(t, r, e, n) {
  var s, a, o, i, c, u, l, p, h, d, g, f, _, m, k, v, C, b, A, S, U, w, L, vt, st, yt, Ct, O, xt = !1, Gt = !0;
  if (t.sCount[r] - t.blkIndent >= 4 || t.listIndent >= 0 && t.sCount[r] - t.listIndent >= 4 && t.sCount[r] < t.blkIndent)
    return !1;
  if (n && t.parentType === "paragraph" && t.sCount[r] >= t.blkIndent && (xt = !0), (L = Sr(t, r)) >= 0) {
    if (l = !0, st = t.bMarks[r] + t.tShift[r], _ = Number(t.src.slice(st, L - 1)), xt && _ !== 1)
      return !1;
  } else {
    if (!((L = qr(t, r)) >= 0))
      return !1;
    l = !1;
  }
  if (xt && t.skipSpaces(L) >= t.eMarks[r])
    return !1;
  if (f = t.src.charCodeAt(L - 1), n)
    return !0;
  for (g = t.tokens.length, l ? (O = t.push("ordered_list_open", "ol", 1), _ !== 1 && (O.attrs = [["start", _]])) : O = t.push("bullet_list_open", "ul", 1), O.map = d = [r, 0], O.markup = String.fromCharCode(f), k = r, vt = !1, Ct = t.md.block.ruler.getRules("list"), b = t.parentType, t.parentType = "list"; k < e; ) {
    for (w = L, m = t.eMarks[k], u = v = t.sCount[k] + L - (t.bMarks[r] + t.tShift[r]); w < m; ) {
      if ((s = t.src.charCodeAt(w)) === 9)
        v += 4 - (v + t.bsCount[k]) % 4;
      else {
        if (s !== 32)
          break;
        v++;
      }
      w++;
    }
    if ((c = (a = w) >= m ? 1 : v - u) > 4 && (c = 1), i = u + c, (O = t.push("list_item_open", "li", 1)).markup = String.fromCharCode(f), O.map = p = [r, 0], l && (O.info = t.src.slice(st, L - 1)), U = t.tight, S = t.tShift[r], A = t.sCount[r], C = t.listIndent, t.listIndent = t.blkIndent, t.blkIndent = i, t.tight = !0, t.tShift[r] = a - t.bMarks[r], t.sCount[r] = v, a >= m && t.isEmpty(r + 1) ? t.line = Math.min(t.line + 2, e) : t.md.block.tokenize(t, r, e, !0), t.tight && !vt || (Gt = !1), vt = t.line - r > 1 && t.isEmpty(t.line - 1), t.blkIndent = t.listIndent, t.listIndent = C, t.tShift[r] = S, t.sCount[r] = A, t.tight = U, (O = t.push("list_item_close", "li", -1)).markup = String.fromCharCode(f), k = r = t.line, p[1] = k, a = t.bMarks[r], k >= e || t.sCount[k] < t.blkIndent || t.sCount[r] - t.blkIndent >= 4)
      break;
    for (yt = !1, o = 0, h = Ct.length; o < h; o++)
      if (Ct[o](t, k, e, !0)) {
        yt = !0;
        break;
      }
    if (yt)
      break;
    if (l) {
      if ((L = Sr(t, k)) < 0)
        break;
      st = t.bMarks[k] + t.tShift[k];
    } else if ((L = qr(t, k)) < 0)
      break;
    if (f !== t.src.charCodeAt(L - 1))
      break;
  }
  return (O = l ? t.push("ordered_list_close", "ol", -1) : t.push("bullet_list_close", "ul", -1)).markup = String.fromCharCode(f), d[1] = k, t.line = k, t.parentType = b, Gt && function(G, ve) {
    var H, Wt, ye = G.level + 2;
    for (H = ve + 2, Wt = G.tokens.length - 2; H < Wt; H++)
      G.tokens[H].level === ye && G.tokens[H].type === "paragraph_open" && (G.tokens[H + 2].hidden = !0, G.tokens[H].hidden = !0, H += 2);
  }(t, g), !0;
}, ["paragraph", "reference", "blockquote"]], ["reference", function(t, r, e, n) {
  var s, a, o, i, c, u, l, p, h, d, g, f, _, m, k, v, C = 0, b = t.bMarks[r] + t.tShift[r], A = t.eMarks[r], S = r + 1;
  if (t.sCount[r] - t.blkIndent >= 4 || t.src.charCodeAt(b) !== 91)
    return !1;
  for (; ++b < A; )
    if (t.src.charCodeAt(b) === 93 && t.src.charCodeAt(b - 1) !== 92) {
      if (b + 1 === A || t.src.charCodeAt(b + 1) !== 58)
        return !1;
      break;
    }
  for (i = t.lineMax, k = t.md.block.ruler.getRules("reference"), d = t.parentType, t.parentType = "reference"; S < i && !t.isEmpty(S); S++)
    if (!(t.sCount[S] - t.blkIndent > 3 || t.sCount[S] < 0)) {
      for (m = !1, u = 0, l = k.length; u < l; u++)
        if (k[u](t, S, i, !0)) {
          m = !0;
          break;
        }
      if (m)
        break;
    }
  for (A = (_ = t.getLines(r, S, t.blkIndent, !1).trim()).length, b = 1; b < A; b++) {
    if ((s = _.charCodeAt(b)) === 91)
      return !1;
    if (s === 93) {
      h = b;
      break;
    }
    (s === 10 || s === 92 && ++b < A && _.charCodeAt(b) === 10) && C++;
  }
  if (h < 0 || _.charCodeAt(h + 1) !== 58)
    return !1;
  for (b = h + 2; b < A; b++)
    if ((s = _.charCodeAt(b)) === 10)
      C++;
    else if (!ot(s))
      break;
  if (!(g = t.md.helpers.parseLinkDestination(_, b, A)).ok || (c = t.md.normalizeLink(g.str), !t.md.validateLink(c)))
    return !1;
  for (a = b = g.pos, o = C += g.lines, f = b; b < A; b++)
    if ((s = _.charCodeAt(b)) === 10)
      C++;
    else if (!ot(s))
      break;
  for (g = t.md.helpers.parseLinkTitle(_, b, A), b < A && f !== b && g.ok ? (v = g.str, b = g.pos, C += g.lines) : (v = "", b = a, C = o); b < A && (s = _.charCodeAt(b), ot(s)); )
    b++;
  if (b < A && _.charCodeAt(b) !== 10 && v)
    for (v = "", b = a, C = o; b < A && (s = _.charCodeAt(b), ot(s)); )
      b++;
  return !(b < A && _.charCodeAt(b) !== 10) && !!(p = _n(_.slice(1, h))) && (n || (t.env.references === void 0 && (t.env.references = {}), t.env.references[p] === void 0 && (t.env.references[p] = { title: v, href: c }), t.parentType = d, t.line = r + C + 1), !0);
}], ["html_block", function(t, r, e, n) {
  var s, a, o, i, c = t.bMarks[r] + t.tShift[r], u = t.eMarks[r];
  if (t.sCount[r] - t.blkIndent >= 4 || !t.md.options.html || t.src.charCodeAt(c) !== 60)
    return !1;
  for (i = t.src.slice(c, u), s = 0; s < Y.length && !Y[s][0].test(i); s++)
    ;
  if (s === Y.length)
    return !1;
  if (n)
    return Y[s][2];
  if (a = r + 1, !Y[s][1].test(i)) {
    for (; a < e && !(t.sCount[a] < t.blkIndent); a++)
      if (c = t.bMarks[a] + t.tShift[a], u = t.eMarks[a], i = t.src.slice(c, u), Y[s][1].test(i)) {
        i.length !== 0 && a++;
        break;
      }
  }
  return t.line = a, (o = t.push("html_block", "", 0)).map = [r, a], o.content = t.getLines(r, a, t.blkIndent, !0), !0;
}, ["paragraph", "reference", "blockquote"]], ["heading", function(t, r, e, n) {
  var s, a, o, i, c = t.bMarks[r] + t.tShift[r], u = t.eMarks[r];
  if (t.sCount[r] - t.blkIndent >= 4 || (s = t.src.charCodeAt(c)) !== 35 || c >= u)
    return !1;
  for (a = 1, s = t.src.charCodeAt(++c); s === 35 && c < u && a <= 6; )
    a++, s = t.src.charCodeAt(++c);
  return !(a > 6 || c < u && !Lr(s)) && (n || (u = t.skipSpacesBack(u, c), (o = t.skipCharsBack(u, 35, c)) > c && Lr(t.src.charCodeAt(o - 1)) && (u = o), t.line = r + 1, (i = t.push("heading_open", "h" + String(a), 1)).markup = "########".slice(0, a), i.map = [r, t.line], (i = t.push("inline", "", 0)).content = t.src.slice(c, u).trim(), i.map = [r, t.line], i.children = [], (i = t.push("heading_close", "h" + String(a), -1)).markup = "########".slice(0, a)), !0);
}, ["paragraph", "reference", "blockquote"]], ["lheading", function(t, r, e) {
  var n, s, a, o, i, c, u, l, p, h, d = r + 1, g = t.md.block.ruler.getRules("paragraph");
  if (t.sCount[r] - t.blkIndent >= 4)
    return !1;
  for (h = t.parentType, t.parentType = "paragraph"; d < e && !t.isEmpty(d); d++)
    if (!(t.sCount[d] - t.blkIndent > 3)) {
      if (t.sCount[d] >= t.blkIndent && (c = t.bMarks[d] + t.tShift[d]) < (u = t.eMarks[d]) && ((p = t.src.charCodeAt(c)) === 45 || p === 61) && (c = t.skipChars(c, p), (c = t.skipSpaces(c)) >= u)) {
        l = p === 61 ? 1 : 2;
        break;
      }
      if (!(t.sCount[d] < 0)) {
        for (s = !1, a = 0, o = g.length; a < o; a++)
          if (g[a](t, d, e, !0)) {
            s = !0;
            break;
          }
        if (s)
          break;
      }
    }
  return !!l && (n = t.getLines(r, d, t.blkIndent, !1).trim(), t.line = d + 1, (i = t.push("heading_open", "h" + String(l), 1)).markup = String.fromCharCode(p), i.map = [r, t.line], (i = t.push("inline", "", 0)).content = n, i.map = [r, t.line - 1], i.children = [], (i = t.push("heading_close", "h" + String(l), -1)).markup = String.fromCharCode(p), t.parentType = h, !0);
}], ["paragraph", function(t, r) {
  var e, n, s, a, o, i, c = r + 1, u = t.md.block.ruler.getRules("paragraph"), l = t.lineMax;
  for (i = t.parentType, t.parentType = "paragraph"; c < l && !t.isEmpty(c); c++)
    if (!(t.sCount[c] - t.blkIndent > 3 || t.sCount[c] < 0)) {
      for (n = !1, s = 0, a = u.length; s < a; s++)
        if (u[s](t, c, l, !0)) {
          n = !0;
          break;
        }
      if (n)
        break;
    }
  return e = t.getLines(r, c, t.blkIndent, !1).trim(), t.line = c, (o = t.push("paragraph_open", "p", 1)).map = [r, t.line], (o = t.push("inline", "", 0)).content = e, o.map = [r, t.line], o.children = [], o = t.push("paragraph_close", "p", -1), t.parentType = i, !0;
}]];
function ut() {
  this.ruler = new xn();
  for (var t = 0; t < at.length; t++)
    this.ruler.push(at[t][0], at[t][1], { alt: (at[t][2] || []).slice() });
}
ut.prototype.tokenize = function(t, r, e) {
  for (var n, s = this.ruler.getRules(""), a = s.length, o = r, i = !1, c = t.md.options.maxNesting; o < e && (t.line = o = t.skipEmptyLines(o), !(o >= e)) && !(t.sCount[o] < t.blkIndent); ) {
    if (t.level >= c) {
      t.line = e;
      break;
    }
    for (n = 0; n < a && !s[n](t, o, e, !1); n++)
      ;
    t.tight = !i, t.isEmpty(t.line - 1) && (i = !0), (o = t.line) < e && t.isEmpty(o) && (i = !0, o++, t.line = o);
  }
}, ut.prototype.parse = function(t, r, e, n) {
  var s;
  t && (s = new this.State(t, r, e, n), this.tokenize(s, s.line, s.lineMax));
}, ut.prototype.State = Cn;
var An = ut;
function wn(t) {
  switch (t) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
for (var Dn = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i, En = x.isSpace, qn = x.isSpace, Ht = [], zr = 0; zr < 256; zr++)
  Ht.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(t) {
  Ht[t.charCodeAt(0)] = 1;
});
var kt = {};
function Tr(t, r) {
  var e, n, s, a, o, i = [], c = r.length;
  for (e = 0; e < c; e++)
    (s = r[e]).marker === 126 && s.end !== -1 && (a = r[s.end], (o = t.tokens[s.token]).type = "s_open", o.tag = "s", o.nesting = 1, o.markup = "~~", o.content = "", (o = t.tokens[a.token]).type = "s_close", o.tag = "s", o.nesting = -1, o.markup = "~~", o.content = "", t.tokens[a.token - 1].type === "text" && t.tokens[a.token - 1].content === "~" && i.push(a.token - 1));
  for (; i.length; ) {
    for (n = (e = i.pop()) + 1; n < t.tokens.length && t.tokens[n].type === "s_close"; )
      n++;
    e !== --n && (o = t.tokens[n], t.tokens[n] = t.tokens[e], t.tokens[e] = o);
  }
}
kt.tokenize = function(t, r) {
  var e, n, s, a, o = t.pos, i = t.src.charCodeAt(o);
  if (r || i !== 126 || (s = (n = t.scanDelims(t.pos, !0)).length, a = String.fromCharCode(i), s < 2))
    return !1;
  for (s % 2 && (t.push("text", "", 0).content = a, s--), e = 0; e < s; e += 2)
    t.push("text", "", 0).content = a + a, t.delimiters.push({ marker: i, length: 0, token: t.tokens.length - 1, end: -1, open: n.can_open, close: n.can_close });
  return t.pos += n.length, !0;
}, kt.postProcess = function(t) {
  var r, e = t.tokens_meta, n = t.tokens_meta.length;
  for (Tr(t, t.delimiters), r = 0; r < n; r++)
    e[r] && e[r].delimiters && Tr(t, e[r].delimiters);
};
var bt = {};
function Mr(t, r) {
  var e, n, s, a, o, i;
  for (e = r.length - 1; e >= 0; e--)
    (n = r[e]).marker !== 95 && n.marker !== 42 || n.end !== -1 && (s = r[n.end], i = e > 0 && r[e - 1].end === n.end + 1 && r[e - 1].marker === n.marker && r[e - 1].token === n.token - 1 && r[n.end + 1].token === s.token + 1, o = String.fromCharCode(n.marker), (a = t.tokens[n.token]).type = i ? "strong_open" : "em_open", a.tag = i ? "strong" : "em", a.nesting = 1, a.markup = i ? o + o : o, a.content = "", (a = t.tokens[s.token]).type = i ? "strong_close" : "em_close", a.tag = i ? "strong" : "em", a.nesting = -1, a.markup = i ? o + o : o, a.content = "", i && (t.tokens[r[e - 1].token].content = "", t.tokens[r[n.end + 1].token].content = "", e--));
}
bt.tokenize = function(t, r) {
  var e, n, s = t.pos, a = t.src.charCodeAt(s);
  if (r || a !== 95 && a !== 42)
    return !1;
  for (n = t.scanDelims(t.pos, a === 42), e = 0; e < n.length; e++)
    t.push("text", "", 0).content = String.fromCharCode(a), t.delimiters.push({ marker: a, length: n.length, token: t.tokens.length - 1, end: -1, open: n.can_open, close: n.can_close });
  return t.pos += n.length, !0;
}, bt.postProcess = function(t) {
  var r, e = t.tokens_meta, n = t.tokens_meta.length;
  for (Mr(t, t.delimiters), r = 0; r < n; r++)
    e[r] && e[r].delimiters && Mr(t, e[r].delimiters);
};
var Sn = x.normalizeReference, Et = x.isSpace, Ln = x.normalizeReference, qt = x.isSpace, Fn = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, zn = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, Tn = _t.HTML_TAG_RE, Ir = ft, Mn = x.has, In = x.isValidEntityCode, Or = x.fromCodePoint, On = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, jn = /^&([a-z][a-z0-9]{1,31});/i;
function jr(t, r) {
  var e, n, s, a, o, i, c, u, l = {}, p = r.length;
  if (p) {
    var h = 0, d = -2, g = [];
    for (e = 0; e < p; e++)
      if (s = r[e], g.push(0), r[h].marker === s.marker && d === s.token - 1 || (h = e), d = s.token, s.length = s.length || 0, s.close) {
        for (l.hasOwnProperty(s.marker) || (l[s.marker] = [-1, -1, -1, -1, -1, -1]), o = l[s.marker][(s.open ? 3 : 0) + s.length % 3], i = n = h - g[h] - 1; n > o; n -= g[n] + 1)
          if ((a = r[n]).marker === s.marker && a.open && a.end < 0 && (c = !1, (a.close || s.open) && (a.length + s.length) % 3 == 0 && (a.length % 3 == 0 && s.length % 3 == 0 || (c = !0)), !c)) {
            u = n > 0 && !r[n - 1].open ? g[n - 1] + 1 : 0, g[e] = e - n + u, g[n] = u, s.open = !1, a.end = e, a.close = !1, i = -1, d = -2;
            break;
          }
        i !== -1 && (l[s.marker][(s.open ? 3 : 0) + (s.length || 0) % 3] = i);
      }
  }
}
var St = Ut, Rr = x.isWhiteSpace, Br = x.isPunctChar, Pr = x.isMdAsciiPunct;
function rt(t, r, e, n) {
  this.src = t, this.env = e, this.md = r, this.tokens = n, this.tokens_meta = Array(n.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
rt.prototype.pushPending = function() {
  var t = new St("text", "", 0);
  return t.content = this.pending, t.level = this.pendingLevel, this.tokens.push(t), this.pending = "", t;
}, rt.prototype.push = function(t, r, e) {
  this.pending && this.pushPending();
  var n = new St(t, r, e), s = null;
  return e < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n.level = this.level, e > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], s = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(n), this.tokens_meta.push(s), n;
}, rt.prototype.scanDelims = function(t, r) {
  var e, n, s, a, o, i, c, u, l, p = t, h = !0, d = !0, g = this.posMax, f = this.src.charCodeAt(t);
  for (e = t > 0 ? this.src.charCodeAt(t - 1) : 32; p < g && this.src.charCodeAt(p) === f; )
    p++;
  return s = p - t, n = p < g ? this.src.charCodeAt(p) : 32, c = Pr(e) || Br(String.fromCharCode(e)), l = Pr(n) || Br(String.fromCharCode(n)), i = Rr(e), (u = Rr(n)) ? h = !1 : l && (i || c || (h = !1)), i ? d = !1 : c && (u || l || (d = !1)), r ? (a = h, o = d) : (a = h && (!d || c), o = d && (!h || l)), { can_open: a, can_close: o, length: s };
}, rt.prototype.Token = St;
var Rn = rt, Nr = Nt, Lt = [["text", function(t, r) {
  for (var e = t.pos; e < t.posMax && !wn(t.src.charCodeAt(e)); )
    e++;
  return e !== t.pos && (r || (t.pending += t.src.slice(t.pos, e)), t.pos = e, !0);
}], ["linkify", function(t, r) {
  var e, n, s, a, o, i, c;
  return !!t.md.options.linkify && !(t.linkLevel > 0) && !((e = t.pos) + 3 > t.posMax) && t.src.charCodeAt(e) === 58 && t.src.charCodeAt(e + 1) === 47 && t.src.charCodeAt(e + 2) === 47 && !!(n = t.pending.match(Dn)) && (s = n[1], !!(a = t.md.linkify.matchAtStart(t.src.slice(e - s.length))) && (o = (o = a.url).replace(/\*+$/, ""), i = t.md.normalizeLink(o), !!t.md.validateLink(i) && (r || (t.pending = t.pending.slice(0, -s.length), (c = t.push("link_open", "a", 1)).attrs = [["href", i]], c.markup = "linkify", c.info = "auto", (c = t.push("text", "", 0)).content = t.md.normalizeLinkText(o), (c = t.push("link_close", "a", -1)).markup = "linkify", c.info = "auto"), t.pos += o.length - s.length, !0)));
}], ["newline", function(t, r) {
  var e, n, s, a = t.pos;
  if (t.src.charCodeAt(a) !== 10)
    return !1;
  if (e = t.pending.length - 1, n = t.posMax, !r)
    if (e >= 0 && t.pending.charCodeAt(e) === 32)
      if (e >= 1 && t.pending.charCodeAt(e - 1) === 32) {
        for (s = e - 1; s >= 1 && t.pending.charCodeAt(s - 1) === 32; )
          s--;
        t.pending = t.pending.slice(0, s), t.push("hardbreak", "br", 0);
      } else
        t.pending = t.pending.slice(0, -1), t.push("softbreak", "br", 0);
    else
      t.push("softbreak", "br", 0);
  for (a++; a < n && En(t.src.charCodeAt(a)); )
    a++;
  return t.pos = a, !0;
}], ["escape", function(t, r) {
  var e, n, s, a, o, i = t.pos, c = t.posMax;
  if (t.src.charCodeAt(i) !== 92 || ++i >= c)
    return !1;
  if ((e = t.src.charCodeAt(i)) === 10) {
    for (r || t.push("hardbreak", "br", 0), i++; i < c && (e = t.src.charCodeAt(i), qn(e)); )
      i++;
    return t.pos = i, !0;
  }
  return a = t.src[i], e >= 55296 && e <= 56319 && i + 1 < c && (n = t.src.charCodeAt(i + 1)) >= 56320 && n <= 57343 && (a += t.src[i + 1], i++), s = "\\" + a, r || (o = t.push("text_special", "", 0), e < 256 && Ht[e] !== 0 ? o.content = a : o.content = s, o.markup = s, o.info = "escape"), t.pos = i + 1, !0;
}], ["backticks", function(t, r) {
  var e, n, s, a, o, i, c, u, l = t.pos;
  if (t.src.charCodeAt(l) !== 96)
    return !1;
  for (e = l, l++, n = t.posMax; l < n && t.src.charCodeAt(l) === 96; )
    l++;
  if (c = (s = t.src.slice(e, l)).length, t.backticksScanned && (t.backticks[c] || 0) <= e)
    return r || (t.pending += s), t.pos += c, !0;
  for (o = i = l; (o = t.src.indexOf("`", i)) !== -1; ) {
    for (i = o + 1; i < n && t.src.charCodeAt(i) === 96; )
      i++;
    if ((u = i - o) === c)
      return r || ((a = t.push("code_inline", "code", 0)).markup = s, a.content = t.src.slice(l, o).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), t.pos = i, !0;
    t.backticks[u] = o;
  }
  return t.backticksScanned = !0, r || (t.pending += s), t.pos += c, !0;
}], ["strikethrough", kt.tokenize], ["emphasis", bt.tokenize], ["link", function(t, r) {
  var e, n, s, a, o, i, c, u, l = "", p = "", h = t.pos, d = t.posMax, g = t.pos, f = !0;
  if (t.src.charCodeAt(t.pos) !== 91 || (o = t.pos + 1, (a = t.md.helpers.parseLinkLabel(t, t.pos, !0)) < 0))
    return !1;
  if ((i = a + 1) < d && t.src.charCodeAt(i) === 40) {
    for (f = !1, i++; i < d && (n = t.src.charCodeAt(i), Et(n) || n === 10); i++)
      ;
    if (i >= d)
      return !1;
    if (g = i, (c = t.md.helpers.parseLinkDestination(t.src, i, t.posMax)).ok) {
      for (l = t.md.normalizeLink(c.str), t.md.validateLink(l) ? i = c.pos : l = "", g = i; i < d && (n = t.src.charCodeAt(i), Et(n) || n === 10); i++)
        ;
      if (c = t.md.helpers.parseLinkTitle(t.src, i, t.posMax), i < d && g !== i && c.ok)
        for (p = c.str, i = c.pos; i < d && (n = t.src.charCodeAt(i), Et(n) || n === 10); i++)
          ;
    }
    (i >= d || t.src.charCodeAt(i) !== 41) && (f = !0), i++;
  }
  if (f) {
    if (t.env.references === void 0)
      return !1;
    if (i < d && t.src.charCodeAt(i) === 91 ? (g = i + 1, (i = t.md.helpers.parseLinkLabel(t, i)) >= 0 ? s = t.src.slice(g, i++) : i = a + 1) : i = a + 1, s || (s = t.src.slice(o, a)), !(u = t.env.references[Sn(s)]))
      return t.pos = h, !1;
    l = u.href, p = u.title;
  }
  return r || (t.pos = o, t.posMax = a, t.push("link_open", "a", 1).attrs = e = [["href", l]], p && e.push(["title", p]), t.linkLevel++, t.md.inline.tokenize(t), t.linkLevel--, t.push("link_close", "a", -1)), t.pos = i, t.posMax = d, !0;
}], ["image", function(t, r) {
  var e, n, s, a, o, i, c, u, l, p, h, d, g, f = "", _ = t.pos, m = t.posMax;
  if (t.src.charCodeAt(t.pos) !== 33 || t.src.charCodeAt(t.pos + 1) !== 91 || (i = t.pos + 2, (o = t.md.helpers.parseLinkLabel(t, t.pos + 1, !1)) < 0))
    return !1;
  if ((c = o + 1) < m && t.src.charCodeAt(c) === 40) {
    for (c++; c < m && (n = t.src.charCodeAt(c), qt(n) || n === 10); c++)
      ;
    if (c >= m)
      return !1;
    for (g = c, (l = t.md.helpers.parseLinkDestination(t.src, c, t.posMax)).ok && (f = t.md.normalizeLink(l.str), t.md.validateLink(f) ? c = l.pos : f = ""), g = c; c < m && (n = t.src.charCodeAt(c), qt(n) || n === 10); c++)
      ;
    if (l = t.md.helpers.parseLinkTitle(t.src, c, t.posMax), c < m && g !== c && l.ok)
      for (p = l.str, c = l.pos; c < m && (n = t.src.charCodeAt(c), qt(n) || n === 10); c++)
        ;
    else
      p = "";
    if (c >= m || t.src.charCodeAt(c) !== 41)
      return t.pos = _, !1;
    c++;
  } else {
    if (t.env.references === void 0)
      return !1;
    if (c < m && t.src.charCodeAt(c) === 91 ? (g = c + 1, (c = t.md.helpers.parseLinkLabel(t, c)) >= 0 ? a = t.src.slice(g, c++) : c = o + 1) : c = o + 1, a || (a = t.src.slice(i, o)), !(u = t.env.references[Ln(a)]))
      return t.pos = _, !1;
    f = u.href, p = u.title;
  }
  return r || (s = t.src.slice(i, o), t.md.inline.parse(s, t.md, t.env, d = []), (h = t.push("image", "img", 0)).attrs = e = [["src", f], ["alt", ""]], h.children = d, h.content = s, p && e.push(["title", p])), t.pos = c, t.posMax = m, !0;
}], ["autolink", function(t, r) {
  var e, n, s, a, o, i, c = t.pos;
  if (t.src.charCodeAt(c) !== 60)
    return !1;
  for (o = t.pos, i = t.posMax; ; ) {
    if (++c >= i || (a = t.src.charCodeAt(c)) === 60)
      return !1;
    if (a === 62)
      break;
  }
  return e = t.src.slice(o + 1, c), zn.test(e) ? (n = t.md.normalizeLink(e), !!t.md.validateLink(n) && (r || ((s = t.push("link_open", "a", 1)).attrs = [["href", n]], s.markup = "autolink", s.info = "auto", (s = t.push("text", "", 0)).content = t.md.normalizeLinkText(e), (s = t.push("link_close", "a", -1)).markup = "autolink", s.info = "auto"), t.pos += e.length + 2, !0)) : !!Fn.test(e) && (n = t.md.normalizeLink("mailto:" + e), !!t.md.validateLink(n) && (r || ((s = t.push("link_open", "a", 1)).attrs = [["href", n]], s.markup = "autolink", s.info = "auto", (s = t.push("text", "", 0)).content = t.md.normalizeLinkText(e), (s = t.push("link_close", "a", -1)).markup = "autolink", s.info = "auto"), t.pos += e.length + 2, !0));
}], ["html_inline", function(t, r) {
  var e, n, s, a, o, i = t.pos;
  return !!t.md.options.html && (s = t.posMax, !(t.src.charCodeAt(i) !== 60 || i + 2 >= s) && !((e = t.src.charCodeAt(i + 1)) !== 33 && e !== 63 && e !== 47 && !function(c) {
    var u = 32 | c;
    return u >= 97 && u <= 122;
  }(e)) && !!(n = t.src.slice(i).match(Tn)) && (r || ((a = t.push("html_inline", "", 0)).content = t.src.slice(i, i + n[0].length), o = a.content, /^<a[>\s]/i.test(o) && t.linkLevel++, function(c) {
    return /^<\/a\s*>/i.test(c);
  }(a.content) && t.linkLevel--), t.pos += n[0].length, !0));
}], ["entity", function(t, r) {
  var e, n, s, a = t.pos, o = t.posMax;
  if (t.src.charCodeAt(a) !== 38 || a + 1 >= o)
    return !1;
  if (t.src.charCodeAt(a + 1) === 35) {
    if (n = t.src.slice(a).match(On))
      return r || (e = n[1][0].toLowerCase() === "x" ? parseInt(n[1].slice(1), 16) : parseInt(n[1], 10), (s = t.push("text_special", "", 0)).content = In(e) ? Or(e) : Or(65533), s.markup = n[0], s.info = "entity"), t.pos += n[0].length, !0;
  } else if ((n = t.src.slice(a).match(jn)) && Mn(Ir, n[1]))
    return r || ((s = t.push("text_special", "", 0)).content = Ir[n[1]], s.markup = n[0], s.info = "entity"), t.pos += n[0].length, !0;
  return !1;
}]], Ft = [["balance_pairs", function(t) {
  var r, e = t.tokens_meta, n = t.tokens_meta.length;
  for (jr(0, t.delimiters), r = 0; r < n; r++)
    e[r] && e[r].delimiters && jr(0, e[r].delimiters);
}], ["strikethrough", kt.postProcess], ["emphasis", bt.postProcess], ["fragments_join", function(t) {
  var r, e, n = 0, s = t.tokens, a = t.tokens.length;
  for (r = e = 0; r < a; r++)
    s[r].nesting < 0 && n--, s[r].level = n, s[r].nesting > 0 && n++, s[r].type === "text" && r + 1 < a && s[r + 1].type === "text" ? s[r + 1].content = s[r].content + s[r + 1].content : (r !== e && (s[e] = s[r]), e++);
  r !== e && (s.length = e);
}]];
function et() {
  var t;
  for (this.ruler = new Nr(), t = 0; t < Lt.length; t++)
    this.ruler.push(Lt[t][0], Lt[t][1]);
  for (this.ruler2 = new Nr(), t = 0; t < Ft.length; t++)
    this.ruler2.push(Ft[t][0], Ft[t][1]);
}
et.prototype.skipToken = function(t) {
  var r, e, n = t.pos, s = this.ruler.getRules(""), a = s.length, o = t.md.options.maxNesting, i = t.cache;
  if (i[n] === void 0) {
    if (t.level < o)
      for (e = 0; e < a && (t.level++, r = s[e](t, !0), t.level--, !r); e++)
        ;
    else
      t.pos = t.posMax;
    r || t.pos++, i[n] = t.pos;
  } else
    t.pos = i[n];
}, et.prototype.tokenize = function(t) {
  for (var r, e, n = this.ruler.getRules(""), s = n.length, a = t.posMax, o = t.md.options.maxNesting; t.pos < a; ) {
    if (t.level < o)
      for (e = 0; e < s && !(r = n[e](t, !1)); e++)
        ;
    if (r) {
      if (t.pos >= a)
        break;
    } else
      t.pending += t.src[t.pos++];
  }
  t.pending && t.pushPending();
}, et.prototype.parse = function(t, r, e, n) {
  var s, a, o, i = new this.State(t, r, e, n);
  for (this.tokenize(i), o = (a = this.ruler2.getRules("")).length, s = 0; s < o; s++)
    a[s](i);
}, et.prototype.State = Rn;
var Ur, Hr, Bn = et;
function Pn() {
  return Hr ? Ur : (Hr = 1, Ur = function(t) {
    var r = {};
    t = t || {}, r.src_Any = ee().source, r.src_Cc = ne().source, r.src_Z = se().source, r.src_P = Pt.source, r.src_ZPCc = [r.src_Z, r.src_P, r.src_Cc].join("|"), r.src_ZCc = [r.src_Z, r.src_Cc].join("|");
    var e = "[><｜]";
    return r.src_pseudo_letter = "(?:(?![><｜]|" + r.src_ZPCc + ")" + r.src_Any + ")", r.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", r.src_auth = "(?:(?:(?!" + r.src_ZCc + "|[@/\\[\\]()]).)+@)?", r.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", r.src_host_terminator = "(?=$|[><｜]|" + r.src_ZPCc + ")(?!" + (t["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + r.src_ZPCc + "))", r.src_path = "(?:[/?#](?:(?!" + r.src_ZCc + "|" + e + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + r.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + r.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + r.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + r.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + r.src_ZCc + "|[']).)+\\'|\\'(?=" + r.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + r.src_ZCc + "|[.]|$)|" + (t["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + r.src_ZCc + "|$)|;(?!" + r.src_ZCc + "|$)|\\!+(?!" + r.src_ZCc + "|[!]|$)|\\?(?!" + r.src_ZCc + "|[?]|$))+|\\/)?", r.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', r.src_xn = "xn--[a-z0-9\\-]{1,59}", r.src_domain_root = "(?:" + r.src_xn + "|" + r.src_pseudo_letter + "{1,63})", r.src_domain = "(?:" + r.src_xn + "|(?:" + r.src_pseudo_letter + ")|(?:" + r.src_pseudo_letter + "(?:-|" + r.src_pseudo_letter + "){0,61}" + r.src_pseudo_letter + "))", r.src_host = "(?:(?:(?:(?:" + r.src_domain + ")\\.)*" + r.src_domain + "))", r.tpl_host_fuzzy = "(?:" + r.src_ip4 + "|(?:(?:(?:" + r.src_domain + ")\\.)+(?:%TLDS%)))", r.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + r.src_domain + ")\\.)+(?:%TLDS%))", r.src_host_strict = r.src_host + r.src_host_terminator, r.tpl_host_fuzzy_strict = r.tpl_host_fuzzy + r.src_host_terminator, r.src_host_port_strict = r.src_host + r.src_port + r.src_host_terminator, r.tpl_host_port_fuzzy_strict = r.tpl_host_fuzzy + r.src_port + r.src_host_terminator, r.tpl_host_port_no_ip_fuzzy_strict = r.tpl_host_no_ip_fuzzy + r.src_port + r.src_host_terminator, r.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + r.src_ZPCc + "|>|$))", r.tpl_email_fuzzy = '(^|[><｜]|"|\\(|' + r.src_ZCc + ")(" + r.src_email_name + "@" + r.tpl_host_fuzzy_strict + ")", r.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + r.src_ZPCc + "))((?![$+<=>^`|｜])" + r.tpl_host_port_fuzzy_strict + r.src_path + ")", r.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + r.src_ZPCc + "))((?![$+<=>^`|｜])" + r.tpl_host_port_no_ip_fuzzy_strict + r.src_path + ")", r;
  });
}
function jt(t) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(r) {
    r && Object.keys(r).forEach(function(e) {
      t[e] = r[e];
    });
  }), t;
}
function ht(t) {
  return Object.prototype.toString.call(t);
}
function Vr(t) {
  return ht(t) === "[object Function]";
}
function Nn(t) {
  return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var $r = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 }, Un = { "http:": { validate: function(t, r, e) {
  var n = t.slice(r);
  return e.re.http || (e.re.http = new RegExp("^\\/\\/" + e.re.src_auth + e.re.src_host_port_strict + e.re.src_path, "i")), e.re.http.test(n) ? n.match(e.re.http)[0].length : 0;
} }, "https:": "http:", "ftp:": "http:", "//": { validate: function(t, r, e) {
  var n = t.slice(r);
  return e.re.no_http || (e.re.no_http = new RegExp("^" + e.re.src_auth + "(?:localhost|(?:(?:" + e.re.src_domain + ")\\.)+" + e.re.src_domain_root + ")" + e.re.src_port + e.re.src_host_terminator + e.re.src_path, "i")), e.re.no_http.test(n) ? r >= 3 && t[r - 3] === ":" || r >= 3 && t[r - 3] === "/" ? 0 : n.match(e.re.no_http)[0].length : 0;
} }, "mailto:": { validate: function(t, r, e) {
  var n = t.slice(r);
  return e.re.mailto || (e.re.mailto = new RegExp("^" + e.re.src_email_name + "@" + e.re.src_host_strict, "i")), e.re.mailto.test(n) ? n.match(e.re.mailto)[0].length : 0;
} } }, Hn = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Vn = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function pt(t) {
  var r = t.re = Pn()(t.__opts__), e = t.__tlds__.slice();
  function n(i) {
    return i.replace("%TLDS%", r.src_tlds);
  }
  t.onCompile(), t.__tlds_replaced__ || e.push(Hn), e.push(r.src_xn), r.src_tlds = e.join("|"), r.email_fuzzy = RegExp(n(r.tpl_email_fuzzy), "i"), r.link_fuzzy = RegExp(n(r.tpl_link_fuzzy), "i"), r.link_no_ip_fuzzy = RegExp(n(r.tpl_link_no_ip_fuzzy), "i"), r.host_fuzzy_test = RegExp(n(r.tpl_host_fuzzy_test), "i");
  var s = [];
  function a(i, c) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + c);
  }
  t.__compiled__ = {}, Object.keys(t.__schemas__).forEach(function(i) {
    var c = t.__schemas__[i];
    if (c !== null) {
      var u = { validate: null, link: null };
      if (t.__compiled__[i] = u, ht(c) === "[object Object]")
        return function(l) {
          return ht(l) === "[object RegExp]";
        }(c.validate) ? u.validate = function(l) {
          return function(p, h) {
            var d = p.slice(h);
            return l.test(d) ? d.match(l)[0].length : 0;
          };
        }(c.validate) : Vr(c.validate) ? u.validate = c.validate : a(i, c), void (Vr(c.normalize) ? u.normalize = c.normalize : c.normalize ? a(i, c) : u.normalize = function(l, p) {
          p.normalize(l);
        });
      (function(l) {
        return ht(l) === "[object String]";
      })(c) ? s.push(i) : a(i, c);
    }
  }), s.forEach(function(i) {
    t.__compiled__[t.__schemas__[i]] && (t.__compiled__[i].validate = t.__compiled__[t.__schemas__[i]].validate, t.__compiled__[i].normalize = t.__compiled__[t.__schemas__[i]].normalize);
  }), t.__compiled__[""] = { validate: null, normalize: function(i, c) {
    c.normalize(i);
  } };
  var o = Object.keys(t.__compiled__).filter(function(i) {
    return i.length > 0 && t.__compiled__[i];
  }).map(Nn).join("|");
  t.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + r.src_ZPCc + "))(" + o + ")", "i"), t.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + r.src_ZPCc + "))(" + o + ")", "ig"), t.re.schema_at_start = RegExp("^" + t.re.schema_search.source, "i"), t.re.pretest = RegExp("(" + t.re.schema_test.source + ")|(" + t.re.host_fuzzy_test.source + ")|@", "i"), function(i) {
    i.__index__ = -1, i.__text_cache__ = "";
  }(t);
}
function $n(t, r) {
  var e = t.__index__, n = t.__last_index__, s = t.__text_cache__.slice(e, n);
  this.schema = t.__schema__.toLowerCase(), this.index = e + r, this.lastIndex = n + r, this.raw = s, this.text = s, this.url = s;
}
function zt(t, r) {
  var e = new $n(t, r);
  return t.__compiled__[e.schema].normalize(e, t), e;
}
function F(t, r) {
  if (!(this instanceof F))
    return new F(t, r);
  var e;
  r || (e = t, Object.keys(e || {}).reduce(function(n, s) {
    return n || $r.hasOwnProperty(s);
  }, !1) && (r = t, t = {})), this.__opts__ = jt({}, $r, r), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = jt({}, Un, t), this.__compiled__ = {}, this.__tlds__ = Vn, this.__tlds_replaced__ = !1, this.re = {}, pt(this);
}
F.prototype.add = function(t, r) {
  return this.__schemas__[t] = r, pt(this), this;
}, F.prototype.set = function(t) {
  return this.__opts__ = jt(this.__opts__, t), this;
}, F.prototype.test = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length)
    return !1;
  var r, e, n, s, a, o, i, c;
  if (this.re.schema_test.test(t)) {
    for ((i = this.re.schema_search).lastIndex = 0; (r = i.exec(t)) !== null; )
      if (s = this.testSchemaAt(t, r[2], i.lastIndex)) {
        this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + s;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = t.search(this.re.host_fuzzy_test)) >= 0 && (this.__index__ < 0 || c < this.__index__) && (e = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (a = e.index + e[1].length, (this.__index__ < 0 || a < this.__index__) && (this.__schema__ = "", this.__index__ = a, this.__last_index__ = e.index + e[0].length)), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && t.indexOf("@") >= 0 && (n = t.match(this.re.email_fuzzy)) !== null && (a = n.index + n[1].length, o = n.index + n[0].length, (this.__index__ < 0 || a < this.__index__ || a === this.__index__ && o > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = a, this.__last_index__ = o)), this.__index__ >= 0;
}, F.prototype.pretest = function(t) {
  return this.re.pretest.test(t);
}, F.prototype.testSchemaAt = function(t, r, e) {
  return this.__compiled__[r.toLowerCase()] ? this.__compiled__[r.toLowerCase()].validate(t, e, this) : 0;
}, F.prototype.match = function(t) {
  var r = 0, e = [];
  this.__index__ >= 0 && this.__text_cache__ === t && (e.push(zt(this, r)), r = this.__last_index__);
  for (var n = r ? t.slice(r) : t; this.test(n); )
    e.push(zt(this, r)), n = n.slice(this.__last_index__), r += this.__last_index__;
  return e.length ? e : null;
}, F.prototype.matchAtStart = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length)
    return null;
  var r = this.re.schema_at_start.exec(t);
  if (!r)
    return null;
  var e = this.testSchemaAt(t, r[2], r[0].length);
  return e ? (this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + e, zt(this, 0)) : null;
}, F.prototype.tlds = function(t, r) {
  return t = Array.isArray(t) ? t : [t], r ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function(e, n, s) {
    return e !== s[n - 1];
  }).reverse(), pt(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, pt(this), this);
}, F.prototype.normalize = function(t) {
  t.schema || (t.url = "http://" + t.url), t.schema !== "mailto:" || /^mailto:/i.test(t.url) || (t.url = "mailto:" + t.url);
}, F.prototype.onCompile = function() {
};
var Zn = F;
const tt = 2147483647, N = 36, Gn = /^xn--/, Wn = /[^\0-\x7F]/, Jn = /[\x2E\u3002\uFF0E\uFF61]/g, Yn = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, B = Math.floor, Tt = String.fromCharCode;
function V(t) {
  throw new RangeError(Yn[t]);
}
function ue(t, r) {
  const e = t.split("@");
  let n = "";
  e.length > 1 && (n = e[0] + "@", t = e[1]);
  const s = function(a, o) {
    const i = [];
    let c = a.length;
    for (; c--; )
      i[c] = o(a[c]);
    return i;
  }((t = t.replace(Jn, ".")).split("."), r).join(".");
  return n + s;
}
function Vt(t) {
  const r = [];
  let e = 0;
  const n = t.length;
  for (; e < n; ) {
    const s = t.charCodeAt(e++);
    if (s >= 55296 && s <= 56319 && e < n) {
      const a = t.charCodeAt(e++);
      (64512 & a) == 56320 ? r.push(((1023 & s) << 10) + (1023 & a) + 65536) : (r.push(s), e--);
    } else
      r.push(s);
  }
  return r;
}
const he = (t) => String.fromCodePoint(...t), Zr = function(t, r) {
  return t + 22 + 75 * (t < 26) - ((r != 0) << 5);
}, pe = function(t, r, e) {
  let n = 0;
  for (t = e ? B(t / 700) : t >> 1, t += B(t / r); t > 455; n += N)
    t = B(t / 35);
  return B(n + 36 * t / (t + 38));
}, $t = function(t) {
  const r = [], e = t.length;
  let n = 0, s = 128, a = 72, o = t.lastIndexOf("-");
  o < 0 && (o = 0);
  for (let c = 0; c < o; ++c)
    t.charCodeAt(c) >= 128 && V("not-basic"), r.push(t.charCodeAt(c));
  for (let c = o > 0 ? o + 1 : 0; c < e; ) {
    const u = n;
    for (let p = 1, h = N; ; h += N) {
      c >= e && V("invalid-input");
      const d = (i = t.charCodeAt(c++)) >= 48 && i < 58 ? i - 48 + 26 : i >= 65 && i < 91 ? i - 65 : i >= 97 && i < 123 ? i - 97 : N;
      d >= N && V("invalid-input"), d > B((tt - n) / p) && V("overflow"), n += d * p;
      const g = h <= a ? 1 : h >= a + 26 ? 26 : h - a;
      if (d < g)
        break;
      const f = N - g;
      p > B(tt / f) && V("overflow"), p *= f;
    }
    const l = r.length + 1;
    a = pe(n - u, l, u == 0), B(n / l) > tt - s && V("overflow"), s += B(n / l), n %= l, r.splice(n++, 0, s);
  }
  var i;
  return String.fromCodePoint(...r);
}, Zt = function(t) {
  const r = [], e = (t = Vt(t)).length;
  let n = 128, s = 0, a = 72;
  for (const c of t)
    c < 128 && r.push(Tt(c));
  const o = r.length;
  let i = o;
  for (o && r.push("-"); i < e; ) {
    let c = tt;
    for (const l of t)
      l >= n && l < c && (c = l);
    const u = i + 1;
    c - n > B((tt - s) / u) && V("overflow"), s += (c - n) * u, n = c;
    for (const l of t)
      if (l < n && ++s > tt && V("overflow"), l === n) {
        let p = s;
        for (let h = N; ; h += N) {
          const d = h <= a ? 1 : h >= a + 26 ? 26 : h - a;
          if (p < d)
            break;
          const g = p - d, f = N - d;
          r.push(Tt(Zr(d + g % f, 0))), p = B(g / f);
        }
        r.push(Tt(Zr(p, 0))), a = pe(s, u, i === o), s = 0, ++i;
      }
    ++s, ++n;
  }
  return r.join("");
}, fe = function(t) {
  return ue(t, function(r) {
    return Gn.test(r) ? $t(r.slice(4).toLowerCase()) : r;
  });
}, de = function(t) {
  return ue(t, function(r) {
    return Wn.test(r) ? "xn--" + Zt(r) : r;
  });
}, Kn = { version: "2.1.0", ucs2: { decode: Vt, encode: he }, decode: $t, encode: Zt, toASCII: de, toUnicode: fe }, Qn = Object.freeze(Object.defineProperty({ __proto__: null, decode: $t, default: Kn, encode: Zt, toASCII: de, toUnicode: fe, ucs2decode: Vt, ucs2encode: he }, Symbol.toStringTag, { value: "Module" }));
var nt = x, Xn = ct, ts = Qe, rs = gn, es = An, ns = Bn, ss = Zn, Z = X, ge = Oe(Qn), is = { default: { options: { html: !1, xhtmlOut: !1, breaks: !1, langPrefix: "language-", linkify: !1, typographer: !1, quotes: "“”‘’", highlight: null, maxNesting: 100 }, components: { core: {}, block: {}, inline: {} } }, zero: { options: { html: !1, xhtmlOut: !1, breaks: !1, langPrefix: "language-", linkify: !1, typographer: !1, quotes: "“”‘’", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline", "text_join"] }, block: { rules: ["paragraph"] }, inline: { rules: ["text"], rules2: ["balance_pairs", "fragments_join"] } } }, commonmark: { options: { html: !0, xhtmlOut: !0, breaks: !1, langPrefix: "language-", linkify: !1, typographer: !1, quotes: "“”‘’", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline", "text_join"] }, block: { rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"] }, inline: { rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"], rules2: ["balance_pairs", "emphasis", "fragments_join"] } } } }, os = /^(vbscript|javascript|file|data):/, as = /^data:image\/(gif|png|jpeg|webp);/;
function cs(t) {
  var r = t.trim().toLowerCase();
  return !os.test(r) || !!as.test(r);
}
var me = ["http:", "https:", "mailto:"];
function ls(t) {
  var r = Z.parse(t, !0);
  if (r.hostname && (!r.protocol || me.indexOf(r.protocol) >= 0))
    try {
      r.hostname = ge.toASCII(r.hostname);
    } catch {
    }
  return Z.encode(Z.format(r));
}
function us(t) {
  var r = Z.parse(t, !0);
  if (r.hostname && (!r.protocol || me.indexOf(r.protocol) >= 0))
    try {
      r.hostname = ge.toUnicode(r.hostname);
    } catch {
    }
  return Z.decode(Z.format(r), Z.decode.defaultChars + "%");
}
function z(t, r) {
  if (!(this instanceof z))
    return new z(t, r);
  r || nt.isString(t) || (r = t || {}, t = "default"), this.inline = new ns(), this.block = new es(), this.core = new rs(), this.renderer = new ts(), this.linkify = new ss(), this.validateLink = cs, this.normalizeLink = ls, this.normalizeLinkText = us, this.utils = nt, this.helpers = nt.assign({}, Xn), this.options = {}, this.configure(t), r && this.set(r);
}
z.prototype.set = function(t) {
  return nt.assign(this.options, t), this;
}, z.prototype.configure = function(t) {
  var r, e = this;
  if (nt.isString(t) && !(t = is[r = t]))
    throw new Error('Wrong `markdown-it` preset "' + r + '", check name');
  if (!t)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return t.options && e.set(t.options), t.components && Object.keys(t.components).forEach(function(n) {
    t.components[n].rules && e[n].ruler.enableOnly(t.components[n].rules), t.components[n].rules2 && e[n].ruler2.enableOnly(t.components[n].rules2);
  }), this;
}, z.prototype.enable = function(t, r) {
  var e = [];
  Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(s) {
    e = e.concat(this[s].ruler.enable(t, !0));
  }, this), e = e.concat(this.inline.ruler2.enable(t, !0));
  var n = t.filter(function(s) {
    return e.indexOf(s) < 0;
  });
  if (n.length && !r)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
  return this;
}, z.prototype.disable = function(t, r) {
  var e = [];
  Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(s) {
    e = e.concat(this[s].ruler.disable(t, !0));
  }, this), e = e.concat(this.inline.ruler2.disable(t, !0));
  var n = t.filter(function(s) {
    return e.indexOf(s) < 0;
  });
  if (n.length && !r)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
  return this;
}, z.prototype.use = function(t) {
  var r = [this].concat(Array.prototype.slice.call(arguments, 1));
  return t.apply(t, r), this;
}, z.prototype.parse = function(t, r) {
  if (typeof t != "string")
    throw new Error("Input data should be a String");
  var e = new this.core.State(t, this, r);
  return this.core.process(e), e.tokens;
}, z.prototype.render = function(t, r) {
  return r = r || {}, this.renderer.render(this.parse(t, r), this.options, r);
}, z.prototype.parseInline = function(t, r) {
  var e = new this.core.State(t, this, r);
  return e.inlineMode = !0, this.core.process(e), e.tokens;
}, z.prototype.renderInline = function(t, r) {
  return r = r || {}, this.renderer.render(this.parseInline(t, r), this.options, r);
};
var hs = z;
je.exports = hs;
function Gr(t, r) {
  for (let e = r.length - 1; e >= 0; e--) {
    const n = r[e];
    if (![95, 42].includes(n.marker) || n.end === -1)
      continue;
    const s = r[n.end];
    let a = String.fromCharCode(n.marker), o = a === "_";
    const i = e > 0 && r[e - 1].marker === n.marker && r[e - 1].end === n.end + 1 && r[e - 1].token === n.token - 1 && r[n.end + 1].token === s.token + 1;
    let c = t.tokens[n.token];
    const u = 2 * i + o;
    c.type = ["mark", "em", "strong", "under"][u] + "_open", c.tag = ["mark", "em", "strong", "u"][u], c.nesting = 1, c.markup = i ? a + a : a, c.content = "", c = t.tokens[s.token], c.type = ["mark", "em", "strong", "under"][u] + "_close", c.tag = ["mark", "em", "strong", "u"][u], c.nesting = -1, c.markup = i ? a + a : a, c.content = "", i && (t.tokens[r[e - 1].token].content = "", t.tokens[r[n.end + 1].token].content = "", e--);
  }
}
function ps(t) {
  let r, e = t.tokens_meta, n = t.tokens_meta.length;
  for (Gr(t, t.delimiters), r = 0; r < n; r++)
    e[r] && e[r].delimiters && Gr(t, e[r].delimiters);
}
var Wr = !0, _e = !1, ke = !1;
function Jr(t, r, e) {
  var n = t.attrIndex(r), s = [r, e];
  n < 0 ? t.attrPush(s) : t.attrs[n] = s;
}
function fs(t, r) {
  for (var e = t[r].level - 1, n = r - 1; n >= 0; n--)
    if (t[n].level === e)
      return n;
  return -1;
}
function ds(t, r) {
  return function(e) {
    return e.type === "inline";
  }(t[r]) && function(e) {
    return e.type === "paragraph_open";
  }(t[r - 1]) && function(e) {
    return e.type === "list_item_open";
  }(t[r - 2]) && function(e) {
    return e.content.indexOf("[ ]") === 0 || e.content.indexOf("[x]") === 0 || e.content.indexOf("[X]") === 0 || e.content.indexOf("( )") === 0 || e.content.indexOf("(o)") === 0 || e.content.indexOf("(O)") === 0;
  }(t[r]);
}
function gs(t, r) {
  if (t.children.unshift(function(n, s) {
    var a = new s("html_inline", "", 0);
    const o = /(?=\[[ _xX]\]|\([ _oO]\))([\[\(])([ _xXoO])[\]\)](?:([a-z]+)(?:=([a-z]+))?)?/g;
    let i = [...n.content.matchAll(o)];
    i.reverse();
    for (const c of i) {
      const [u, l, p, h, d] = c, { index: g } = c, f = u.length, _ = `<input type="${l === "[" ? "checkbox" : "radio"}" />`;
      n.content = n.content.slice(g, f), console.log(g, u, l, p, h, d), a.content += _;
    }
    return a;
  }(t, r)), t.children[1].content = t.children[1].content.slice(3), t.content = t.content.slice(3), _e)
    if (ke) {
      t.children.pop();
      var e = "task-item-" + Math.ceil(1e7 * Math.random() - 1e3);
      t.children[0].content = t.children[0].content.slice(0, -1) + ' id="' + e + '">', t.children.push(function(n, s, a) {
        var o = new a("html_inline", "", 0);
        return o.content = '<label class="task-list-item-label" for="' + s + '">' + n + "</label>", o.attrs = [{ for: s }], o;
      }(t.content, e, r));
    } else
      t.children.unshift(function(n) {
        var s = new n("html_inline", "", 0);
        return s.content = "<label>", s;
      }(r)), t.children.push(function(n) {
        var s = new n("html_inline", "", 0);
        return s.content = "</label>", s;
      }(r));
}
let ms = new (Ie(It))({ html: !0, xhtmlOut: !0, breaks: !1, linkify: !0, highlight: function(t, r) {
  if (r && Jt.getLanguage(r))
    try {
      return Jt.highlight(t, { language: r }).value;
    } catch {
    }
  return "";
} }).use(function(t) {
  t.inline.ruler2.at("emphasis", ps);
}).use(function(t, r) {
  r && (Wr = !r.enabled, _e = !!r.label, ke = !!r.labelAfter), t.core.ruler.after("inline", "github-task-lists", function(e) {
    for (var n = e.tokens, s = 2; s < n.length; s++)
      ds(n, s) && (gs(n[s], e.Token), Jr(n[s - 2], "class", "task-list-item" + (Wr ? "" : " enabled")), Jr(n[fs(n, s - 2)], "class", "contains-task-list"));
  });
}, { enabled: !0 });
function Yr(t) {
  if (!t)
    return;
  const r = t.innerHTML.replace(/style="zoom: 1;"/gi, "").replace(/<[\/]?div\s*>/gi, `
`).replace(/<br\s*[\/]?>/gi, `
`);
  var e = new DOMParser().parseFromString("<!doctype html><body>" + r, "text/html").body.textContent;
  const n = ms.render(e);
  t.innerHTML = n;
}
const _s = Object.freeze(Object.defineProperty({ __proto__: null, _50_markdownize: function() {
  Yr(document.querySelector("header")), Yr(document.querySelector("footer"));
} }, Symbol.toStringTag, { value: "Module" }));
let be;
const ks = { attributes: !1, childList: !0, subtree: !0 };
let Rt;
const bs = Object.freeze(Object.defineProperty({ __proto__: null, _00_observer: function() {
  Rt.disconnect();
}, _99_observer: function() {
  Rt.observe(be, ks);
} }, Symbol.toStringTag, { value: "Module" }));
let vs = document.querySelector("#qa");
const ys = Object.freeze(Object.defineProperty({ __proto__: null, _10_flip: function() {
  vs.classList.add("qa");
} }, Symbol.toStringTag, { value: "Module" })), Cs = Object.freeze(Object.defineProperty({ __proto__: null, _50_tags: function() {
  let t = document.querySelector(".tags");
  t.classList.contains("tagged") || t && (t.innerHTML = t.innerHTML.split(" ").filter((r) => r !== "").map((r) => `<li style="--tagcolor:${re(te(r))}">${r}</li>`).join(""), t.classList.add("tagged"));
} }, Symbol.toStringTag, { value: "Module" })), xs = Object.assign({ "./modules/background.js": Fe, "./modules/breadcrumb.js": ze, "./modules/flip.js": Me, "./modules/markdownize.js": _s, "./modules/observer.js": bs, "./modules/style.js": ys, "./modules/tags.js": Cs }), As = (Mt = Object.assign({}, ...Object.values(xs)), Object.keys(Mt).sort().reduce((t, r) => (t[r] = Mt[r], t), {}));
var Mt, Kr;
function Qr() {
  Object.values(As).forEach((t) => t());
}
Kr = document.getElementById("qa"), be = Kr, Rt = new MutationObserver(Qr), Qr();
