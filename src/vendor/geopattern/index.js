import { Pattern } from "./pattern";

/*
 * Normalize arguments, if not given, to:
 * string: (new Date()).toString()
 * options: {}
 */
function optArgs(cb) {
  return function (string, options) {
    if (typeof string === "object") {
      options = string;
      string = null;
    }
    if (string === null || string === undefined) string = new Date().toString();
    if (!options) options = {};
    return cb.call(this, string, options);
  };
}

const GeoPattern = {
  generate: optArgs(function (string, options) {
    return new Pattern(string, options);
  }),
};
export default GeoPattern;
