//import assign from "object-assign";
import { XMLNode } from "./xml";

export default class SVG {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.svg = new XMLNode("svg");
    this.context = []; // Track nested nodes
    this.setAttributes(this.svg, {
      xmlns: "http://www.w3.org/2000/svg",
      width: this.width,
      height: this.height,
    });

    return this;
  }
  // This is a hack so groups work.
  currentContext() {
    return this.context[this.context.length - 1] || this.svg;
  }
  // This is a hack so groups work.
  end() {
    this.context.pop();
    return this;
  }
  currentNode() {
    var context = this.currentContext();
    return context.lastChild || context;
  }
  transform(transformations) {
    this.currentNode().setAttribute(
      "transform",
      Object.keys(transformations)
        .map(function (transformation) {
          return (
            transformation +
            "(" +
            transformations[transformation].join(",") +
            ")"
          );
        })
        .join(" ")
    );
    return this;
  }
  setAttributes(el, attrs) {
    Object.keys(attrs).forEach(function (attr) {
      el.setAttribute(attr, attrs[attr]);
    });
  }
  setWidth(width) {
    this.svg.setAttribute("width", Math.floor(width));
  }
  setHeight(height) {
    this.svg.setAttribute("height", Math.floor(height));
  }
  toString() {
    return this.svg.toString();
  }
  rect(x, y, width, height, args) {
    // Accept array first argument
    var self = this;
    if (Array.isArray(x)) {
      x.forEach(function (a) {
        self.rect.apply(self, a.concat(args));
      });
      return this;
    }

    var rect = new XMLNode("rect");
    this.currentContext().appendChild(rect);
    this.setAttributes(
      rect,
      Object.assign(
        {
          x: x,
          y: y,
          width: width,
          height: height,
        },
        args
      )
    );

    return this;
  }
  circle(cx, cy, r, args) {
    var circle = new XMLNode("circle");
    this.currentContext().appendChild(circle);
    this.setAttributes(
      circle,
      Object.assign(
        {
          cx: cx,
          cy: cy,
          r: r,
        },
        args
      )
    );

    return this;
  }
  path(str, args) {
    var path = new XMLNode("path");
    this.currentContext().appendChild(path);
    this.setAttributes(
      path,
      Object.assign(
        {
          d: str,
        },
        args
      )
    );

    return this;
  }
  polyline(str, args) {
    // Accept array first argument
    var self = this;
    if (Array.isArray(str)) {
      str.forEach(function (s) {
        self.polyline(s, args);
      });
      return this;
    }

    var polyline = new XMLNode("polyline");
    this.currentContext().appendChild(polyline);
    this.setAttributes(
      polyline,
      Object.assign(
        {
          points: str,
        },
        args
      )
    );

    return this;
  }
  // group and context are hacks
  group(args) {
    var group = new XMLNode("g");
    this.currentContext().appendChild(group);
    this.context.push(group);
    this.setAttributes(group, Object.assign({}, args));
    return this;
  }
}
