export class XMLNode {
  constructor(tagName) {
    if (!(this instanceof XMLNode)) {
      return new XMLNode(tagName);
    }

    this.tagName = tagName;
    this.attributes = Object.create(null);
    this.children = [];
    this.lastChild = null;

    return this;
  }
  appendChild(child) {
    this.children.push(child);
    this.lastChild = child;

    return this;
  }
  setAttribute(name, value) {
    this.attributes[name] = value;

    return this;
  }
  toString() {
    var self = this;

    return [
      "<",
      self.tagName,
      Object.keys(self.attributes)
        .map(function (attr) {
          return [" ", attr, '="', self.attributes[attr], '"'].join("");
        })
        .join(""),
      ">",
      self.children
        .map(function (child) {
          return child.toString();
        })
        .join(""),
      "</",
      self.tagName,
      ">",
    ].join("");
  }
}
