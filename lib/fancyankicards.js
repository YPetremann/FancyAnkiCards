import dn from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
function gn(u) {
  var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  u = u.replace(t, function(n, r, o, s) {
    return r + r + o + o + s + s;
  });
  var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(u);
  return e ? {
    r: parseInt(e[1], 16),
    g: parseInt(e[2], 16),
    b: parseInt(e[3], 16)
  } : null;
}
function tr(u) {
  return "#" + ["r", "g", "b"].map(function(t) {
    return ("0" + u[t].toString(16)).slice(-2);
  }).join("");
}
function nr(u) {
  var t = u.r, e = u.g, n = u.b;
  t /= 255, e /= 255, n /= 255;
  var r = Math.max(t, e, n), o = Math.min(t, e, n), s, c, i = (r + o) / 2;
  if (r === o)
    s = c = 0;
  else {
    var a = r - o;
    switch (c = i > 0.5 ? a / (2 - r - o) : a / (r + o), r) {
      case t:
        s = (e - n) / a + (e < n ? 6 : 0);
        break;
      case e:
        s = (n - t) / a + 2;
        break;
      case n:
        s = (t - e) / a + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: c, l: i };
}
function er(u) {
  function t(l, f, m) {
    return m < 0 && (m += 1), m > 1 && (m -= 1), m < 1 / 6 ? l + (f - l) * 6 * m : m < 1 / 2 ? f : m < 2 / 3 ? l + (f - l) * (2 / 3 - m) * 6 : l;
  }
  var e = u.h, n = u.s, r = u.l, o, s, c;
  if (n === 0)
    o = s = c = r;
  else {
    var i = r < 0.5 ? r * (1 + n) : r + n - r * n, a = 2 * r - i;
    o = t(a, i, e + 1 / 3), s = t(a, i, e), c = t(a, i, e - 1 / 3);
  }
  return {
    r: Math.round(o * 255),
    g: Math.round(s * 255),
    b: Math.round(c * 255)
  };
}
function rr(u) {
  return "rgb(" + [u.r, u.g, u.b].join(",") + ")";
}
function mn() {
  var u = 1732584193, t = 4023233417, e = 2562383102, n = 271733878, r = 3285377520, o = new Uint32Array(80), s = 0, c = 24, i = 0;
  function a() {
    for (var _ = 16; _ < 80; _++) {
      var y = o[_ - 3] ^ o[_ - 8] ^ o[_ - 14] ^ o[_ - 16];
      o[_] = y << 1 | y >>> 31;
    }
    var d = u, k = t, p = e, g = n, b = r, x, q;
    for (_ = 0; _ < 80; _++) {
      _ < 20 ? (x = g ^ k & (p ^ g), q = 1518500249) : _ < 40 ? (x = k ^ p ^ g, q = 1859775393) : _ < 60 ? (x = k & p | g & (k | p), q = 2400959708) : (x = k ^ p ^ g, q = 3395469782);
      var C = (d << 5 | d >>> 27) + x + b + q + (o[_] | 0);
      b = g, g = p, p = k << 30 | k >>> 2, k = d, d = C;
    }
    for (u = u + d | 0, t = t + k | 0, e = e + p | 0, n = n + g | 0, r = r + b | 0, s = 0, _ = 0; _ < 16; _++)
      o[_] = 0;
  }
  function l(_) {
    o[s] |= (_ & 255) << c, c ? c -= 8 : (s++, c = 24), s === 16 && a();
  }
  function f(_) {
    var y = _.length;
    i += y * 8;
    for (var d = 0; d < y; d++)
      l(_.charCodeAt(d));
  }
  function m(_) {
    if (typeof _ == "string")
      return f(_);
    var y = _.length;
    i += y * 8;
    for (var d = 0; d < y; d++)
      l(_[d]);
  }
  function h(_) {
    for (var y = "", d = 28; d >= 0; d -= 4)
      y += (_ >> d & 15).toString(16);
    return y;
  }
  function v() {
    l(128), (s > 14 || s === 14 && c < 24) && a(), s = 14, c = 24, l(0), l(0), l(i > 1099511627775 ? i / 1099511627776 : 0), l(i > 4294967295 ? i / 4294967296 : 0);
    for (var _ = 24; _ >= 0; _ -= 8)
      l(i >> _);
    return h(u) + h(t) + h(e) + h(n) + h(r);
  }
  return { update: m, digest: v };
}
function or(u) {
  if (u === void 0)
    return mn();
  var t = mn();
  return t.update(u), t.digest();
}
class H {
  constructor(t) {
    return this instanceof H ? (this.tagName = t, this.attributes = /* @__PURE__ */ Object.create(null), this.children = [], this.lastChild = null, this) : new H(t);
  }
  appendChild(t) {
    return this.children.push(t), this.lastChild = t, this;
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  toString() {
    var t = this;
    return [
      "<",
      t.tagName,
      Object.keys(t.attributes).map(function(e) {
        return [" ", e, '="', t.attributes[e], '"'].join("");
      }).join(""),
      ">",
      t.children.map(function(e) {
        return e.toString();
      }).join(""),
      "</",
      t.tagName,
      ">"
    ].join("");
  }
}
class sr {
  constructor() {
    return this.width = 100, this.height = 100, this.svg = new H("svg"), this.context = [], this.setAttributes(this.svg, {
      xmlns: "http://www.w3.org/2000/svg",
      width: this.width,
      height: this.height
    }), this;
  }
  // This is a hack so groups work.
  currentContext() {
    return this.context[this.context.length - 1] || this.svg;
  }
  // This is a hack so groups work.
  end() {
    return this.context.pop(), this;
  }
  currentNode() {
    var t = this.currentContext();
    return t.lastChild || t;
  }
  transform(t) {
    return this.currentNode().setAttribute(
      "transform",
      Object.keys(t).map(function(e) {
        return e + "(" + t[e].join(",") + ")";
      }).join(" ")
    ), this;
  }
  setAttributes(t, e) {
    Object.keys(e).forEach(function(n) {
      t.setAttribute(n, e[n]);
    });
  }
  setWidth(t) {
    this.svg.setAttribute("width", Math.floor(t));
  }
  setHeight(t) {
    this.svg.setAttribute("height", Math.floor(t));
  }
  toString() {
    return this.svg.toString();
  }
  rect(t, e, n, r, o) {
    var s = this;
    if (Array.isArray(t))
      return t.forEach(function(i) {
        s.rect.apply(s, i.concat(o));
      }), this;
    var c = new H("rect");
    return this.currentContext().appendChild(c), this.setAttributes(
      c,
      Object.assign(
        {
          x: t,
          y: e,
          width: n,
          height: r
        },
        o
      )
    ), this;
  }
  circle(t, e, n, r) {
    var o = new H("circle");
    return this.currentContext().appendChild(o), this.setAttributes(
      o,
      Object.assign(
        {
          cx: t,
          cy: e,
          r: n
        },
        r
      )
    ), this;
  }
  path(t, e) {
    var n = new H("path");
    return this.currentContext().appendChild(n), this.setAttributes(
      n,
      Object.assign(
        {
          d: t
        },
        e
      )
    ), this;
  }
  polyline(t, e) {
    var n = this;
    if (Array.isArray(t))
      return t.forEach(function(o) {
        n.polyline(o, e);
      }), this;
    var r = new H("polyline");
    return this.currentContext().appendChild(r), this.setAttributes(
      r,
      Object.assign(
        {
          points: t
        },
        e
      )
    ), this;
  }
  // group and context are hacks
  group(t) {
    var e = new H("g");
    return this.currentContext().appendChild(e), this.context.push(e), this.setAttributes(e, Object.assign({}, t)), this;
  }
}
var cr = {
  baseColor: "#933c3c"
}, _n = [
  "octogons",
  "overlappingCircles",
  "plusSigns",
  "xes",
  "sineWaves",
  "hexagons",
  "overlappingRings",
  "plaid",
  "triangles",
  "squares",
  "concentricCircles",
  "diamonds",
  "tessellation",
  "nestedSquares",
  "mosaicSquares",
  "chevrons"
], ir = "#222", ar = "#ddd", j = "#000", N = 0.02, lr = 0.02, ur = 0.15;
function S(u, t, e) {
  return parseInt(u.substr(t, e || 1), 16);
}
function z(u, t, e, n, r) {
  var o = parseFloat(u), s = e - t, c = r - n;
  return (o - t) * c / s + n;
}
function L(u) {
  return u % 2 === 0 ? ar : ir;
}
function I(u) {
  return z(u, 0, 15, lr, ur);
}
class fr {
  constructor(t, e) {
    return this.opts = Object.assign({}, cr, e), this.hash = e.hash || or(t), this.svg = new sr(), this.generateBackground(), this.generatePattern(), this;
  }
  toSvg() {
    return this.svg.toString();
  }
  toString() {
    return this.toSvg();
  }
  toBase64() {
    var t = this.toSvg(), e;
    return typeof window < "u" && typeof window.btoa == "function" ? e = window.btoa(t) : e = new Buffer(t).toString("base64"), e;
  }
  toDataUri() {
    return "data:image/svg+xml;base64," + this.toBase64();
  }
  toDataUrl() {
    return 'url("' + this.toDataUri() + '")';
  }
  generateBackground() {
    var t, e, n, r;
    this.opts.color ? n = gn(this.opts.color) : (e = z(S(this.hash, 14, 3), 0, 4095, 0, 359), r = S(this.hash, 17), t = nr(gn(this.opts.baseColor)), t.h = (t.h * 360 - e + 360) % 360 / 360, r % 2 === 0 ? t.s = Math.min(1, (t.s * 100 + r) / 100) : t.s = Math.max(0, (t.s * 100 - r) / 100), n = er(t)), this.color = tr(n), this.svg.rect(0, 0, "100%", "100%", {
      fill: rr(n)
    });
  }
  generatePattern() {
    var t = this.opts.generator;
    if (t) {
      if (_n.indexOf(t) < 0)
        throw new Error("The generator " + t + " does not exist.");
    } else
      t = _n[S(this.hash, 20)];
    return this["geo" + t.slice(0, 1).toUpperCase() + t.slice(1)]();
  }
  geoHexagons() {
    var t = S(this.hash, 0), e = z(t, 0, 15, 8, 60), n = e * Math.sqrt(3), r = e * 2, o = hr(e), s, c, i, a, l, f, m, h;
    for (this.svg.setWidth(r * 3 + e * 3), this.svg.setHeight(n * 6), i = 0, h = 0; h < 6; h++)
      for (m = 0; m < 6; m++)
        f = S(this.hash, i), s = m % 2 === 0 ? h * n : h * n + n / 2, a = I(f), c = L(f), l = {
          fill: c,
          "fill-opacity": a,
          stroke: j,
          "stroke-opacity": N
        }, this.svg.polyline(o, l).transform({
          translate: [m * e * 1.5 - r / 2, s - n / 2]
        }), m === 0 && this.svg.polyline(o, l).transform({
          translate: [
            6 * e * 1.5 - r / 2,
            s - n / 2
          ]
        }), h === 0 && (s = m % 2 === 0 ? 6 * n : 6 * n + n / 2, this.svg.polyline(o, l).transform({
          translate: [
            m * e * 1.5 - r / 2,
            s - n / 2
          ]
        })), m === 0 && h === 0 && this.svg.polyline(o, l).transform({
          translate: [
            6 * e * 1.5 - r / 2,
            5 * n + n / 2
          ]
        }), i++;
  }
  geoSineWaves() {
    var t = Math.floor(z(S(this.hash, 0), 0, 15, 100, 400)), e = Math.floor(z(S(this.hash, 1), 0, 15, 30, 100)), n = Math.floor(z(S(this.hash, 2), 0, 15, 3, 30)), r, o, s, c, i, a, l;
    for (this.svg.setWidth(t), this.svg.setHeight(n * 36), o = 0; o < 36; o++)
      a = S(this.hash, o), s = I(a), r = L(a), l = t / 4 * 0.7, i = {
        fill: "none",
        stroke: r,
        opacity: s,
        "stroke-width": "" + n + "px"
      }, c = "M0 " + e + " C " + l + " 0, " + (t / 2 - l) + " 0, " + t / 2 + " " + e + " S " + (t - l) + " " + e * 2 + ", " + t + " " + e + " S " + (t * 1.5 - l) + " 0, " + t * 1.5 + ", " + e, this.svg.path(c, i).transform({
        translate: [-t / 4, n * o - e * 1.5]
      }), this.svg.path(c, i).transform({
        translate: [
          -t / 4,
          n * o - e * 1.5 + n * 36
        ]
      });
  }
  geoChevrons() {
    var t = z(S(this.hash, 0), 0, 15, 30, 80), e = z(S(this.hash, 0), 0, 15, 30, 80), n = pr(t, e), r, o, s, c, i, a, l;
    for (this.svg.setWidth(t * 6), this.svg.setHeight(e * 6 * 0.66), o = 0, l = 0; l < 6; l++)
      for (a = 0; a < 6; a++)
        i = S(this.hash, o), s = I(i), r = L(i), c = {
          stroke: j,
          "stroke-opacity": N,
          fill: r,
          "fill-opacity": s,
          "stroke-width": 1
        }, this.svg.group(c).transform({
          translate: [
            a * t,
            l * e * 0.66 - e / 2
          ]
        }).polyline(n).end(), l === 0 && this.svg.group(c).transform({
          translate: [
            a * t,
            6 * e * 0.66 - e / 2
          ]
        }).polyline(n).end(), o += 1;
  }
  geoPlusSigns() {
    var t = z(S(this.hash, 0), 0, 15, 10, 25), e = t * 3, n = vn(t), r, o, s, c, i, a, l, f;
    for (this.svg.setWidth(t * 12), this.svg.setHeight(t * 12), s = 0, f = 0; f < 6; f++)
      for (l = 0; l < 6; l++)
        a = S(this.hash, s), c = I(a), o = L(a), r = f % 2 === 0 ? 0 : 1, i = {
          fill: o,
          stroke: j,
          "stroke-opacity": N,
          "fill-opacity": c
        }, this.svg.group(i).transform({
          translate: [
            l * e - l * t + r * t - t,
            f * e - f * t - e / 2
          ]
        }).rect(n).end(), l === 0 && this.svg.group(i).transform({
          translate: [
            4 * e - l * t + r * t - t,
            f * e - f * t - e / 2
          ]
        }).rect(n).end(), f === 0 && this.svg.group(i).transform({
          translate: [
            l * e - l * t + r * t - t,
            4 * e - f * t - e / 2
          ]
        }).rect(n).end(), l === 0 && f === 0 && this.svg.group(i).transform({
          translate: [
            4 * e - l * t + r * t - t,
            4 * e - f * t - e / 2
          ]
        }).rect(n).end(), s++;
  }
  geoXes() {
    var t = z(S(this.hash, 0), 0, 15, 10, 25), e = vn(t), n = t * 3 * 0.943, r, o, s, c, i, a, l, f;
    for (this.svg.setWidth(n * 3), this.svg.setHeight(n * 3), s = 0, f = 0; f < 6; f++)
      for (l = 0; l < 6; l++)
        a = S(this.hash, s), c = I(a), r = l % 2 === 0 ? f * n - n * 0.5 : f * n - n * 0.5 + n / 4, o = L(a), i = {
          fill: o,
          opacity: c
        }, this.svg.group(i).transform({
          translate: [l * n / 2 - n / 2, r - f * n / 2],
          rotate: [45, n / 2, n / 2]
        }).rect(e).end(), l === 0 && this.svg.group(i).transform({
          translate: [6 * n / 2 - n / 2, r - f * n / 2],
          rotate: [45, n / 2, n / 2]
        }).rect(e).end(), f === 0 && (r = l % 2 === 0 ? 6 * n - n / 2 : 6 * n - n / 2 + n / 4, this.svg.group(i).transform({
          translate: [l * n / 2 - n / 2, r - 6 * n / 2],
          rotate: [45, n / 2, n / 2]
        }).rect(e).end()), f === 5 && this.svg.group(i).transform({
          translate: [l * n / 2 - n / 2, r - 11 * n / 2],
          rotate: [45, n / 2, n / 2]
        }).rect(e).end(), l === 0 && f === 0 && this.svg.group(i).transform({
          translate: [6 * n / 2 - n / 2, r - 6 * n / 2],
          rotate: [45, n / 2, n / 2]
        }).rect(e).end(), s++;
  }
  geoOverlappingCircles() {
    var t = S(this.hash, 0), e = z(t, 0, 15, 25, 200), n = e / 2, r, o, s, c, i, a, l;
    for (this.svg.setWidth(n * 6), this.svg.setHeight(n * 6), o = 0, l = 0; l < 6; l++)
      for (a = 0; a < 6; a++)
        i = S(this.hash, o), s = I(i), r = L(i), c = {
          fill: r,
          opacity: s
        }, this.svg.circle(a * n, l * n, n, c), a === 0 && this.svg.circle(6 * n, l * n, n, c), l === 0 && this.svg.circle(a * n, 6 * n, n, c), a === 0 && l === 0 && this.svg.circle(6 * n, 6 * n, n, c), o++;
  }
  geoOctogons() {
    var t = z(S(this.hash, 0), 0, 15, 10, 60), e = dr(t), n, r, o, s, c, i;
    for (this.svg.setWidth(t * 6), this.svg.setHeight(t * 6), r = 0, i = 0; i < 6; i++)
      for (c = 0; c < 6; c++)
        s = S(this.hash, r), o = I(s), n = L(s), this.svg.polyline(e, {
          fill: n,
          "fill-opacity": o,
          stroke: j,
          "stroke-opacity": N
        }).transform({
          translate: [c * t, i * t]
        }), r += 1;
  }
  geoSquares() {
    var t = z(S(this.hash, 0), 0, 15, 10, 60), e, n, r, o, s, c;
    for (this.svg.setWidth(t * 6), this.svg.setHeight(t * 6), n = 0, c = 0; c < 6; c++)
      for (s = 0; s < 6; s++)
        o = S(this.hash, n), r = I(o), e = L(o), this.svg.rect(s * t, c * t, t, t, {
          fill: e,
          "fill-opacity": r,
          stroke: j,
          "stroke-opacity": N
        }), n += 1;
  }
  geoConcentricCircles() {
    var t = S(this.hash, 0), e = z(t, 0, 15, 10, 60), n = e / 5, r, o, s, c, i, a;
    for (this.svg.setWidth((e + n) * 6), this.svg.setHeight((e + n) * 6), o = 0, a = 0; a < 6; a++)
      for (i = 0; i < 6; i++)
        c = S(this.hash, o), s = I(c), r = L(c), this.svg.circle(
          i * e + i * n + (e + n) / 2,
          a * e + a * n + (e + n) / 2,
          e / 2,
          {
            fill: "none",
            stroke: r,
            opacity: s,
            "stroke-width": n + "px"
          }
        ), c = S(this.hash, 39 - o), s = I(c), r = L(c), this.svg.circle(
          i * e + i * n + (e + n) / 2,
          a * e + a * n + (e + n) / 2,
          e / 4,
          {
            fill: r,
            "fill-opacity": s
          }
        ), o += 1;
  }
  geoOverlappingRings() {
    var t = S(this.hash, 0), e = z(t, 0, 15, 10, 60), n = e / 4, r, o, s, c, i, a, l;
    for (this.svg.setWidth(e * 6), this.svg.setHeight(e * 6), o = 0, l = 0; l < 6; l++)
      for (a = 0; a < 6; a++)
        i = S(this.hash, o), s = I(i), r = L(i), c = {
          fill: "none",
          stroke: r,
          opacity: s,
          "stroke-width": n + "px"
        }, this.svg.circle(
          a * e,
          l * e,
          e - n / 2,
          c
        ), a === 0 && this.svg.circle(
          6 * e,
          l * e,
          e - n / 2,
          c
        ), l === 0 && this.svg.circle(
          a * e,
          6 * e,
          e - n / 2,
          c
        ), a === 0 && l === 0 && this.svg.circle(
          6 * e,
          6 * e,
          e - n / 2,
          c
        ), o += 1;
  }
  geoTriangles() {
    var t = S(this.hash, 0), e = z(t, 0, 15, 15, 80), n = e / 2 * Math.sqrt(3), r = gr(e, n), o, s, c, i, a, l, f, m;
    for (this.svg.setWidth(e * 3), this.svg.setHeight(n * 6), s = 0, m = 0; m < 6; m++)
      for (f = 0; f < 6; f++)
        l = S(this.hash, s), c = I(l), o = L(l), a = {
          fill: o,
          "fill-opacity": c,
          stroke: j,
          "stroke-opacity": N
        }, m % 2 === 0 ? i = f % 2 === 0 ? 180 : 0 : i = f % 2 !== 0 ? 180 : 0, this.svg.polyline(r, a).transform({
          translate: [
            f * e * 0.5 - e / 2,
            n * m
          ],
          rotate: [i, e / 2, n / 2]
        }), f === 0 && this.svg.polyline(r, a).transform({
          translate: [
            6 * e * 0.5 - e / 2,
            n * m
          ],
          rotate: [i, e / 2, n / 2]
        }), s += 1;
  }
  geoDiamonds() {
    var t = z(S(this.hash, 0), 0, 15, 10, 50), e = z(S(this.hash, 1), 0, 15, 10, 50), n = mr(t, e), r, o, s, c, i, a, l, f;
    for (this.svg.setWidth(t * 6), this.svg.setHeight(e * 3), s = 0, f = 0; f < 6; f++)
      for (l = 0; l < 6; l++)
        a = S(this.hash, s), c = I(a), o = L(a), i = {
          fill: o,
          "fill-opacity": c,
          stroke: j,
          "stroke-opacity": N
        }, r = f % 2 === 0 ? 0 : t / 2, this.svg.polyline(n, i).transform({
          translate: [
            l * t - t / 2 + r,
            e / 2 * f - e / 2
          ]
        }), l === 0 && this.svg.polyline(n, i).transform({
          translate: [
            6 * t - t / 2 + r,
            e / 2 * f - e / 2
          ]
        }), f === 0 && this.svg.polyline(n, i).transform({
          translate: [
            l * t - t / 2 + r,
            e / 2 * 6 - e / 2
          ]
        }), l === 0 && f === 0 && this.svg.polyline(n, i).transform({
          translate: [
            6 * t - t / 2 + r,
            e / 2 * 6 - e / 2
          ]
        }), s += 1;
  }
  geoNestedSquares() {
    var t = z(S(this.hash, 0), 0, 15, 4, 12), e = t * 7, n, r, o, s, c, i, a;
    for (this.svg.setWidth((e + t) * 6 + t * 6), this.svg.setHeight((e + t) * 6 + t * 6), r = 0, a = 0; a < 6; a++)
      for (i = 0; i < 6; i++)
        c = S(this.hash, r), o = I(c), n = L(c), s = {
          fill: "none",
          stroke: n,
          opacity: o,
          "stroke-width": t + "px"
        }, this.svg.rect(
          i * e + i * t * 2 + t / 2,
          a * e + a * t * 2 + t / 2,
          e,
          e,
          s
        ), c = S(this.hash, 39 - r), o = I(c), n = L(c), s = {
          fill: "none",
          stroke: n,
          opacity: o,
          "stroke-width": t + "px"
        }, this.svg.rect(
          i * e + i * t * 2 + t / 2 + t * 2,
          a * e + a * t * 2 + t / 2 + t * 2,
          t * 3,
          t * 3,
          s
        ), r += 1;
  }
  geoMosaicSquares() {
    var t = z(S(this.hash, 0), 0, 15, 15, 50), e, n, r;
    for (this.svg.setWidth(t * 8), this.svg.setHeight(t * 8), e = 0, r = 0; r < 4; r++)
      for (n = 0; n < 4; n++)
        n % 2 === 0 ? r % 2 === 0 ? bn(
          this.svg,
          n * t * 2,
          r * t * 2,
          t,
          S(this.hash, e)
        ) : kn(
          this.svg,
          n * t * 2,
          r * t * 2,
          t,
          [S(this.hash, e), S(this.hash, e + 1)]
        ) : r % 2 === 0 ? kn(
          this.svg,
          n * t * 2,
          r * t * 2,
          t,
          [S(this.hash, e), S(this.hash, e + 1)]
        ) : bn(
          this.svg,
          n * t * 2,
          r * t * 2,
          t,
          S(this.hash, e)
        ), e += 1;
  }
  geoPlaid() {
    var t = 0, e = 0, n, r, o, s, c, i, a;
    for (r = 0; r < 36; )
      s = S(this.hash, r), t += s + 5, a = S(this.hash, r + 1), o = I(a), n = L(a), c = a + 5, this.svg.rect(0, t, "100%", c, {
        opacity: o,
        fill: n
      }), t += c, r += 2;
    for (r = 0; r < 36; )
      s = S(this.hash, r), e += s + 5, a = S(this.hash, r + 1), o = I(a), n = L(a), i = a + 5, this.svg.rect(e, 0, i, "100%", {
        opacity: o,
        fill: n
      }), e += i, r += 2;
    this.svg.setWidth(e), this.svg.setHeight(t);
  }
  geoTessellation() {
    var t = z(S(this.hash, 0), 0, 15, 5, 40), e = t * Math.sqrt(3), n = t * 2, r = t / 2 * Math.sqrt(3), o = _r(t, r), s = t * 3 + r * 2, c = e * 2 + t * 2, i, a, l, f, m;
    for (this.svg.setWidth(s), this.svg.setHeight(c), a = 0; a < 20; a++)
      switch (m = S(this.hash, a), l = I(m), i = L(m), f = {
        stroke: j,
        "stroke-opacity": N,
        fill: i,
        "fill-opacity": l,
        "stroke-width": 1
      }, a) {
        case 0:
          this.svg.rect(
            -t / 2,
            -t / 2,
            t,
            t,
            f
          ), this.svg.rect(
            s - t / 2,
            -t / 2,
            t,
            t,
            f
          ), this.svg.rect(
            -t / 2,
            c - t / 2,
            t,
            t,
            f
          ), this.svg.rect(
            s - t / 2,
            c - t / 2,
            t,
            t,
            f
          );
          break;
        case 1:
          this.svg.rect(
            n / 2 + r,
            e / 2,
            t,
            t,
            f
          );
          break;
        case 2:
          this.svg.rect(
            -t / 2,
            c / 2 - t / 2,
            t,
            t,
            f
          ), this.svg.rect(
            s - t / 2,
            c / 2 - t / 2,
            t,
            t,
            f
          );
          break;
        case 3:
          this.svg.rect(
            n / 2 + r,
            e * 1.5 + t,
            t,
            t,
            f
          );
          break;
        case 4:
          this.svg.polyline(o, f).transform({
            translate: [t / 2, -t / 2],
            rotate: [0, t / 2, r / 2]
          }), this.svg.polyline(o, f).transform({
            translate: [t / 2, c - -t / 2],
            rotate: [0, t / 2, r / 2],
            scale: [1, -1]
          });
          break;
        case 5:
          this.svg.polyline(o, f).transform({
            translate: [s - t / 2, -t / 2],
            rotate: [0, t / 2, r / 2],
            scale: [-1, 1]
          }), this.svg.polyline(o, f).transform({
            translate: [
              s - t / 2,
              c + t / 2
            ],
            rotate: [0, t / 2, r / 2],
            scale: [-1, -1]
          });
          break;
        case 6:
          this.svg.polyline(o, f).transform({
            translate: [s / 2 + t / 2, e / 2]
          });
          break;
        case 7:
          this.svg.polyline(o, f).transform({
            translate: [
              s - s / 2 - t / 2,
              e / 2
            ],
            scale: [-1, 1]
          });
          break;
        case 8:
          this.svg.polyline(o, f).transform({
            translate: [
              s / 2 + t / 2,
              c - e / 2
            ],
            scale: [1, -1]
          });
          break;
        case 9:
          this.svg.polyline(o, f).transform({
            translate: [
              s - s / 2 - t / 2,
              c - e / 2
            ],
            scale: [-1, -1]
          });
          break;
        case 10:
          this.svg.polyline(o, f).transform({
            translate: [t / 2, c / 2 - t / 2]
          });
          break;
        case 11:
          this.svg.polyline(o, f).transform({
            translate: [
              s - t / 2,
              c / 2 - t / 2
            ],
            scale: [-1, 1]
          });
          break;
        case 12:
          this.svg.rect(0, 0, t, t, f).transform({
            translate: [t / 2, t / 2],
            rotate: [-30, 0, 0]
          });
          break;
        case 13:
          this.svg.rect(0, 0, t, t, f).transform({
            scale: [-1, 1],
            translate: [-s + t / 2, t / 2],
            rotate: [-30, 0, 0]
          });
          break;
        case 14:
          this.svg.rect(0, 0, t, t, f).transform({
            translate: [
              t / 2,
              c / 2 - t / 2 - t
            ],
            rotate: [30, 0, t]
          });
          break;
        case 15:
          this.svg.rect(0, 0, t, t, f).transform({
            scale: [-1, 1],
            translate: [
              -s + t / 2,
              c / 2 - t / 2 - t
            ],
            rotate: [30, 0, t]
          });
          break;
        case 16:
          this.svg.rect(0, 0, t, t, f).transform({
            scale: [1, -1],
            translate: [
              t / 2,
              -c + c / 2 - t / 2 - t
            ],
            rotate: [30, 0, t]
          });
          break;
        case 17:
          this.svg.rect(0, 0, t, t, f).transform({
            scale: [-1, -1],
            translate: [
              -s + t / 2,
              -c + c / 2 - t / 2 - t
            ],
            rotate: [30, 0, t]
          });
          break;
        case 18:
          this.svg.rect(0, 0, t, t, f).transform({
            scale: [1, -1],
            translate: [t / 2, -c + t / 2],
            rotate: [-30, 0, 0]
          });
          break;
        case 19:
          this.svg.rect(0, 0, t, t, f).transform({
            scale: [-1, -1],
            translate: [
              -s + t / 2,
              -c + t / 2
            ],
            rotate: [-30, 0, 0]
          });
          break;
      }
  }
}
function hr(u) {
  var t = u, e = t / 2, n = Math.sin(60 * Math.PI / 180) * t;
  return [0, n, e, 0, e + t, 0, 2 * t, n, e + t, 2 * n, e, 2 * n, 0, n].join(
    ","
  );
}
function pr(u, t) {
  var e = t * 0.66;
  return [
    [0, 0, u / 2, t - e, u / 2, t, 0, e, 0, 0],
    [
      u / 2,
      t - e,
      u,
      0,
      u,
      e,
      u / 2,
      t,
      u / 2,
      t - e
    ]
  ].map(function(n) {
    return n.join(",");
  });
}
function vn(u) {
  return [
    [u, 0, u, u * 3],
    [0, u, u * 3, u]
  ];
}
function dr(u) {
  var t = u, e = t * 0.33;
  return [
    e,
    0,
    t - e,
    0,
    t,
    e,
    t,
    t - e,
    t - e,
    t,
    e,
    t,
    0,
    t - e,
    0,
    e,
    e,
    0
  ].join(",");
}
function gr(u, t) {
  var e = u / 2;
  return [e, 0, u, t, 0, t, e, 0].join(",");
}
function mr(u, t) {
  return [
    u / 2,
    0,
    u,
    t / 2,
    u / 2,
    t,
    0,
    t / 2
  ].join(",");
}
function je(u) {
  return [0, 0, u, u, 0, u, 0, 0].join(",");
}
function kn(u, t, e, n, r) {
  var o = je(n), s = I(r[0]), c = L(r[0]), i = {
    stroke: j,
    "stroke-opacity": N,
    "fill-opacity": s,
    fill: c
  };
  u.polyline(o, i).transform({
    translate: [t + n, e],
    scale: [-1, 1]
  }), u.polyline(o, i).transform({
    translate: [t + n, e + n * 2],
    scale: [1, -1]
  }), s = I(r[1]), c = L(r[1]), i = {
    stroke: j,
    "stroke-opacity": N,
    "fill-opacity": s,
    fill: c
  }, u.polyline(o, i).transform({
    translate: [t + n, e + n * 2],
    scale: [-1, -1]
  }), u.polyline(o, i).transform({
    translate: [t + n, e],
    scale: [1, 1]
  });
}
function bn(u, t, e, n, r) {
  var o = I(r), s = L(r), c = je(n), i = {
    stroke: j,
    "stroke-opacity": N,
    "fill-opacity": o,
    fill: s
  };
  u.polyline(c, i).transform({
    translate: [t, e + n],
    scale: [1, -1]
  }), u.polyline(c, i).transform({
    translate: [t + n * 2, e + n],
    scale: [-1, -1]
  }), u.polyline(c, i).transform({
    translate: [t, e + n],
    scale: [1, 1]
  }), u.polyline(c, i).transform({
    translate: [t + n * 2, e + n],
    scale: [-1, 1]
  });
}
function _r(u, t) {
  var e = u / 2;
  return [0, 0, t, e, 0, u, 0, 0].join(",");
}
function vr(u) {
  return function(t, e) {
    return typeof t == "object" && (e = t, t = null), t == null && (t = (/* @__PURE__ */ new Date()).toString()), e || (e = {}), u.call(this, t, e);
  };
}
const kr = {
  generate: vr(function(u, t) {
    return new fr(u, t);
  })
};
function br() {
  let u = document.querySelector("#qa").parentElement, t = document.querySelector(".breadcrumb");
  var e = kr.generate(t.innerHTML);
  u.style = `--image: ${e.toDataUrl()}`, u.classList.add("--module-background"), console.log("background installed");
}
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _50_background: br
}, Symbol.toStringTag, { value: "Module" }));
function yr(u) {
  return u.split("").reduce((t, e) => (t = (t << 5) - t + e.charCodeAt(0), t & t), 0);
}
function Ne(u) {
  return "#" + Math.abs(yr(u)).toString(16).slice(0, 6).padEnd(6, "0");
}
function He(u) {
  return u.replace(/0/g, "C").replace(/1/g, "D").replace(/2/g, "E").replace(/3/g, "F").replace(/4/g, "C").replace(/5/g, "D").replace(/6/g, "E").replace(/7/g, "F").replace(/8/g, "C").replace(/9/g, "D").replace(/A/g, "E").replace(/B/g, "F");
}
function Cr() {
  let u = document.querySelector("#qa"), t = document.querySelector("#qa .breadcrumb");
  t && (t.innerHTML = t.innerHTML.split("::").join(" :: "), u.style = `--deckcolor:${He(Ne(t.innerHTML))};`, console.log("breadcrumb installed"));
}
const Ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _50_breadcrumb: Cr
}, Symbol.toStringTag, { value: "Module" }));
let Q = document.getElementById("qa"), G = Q.parentElement, Ue = document.createElement("div");
Ue.id = "shadow";
Q.after(Ue);
function qr() {
  console.log("clone");
  const u = document.getElementById("shadow"), t = Q.cloneNode(!0);
  t.id = "shadow", t.classList.add("hidden"), u.parentElement.replaceChild(t, u), console.log("flip ended");
}
function wr() {
  Q.classList.add("qa"), console.log("flip init");
}
function Er() {
  document.getElementById("shadow").classList.remove("hidden"), G.classList.contains("front") ? G.classList.contains("back") || (G.classList.add("back"), G.classList.remove("front")) : (G.classList.remove("back"), G.classList.add("front")), Q.addEventListener("animationend", qr, { once: !0 }), console.log("flip started");
}
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _10_flip: wr,
  _70_flip: Er
}, Symbol.toStringTag, { value: "Module" }));
function Sr(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
function Fr(u) {
  if (u.__esModule) return u;
  var t = u.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(u).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(u, n);
    Object.defineProperty(e, n, r.get ? r : {
      enumerable: !0,
      get: function() {
        return u[n];
      }
    });
  }), e;
}
var et = {};
const Rr = "Á", Tr = "á", Mr = "Ă", zr = "ă", Lr = "∾", Ir = "∿", Pr = "∾̳", Or = "Â", Br = "â", jr = "´", Nr = "А", Hr = "а", Ur = "Æ", $r = "æ", Vr = "⁡", Zr = "𝔄", Gr = "𝔞", Wr = "À", Jr = "à", Yr = "ℵ", Qr = "ℵ", Kr = "Α", Xr = "α", to = "Ā", no = "ā", eo = "⨿", ro = "&", oo = "&", so = "⩕", co = "⩓", io = "∧", ao = "⩜", lo = "⩘", uo = "⩚", fo = "∠", ho = "⦤", po = "∠", go = "⦨", mo = "⦩", _o = "⦪", vo = "⦫", ko = "⦬", bo = "⦭", xo = "⦮", yo = "⦯", Co = "∡", Ao = "∟", qo = "⊾", wo = "⦝", Eo = "∢", Do = "Å", So = "⍼", Fo = "Ą", Ro = "ą", To = "𝔸", Mo = "𝕒", zo = "⩯", Lo = "≈", Io = "⩰", Po = "≊", Oo = "≋", Bo = "'", jo = "⁡", No = "≈", Ho = "≊", Uo = "Å", $o = "å", Vo = "𝒜", Zo = "𝒶", Go = "≔", Wo = "*", Jo = "≈", Yo = "≍", Qo = "Ã", Ko = "ã", Xo = "Ä", ts = "ä", ns = "∳", es = "⨑", rs = "≌", os = "϶", ss = "‵", cs = "∽", is = "⋍", as = "∖", ls = "⫧", us = "⊽", fs = "⌅", hs = "⌆", ps = "⌅", ds = "⎵", gs = "⎶", ms = "≌", _s = "Б", vs = "б", ks = "„", bs = "∵", xs = "∵", ys = "∵", Cs = "⦰", As = "϶", qs = "ℬ", ws = "ℬ", Es = "Β", Ds = "β", Ss = "ℶ", Fs = "≬", Rs = "𝔅", Ts = "𝔟", Ms = "⋂", zs = "◯", Ls = "⋃", Is = "⨀", Ps = "⨁", Os = "⨂", Bs = "⨆", js = "★", Ns = "▽", Hs = "△", Us = "⨄", $s = "⋁", Vs = "⋀", Zs = "⤍", Gs = "⧫", Ws = "▪", Js = "▴", Ys = "▾", Qs = "◂", Ks = "▸", Xs = "␣", tc = "▒", nc = "░", ec = "▓", rc = "█", oc = "=⃥", sc = "≡⃥", cc = "⫭", ic = "⌐", ac = "𝔹", lc = "𝕓", uc = "⊥", fc = "⊥", hc = "⋈", pc = "⧉", dc = "┐", gc = "╕", mc = "╖", _c = "╗", vc = "┌", kc = "╒", bc = "╓", xc = "╔", yc = "─", Cc = "═", Ac = "┬", qc = "╤", wc = "╥", Ec = "╦", Dc = "┴", Sc = "╧", Fc = "╨", Rc = "╩", Tc = "⊟", Mc = "⊞", zc = "⊠", Lc = "┘", Ic = "╛", Pc = "╜", Oc = "╝", Bc = "└", jc = "╘", Nc = "╙", Hc = "╚", Uc = "│", $c = "║", Vc = "┼", Zc = "╪", Gc = "╫", Wc = "╬", Jc = "┤", Yc = "╡", Qc = "╢", Kc = "╣", Xc = "├", ti = "╞", ni = "╟", ei = "╠", ri = "‵", oi = "˘", si = "˘", ci = "¦", ii = "𝒷", ai = "ℬ", li = "⁏", ui = "∽", fi = "⋍", hi = "⧅", pi = "\\", di = "⟈", gi = "•", mi = "•", _i = "≎", vi = "⪮", ki = "≏", bi = "≎", xi = "≏", yi = "Ć", Ci = "ć", Ai = "⩄", qi = "⩉", wi = "⩋", Ei = "∩", Di = "⋒", Si = "⩇", Fi = "⩀", Ri = "ⅅ", Ti = "∩︀", Mi = "⁁", zi = "ˇ", Li = "ℭ", Ii = "⩍", Pi = "Č", Oi = "č", Bi = "Ç", ji = "ç", Ni = "Ĉ", Hi = "ĉ", Ui = "∰", $i = "⩌", Vi = "⩐", Zi = "Ċ", Gi = "ċ", Wi = "¸", Ji = "¸", Yi = "⦲", Qi = "¢", Ki = "·", Xi = "·", ta = "𝔠", na = "ℭ", ea = "Ч", ra = "ч", oa = "✓", sa = "✓", ca = "Χ", ia = "χ", aa = "ˆ", la = "≗", ua = "↺", fa = "↻", ha = "⊛", pa = "⊚", da = "⊝", ga = "⊙", ma = "®", _a = "Ⓢ", va = "⊖", ka = "⊕", ba = "⊗", xa = "○", ya = "⧃", Ca = "≗", Aa = "⨐", qa = "⫯", wa = "⧂", Ea = "∲", Da = "”", Sa = "’", Fa = "♣", Ra = "♣", Ta = ":", Ma = "∷", za = "⩴", La = "≔", Ia = "≔", Pa = ",", Oa = "@", Ba = "∁", ja = "∘", Na = "∁", Ha = "ℂ", Ua = "≅", $a = "⩭", Va = "≡", Za = "∮", Ga = "∯", Wa = "∮", Ja = "𝕔", Ya = "ℂ", Qa = "∐", Ka = "∐", Xa = "©", tl = "©", nl = "℗", el = "∳", rl = "↵", ol = "✗", sl = "⨯", cl = "𝒞", il = "𝒸", al = "⫏", ll = "⫑", ul = "⫐", fl = "⫒", hl = "⋯", pl = "⤸", dl = "⤵", gl = "⋞", ml = "⋟", _l = "↶", vl = "⤽", kl = "⩈", bl = "⩆", xl = "≍", yl = "∪", Cl = "⋓", Al = "⩊", ql = "⊍", wl = "⩅", El = "∪︀", Dl = "↷", Sl = "⤼", Fl = "⋞", Rl = "⋟", Tl = "⋎", Ml = "⋏", zl = "¤", Ll = "↶", Il = "↷", Pl = "⋎", Ol = "⋏", Bl = "∲", jl = "∱", Nl = "⌭", Hl = "†", Ul = "‡", $l = "ℸ", Vl = "↓", Zl = "↡", Gl = "⇓", Wl = "‐", Jl = "⫤", Yl = "⊣", Ql = "⤏", Kl = "˝", Xl = "Ď", tu = "ď", nu = "Д", eu = "д", ru = "‡", ou = "⇊", su = "ⅅ", cu = "ⅆ", iu = "⤑", au = "⩷", lu = "°", uu = "∇", fu = "Δ", hu = "δ", pu = "⦱", du = "⥿", gu = "𝔇", mu = "𝔡", _u = "⥥", vu = "⇃", ku = "⇂", bu = "´", xu = "˙", yu = "˝", Cu = "`", Au = "˜", qu = "⋄", wu = "⋄", Eu = "⋄", Du = "♦", Su = "♦", Fu = "¨", Ru = "ⅆ", Tu = "ϝ", Mu = "⋲", zu = "÷", Lu = "÷", Iu = "⋇", Pu = "⋇", Ou = "Ђ", Bu = "ђ", ju = "⌞", Nu = "⌍", Hu = "$", Uu = "𝔻", $u = "𝕕", Vu = "¨", Zu = "˙", Gu = "⃜", Wu = "≐", Ju = "≑", Yu = "≐", Qu = "∸", Ku = "∔", Xu = "⊡", tf = "⌆", nf = "∯", ef = "¨", rf = "⇓", of = "⇐", sf = "⇔", cf = "⫤", af = "⟸", lf = "⟺", uf = "⟹", ff = "⇒", hf = "⊨", pf = "⇑", df = "⇕", gf = "∥", mf = "⤓", _f = "↓", vf = "↓", kf = "⇓", bf = "⇵", xf = "̑", yf = "⇊", Cf = "⇃", Af = "⇂", qf = "⥐", wf = "⥞", Ef = "⥖", Df = "↽", Sf = "⥟", Ff = "⥗", Rf = "⇁", Tf = "↧", Mf = "⊤", zf = "⤐", Lf = "⌟", If = "⌌", Pf = "𝒟", Of = "𝒹", Bf = "Ѕ", jf = "ѕ", Nf = "⧶", Hf = "Đ", Uf = "đ", $f = "⋱", Vf = "▿", Zf = "▾", Gf = "⇵", Wf = "⥯", Jf = "⦦", Yf = "Џ", Qf = "џ", Kf = "⟿", Xf = "É", th = "é", nh = "⩮", eh = "Ě", rh = "ě", oh = "Ê", sh = "ê", ch = "≖", ih = "≕", ah = "Э", lh = "э", uh = "⩷", fh = "Ė", hh = "ė", ph = "≑", dh = "ⅇ", gh = "≒", mh = "𝔈", _h = "𝔢", vh = "⪚", kh = "È", bh = "è", xh = "⪖", yh = "⪘", Ch = "⪙", Ah = "∈", qh = "⏧", wh = "ℓ", Eh = "⪕", Dh = "⪗", Sh = "Ē", Fh = "ē", Rh = "∅", Th = "∅", Mh = "◻", zh = "∅", Lh = "▫", Ih = " ", Ph = " ", Oh = " ", Bh = "Ŋ", jh = "ŋ", Nh = " ", Hh = "Ę", Uh = "ę", $h = "𝔼", Vh = "𝕖", Zh = "⋕", Gh = "⧣", Wh = "⩱", Jh = "ε", Yh = "Ε", Qh = "ε", Kh = "ϵ", Xh = "≖", tp = "≕", np = "≂", ep = "⪖", rp = "⪕", op = "⩵", sp = "=", cp = "≂", ip = "≟", ap = "⇌", lp = "≡", up = "⩸", fp = "⧥", hp = "⥱", pp = "≓", dp = "ℯ", gp = "ℰ", mp = "≐", _p = "⩳", vp = "≂", kp = "Η", bp = "η", xp = "Ð", yp = "ð", Cp = "Ë", Ap = "ë", qp = "€", wp = "!", Ep = "∃", Dp = "∃", Sp = "ℰ", Fp = "ⅇ", Rp = "ⅇ", Tp = "≒", Mp = "Ф", zp = "ф", Lp = "♀", Ip = "ﬃ", Pp = "ﬀ", Op = "ﬄ", Bp = "𝔉", jp = "𝔣", Np = "ﬁ", Hp = "◼", Up = "▪", $p = "fj", Vp = "♭", Zp = "ﬂ", Gp = "▱", Wp = "ƒ", Jp = "𝔽", Yp = "𝕗", Qp = "∀", Kp = "∀", Xp = "⋔", td = "⫙", nd = "ℱ", ed = "⨍", rd = "½", od = "⅓", sd = "¼", cd = "⅕", id = "⅙", ad = "⅛", ld = "⅔", ud = "⅖", fd = "¾", hd = "⅗", pd = "⅜", dd = "⅘", gd = "⅚", md = "⅝", _d = "⅞", vd = "⁄", kd = "⌢", bd = "𝒻", xd = "ℱ", yd = "ǵ", Cd = "Γ", Ad = "γ", qd = "Ϝ", wd = "ϝ", Ed = "⪆", Dd = "Ğ", Sd = "ğ", Fd = "Ģ", Rd = "Ĝ", Td = "ĝ", Md = "Г", zd = "г", Ld = "Ġ", Id = "ġ", Pd = "≥", Od = "≧", Bd = "⪌", jd = "⋛", Nd = "≥", Hd = "≧", Ud = "⩾", $d = "⪩", Vd = "⩾", Zd = "⪀", Gd = "⪂", Wd = "⪄", Jd = "⋛︀", Yd = "⪔", Qd = "𝔊", Kd = "𝔤", Xd = "≫", t0 = "⋙", n0 = "⋙", e0 = "ℷ", r0 = "Ѓ", o0 = "ѓ", s0 = "⪥", c0 = "≷", i0 = "⪒", a0 = "⪤", l0 = "⪊", u0 = "⪊", f0 = "⪈", h0 = "≩", p0 = "⪈", d0 = "≩", g0 = "⋧", m0 = "𝔾", _0 = "𝕘", v0 = "`", k0 = "≥", b0 = "⋛", x0 = "≧", y0 = "⪢", C0 = "≷", A0 = "⩾", q0 = "≳", w0 = "𝒢", E0 = "ℊ", D0 = "≳", S0 = "⪎", F0 = "⪐", R0 = "⪧", T0 = "⩺", M0 = ">", z0 = ">", L0 = "≫", I0 = "⋗", P0 = "⦕", O0 = "⩼", B0 = "⪆", j0 = "⥸", N0 = "⋗", H0 = "⋛", U0 = "⪌", $0 = "≷", V0 = "≳", Z0 = "≩︀", G0 = "≩︀", W0 = "ˇ", J0 = " ", Y0 = "½", Q0 = "ℋ", K0 = "Ъ", X0 = "ъ", tg = "⥈", ng = "↔", eg = "⇔", rg = "↭", og = "^", sg = "ℏ", cg = "Ĥ", ig = "ĥ", ag = "♥", lg = "♥", ug = "…", fg = "⊹", hg = "𝔥", pg = "ℌ", dg = "ℋ", gg = "⤥", mg = "⤦", _g = "⇿", vg = "∻", kg = "↩", bg = "↪", xg = "𝕙", yg = "ℍ", Cg = "―", Ag = "─", qg = "𝒽", wg = "ℋ", Eg = "ℏ", Dg = "Ħ", Sg = "ħ", Fg = "≎", Rg = "≏", Tg = "⁃", Mg = "‐", zg = "Í", Lg = "í", Ig = "⁣", Pg = "Î", Og = "î", Bg = "И", jg = "и", Ng = "İ", Hg = "Е", Ug = "е", $g = "¡", Vg = "⇔", Zg = "𝔦", Gg = "ℑ", Wg = "Ì", Jg = "ì", Yg = "ⅈ", Qg = "⨌", Kg = "∭", Xg = "⧜", tm = "℩", nm = "Ĳ", em = "ĳ", rm = "Ī", om = "ī", sm = "ℑ", cm = "ⅈ", im = "ℐ", am = "ℑ", lm = "ı", um = "ℑ", fm = "⊷", hm = "Ƶ", pm = "⇒", dm = "℅", gm = "∞", mm = "⧝", _m = "ı", vm = "⊺", km = "∫", bm = "∬", xm = "ℤ", ym = "∫", Cm = "⊺", Am = "⋂", qm = "⨗", wm = "⨼", Em = "⁣", Dm = "⁢", Sm = "Ё", Fm = "ё", Rm = "Į", Tm = "į", Mm = "𝕀", zm = "𝕚", Lm = "Ι", Im = "ι", Pm = "⨼", Om = "¿", Bm = "𝒾", jm = "ℐ", Nm = "∈", Hm = "⋵", Um = "⋹", $m = "⋴", Vm = "⋳", Zm = "∈", Gm = "⁢", Wm = "Ĩ", Jm = "ĩ", Ym = "І", Qm = "і", Km = "Ï", Xm = "ï", t_ = "Ĵ", n_ = "ĵ", e_ = "Й", r_ = "й", o_ = "𝔍", s_ = "𝔧", c_ = "ȷ", i_ = "𝕁", a_ = "𝕛", l_ = "𝒥", u_ = "𝒿", f_ = "Ј", h_ = "ј", p_ = "Є", d_ = "є", g_ = "Κ", m_ = "κ", __ = "ϰ", v_ = "Ķ", k_ = "ķ", b_ = "К", x_ = "к", y_ = "𝔎", C_ = "𝔨", A_ = "ĸ", q_ = "Х", w_ = "х", E_ = "Ќ", D_ = "ќ", S_ = "𝕂", F_ = "𝕜", R_ = "𝒦", T_ = "𝓀", M_ = "⇚", z_ = "Ĺ", L_ = "ĺ", I_ = "⦴", P_ = "ℒ", O_ = "Λ", B_ = "λ", j_ = "⟨", N_ = "⟪", H_ = "⦑", U_ = "⟨", $_ = "⪅", V_ = "ℒ", Z_ = "«", G_ = "⇤", W_ = "⤟", J_ = "←", Y_ = "↞", Q_ = "⇐", K_ = "⤝", X_ = "↩", tv = "↫", nv = "⤹", ev = "⥳", rv = "↢", ov = "⤙", sv = "⤛", cv = "⪫", iv = "⪭", av = "⪭︀", lv = "⤌", uv = "⤎", fv = "❲", hv = "{", pv = "[", dv = "⦋", gv = "⦏", mv = "⦍", _v = "Ľ", vv = "ľ", kv = "Ļ", bv = "ļ", xv = "⌈", yv = "{", Cv = "Л", Av = "л", qv = "⤶", wv = "“", Ev = "„", Dv = "⥧", Sv = "⥋", Fv = "↲", Rv = "≤", Tv = "≦", Mv = "⟨", zv = "⇤", Lv = "←", Iv = "←", Pv = "⇐", Ov = "⇆", Bv = "↢", jv = "⌈", Nv = "⟦", Hv = "⥡", Uv = "⥙", $v = "⇃", Vv = "⌊", Zv = "↽", Gv = "↼", Wv = "⇇", Jv = "↔", Yv = "↔", Qv = "⇔", Kv = "⇆", Xv = "⇋", tk = "↭", nk = "⥎", ek = "↤", rk = "⊣", ok = "⥚", sk = "⋋", ck = "⧏", ik = "⊲", ak = "⊴", lk = "⥑", uk = "⥠", fk = "⥘", hk = "↿", pk = "⥒", dk = "↼", gk = "⪋", mk = "⋚", _k = "≤", vk = "≦", kk = "⩽", bk = "⪨", xk = "⩽", yk = "⩿", Ck = "⪁", Ak = "⪃", qk = "⋚︀", wk = "⪓", Ek = "⪅", Dk = "⋖", Sk = "⋚", Fk = "⪋", Rk = "⋚", Tk = "≦", Mk = "≶", zk = "≶", Lk = "⪡", Ik = "≲", Pk = "⩽", Ok = "≲", Bk = "⥼", jk = "⌊", Nk = "𝔏", Hk = "𝔩", Uk = "≶", $k = "⪑", Vk = "⥢", Zk = "↽", Gk = "↼", Wk = "⥪", Jk = "▄", Yk = "Љ", Qk = "љ", Kk = "⇇", Xk = "≪", tb = "⋘", nb = "⌞", eb = "⇚", rb = "⥫", ob = "◺", sb = "Ŀ", cb = "ŀ", ib = "⎰", ab = "⎰", lb = "⪉", ub = "⪉", fb = "⪇", hb = "≨", pb = "⪇", db = "≨", gb = "⋦", mb = "⟬", _b = "⇽", vb = "⟦", kb = "⟵", bb = "⟵", xb = "⟸", yb = "⟷", Cb = "⟷", Ab = "⟺", qb = "⟼", wb = "⟶", Eb = "⟶", Db = "⟹", Sb = "↫", Fb = "↬", Rb = "⦅", Tb = "𝕃", Mb = "𝕝", zb = "⨭", Lb = "⨴", Ib = "∗", Pb = "_", Ob = "↙", Bb = "↘", jb = "◊", Nb = "◊", Hb = "⧫", Ub = "(", $b = "⦓", Vb = "⇆", Zb = "⌟", Gb = "⇋", Wb = "⥭", Jb = "‎", Yb = "⊿", Qb = "‹", Kb = "𝓁", Xb = "ℒ", t1 = "↰", n1 = "↰", e1 = "≲", r1 = "⪍", o1 = "⪏", s1 = "[", c1 = "‘", i1 = "‚", a1 = "Ł", l1 = "ł", u1 = "⪦", f1 = "⩹", h1 = "<", p1 = "<", d1 = "≪", g1 = "⋖", m1 = "⋋", _1 = "⋉", v1 = "⥶", k1 = "⩻", b1 = "◃", x1 = "⊴", y1 = "◂", C1 = "⦖", A1 = "⥊", q1 = "⥦", w1 = "≨︀", E1 = "≨︀", D1 = "¯", S1 = "♂", F1 = "✠", R1 = "✠", T1 = "↦", M1 = "↦", z1 = "↧", L1 = "↤", I1 = "↥", P1 = "▮", O1 = "⨩", B1 = "М", j1 = "м", N1 = "—", H1 = "∺", U1 = "∡", $1 = " ", V1 = "ℳ", Z1 = "𝔐", G1 = "𝔪", W1 = "℧", J1 = "µ", Y1 = "*", Q1 = "⫰", K1 = "∣", X1 = "·", tx = "⊟", nx = "−", ex = "∸", rx = "⨪", ox = "∓", sx = "⫛", cx = "…", ix = "∓", ax = "⊧", lx = "𝕄", ux = "𝕞", fx = "∓", hx = "𝓂", px = "ℳ", dx = "∾", gx = "Μ", mx = "μ", _x = "⊸", vx = "⊸", kx = "∇", bx = "Ń", xx = "ń", yx = "∠⃒", Cx = "≉", Ax = "⩰̸", qx = "≋̸", wx = "ŉ", Ex = "≉", Dx = "♮", Sx = "ℕ", Fx = "♮", Rx = " ", Tx = "≎̸", Mx = "≏̸", zx = "⩃", Lx = "Ň", Ix = "ň", Px = "Ņ", Ox = "ņ", Bx = "≇", jx = "⩭̸", Nx = "⩂", Hx = "Н", Ux = "н", $x = "–", Vx = "⤤", Zx = "↗", Gx = "⇗", Wx = "↗", Jx = "≠", Yx = "≐̸", Qx = "​", Kx = "​", Xx = "​", ty = "​", ny = "≢", ey = "⤨", ry = "≂̸", oy = "≫", sy = "≪", cy = `
`, iy = "∄", ay = "∄", ly = "𝔑", uy = "𝔫", fy = "≧̸", hy = "≱", py = "≱", dy = "≧̸", gy = "⩾̸", my = "⩾̸", _y = "⋙̸", vy = "≵", ky = "≫⃒", by = "≯", xy = "≯", yy = "≫̸", Cy = "↮", Ay = "⇎", qy = "⫲", wy = "∋", Ey = "⋼", Dy = "⋺", Sy = "∋", Fy = "Њ", Ry = "њ", Ty = "↚", My = "⇍", zy = "‥", Ly = "≦̸", Iy = "≰", Py = "↚", Oy = "⇍", By = "↮", jy = "⇎", Ny = "≰", Hy = "≦̸", Uy = "⩽̸", $y = "⩽̸", Vy = "≮", Zy = "⋘̸", Gy = "≴", Wy = "≪⃒", Jy = "≮", Yy = "⋪", Qy = "⋬", Ky = "≪̸", Xy = "∤", tC = "⁠", nC = " ", eC = "𝕟", rC = "ℕ", oC = "⫬", sC = "¬", cC = "≢", iC = "≭", aC = "∦", lC = "∉", uC = "≠", fC = "≂̸", hC = "∄", pC = "≯", dC = "≱", gC = "≧̸", mC = "≫̸", _C = "≹", vC = "⩾̸", kC = "≵", bC = "≎̸", xC = "≏̸", yC = "∉", CC = "⋵̸", AC = "⋹̸", qC = "∉", wC = "⋷", EC = "⋶", DC = "⧏̸", SC = "⋪", FC = "⋬", RC = "≮", TC = "≰", MC = "≸", zC = "≪̸", LC = "⩽̸", IC = "≴", PC = "⪢̸", OC = "⪡̸", BC = "∌", jC = "∌", NC = "⋾", HC = "⋽", UC = "⊀", $C = "⪯̸", VC = "⋠", ZC = "∌", GC = "⧐̸", WC = "⋫", JC = "⋭", YC = "⊏̸", QC = "⋢", KC = "⊐̸", XC = "⋣", t2 = "⊂⃒", n2 = "⊈", e2 = "⊁", r2 = "⪰̸", o2 = "⋡", s2 = "≿̸", c2 = "⊃⃒", i2 = "⊉", a2 = "≁", l2 = "≄", u2 = "≇", f2 = "≉", h2 = "∤", p2 = "∦", d2 = "∦", g2 = "⫽⃥", m2 = "∂̸", _2 = "⨔", v2 = "⊀", k2 = "⋠", b2 = "⊀", x2 = "⪯̸", y2 = "⪯̸", C2 = "⤳̸", A2 = "↛", q2 = "⇏", w2 = "↝̸", E2 = "↛", D2 = "⇏", S2 = "⋫", F2 = "⋭", R2 = "⊁", T2 = "⋡", M2 = "⪰̸", z2 = "𝒩", L2 = "𝓃", I2 = "∤", P2 = "∦", O2 = "≁", B2 = "≄", j2 = "≄", N2 = "∤", H2 = "∦", U2 = "⋢", $2 = "⋣", V2 = "⊄", Z2 = "⫅̸", G2 = "⊈", W2 = "⊂⃒", J2 = "⊈", Y2 = "⫅̸", Q2 = "⊁", K2 = "⪰̸", X2 = "⊅", tA = "⫆̸", nA = "⊉", eA = "⊃⃒", rA = "⊉", oA = "⫆̸", sA = "≹", cA = "Ñ", iA = "ñ", aA = "≸", lA = "⋪", uA = "⋬", fA = "⋫", hA = "⋭", pA = "Ν", dA = "ν", gA = "#", mA = "№", _A = " ", vA = "≍⃒", kA = "⊬", bA = "⊭", xA = "⊮", yA = "⊯", CA = "≥⃒", AA = ">⃒", qA = "⤄", wA = "⧞", EA = "⤂", DA = "≤⃒", SA = "<⃒", FA = "⊴⃒", RA = "⤃", TA = "⊵⃒", MA = "∼⃒", zA = "⤣", LA = "↖", IA = "⇖", PA = "↖", OA = "⤧", BA = "Ó", jA = "ó", NA = "⊛", HA = "Ô", UA = "ô", $A = "⊚", VA = "О", ZA = "о", GA = "⊝", WA = "Ő", JA = "ő", YA = "⨸", QA = "⊙", KA = "⦼", XA = "Œ", tq = "œ", nq = "⦿", eq = "𝔒", rq = "𝔬", oq = "˛", sq = "Ò", cq = "ò", iq = "⧁", aq = "⦵", lq = "Ω", uq = "∮", fq = "↺", hq = "⦾", pq = "⦻", dq = "‾", gq = "⧀", mq = "Ō", _q = "ō", vq = "Ω", kq = "ω", bq = "Ο", xq = "ο", yq = "⦶", Cq = "⊖", Aq = "𝕆", qq = "𝕠", wq = "⦷", Eq = "“", Dq = "‘", Sq = "⦹", Fq = "⊕", Rq = "↻", Tq = "⩔", Mq = "∨", zq = "⩝", Lq = "ℴ", Iq = "ℴ", Pq = "ª", Oq = "º", Bq = "⊶", jq = "⩖", Nq = "⩗", Hq = "⩛", Uq = "Ⓢ", $q = "𝒪", Vq = "ℴ", Zq = "Ø", Gq = "ø", Wq = "⊘", Jq = "Õ", Yq = "õ", Qq = "⨶", Kq = "⨷", Xq = "⊗", tw = "Ö", nw = "ö", ew = "⌽", rw = "‾", ow = "⏞", sw = "⎴", cw = "⏜", iw = "¶", aw = "∥", lw = "∥", uw = "⫳", fw = "⫽", hw = "∂", pw = "∂", dw = "П", gw = "п", mw = "%", _w = ".", vw = "‰", kw = "⊥", bw = "‱", xw = "𝔓", yw = "𝔭", Cw = "Φ", Aw = "φ", qw = "ϕ", ww = "ℳ", Ew = "☎", Dw = "Π", Sw = "π", Fw = "⋔", Rw = "ϖ", Tw = "ℏ", Mw = "ℎ", zw = "ℏ", Lw = "⨣", Iw = "⊞", Pw = "⨢", Ow = "+", Bw = "∔", jw = "⨥", Nw = "⩲", Hw = "±", Uw = "±", $w = "⨦", Vw = "⨧", Zw = "±", Gw = "ℌ", Ww = "⨕", Jw = "𝕡", Yw = "ℙ", Qw = "£", Kw = "⪷", Xw = "⪻", tE = "≺", nE = "≼", eE = "⪷", rE = "≺", oE = "≼", sE = "≺", cE = "⪯", iE = "≼", aE = "≾", lE = "⪯", uE = "⪹", fE = "⪵", hE = "⋨", pE = "⪯", dE = "⪳", gE = "≾", mE = "′", _E = "″", vE = "ℙ", kE = "⪹", bE = "⪵", xE = "⋨", yE = "∏", CE = "∏", AE = "⌮", qE = "⌒", wE = "⌓", EE = "∝", DE = "∝", SE = "∷", FE = "∝", RE = "≾", TE = "⊰", ME = "𝒫", zE = "𝓅", LE = "Ψ", IE = "ψ", PE = " ", OE = "𝔔", BE = "𝔮", jE = "⨌", NE = "𝕢", HE = "ℚ", UE = "⁗", $E = "𝒬", VE = "𝓆", ZE = "ℍ", GE = "⨖", WE = "?", JE = "≟", YE = '"', QE = '"', KE = "⇛", XE = "∽̱", tD = "Ŕ", nD = "ŕ", eD = "√", rD = "⦳", oD = "⟩", sD = "⟫", cD = "⦒", iD = "⦥", aD = "⟩", lD = "»", uD = "⥵", fD = "⇥", hD = "⤠", pD = "⤳", dD = "→", gD = "↠", mD = "⇒", _D = "⤞", vD = "↪", kD = "↬", bD = "⥅", xD = "⥴", yD = "⤖", CD = "↣", AD = "↝", qD = "⤚", wD = "⤜", ED = "∶", DD = "ℚ", SD = "⤍", FD = "⤏", RD = "⤐", TD = "❳", MD = "}", zD = "]", LD = "⦌", ID = "⦎", PD = "⦐", OD = "Ř", BD = "ř", jD = "Ŗ", ND = "ŗ", HD = "⌉", UD = "}", $D = "Р", VD = "р", ZD = "⤷", GD = "⥩", WD = "”", JD = "”", YD = "↳", QD = "ℜ", KD = "ℛ", XD = "ℜ", tS = "ℝ", nS = "ℜ", eS = "▭", rS = "®", oS = "®", sS = "∋", cS = "⇋", iS = "⥯", aS = "⥽", lS = "⌋", uS = "𝔯", fS = "ℜ", hS = "⥤", pS = "⇁", dS = "⇀", gS = "⥬", mS = "Ρ", _S = "ρ", vS = "ϱ", kS = "⟩", bS = "⇥", xS = "→", yS = "→", CS = "⇒", AS = "⇄", qS = "↣", wS = "⌉", ES = "⟧", DS = "⥝", SS = "⥕", FS = "⇂", RS = "⌋", TS = "⇁", MS = "⇀", zS = "⇄", LS = "⇌", IS = "⇉", PS = "↝", OS = "↦", BS = "⊢", jS = "⥛", NS = "⋌", HS = "⧐", US = "⊳", $S = "⊵", VS = "⥏", ZS = "⥜", GS = "⥔", WS = "↾", JS = "⥓", YS = "⇀", QS = "˚", KS = "≓", XS = "⇄", tF = "⇌", nF = "‏", eF = "⎱", rF = "⎱", oF = "⫮", sF = "⟭", cF = "⇾", iF = "⟧", aF = "⦆", lF = "𝕣", uF = "ℝ", fF = "⨮", hF = "⨵", pF = "⥰", dF = ")", gF = "⦔", mF = "⨒", _F = "⇉", vF = "⇛", kF = "›", bF = "𝓇", xF = "ℛ", yF = "↱", CF = "↱", AF = "]", qF = "’", wF = "’", EF = "⋌", DF = "⋊", SF = "▹", FF = "⊵", RF = "▸", TF = "⧎", MF = "⧴", zF = "⥨", LF = "℞", IF = "Ś", PF = "ś", OF = "‚", BF = "⪸", jF = "Š", NF = "š", HF = "⪼", UF = "≻", $F = "≽", VF = "⪰", ZF = "⪴", GF = "Ş", WF = "ş", JF = "Ŝ", YF = "ŝ", QF = "⪺", KF = "⪶", XF = "⋩", tR = "⨓", nR = "≿", eR = "С", rR = "с", oR = "⊡", sR = "⋅", cR = "⩦", iR = "⤥", aR = "↘", lR = "⇘", uR = "↘", fR = "§", hR = ";", pR = "⤩", dR = "∖", gR = "∖", mR = "✶", _R = "𝔖", vR = "𝔰", kR = "⌢", bR = "♯", xR = "Щ", yR = "щ", CR = "Ш", AR = "ш", qR = "↓", wR = "←", ER = "∣", DR = "∥", SR = "→", FR = "↑", RR = "­", TR = "Σ", MR = "σ", zR = "ς", LR = "ς", IR = "∼", PR = "⩪", OR = "≃", BR = "≃", jR = "⪞", NR = "⪠", HR = "⪝", UR = "⪟", $R = "≆", VR = "⨤", ZR = "⥲", GR = "←", WR = "∘", JR = "∖", YR = "⨳", QR = "⧤", KR = "∣", XR = "⌣", tT = "⪪", nT = "⪬", eT = "⪬︀", rT = "Ь", oT = "ь", sT = "⌿", cT = "⧄", iT = "/", aT = "𝕊", lT = "𝕤", uT = "♠", fT = "♠", hT = "∥", pT = "⊓", dT = "⊓︀", gT = "⊔", mT = "⊔︀", _T = "√", vT = "⊏", kT = "⊑", bT = "⊏", xT = "⊑", yT = "⊐", CT = "⊒", AT = "⊐", qT = "⊒", wT = "□", ET = "□", DT = "⊓", ST = "⊏", FT = "⊑", RT = "⊐", TT = "⊒", MT = "⊔", zT = "▪", LT = "□", IT = "▪", PT = "→", OT = "𝒮", BT = "𝓈", jT = "∖", NT = "⌣", HT = "⋆", UT = "⋆", $T = "☆", VT = "★", ZT = "ϵ", GT = "ϕ", WT = "¯", JT = "⊂", YT = "⋐", QT = "⪽", KT = "⫅", XT = "⊆", t3 = "⫃", n3 = "⫁", e3 = "⫋", r3 = "⊊", o3 = "⪿", s3 = "⥹", c3 = "⊂", i3 = "⋐", a3 = "⊆", l3 = "⫅", u3 = "⊆", f3 = "⊊", h3 = "⫋", p3 = "⫇", d3 = "⫕", g3 = "⫓", m3 = "⪸", _3 = "≻", v3 = "≽", k3 = "≻", b3 = "⪰", x3 = "≽", y3 = "≿", C3 = "⪰", A3 = "⪺", q3 = "⪶", w3 = "⋩", E3 = "≿", D3 = "∋", S3 = "∑", F3 = "∑", R3 = "♪", T3 = "¹", M3 = "²", z3 = "³", L3 = "⊃", I3 = "⋑", P3 = "⪾", O3 = "⫘", B3 = "⫆", j3 = "⊇", N3 = "⫄", H3 = "⊃", U3 = "⊇", $3 = "⟉", V3 = "⫗", Z3 = "⥻", G3 = "⫂", W3 = "⫌", J3 = "⊋", Y3 = "⫀", Q3 = "⊃", K3 = "⋑", X3 = "⊇", t6 = "⫆", n6 = "⊋", e6 = "⫌", r6 = "⫈", o6 = "⫔", s6 = "⫖", c6 = "⤦", i6 = "↙", a6 = "⇙", l6 = "↙", u6 = "⤪", f6 = "ß", h6 = "	", p6 = "⌖", d6 = "Τ", g6 = "τ", m6 = "⎴", _6 = "Ť", v6 = "ť", k6 = "Ţ", b6 = "ţ", x6 = "Т", y6 = "т", C6 = "⃛", A6 = "⌕", q6 = "𝔗", w6 = "𝔱", E6 = "∴", D6 = "∴", S6 = "∴", F6 = "Θ", R6 = "θ", T6 = "ϑ", M6 = "ϑ", z6 = "≈", L6 = "∼", I6 = "  ", P6 = " ", O6 = " ", B6 = "≈", j6 = "∼", N6 = "Þ", H6 = "þ", U6 = "˜", $6 = "∼", V6 = "≃", Z6 = "≅", G6 = "≈", W6 = "⨱", J6 = "⊠", Y6 = "×", Q6 = "⨰", K6 = "∭", X6 = "⤨", tM = "⌶", nM = "⫱", eM = "⊤", rM = "𝕋", oM = "𝕥", sM = "⫚", cM = "⤩", iM = "‴", aM = "™", lM = "™", uM = "▵", fM = "▿", hM = "◃", pM = "⊴", dM = "≜", gM = "▹", mM = "⊵", _M = "◬", vM = "≜", kM = "⨺", bM = "⃛", xM = "⨹", yM = "⧍", CM = "⨻", AM = "⏢", qM = "𝒯", wM = "𝓉", EM = "Ц", DM = "ц", SM = "Ћ", FM = "ћ", RM = "Ŧ", TM = "ŧ", MM = "≬", zM = "↞", LM = "↠", IM = "Ú", PM = "ú", OM = "↑", BM = "↟", jM = "⇑", NM = "⥉", HM = "Ў", UM = "ў", $M = "Ŭ", VM = "ŭ", ZM = "Û", GM = "û", WM = "У", JM = "у", YM = "⇅", QM = "Ű", KM = "ű", XM = "⥮", tz = "⥾", nz = "𝔘", ez = "𝔲", rz = "Ù", oz = "ù", sz = "⥣", cz = "↿", iz = "↾", az = "▀", lz = "⌜", uz = "⌜", fz = "⌏", hz = "◸", pz = "Ū", dz = "ū", gz = "¨", mz = "_", _z = "⏟", vz = "⎵", kz = "⏝", bz = "⋃", xz = "⊎", yz = "Ų", Cz = "ų", Az = "𝕌", qz = "𝕦", wz = "⤒", Ez = "↑", Dz = "↑", Sz = "⇑", Fz = "⇅", Rz = "↕", Tz = "↕", Mz = "⇕", zz = "⥮", Lz = "↿", Iz = "↾", Pz = "⊎", Oz = "↖", Bz = "↗", jz = "υ", Nz = "ϒ", Hz = "ϒ", Uz = "Υ", $z = "υ", Vz = "↥", Zz = "⊥", Gz = "⇈", Wz = "⌝", Jz = "⌝", Yz = "⌎", Qz = "Ů", Kz = "ů", Xz = "◹", tL = "𝒰", nL = "𝓊", eL = "⋰", rL = "Ũ", oL = "ũ", sL = "▵", cL = "▴", iL = "⇈", aL = "Ü", lL = "ü", uL = "⦧", fL = "⦜", hL = "ϵ", pL = "ϰ", dL = "∅", gL = "ϕ", mL = "ϖ", _L = "∝", vL = "↕", kL = "⇕", bL = "ϱ", xL = "ς", yL = "⊊︀", CL = "⫋︀", AL = "⊋︀", qL = "⫌︀", wL = "ϑ", EL = "⊲", DL = "⊳", SL = "⫨", FL = "⫫", RL = "⫩", TL = "В", ML = "в", zL = "⊢", LL = "⊨", IL = "⊩", PL = "⊫", OL = "⫦", BL = "⊻", jL = "∨", NL = "⋁", HL = "≚", UL = "⋮", $L = "|", VL = "‖", ZL = "|", GL = "‖", WL = "∣", JL = "|", YL = "❘", QL = "≀", KL = " ", XL = "𝔙", t5 = "𝔳", n5 = "⊲", e5 = "⊂⃒", r5 = "⊃⃒", o5 = "𝕍", s5 = "𝕧", c5 = "∝", i5 = "⊳", a5 = "𝒱", l5 = "𝓋", u5 = "⫋︀", f5 = "⊊︀", h5 = "⫌︀", p5 = "⊋︀", d5 = "⊪", g5 = "⦚", m5 = "Ŵ", _5 = "ŵ", v5 = "⩟", k5 = "∧", b5 = "⋀", x5 = "≙", y5 = "℘", C5 = "𝔚", A5 = "𝔴", q5 = "𝕎", w5 = "𝕨", E5 = "℘", D5 = "≀", S5 = "≀", F5 = "𝒲", R5 = "𝓌", T5 = "⋂", M5 = "◯", z5 = "⋃", L5 = "▽", I5 = "𝔛", P5 = "𝔵", O5 = "⟷", B5 = "⟺", j5 = "Ξ", N5 = "ξ", H5 = "⟵", U5 = "⟸", $5 = "⟼", V5 = "⋻", Z5 = "⨀", G5 = "𝕏", W5 = "𝕩", J5 = "⨁", Y5 = "⨂", Q5 = "⟶", K5 = "⟹", X5 = "𝒳", tI = "𝓍", nI = "⨆", eI = "⨄", rI = "△", oI = "⋁", sI = "⋀", cI = "Ý", iI = "ý", aI = "Я", lI = "я", uI = "Ŷ", fI = "ŷ", hI = "Ы", pI = "ы", dI = "¥", gI = "𝔜", mI = "𝔶", _I = "Ї", vI = "ї", kI = "𝕐", bI = "𝕪", xI = "𝒴", yI = "𝓎", CI = "Ю", AI = "ю", qI = "ÿ", wI = "Ÿ", EI = "Ź", DI = "ź", SI = "Ž", FI = "ž", RI = "З", TI = "з", MI = "Ż", zI = "ż", LI = "ℨ", II = "​", PI = "Ζ", OI = "ζ", BI = "𝔷", jI = "ℨ", NI = "Ж", HI = "ж", UI = "⇝", $I = "𝕫", VI = "ℤ", ZI = "𝒵", GI = "𝓏", WI = "‍", JI = "‌", YI = {
  Aacute: Rr,
  aacute: Tr,
  Abreve: Mr,
  abreve: zr,
  ac: Lr,
  acd: Ir,
  acE: Pr,
  Acirc: Or,
  acirc: Br,
  acute: jr,
  Acy: Nr,
  acy: Hr,
  AElig: Ur,
  aelig: $r,
  af: Vr,
  Afr: Zr,
  afr: Gr,
  Agrave: Wr,
  agrave: Jr,
  alefsym: Yr,
  aleph: Qr,
  Alpha: Kr,
  alpha: Xr,
  Amacr: to,
  amacr: no,
  amalg: eo,
  amp: ro,
  AMP: oo,
  andand: so,
  And: co,
  and: io,
  andd: ao,
  andslope: lo,
  andv: uo,
  ang: fo,
  ange: ho,
  angle: po,
  angmsdaa: go,
  angmsdab: mo,
  angmsdac: _o,
  angmsdad: vo,
  angmsdae: ko,
  angmsdaf: bo,
  angmsdag: xo,
  angmsdah: yo,
  angmsd: Co,
  angrt: Ao,
  angrtvb: qo,
  angrtvbd: wo,
  angsph: Eo,
  angst: Do,
  angzarr: So,
  Aogon: Fo,
  aogon: Ro,
  Aopf: To,
  aopf: Mo,
  apacir: zo,
  ap: Lo,
  apE: Io,
  ape: Po,
  apid: Oo,
  apos: Bo,
  ApplyFunction: jo,
  approx: No,
  approxeq: Ho,
  Aring: Uo,
  aring: $o,
  Ascr: Vo,
  ascr: Zo,
  Assign: Go,
  ast: Wo,
  asymp: Jo,
  asympeq: Yo,
  Atilde: Qo,
  atilde: Ko,
  Auml: Xo,
  auml: ts,
  awconint: ns,
  awint: es,
  backcong: rs,
  backepsilon: os,
  backprime: ss,
  backsim: cs,
  backsimeq: is,
  Backslash: as,
  Barv: ls,
  barvee: us,
  barwed: fs,
  Barwed: hs,
  barwedge: ps,
  bbrk: ds,
  bbrktbrk: gs,
  bcong: ms,
  Bcy: _s,
  bcy: vs,
  bdquo: ks,
  becaus: bs,
  because: xs,
  Because: ys,
  bemptyv: Cs,
  bepsi: As,
  bernou: qs,
  Bernoullis: ws,
  Beta: Es,
  beta: Ds,
  beth: Ss,
  between: Fs,
  Bfr: Rs,
  bfr: Ts,
  bigcap: Ms,
  bigcirc: zs,
  bigcup: Ls,
  bigodot: Is,
  bigoplus: Ps,
  bigotimes: Os,
  bigsqcup: Bs,
  bigstar: js,
  bigtriangledown: Ns,
  bigtriangleup: Hs,
  biguplus: Us,
  bigvee: $s,
  bigwedge: Vs,
  bkarow: Zs,
  blacklozenge: Gs,
  blacksquare: Ws,
  blacktriangle: Js,
  blacktriangledown: Ys,
  blacktriangleleft: Qs,
  blacktriangleright: Ks,
  blank: Xs,
  blk12: tc,
  blk14: nc,
  blk34: ec,
  block: rc,
  bne: oc,
  bnequiv: sc,
  bNot: cc,
  bnot: ic,
  Bopf: ac,
  bopf: lc,
  bot: uc,
  bottom: fc,
  bowtie: hc,
  boxbox: pc,
  boxdl: dc,
  boxdL: gc,
  boxDl: mc,
  boxDL: _c,
  boxdr: vc,
  boxdR: kc,
  boxDr: bc,
  boxDR: xc,
  boxh: yc,
  boxH: Cc,
  boxhd: Ac,
  boxHd: qc,
  boxhD: wc,
  boxHD: Ec,
  boxhu: Dc,
  boxHu: Sc,
  boxhU: Fc,
  boxHU: Rc,
  boxminus: Tc,
  boxplus: Mc,
  boxtimes: zc,
  boxul: Lc,
  boxuL: Ic,
  boxUl: Pc,
  boxUL: Oc,
  boxur: Bc,
  boxuR: jc,
  boxUr: Nc,
  boxUR: Hc,
  boxv: Uc,
  boxV: $c,
  boxvh: Vc,
  boxvH: Zc,
  boxVh: Gc,
  boxVH: Wc,
  boxvl: Jc,
  boxvL: Yc,
  boxVl: Qc,
  boxVL: Kc,
  boxvr: Xc,
  boxvR: ti,
  boxVr: ni,
  boxVR: ei,
  bprime: ri,
  breve: oi,
  Breve: si,
  brvbar: ci,
  bscr: ii,
  Bscr: ai,
  bsemi: li,
  bsim: ui,
  bsime: fi,
  bsolb: hi,
  bsol: pi,
  bsolhsub: di,
  bull: gi,
  bullet: mi,
  bump: _i,
  bumpE: vi,
  bumpe: ki,
  Bumpeq: bi,
  bumpeq: xi,
  Cacute: yi,
  cacute: Ci,
  capand: Ai,
  capbrcup: qi,
  capcap: wi,
  cap: Ei,
  Cap: Di,
  capcup: Si,
  capdot: Fi,
  CapitalDifferentialD: Ri,
  caps: Ti,
  caret: Mi,
  caron: zi,
  Cayleys: Li,
  ccaps: Ii,
  Ccaron: Pi,
  ccaron: Oi,
  Ccedil: Bi,
  ccedil: ji,
  Ccirc: Ni,
  ccirc: Hi,
  Cconint: Ui,
  ccups: $i,
  ccupssm: Vi,
  Cdot: Zi,
  cdot: Gi,
  cedil: Wi,
  Cedilla: Ji,
  cemptyv: Yi,
  cent: Qi,
  centerdot: Ki,
  CenterDot: Xi,
  cfr: ta,
  Cfr: na,
  CHcy: ea,
  chcy: ra,
  check: oa,
  checkmark: sa,
  Chi: ca,
  chi: ia,
  circ: aa,
  circeq: la,
  circlearrowleft: ua,
  circlearrowright: fa,
  circledast: ha,
  circledcirc: pa,
  circleddash: da,
  CircleDot: ga,
  circledR: ma,
  circledS: _a,
  CircleMinus: va,
  CirclePlus: ka,
  CircleTimes: ba,
  cir: xa,
  cirE: ya,
  cire: Ca,
  cirfnint: Aa,
  cirmid: qa,
  cirscir: wa,
  ClockwiseContourIntegral: Ea,
  CloseCurlyDoubleQuote: Da,
  CloseCurlyQuote: Sa,
  clubs: Fa,
  clubsuit: Ra,
  colon: Ta,
  Colon: Ma,
  Colone: za,
  colone: La,
  coloneq: Ia,
  comma: Pa,
  commat: Oa,
  comp: Ba,
  compfn: ja,
  complement: Na,
  complexes: Ha,
  cong: Ua,
  congdot: $a,
  Congruent: Va,
  conint: Za,
  Conint: Ga,
  ContourIntegral: Wa,
  copf: Ja,
  Copf: Ya,
  coprod: Qa,
  Coproduct: Ka,
  copy: Xa,
  COPY: tl,
  copysr: nl,
  CounterClockwiseContourIntegral: el,
  crarr: rl,
  cross: ol,
  Cross: sl,
  Cscr: cl,
  cscr: il,
  csub: al,
  csube: ll,
  csup: ul,
  csupe: fl,
  ctdot: hl,
  cudarrl: pl,
  cudarrr: dl,
  cuepr: gl,
  cuesc: ml,
  cularr: _l,
  cularrp: vl,
  cupbrcap: kl,
  cupcap: bl,
  CupCap: xl,
  cup: yl,
  Cup: Cl,
  cupcup: Al,
  cupdot: ql,
  cupor: wl,
  cups: El,
  curarr: Dl,
  curarrm: Sl,
  curlyeqprec: Fl,
  curlyeqsucc: Rl,
  curlyvee: Tl,
  curlywedge: Ml,
  curren: zl,
  curvearrowleft: Ll,
  curvearrowright: Il,
  cuvee: Pl,
  cuwed: Ol,
  cwconint: Bl,
  cwint: jl,
  cylcty: Nl,
  dagger: Hl,
  Dagger: Ul,
  daleth: $l,
  darr: Vl,
  Darr: Zl,
  dArr: Gl,
  dash: Wl,
  Dashv: Jl,
  dashv: Yl,
  dbkarow: Ql,
  dblac: Kl,
  Dcaron: Xl,
  dcaron: tu,
  Dcy: nu,
  dcy: eu,
  ddagger: ru,
  ddarr: ou,
  DD: su,
  dd: cu,
  DDotrahd: iu,
  ddotseq: au,
  deg: lu,
  Del: uu,
  Delta: fu,
  delta: hu,
  demptyv: pu,
  dfisht: du,
  Dfr: gu,
  dfr: mu,
  dHar: _u,
  dharl: vu,
  dharr: ku,
  DiacriticalAcute: bu,
  DiacriticalDot: xu,
  DiacriticalDoubleAcute: yu,
  DiacriticalGrave: Cu,
  DiacriticalTilde: Au,
  diam: qu,
  diamond: wu,
  Diamond: Eu,
  diamondsuit: Du,
  diams: Su,
  die: Fu,
  DifferentialD: Ru,
  digamma: Tu,
  disin: Mu,
  div: zu,
  divide: Lu,
  divideontimes: Iu,
  divonx: Pu,
  DJcy: Ou,
  djcy: Bu,
  dlcorn: ju,
  dlcrop: Nu,
  dollar: Hu,
  Dopf: Uu,
  dopf: $u,
  Dot: Vu,
  dot: Zu,
  DotDot: Gu,
  doteq: Wu,
  doteqdot: Ju,
  DotEqual: Yu,
  dotminus: Qu,
  dotplus: Ku,
  dotsquare: Xu,
  doublebarwedge: tf,
  DoubleContourIntegral: nf,
  DoubleDot: ef,
  DoubleDownArrow: rf,
  DoubleLeftArrow: of,
  DoubleLeftRightArrow: sf,
  DoubleLeftTee: cf,
  DoubleLongLeftArrow: af,
  DoubleLongLeftRightArrow: lf,
  DoubleLongRightArrow: uf,
  DoubleRightArrow: ff,
  DoubleRightTee: hf,
  DoubleUpArrow: pf,
  DoubleUpDownArrow: df,
  DoubleVerticalBar: gf,
  DownArrowBar: mf,
  downarrow: _f,
  DownArrow: vf,
  Downarrow: kf,
  DownArrowUpArrow: bf,
  DownBreve: xf,
  downdownarrows: yf,
  downharpoonleft: Cf,
  downharpoonright: Af,
  DownLeftRightVector: qf,
  DownLeftTeeVector: wf,
  DownLeftVectorBar: Ef,
  DownLeftVector: Df,
  DownRightTeeVector: Sf,
  DownRightVectorBar: Ff,
  DownRightVector: Rf,
  DownTeeArrow: Tf,
  DownTee: Mf,
  drbkarow: zf,
  drcorn: Lf,
  drcrop: If,
  Dscr: Pf,
  dscr: Of,
  DScy: Bf,
  dscy: jf,
  dsol: Nf,
  Dstrok: Hf,
  dstrok: Uf,
  dtdot: $f,
  dtri: Vf,
  dtrif: Zf,
  duarr: Gf,
  duhar: Wf,
  dwangle: Jf,
  DZcy: Yf,
  dzcy: Qf,
  dzigrarr: Kf,
  Eacute: Xf,
  eacute: th,
  easter: nh,
  Ecaron: eh,
  ecaron: rh,
  Ecirc: oh,
  ecirc: sh,
  ecir: ch,
  ecolon: ih,
  Ecy: ah,
  ecy: lh,
  eDDot: uh,
  Edot: fh,
  edot: hh,
  eDot: ph,
  ee: dh,
  efDot: gh,
  Efr: mh,
  efr: _h,
  eg: vh,
  Egrave: kh,
  egrave: bh,
  egs: xh,
  egsdot: yh,
  el: Ch,
  Element: Ah,
  elinters: qh,
  ell: wh,
  els: Eh,
  elsdot: Dh,
  Emacr: Sh,
  emacr: Fh,
  empty: Rh,
  emptyset: Th,
  EmptySmallSquare: Mh,
  emptyv: zh,
  EmptyVerySmallSquare: Lh,
  emsp13: Ih,
  emsp14: Ph,
  emsp: Oh,
  ENG: Bh,
  eng: jh,
  ensp: Nh,
  Eogon: Hh,
  eogon: Uh,
  Eopf: $h,
  eopf: Vh,
  epar: Zh,
  eparsl: Gh,
  eplus: Wh,
  epsi: Jh,
  Epsilon: Yh,
  epsilon: Qh,
  epsiv: Kh,
  eqcirc: Xh,
  eqcolon: tp,
  eqsim: np,
  eqslantgtr: ep,
  eqslantless: rp,
  Equal: op,
  equals: sp,
  EqualTilde: cp,
  equest: ip,
  Equilibrium: ap,
  equiv: lp,
  equivDD: up,
  eqvparsl: fp,
  erarr: hp,
  erDot: pp,
  escr: dp,
  Escr: gp,
  esdot: mp,
  Esim: _p,
  esim: vp,
  Eta: kp,
  eta: bp,
  ETH: xp,
  eth: yp,
  Euml: Cp,
  euml: Ap,
  euro: qp,
  excl: wp,
  exist: Ep,
  Exists: Dp,
  expectation: Sp,
  exponentiale: Fp,
  ExponentialE: Rp,
  fallingdotseq: Tp,
  Fcy: Mp,
  fcy: zp,
  female: Lp,
  ffilig: Ip,
  fflig: Pp,
  ffllig: Op,
  Ffr: Bp,
  ffr: jp,
  filig: Np,
  FilledSmallSquare: Hp,
  FilledVerySmallSquare: Up,
  fjlig: $p,
  flat: Vp,
  fllig: Zp,
  fltns: Gp,
  fnof: Wp,
  Fopf: Jp,
  fopf: Yp,
  forall: Qp,
  ForAll: Kp,
  fork: Xp,
  forkv: td,
  Fouriertrf: nd,
  fpartint: ed,
  frac12: rd,
  frac13: od,
  frac14: sd,
  frac15: cd,
  frac16: id,
  frac18: ad,
  frac23: ld,
  frac25: ud,
  frac34: fd,
  frac35: hd,
  frac38: pd,
  frac45: dd,
  frac56: gd,
  frac58: md,
  frac78: _d,
  frasl: vd,
  frown: kd,
  fscr: bd,
  Fscr: xd,
  gacute: yd,
  Gamma: Cd,
  gamma: Ad,
  Gammad: qd,
  gammad: wd,
  gap: Ed,
  Gbreve: Dd,
  gbreve: Sd,
  Gcedil: Fd,
  Gcirc: Rd,
  gcirc: Td,
  Gcy: Md,
  gcy: zd,
  Gdot: Ld,
  gdot: Id,
  ge: Pd,
  gE: Od,
  gEl: Bd,
  gel: jd,
  geq: Nd,
  geqq: Hd,
  geqslant: Ud,
  gescc: $d,
  ges: Vd,
  gesdot: Zd,
  gesdoto: Gd,
  gesdotol: Wd,
  gesl: Jd,
  gesles: Yd,
  Gfr: Qd,
  gfr: Kd,
  gg: Xd,
  Gg: t0,
  ggg: n0,
  gimel: e0,
  GJcy: r0,
  gjcy: o0,
  gla: s0,
  gl: c0,
  glE: i0,
  glj: a0,
  gnap: l0,
  gnapprox: u0,
  gne: f0,
  gnE: h0,
  gneq: p0,
  gneqq: d0,
  gnsim: g0,
  Gopf: m0,
  gopf: _0,
  grave: v0,
  GreaterEqual: k0,
  GreaterEqualLess: b0,
  GreaterFullEqual: x0,
  GreaterGreater: y0,
  GreaterLess: C0,
  GreaterSlantEqual: A0,
  GreaterTilde: q0,
  Gscr: w0,
  gscr: E0,
  gsim: D0,
  gsime: S0,
  gsiml: F0,
  gtcc: R0,
  gtcir: T0,
  gt: M0,
  GT: z0,
  Gt: L0,
  gtdot: I0,
  gtlPar: P0,
  gtquest: O0,
  gtrapprox: B0,
  gtrarr: j0,
  gtrdot: N0,
  gtreqless: H0,
  gtreqqless: U0,
  gtrless: $0,
  gtrsim: V0,
  gvertneqq: Z0,
  gvnE: G0,
  Hacek: W0,
  hairsp: J0,
  half: Y0,
  hamilt: Q0,
  HARDcy: K0,
  hardcy: X0,
  harrcir: tg,
  harr: ng,
  hArr: eg,
  harrw: rg,
  Hat: og,
  hbar: sg,
  Hcirc: cg,
  hcirc: ig,
  hearts: ag,
  heartsuit: lg,
  hellip: ug,
  hercon: fg,
  hfr: hg,
  Hfr: pg,
  HilbertSpace: dg,
  hksearow: gg,
  hkswarow: mg,
  hoarr: _g,
  homtht: vg,
  hookleftarrow: kg,
  hookrightarrow: bg,
  hopf: xg,
  Hopf: yg,
  horbar: Cg,
  HorizontalLine: Ag,
  hscr: qg,
  Hscr: wg,
  hslash: Eg,
  Hstrok: Dg,
  hstrok: Sg,
  HumpDownHump: Fg,
  HumpEqual: Rg,
  hybull: Tg,
  hyphen: Mg,
  Iacute: zg,
  iacute: Lg,
  ic: Ig,
  Icirc: Pg,
  icirc: Og,
  Icy: Bg,
  icy: jg,
  Idot: Ng,
  IEcy: Hg,
  iecy: Ug,
  iexcl: $g,
  iff: Vg,
  ifr: Zg,
  Ifr: Gg,
  Igrave: Wg,
  igrave: Jg,
  ii: Yg,
  iiiint: Qg,
  iiint: Kg,
  iinfin: Xg,
  iiota: tm,
  IJlig: nm,
  ijlig: em,
  Imacr: rm,
  imacr: om,
  image: sm,
  ImaginaryI: cm,
  imagline: im,
  imagpart: am,
  imath: lm,
  Im: um,
  imof: fm,
  imped: hm,
  Implies: pm,
  incare: dm,
  in: "∈",
  infin: gm,
  infintie: mm,
  inodot: _m,
  intcal: vm,
  int: km,
  Int: bm,
  integers: xm,
  Integral: ym,
  intercal: Cm,
  Intersection: Am,
  intlarhk: qm,
  intprod: wm,
  InvisibleComma: Em,
  InvisibleTimes: Dm,
  IOcy: Sm,
  iocy: Fm,
  Iogon: Rm,
  iogon: Tm,
  Iopf: Mm,
  iopf: zm,
  Iota: Lm,
  iota: Im,
  iprod: Pm,
  iquest: Om,
  iscr: Bm,
  Iscr: jm,
  isin: Nm,
  isindot: Hm,
  isinE: Um,
  isins: $m,
  isinsv: Vm,
  isinv: Zm,
  it: Gm,
  Itilde: Wm,
  itilde: Jm,
  Iukcy: Ym,
  iukcy: Qm,
  Iuml: Km,
  iuml: Xm,
  Jcirc: t_,
  jcirc: n_,
  Jcy: e_,
  jcy: r_,
  Jfr: o_,
  jfr: s_,
  jmath: c_,
  Jopf: i_,
  jopf: a_,
  Jscr: l_,
  jscr: u_,
  Jsercy: f_,
  jsercy: h_,
  Jukcy: p_,
  jukcy: d_,
  Kappa: g_,
  kappa: m_,
  kappav: __,
  Kcedil: v_,
  kcedil: k_,
  Kcy: b_,
  kcy: x_,
  Kfr: y_,
  kfr: C_,
  kgreen: A_,
  KHcy: q_,
  khcy: w_,
  KJcy: E_,
  kjcy: D_,
  Kopf: S_,
  kopf: F_,
  Kscr: R_,
  kscr: T_,
  lAarr: M_,
  Lacute: z_,
  lacute: L_,
  laemptyv: I_,
  lagran: P_,
  Lambda: O_,
  lambda: B_,
  lang: j_,
  Lang: N_,
  langd: H_,
  langle: U_,
  lap: $_,
  Laplacetrf: V_,
  laquo: Z_,
  larrb: G_,
  larrbfs: W_,
  larr: J_,
  Larr: Y_,
  lArr: Q_,
  larrfs: K_,
  larrhk: X_,
  larrlp: tv,
  larrpl: nv,
  larrsim: ev,
  larrtl: rv,
  latail: ov,
  lAtail: sv,
  lat: cv,
  late: iv,
  lates: av,
  lbarr: lv,
  lBarr: uv,
  lbbrk: fv,
  lbrace: hv,
  lbrack: pv,
  lbrke: dv,
  lbrksld: gv,
  lbrkslu: mv,
  Lcaron: _v,
  lcaron: vv,
  Lcedil: kv,
  lcedil: bv,
  lceil: xv,
  lcub: yv,
  Lcy: Cv,
  lcy: Av,
  ldca: qv,
  ldquo: wv,
  ldquor: Ev,
  ldrdhar: Dv,
  ldrushar: Sv,
  ldsh: Fv,
  le: Rv,
  lE: Tv,
  LeftAngleBracket: Mv,
  LeftArrowBar: zv,
  leftarrow: Lv,
  LeftArrow: Iv,
  Leftarrow: Pv,
  LeftArrowRightArrow: Ov,
  leftarrowtail: Bv,
  LeftCeiling: jv,
  LeftDoubleBracket: Nv,
  LeftDownTeeVector: Hv,
  LeftDownVectorBar: Uv,
  LeftDownVector: $v,
  LeftFloor: Vv,
  leftharpoondown: Zv,
  leftharpoonup: Gv,
  leftleftarrows: Wv,
  leftrightarrow: Jv,
  LeftRightArrow: Yv,
  Leftrightarrow: Qv,
  leftrightarrows: Kv,
  leftrightharpoons: Xv,
  leftrightsquigarrow: tk,
  LeftRightVector: nk,
  LeftTeeArrow: ek,
  LeftTee: rk,
  LeftTeeVector: ok,
  leftthreetimes: sk,
  LeftTriangleBar: ck,
  LeftTriangle: ik,
  LeftTriangleEqual: ak,
  LeftUpDownVector: lk,
  LeftUpTeeVector: uk,
  LeftUpVectorBar: fk,
  LeftUpVector: hk,
  LeftVectorBar: pk,
  LeftVector: dk,
  lEg: gk,
  leg: mk,
  leq: _k,
  leqq: vk,
  leqslant: kk,
  lescc: bk,
  les: xk,
  lesdot: yk,
  lesdoto: Ck,
  lesdotor: Ak,
  lesg: qk,
  lesges: wk,
  lessapprox: Ek,
  lessdot: Dk,
  lesseqgtr: Sk,
  lesseqqgtr: Fk,
  LessEqualGreater: Rk,
  LessFullEqual: Tk,
  LessGreater: Mk,
  lessgtr: zk,
  LessLess: Lk,
  lesssim: Ik,
  LessSlantEqual: Pk,
  LessTilde: Ok,
  lfisht: Bk,
  lfloor: jk,
  Lfr: Nk,
  lfr: Hk,
  lg: Uk,
  lgE: $k,
  lHar: Vk,
  lhard: Zk,
  lharu: Gk,
  lharul: Wk,
  lhblk: Jk,
  LJcy: Yk,
  ljcy: Qk,
  llarr: Kk,
  ll: Xk,
  Ll: tb,
  llcorner: nb,
  Lleftarrow: eb,
  llhard: rb,
  lltri: ob,
  Lmidot: sb,
  lmidot: cb,
  lmoustache: ib,
  lmoust: ab,
  lnap: lb,
  lnapprox: ub,
  lne: fb,
  lnE: hb,
  lneq: pb,
  lneqq: db,
  lnsim: gb,
  loang: mb,
  loarr: _b,
  lobrk: vb,
  longleftarrow: kb,
  LongLeftArrow: bb,
  Longleftarrow: xb,
  longleftrightarrow: yb,
  LongLeftRightArrow: Cb,
  Longleftrightarrow: Ab,
  longmapsto: qb,
  longrightarrow: wb,
  LongRightArrow: Eb,
  Longrightarrow: Db,
  looparrowleft: Sb,
  looparrowright: Fb,
  lopar: Rb,
  Lopf: Tb,
  lopf: Mb,
  loplus: zb,
  lotimes: Lb,
  lowast: Ib,
  lowbar: Pb,
  LowerLeftArrow: Ob,
  LowerRightArrow: Bb,
  loz: jb,
  lozenge: Nb,
  lozf: Hb,
  lpar: Ub,
  lparlt: $b,
  lrarr: Vb,
  lrcorner: Zb,
  lrhar: Gb,
  lrhard: Wb,
  lrm: Jb,
  lrtri: Yb,
  lsaquo: Qb,
  lscr: Kb,
  Lscr: Xb,
  lsh: t1,
  Lsh: n1,
  lsim: e1,
  lsime: r1,
  lsimg: o1,
  lsqb: s1,
  lsquo: c1,
  lsquor: i1,
  Lstrok: a1,
  lstrok: l1,
  ltcc: u1,
  ltcir: f1,
  lt: h1,
  LT: p1,
  Lt: d1,
  ltdot: g1,
  lthree: m1,
  ltimes: _1,
  ltlarr: v1,
  ltquest: k1,
  ltri: b1,
  ltrie: x1,
  ltrif: y1,
  ltrPar: C1,
  lurdshar: A1,
  luruhar: q1,
  lvertneqq: w1,
  lvnE: E1,
  macr: D1,
  male: S1,
  malt: F1,
  maltese: R1,
  Map: "⤅",
  map: T1,
  mapsto: M1,
  mapstodown: z1,
  mapstoleft: L1,
  mapstoup: I1,
  marker: P1,
  mcomma: O1,
  Mcy: B1,
  mcy: j1,
  mdash: N1,
  mDDot: H1,
  measuredangle: U1,
  MediumSpace: $1,
  Mellintrf: V1,
  Mfr: Z1,
  mfr: G1,
  mho: W1,
  micro: J1,
  midast: Y1,
  midcir: Q1,
  mid: K1,
  middot: X1,
  minusb: tx,
  minus: nx,
  minusd: ex,
  minusdu: rx,
  MinusPlus: ox,
  mlcp: sx,
  mldr: cx,
  mnplus: ix,
  models: ax,
  Mopf: lx,
  mopf: ux,
  mp: fx,
  mscr: hx,
  Mscr: px,
  mstpos: dx,
  Mu: gx,
  mu: mx,
  multimap: _x,
  mumap: vx,
  nabla: kx,
  Nacute: bx,
  nacute: xx,
  nang: yx,
  nap: Cx,
  napE: Ax,
  napid: qx,
  napos: wx,
  napprox: Ex,
  natural: Dx,
  naturals: Sx,
  natur: Fx,
  nbsp: Rx,
  nbump: Tx,
  nbumpe: Mx,
  ncap: zx,
  Ncaron: Lx,
  ncaron: Ix,
  Ncedil: Px,
  ncedil: Ox,
  ncong: Bx,
  ncongdot: jx,
  ncup: Nx,
  Ncy: Hx,
  ncy: Ux,
  ndash: $x,
  nearhk: Vx,
  nearr: Zx,
  neArr: Gx,
  nearrow: Wx,
  ne: Jx,
  nedot: Yx,
  NegativeMediumSpace: Qx,
  NegativeThickSpace: Kx,
  NegativeThinSpace: Xx,
  NegativeVeryThinSpace: ty,
  nequiv: ny,
  nesear: ey,
  nesim: ry,
  NestedGreaterGreater: oy,
  NestedLessLess: sy,
  NewLine: cy,
  nexist: iy,
  nexists: ay,
  Nfr: ly,
  nfr: uy,
  ngE: fy,
  nge: hy,
  ngeq: py,
  ngeqq: dy,
  ngeqslant: gy,
  nges: my,
  nGg: _y,
  ngsim: vy,
  nGt: ky,
  ngt: by,
  ngtr: xy,
  nGtv: yy,
  nharr: Cy,
  nhArr: Ay,
  nhpar: qy,
  ni: wy,
  nis: Ey,
  nisd: Dy,
  niv: Sy,
  NJcy: Fy,
  njcy: Ry,
  nlarr: Ty,
  nlArr: My,
  nldr: zy,
  nlE: Ly,
  nle: Iy,
  nleftarrow: Py,
  nLeftarrow: Oy,
  nleftrightarrow: By,
  nLeftrightarrow: jy,
  nleq: Ny,
  nleqq: Hy,
  nleqslant: Uy,
  nles: $y,
  nless: Vy,
  nLl: Zy,
  nlsim: Gy,
  nLt: Wy,
  nlt: Jy,
  nltri: Yy,
  nltrie: Qy,
  nLtv: Ky,
  nmid: Xy,
  NoBreak: tC,
  NonBreakingSpace: nC,
  nopf: eC,
  Nopf: rC,
  Not: oC,
  not: sC,
  NotCongruent: cC,
  NotCupCap: iC,
  NotDoubleVerticalBar: aC,
  NotElement: lC,
  NotEqual: uC,
  NotEqualTilde: fC,
  NotExists: hC,
  NotGreater: pC,
  NotGreaterEqual: dC,
  NotGreaterFullEqual: gC,
  NotGreaterGreater: mC,
  NotGreaterLess: _C,
  NotGreaterSlantEqual: vC,
  NotGreaterTilde: kC,
  NotHumpDownHump: bC,
  NotHumpEqual: xC,
  notin: yC,
  notindot: CC,
  notinE: AC,
  notinva: qC,
  notinvb: wC,
  notinvc: EC,
  NotLeftTriangleBar: DC,
  NotLeftTriangle: SC,
  NotLeftTriangleEqual: FC,
  NotLess: RC,
  NotLessEqual: TC,
  NotLessGreater: MC,
  NotLessLess: zC,
  NotLessSlantEqual: LC,
  NotLessTilde: IC,
  NotNestedGreaterGreater: PC,
  NotNestedLessLess: OC,
  notni: BC,
  notniva: jC,
  notnivb: NC,
  notnivc: HC,
  NotPrecedes: UC,
  NotPrecedesEqual: $C,
  NotPrecedesSlantEqual: VC,
  NotReverseElement: ZC,
  NotRightTriangleBar: GC,
  NotRightTriangle: WC,
  NotRightTriangleEqual: JC,
  NotSquareSubset: YC,
  NotSquareSubsetEqual: QC,
  NotSquareSuperset: KC,
  NotSquareSupersetEqual: XC,
  NotSubset: t2,
  NotSubsetEqual: n2,
  NotSucceeds: e2,
  NotSucceedsEqual: r2,
  NotSucceedsSlantEqual: o2,
  NotSucceedsTilde: s2,
  NotSuperset: c2,
  NotSupersetEqual: i2,
  NotTilde: a2,
  NotTildeEqual: l2,
  NotTildeFullEqual: u2,
  NotTildeTilde: f2,
  NotVerticalBar: h2,
  nparallel: p2,
  npar: d2,
  nparsl: g2,
  npart: m2,
  npolint: _2,
  npr: v2,
  nprcue: k2,
  nprec: b2,
  npreceq: x2,
  npre: y2,
  nrarrc: C2,
  nrarr: A2,
  nrArr: q2,
  nrarrw: w2,
  nrightarrow: E2,
  nRightarrow: D2,
  nrtri: S2,
  nrtrie: F2,
  nsc: R2,
  nsccue: T2,
  nsce: M2,
  Nscr: z2,
  nscr: L2,
  nshortmid: I2,
  nshortparallel: P2,
  nsim: O2,
  nsime: B2,
  nsimeq: j2,
  nsmid: N2,
  nspar: H2,
  nsqsube: U2,
  nsqsupe: $2,
  nsub: V2,
  nsubE: Z2,
  nsube: G2,
  nsubset: W2,
  nsubseteq: J2,
  nsubseteqq: Y2,
  nsucc: Q2,
  nsucceq: K2,
  nsup: X2,
  nsupE: tA,
  nsupe: nA,
  nsupset: eA,
  nsupseteq: rA,
  nsupseteqq: oA,
  ntgl: sA,
  Ntilde: cA,
  ntilde: iA,
  ntlg: aA,
  ntriangleleft: lA,
  ntrianglelefteq: uA,
  ntriangleright: fA,
  ntrianglerighteq: hA,
  Nu: pA,
  nu: dA,
  num: gA,
  numero: mA,
  numsp: _A,
  nvap: vA,
  nvdash: kA,
  nvDash: bA,
  nVdash: xA,
  nVDash: yA,
  nvge: CA,
  nvgt: AA,
  nvHarr: qA,
  nvinfin: wA,
  nvlArr: EA,
  nvle: DA,
  nvlt: SA,
  nvltrie: FA,
  nvrArr: RA,
  nvrtrie: TA,
  nvsim: MA,
  nwarhk: zA,
  nwarr: LA,
  nwArr: IA,
  nwarrow: PA,
  nwnear: OA,
  Oacute: BA,
  oacute: jA,
  oast: NA,
  Ocirc: HA,
  ocirc: UA,
  ocir: $A,
  Ocy: VA,
  ocy: ZA,
  odash: GA,
  Odblac: WA,
  odblac: JA,
  odiv: YA,
  odot: QA,
  odsold: KA,
  OElig: XA,
  oelig: tq,
  ofcir: nq,
  Ofr: eq,
  ofr: rq,
  ogon: oq,
  Ograve: sq,
  ograve: cq,
  ogt: iq,
  ohbar: aq,
  ohm: lq,
  oint: uq,
  olarr: fq,
  olcir: hq,
  olcross: pq,
  oline: dq,
  olt: gq,
  Omacr: mq,
  omacr: _q,
  Omega: vq,
  omega: kq,
  Omicron: bq,
  omicron: xq,
  omid: yq,
  ominus: Cq,
  Oopf: Aq,
  oopf: qq,
  opar: wq,
  OpenCurlyDoubleQuote: Eq,
  OpenCurlyQuote: Dq,
  operp: Sq,
  oplus: Fq,
  orarr: Rq,
  Or: Tq,
  or: Mq,
  ord: zq,
  order: Lq,
  orderof: Iq,
  ordf: Pq,
  ordm: Oq,
  origof: Bq,
  oror: jq,
  orslope: Nq,
  orv: Hq,
  oS: Uq,
  Oscr: $q,
  oscr: Vq,
  Oslash: Zq,
  oslash: Gq,
  osol: Wq,
  Otilde: Jq,
  otilde: Yq,
  otimesas: Qq,
  Otimes: Kq,
  otimes: Xq,
  Ouml: tw,
  ouml: nw,
  ovbar: ew,
  OverBar: rw,
  OverBrace: ow,
  OverBracket: sw,
  OverParenthesis: cw,
  para: iw,
  parallel: aw,
  par: lw,
  parsim: uw,
  parsl: fw,
  part: hw,
  PartialD: pw,
  Pcy: dw,
  pcy: gw,
  percnt: mw,
  period: _w,
  permil: vw,
  perp: kw,
  pertenk: bw,
  Pfr: xw,
  pfr: yw,
  Phi: Cw,
  phi: Aw,
  phiv: qw,
  phmmat: ww,
  phone: Ew,
  Pi: Dw,
  pi: Sw,
  pitchfork: Fw,
  piv: Rw,
  planck: Tw,
  planckh: Mw,
  plankv: zw,
  plusacir: Lw,
  plusb: Iw,
  pluscir: Pw,
  plus: Ow,
  plusdo: Bw,
  plusdu: jw,
  pluse: Nw,
  PlusMinus: Hw,
  plusmn: Uw,
  plussim: $w,
  plustwo: Vw,
  pm: Zw,
  Poincareplane: Gw,
  pointint: Ww,
  popf: Jw,
  Popf: Yw,
  pound: Qw,
  prap: Kw,
  Pr: Xw,
  pr: tE,
  prcue: nE,
  precapprox: eE,
  prec: rE,
  preccurlyeq: oE,
  Precedes: sE,
  PrecedesEqual: cE,
  PrecedesSlantEqual: iE,
  PrecedesTilde: aE,
  preceq: lE,
  precnapprox: uE,
  precneqq: fE,
  precnsim: hE,
  pre: pE,
  prE: dE,
  precsim: gE,
  prime: mE,
  Prime: _E,
  primes: vE,
  prnap: kE,
  prnE: bE,
  prnsim: xE,
  prod: yE,
  Product: CE,
  profalar: AE,
  profline: qE,
  profsurf: wE,
  prop: EE,
  Proportional: DE,
  Proportion: SE,
  propto: FE,
  prsim: RE,
  prurel: TE,
  Pscr: ME,
  pscr: zE,
  Psi: LE,
  psi: IE,
  puncsp: PE,
  Qfr: OE,
  qfr: BE,
  qint: jE,
  qopf: NE,
  Qopf: HE,
  qprime: UE,
  Qscr: $E,
  qscr: VE,
  quaternions: ZE,
  quatint: GE,
  quest: WE,
  questeq: JE,
  quot: YE,
  QUOT: QE,
  rAarr: KE,
  race: XE,
  Racute: tD,
  racute: nD,
  radic: eD,
  raemptyv: rD,
  rang: oD,
  Rang: sD,
  rangd: cD,
  range: iD,
  rangle: aD,
  raquo: lD,
  rarrap: uD,
  rarrb: fD,
  rarrbfs: hD,
  rarrc: pD,
  rarr: dD,
  Rarr: gD,
  rArr: mD,
  rarrfs: _D,
  rarrhk: vD,
  rarrlp: kD,
  rarrpl: bD,
  rarrsim: xD,
  Rarrtl: yD,
  rarrtl: CD,
  rarrw: AD,
  ratail: qD,
  rAtail: wD,
  ratio: ED,
  rationals: DD,
  rbarr: SD,
  rBarr: FD,
  RBarr: RD,
  rbbrk: TD,
  rbrace: MD,
  rbrack: zD,
  rbrke: LD,
  rbrksld: ID,
  rbrkslu: PD,
  Rcaron: OD,
  rcaron: BD,
  Rcedil: jD,
  rcedil: ND,
  rceil: HD,
  rcub: UD,
  Rcy: $D,
  rcy: VD,
  rdca: ZD,
  rdldhar: GD,
  rdquo: WD,
  rdquor: JD,
  rdsh: YD,
  real: QD,
  realine: KD,
  realpart: XD,
  reals: tS,
  Re: nS,
  rect: eS,
  reg: rS,
  REG: oS,
  ReverseElement: sS,
  ReverseEquilibrium: cS,
  ReverseUpEquilibrium: iS,
  rfisht: aS,
  rfloor: lS,
  rfr: uS,
  Rfr: fS,
  rHar: hS,
  rhard: pS,
  rharu: dS,
  rharul: gS,
  Rho: mS,
  rho: _S,
  rhov: vS,
  RightAngleBracket: kS,
  RightArrowBar: bS,
  rightarrow: xS,
  RightArrow: yS,
  Rightarrow: CS,
  RightArrowLeftArrow: AS,
  rightarrowtail: qS,
  RightCeiling: wS,
  RightDoubleBracket: ES,
  RightDownTeeVector: DS,
  RightDownVectorBar: SS,
  RightDownVector: FS,
  RightFloor: RS,
  rightharpoondown: TS,
  rightharpoonup: MS,
  rightleftarrows: zS,
  rightleftharpoons: LS,
  rightrightarrows: IS,
  rightsquigarrow: PS,
  RightTeeArrow: OS,
  RightTee: BS,
  RightTeeVector: jS,
  rightthreetimes: NS,
  RightTriangleBar: HS,
  RightTriangle: US,
  RightTriangleEqual: $S,
  RightUpDownVector: VS,
  RightUpTeeVector: ZS,
  RightUpVectorBar: GS,
  RightUpVector: WS,
  RightVectorBar: JS,
  RightVector: YS,
  ring: QS,
  risingdotseq: KS,
  rlarr: XS,
  rlhar: tF,
  rlm: nF,
  rmoustache: eF,
  rmoust: rF,
  rnmid: oF,
  roang: sF,
  roarr: cF,
  robrk: iF,
  ropar: aF,
  ropf: lF,
  Ropf: uF,
  roplus: fF,
  rotimes: hF,
  RoundImplies: pF,
  rpar: dF,
  rpargt: gF,
  rppolint: mF,
  rrarr: _F,
  Rrightarrow: vF,
  rsaquo: kF,
  rscr: bF,
  Rscr: xF,
  rsh: yF,
  Rsh: CF,
  rsqb: AF,
  rsquo: qF,
  rsquor: wF,
  rthree: EF,
  rtimes: DF,
  rtri: SF,
  rtrie: FF,
  rtrif: RF,
  rtriltri: TF,
  RuleDelayed: MF,
  ruluhar: zF,
  rx: LF,
  Sacute: IF,
  sacute: PF,
  sbquo: OF,
  scap: BF,
  Scaron: jF,
  scaron: NF,
  Sc: HF,
  sc: UF,
  sccue: $F,
  sce: VF,
  scE: ZF,
  Scedil: GF,
  scedil: WF,
  Scirc: JF,
  scirc: YF,
  scnap: QF,
  scnE: KF,
  scnsim: XF,
  scpolint: tR,
  scsim: nR,
  Scy: eR,
  scy: rR,
  sdotb: oR,
  sdot: sR,
  sdote: cR,
  searhk: iR,
  searr: aR,
  seArr: lR,
  searrow: uR,
  sect: fR,
  semi: hR,
  seswar: pR,
  setminus: dR,
  setmn: gR,
  sext: mR,
  Sfr: _R,
  sfr: vR,
  sfrown: kR,
  sharp: bR,
  SHCHcy: xR,
  shchcy: yR,
  SHcy: CR,
  shcy: AR,
  ShortDownArrow: qR,
  ShortLeftArrow: wR,
  shortmid: ER,
  shortparallel: DR,
  ShortRightArrow: SR,
  ShortUpArrow: FR,
  shy: RR,
  Sigma: TR,
  sigma: MR,
  sigmaf: zR,
  sigmav: LR,
  sim: IR,
  simdot: PR,
  sime: OR,
  simeq: BR,
  simg: jR,
  simgE: NR,
  siml: HR,
  simlE: UR,
  simne: $R,
  simplus: VR,
  simrarr: ZR,
  slarr: GR,
  SmallCircle: WR,
  smallsetminus: JR,
  smashp: YR,
  smeparsl: QR,
  smid: KR,
  smile: XR,
  smt: tT,
  smte: nT,
  smtes: eT,
  SOFTcy: rT,
  softcy: oT,
  solbar: sT,
  solb: cT,
  sol: iT,
  Sopf: aT,
  sopf: lT,
  spades: uT,
  spadesuit: fT,
  spar: hT,
  sqcap: pT,
  sqcaps: dT,
  sqcup: gT,
  sqcups: mT,
  Sqrt: _T,
  sqsub: vT,
  sqsube: kT,
  sqsubset: bT,
  sqsubseteq: xT,
  sqsup: yT,
  sqsupe: CT,
  sqsupset: AT,
  sqsupseteq: qT,
  square: wT,
  Square: ET,
  SquareIntersection: DT,
  SquareSubset: ST,
  SquareSubsetEqual: FT,
  SquareSuperset: RT,
  SquareSupersetEqual: TT,
  SquareUnion: MT,
  squarf: zT,
  squ: LT,
  squf: IT,
  srarr: PT,
  Sscr: OT,
  sscr: BT,
  ssetmn: jT,
  ssmile: NT,
  sstarf: HT,
  Star: UT,
  star: $T,
  starf: VT,
  straightepsilon: ZT,
  straightphi: GT,
  strns: WT,
  sub: JT,
  Sub: YT,
  subdot: QT,
  subE: KT,
  sube: XT,
  subedot: t3,
  submult: n3,
  subnE: e3,
  subne: r3,
  subplus: o3,
  subrarr: s3,
  subset: c3,
  Subset: i3,
  subseteq: a3,
  subseteqq: l3,
  SubsetEqual: u3,
  subsetneq: f3,
  subsetneqq: h3,
  subsim: p3,
  subsub: d3,
  subsup: g3,
  succapprox: m3,
  succ: _3,
  succcurlyeq: v3,
  Succeeds: k3,
  SucceedsEqual: b3,
  SucceedsSlantEqual: x3,
  SucceedsTilde: y3,
  succeq: C3,
  succnapprox: A3,
  succneqq: q3,
  succnsim: w3,
  succsim: E3,
  SuchThat: D3,
  sum: S3,
  Sum: F3,
  sung: R3,
  sup1: T3,
  sup2: M3,
  sup3: z3,
  sup: L3,
  Sup: I3,
  supdot: P3,
  supdsub: O3,
  supE: B3,
  supe: j3,
  supedot: N3,
  Superset: H3,
  SupersetEqual: U3,
  suphsol: $3,
  suphsub: V3,
  suplarr: Z3,
  supmult: G3,
  supnE: W3,
  supne: J3,
  supplus: Y3,
  supset: Q3,
  Supset: K3,
  supseteq: X3,
  supseteqq: t6,
  supsetneq: n6,
  supsetneqq: e6,
  supsim: r6,
  supsub: o6,
  supsup: s6,
  swarhk: c6,
  swarr: i6,
  swArr: a6,
  swarrow: l6,
  swnwar: u6,
  szlig: f6,
  Tab: h6,
  target: p6,
  Tau: d6,
  tau: g6,
  tbrk: m6,
  Tcaron: _6,
  tcaron: v6,
  Tcedil: k6,
  tcedil: b6,
  Tcy: x6,
  tcy: y6,
  tdot: C6,
  telrec: A6,
  Tfr: q6,
  tfr: w6,
  there4: E6,
  therefore: D6,
  Therefore: S6,
  Theta: F6,
  theta: R6,
  thetasym: T6,
  thetav: M6,
  thickapprox: z6,
  thicksim: L6,
  ThickSpace: I6,
  ThinSpace: P6,
  thinsp: O6,
  thkap: B6,
  thksim: j6,
  THORN: N6,
  thorn: H6,
  tilde: U6,
  Tilde: $6,
  TildeEqual: V6,
  TildeFullEqual: Z6,
  TildeTilde: G6,
  timesbar: W6,
  timesb: J6,
  times: Y6,
  timesd: Q6,
  tint: K6,
  toea: X6,
  topbot: tM,
  topcir: nM,
  top: eM,
  Topf: rM,
  topf: oM,
  topfork: sM,
  tosa: cM,
  tprime: iM,
  trade: aM,
  TRADE: lM,
  triangle: uM,
  triangledown: fM,
  triangleleft: hM,
  trianglelefteq: pM,
  triangleq: dM,
  triangleright: gM,
  trianglerighteq: mM,
  tridot: _M,
  trie: vM,
  triminus: kM,
  TripleDot: bM,
  triplus: xM,
  trisb: yM,
  tritime: CM,
  trpezium: AM,
  Tscr: qM,
  tscr: wM,
  TScy: EM,
  tscy: DM,
  TSHcy: SM,
  tshcy: FM,
  Tstrok: RM,
  tstrok: TM,
  twixt: MM,
  twoheadleftarrow: zM,
  twoheadrightarrow: LM,
  Uacute: IM,
  uacute: PM,
  uarr: OM,
  Uarr: BM,
  uArr: jM,
  Uarrocir: NM,
  Ubrcy: HM,
  ubrcy: UM,
  Ubreve: $M,
  ubreve: VM,
  Ucirc: ZM,
  ucirc: GM,
  Ucy: WM,
  ucy: JM,
  udarr: YM,
  Udblac: QM,
  udblac: KM,
  udhar: XM,
  ufisht: tz,
  Ufr: nz,
  ufr: ez,
  Ugrave: rz,
  ugrave: oz,
  uHar: sz,
  uharl: cz,
  uharr: iz,
  uhblk: az,
  ulcorn: lz,
  ulcorner: uz,
  ulcrop: fz,
  ultri: hz,
  Umacr: pz,
  umacr: dz,
  uml: gz,
  UnderBar: mz,
  UnderBrace: _z,
  UnderBracket: vz,
  UnderParenthesis: kz,
  Union: bz,
  UnionPlus: xz,
  Uogon: yz,
  uogon: Cz,
  Uopf: Az,
  uopf: qz,
  UpArrowBar: wz,
  uparrow: Ez,
  UpArrow: Dz,
  Uparrow: Sz,
  UpArrowDownArrow: Fz,
  updownarrow: Rz,
  UpDownArrow: Tz,
  Updownarrow: Mz,
  UpEquilibrium: zz,
  upharpoonleft: Lz,
  upharpoonright: Iz,
  uplus: Pz,
  UpperLeftArrow: Oz,
  UpperRightArrow: Bz,
  upsi: jz,
  Upsi: Nz,
  upsih: Hz,
  Upsilon: Uz,
  upsilon: $z,
  UpTeeArrow: Vz,
  UpTee: Zz,
  upuparrows: Gz,
  urcorn: Wz,
  urcorner: Jz,
  urcrop: Yz,
  Uring: Qz,
  uring: Kz,
  urtri: Xz,
  Uscr: tL,
  uscr: nL,
  utdot: eL,
  Utilde: rL,
  utilde: oL,
  utri: sL,
  utrif: cL,
  uuarr: iL,
  Uuml: aL,
  uuml: lL,
  uwangle: uL,
  vangrt: fL,
  varepsilon: hL,
  varkappa: pL,
  varnothing: dL,
  varphi: gL,
  varpi: mL,
  varpropto: _L,
  varr: vL,
  vArr: kL,
  varrho: bL,
  varsigma: xL,
  varsubsetneq: yL,
  varsubsetneqq: CL,
  varsupsetneq: AL,
  varsupsetneqq: qL,
  vartheta: wL,
  vartriangleleft: EL,
  vartriangleright: DL,
  vBar: SL,
  Vbar: FL,
  vBarv: RL,
  Vcy: TL,
  vcy: ML,
  vdash: zL,
  vDash: LL,
  Vdash: IL,
  VDash: PL,
  Vdashl: OL,
  veebar: BL,
  vee: jL,
  Vee: NL,
  veeeq: HL,
  vellip: UL,
  verbar: $L,
  Verbar: VL,
  vert: ZL,
  Vert: GL,
  VerticalBar: WL,
  VerticalLine: JL,
  VerticalSeparator: YL,
  VerticalTilde: QL,
  VeryThinSpace: KL,
  Vfr: XL,
  vfr: t5,
  vltri: n5,
  vnsub: e5,
  vnsup: r5,
  Vopf: o5,
  vopf: s5,
  vprop: c5,
  vrtri: i5,
  Vscr: a5,
  vscr: l5,
  vsubnE: u5,
  vsubne: f5,
  vsupnE: h5,
  vsupne: p5,
  Vvdash: d5,
  vzigzag: g5,
  Wcirc: m5,
  wcirc: _5,
  wedbar: v5,
  wedge: k5,
  Wedge: b5,
  wedgeq: x5,
  weierp: y5,
  Wfr: C5,
  wfr: A5,
  Wopf: q5,
  wopf: w5,
  wp: E5,
  wr: D5,
  wreath: S5,
  Wscr: F5,
  wscr: R5,
  xcap: T5,
  xcirc: M5,
  xcup: z5,
  xdtri: L5,
  Xfr: I5,
  xfr: P5,
  xharr: O5,
  xhArr: B5,
  Xi: j5,
  xi: N5,
  xlarr: H5,
  xlArr: U5,
  xmap: $5,
  xnis: V5,
  xodot: Z5,
  Xopf: G5,
  xopf: W5,
  xoplus: J5,
  xotime: Y5,
  xrarr: Q5,
  xrArr: K5,
  Xscr: X5,
  xscr: tI,
  xsqcup: nI,
  xuplus: eI,
  xutri: rI,
  xvee: oI,
  xwedge: sI,
  Yacute: cI,
  yacute: iI,
  YAcy: aI,
  yacy: lI,
  Ycirc: uI,
  ycirc: fI,
  Ycy: hI,
  ycy: pI,
  yen: dI,
  Yfr: gI,
  yfr: mI,
  YIcy: _I,
  yicy: vI,
  Yopf: kI,
  yopf: bI,
  Yscr: xI,
  yscr: yI,
  YUcy: CI,
  yucy: AI,
  yuml: qI,
  Yuml: wI,
  Zacute: EI,
  zacute: DI,
  Zcaron: SI,
  zcaron: FI,
  Zcy: RI,
  zcy: TI,
  Zdot: MI,
  zdot: zI,
  zeetrf: LI,
  ZeroWidthSpace: II,
  Zeta: PI,
  zeta: OI,
  zfr: BI,
  Zfr: jI,
  ZHcy: NI,
  zhcy: HI,
  zigrarr: UI,
  zopf: $I,
  Zopf: VI,
  Zscr: ZI,
  zscr: GI,
  zwj: WI,
  zwnj: JI
};
var rt, xn;
function $e() {
  return xn || (xn = 1, rt = YI), rt;
}
var ot, yn;
function un() {
  return yn || (yn = 1, ot = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/), ot;
}
var W = {}, st, Cn;
function QI() {
  if (Cn) return st;
  Cn = 1;
  var u = {};
  function t(n) {
    var r, o, s = u[n];
    if (s)
      return s;
    for (s = u[n] = [], r = 0; r < 128; r++)
      o = String.fromCharCode(r), /^[0-9a-z]$/i.test(o) ? s.push(o) : s.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));
    for (r = 0; r < n.length; r++)
      s[n.charCodeAt(r)] = n[r];
    return s;
  }
  function e(n, r, o) {
    var s, c, i, a, l, f = "";
    for (typeof r != "string" && (o = r, r = e.defaultChars), typeof o > "u" && (o = !0), l = t(r), s = 0, c = n.length; s < c; s++) {
      if (i = n.charCodeAt(s), o && i === 37 && s + 2 < c && /^[0-9a-f]{2}$/i.test(n.slice(s + 1, s + 3))) {
        f += n.slice(s, s + 3), s += 2;
        continue;
      }
      if (i < 128) {
        f += l[i];
        continue;
      }
      if (i >= 55296 && i <= 57343) {
        if (i >= 55296 && i <= 56319 && s + 1 < c && (a = n.charCodeAt(s + 1), a >= 56320 && a <= 57343)) {
          f += encodeURIComponent(n[s] + n[s + 1]), s++;
          continue;
        }
        f += "%EF%BF%BD";
        continue;
      }
      f += encodeURIComponent(n[s]);
    }
    return f;
  }
  return e.defaultChars = ";/?:@&=+$,-_.!~*'()#", e.componentChars = "-_.!~*'()", st = e, st;
}
var ct, An;
function KI() {
  if (An) return ct;
  An = 1;
  var u = {};
  function t(n) {
    var r, o, s = u[n];
    if (s)
      return s;
    for (s = u[n] = [], r = 0; r < 128; r++)
      o = String.fromCharCode(r), s.push(o);
    for (r = 0; r < n.length; r++)
      o = n.charCodeAt(r), s[o] = "%" + ("0" + o.toString(16).toUpperCase()).slice(-2);
    return s;
  }
  function e(n, r) {
    var o;
    return typeof r != "string" && (r = e.defaultChars), o = t(r), n.replace(/(%[a-f0-9]{2})+/gi, function(s) {
      var c, i, a, l, f, m, h, v = "";
      for (c = 0, i = s.length; c < i; c += 3) {
        if (a = parseInt(s.slice(c + 1, c + 3), 16), a < 128) {
          v += o[a];
          continue;
        }
        if ((a & 224) === 192 && c + 3 < i && (l = parseInt(s.slice(c + 4, c + 6), 16), (l & 192) === 128)) {
          h = a << 6 & 1984 | l & 63, h < 128 ? v += "��" : v += String.fromCharCode(h), c += 3;
          continue;
        }
        if ((a & 240) === 224 && c + 6 < i && (l = parseInt(s.slice(c + 4, c + 6), 16), f = parseInt(s.slice(c + 7, c + 9), 16), (l & 192) === 128 && (f & 192) === 128)) {
          h = a << 12 & 61440 | l << 6 & 4032 | f & 63, h < 2048 || h >= 55296 && h <= 57343 ? v += "���" : v += String.fromCharCode(h), c += 6;
          continue;
        }
        if ((a & 248) === 240 && c + 9 < i && (l = parseInt(s.slice(c + 4, c + 6), 16), f = parseInt(s.slice(c + 7, c + 9), 16), m = parseInt(s.slice(c + 10, c + 12), 16), (l & 192) === 128 && (f & 192) === 128 && (m & 192) === 128)) {
          h = a << 18 & 1835008 | l << 12 & 258048 | f << 6 & 4032 | m & 63, h < 65536 || h > 1114111 ? v += "����" : (h -= 65536, v += String.fromCharCode(55296 + (h >> 10), 56320 + (h & 1023))), c += 9;
          continue;
        }
        v += "�";
      }
      return v;
    });
  }
  return e.defaultChars = ";/?:@&=+$,#", e.componentChars = "", ct = e, ct;
}
var it, qn;
function XI() {
  return qn || (qn = 1, it = function(t) {
    var e = "";
    return e += t.protocol || "", e += t.slashes ? "//" : "", e += t.auth ? t.auth + "@" : "", t.hostname && t.hostname.indexOf(":") !== -1 ? e += "[" + t.hostname + "]" : e += t.hostname || "", e += t.port ? ":" + t.port : "", e += t.pathname || "", e += t.search || "", e += t.hash || "", e;
  }), it;
}
var at, wn;
function tP() {
  if (wn) return at;
  wn = 1;
  function u() {
    this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
  }
  var t = /^([a-z0-9.+-]+:)/i, e = /:[0-9]*$/, n = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, r = ["<", ">", '"', "`", " ", "\r", `
`, "	"], o = ["{", "}", "|", "\\", "^", "`"].concat(r), s = ["'"].concat(o), c = ["%", "/", "?", ";", "#"].concat(s), i = ["/", "?", "#"], a = 255, l = /^[+a-z0-9A-Z_-]{0,63}$/, f = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, m = {
    javascript: !0,
    "javascript:": !0
  }, h = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  };
  function v(_, y) {
    if (_ && _ instanceof u)
      return _;
    var d = new u();
    return d.parse(_, y), d;
  }
  return u.prototype.parse = function(_, y) {
    var d, k, p, g, b, x = _;
    if (x = x.trim(), !y && _.split("#").length === 1) {
      var q = n.exec(x);
      if (q)
        return this.pathname = q[1], q[2] && (this.search = q[2]), this;
    }
    var C = t.exec(x);
    if (C && (C = C[0], p = C.toLowerCase(), this.protocol = C, x = x.substr(C.length)), (y || C || x.match(/^\/\/[^@\/]+@[^@\/]+/)) && (b = x.substr(0, 2) === "//", b && !(C && m[C]) && (x = x.substr(2), this.slashes = !0)), !m[C] && (b || C && !h[C])) {
      var E = -1;
      for (d = 0; d < i.length; d++)
        g = x.indexOf(i[d]), g !== -1 && (E === -1 || g < E) && (E = g);
      var w, D;
      for (E === -1 ? D = x.lastIndexOf("@") : D = x.lastIndexOf("@", E), D !== -1 && (w = x.slice(0, D), x = x.slice(D + 1), this.auth = w), E = -1, d = 0; d < c.length; d++)
        g = x.indexOf(c[d]), g !== -1 && (E === -1 || g < E) && (E = g);
      E === -1 && (E = x.length), x[E - 1] === ":" && E--;
      var R = x.slice(0, E);
      x = x.slice(E), this.parseHost(R), this.hostname = this.hostname || "";
      var O = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!O) {
        var A = this.hostname.split(/\./);
        for (d = 0, k = A.length; d < k; d++) {
          var F = A[d];
          if (F && !F.match(l)) {
            for (var M = "", B = 0, J = F.length; B < J; B++)
              F.charCodeAt(B) > 127 ? M += "x" : M += F[B];
            if (!M.match(l)) {
              var V = A.slice(0, d), P = A.slice(d + 1), U = F.match(f);
              U && (V.push(U[1]), P.unshift(U[2])), P.length && (x = P.join(".") + x), this.hostname = V.join(".");
              break;
            }
          }
        }
      }
      this.hostname.length > a && (this.hostname = ""), O && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
    }
    var Z = x.indexOf("#");
    Z !== -1 && (this.hash = x.substr(Z), x = x.slice(0, Z));
    var nt = x.indexOf("?");
    return nt !== -1 && (this.search = x.substr(nt), x = x.slice(0, nt)), x && (this.pathname = x), h[p] && this.hostname && !this.pathname && (this.pathname = ""), this;
  }, u.prototype.parseHost = function(_) {
    var y = e.exec(_);
    y && (y = y[0], y !== ":" && (this.port = y.substr(1)), _ = _.substr(0, _.length - y.length)), _ && (this.hostname = _);
  }, at = v, at;
}
var En;
function Ve() {
  return En || (En = 1, W.encode = QI(), W.decode = KI(), W.format = XI(), W.parse = tP()), W;
}
var $ = {}, lt, Dn;
function Ze() {
  return Dn || (Dn = 1, lt = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), lt;
}
var ut, Sn;
function Ge() {
  return Sn || (Sn = 1, ut = /[\0-\x1F\x7F-\x9F]/), ut;
}
var ft, Fn;
function nP() {
  return Fn || (Fn = 1, ft = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), ft;
}
var ht, Rn;
function We() {
  return Rn || (Rn = 1, ht = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), ht;
}
var Tn;
function eP() {
  return Tn || (Tn = 1, $.Any = Ze(), $.Cc = Ge(), $.Cf = nP(), $.P = un(), $.Z = We()), $;
}
var Mn;
function T() {
  return Mn || (Mn = 1, function(u) {
    function t(A) {
      return Object.prototype.toString.call(A);
    }
    function e(A) {
      return t(A) === "[object String]";
    }
    var n = Object.prototype.hasOwnProperty;
    function r(A, F) {
      return n.call(A, F);
    }
    function o(A) {
      var F = Array.prototype.slice.call(arguments, 1);
      return F.forEach(function(M) {
        if (M) {
          if (typeof M != "object")
            throw new TypeError(M + "must be object");
          Object.keys(M).forEach(function(B) {
            A[B] = M[B];
          });
        }
      }), A;
    }
    function s(A, F, M) {
      return [].concat(A.slice(0, F), M, A.slice(F + 1));
    }
    function c(A) {
      return !(A >= 55296 && A <= 57343 || A >= 64976 && A <= 65007 || (A & 65535) === 65535 || (A & 65535) === 65534 || A >= 0 && A <= 8 || A === 11 || A >= 14 && A <= 31 || A >= 127 && A <= 159 || A > 1114111);
    }
    function i(A) {
      if (A > 65535) {
        A -= 65536;
        var F = 55296 + (A >> 10), M = 56320 + (A & 1023);
        return String.fromCharCode(F, M);
      }
      return String.fromCharCode(A);
    }
    var a = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, l = /&([a-z#][a-z0-9]{1,31});/gi, f = new RegExp(a.source + "|" + l.source, "gi"), m = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, h = $e();
    function v(A, F) {
      var M = 0;
      return r(h, F) ? h[F] : F.charCodeAt(0) === 35 && m.test(F) && (M = F[1].toLowerCase() === "x" ? parseInt(F.slice(2), 16) : parseInt(F.slice(1), 10), c(M)) ? i(M) : A;
    }
    function _(A) {
      return A.indexOf("\\") < 0 ? A : A.replace(a, "$1");
    }
    function y(A) {
      return A.indexOf("\\") < 0 && A.indexOf("&") < 0 ? A : A.replace(f, function(F, M, B) {
        return M || v(F, B);
      });
    }
    var d = /[&<>"]/, k = /[&<>"]/g, p = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function g(A) {
      return p[A];
    }
    function b(A) {
      return d.test(A) ? A.replace(k, g) : A;
    }
    var x = /[.?*+^$[\]\\(){}|-]/g;
    function q(A) {
      return A.replace(x, "\\$&");
    }
    function C(A) {
      switch (A) {
        case 9:
        case 32:
          return !0;
      }
      return !1;
    }
    function E(A) {
      if (A >= 8192 && A <= 8202)
        return !0;
      switch (A) {
        case 9:
        // \t
        case 10:
        // \n
        case 11:
        // \v
        case 12:
        // \f
        case 13:
        // \r
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return !0;
      }
      return !1;
    }
    var w = un();
    function D(A) {
      return w.test(A);
    }
    function R(A) {
      switch (A) {
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
    }
    function O(A) {
      return A = A.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (A = A.replace(/ẞ/g, "ß")), A.toLowerCase().toUpperCase();
    }
    u.lib = {}, u.lib.mdurl = Ve(), u.lib.ucmicro = eP(), u.assign = o, u.isString = e, u.has = r, u.unescapeMd = _, u.unescapeAll = y, u.isValidEntityCode = c, u.fromCodePoint = i, u.escapeHtml = b, u.arrayReplaceAt = s, u.isSpace = C, u.isWhiteSpace = E, u.isMdAsciiPunct = R, u.isPunctChar = D, u.escapeRE = q, u.normalizeReference = O;
  }(et)), et;
}
var Y = {}, pt, zn;
function rP() {
  return zn || (zn = 1, pt = function(t, e, n) {
    var r, o, s, c, i = -1, a = t.posMax, l = t.pos;
    for (t.pos = e + 1, r = 1; t.pos < a; ) {
      if (s = t.src.charCodeAt(t.pos), s === 93 && (r--, r === 0)) {
        o = !0;
        break;
      }
      if (c = t.pos, t.md.inline.skipToken(t), s === 91) {
        if (c === t.pos - 1)
          r++;
        else if (n)
          return t.pos = l, -1;
      }
    }
    return o && (i = t.pos), t.pos = l, i;
  }), pt;
}
var dt, Ln;
function oP() {
  if (Ln) return dt;
  Ln = 1;
  var u = T().unescapeAll;
  return dt = function(e, n, r) {
    var o, s, c = 0, i = n, a = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
    if (e.charCodeAt(n) === 60) {
      for (n++; n < r; ) {
        if (o = e.charCodeAt(n), o === 10 || o === 60)
          return a;
        if (o === 62)
          return a.pos = n + 1, a.str = u(e.slice(i + 1, n)), a.ok = !0, a;
        if (o === 92 && n + 1 < r) {
          n += 2;
          continue;
        }
        n++;
      }
      return a;
    }
    for (s = 0; n < r && (o = e.charCodeAt(n), !(o === 32 || o < 32 || o === 127)); ) {
      if (o === 92 && n + 1 < r) {
        if (e.charCodeAt(n + 1) === 32)
          break;
        n += 2;
        continue;
      }
      if (o === 40 && (s++, s > 32))
        return a;
      if (o === 41) {
        if (s === 0)
          break;
        s--;
      }
      n++;
    }
    return i === n || s !== 0 || (a.str = u(e.slice(i, n)), a.lines = c, a.pos = n, a.ok = !0), a;
  }, dt;
}
var gt, In;
function sP() {
  if (In) return gt;
  In = 1;
  var u = T().unescapeAll;
  return gt = function(e, n, r) {
    var o, s, c = 0, i = n, a = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
    if (n >= r || (s = e.charCodeAt(n), s !== 34 && s !== 39 && s !== 40))
      return a;
    for (n++, s === 40 && (s = 41); n < r; ) {
      if (o = e.charCodeAt(n), o === s)
        return a.pos = n + 1, a.lines = c, a.str = u(e.slice(i + 1, n)), a.ok = !0, a;
      if (o === 40 && s === 41)
        return a;
      o === 10 ? c++ : o === 92 && n + 1 < r && (n++, e.charCodeAt(n) === 10 && c++), n++;
    }
    return a;
  }, gt;
}
var Pn;
function cP() {
  return Pn || (Pn = 1, Y.parseLinkLabel = rP(), Y.parseLinkDestination = oP(), Y.parseLinkTitle = sP()), Y;
}
var mt, On;
function iP() {
  if (On) return mt;
  On = 1;
  var u = T().assign, t = T().unescapeAll, e = T().escapeHtml, n = {};
  n.code_inline = function(o, s, c, i, a) {
    var l = o[s];
    return "<code" + a.renderAttrs(l) + ">" + e(o[s].content) + "</code>";
  }, n.code_block = function(o, s, c, i, a) {
    var l = o[s];
    return "<pre" + a.renderAttrs(l) + "><code>" + e(o[s].content) + `</code></pre>
`;
  }, n.fence = function(o, s, c, i, a) {
    var l = o[s], f = l.info ? t(l.info).trim() : "", m = "", h = "", v, _, y, d, k;
    return f && (y = f.split(/(\s+)/g), m = y[0], h = y.slice(2).join("")), c.highlight ? v = c.highlight(l.content, m, h) || e(l.content) : v = e(l.content), v.indexOf("<pre") === 0 ? v + `
` : f ? (_ = l.attrIndex("class"), d = l.attrs ? l.attrs.slice() : [], _ < 0 ? d.push(["class", c.langPrefix + m]) : (d[_] = d[_].slice(), d[_][1] += " " + c.langPrefix + m), k = {
      attrs: d
    }, "<pre><code" + a.renderAttrs(k) + ">" + v + `</code></pre>
`) : "<pre><code" + a.renderAttrs(l) + ">" + v + `</code></pre>
`;
  }, n.image = function(o, s, c, i, a) {
    var l = o[s];
    return l.attrs[l.attrIndex("alt")][1] = a.renderInlineAsText(l.children, c, i), a.renderToken(o, s, c);
  }, n.hardbreak = function(o, s, c) {
    return c.xhtmlOut ? `<br />
` : `<br>
`;
  }, n.softbreak = function(o, s, c) {
    return c.breaks ? c.xhtmlOut ? `<br />
` : `<br>
` : `
`;
  }, n.text = function(o, s) {
    return e(o[s].content);
  }, n.html_block = function(o, s) {
    return o[s].content;
  }, n.html_inline = function(o, s) {
    return o[s].content;
  };
  function r() {
    this.rules = u({}, n);
  }
  return r.prototype.renderAttrs = function(s) {
    var c, i, a;
    if (!s.attrs)
      return "";
    for (a = "", c = 0, i = s.attrs.length; c < i; c++)
      a += " " + e(s.attrs[c][0]) + '="' + e(s.attrs[c][1]) + '"';
    return a;
  }, r.prototype.renderToken = function(s, c, i) {
    var a, l = "", f = !1, m = s[c];
    return m.hidden ? "" : (m.block && m.nesting !== -1 && c && s[c - 1].hidden && (l += `
`), l += (m.nesting === -1 ? "</" : "<") + m.tag, l += this.renderAttrs(m), m.nesting === 0 && i.xhtmlOut && (l += " /"), m.block && (f = !0, m.nesting === 1 && c + 1 < s.length && (a = s[c + 1], (a.type === "inline" || a.hidden || a.nesting === -1 && a.tag === m.tag) && (f = !1))), l += f ? `>
` : ">", l);
  }, r.prototype.renderInline = function(o, s, c) {
    for (var i, a = "", l = this.rules, f = 0, m = o.length; f < m; f++)
      i = o[f].type, typeof l[i] < "u" ? a += l[i](o, f, s, c, this) : a += this.renderToken(o, f, s);
    return a;
  }, r.prototype.renderInlineAsText = function(o, s, c) {
    for (var i = "", a = 0, l = o.length; a < l; a++)
      o[a].type === "text" ? i += o[a].content : o[a].type === "image" ? i += this.renderInlineAsText(o[a].children, s, c) : o[a].type === "softbreak" && (i += `
`);
    return i;
  }, r.prototype.render = function(o, s, c) {
    var i, a, l, f = "", m = this.rules;
    for (i = 0, a = o.length; i < a; i++)
      l = o[i].type, l === "inline" ? f += this.renderInline(o[i].children, s, c) : typeof m[l] < "u" ? f += m[o[i].type](o, i, s, c, this) : f += this.renderToken(o, i, s, c);
    return f;
  }, mt = r, mt;
}
var _t, Bn;
function fn() {
  if (Bn) return _t;
  Bn = 1;
  function u() {
    this.__rules__ = [], this.__cache__ = null;
  }
  return u.prototype.__find__ = function(t) {
    for (var e = 0; e < this.__rules__.length; e++)
      if (this.__rules__[e].name === t)
        return e;
    return -1;
  }, u.prototype.__compile__ = function() {
    var t = this, e = [""];
    t.__rules__.forEach(function(n) {
      n.enabled && n.alt.forEach(function(r) {
        e.indexOf(r) < 0 && e.push(r);
      });
    }), t.__cache__ = {}, e.forEach(function(n) {
      t.__cache__[n] = [], t.__rules__.forEach(function(r) {
        r.enabled && (n && r.alt.indexOf(n) < 0 || t.__cache__[n].push(r.fn));
      });
    });
  }, u.prototype.at = function(t, e, n) {
    var r = this.__find__(t), o = n || {};
    if (r === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__[r].fn = e, this.__rules__[r].alt = o.alt || [], this.__cache__ = null;
  }, u.prototype.before = function(t, e, n, r) {
    var o = this.__find__(t), s = r || {};
    if (o === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__.splice(o, 0, {
      name: e,
      enabled: !0,
      fn: n,
      alt: s.alt || []
    }), this.__cache__ = null;
  }, u.prototype.after = function(t, e, n, r) {
    var o = this.__find__(t), s = r || {};
    if (o === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__.splice(o + 1, 0, {
      name: e,
      enabled: !0,
      fn: n,
      alt: s.alt || []
    }), this.__cache__ = null;
  }, u.prototype.push = function(t, e, n) {
    var r = n || {};
    this.__rules__.push({
      name: t,
      enabled: !0,
      fn: e,
      alt: r.alt || []
    }), this.__cache__ = null;
  }, u.prototype.enable = function(t, e) {
    Array.isArray(t) || (t = [t]);
    var n = [];
    return t.forEach(function(r) {
      var o = this.__find__(r);
      if (o < 0) {
        if (e)
          return;
        throw new Error("Rules manager: invalid rule name " + r);
      }
      this.__rules__[o].enabled = !0, n.push(r);
    }, this), this.__cache__ = null, n;
  }, u.prototype.enableOnly = function(t, e) {
    Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(n) {
      n.enabled = !1;
    }), this.enable(t, e);
  }, u.prototype.disable = function(t, e) {
    Array.isArray(t) || (t = [t]);
    var n = [];
    return t.forEach(function(r) {
      var o = this.__find__(r);
      if (o < 0) {
        if (e)
          return;
        throw new Error("Rules manager: invalid rule name " + r);
      }
      this.__rules__[o].enabled = !1, n.push(r);
    }, this), this.__cache__ = null, n;
  }, u.prototype.getRules = function(t) {
    return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
  }, _t = u, _t;
}
var vt, jn;
function aP() {
  if (jn) return vt;
  jn = 1;
  var u = /\r\n?|\n/g, t = /\0/g;
  return vt = function(n) {
    var r;
    r = n.src.replace(u, `
`), r = r.replace(t, "�"), n.src = r;
  }, vt;
}
var kt, Nn;
function lP() {
  return Nn || (Nn = 1, kt = function(t) {
    var e;
    t.inlineMode ? (e = new t.Token("inline", "", 0), e.content = t.src, e.map = [0, 1], e.children = [], t.tokens.push(e)) : t.md.block.parse(t.src, t.md, t.env, t.tokens);
  }), kt;
}
var bt, Hn;
function uP() {
  return Hn || (Hn = 1, bt = function(t) {
    var e = t.tokens, n, r, o;
    for (r = 0, o = e.length; r < o; r++)
      n = e[r], n.type === "inline" && t.md.inline.parse(n.content, t.md, t.env, n.children);
  }), bt;
}
var xt, Un;
function fP() {
  if (Un) return xt;
  Un = 1;
  var u = T().arrayReplaceAt;
  function t(n) {
    return /^<a[>\s]/i.test(n);
  }
  function e(n) {
    return /^<\/a\s*>/i.test(n);
  }
  return xt = function(r) {
    var o, s, c, i, a, l, f, m, h, v, _, y, d, k, p, g, b = r.tokens, x;
    if (r.md.options.linkify) {
      for (s = 0, c = b.length; s < c; s++)
        if (!(b[s].type !== "inline" || !r.md.linkify.pretest(b[s].content)))
          for (i = b[s].children, d = 0, o = i.length - 1; o >= 0; o--) {
            if (l = i[o], l.type === "link_close") {
              for (o--; i[o].level !== l.level && i[o].type !== "link_open"; )
                o--;
              continue;
            }
            if (l.type === "html_inline" && (t(l.content) && d > 0 && d--, e(l.content) && d++), !(d > 0) && l.type === "text" && r.md.linkify.test(l.content)) {
              for (h = l.content, x = r.md.linkify.match(h), f = [], y = l.level, _ = 0, x.length > 0 && x[0].index === 0 && o > 0 && i[o - 1].type === "text_special" && (x = x.slice(1)), m = 0; m < x.length; m++)
                k = x[m].url, p = r.md.normalizeLink(k), r.md.validateLink(p) && (g = x[m].text, x[m].schema ? x[m].schema === "mailto:" && !/^mailto:/i.test(g) ? g = r.md.normalizeLinkText("mailto:" + g).replace(/^mailto:/, "") : g = r.md.normalizeLinkText(g) : g = r.md.normalizeLinkText("http://" + g).replace(/^http:\/\//, ""), v = x[m].index, v > _ && (a = new r.Token("text", "", 0), a.content = h.slice(_, v), a.level = y, f.push(a)), a = new r.Token("link_open", "a", 1), a.attrs = [["href", p]], a.level = y++, a.markup = "linkify", a.info = "auto", f.push(a), a = new r.Token("text", "", 0), a.content = g, a.level = y, f.push(a), a = new r.Token("link_close", "a", -1), a.level = --y, a.markup = "linkify", a.info = "auto", f.push(a), _ = x[m].lastIndex);
              _ < h.length && (a = new r.Token("text", "", 0), a.content = h.slice(_), a.level = y, f.push(a)), b[s].children = i = u(i, o, f);
            }
          }
    }
  }, xt;
}
var yt, $n;
function hP() {
  if ($n) return yt;
  $n = 1;
  var u = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, t = /\((c|tm|r)\)/i, e = /\((c|tm|r)\)/ig, n = {
    c: "©",
    r: "®",
    tm: "™"
  };
  function r(c, i) {
    return n[i.toLowerCase()];
  }
  function o(c) {
    var i, a, l = 0;
    for (i = c.length - 1; i >= 0; i--)
      a = c[i], a.type === "text" && !l && (a.content = a.content.replace(e, r)), a.type === "link_open" && a.info === "auto" && l--, a.type === "link_close" && a.info === "auto" && l++;
  }
  function s(c) {
    var i, a, l = 0;
    for (i = c.length - 1; i >= 0; i--)
      a = c[i], a.type === "text" && !l && u.test(a.content) && (a.content = a.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), a.type === "link_open" && a.info === "auto" && l--, a.type === "link_close" && a.info === "auto" && l++;
  }
  return yt = function(i) {
    var a;
    if (i.md.options.typographer)
      for (a = i.tokens.length - 1; a >= 0; a--)
        i.tokens[a].type === "inline" && (t.test(i.tokens[a].content) && o(i.tokens[a].children), u.test(i.tokens[a].content) && s(i.tokens[a].children));
  }, yt;
}
var Ct, Vn;
function pP() {
  if (Vn) return Ct;
  Vn = 1;
  var u = T().isWhiteSpace, t = T().isPunctChar, e = T().isMdAsciiPunct, n = /['"]/, r = /['"]/g, o = "’";
  function s(i, a, l) {
    return i.slice(0, a) + l + i.slice(a + 1);
  }
  function c(i, a) {
    var l, f, m, h, v, _, y, d, k, p, g, b, x, q, C, E, w, D, R, O, A;
    for (R = [], l = 0; l < i.length; l++) {
      for (f = i[l], y = i[l].level, w = R.length - 1; w >= 0 && !(R[w].level <= y); w--)
        ;
      if (R.length = w + 1, f.type === "text") {
        m = f.content, v = 0, _ = m.length;
        t:
          for (; v < _ && (r.lastIndex = v, h = r.exec(m), !!h); ) {
            if (C = E = !0, v = h.index + 1, D = h[0] === "'", k = 32, h.index - 1 >= 0)
              k = m.charCodeAt(h.index - 1);
            else
              for (w = l - 1; w >= 0 && !(i[w].type === "softbreak" || i[w].type === "hardbreak"); w--)
                if (i[w].content) {
                  k = i[w].content.charCodeAt(i[w].content.length - 1);
                  break;
                }
            if (p = 32, v < _)
              p = m.charCodeAt(v);
            else
              for (w = l + 1; w < i.length && !(i[w].type === "softbreak" || i[w].type === "hardbreak"); w++)
                if (i[w].content) {
                  p = i[w].content.charCodeAt(0);
                  break;
                }
            if (g = e(k) || t(String.fromCharCode(k)), b = e(p) || t(String.fromCharCode(p)), x = u(k), q = u(p), q ? C = !1 : b && (x || g || (C = !1)), x ? E = !1 : g && (q || b || (E = !1)), p === 34 && h[0] === '"' && k >= 48 && k <= 57 && (E = C = !1), C && E && (C = g, E = b), !C && !E) {
              D && (f.content = s(f.content, h.index, o));
              continue;
            }
            if (E) {
              for (w = R.length - 1; w >= 0 && (d = R[w], !(R[w].level < y)); w--)
                if (d.single === D && R[w].level === y) {
                  d = R[w], D ? (O = a.md.options.quotes[2], A = a.md.options.quotes[3]) : (O = a.md.options.quotes[0], A = a.md.options.quotes[1]), f.content = s(f.content, h.index, A), i[d.token].content = s(
                    i[d.token].content,
                    d.pos,
                    O
                  ), v += A.length - 1, d.token === l && (v += O.length - 1), m = f.content, _ = m.length, R.length = w;
                  continue t;
                }
            }
            C ? R.push({
              token: l,
              pos: h.index,
              single: D,
              level: y
            }) : E && D && (f.content = s(f.content, h.index, o));
          }
      }
    }
  }
  return Ct = function(a) {
    var l;
    if (a.md.options.typographer)
      for (l = a.tokens.length - 1; l >= 0; l--)
        a.tokens[l].type !== "inline" || !n.test(a.tokens[l].content) || c(a.tokens[l].children, a);
  }, Ct;
}
var At, Zn;
function dP() {
  return Zn || (Zn = 1, At = function(t) {
    var e, n, r, o, s, c, i = t.tokens;
    for (e = 0, n = i.length; e < n; e++)
      if (i[e].type === "inline") {
        for (r = i[e].children, s = r.length, o = 0; o < s; o++)
          r[o].type === "text_special" && (r[o].type = "text");
        for (o = c = 0; o < s; o++)
          r[o].type === "text" && o + 1 < s && r[o + 1].type === "text" ? r[o + 1].content = r[o].content + r[o + 1].content : (o !== c && (r[c] = r[o]), c++);
        o !== c && (r.length = c);
      }
  }), At;
}
var qt, Gn;
function hn() {
  if (Gn) return qt;
  Gn = 1;
  function u(t, e, n) {
    this.type = t, this.tag = e, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
  }
  return u.prototype.attrIndex = function(e) {
    var n, r, o;
    if (!this.attrs)
      return -1;
    for (n = this.attrs, r = 0, o = n.length; r < o; r++)
      if (n[r][0] === e)
        return r;
    return -1;
  }, u.prototype.attrPush = function(e) {
    this.attrs ? this.attrs.push(e) : this.attrs = [e];
  }, u.prototype.attrSet = function(e, n) {
    var r = this.attrIndex(e), o = [e, n];
    r < 0 ? this.attrPush(o) : this.attrs[r] = o;
  }, u.prototype.attrGet = function(e) {
    var n = this.attrIndex(e), r = null;
    return n >= 0 && (r = this.attrs[n][1]), r;
  }, u.prototype.attrJoin = function(e, n) {
    var r = this.attrIndex(e);
    r < 0 ? this.attrPush([e, n]) : this.attrs[r][1] = this.attrs[r][1] + " " + n;
  }, qt = u, qt;
}
var wt, Wn;
function gP() {
  if (Wn) return wt;
  Wn = 1;
  var u = hn();
  function t(e, n, r) {
    this.src = e, this.env = r, this.tokens = [], this.inlineMode = !1, this.md = n;
  }
  return t.prototype.Token = u, wt = t, wt;
}
var Et, Jn;
function mP() {
  if (Jn) return Et;
  Jn = 1;
  var u = fn(), t = [
    ["normalize", aP()],
    ["block", lP()],
    ["inline", uP()],
    ["linkify", fP()],
    ["replacements", hP()],
    ["smartquotes", pP()],
    // `text_join` finds `text_special` tokens (for escape sequences)
    // and joins them with the rest of the text
    ["text_join", dP()]
  ];
  function e() {
    this.ruler = new u();
    for (var n = 0; n < t.length; n++)
      this.ruler.push(t[n][0], t[n][1]);
  }
  return e.prototype.process = function(n) {
    var r, o, s;
    for (s = this.ruler.getRules(""), r = 0, o = s.length; r < o; r++)
      s[r](n);
  }, e.prototype.State = gP(), Et = e, Et;
}
var Dt, Yn;
function _P() {
  if (Yn) return Dt;
  Yn = 1;
  var u = T().isSpace;
  function t(n, r) {
    var o = n.bMarks[r] + n.tShift[r], s = n.eMarks[r];
    return n.src.slice(o, s);
  }
  function e(n) {
    var r = [], o = 0, s = n.length, c, i = !1, a = 0, l = "";
    for (c = n.charCodeAt(o); o < s; )
      c === 124 && (i ? (l += n.substring(a, o - 1), a = o) : (r.push(l + n.substring(a, o)), l = "", a = o + 1)), i = c === 92, o++, c = n.charCodeAt(o);
    return r.push(l + n.substring(a)), r;
  }
  return Dt = function(r, o, s, c) {
    var i, a, l, f, m, h, v, _, y, d, k, p, g, b, x, q, C, E;
    if (o + 2 > s || (h = o + 1, r.sCount[h] < r.blkIndent) || r.sCount[h] - r.blkIndent >= 4 || (l = r.bMarks[h] + r.tShift[h], l >= r.eMarks[h]) || (C = r.src.charCodeAt(l++), C !== 124 && C !== 45 && C !== 58) || l >= r.eMarks[h] || (E = r.src.charCodeAt(l++), E !== 124 && E !== 45 && E !== 58 && !u(E)) || C === 45 && u(E))
      return !1;
    for (; l < r.eMarks[h]; ) {
      if (i = r.src.charCodeAt(l), i !== 124 && i !== 45 && i !== 58 && !u(i))
        return !1;
      l++;
    }
    for (a = t(r, o + 1), v = a.split("|"), d = [], f = 0; f < v.length; f++) {
      if (k = v[f].trim(), !k) {
        if (f === 0 || f === v.length - 1)
          continue;
        return !1;
      }
      if (!/^:?-+:?$/.test(k))
        return !1;
      k.charCodeAt(k.length - 1) === 58 ? d.push(k.charCodeAt(0) === 58 ? "center" : "right") : k.charCodeAt(0) === 58 ? d.push("left") : d.push("");
    }
    if (a = t(r, o).trim(), a.indexOf("|") === -1 || r.sCount[o] - r.blkIndent >= 4 || (v = e(a), v.length && v[0] === "" && v.shift(), v.length && v[v.length - 1] === "" && v.pop(), _ = v.length, _ === 0 || _ !== d.length))
      return !1;
    if (c)
      return !0;
    for (b = r.parentType, r.parentType = "table", q = r.md.block.ruler.getRules("blockquote"), y = r.push("table_open", "table", 1), y.map = p = [o, 0], y = r.push("thead_open", "thead", 1), y.map = [o, o + 1], y = r.push("tr_open", "tr", 1), y.map = [o, o + 1], f = 0; f < v.length; f++)
      y = r.push("th_open", "th", 1), d[f] && (y.attrs = [["style", "text-align:" + d[f]]]), y = r.push("inline", "", 0), y.content = v[f].trim(), y.children = [], y = r.push("th_close", "th", -1);
    for (y = r.push("tr_close", "tr", -1), y = r.push("thead_close", "thead", -1), h = o + 2; h < s && !(r.sCount[h] < r.blkIndent); h++) {
      for (x = !1, f = 0, m = q.length; f < m; f++)
        if (q[f](r, h, s, !0)) {
          x = !0;
          break;
        }
      if (x || (a = t(r, h).trim(), !a) || r.sCount[h] - r.blkIndent >= 4)
        break;
      for (v = e(a), v.length && v[0] === "" && v.shift(), v.length && v[v.length - 1] === "" && v.pop(), h === o + 2 && (y = r.push("tbody_open", "tbody", 1), y.map = g = [o + 2, 0]), y = r.push("tr_open", "tr", 1), y.map = [h, h + 1], f = 0; f < _; f++)
        y = r.push("td_open", "td", 1), d[f] && (y.attrs = [["style", "text-align:" + d[f]]]), y = r.push("inline", "", 0), y.content = v[f] ? v[f].trim() : "", y.children = [], y = r.push("td_close", "td", -1);
      y = r.push("tr_close", "tr", -1);
    }
    return g && (y = r.push("tbody_close", "tbody", -1), g[1] = h), y = r.push("table_close", "table", -1), p[1] = h, r.parentType = b, r.line = h, !0;
  }, Dt;
}
var St, Qn;
function vP() {
  return Qn || (Qn = 1, St = function(t, e, n) {
    var r, o, s;
    if (t.sCount[e] - t.blkIndent < 4)
      return !1;
    for (o = r = e + 1; r < n; ) {
      if (t.isEmpty(r)) {
        r++;
        continue;
      }
      if (t.sCount[r] - t.blkIndent >= 4) {
        r++, o = r;
        continue;
      }
      break;
    }
    return t.line = o, s = t.push("code_block", "code", 0), s.content = t.getLines(e, o, 4 + t.blkIndent, !1) + `
`, s.map = [e, t.line], !0;
  }), St;
}
var Ft, Kn;
function kP() {
  return Kn || (Kn = 1, Ft = function(t, e, n, r) {
    var o, s, c, i, a, l, f, m = !1, h = t.bMarks[e] + t.tShift[e], v = t.eMarks[e];
    if (t.sCount[e] - t.blkIndent >= 4 || h + 3 > v || (o = t.src.charCodeAt(h), o !== 126 && o !== 96) || (a = h, h = t.skipChars(h, o), s = h - a, s < 3) || (f = t.src.slice(a, h), c = t.src.slice(h, v), o === 96 && c.indexOf(String.fromCharCode(o)) >= 0))
      return !1;
    if (r)
      return !0;
    for (i = e; i++, !(i >= n || (h = a = t.bMarks[i] + t.tShift[i], v = t.eMarks[i], h < v && t.sCount[i] < t.blkIndent)); )
      if (t.src.charCodeAt(h) === o && !(t.sCount[i] - t.blkIndent >= 4) && (h = t.skipChars(h, o), !(h - a < s) && (h = t.skipSpaces(h), !(h < v)))) {
        m = !0;
        break;
      }
    return s = t.sCount[e], t.line = i + (m ? 1 : 0), l = t.push("fence", "code", 0), l.info = c, l.content = t.getLines(e + 1, i, s, !0), l.markup = f, l.map = [e, t.line], !0;
  }), Ft;
}
var Rt, Xn;
function bP() {
  if (Xn) return Rt;
  Xn = 1;
  var u = T().isSpace;
  return Rt = function(e, n, r, o) {
    var s, c, i, a, l, f, m, h, v, _, y, d, k, p, g, b, x, q, C, E, w = e.lineMax, D = e.bMarks[n] + e.tShift[n], R = e.eMarks[n];
    if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(D++) !== 62)
      return !1;
    if (o)
      return !0;
    for (a = v = e.sCount[n] + 1, e.src.charCodeAt(D) === 32 ? (D++, a++, v++, s = !1, b = !0) : e.src.charCodeAt(D) === 9 ? (b = !0, (e.bsCount[n] + v) % 4 === 3 ? (D++, a++, v++, s = !1) : s = !0) : b = !1, _ = [e.bMarks[n]], e.bMarks[n] = D; D < R && (c = e.src.charCodeAt(D), u(c)); ) {
      c === 9 ? v += 4 - (v + e.bsCount[n] + (s ? 1 : 0)) % 4 : v++;
      D++;
    }
    for (y = [e.bsCount[n]], e.bsCount[n] = e.sCount[n] + 1 + (b ? 1 : 0), f = D >= R, p = [e.sCount[n]], e.sCount[n] = v - a, g = [e.tShift[n]], e.tShift[n] = D - e.bMarks[n], q = e.md.block.ruler.getRules("blockquote"), k = e.parentType, e.parentType = "blockquote", h = n + 1; h < r && (E = e.sCount[h] < e.blkIndent, D = e.bMarks[h] + e.tShift[h], R = e.eMarks[h], !(D >= R)); h++) {
      if (e.src.charCodeAt(D++) === 62 && !E) {
        for (a = v = e.sCount[h] + 1, e.src.charCodeAt(D) === 32 ? (D++, a++, v++, s = !1, b = !0) : e.src.charCodeAt(D) === 9 ? (b = !0, (e.bsCount[h] + v) % 4 === 3 ? (D++, a++, v++, s = !1) : s = !0) : b = !1, _.push(e.bMarks[h]), e.bMarks[h] = D; D < R && (c = e.src.charCodeAt(D), u(c)); ) {
          c === 9 ? v += 4 - (v + e.bsCount[h] + (s ? 1 : 0)) % 4 : v++;
          D++;
        }
        f = D >= R, y.push(e.bsCount[h]), e.bsCount[h] = e.sCount[h] + 1 + (b ? 1 : 0), p.push(e.sCount[h]), e.sCount[h] = v - a, g.push(e.tShift[h]), e.tShift[h] = D - e.bMarks[h];
        continue;
      }
      if (f)
        break;
      for (x = !1, i = 0, l = q.length; i < l; i++)
        if (q[i](e, h, r, !0)) {
          x = !0;
          break;
        }
      if (x) {
        e.lineMax = h, e.blkIndent !== 0 && (_.push(e.bMarks[h]), y.push(e.bsCount[h]), g.push(e.tShift[h]), p.push(e.sCount[h]), e.sCount[h] -= e.blkIndent);
        break;
      }
      _.push(e.bMarks[h]), y.push(e.bsCount[h]), g.push(e.tShift[h]), p.push(e.sCount[h]), e.sCount[h] = -1;
    }
    for (d = e.blkIndent, e.blkIndent = 0, C = e.push("blockquote_open", "blockquote", 1), C.markup = ">", C.map = m = [n, 0], e.md.block.tokenize(e, n, h), C = e.push("blockquote_close", "blockquote", -1), C.markup = ">", e.lineMax = w, e.parentType = k, m[1] = e.line, i = 0; i < g.length; i++)
      e.bMarks[i + n] = _[i], e.tShift[i + n] = g[i], e.sCount[i + n] = p[i], e.bsCount[i + n] = y[i];
    return e.blkIndent = d, !0;
  }, Rt;
}
var Tt, te;
function xP() {
  if (te) return Tt;
  te = 1;
  var u = T().isSpace;
  return Tt = function(e, n, r, o) {
    var s, c, i, a, l = e.bMarks[n] + e.tShift[n], f = e.eMarks[n];
    if (e.sCount[n] - e.blkIndent >= 4 || (s = e.src.charCodeAt(l++), s !== 42 && s !== 45 && s !== 95))
      return !1;
    for (c = 1; l < f; ) {
      if (i = e.src.charCodeAt(l++), i !== s && !u(i))
        return !1;
      i === s && c++;
    }
    return c < 3 ? !1 : (o || (e.line = n + 1, a = e.push("hr", "hr", 0), a.map = [n, e.line], a.markup = Array(c + 1).join(String.fromCharCode(s))), !0);
  }, Tt;
}
var Mt, ne;
function yP() {
  if (ne) return Mt;
  ne = 1;
  var u = T().isSpace;
  function t(r, o) {
    var s, c, i, a;
    return c = r.bMarks[o] + r.tShift[o], i = r.eMarks[o], s = r.src.charCodeAt(c++), s !== 42 && s !== 45 && s !== 43 || c < i && (a = r.src.charCodeAt(c), !u(a)) ? -1 : c;
  }
  function e(r, o) {
    var s, c = r.bMarks[o] + r.tShift[o], i = c, a = r.eMarks[o];
    if (i + 1 >= a || (s = r.src.charCodeAt(i++), s < 48 || s > 57))
      return -1;
    for (; ; ) {
      if (i >= a)
        return -1;
      if (s = r.src.charCodeAt(i++), s >= 48 && s <= 57) {
        if (i - c >= 10)
          return -1;
        continue;
      }
      if (s === 41 || s === 46)
        break;
      return -1;
    }
    return i < a && (s = r.src.charCodeAt(i), !u(s)) ? -1 : i;
  }
  function n(r, o) {
    var s, c, i = r.level + 2;
    for (s = o + 2, c = r.tokens.length - 2; s < c; s++)
      r.tokens[s].level === i && r.tokens[s].type === "paragraph_open" && (r.tokens[s + 2].hidden = !0, r.tokens[s].hidden = !0, s += 2);
  }
  return Mt = function(o, s, c, i) {
    var a, l, f, m, h, v, _, y, d, k, p, g, b, x, q, C, E, w, D, R, O, A, F, M, B, J, V, P, U = !1, Z = !0;
    if (o.sCount[s] - o.blkIndent >= 4 || o.listIndent >= 0 && o.sCount[s] - o.listIndent >= 4 && o.sCount[s] < o.blkIndent)
      return !1;
    if (i && o.parentType === "paragraph" && o.sCount[s] >= o.blkIndent && (U = !0), (F = e(o, s)) >= 0) {
      if (_ = !0, B = o.bMarks[s] + o.tShift[s], b = Number(o.src.slice(B, F - 1)), U && b !== 1) return !1;
    } else if ((F = t(o, s)) >= 0)
      _ = !1;
    else
      return !1;
    if (U && o.skipSpaces(F) >= o.eMarks[s])
      return !1;
    if (g = o.src.charCodeAt(F - 1), i)
      return !0;
    for (p = o.tokens.length, _ ? (P = o.push("ordered_list_open", "ol", 1), b !== 1 && (P.attrs = [["start", b]])) : P = o.push("bullet_list_open", "ul", 1), P.map = k = [s, 0], P.markup = String.fromCharCode(g), q = s, M = !1, V = o.md.block.ruler.getRules("list"), w = o.parentType, o.parentType = "list"; q < c; ) {
      for (A = F, x = o.eMarks[q], v = C = o.sCount[q] + F - (o.bMarks[s] + o.tShift[s]); A < x; ) {
        if (a = o.src.charCodeAt(A), a === 9)
          C += 4 - (C + o.bsCount[q]) % 4;
        else if (a === 32)
          C++;
        else
          break;
        A++;
      }
      if (l = A, l >= x ? h = 1 : h = C - v, h > 4 && (h = 1), m = v + h, P = o.push("list_item_open", "li", 1), P.markup = String.fromCharCode(g), P.map = y = [s, 0], _ && (P.info = o.src.slice(B, F - 1)), O = o.tight, R = o.tShift[s], D = o.sCount[s], E = o.listIndent, o.listIndent = o.blkIndent, o.blkIndent = m, o.tight = !0, o.tShift[s] = l - o.bMarks[s], o.sCount[s] = C, l >= x && o.isEmpty(s + 1) ? o.line = Math.min(o.line + 2, c) : o.md.block.tokenize(o, s, c, !0), (!o.tight || M) && (Z = !1), M = o.line - s > 1 && o.isEmpty(o.line - 1), o.blkIndent = o.listIndent, o.listIndent = E, o.tShift[s] = R, o.sCount[s] = D, o.tight = O, P = o.push("list_item_close", "li", -1), P.markup = String.fromCharCode(g), q = s = o.line, y[1] = q, l = o.bMarks[s], q >= c || o.sCount[q] < o.blkIndent || o.sCount[s] - o.blkIndent >= 4)
        break;
      for (J = !1, f = 0, d = V.length; f < d; f++)
        if (V[f](o, q, c, !0)) {
          J = !0;
          break;
        }
      if (J)
        break;
      if (_) {
        if (F = e(o, q), F < 0)
          break;
        B = o.bMarks[q] + o.tShift[q];
      } else if (F = t(o, q), F < 0)
        break;
      if (g !== o.src.charCodeAt(F - 1))
        break;
    }
    return _ ? P = o.push("ordered_list_close", "ol", -1) : P = o.push("bullet_list_close", "ul", -1), P.markup = String.fromCharCode(g), k[1] = q, o.line = q, o.parentType = w, Z && n(o, p), !0;
  }, Mt;
}
var zt, ee;
function CP() {
  if (ee) return zt;
  ee = 1;
  var u = T().normalizeReference, t = T().isSpace;
  return zt = function(n, r, o, s) {
    var c, i, a, l, f, m, h, v, _, y, d, k, p, g, b, x, q = 0, C = n.bMarks[r] + n.tShift[r], E = n.eMarks[r], w = r + 1;
    if (n.sCount[r] - n.blkIndent >= 4 || n.src.charCodeAt(C) !== 91)
      return !1;
    for (; ++C < E; )
      if (n.src.charCodeAt(C) === 93 && n.src.charCodeAt(C - 1) !== 92) {
        if (C + 1 === E || n.src.charCodeAt(C + 1) !== 58)
          return !1;
        break;
      }
    for (l = n.lineMax, b = n.md.block.ruler.getRules("reference"), y = n.parentType, n.parentType = "reference"; w < l && !n.isEmpty(w); w++)
      if (!(n.sCount[w] - n.blkIndent > 3) && !(n.sCount[w] < 0)) {
        for (g = !1, m = 0, h = b.length; m < h; m++)
          if (b[m](n, w, l, !0)) {
            g = !0;
            break;
          }
        if (g)
          break;
      }
    for (p = n.getLines(r, w, n.blkIndent, !1).trim(), E = p.length, C = 1; C < E; C++) {
      if (c = p.charCodeAt(C), c === 91)
        return !1;
      if (c === 93) {
        _ = C;
        break;
      } else c === 10 ? q++ : c === 92 && (C++, C < E && p.charCodeAt(C) === 10 && q++);
    }
    if (_ < 0 || p.charCodeAt(_ + 1) !== 58)
      return !1;
    for (C = _ + 2; C < E; C++)
      if (c = p.charCodeAt(C), c === 10)
        q++;
      else if (!t(c)) break;
    if (d = n.md.helpers.parseLinkDestination(p, C, E), !d.ok || (f = n.md.normalizeLink(d.str), !n.md.validateLink(f)))
      return !1;
    for (C = d.pos, q += d.lines, i = C, a = q, k = C; C < E; C++)
      if (c = p.charCodeAt(C), c === 10)
        q++;
      else if (!t(c)) break;
    for (d = n.md.helpers.parseLinkTitle(p, C, E), C < E && k !== C && d.ok ? (x = d.str, C = d.pos, q += d.lines) : (x = "", C = i, q = a); C < E && (c = p.charCodeAt(C), !!t(c)); )
      C++;
    if (C < E && p.charCodeAt(C) !== 10 && x)
      for (x = "", C = i, q = a; C < E && (c = p.charCodeAt(C), !!t(c)); )
        C++;
    return C < E && p.charCodeAt(C) !== 10 || (v = u(p.slice(1, _)), !v) ? !1 : (s || (typeof n.env.references > "u" && (n.env.references = {}), typeof n.env.references[v] > "u" && (n.env.references[v] = { title: x, href: f }), n.parentType = y, n.line = r + q + 1), !0);
  }, zt;
}
var Lt, re;
function AP() {
  return re || (re = 1, Lt = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "source",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ]), Lt;
}
var K = {}, oe;
function Je() {
  if (oe) return K;
  oe = 1;
  var u = "[a-zA-Z_:][a-zA-Z0-9:._-]*", t = "[^\"'=<>`\\x00-\\x20]+", e = "'[^']*'", n = '"[^"]*"', r = "(?:" + t + "|" + e + "|" + n + ")", o = "(?:\\s+" + u + "(?:\\s*=\\s*" + r + ")?)", s = "<[A-Za-z][A-Za-z0-9\\-]*" + o + "*\\s*\\/?>", c = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", i = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", a = "<[?][\\s\\S]*?[?]>", l = "<![A-Z]+\\s+[^>]*>", f = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", m = new RegExp("^(?:" + s + "|" + c + "|" + i + "|" + a + "|" + l + "|" + f + ")"), h = new RegExp("^(?:" + s + "|" + c + ")");
  return K.HTML_TAG_RE = m, K.HTML_OPEN_CLOSE_TAG_RE = h, K;
}
var It, se;
function qP() {
  if (se) return It;
  se = 1;
  var u = AP(), t = Je().HTML_OPEN_CLOSE_TAG_RE, e = [
    [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
    [/^<!--/, /-->/, !0],
    [/^<\?/, /\?>/, !0],
    [/^<![A-Z]/, />/, !0],
    [/^<!\[CDATA\[/, /\]\]>/, !0],
    [new RegExp("^</?(" + u.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
    [new RegExp(t.source + "\\s*$"), /^$/, !1]
  ];
  return It = function(r, o, s, c) {
    var i, a, l, f, m = r.bMarks[o] + r.tShift[o], h = r.eMarks[o];
    if (r.sCount[o] - r.blkIndent >= 4 || !r.md.options.html || r.src.charCodeAt(m) !== 60)
      return !1;
    for (f = r.src.slice(m, h), i = 0; i < e.length && !e[i][0].test(f); i++)
      ;
    if (i === e.length)
      return !1;
    if (c)
      return e[i][2];
    if (a = o + 1, !e[i][1].test(f)) {
      for (; a < s && !(r.sCount[a] < r.blkIndent); a++)
        if (m = r.bMarks[a] + r.tShift[a], h = r.eMarks[a], f = r.src.slice(m, h), e[i][1].test(f)) {
          f.length !== 0 && a++;
          break;
        }
    }
    return r.line = a, l = r.push("html_block", "", 0), l.map = [o, a], l.content = r.getLines(o, a, r.blkIndent, !0), !0;
  }, It;
}
var Pt, ce;
function wP() {
  if (ce) return Pt;
  ce = 1;
  var u = T().isSpace;
  return Pt = function(e, n, r, o) {
    var s, c, i, a, l = e.bMarks[n] + e.tShift[n], f = e.eMarks[n];
    if (e.sCount[n] - e.blkIndent >= 4 || (s = e.src.charCodeAt(l), s !== 35 || l >= f))
      return !1;
    for (c = 1, s = e.src.charCodeAt(++l); s === 35 && l < f && c <= 6; )
      c++, s = e.src.charCodeAt(++l);
    return c > 6 || l < f && !u(s) ? !1 : (o || (f = e.skipSpacesBack(f, l), i = e.skipCharsBack(f, 35, l), i > l && u(e.src.charCodeAt(i - 1)) && (f = i), e.line = n + 1, a = e.push("heading_open", "h" + String(c), 1), a.markup = "########".slice(0, c), a.map = [n, e.line], a = e.push("inline", "", 0), a.content = e.src.slice(l, f).trim(), a.map = [n, e.line], a.children = [], a = e.push("heading_close", "h" + String(c), -1), a.markup = "########".slice(0, c)), !0);
  }, Pt;
}
var Ot, ie;
function EP() {
  return ie || (ie = 1, Ot = function(t, e, n) {
    var r, o, s, c, i, a, l, f, m, h = e + 1, v, _ = t.md.block.ruler.getRules("paragraph");
    if (t.sCount[e] - t.blkIndent >= 4)
      return !1;
    for (v = t.parentType, t.parentType = "paragraph"; h < n && !t.isEmpty(h); h++)
      if (!(t.sCount[h] - t.blkIndent > 3)) {
        if (t.sCount[h] >= t.blkIndent && (a = t.bMarks[h] + t.tShift[h], l = t.eMarks[h], a < l && (m = t.src.charCodeAt(a), (m === 45 || m === 61) && (a = t.skipChars(a, m), a = t.skipSpaces(a), a >= l)))) {
          f = m === 61 ? 1 : 2;
          break;
        }
        if (!(t.sCount[h] < 0)) {
          for (o = !1, s = 0, c = _.length; s < c; s++)
            if (_[s](t, h, n, !0)) {
              o = !0;
              break;
            }
          if (o)
            break;
        }
      }
    return f ? (r = t.getLines(e, h, t.blkIndent, !1).trim(), t.line = h + 1, i = t.push("heading_open", "h" + String(f), 1), i.markup = String.fromCharCode(m), i.map = [e, t.line], i = t.push("inline", "", 0), i.content = r, i.map = [e, t.line - 1], i.children = [], i = t.push("heading_close", "h" + String(f), -1), i.markup = String.fromCharCode(m), t.parentType = v, !0) : !1;
  }), Ot;
}
var Bt, ae;
function DP() {
  return ae || (ae = 1, Bt = function(t, e) {
    var n, r, o, s, c, i, a = e + 1, l = t.md.block.ruler.getRules("paragraph"), f = t.lineMax;
    for (i = t.parentType, t.parentType = "paragraph"; a < f && !t.isEmpty(a); a++)
      if (!(t.sCount[a] - t.blkIndent > 3) && !(t.sCount[a] < 0)) {
        for (r = !1, o = 0, s = l.length; o < s; o++)
          if (l[o](t, a, f, !0)) {
            r = !0;
            break;
          }
        if (r)
          break;
      }
    return n = t.getLines(e, a, t.blkIndent, !1).trim(), t.line = a, c = t.push("paragraph_open", "p", 1), c.map = [e, t.line], c = t.push("inline", "", 0), c.content = n, c.map = [e, t.line], c.children = [], c = t.push("paragraph_close", "p", -1), t.parentType = i, !0;
  }), Bt;
}
var jt, le;
function SP() {
  if (le) return jt;
  le = 1;
  var u = hn(), t = T().isSpace;
  function e(n, r, o, s) {
    var c, i, a, l, f, m, h, v;
    for (this.src = n, this.md = r, this.env = o, this.tokens = s, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", i = this.src, v = !1, a = l = m = h = 0, f = i.length; l < f; l++) {
      if (c = i.charCodeAt(l), !v)
        if (t(c)) {
          m++, c === 9 ? h += 4 - h % 4 : h++;
          continue;
        } else
          v = !0;
      (c === 10 || l === f - 1) && (c !== 10 && l++, this.bMarks.push(a), this.eMarks.push(l), this.tShift.push(m), this.sCount.push(h), this.bsCount.push(0), v = !1, m = 0, h = 0, a = l + 1);
    }
    this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
  }
  return e.prototype.push = function(n, r, o) {
    var s = new u(n, r, o);
    return s.block = !0, o < 0 && this.level--, s.level = this.level, o > 0 && this.level++, this.tokens.push(s), s;
  }, e.prototype.isEmpty = function(r) {
    return this.bMarks[r] + this.tShift[r] >= this.eMarks[r];
  }, e.prototype.skipEmptyLines = function(r) {
    for (var o = this.lineMax; r < o && !(this.bMarks[r] + this.tShift[r] < this.eMarks[r]); r++)
      ;
    return r;
  }, e.prototype.skipSpaces = function(r) {
    for (var o, s = this.src.length; r < s && (o = this.src.charCodeAt(r), !!t(o)); r++)
      ;
    return r;
  }, e.prototype.skipSpacesBack = function(r, o) {
    if (r <= o)
      return r;
    for (; r > o; )
      if (!t(this.src.charCodeAt(--r)))
        return r + 1;
    return r;
  }, e.prototype.skipChars = function(r, o) {
    for (var s = this.src.length; r < s && this.src.charCodeAt(r) === o; r++)
      ;
    return r;
  }, e.prototype.skipCharsBack = function(r, o, s) {
    if (r <= s)
      return r;
    for (; r > s; )
      if (o !== this.src.charCodeAt(--r))
        return r + 1;
    return r;
  }, e.prototype.getLines = function(r, o, s, c) {
    var i, a, l, f, m, h, v, _ = r;
    if (r >= o)
      return "";
    for (h = new Array(o - r), i = 0; _ < o; _++, i++) {
      for (a = 0, v = f = this.bMarks[_], _ + 1 < o || c ? m = this.eMarks[_] + 1 : m = this.eMarks[_]; f < m && a < s; ) {
        if (l = this.src.charCodeAt(f), t(l))
          l === 9 ? a += 4 - (a + this.bsCount[_]) % 4 : a++;
        else if (f - v < this.tShift[_])
          a++;
        else
          break;
        f++;
      }
      a > s ? h[i] = new Array(a - s + 1).join(" ") + this.src.slice(f, m) : h[i] = this.src.slice(f, m);
    }
    return h.join("");
  }, e.prototype.Token = u, jt = e, jt;
}
var Nt, ue;
function FP() {
  if (ue) return Nt;
  ue = 1;
  var u = fn(), t = [
    // First 2 params - rule name & source. Secondary array - list of rules,
    // which can be terminated by this one.
    ["table", _P(), ["paragraph", "reference"]],
    ["code", vP()],
    ["fence", kP(), ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", bP(), ["paragraph", "reference", "blockquote", "list"]],
    ["hr", xP(), ["paragraph", "reference", "blockquote", "list"]],
    ["list", yP(), ["paragraph", "reference", "blockquote"]],
    ["reference", CP()],
    ["html_block", qP(), ["paragraph", "reference", "blockquote"]],
    ["heading", wP(), ["paragraph", "reference", "blockquote"]],
    ["lheading", EP()],
    ["paragraph", DP()]
  ];
  function e() {
    this.ruler = new u();
    for (var n = 0; n < t.length; n++)
      this.ruler.push(t[n][0], t[n][1], { alt: (t[n][2] || []).slice() });
  }
  return e.prototype.tokenize = function(n, r, o) {
    for (var s, c, i = this.ruler.getRules(""), a = i.length, l = r, f = !1, m = n.md.options.maxNesting; l < o && (n.line = l = n.skipEmptyLines(l), !(l >= o || n.sCount[l] < n.blkIndent)); ) {
      if (n.level >= m) {
        n.line = o;
        break;
      }
      for (c = 0; c < a && (s = i[c](n, l, o, !1), !s); c++)
        ;
      n.tight = !f, n.isEmpty(n.line - 1) && (f = !0), l = n.line, l < o && n.isEmpty(l) && (f = !0, l++, n.line = l);
    }
  }, e.prototype.parse = function(n, r, o, s) {
    var c;
    n && (c = new this.State(n, r, o, s), this.tokenize(c, c.line, c.lineMax));
  }, e.prototype.State = SP(), Nt = e, Nt;
}
var Ht, fe;
function RP() {
  if (fe) return Ht;
  fe = 1;
  function u(t) {
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
  return Ht = function(e, n) {
    for (var r = e.pos; r < e.posMax && !u(e.src.charCodeAt(r)); )
      r++;
    return r === e.pos ? !1 : (n || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
  }, Ht;
}
var Ut, he;
function TP() {
  if (he) return Ut;
  he = 1;
  var u = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
  return Ut = function(e, n) {
    var r, o, s, c, i, a, l, f;
    return !e.md.options.linkify || e.linkLevel > 0 || (r = e.pos, o = e.posMax, r + 3 > o) || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47 || (s = e.pending.match(u), !s) || (c = s[1], i = e.md.linkify.matchAtStart(e.src.slice(r - c.length)), !i) || (a = i.url, a = a.replace(/\*+$/, ""), l = e.md.normalizeLink(a), !e.md.validateLink(l)) ? !1 : (n || (e.pending = e.pending.slice(0, -c.length), f = e.push("link_open", "a", 1), f.attrs = [["href", l]], f.markup = "linkify", f.info = "auto", f = e.push("text", "", 0), f.content = e.md.normalizeLinkText(a), f = e.push("link_close", "a", -1), f.markup = "linkify", f.info = "auto"), e.pos += a.length - c.length, !0);
  }, Ut;
}
var $t, pe;
function MP() {
  if (pe) return $t;
  pe = 1;
  var u = T().isSpace;
  return $t = function(e, n) {
    var r, o, s, c = e.pos;
    if (e.src.charCodeAt(c) !== 10)
      return !1;
    if (r = e.pending.length - 1, o = e.posMax, !n)
      if (r >= 0 && e.pending.charCodeAt(r) === 32)
        if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
          for (s = r - 1; s >= 1 && e.pending.charCodeAt(s - 1) === 32; ) s--;
          e.pending = e.pending.slice(0, s), e.push("hardbreak", "br", 0);
        } else
          e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
      else
        e.push("softbreak", "br", 0);
    for (c++; c < o && u(e.src.charCodeAt(c)); )
      c++;
    return e.pos = c, !0;
  }, $t;
}
var Vt, de;
function zP() {
  if (de) return Vt;
  de = 1;
  for (var u = T().isSpace, t = [], e = 0; e < 256; e++)
    t.push(0);
  return "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(n) {
    t[n.charCodeAt(0)] = 1;
  }), Vt = function(r, o) {
    var s, c, i, a, l, f = r.pos, m = r.posMax;
    if (r.src.charCodeAt(f) !== 92 || (f++, f >= m)) return !1;
    if (s = r.src.charCodeAt(f), s === 10) {
      for (o || r.push("hardbreak", "br", 0), f++; f < m && (s = r.src.charCodeAt(f), !!u(s)); )
        f++;
      return r.pos = f, !0;
    }
    return a = r.src[f], s >= 55296 && s <= 56319 && f + 1 < m && (c = r.src.charCodeAt(f + 1), c >= 56320 && c <= 57343 && (a += r.src[f + 1], f++)), i = "\\" + a, o || (l = r.push("text_special", "", 0), s < 256 && t[s] !== 0 ? l.content = a : l.content = i, l.markup = i, l.info = "escape"), r.pos = f + 1, !0;
  }, Vt;
}
var Zt, ge;
function LP() {
  return ge || (ge = 1, Zt = function(t, e) {
    var n, r, o, s, c, i, a, l, f = t.pos, m = t.src.charCodeAt(f);
    if (m !== 96)
      return !1;
    for (n = f, f++, r = t.posMax; f < r && t.src.charCodeAt(f) === 96; )
      f++;
    if (o = t.src.slice(n, f), a = o.length, t.backticksScanned && (t.backticks[a] || 0) <= n)
      return e || (t.pending += o), t.pos += a, !0;
    for (c = i = f; (c = t.src.indexOf("`", i)) !== -1; ) {
      for (i = c + 1; i < r && t.src.charCodeAt(i) === 96; )
        i++;
      if (l = i - c, l === a)
        return e || (s = t.push("code_inline", "code", 0), s.markup = o, s.content = t.src.slice(f, c).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), t.pos = i, !0;
      t.backticks[l] = c;
    }
    return t.backticksScanned = !0, e || (t.pending += o), t.pos += a, !0;
  }), Zt;
}
var X = {}, me;
function _e() {
  if (me) return X;
  me = 1, X.tokenize = function(e, n) {
    var r, o, s, c, i, a = e.pos, l = e.src.charCodeAt(a);
    if (n || l !== 126 || (o = e.scanDelims(e.pos, !0), c = o.length, i = String.fromCharCode(l), c < 2))
      return !1;
    for (c % 2 && (s = e.push("text", "", 0), s.content = i, c--), r = 0; r < c; r += 2)
      s = e.push("text", "", 0), s.content = i + i, e.delimiters.push({
        marker: l,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        token: e.tokens.length - 1,
        end: -1,
        open: o.can_open,
        close: o.can_close
      });
    return e.pos += o.length, !0;
  };
  function u(t, e) {
    var n, r, o, s, c, i = [], a = e.length;
    for (n = 0; n < a; n++)
      o = e[n], o.marker === 126 && o.end !== -1 && (s = e[o.end], c = t.tokens[o.token], c.type = "s_open", c.tag = "s", c.nesting = 1, c.markup = "~~", c.content = "", c = t.tokens[s.token], c.type = "s_close", c.tag = "s", c.nesting = -1, c.markup = "~~", c.content = "", t.tokens[s.token - 1].type === "text" && t.tokens[s.token - 1].content === "~" && i.push(s.token - 1));
    for (; i.length; ) {
      for (n = i.pop(), r = n + 1; r < t.tokens.length && t.tokens[r].type === "s_close"; )
        r++;
      r--, n !== r && (c = t.tokens[r], t.tokens[r] = t.tokens[n], t.tokens[n] = c);
    }
  }
  return X.postProcess = function(e) {
    var n, r = e.tokens_meta, o = e.tokens_meta.length;
    for (u(e, e.delimiters), n = 0; n < o; n++)
      r[n] && r[n].delimiters && u(e, r[n].delimiters);
  }, X;
}
var tt = {}, ve;
function ke() {
  if (ve) return tt;
  ve = 1, tt.tokenize = function(e, n) {
    var r, o, s, c = e.pos, i = e.src.charCodeAt(c);
    if (n || i !== 95 && i !== 42)
      return !1;
    for (o = e.scanDelims(e.pos, i === 42), r = 0; r < o.length; r++)
      s = e.push("text", "", 0), s.content = String.fromCharCode(i), e.delimiters.push({
        // Char code of the starting marker (number).
        //
        marker: i,
        // Total length of these series of delimiters.
        //
        length: o.length,
        // A position of the token this delimiter corresponds to.
        //
        token: e.tokens.length - 1,
        // If this delimiter is matched as a valid opener, `end` will be
        // equal to its position, otherwise it's `-1`.
        //
        end: -1,
        // Boolean flags that determine if this delimiter could open or close
        // an emphasis.
        //
        open: o.can_open,
        close: o.can_close
      });
    return e.pos += o.length, !0;
  };
  function u(t, e) {
    var n, r, o, s, c, i, a = e.length;
    for (n = a - 1; n >= 0; n--)
      r = e[n], !(r.marker !== 95 && r.marker !== 42) && r.end !== -1 && (o = e[r.end], i = n > 0 && e[n - 1].end === r.end + 1 && // check that first two markers match and adjacent
      e[n - 1].marker === r.marker && e[n - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
      e[r.end + 1].token === o.token + 1, c = String.fromCharCode(r.marker), s = t.tokens[r.token], s.type = i ? "strong_open" : "em_open", s.tag = i ? "strong" : "em", s.nesting = 1, s.markup = i ? c + c : c, s.content = "", s = t.tokens[o.token], s.type = i ? "strong_close" : "em_close", s.tag = i ? "strong" : "em", s.nesting = -1, s.markup = i ? c + c : c, s.content = "", i && (t.tokens[e[n - 1].token].content = "", t.tokens[e[r.end + 1].token].content = "", n--));
  }
  return tt.postProcess = function(e) {
    var n, r = e.tokens_meta, o = e.tokens_meta.length;
    for (u(e, e.delimiters), n = 0; n < o; n++)
      r[n] && r[n].delimiters && u(e, r[n].delimiters);
  }, tt;
}
var Gt, be;
function IP() {
  if (be) return Gt;
  be = 1;
  var u = T().normalizeReference, t = T().isSpace;
  return Gt = function(n, r) {
    var o, s, c, i, a, l, f, m, h, v = "", _ = "", y = n.pos, d = n.posMax, k = n.pos, p = !0;
    if (n.src.charCodeAt(n.pos) !== 91 || (a = n.pos + 1, i = n.md.helpers.parseLinkLabel(n, n.pos, !0), i < 0))
      return !1;
    if (l = i + 1, l < d && n.src.charCodeAt(l) === 40) {
      for (p = !1, l++; l < d && (s = n.src.charCodeAt(l), !(!t(s) && s !== 10)); l++)
        ;
      if (l >= d)
        return !1;
      if (k = l, f = n.md.helpers.parseLinkDestination(n.src, l, n.posMax), f.ok) {
        for (v = n.md.normalizeLink(f.str), n.md.validateLink(v) ? l = f.pos : v = "", k = l; l < d && (s = n.src.charCodeAt(l), !(!t(s) && s !== 10)); l++)
          ;
        if (f = n.md.helpers.parseLinkTitle(n.src, l, n.posMax), l < d && k !== l && f.ok)
          for (_ = f.str, l = f.pos; l < d && (s = n.src.charCodeAt(l), !(!t(s) && s !== 10)); l++)
            ;
      }
      (l >= d || n.src.charCodeAt(l) !== 41) && (p = !0), l++;
    }
    if (p) {
      if (typeof n.env.references > "u")
        return !1;
      if (l < d && n.src.charCodeAt(l) === 91 ? (k = l + 1, l = n.md.helpers.parseLinkLabel(n, l), l >= 0 ? c = n.src.slice(k, l++) : l = i + 1) : l = i + 1, c || (c = n.src.slice(a, i)), m = n.env.references[u(c)], !m)
        return n.pos = y, !1;
      v = m.href, _ = m.title;
    }
    return r || (n.pos = a, n.posMax = i, h = n.push("link_open", "a", 1), h.attrs = o = [["href", v]], _ && o.push(["title", _]), n.linkLevel++, n.md.inline.tokenize(n), n.linkLevel--, h = n.push("link_close", "a", -1)), n.pos = l, n.posMax = d, !0;
  }, Gt;
}
var Wt, xe;
function PP() {
  if (xe) return Wt;
  xe = 1;
  var u = T().normalizeReference, t = T().isSpace;
  return Wt = function(n, r) {
    var o, s, c, i, a, l, f, m, h, v, _, y, d, k = "", p = n.pos, g = n.posMax;
    if (n.src.charCodeAt(n.pos) !== 33 || n.src.charCodeAt(n.pos + 1) !== 91 || (l = n.pos + 2, a = n.md.helpers.parseLinkLabel(n, n.pos + 1, !1), a < 0))
      return !1;
    if (f = a + 1, f < g && n.src.charCodeAt(f) === 40) {
      for (f++; f < g && (s = n.src.charCodeAt(f), !(!t(s) && s !== 10)); f++)
        ;
      if (f >= g)
        return !1;
      for (d = f, h = n.md.helpers.parseLinkDestination(n.src, f, n.posMax), h.ok && (k = n.md.normalizeLink(h.str), n.md.validateLink(k) ? f = h.pos : k = ""), d = f; f < g && (s = n.src.charCodeAt(f), !(!t(s) && s !== 10)); f++)
        ;
      if (h = n.md.helpers.parseLinkTitle(n.src, f, n.posMax), f < g && d !== f && h.ok)
        for (v = h.str, f = h.pos; f < g && (s = n.src.charCodeAt(f), !(!t(s) && s !== 10)); f++)
          ;
      else
        v = "";
      if (f >= g || n.src.charCodeAt(f) !== 41)
        return n.pos = p, !1;
      f++;
    } else {
      if (typeof n.env.references > "u")
        return !1;
      if (f < g && n.src.charCodeAt(f) === 91 ? (d = f + 1, f = n.md.helpers.parseLinkLabel(n, f), f >= 0 ? i = n.src.slice(d, f++) : f = a + 1) : f = a + 1, i || (i = n.src.slice(l, a)), m = n.env.references[u(i)], !m)
        return n.pos = p, !1;
      k = m.href, v = m.title;
    }
    return r || (c = n.src.slice(l, a), n.md.inline.parse(
      c,
      n.md,
      n.env,
      y = []
    ), _ = n.push("image", "img", 0), _.attrs = o = [["src", k], ["alt", ""]], _.children = y, _.content = c, v && o.push(["title", v])), n.pos = f, n.posMax = g, !0;
  }, Wt;
}
var Jt, ye;
function OP() {
  if (ye) return Jt;
  ye = 1;
  var u = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, t = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
  return Jt = function(n, r) {
    var o, s, c, i, a, l, f = n.pos;
    if (n.src.charCodeAt(f) !== 60)
      return !1;
    for (a = n.pos, l = n.posMax; ; ) {
      if (++f >= l || (i = n.src.charCodeAt(f), i === 60)) return !1;
      if (i === 62) break;
    }
    return o = n.src.slice(a + 1, f), t.test(o) ? (s = n.md.normalizeLink(o), n.md.validateLink(s) ? (r || (c = n.push("link_open", "a", 1), c.attrs = [["href", s]], c.markup = "autolink", c.info = "auto", c = n.push("text", "", 0), c.content = n.md.normalizeLinkText(o), c = n.push("link_close", "a", -1), c.markup = "autolink", c.info = "auto"), n.pos += o.length + 2, !0) : !1) : u.test(o) ? (s = n.md.normalizeLink("mailto:" + o), n.md.validateLink(s) ? (r || (c = n.push("link_open", "a", 1), c.attrs = [["href", s]], c.markup = "autolink", c.info = "auto", c = n.push("text", "", 0), c.content = n.md.normalizeLinkText(o), c = n.push("link_close", "a", -1), c.markup = "autolink", c.info = "auto"), n.pos += o.length + 2, !0) : !1) : !1;
  }, Jt;
}
var Yt, Ce;
function BP() {
  if (Ce) return Yt;
  Ce = 1;
  var u = Je().HTML_TAG_RE;
  function t(r) {
    return /^<a[>\s]/i.test(r);
  }
  function e(r) {
    return /^<\/a\s*>/i.test(r);
  }
  function n(r) {
    var o = r | 32;
    return o >= 97 && o <= 122;
  }
  return Yt = function(o, s) {
    var c, i, a, l, f = o.pos;
    return !o.md.options.html || (a = o.posMax, o.src.charCodeAt(f) !== 60 || f + 2 >= a) || (c = o.src.charCodeAt(f + 1), c !== 33 && c !== 63 && c !== 47 && !n(c)) || (i = o.src.slice(f).match(u), !i) ? !1 : (s || (l = o.push("html_inline", "", 0), l.content = o.src.slice(f, f + i[0].length), t(l.content) && o.linkLevel++, e(l.content) && o.linkLevel--), o.pos += i[0].length, !0);
  }, Yt;
}
var Qt, Ae;
function jP() {
  if (Ae) return Qt;
  Ae = 1;
  var u = $e(), t = T().has, e = T().isValidEntityCode, n = T().fromCodePoint, r = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, o = /^&([a-z][a-z0-9]{1,31});/i;
  return Qt = function(c, i) {
    var a, l, f, m, h = c.pos, v = c.posMax;
    if (c.src.charCodeAt(h) !== 38 || h + 1 >= v) return !1;
    if (a = c.src.charCodeAt(h + 1), a === 35) {
      if (f = c.src.slice(h).match(r), f)
        return i || (l = f[1][0].toLowerCase() === "x" ? parseInt(f[1].slice(1), 16) : parseInt(f[1], 10), m = c.push("text_special", "", 0), m.content = e(l) ? n(l) : n(65533), m.markup = f[0], m.info = "entity"), c.pos += f[0].length, !0;
    } else if (f = c.src.slice(h).match(o), f && t(u, f[1]))
      return i || (m = c.push("text_special", "", 0), m.content = u[f[1]], m.markup = f[0], m.info = "entity"), c.pos += f[0].length, !0;
    return !1;
  }, Qt;
}
var Kt, qe;
function NP() {
  if (qe) return Kt;
  qe = 1;
  function u(t, e) {
    var n, r, o, s, c, i, a, l, f = {}, m = e.length;
    if (m) {
      var h = 0, v = -2, _ = [];
      for (n = 0; n < m; n++)
        if (o = e[n], _.push(0), (e[h].marker !== o.marker || v !== o.token - 1) && (h = n), v = o.token, o.length = o.length || 0, !!o.close) {
          for (f.hasOwnProperty(o.marker) || (f[o.marker] = [-1, -1, -1, -1, -1, -1]), c = f[o.marker][(o.open ? 3 : 0) + o.length % 3], r = h - _[h] - 1, i = r; r > c; r -= _[r] + 1)
            if (s = e[r], s.marker === o.marker && s.open && s.end < 0 && (a = !1, (s.close || o.open) && (s.length + o.length) % 3 === 0 && (s.length % 3 !== 0 || o.length % 3 !== 0) && (a = !0), !a)) {
              l = r > 0 && !e[r - 1].open ? _[r - 1] + 1 : 0, _[n] = n - r + l, _[r] = l, o.open = !1, s.end = n, s.close = !1, i = -1, v = -2;
              break;
            }
          i !== -1 && (f[o.marker][(o.open ? 3 : 0) + (o.length || 0) % 3] = i);
        }
    }
  }
  return Kt = function(e) {
    var n, r = e.tokens_meta, o = e.tokens_meta.length;
    for (u(e, e.delimiters), n = 0; n < o; n++)
      r[n] && r[n].delimiters && u(e, r[n].delimiters);
  }, Kt;
}
var Xt, we;
function HP() {
  return we || (we = 1, Xt = function(t) {
    var e, n, r = 0, o = t.tokens, s = t.tokens.length;
    for (e = n = 0; e < s; e++)
      o[e].nesting < 0 && r--, o[e].level = r, o[e].nesting > 0 && r++, o[e].type === "text" && e + 1 < s && o[e + 1].type === "text" ? o[e + 1].content = o[e].content + o[e + 1].content : (e !== n && (o[n] = o[e]), n++);
    e !== n && (o.length = n);
  }), Xt;
}
var tn, Ee;
function UP() {
  if (Ee) return tn;
  Ee = 1;
  var u = hn(), t = T().isWhiteSpace, e = T().isPunctChar, n = T().isMdAsciiPunct;
  function r(o, s, c, i) {
    this.src = o, this.env = c, this.md = s, this.tokens = i, this.tokens_meta = Array(i.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
  }
  return r.prototype.pushPending = function() {
    var o = new u("text", "", 0);
    return o.content = this.pending, o.level = this.pendingLevel, this.tokens.push(o), this.pending = "", o;
  }, r.prototype.push = function(o, s, c) {
    this.pending && this.pushPending();
    var i = new u(o, s, c), a = null;
    return c < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), i.level = this.level, c > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], a = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(i), this.tokens_meta.push(a), i;
  }, r.prototype.scanDelims = function(o, s) {
    var c = o, i, a, l, f, m, h, v, _, y, d = !0, k = !0, p = this.posMax, g = this.src.charCodeAt(o);
    for (i = o > 0 ? this.src.charCodeAt(o - 1) : 32; c < p && this.src.charCodeAt(c) === g; )
      c++;
    return l = c - o, a = c < p ? this.src.charCodeAt(c) : 32, v = n(i) || e(String.fromCharCode(i)), y = n(a) || e(String.fromCharCode(a)), h = t(i), _ = t(a), _ ? d = !1 : y && (h || v || (d = !1)), h ? k = !1 : v && (_ || y || (k = !1)), s ? (f = d, m = k) : (f = d && (!k || v), m = k && (!d || y)), {
      can_open: f,
      can_close: m,
      length: l
    };
  }, r.prototype.Token = u, tn = r, tn;
}
var nn, De;
function $P() {
  if (De) return nn;
  De = 1;
  var u = fn(), t = [
    ["text", RP()],
    ["linkify", TP()],
    ["newline", MP()],
    ["escape", zP()],
    ["backticks", LP()],
    ["strikethrough", _e().tokenize],
    ["emphasis", ke().tokenize],
    ["link", IP()],
    ["image", PP()],
    ["autolink", OP()],
    ["html_inline", BP()],
    ["entity", jP()]
  ], e = [
    ["balance_pairs", NP()],
    ["strikethrough", _e().postProcess],
    ["emphasis", ke().postProcess],
    // rules for pairs separate '**' into its own text tokens, which may be left unused,
    // rule below merges unused segments back with the rest of the text
    ["fragments_join", HP()]
  ];
  function n() {
    var r;
    for (this.ruler = new u(), r = 0; r < t.length; r++)
      this.ruler.push(t[r][0], t[r][1]);
    for (this.ruler2 = new u(), r = 0; r < e.length; r++)
      this.ruler2.push(e[r][0], e[r][1]);
  }
  return n.prototype.skipToken = function(r) {
    var o, s, c = r.pos, i = this.ruler.getRules(""), a = i.length, l = r.md.options.maxNesting, f = r.cache;
    if (typeof f[c] < "u") {
      r.pos = f[c];
      return;
    }
    if (r.level < l)
      for (s = 0; s < a && (r.level++, o = i[s](r, !0), r.level--, !o); s++)
        ;
    else
      r.pos = r.posMax;
    o || r.pos++, f[c] = r.pos;
  }, n.prototype.tokenize = function(r) {
    for (var o, s, c = this.ruler.getRules(""), i = c.length, a = r.posMax, l = r.md.options.maxNesting; r.pos < a; ) {
      if (r.level < l)
        for (s = 0; s < i && (o = c[s](r, !1), !o); s++)
          ;
      if (o) {
        if (r.pos >= a)
          break;
        continue;
      }
      r.pending += r.src[r.pos++];
    }
    r.pending && r.pushPending();
  }, n.prototype.parse = function(r, o, s, c) {
    var i, a, l, f = new this.State(r, o, s, c);
    for (this.tokenize(f), a = this.ruler2.getRules(""), l = a.length, i = 0; i < l; i++)
      a[i](f);
  }, n.prototype.State = UP(), nn = n, nn;
}
var en, Se;
function VP() {
  return Se || (Se = 1, en = function(u) {
    var t = {};
    u = u || {}, t.src_Any = Ze().source, t.src_Cc = Ge().source, t.src_Z = We().source, t.src_P = un().source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
    var e = "[><｜]";
    return t.src_pseudo_letter = "(?:(?!" + e + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + e + "|" + t.src_ZPCc + ")(?!" + (u["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + e + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (u["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + e + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
  }), en;
}
var rn, Fe;
function ZP() {
  if (Fe) return rn;
  Fe = 1;
  function u(p) {
    var g = Array.prototype.slice.call(arguments, 1);
    return g.forEach(function(b) {
      b && Object.keys(b).forEach(function(x) {
        p[x] = b[x];
      });
    }), p;
  }
  function t(p) {
    return Object.prototype.toString.call(p);
  }
  function e(p) {
    return t(p) === "[object String]";
  }
  function n(p) {
    return t(p) === "[object Object]";
  }
  function r(p) {
    return t(p) === "[object RegExp]";
  }
  function o(p) {
    return t(p) === "[object Function]";
  }
  function s(p) {
    return p.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  var c = {
    fuzzyLink: !0,
    fuzzyEmail: !0,
    fuzzyIP: !1
  };
  function i(p) {
    return Object.keys(p || {}).reduce(function(g, b) {
      return g || c.hasOwnProperty(b);
    }, !1);
  }
  var a = {
    "http:": {
      validate: function(p, g, b) {
        var x = p.slice(g);
        return b.re.http || (b.re.http = new RegExp(
          "^\\/\\/" + b.re.src_auth + b.re.src_host_port_strict + b.re.src_path,
          "i"
        )), b.re.http.test(x) ? x.match(b.re.http)[0].length : 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function(p, g, b) {
        var x = p.slice(g);
        return b.re.no_http || (b.re.no_http = new RegExp(
          "^" + b.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          "(?:localhost|(?:(?:" + b.re.src_domain + ")\\.)+" + b.re.src_domain_root + ")" + b.re.src_port + b.re.src_host_terminator + b.re.src_path,
          "i"
        )), b.re.no_http.test(x) ? g >= 3 && p[g - 3] === ":" || g >= 3 && p[g - 3] === "/" ? 0 : x.match(b.re.no_http)[0].length : 0;
      }
    },
    "mailto:": {
      validate: function(p, g, b) {
        var x = p.slice(g);
        return b.re.mailto || (b.re.mailto = new RegExp(
          "^" + b.re.src_email_name + "@" + b.re.src_host_strict,
          "i"
        )), b.re.mailto.test(x) ? x.match(b.re.mailto)[0].length : 0;
      }
    }
  }, l = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", f = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
  function m(p) {
    p.__index__ = -1, p.__text_cache__ = "";
  }
  function h(p) {
    return function(g, b) {
      var x = g.slice(b);
      return p.test(x) ? x.match(p)[0].length : 0;
    };
  }
  function v() {
    return function(p, g) {
      g.normalize(p);
    };
  }
  function _(p) {
    var g = p.re = VP()(p.__opts__), b = p.__tlds__.slice();
    p.onCompile(), p.__tlds_replaced__ || b.push(l), b.push(g.src_xn), g.src_tlds = b.join("|");
    function x(w) {
      return w.replace("%TLDS%", g.src_tlds);
    }
    g.email_fuzzy = RegExp(x(g.tpl_email_fuzzy), "i"), g.link_fuzzy = RegExp(x(g.tpl_link_fuzzy), "i"), g.link_no_ip_fuzzy = RegExp(x(g.tpl_link_no_ip_fuzzy), "i"), g.host_fuzzy_test = RegExp(x(g.tpl_host_fuzzy_test), "i");
    var q = [];
    p.__compiled__ = {};
    function C(w, D) {
      throw new Error('(LinkifyIt) Invalid schema "' + w + '": ' + D);
    }
    Object.keys(p.__schemas__).forEach(function(w) {
      var D = p.__schemas__[w];
      if (D !== null) {
        var R = { validate: null, link: null };
        if (p.__compiled__[w] = R, n(D)) {
          r(D.validate) ? R.validate = h(D.validate) : o(D.validate) ? R.validate = D.validate : C(w, D), o(D.normalize) ? R.normalize = D.normalize : D.normalize ? C(w, D) : R.normalize = v();
          return;
        }
        if (e(D)) {
          q.push(w);
          return;
        }
        C(w, D);
      }
    }), q.forEach(function(w) {
      p.__compiled__[p.__schemas__[w]] && (p.__compiled__[w].validate = p.__compiled__[p.__schemas__[w]].validate, p.__compiled__[w].normalize = p.__compiled__[p.__schemas__[w]].normalize);
    }), p.__compiled__[""] = { validate: null, normalize: v() };
    var E = Object.keys(p.__compiled__).filter(function(w) {
      return w.length > 0 && p.__compiled__[w];
    }).map(s).join("|");
    p.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + g.src_ZPCc + "))(" + E + ")", "i"), p.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + g.src_ZPCc + "))(" + E + ")", "ig"), p.re.schema_at_start = RegExp("^" + p.re.schema_search.source, "i"), p.re.pretest = RegExp(
      "(" + p.re.schema_test.source + ")|(" + p.re.host_fuzzy_test.source + ")|@",
      "i"
    ), m(p);
  }
  function y(p, g) {
    var b = p.__index__, x = p.__last_index__, q = p.__text_cache__.slice(b, x);
    this.schema = p.__schema__.toLowerCase(), this.index = b + g, this.lastIndex = x + g, this.raw = q, this.text = q, this.url = q;
  }
  function d(p, g) {
    var b = new y(p, g);
    return p.__compiled__[b.schema].normalize(b, p), b;
  }
  function k(p, g) {
    if (!(this instanceof k))
      return new k(p, g);
    g || i(p) && (g = p, p = {}), this.__opts__ = u({}, c, g), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = u({}, a, p), this.__compiled__ = {}, this.__tlds__ = f, this.__tlds_replaced__ = !1, this.re = {}, _(this);
  }
  return k.prototype.add = function(g, b) {
    return this.__schemas__[g] = b, _(this), this;
  }, k.prototype.set = function(g) {
    return this.__opts__ = u(this.__opts__, g), this;
  }, k.prototype.test = function(g) {
    if (this.__text_cache__ = g, this.__index__ = -1, !g.length)
      return !1;
    var b, x, q, C, E, w, D, R, O;
    if (this.re.schema_test.test(g)) {
      for (D = this.re.schema_search, D.lastIndex = 0; (b = D.exec(g)) !== null; )
        if (C = this.testSchemaAt(g, b[2], D.lastIndex), C) {
          this.__schema__ = b[2], this.__index__ = b.index + b[1].length, this.__last_index__ = b.index + b[0].length + C;
          break;
        }
    }
    return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (R = g.search(this.re.host_fuzzy_test), R >= 0 && (this.__index__ < 0 || R < this.__index__) && (x = g.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (E = x.index + x[1].length, (this.__index__ < 0 || E < this.__index__) && (this.__schema__ = "", this.__index__ = E, this.__last_index__ = x.index + x[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (O = g.indexOf("@"), O >= 0 && (q = g.match(this.re.email_fuzzy)) !== null && (E = q.index + q[1].length, w = q.index + q[0].length, (this.__index__ < 0 || E < this.__index__ || E === this.__index__ && w > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = E, this.__last_index__ = w))), this.__index__ >= 0;
  }, k.prototype.pretest = function(g) {
    return this.re.pretest.test(g);
  }, k.prototype.testSchemaAt = function(g, b, x) {
    return this.__compiled__[b.toLowerCase()] ? this.__compiled__[b.toLowerCase()].validate(g, x, this) : 0;
  }, k.prototype.match = function(g) {
    var b = 0, x = [];
    this.__index__ >= 0 && this.__text_cache__ === g && (x.push(d(this, b)), b = this.__last_index__);
    for (var q = b ? g.slice(b) : g; this.test(q); )
      x.push(d(this, b)), q = q.slice(this.__last_index__), b += this.__last_index__;
    return x.length ? x : null;
  }, k.prototype.matchAtStart = function(g) {
    if (this.__text_cache__ = g, this.__index__ = -1, !g.length) return null;
    var b = this.re.schema_at_start.exec(g);
    if (!b) return null;
    var x = this.testSchemaAt(g, b[2], b[0].length);
    return x ? (this.__schema__ = b[2], this.__index__ = b.index + b[1].length, this.__last_index__ = b.index + b[0].length + x, d(this, 0)) : null;
  }, k.prototype.tlds = function(g, b) {
    return g = Array.isArray(g) ? g : [g], b ? (this.__tlds__ = this.__tlds__.concat(g).sort().filter(function(x, q, C) {
      return x !== C[q - 1];
    }).reverse(), _(this), this) : (this.__tlds__ = g.slice(), this.__tlds_replaced__ = !0, _(this), this);
  }, k.prototype.normalize = function(g) {
    g.schema || (g.url = "http://" + g.url), g.schema === "mailto:" && !/^mailto:/i.test(g.url) && (g.url = "mailto:" + g.url);
  }, k.prototype.onCompile = function() {
  }, rn = k, rn;
}
const GP = {}, WP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GP
}, Symbol.toStringTag, { value: "Module" })), JP = /* @__PURE__ */ Fr(WP);
var on, Re;
function YP() {
  return Re || (Re = 1, on = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 100
      // Internal protection, recursion limit
    },
    components: {
      core: {},
      block: {},
      inline: {}
    }
  }), on;
}
var sn, Te;
function QP() {
  return Te || (Te = 1, sn = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "text"
        ],
        rules2: [
          "balance_pairs",
          "fragments_join"
        ]
      }
    }
  }), sn;
}
var cn, Me;
function KP() {
  return Me || (Me = 1, cn = {
    options: {
      html: !0,
      // Enable HTML tags in source
      xhtmlOut: !0,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fence",
          "heading",
          "hr",
          "html_block",
          "lheading",
          "list",
          "reference",
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text"
        ],
        rules2: [
          "balance_pairs",
          "emphasis",
          "fragments_join"
        ]
      }
    }
  }), cn;
}
var an, ze;
function XP() {
  if (ze) return an;
  ze = 1;
  var u = T(), t = cP(), e = iP(), n = mP(), r = FP(), o = $P(), s = ZP(), c = Ve(), i = JP, a = {
    default: YP(),
    zero: QP(),
    commonmark: KP()
  }, l = /^(vbscript|javascript|file|data):/, f = /^data:image\/(gif|png|jpeg|webp);/;
  function m(d) {
    var k = d.trim().toLowerCase();
    return l.test(k) ? !!f.test(k) : !0;
  }
  var h = ["http:", "https:", "mailto:"];
  function v(d) {
    var k = c.parse(d, !0);
    if (k.hostname && (!k.protocol || h.indexOf(k.protocol) >= 0))
      try {
        k.hostname = i.toASCII(k.hostname);
      } catch {
      }
    return c.encode(c.format(k));
  }
  function _(d) {
    var k = c.parse(d, !0);
    if (k.hostname && (!k.protocol || h.indexOf(k.protocol) >= 0))
      try {
        k.hostname = i.toUnicode(k.hostname);
      } catch {
      }
    return c.decode(c.format(k), c.decode.defaultChars + "%");
  }
  function y(d, k) {
    if (!(this instanceof y))
      return new y(d, k);
    k || u.isString(d) || (k = d || {}, d = "default"), this.inline = new o(), this.block = new r(), this.core = new n(), this.renderer = new e(), this.linkify = new s(), this.validateLink = m, this.normalizeLink = v, this.normalizeLinkText = _, this.utils = u, this.helpers = u.assign({}, t), this.options = {}, this.configure(d), k && this.set(k);
  }
  return y.prototype.set = function(d) {
    return u.assign(this.options, d), this;
  }, y.prototype.configure = function(d) {
    var k = this, p;
    if (u.isString(d) && (p = d, d = a[p], !d))
      throw new Error('Wrong `markdown-it` preset "' + p + '", check name');
    if (!d)
      throw new Error("Wrong `markdown-it` preset, can't be empty");
    return d.options && k.set(d.options), d.components && Object.keys(d.components).forEach(function(g) {
      d.components[g].rules && k[g].ruler.enableOnly(d.components[g].rules), d.components[g].rules2 && k[g].ruler2.enableOnly(d.components[g].rules2);
    }), this;
  }, y.prototype.enable = function(d, k) {
    var p = [];
    Array.isArray(d) || (d = [d]), ["core", "block", "inline"].forEach(function(b) {
      p = p.concat(this[b].ruler.enable(d, !0));
    }, this), p = p.concat(this.inline.ruler2.enable(d, !0));
    var g = d.filter(function(b) {
      return p.indexOf(b) < 0;
    });
    if (g.length && !k)
      throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + g);
    return this;
  }, y.prototype.disable = function(d, k) {
    var p = [];
    Array.isArray(d) || (d = [d]), ["core", "block", "inline"].forEach(function(b) {
      p = p.concat(this[b].ruler.disable(d, !0));
    }, this), p = p.concat(this.inline.ruler2.disable(d, !0));
    var g = d.filter(function(b) {
      return p.indexOf(b) < 0;
    });
    if (g.length && !k)
      throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + g);
    return this;
  }, y.prototype.use = function(d) {
    var k = [this].concat(Array.prototype.slice.call(arguments, 1));
    return d.apply(d, k), this;
  }, y.prototype.parse = function(d, k) {
    if (typeof d != "string")
      throw new Error("Input data should be a String");
    var p = new this.core.State(d, this, k);
    return this.core.process(p), p.tokens;
  }, y.prototype.render = function(d, k) {
    return k = k || {}, this.renderer.render(this.parse(d, k), this.options, k);
  }, y.prototype.parseInline = function(d, k) {
    var p = new this.core.State(d, this, k);
    return p.inlineMode = !0, this.core.process(p), p.tokens;
  }, y.prototype.renderInline = function(d, k) {
    return k = k || {}, this.renderer.render(this.parseInline(d, k), this.options, k);
  }, an = y, an;
}
var ln, Le;
function tO() {
  return Le || (Le = 1, ln = XP()), ln;
}
var nO = tO();
const eO = /* @__PURE__ */ Sr(nO);
function Ie(u, t) {
  for (let e = t.length - 1; e >= 0; e--) {
    const n = t[e];
    if (![95, 42].includes(n.marker) || n.end === -1) continue;
    const r = t[n.end];
    let o = String.fromCharCode(n.marker), s = o === "_";
    const c = e > 0 && t[e - 1].marker === n.marker && t[e - 1].end === n.end + 1 && t[e - 1].token === n.token - 1 && t[n.end + 1].token === r.token + 1;
    let i = u.tokens[n.token];
    const a = c * 2 + s;
    i.type = ["mark", "em", "strong", "under"][a] + "_open", i.tag = ["mark", "em", "strong", "u"][a], i.nesting = 1, i.markup = c ? o + o : o, i.content = "", i = u.tokens[r.token], i.type = ["mark", "em", "strong", "under"][a] + "_close", i.tag = ["mark", "em", "strong", "u"][a], i.nesting = -1, i.markup = c ? o + o : o, i.content = "", c && (u.tokens[t[e - 1].token].content = "", u.tokens[t[n.end + 1].token].content = "", e--);
  }
}
function rO(u) {
  let t, e = u.tokens_meta, n = u.tokens_meta.length;
  for (Ie(u, u.delimiters), t = 0; t < n; t++)
    e[t] && e[t].delimiters && Ie(u, e[t].delimiters);
}
function oO(u) {
  u.inline.ruler2.at("emphasis", rO);
}
var Pe = !0, Ye = !1, Qe = !1;
function sO(u, t) {
  t && (Pe = !t.enabled, Ye = !!t.label, Qe = !!t.labelAfter), u.core.ruler.after("inline", "github-task-lists", function(e) {
    for (var n = e.tokens, r = 2; r < n.length; r++)
      iO(n, r) && (aO(n[r], e.Token), Oe(
        n[r - 2],
        "class",
        "task-list-item" + (Pe ? "" : " enabled")
      ), Oe(
        n[cO(n, r - 2)],
        "class",
        "contains-task-list"
      ));
  });
}
function Oe(u, t, e) {
  var n = u.attrIndex(t), r = [t, e];
  n < 0 ? u.attrPush(r) : u.attrs[n] = r;
}
function cO(u, t) {
  for (var e = u[t].level - 1, n = t - 1; n >= 0; n--)
    if (u[n].level === e)
      return n;
  return -1;
}
function iO(u, t) {
  return pO(u[t]) && dO(u[t - 1]) && gO(u[t - 2]) && mO(u[t]);
}
function aO(u, t) {
  if (u.children.unshift(lO(u, t)), u.children[1].content = u.children[1].content.slice(3), u.content = u.content.slice(3), Ye)
    if (Qe) {
      u.children.pop();
      var e = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
      u.children[0].content = u.children[0].content.slice(0, -1) + ' id="' + e + '">', u.children.push(hO(u.content, e, t));
    } else
      u.children.unshift(uO(t)), u.children.push(fO(t));
}
function lO(u, t) {
  var e = new t("html_inline", "", 0);
  const n = /(?=\[[ _xX]\]|\([ _oO]\))([\[\(])([ _xXoO])[\]\)](?:([a-z]+)(?:=([a-z]+))?)?/g;
  let r = [...u.content.matchAll(n)];
  r.reverse();
  for (const o of r) {
    const [s, c, i, a, l] = o, { index: f } = o, m = s.length, h = `<input type="${c === "[" ? "checkbox" : "radio"}" />`;
    u.content = u.content.slice(f, m), console.log(f, s, c, i, a, l), e.content += h;
  }
  return e;
}
function uO(u) {
  var t = new u("html_inline", "", 0);
  return t.content = "<label>", t;
}
function fO(u) {
  var t = new u("html_inline", "", 0);
  return t.content = "</label>", t;
}
function hO(u, t, e) {
  var n = new e("html_inline", "", 0);
  return n.content = '<label class="task-list-item-label" for="' + t + '">' + u + "</label>", n.attrs = [{ for: t }], n;
}
function pO(u) {
  return u.type === "inline";
}
function dO(u) {
  return u.type === "paragraph_open";
}
function gO(u) {
  return u.type === "list_item_open";
}
function mO(u) {
  return u.content.indexOf("[ ]") === 0 || u.content.indexOf("[x]") === 0 || u.content.indexOf("[X]") === 0 || u.content.indexOf("( )") === 0 || u.content.indexOf("(o)") === 0 || u.content.indexOf("(O)") === 0;
}
function _O(u, t) {
  if (t && dn.getLanguage(t))
    try {
      return dn.highlight(u, { language: t }).value;
    } catch {
    }
  return "";
}
let vO = new eO({
  html: !0,
  xhtmlOut: !0,
  breaks: !1,
  linkify: !0,
  highlight: _O
}).use(oO).use(sO, { enabled: !0 });
function Be(u) {
  if (!u) return;
  const t = u.innerHTML.replace(/style="zoom: 1;"/gi, "").replace(/<[\/]?div\s*>/gi, `
`).replace(/<br\s*[\/]?>/gi, `
`);
  var e = new DOMParser().parseFromString(
    "<!doctype html><body>" + t,
    "text/html"
  ).body.textContent;
  const n = vO.render(e);
  u.innerHTML = n;
}
function kO() {
  Be(document.querySelector("header")), Be(document.querySelector("footer")), console.log("markdownize done");
}
const bO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _50_markdownize: kO
}, Symbol.toStringTag, { value: "Module" }));
let Ke;
const xO = { attributes: !1, childList: !0, subtree: !0 };
let pn;
function yO(u, t) {
  Ke = u, pn = new MutationObserver(t);
}
function CO() {
  console.log("resumed observer"), pn.observe(Ke, xO);
}
function AO() {
  console.log("paused observer"), pn.disconnect();
}
function qO() {
  AO();
}
function wO() {
  CO();
}
const EO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _00_observer: qO,
  _99_observer: wO
}, Symbol.toStringTag, { value: "Module" }));
function DO() {
  let u = document.querySelector(".tags");
  u.classList.contains("tagged") || u && (u.innerHTML = u.innerHTML.split(" ").filter((t) => t !== "").map(
    (t) => `<li style="--tagcolor:${He(Ne(t))}">${t}</li>`
  ).join(""), u.classList.add("tagged"), console.log("tags installed"));
}
const SO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _50_tags: DO
}, Symbol.toStringTag, { value: "Module" })), FO = /* @__PURE__ */ Object.assign({ "./modules/background.js": xr, "./modules/breadcrumb.js": Ar, "./modules/flip.js": Dr, "./modules/markdownize.js": bO, "./modules/observer.js": EO, "./modules/tags.js": SO }), RO = Object.entries(Object.assign({}, ...Object.values(FO))).map(([u, t]) => ({ name: u, fn: t })).sort((u, t) => u.name.localeCompare(t.name));
function Xe() {
  console.log("redraw"), RO.forEach(({ name: u, fn: t }) => {
    console.group("module", u);
    try {
      t();
    } catch (e) {
      console.error(e);
    } finally {
      console.groupEnd();
    }
  });
}
yO(document.getElementById("qa"), Xe);
Xe();
