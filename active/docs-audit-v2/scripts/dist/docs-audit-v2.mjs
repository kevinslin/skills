#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name2 in all2)
    __defProp(target, name2, { get: all2[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module) {
    "use strict";
    var hasOwn2 = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray2 = function isArray3(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn2.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn2.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn2.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name2) {
      if (name2 === "__proto__") {
        if (!hasOwn2.call(obj, name2)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name2).value;
        }
      }
      return obj[name2];
    };
    module.exports = function extend3() {
      var options, name2, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name2 in options) {
            src = getProperty(target, name2);
            copy = getProperty(options, name2);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray2(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray2(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name: name2, newValue: extend3(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name: name2, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/acorn-jsx/xhtml.js
var require_xhtml = __commonJS({
  "node_modules/acorn-jsx/xhtml.js"(exports, module) {
    module.exports = {
      quot: '"',
      amp: "&",
      apos: "'",
      lt: "<",
      gt: ">",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      times: "\xD7",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      divide: "\xF7",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      frasl: "\u2044",
      euro: "\u20AC",
      image: "\u2111",
      weierp: "\u2118",
      real: "\u211C",
      trade: "\u2122",
      alefsym: "\u2135",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lArr: "\u21D0",
      uArr: "\u21D1",
      rArr: "\u21D2",
      dArr: "\u21D3",
      hArr: "\u21D4",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      "int": "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      lang: "\u2329",
      rang: "\u232A",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    };
  }
});

// node_modules/acorn/dist/acorn.js
var require_acorn = __commonJS({
  "node_modules/acorn/dist/acorn.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.acorn = {}));
    })(exports, (function(exports2) {
      "use strict";
      var astralIdentifierCodes2 = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 78, 5, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 199, 7, 137, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 55, 9, 266, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 233, 0, 3, 0, 8, 1, 6, 0, 475, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
      var astralIdentifierStartCodes2 = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 7, 25, 39, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 5, 57, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 24, 43, 261, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 33, 24, 3, 24, 45, 74, 6, 0, 67, 12, 65, 1, 2, 0, 15, 4, 10, 7381, 42, 31, 98, 114, 8702, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 208, 30, 2, 2, 2, 1, 2, 6, 3, 4, 10, 1, 225, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4381, 3, 5773, 3, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 8489];
      var nonASCIIidentifierChars2 = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
      var nonASCIIidentifierStartChars2 = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
      var reservedWords2 = {
        3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
        5: "class enum extends super const export import",
        6: "enum",
        strict: "implements interface let package private protected public static yield",
        strictBind: "eval arguments"
      };
      var ecma5AndLessKeywords2 = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
      var keywords$12 = {
        5: ecma5AndLessKeywords2,
        "5module": ecma5AndLessKeywords2 + " export import",
        6: ecma5AndLessKeywords2 + " const class extends export import super"
      };
      var keywordRelationalOperator2 = /^in(stanceof)?$/;
      var nonASCIIidentifierStart2 = new RegExp("[" + nonASCIIidentifierStartChars2 + "]");
      var nonASCIIidentifier2 = new RegExp("[" + nonASCIIidentifierStartChars2 + nonASCIIidentifierChars2 + "]");
      function isInAstralSet2(code3, set) {
        var pos = 65536;
        for (var i2 = 0; i2 < set.length; i2 += 2) {
          pos += set[i2];
          if (pos > code3) {
            return false;
          }
          pos += set[i2 + 1];
          if (pos >= code3) {
            return true;
          }
        }
        return false;
      }
      function isIdentifierStart2(code3, astral) {
        if (code3 < 65) {
          return code3 === 36;
        }
        if (code3 < 91) {
          return true;
        }
        if (code3 < 97) {
          return code3 === 95;
        }
        if (code3 < 123) {
          return true;
        }
        if (code3 <= 65535) {
          return code3 >= 170 && nonASCIIidentifierStart2.test(String.fromCharCode(code3));
        }
        if (astral === false) {
          return false;
        }
        return isInAstralSet2(code3, astralIdentifierStartCodes2);
      }
      function isIdentifierChar2(code3, astral) {
        if (code3 < 48) {
          return code3 === 36;
        }
        if (code3 < 58) {
          return true;
        }
        if (code3 < 65) {
          return false;
        }
        if (code3 < 91) {
          return true;
        }
        if (code3 < 97) {
          return code3 === 95;
        }
        if (code3 < 123) {
          return true;
        }
        if (code3 <= 65535) {
          return code3 >= 170 && nonASCIIidentifier2.test(String.fromCharCode(code3));
        }
        if (astral === false) {
          return false;
        }
        return isInAstralSet2(code3, astralIdentifierStartCodes2) || isInAstralSet2(code3, astralIdentifierCodes2);
      }
      var TokenType3 = function TokenType4(label, conf) {
        if (conf === void 0) conf = {};
        this.label = label;
        this.keyword = conf.keyword;
        this.beforeExpr = !!conf.beforeExpr;
        this.startsExpr = !!conf.startsExpr;
        this.isLoop = !!conf.isLoop;
        this.isAssign = !!conf.isAssign;
        this.prefix = !!conf.prefix;
        this.postfix = !!conf.postfix;
        this.binop = conf.binop || null;
        this.updateContext = null;
      };
      function binop2(name2, prec) {
        return new TokenType3(name2, { beforeExpr: true, binop: prec });
      }
      var beforeExpr2 = { beforeExpr: true }, startsExpr2 = { startsExpr: true };
      var keywords2 = {};
      function kw2(name2, options) {
        if (options === void 0) options = {};
        options.keyword = name2;
        return keywords2[name2] = new TokenType3(name2, options);
      }
      var types$12 = {
        num: new TokenType3("num", startsExpr2),
        regexp: new TokenType3("regexp", startsExpr2),
        string: new TokenType3("string", startsExpr2),
        name: new TokenType3("name", startsExpr2),
        privateId: new TokenType3("privateId", startsExpr2),
        eof: new TokenType3("eof"),
        // Punctuation token types.
        bracketL: new TokenType3("[", { beforeExpr: true, startsExpr: true }),
        bracketR: new TokenType3("]"),
        braceL: new TokenType3("{", { beforeExpr: true, startsExpr: true }),
        braceR: new TokenType3("}"),
        parenL: new TokenType3("(", { beforeExpr: true, startsExpr: true }),
        parenR: new TokenType3(")"),
        comma: new TokenType3(",", beforeExpr2),
        semi: new TokenType3(";", beforeExpr2),
        colon: new TokenType3(":", beforeExpr2),
        dot: new TokenType3("."),
        question: new TokenType3("?", beforeExpr2),
        questionDot: new TokenType3("?."),
        arrow: new TokenType3("=>", beforeExpr2),
        template: new TokenType3("template"),
        invalidTemplate: new TokenType3("invalidTemplate"),
        ellipsis: new TokenType3("...", beforeExpr2),
        backQuote: new TokenType3("`", startsExpr2),
        dollarBraceL: new TokenType3("${", { beforeExpr: true, startsExpr: true }),
        // Operators. These carry several kinds of properties to help the
        // parser use them properly (the presence of these properties is
        // what categorizes them as operators).
        //
        // `binop`, when present, specifies that this operator is a binary
        // operator, and will refer to its precedence.
        //
        // `prefix` and `postfix` mark the operator as a prefix or postfix
        // unary operator.
        //
        // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
        // binary operators with a very low precedence, that should result
        // in AssignmentExpression nodes.
        eq: new TokenType3("=", { beforeExpr: true, isAssign: true }),
        assign: new TokenType3("_=", { beforeExpr: true, isAssign: true }),
        incDec: new TokenType3("++/--", { prefix: true, postfix: true, startsExpr: true }),
        prefix: new TokenType3("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
        logicalOR: binop2("||", 1),
        logicalAND: binop2("&&", 2),
        bitwiseOR: binop2("|", 3),
        bitwiseXOR: binop2("^", 4),
        bitwiseAND: binop2("&", 5),
        equality: binop2("==/!=/===/!==", 6),
        relational: binop2("</>/<=/>=", 7),
        bitShift: binop2("<</>>/>>>", 8),
        plusMin: new TokenType3("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
        modulo: binop2("%", 10),
        star: binop2("*", 10),
        slash: binop2("/", 10),
        starstar: new TokenType3("**", { beforeExpr: true }),
        coalesce: binop2("??", 1),
        // Keyword token types.
        _break: kw2("break"),
        _case: kw2("case", beforeExpr2),
        _catch: kw2("catch"),
        _continue: kw2("continue"),
        _debugger: kw2("debugger"),
        _default: kw2("default", beforeExpr2),
        _do: kw2("do", { isLoop: true, beforeExpr: true }),
        _else: kw2("else", beforeExpr2),
        _finally: kw2("finally"),
        _for: kw2("for", { isLoop: true }),
        _function: kw2("function", startsExpr2),
        _if: kw2("if"),
        _return: kw2("return", beforeExpr2),
        _switch: kw2("switch"),
        _throw: kw2("throw", beforeExpr2),
        _try: kw2("try"),
        _var: kw2("var"),
        _const: kw2("const"),
        _while: kw2("while", { isLoop: true }),
        _with: kw2("with"),
        _new: kw2("new", { beforeExpr: true, startsExpr: true }),
        _this: kw2("this", startsExpr2),
        _super: kw2("super", startsExpr2),
        _class: kw2("class", startsExpr2),
        _extends: kw2("extends", beforeExpr2),
        _export: kw2("export"),
        _import: kw2("import", startsExpr2),
        _null: kw2("null", startsExpr2),
        _true: kw2("true", startsExpr2),
        _false: kw2("false", startsExpr2),
        _in: kw2("in", { beforeExpr: true, binop: 7 }),
        _instanceof: kw2("instanceof", { beforeExpr: true, binop: 7 }),
        _typeof: kw2("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
        _void: kw2("void", { beforeExpr: true, prefix: true, startsExpr: true }),
        _delete: kw2("delete", { beforeExpr: true, prefix: true, startsExpr: true })
      };
      var lineBreak2 = /\r\n?|\n|\u2028|\u2029/;
      var lineBreakG2 = new RegExp(lineBreak2.source, "g");
      function isNewLine2(code3) {
        return code3 === 10 || code3 === 13 || code3 === 8232 || code3 === 8233;
      }
      function nextLineBreak2(code3, from, end) {
        if (end === void 0) end = code3.length;
        for (var i2 = from; i2 < end; i2++) {
          var next = code3.charCodeAt(i2);
          if (isNewLine2(next)) {
            return i2 < end - 1 && next === 13 && code3.charCodeAt(i2 + 1) === 10 ? i2 + 2 : i2 + 1;
          }
        }
        return -1;
      }
      var nonASCIIwhitespace2 = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
      var skipWhiteSpace2 = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
      var ref2 = Object.prototype;
      var hasOwnProperty3 = ref2.hasOwnProperty;
      var toString3 = ref2.toString;
      var hasOwn2 = Object.hasOwn || (function(obj, propName) {
        return hasOwnProperty3.call(obj, propName);
      });
      var isArray2 = Array.isArray || (function(obj) {
        return toString3.call(obj) === "[object Array]";
      });
      var regexpCache2 = /* @__PURE__ */ Object.create(null);
      function wordsRegexp2(words) {
        return regexpCache2[words] || (regexpCache2[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"));
      }
      function codePointToString2(code3) {
        if (code3 <= 65535) {
          return String.fromCharCode(code3);
        }
        code3 -= 65536;
        return String.fromCharCode((code3 >> 10) + 55296, (code3 & 1023) + 56320);
      }
      var loneSurrogate2 = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
      var Position3 = function Position4(line, col) {
        this.line = line;
        this.column = col;
      };
      Position3.prototype.offset = function offset2(n) {
        return new Position3(this.line, this.column + n);
      };
      var SourceLocation3 = function SourceLocation4(p, start2, end) {
        this.start = start2;
        this.end = end;
        if (p.sourceFile !== null) {
          this.source = p.sourceFile;
        }
      };
      function getLineInfo2(input, offset2) {
        for (var line = 1, cur = 0; ; ) {
          var nextBreak = nextLineBreak2(input, cur, offset2);
          if (nextBreak < 0) {
            return new Position3(line, offset2 - cur);
          }
          ++line;
          cur = nextBreak;
        }
      }
      var defaultOptions2 = {
        // `ecmaVersion` indicates the ECMAScript version to parse. Must be
        // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
        // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
        // (the latest version the library supports). This influences
        // support for strict mode, the set of reserved words, and support
        // for new syntax features.
        ecmaVersion: null,
        // `sourceType` indicates the mode the code should be parsed in.
        // Can be either `"script"`, `"module"` or `"commonjs"`. This influences global
        // strict mode and parsing of `import` and `export` declarations.
        sourceType: "script",
        // `onInsertedSemicolon` can be a callback that will be called when
        // a semicolon is automatically inserted. It will be passed the
        // position of the inserted semicolon as an offset, and if
        // `locations` is enabled, it is given the location as a `{line,
        // column}` object as second argument.
        onInsertedSemicolon: null,
        // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
        // trailing commas.
        onTrailingComma: null,
        // By default, reserved words are only enforced if ecmaVersion >= 5.
        // Set `allowReserved` to a boolean value to explicitly turn this on
        // an off. When this option has the value "never", reserved words
        // and keywords can also not be used as property names.
        allowReserved: null,
        // When enabled, a return at the top level is not considered an
        // error.
        allowReturnOutsideFunction: false,
        // When enabled, import/export statements are not constrained to
        // appearing at the top of the program, and an import.meta expression
        // in a script isn't considered an error.
        allowImportExportEverywhere: false,
        // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
        // When enabled, await identifiers are allowed to appear at the top-level scope,
        // but they are still not allowed in non-async functions.
        allowAwaitOutsideFunction: null,
        // When enabled, super identifiers are not constrained to
        // appearing in methods and do not raise an error when they appear elsewhere.
        allowSuperOutsideMethod: null,
        // When enabled, hashbang directive in the beginning of file is
        // allowed and treated as a line comment. Enabled by default when
        // `ecmaVersion` >= 2023.
        allowHashBang: false,
        // By default, the parser will verify that private properties are
        // only used in places where they are valid and have been declared.
        // Set this to false to turn such checks off.
        checkPrivateFields: true,
        // When `locations` is on, `loc` properties holding objects with
        // `start` and `end` properties in `{line, column}` form (with
        // line being 1-based and column 0-based) will be attached to the
        // nodes.
        locations: false,
        // A function can be passed as `onToken` option, which will
        // cause Acorn to call that function with object in the same
        // format as tokens returned from `tokenizer().getToken()`. Note
        // that you are not allowed to call the parser from the
        // callback—that will corrupt its internal state.
        onToken: null,
        // A function can be passed as `onComment` option, which will
        // cause Acorn to call that function with `(block, text, start,
        // end)` parameters whenever a comment is skipped. `block` is a
        // boolean indicating whether this is a block (`/* */`) comment,
        // `text` is the content of the comment, and `start` and `end` are
        // character offsets that denote the start and end of the comment.
        // When the `locations` option is on, two more parameters are
        // passed, the full `{line, column}` locations of the start and
        // end of the comments. Note that you are not allowed to call the
        // parser from the callback—that will corrupt its internal state.
        // When this option has an array as value, objects representing the
        // comments are pushed to it.
        onComment: null,
        // Nodes have their start and end characters offsets recorded in
        // `start` and `end` properties (directly on the node, rather than
        // the `loc` object, which holds line/column data. To also add a
        // [semi-standardized][range] `range` property holding a `[start,
        // end]` array with the same numbers, set the `ranges` option to
        // `true`.
        //
        // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
        ranges: false,
        // It is possible to parse multiple files into a single AST by
        // passing the tree produced by parsing the first file as
        // `program` option in subsequent parses. This will add the
        // toplevel forms of the parsed file to the `Program` (top) node
        // of an existing parse tree.
        program: null,
        // When `locations` is on, you can pass this to record the source
        // file in every node's `loc` object.
        sourceFile: null,
        // This value, if given, is stored in every node, whether
        // `locations` is on or off.
        directSourceFile: null,
        // When enabled, parenthesized expressions are represented by
        // (non-standard) ParenthesizedExpression nodes
        preserveParens: false
      };
      var warnedAboutEcmaVersion2 = false;
      function getOptions2(opts) {
        var options = {};
        for (var opt in defaultOptions2) {
          options[opt] = opts && hasOwn2(opts, opt) ? opts[opt] : defaultOptions2[opt];
        }
        if (options.ecmaVersion === "latest") {
          options.ecmaVersion = 1e8;
        } else if (options.ecmaVersion == null) {
          if (!warnedAboutEcmaVersion2 && typeof console === "object" && console.warn) {
            warnedAboutEcmaVersion2 = true;
            console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
          }
          options.ecmaVersion = 11;
        } else if (options.ecmaVersion >= 2015) {
          options.ecmaVersion -= 2009;
        }
        if (options.allowReserved == null) {
          options.allowReserved = options.ecmaVersion < 5;
        }
        if (!opts || opts.allowHashBang == null) {
          options.allowHashBang = options.ecmaVersion >= 14;
        }
        if (isArray2(options.onToken)) {
          var tokens = options.onToken;
          options.onToken = function(token) {
            return tokens.push(token);
          };
        }
        if (isArray2(options.onComment)) {
          options.onComment = pushComment2(options, options.onComment);
        }
        if (options.sourceType === "commonjs" && options.allowAwaitOutsideFunction) {
          throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
        }
        return options;
      }
      function pushComment2(options, array) {
        return function(block, text5, start2, end, startLoc, endLoc) {
          var comment = {
            type: block ? "Block" : "Line",
            value: text5,
            start: start2,
            end
          };
          if (options.locations) {
            comment.loc = new SourceLocation3(this, startLoc, endLoc);
          }
          if (options.ranges) {
            comment.range = [start2, end];
          }
          array.push(comment);
        };
      }
      var SCOPE_TOP2 = 1, SCOPE_FUNCTION2 = 2, SCOPE_ASYNC2 = 4, SCOPE_GENERATOR2 = 8, SCOPE_ARROW2 = 16, SCOPE_SIMPLE_CATCH2 = 32, SCOPE_SUPER2 = 64, SCOPE_DIRECT_SUPER2 = 128, SCOPE_CLASS_STATIC_BLOCK2 = 256, SCOPE_CLASS_FIELD_INIT2 = 512, SCOPE_SWITCH2 = 1024, SCOPE_VAR2 = SCOPE_TOP2 | SCOPE_FUNCTION2 | SCOPE_CLASS_STATIC_BLOCK2;
      function functionFlags2(async, generator) {
        return SCOPE_FUNCTION2 | (async ? SCOPE_ASYNC2 : 0) | (generator ? SCOPE_GENERATOR2 : 0);
      }
      var BIND_NONE2 = 0, BIND_VAR2 = 1, BIND_LEXICAL2 = 2, BIND_FUNCTION2 = 3, BIND_SIMPLE_CATCH2 = 4, BIND_OUTSIDE2 = 5;
      var Parser3 = function Parser4(options, input, startPos) {
        this.options = options = getOptions2(options);
        this.sourceFile = options.sourceFile;
        this.keywords = wordsRegexp2(keywords$12[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
        var reserved = "";
        if (options.allowReserved !== true) {
          reserved = reservedWords2[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
          if (options.sourceType === "module") {
            reserved += " await";
          }
        }
        this.reservedWords = wordsRegexp2(reserved);
        var reservedStrict = (reserved ? reserved + " " : "") + reservedWords2.strict;
        this.reservedWordsStrict = wordsRegexp2(reservedStrict);
        this.reservedWordsStrictBind = wordsRegexp2(reservedStrict + " " + reservedWords2.strictBind);
        this.input = String(input);
        this.containsEsc = false;
        if (startPos) {
          this.pos = startPos;
          this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
          this.curLine = this.input.slice(0, this.lineStart).split(lineBreak2).length;
        } else {
          this.pos = this.lineStart = 0;
          this.curLine = 1;
        }
        this.type = types$12.eof;
        this.value = null;
        this.start = this.end = this.pos;
        this.startLoc = this.endLoc = this.curPosition();
        this.lastTokEndLoc = this.lastTokStartLoc = null;
        this.lastTokStart = this.lastTokEnd = this.pos;
        this.context = this.initialContext();
        this.exprAllowed = true;
        this.inModule = options.sourceType === "module";
        this.strict = this.inModule || this.strictDirective(this.pos);
        this.potentialArrowAt = -1;
        this.potentialArrowInForAwait = false;
        this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
        this.labels = [];
        this.undefinedExports = /* @__PURE__ */ Object.create(null);
        if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
          this.skipLineComment(2);
        }
        this.scopeStack = [];
        this.enterScope(
          this.options.sourceType === "commonjs" ? SCOPE_FUNCTION2 : SCOPE_TOP2
        );
        this.regexpState = null;
        this.privateNameStack = [];
      };
      var prototypeAccessors2 = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowReturn: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, allowUsing: { configurable: true }, inClassStaticBlock: { configurable: true } };
      Parser3.prototype.parse = function parse5() {
        var node2 = this.options.program || this.startNode();
        this.nextToken();
        return this.parseTopLevel(node2);
      };
      prototypeAccessors2.inFunction.get = function() {
        return (this.currentVarScope().flags & SCOPE_FUNCTION2) > 0;
      };
      prototypeAccessors2.inGenerator.get = function() {
        return (this.currentVarScope().flags & SCOPE_GENERATOR2) > 0;
      };
      prototypeAccessors2.inAsync.get = function() {
        return (this.currentVarScope().flags & SCOPE_ASYNC2) > 0;
      };
      prototypeAccessors2.canAwait.get = function() {
        for (var i2 = this.scopeStack.length - 1; i2 >= 0; i2--) {
          var ref3 = this.scopeStack[i2];
          var flags = ref3.flags;
          if (flags & (SCOPE_CLASS_STATIC_BLOCK2 | SCOPE_CLASS_FIELD_INIT2)) {
            return false;
          }
          if (flags & SCOPE_FUNCTION2) {
            return (flags & SCOPE_ASYNC2) > 0;
          }
        }
        return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
      };
      prototypeAccessors2.allowReturn.get = function() {
        if (this.inFunction) {
          return true;
        }
        if (this.options.allowReturnOutsideFunction && this.currentVarScope().flags & SCOPE_TOP2) {
          return true;
        }
        return false;
      };
      prototypeAccessors2.allowSuper.get = function() {
        var ref3 = this.currentThisScope();
        var flags = ref3.flags;
        return (flags & SCOPE_SUPER2) > 0 || this.options.allowSuperOutsideMethod;
      };
      prototypeAccessors2.allowDirectSuper.get = function() {
        return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER2) > 0;
      };
      prototypeAccessors2.treatFunctionsAsVar.get = function() {
        return this.treatFunctionsAsVarInScope(this.currentScope());
      };
      prototypeAccessors2.allowNewDotTarget.get = function() {
        for (var i2 = this.scopeStack.length - 1; i2 >= 0; i2--) {
          var ref3 = this.scopeStack[i2];
          var flags = ref3.flags;
          if (flags & (SCOPE_CLASS_STATIC_BLOCK2 | SCOPE_CLASS_FIELD_INIT2) || flags & SCOPE_FUNCTION2 && !(flags & SCOPE_ARROW2)) {
            return true;
          }
        }
        return false;
      };
      prototypeAccessors2.allowUsing.get = function() {
        var ref3 = this.currentScope();
        var flags = ref3.flags;
        if (flags & SCOPE_SWITCH2) {
          return false;
        }
        if (!this.inModule && flags & SCOPE_TOP2) {
          return false;
        }
        return true;
      };
      prototypeAccessors2.inClassStaticBlock.get = function() {
        return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK2) > 0;
      };
      Parser3.extend = function extend3() {
        var plugins = [], len = arguments.length;
        while (len--) plugins[len] = arguments[len];
        var cls = this;
        for (var i2 = 0; i2 < plugins.length; i2++) {
          cls = plugins[i2](cls);
        }
        return cls;
      };
      Parser3.parse = function parse5(input, options) {
        return new this(options, input).parse();
      };
      Parser3.parseExpressionAt = function parseExpressionAt3(input, pos, options) {
        var parser = new this(options, input, pos);
        parser.nextToken();
        return parser.parseExpression();
      };
      Parser3.tokenizer = function tokenizer3(input, options) {
        return new this(options, input);
      };
      Object.defineProperties(Parser3.prototype, prototypeAccessors2);
      var pp$92 = Parser3.prototype;
      var literal2 = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
      pp$92.strictDirective = function(start2) {
        if (this.options.ecmaVersion < 5) {
          return false;
        }
        for (; ; ) {
          skipWhiteSpace2.lastIndex = start2;
          start2 += skipWhiteSpace2.exec(this.input)[0].length;
          var match = literal2.exec(this.input.slice(start2));
          if (!match) {
            return false;
          }
          if ((match[1] || match[2]) === "use strict") {
            skipWhiteSpace2.lastIndex = start2 + match[0].length;
            var spaceAfter = skipWhiteSpace2.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
            var next = this.input.charAt(end);
            return next === ";" || next === "}" || lineBreak2.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
          }
          start2 += match[0].length;
          skipWhiteSpace2.lastIndex = start2;
          start2 += skipWhiteSpace2.exec(this.input)[0].length;
          if (this.input[start2] === ";") {
            start2++;
          }
        }
      };
      pp$92.eat = function(type) {
        if (this.type === type) {
          this.next();
          return true;
        } else {
          return false;
        }
      };
      pp$92.isContextual = function(name2) {
        return this.type === types$12.name && this.value === name2 && !this.containsEsc;
      };
      pp$92.eatContextual = function(name2) {
        if (!this.isContextual(name2)) {
          return false;
        }
        this.next();
        return true;
      };
      pp$92.expectContextual = function(name2) {
        if (!this.eatContextual(name2)) {
          this.unexpected();
        }
      };
      pp$92.canInsertSemicolon = function() {
        return this.type === types$12.eof || this.type === types$12.braceR || lineBreak2.test(this.input.slice(this.lastTokEnd, this.start));
      };
      pp$92.insertSemicolon = function() {
        if (this.canInsertSemicolon()) {
          if (this.options.onInsertedSemicolon) {
            this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
          }
          return true;
        }
      };
      pp$92.semicolon = function() {
        if (!this.eat(types$12.semi) && !this.insertSemicolon()) {
          this.unexpected();
        }
      };
      pp$92.afterTrailingComma = function(tokType, notNext) {
        if (this.type === tokType) {
          if (this.options.onTrailingComma) {
            this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
          }
          if (!notNext) {
            this.next();
          }
          return true;
        }
      };
      pp$92.expect = function(type) {
        this.eat(type) || this.unexpected();
      };
      pp$92.unexpected = function(pos) {
        this.raise(pos != null ? pos : this.start, "Unexpected token");
      };
      var DestructuringErrors3 = function DestructuringErrors4() {
        this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
      };
      pp$92.checkPatternErrors = function(refDestructuringErrors, isAssign) {
        if (!refDestructuringErrors) {
          return;
        }
        if (refDestructuringErrors.trailingComma > -1) {
          this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
        }
        var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
        if (parens > -1) {
          this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
        }
      };
      pp$92.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
        if (!refDestructuringErrors) {
          return false;
        }
        var shorthandAssign = refDestructuringErrors.shorthandAssign;
        var doubleProto = refDestructuringErrors.doubleProto;
        if (!andThrow) {
          return shorthandAssign >= 0 || doubleProto >= 0;
        }
        if (shorthandAssign >= 0) {
          this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
        }
        if (doubleProto >= 0) {
          this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
        }
      };
      pp$92.checkYieldAwaitInDefaultParams = function() {
        if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
          this.raise(this.yieldPos, "Yield expression cannot be a default value");
        }
        if (this.awaitPos) {
          this.raise(this.awaitPos, "Await expression cannot be a default value");
        }
      };
      pp$92.isSimpleAssignTarget = function(expr) {
        if (expr.type === "ParenthesizedExpression") {
          return this.isSimpleAssignTarget(expr.expression);
        }
        return expr.type === "Identifier" || expr.type === "MemberExpression";
      };
      var pp$82 = Parser3.prototype;
      pp$82.parseTopLevel = function(node2) {
        var exports3 = /* @__PURE__ */ Object.create(null);
        if (!node2.body) {
          node2.body = [];
        }
        while (this.type !== types$12.eof) {
          var stmt = this.parseStatement(null, true, exports3);
          node2.body.push(stmt);
        }
        if (this.inModule) {
          for (var i2 = 0, list4 = Object.keys(this.undefinedExports); i2 < list4.length; i2 += 1) {
            var name2 = list4[i2];
            this.raiseRecoverable(this.undefinedExports[name2].start, "Export '" + name2 + "' is not defined");
          }
        }
        this.adaptDirectivePrologue(node2.body);
        this.next();
        node2.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType;
        return this.finishNode(node2, "Program");
      };
      var loopLabel2 = { kind: "loop" }, switchLabel2 = { kind: "switch" };
      pp$82.isLet = function(context) {
        if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
          return false;
        }
        skipWhiteSpace2.lastIndex = this.pos;
        var skip = skipWhiteSpace2.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.fullCharCodeAt(next);
        if (nextCh === 91 || nextCh === 92) {
          return true;
        }
        if (context) {
          return false;
        }
        if (nextCh === 123) {
          return true;
        }
        if (isIdentifierStart2(nextCh)) {
          var start2 = next;
          do {
            next += nextCh <= 65535 ? 1 : 2;
          } while (isIdentifierChar2(nextCh = this.fullCharCodeAt(next)));
          if (nextCh === 92) {
            return true;
          }
          var ident = this.input.slice(start2, next);
          if (!keywordRelationalOperator2.test(ident)) {
            return true;
          }
        }
        return false;
      };
      pp$82.isAsyncFunction = function() {
        if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
          return false;
        }
        skipWhiteSpace2.lastIndex = this.pos;
        var skip = skipWhiteSpace2.exec(this.input);
        var next = this.pos + skip[0].length, after;
        return !lineBreak2.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar2(after = this.fullCharCodeAt(next + 8)) || after === 92));
      };
      pp$82.isUsingKeyword = function(isAwaitUsing, isFor) {
        if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using")) {
          return false;
        }
        skipWhiteSpace2.lastIndex = this.pos;
        var skip = skipWhiteSpace2.exec(this.input);
        var next = this.pos + skip[0].length;
        if (lineBreak2.test(this.input.slice(this.pos, next))) {
          return false;
        }
        if (isAwaitUsing) {
          var usingEndPos = next + 5, after;
          if (this.input.slice(next, usingEndPos) !== "using" || usingEndPos === this.input.length || isIdentifierChar2(after = this.fullCharCodeAt(usingEndPos)) || after === 92) {
            return false;
          }
          skipWhiteSpace2.lastIndex = usingEndPos;
          var skipAfterUsing = skipWhiteSpace2.exec(this.input);
          next = usingEndPos + skipAfterUsing[0].length;
          if (skipAfterUsing && lineBreak2.test(this.input.slice(usingEndPos, next))) {
            return false;
          }
        }
        var ch = this.fullCharCodeAt(next);
        if (!isIdentifierStart2(ch) && ch !== 92) {
          return false;
        }
        var idStart = next;
        do {
          next += ch <= 65535 ? 1 : 2;
        } while (isIdentifierChar2(ch = this.fullCharCodeAt(next)));
        if (ch === 92) {
          return true;
        }
        var id = this.input.slice(idStart, next);
        if (keywordRelationalOperator2.test(id) || isFor && id === "of") {
          return false;
        }
        return true;
      };
      pp$82.isAwaitUsing = function(isFor) {
        return this.isUsingKeyword(true, isFor);
      };
      pp$82.isUsing = function(isFor) {
        return this.isUsingKeyword(false, isFor);
      };
      pp$82.parseStatement = function(context, topLevel, exports3) {
        var starttype = this.type, node2 = this.startNode(), kind;
        if (this.isLet(context)) {
          starttype = types$12._var;
          kind = "let";
        }
        switch (starttype) {
          case types$12._break:
          case types$12._continue:
            return this.parseBreakContinueStatement(node2, starttype.keyword);
          case types$12._debugger:
            return this.parseDebuggerStatement(node2);
          case types$12._do:
            return this.parseDoStatement(node2);
          case types$12._for:
            return this.parseForStatement(node2);
          case types$12._function:
            if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
              this.unexpected();
            }
            return this.parseFunctionStatement(node2, false, !context);
          case types$12._class:
            if (context) {
              this.unexpected();
            }
            return this.parseClass(node2, true);
          case types$12._if:
            return this.parseIfStatement(node2);
          case types$12._return:
            return this.parseReturnStatement(node2);
          case types$12._switch:
            return this.parseSwitchStatement(node2);
          case types$12._throw:
            return this.parseThrowStatement(node2);
          case types$12._try:
            return this.parseTryStatement(node2);
          case types$12._const:
          case types$12._var:
            kind = kind || this.value;
            if (context && kind !== "var") {
              this.unexpected();
            }
            return this.parseVarStatement(node2, kind);
          case types$12._while:
            return this.parseWhileStatement(node2);
          case types$12._with:
            return this.parseWithStatement(node2);
          case types$12.braceL:
            return this.parseBlock(true, node2);
          case types$12.semi:
            return this.parseEmptyStatement(node2);
          case types$12._export:
          case types$12._import:
            if (this.options.ecmaVersion > 10 && starttype === types$12._import) {
              skipWhiteSpace2.lastIndex = this.pos;
              var skip = skipWhiteSpace2.exec(this.input);
              var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
              if (nextCh === 40 || nextCh === 46) {
                return this.parseExpressionStatement(node2, this.parseExpression());
              }
            }
            if (!this.options.allowImportExportEverywhere) {
              if (!topLevel) {
                this.raise(this.start, "'import' and 'export' may only appear at the top level");
              }
              if (!this.inModule) {
                this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
              }
            }
            return starttype === types$12._import ? this.parseImport(node2) : this.parseExport(node2, exports3);
          // If the statement does not start with a statement keyword or a
          // brace, it's an ExpressionStatement or LabeledStatement. We
          // simply start parsing an expression, and afterwards, if the
          // next token is a colon and the expression was a simple
          // Identifier node, we switch to interpreting it as a label.
          default:
            if (this.isAsyncFunction()) {
              if (context) {
                this.unexpected();
              }
              this.next();
              return this.parseFunctionStatement(node2, true, !context);
            }
            var usingKind = this.isAwaitUsing(false) ? "await using" : this.isUsing(false) ? "using" : null;
            if (usingKind) {
              if (!this.allowUsing) {
                this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement");
              }
              if (usingKind === "await using") {
                if (!this.canAwait) {
                  this.raise(this.start, "Await using cannot appear outside of async function");
                }
                this.next();
              }
              this.next();
              this.parseVar(node2, false, usingKind);
              this.semicolon();
              return this.finishNode(node2, "VariableDeclaration");
            }
            var maybeName = this.value, expr = this.parseExpression();
            if (starttype === types$12.name && expr.type === "Identifier" && this.eat(types$12.colon)) {
              return this.parseLabeledStatement(node2, maybeName, expr, context);
            } else {
              return this.parseExpressionStatement(node2, expr);
            }
        }
      };
      pp$82.parseBreakContinueStatement = function(node2, keyword) {
        var isBreak = keyword === "break";
        this.next();
        if (this.eat(types$12.semi) || this.insertSemicolon()) {
          node2.label = null;
        } else if (this.type !== types$12.name) {
          this.unexpected();
        } else {
          node2.label = this.parseIdent();
          this.semicolon();
        }
        var i2 = 0;
        for (; i2 < this.labels.length; ++i2) {
          var lab = this.labels[i2];
          if (node2.label == null || lab.name === node2.label.name) {
            if (lab.kind != null && (isBreak || lab.kind === "loop")) {
              break;
            }
            if (node2.label && isBreak) {
              break;
            }
          }
        }
        if (i2 === this.labels.length) {
          this.raise(node2.start, "Unsyntactic " + keyword);
        }
        return this.finishNode(node2, isBreak ? "BreakStatement" : "ContinueStatement");
      };
      pp$82.parseDebuggerStatement = function(node2) {
        this.next();
        this.semicolon();
        return this.finishNode(node2, "DebuggerStatement");
      };
      pp$82.parseDoStatement = function(node2) {
        this.next();
        this.labels.push(loopLabel2);
        node2.body = this.parseStatement("do");
        this.labels.pop();
        this.expect(types$12._while);
        node2.test = this.parseParenExpression();
        if (this.options.ecmaVersion >= 6) {
          this.eat(types$12.semi);
        } else {
          this.semicolon();
        }
        return this.finishNode(node2, "DoWhileStatement");
      };
      pp$82.parseForStatement = function(node2) {
        this.next();
        var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
        this.labels.push(loopLabel2);
        this.enterScope(0);
        this.expect(types$12.parenL);
        if (this.type === types$12.semi) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
          return this.parseFor(node2, null);
        }
        var isLet = this.isLet();
        if (this.type === types$12._var || this.type === types$12._const || isLet) {
          var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
          this.next();
          this.parseVar(init$1, true, kind);
          this.finishNode(init$1, "VariableDeclaration");
          return this.parseForAfterInit(node2, init$1, awaitAt);
        }
        var startsWithLet = this.isContextual("let"), isForOf = false;
        var usingKind = this.isUsing(true) ? "using" : this.isAwaitUsing(true) ? "await using" : null;
        if (usingKind) {
          var init$2 = this.startNode();
          this.next();
          if (usingKind === "await using") {
            if (!this.canAwait) {
              this.raise(this.start, "Await using cannot appear outside of async function");
            }
            this.next();
          }
          this.parseVar(init$2, true, usingKind);
          this.finishNode(init$2, "VariableDeclaration");
          return this.parseForAfterInit(node2, init$2, awaitAt);
        }
        var containsEsc = this.containsEsc;
        var refDestructuringErrors = new DestructuringErrors3();
        var initPos = this.start;
        var init = awaitAt > -1 ? this.parseExprSubscripts(refDestructuringErrors, "await") : this.parseExpression(true, refDestructuringErrors);
        if (this.type === types$12._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
          if (awaitAt > -1) {
            if (this.type === types$12._in) {
              this.unexpected(awaitAt);
            }
            node2.await = true;
          } else if (isForOf && this.options.ecmaVersion >= 8) {
            if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") {
              this.unexpected();
            } else if (this.options.ecmaVersion >= 9) {
              node2.await = false;
            }
          }
          if (startsWithLet && isForOf) {
            this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
          }
          this.toAssignable(init, false, refDestructuringErrors);
          this.checkLValPattern(init);
          return this.parseForIn(node2, init);
        } else {
          this.checkExpressionErrors(refDestructuringErrors, true);
        }
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
        return this.parseFor(node2, init);
      };
      pp$82.parseForAfterInit = function(node2, init, awaitAt) {
        if ((this.type === types$12._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init.declarations.length === 1) {
          if (this.options.ecmaVersion >= 9) {
            if (this.type === types$12._in) {
              if (awaitAt > -1) {
                this.unexpected(awaitAt);
              }
            } else {
              node2.await = awaitAt > -1;
            }
          }
          return this.parseForIn(node2, init);
        }
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
        return this.parseFor(node2, init);
      };
      pp$82.parseFunctionStatement = function(node2, isAsync, declarationPosition) {
        this.next();
        return this.parseFunction(node2, FUNC_STATEMENT2 | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT2), false, isAsync);
      };
      pp$82.parseIfStatement = function(node2) {
        this.next();
        node2.test = this.parseParenExpression();
        node2.consequent = this.parseStatement("if");
        node2.alternate = this.eat(types$12._else) ? this.parseStatement("if") : null;
        return this.finishNode(node2, "IfStatement");
      };
      pp$82.parseReturnStatement = function(node2) {
        if (!this.allowReturn) {
          this.raise(this.start, "'return' outside of function");
        }
        this.next();
        if (this.eat(types$12.semi) || this.insertSemicolon()) {
          node2.argument = null;
        } else {
          node2.argument = this.parseExpression();
          this.semicolon();
        }
        return this.finishNode(node2, "ReturnStatement");
      };
      pp$82.parseSwitchStatement = function(node2) {
        this.next();
        node2.discriminant = this.parseParenExpression();
        node2.cases = [];
        this.expect(types$12.braceL);
        this.labels.push(switchLabel2);
        this.enterScope(SCOPE_SWITCH2);
        var cur;
        for (var sawDefault = false; this.type !== types$12.braceR; ) {
          if (this.type === types$12._case || this.type === types$12._default) {
            var isCase = this.type === types$12._case;
            if (cur) {
              this.finishNode(cur, "SwitchCase");
            }
            node2.cases.push(cur = this.startNode());
            cur.consequent = [];
            this.next();
            if (isCase) {
              cur.test = this.parseExpression();
            } else {
              if (sawDefault) {
                this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
              }
              sawDefault = true;
              cur.test = null;
            }
            this.expect(types$12.colon);
          } else {
            if (!cur) {
              this.unexpected();
            }
            cur.consequent.push(this.parseStatement(null));
          }
        }
        this.exitScope();
        if (cur) {
          this.finishNode(cur, "SwitchCase");
        }
        this.next();
        this.labels.pop();
        return this.finishNode(node2, "SwitchStatement");
      };
      pp$82.parseThrowStatement = function(node2) {
        this.next();
        if (lineBreak2.test(this.input.slice(this.lastTokEnd, this.start))) {
          this.raise(this.lastTokEnd, "Illegal newline after throw");
        }
        node2.argument = this.parseExpression();
        this.semicolon();
        return this.finishNode(node2, "ThrowStatement");
      };
      var empty$12 = [];
      pp$82.parseCatchClauseParam = function() {
        var param = this.parseBindingAtom();
        var simple = param.type === "Identifier";
        this.enterScope(simple ? SCOPE_SIMPLE_CATCH2 : 0);
        this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH2 : BIND_LEXICAL2);
        this.expect(types$12.parenR);
        return param;
      };
      pp$82.parseTryStatement = function(node2) {
        this.next();
        node2.block = this.parseBlock();
        node2.handler = null;
        if (this.type === types$12._catch) {
          var clause = this.startNode();
          this.next();
          if (this.eat(types$12.parenL)) {
            clause.param = this.parseCatchClauseParam();
          } else {
            if (this.options.ecmaVersion < 10) {
              this.unexpected();
            }
            clause.param = null;
            this.enterScope(0);
          }
          clause.body = this.parseBlock(false);
          this.exitScope();
          node2.handler = this.finishNode(clause, "CatchClause");
        }
        node2.finalizer = this.eat(types$12._finally) ? this.parseBlock() : null;
        if (!node2.handler && !node2.finalizer) {
          this.raise(node2.start, "Missing catch or finally clause");
        }
        return this.finishNode(node2, "TryStatement");
      };
      pp$82.parseVarStatement = function(node2, kind, allowMissingInitializer) {
        this.next();
        this.parseVar(node2, false, kind, allowMissingInitializer);
        this.semicolon();
        return this.finishNode(node2, "VariableDeclaration");
      };
      pp$82.parseWhileStatement = function(node2) {
        this.next();
        node2.test = this.parseParenExpression();
        this.labels.push(loopLabel2);
        node2.body = this.parseStatement("while");
        this.labels.pop();
        return this.finishNode(node2, "WhileStatement");
      };
      pp$82.parseWithStatement = function(node2) {
        if (this.strict) {
          this.raise(this.start, "'with' in strict mode");
        }
        this.next();
        node2.object = this.parseParenExpression();
        node2.body = this.parseStatement("with");
        return this.finishNode(node2, "WithStatement");
      };
      pp$82.parseEmptyStatement = function(node2) {
        this.next();
        return this.finishNode(node2, "EmptyStatement");
      };
      pp$82.parseLabeledStatement = function(node2, maybeName, expr, context) {
        for (var i$1 = 0, list4 = this.labels; i$1 < list4.length; i$1 += 1) {
          var label = list4[i$1];
          if (label.name === maybeName) {
            this.raise(expr.start, "Label '" + maybeName + "' is already declared");
          }
        }
        var kind = this.type.isLoop ? "loop" : this.type === types$12._switch ? "switch" : null;
        for (var i2 = this.labels.length - 1; i2 >= 0; i2--) {
          var label$1 = this.labels[i2];
          if (label$1.statementStart === node2.start) {
            label$1.statementStart = this.start;
            label$1.kind = kind;
          } else {
            break;
          }
        }
        this.labels.push({ name: maybeName, kind, statementStart: this.start });
        node2.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
        this.labels.pop();
        node2.label = expr;
        return this.finishNode(node2, "LabeledStatement");
      };
      pp$82.parseExpressionStatement = function(node2, expr) {
        node2.expression = expr;
        this.semicolon();
        return this.finishNode(node2, "ExpressionStatement");
      };
      pp$82.parseBlock = function(createNewLexicalScope, node2, exitStrict) {
        if (createNewLexicalScope === void 0) createNewLexicalScope = true;
        if (node2 === void 0) node2 = this.startNode();
        node2.body = [];
        this.expect(types$12.braceL);
        if (createNewLexicalScope) {
          this.enterScope(0);
        }
        while (this.type !== types$12.braceR) {
          var stmt = this.parseStatement(null);
          node2.body.push(stmt);
        }
        if (exitStrict) {
          this.strict = false;
        }
        this.next();
        if (createNewLexicalScope) {
          this.exitScope();
        }
        return this.finishNode(node2, "BlockStatement");
      };
      pp$82.parseFor = function(node2, init) {
        node2.init = init;
        this.expect(types$12.semi);
        node2.test = this.type === types$12.semi ? null : this.parseExpression();
        this.expect(types$12.semi);
        node2.update = this.type === types$12.parenR ? null : this.parseExpression();
        this.expect(types$12.parenR);
        node2.body = this.parseStatement("for");
        this.exitScope();
        this.labels.pop();
        return this.finishNode(node2, "ForStatement");
      };
      pp$82.parseForIn = function(node2, init) {
        var isForIn = this.type === types$12._in;
        this.next();
        if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
          this.raise(
            init.start,
            (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
          );
        }
        node2.left = init;
        node2.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
        this.expect(types$12.parenR);
        node2.body = this.parseStatement("for");
        this.exitScope();
        this.labels.pop();
        return this.finishNode(node2, isForIn ? "ForInStatement" : "ForOfStatement");
      };
      pp$82.parseVar = function(node2, isFor, kind, allowMissingInitializer) {
        node2.declarations = [];
        node2.kind = kind;
        for (; ; ) {
          var decl = this.startNode();
          this.parseVarId(decl, kind);
          if (this.eat(types$12.eq)) {
            decl.init = this.parseMaybeAssign(isFor);
          } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$12._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
            this.unexpected();
          } else if (!allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$12._in && !this.isContextual("of")) {
            this.raise(this.lastTokEnd, "Missing initializer in " + kind + " declaration");
          } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$12._in || this.isContextual("of")))) {
            this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
          } else {
            decl.init = null;
          }
          node2.declarations.push(this.finishNode(decl, "VariableDeclarator"));
          if (!this.eat(types$12.comma)) {
            break;
          }
        }
        return node2;
      };
      pp$82.parseVarId = function(decl, kind) {
        decl.id = kind === "using" || kind === "await using" ? this.parseIdent() : this.parseBindingAtom();
        this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR2 : BIND_LEXICAL2, false);
      };
      var FUNC_STATEMENT2 = 1, FUNC_HANGING_STATEMENT2 = 2, FUNC_NULLABLE_ID2 = 4;
      pp$82.parseFunction = function(node2, statement, allowExpressionBody, isAsync, forInit) {
        this.initFunction(node2);
        if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
          if (this.type === types$12.star && statement & FUNC_HANGING_STATEMENT2) {
            this.unexpected();
          }
          node2.generator = this.eat(types$12.star);
        }
        if (this.options.ecmaVersion >= 8) {
          node2.async = !!isAsync;
        }
        if (statement & FUNC_STATEMENT2) {
          node2.id = statement & FUNC_NULLABLE_ID2 && this.type !== types$12.name ? null : this.parseIdent();
          if (node2.id && !(statement & FUNC_HANGING_STATEMENT2)) {
            this.checkLValSimple(node2.id, this.strict || node2.generator || node2.async ? this.treatFunctionsAsVar ? BIND_VAR2 : BIND_LEXICAL2 : BIND_FUNCTION2);
          }
        }
        var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.enterScope(functionFlags2(node2.async, node2.generator));
        if (!(statement & FUNC_STATEMENT2)) {
          node2.id = this.type === types$12.name ? this.parseIdent() : null;
        }
        this.parseFunctionParams(node2);
        this.parseFunctionBody(node2, allowExpressionBody, false, forInit);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.finishNode(node2, statement & FUNC_STATEMENT2 ? "FunctionDeclaration" : "FunctionExpression");
      };
      pp$82.parseFunctionParams = function(node2) {
        this.expect(types$12.parenL);
        node2.params = this.parseBindingList(types$12.parenR, false, this.options.ecmaVersion >= 8);
        this.checkYieldAwaitInDefaultParams();
      };
      pp$82.parseClass = function(node2, isStatement) {
        this.next();
        var oldStrict = this.strict;
        this.strict = true;
        this.parseClassId(node2, isStatement);
        this.parseClassSuper(node2);
        var privateNameMap = this.enterClassBody();
        var classBody = this.startNode();
        var hadConstructor = false;
        classBody.body = [];
        this.expect(types$12.braceL);
        while (this.type !== types$12.braceR) {
          var element = this.parseClassElement(node2.superClass !== null);
          if (element) {
            classBody.body.push(element);
            if (element.type === "MethodDefinition" && element.kind === "constructor") {
              if (hadConstructor) {
                this.raiseRecoverable(element.start, "Duplicate constructor in the same class");
              }
              hadConstructor = true;
            } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted2(privateNameMap, element)) {
              this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
            }
          }
        }
        this.strict = oldStrict;
        this.next();
        node2.body = this.finishNode(classBody, "ClassBody");
        this.exitClassBody();
        return this.finishNode(node2, isStatement ? "ClassDeclaration" : "ClassExpression");
      };
      pp$82.parseClassElement = function(constructorAllowsSuper) {
        if (this.eat(types$12.semi)) {
          return null;
        }
        var ecmaVersion2 = this.options.ecmaVersion;
        var node2 = this.startNode();
        var keyName = "";
        var isGenerator = false;
        var isAsync = false;
        var kind = "method";
        var isStatic = false;
        if (this.eatContextual("static")) {
          if (ecmaVersion2 >= 13 && this.eat(types$12.braceL)) {
            this.parseClassStaticBlock(node2);
            return node2;
          }
          if (this.isClassElementNameStart() || this.type === types$12.star) {
            isStatic = true;
          } else {
            keyName = "static";
          }
        }
        node2.static = isStatic;
        if (!keyName && ecmaVersion2 >= 8 && this.eatContextual("async")) {
          if ((this.isClassElementNameStart() || this.type === types$12.star) && !this.canInsertSemicolon()) {
            isAsync = true;
          } else {
            keyName = "async";
          }
        }
        if (!keyName && (ecmaVersion2 >= 9 || !isAsync) && this.eat(types$12.star)) {
          isGenerator = true;
        }
        if (!keyName && !isAsync && !isGenerator) {
          var lastValue = this.value;
          if (this.eatContextual("get") || this.eatContextual("set")) {
            if (this.isClassElementNameStart()) {
              kind = lastValue;
            } else {
              keyName = lastValue;
            }
          }
        }
        if (keyName) {
          node2.computed = false;
          node2.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
          node2.key.name = keyName;
          this.finishNode(node2.key, "Identifier");
        } else {
          this.parseClassElementName(node2);
        }
        if (ecmaVersion2 < 13 || this.type === types$12.parenL || kind !== "method" || isGenerator || isAsync) {
          var isConstructor = !node2.static && checkKeyName2(node2, "constructor");
          var allowsDirectSuper = isConstructor && constructorAllowsSuper;
          if (isConstructor && kind !== "method") {
            this.raise(node2.key.start, "Constructor can't have get/set modifier");
          }
          node2.kind = isConstructor ? "constructor" : kind;
          this.parseClassMethod(node2, isGenerator, isAsync, allowsDirectSuper);
        } else {
          this.parseClassField(node2);
        }
        return node2;
      };
      pp$82.isClassElementNameStart = function() {
        return this.type === types$12.name || this.type === types$12.privateId || this.type === types$12.num || this.type === types$12.string || this.type === types$12.bracketL || this.type.keyword;
      };
      pp$82.parseClassElementName = function(element) {
        if (this.type === types$12.privateId) {
          if (this.value === "constructor") {
            this.raise(this.start, "Classes can't have an element named '#constructor'");
          }
          element.computed = false;
          element.key = this.parsePrivateIdent();
        } else {
          this.parsePropertyName(element);
        }
      };
      pp$82.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
        var key = method.key;
        if (method.kind === "constructor") {
          if (isGenerator) {
            this.raise(key.start, "Constructor can't be a generator");
          }
          if (isAsync) {
            this.raise(key.start, "Constructor can't be an async method");
          }
        } else if (method.static && checkKeyName2(method, "prototype")) {
          this.raise(key.start, "Classes may not have a static property named prototype");
        }
        var value2 = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
        if (method.kind === "get" && value2.params.length !== 0) {
          this.raiseRecoverable(value2.start, "getter should have no params");
        }
        if (method.kind === "set" && value2.params.length !== 1) {
          this.raiseRecoverable(value2.start, "setter should have exactly one param");
        }
        if (method.kind === "set" && value2.params[0].type === "RestElement") {
          this.raiseRecoverable(value2.params[0].start, "Setter cannot use rest params");
        }
        return this.finishNode(method, "MethodDefinition");
      };
      pp$82.parseClassField = function(field) {
        if (checkKeyName2(field, "constructor")) {
          this.raise(field.key.start, "Classes can't have a field named 'constructor'");
        } else if (field.static && checkKeyName2(field, "prototype")) {
          this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
        }
        if (this.eat(types$12.eq)) {
          this.enterScope(SCOPE_CLASS_FIELD_INIT2 | SCOPE_SUPER2);
          field.value = this.parseMaybeAssign();
          this.exitScope();
        } else {
          field.value = null;
        }
        this.semicolon();
        return this.finishNode(field, "PropertyDefinition");
      };
      pp$82.parseClassStaticBlock = function(node2) {
        node2.body = [];
        var oldLabels = this.labels;
        this.labels = [];
        this.enterScope(SCOPE_CLASS_STATIC_BLOCK2 | SCOPE_SUPER2);
        while (this.type !== types$12.braceR) {
          var stmt = this.parseStatement(null);
          node2.body.push(stmt);
        }
        this.next();
        this.exitScope();
        this.labels = oldLabels;
        return this.finishNode(node2, "StaticBlock");
      };
      pp$82.parseClassId = function(node2, isStatement) {
        if (this.type === types$12.name) {
          node2.id = this.parseIdent();
          if (isStatement) {
            this.checkLValSimple(node2.id, BIND_LEXICAL2, false);
          }
        } else {
          if (isStatement === true) {
            this.unexpected();
          }
          node2.id = null;
        }
      };
      pp$82.parseClassSuper = function(node2) {
        node2.superClass = this.eat(types$12._extends) ? this.parseExprSubscripts(null, false) : null;
      };
      pp$82.enterClassBody = function() {
        var element = { declared: /* @__PURE__ */ Object.create(null), used: [] };
        this.privateNameStack.push(element);
        return element.declared;
      };
      pp$82.exitClassBody = function() {
        var ref3 = this.privateNameStack.pop();
        var declared = ref3.declared;
        var used = ref3.used;
        if (!this.options.checkPrivateFields) {
          return;
        }
        var len = this.privateNameStack.length;
        var parent = len === 0 ? null : this.privateNameStack[len - 1];
        for (var i2 = 0; i2 < used.length; ++i2) {
          var id = used[i2];
          if (!hasOwn2(declared, id.name)) {
            if (parent) {
              parent.used.push(id);
            } else {
              this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
            }
          }
        }
      };
      function isPrivateNameConflicted2(privateNameMap, element) {
        var name2 = element.key.name;
        var curr = privateNameMap[name2];
        var next = "true";
        if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
          next = (element.static ? "s" : "i") + element.kind;
        }
        if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
          privateNameMap[name2] = "true";
          return false;
        } else if (!curr) {
          privateNameMap[name2] = next;
          return false;
        } else {
          return true;
        }
      }
      function checkKeyName2(node2, name2) {
        var computed = node2.computed;
        var key = node2.key;
        return !computed && (key.type === "Identifier" && key.name === name2 || key.type === "Literal" && key.value === name2);
      }
      pp$82.parseExportAllDeclaration = function(node2, exports3) {
        if (this.options.ecmaVersion >= 11) {
          if (this.eatContextual("as")) {
            node2.exported = this.parseModuleExportName();
            this.checkExport(exports3, node2.exported, this.lastTokStart);
          } else {
            node2.exported = null;
          }
        }
        this.expectContextual("from");
        if (this.type !== types$12.string) {
          this.unexpected();
        }
        node2.source = this.parseExprAtom();
        if (this.options.ecmaVersion >= 16) {
          node2.attributes = this.parseWithClause();
        }
        this.semicolon();
        return this.finishNode(node2, "ExportAllDeclaration");
      };
      pp$82.parseExport = function(node2, exports3) {
        this.next();
        if (this.eat(types$12.star)) {
          return this.parseExportAllDeclaration(node2, exports3);
        }
        if (this.eat(types$12._default)) {
          this.checkExport(exports3, "default", this.lastTokStart);
          node2.declaration = this.parseExportDefaultDeclaration();
          return this.finishNode(node2, "ExportDefaultDeclaration");
        }
        if (this.shouldParseExportStatement()) {
          node2.declaration = this.parseExportDeclaration(node2);
          if (node2.declaration.type === "VariableDeclaration") {
            this.checkVariableExport(exports3, node2.declaration.declarations);
          } else {
            this.checkExport(exports3, node2.declaration.id, node2.declaration.id.start);
          }
          node2.specifiers = [];
          node2.source = null;
          if (this.options.ecmaVersion >= 16) {
            node2.attributes = [];
          }
        } else {
          node2.declaration = null;
          node2.specifiers = this.parseExportSpecifiers(exports3);
          if (this.eatContextual("from")) {
            if (this.type !== types$12.string) {
              this.unexpected();
            }
            node2.source = this.parseExprAtom();
            if (this.options.ecmaVersion >= 16) {
              node2.attributes = this.parseWithClause();
            }
          } else {
            for (var i2 = 0, list4 = node2.specifiers; i2 < list4.length; i2 += 1) {
              var spec = list4[i2];
              this.checkUnreserved(spec.local);
              this.checkLocalExport(spec.local);
              if (spec.local.type === "Literal") {
                this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
              }
            }
            node2.source = null;
            if (this.options.ecmaVersion >= 16) {
              node2.attributes = [];
            }
          }
          this.semicolon();
        }
        return this.finishNode(node2, "ExportNamedDeclaration");
      };
      pp$82.parseExportDeclaration = function(node2) {
        return this.parseStatement(null);
      };
      pp$82.parseExportDefaultDeclaration = function() {
        var isAsync;
        if (this.type === types$12._function || (isAsync = this.isAsyncFunction())) {
          var fNode = this.startNode();
          this.next();
          if (isAsync) {
            this.next();
          }
          return this.parseFunction(fNode, FUNC_STATEMENT2 | FUNC_NULLABLE_ID2, false, isAsync);
        } else if (this.type === types$12._class) {
          var cNode = this.startNode();
          return this.parseClass(cNode, "nullableID");
        } else {
          var declaration = this.parseMaybeAssign();
          this.semicolon();
          return declaration;
        }
      };
      pp$82.checkExport = function(exports3, name2, pos) {
        if (!exports3) {
          return;
        }
        if (typeof name2 !== "string") {
          name2 = name2.type === "Identifier" ? name2.name : name2.value;
        }
        if (hasOwn2(exports3, name2)) {
          this.raiseRecoverable(pos, "Duplicate export '" + name2 + "'");
        }
        exports3[name2] = true;
      };
      pp$82.checkPatternExport = function(exports3, pat) {
        var type = pat.type;
        if (type === "Identifier") {
          this.checkExport(exports3, pat, pat.start);
        } else if (type === "ObjectPattern") {
          for (var i2 = 0, list4 = pat.properties; i2 < list4.length; i2 += 1) {
            var prop = list4[i2];
            this.checkPatternExport(exports3, prop);
          }
        } else if (type === "ArrayPattern") {
          for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
            var elt = list$1[i$1];
            if (elt) {
              this.checkPatternExport(exports3, elt);
            }
          }
        } else if (type === "Property") {
          this.checkPatternExport(exports3, pat.value);
        } else if (type === "AssignmentPattern") {
          this.checkPatternExport(exports3, pat.left);
        } else if (type === "RestElement") {
          this.checkPatternExport(exports3, pat.argument);
        }
      };
      pp$82.checkVariableExport = function(exports3, decls) {
        if (!exports3) {
          return;
        }
        for (var i2 = 0, list4 = decls; i2 < list4.length; i2 += 1) {
          var decl = list4[i2];
          this.checkPatternExport(exports3, decl.id);
        }
      };
      pp$82.shouldParseExportStatement = function() {
        return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
      };
      pp$82.parseExportSpecifier = function(exports3) {
        var node2 = this.startNode();
        node2.local = this.parseModuleExportName();
        node2.exported = this.eatContextual("as") ? this.parseModuleExportName() : node2.local;
        this.checkExport(
          exports3,
          node2.exported,
          node2.exported.start
        );
        return this.finishNode(node2, "ExportSpecifier");
      };
      pp$82.parseExportSpecifiers = function(exports3) {
        var nodes = [], first = true;
        this.expect(types$12.braceL);
        while (!this.eat(types$12.braceR)) {
          if (!first) {
            this.expect(types$12.comma);
            if (this.afterTrailingComma(types$12.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          nodes.push(this.parseExportSpecifier(exports3));
        }
        return nodes;
      };
      pp$82.parseImport = function(node2) {
        this.next();
        if (this.type === types$12.string) {
          node2.specifiers = empty$12;
          node2.source = this.parseExprAtom();
        } else {
          node2.specifiers = this.parseImportSpecifiers();
          this.expectContextual("from");
          node2.source = this.type === types$12.string ? this.parseExprAtom() : this.unexpected();
        }
        if (this.options.ecmaVersion >= 16) {
          node2.attributes = this.parseWithClause();
        }
        this.semicolon();
        return this.finishNode(node2, "ImportDeclaration");
      };
      pp$82.parseImportSpecifier = function() {
        var node2 = this.startNode();
        node2.imported = this.parseModuleExportName();
        if (this.eatContextual("as")) {
          node2.local = this.parseIdent();
        } else {
          this.checkUnreserved(node2.imported);
          node2.local = node2.imported;
        }
        this.checkLValSimple(node2.local, BIND_LEXICAL2);
        return this.finishNode(node2, "ImportSpecifier");
      };
      pp$82.parseImportDefaultSpecifier = function() {
        var node2 = this.startNode();
        node2.local = this.parseIdent();
        this.checkLValSimple(node2.local, BIND_LEXICAL2);
        return this.finishNode(node2, "ImportDefaultSpecifier");
      };
      pp$82.parseImportNamespaceSpecifier = function() {
        var node2 = this.startNode();
        this.next();
        this.expectContextual("as");
        node2.local = this.parseIdent();
        this.checkLValSimple(node2.local, BIND_LEXICAL2);
        return this.finishNode(node2, "ImportNamespaceSpecifier");
      };
      pp$82.parseImportSpecifiers = function() {
        var nodes = [], first = true;
        if (this.type === types$12.name) {
          nodes.push(this.parseImportDefaultSpecifier());
          if (!this.eat(types$12.comma)) {
            return nodes;
          }
        }
        if (this.type === types$12.star) {
          nodes.push(this.parseImportNamespaceSpecifier());
          return nodes;
        }
        this.expect(types$12.braceL);
        while (!this.eat(types$12.braceR)) {
          if (!first) {
            this.expect(types$12.comma);
            if (this.afterTrailingComma(types$12.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          nodes.push(this.parseImportSpecifier());
        }
        return nodes;
      };
      pp$82.parseWithClause = function() {
        var nodes = [];
        if (!this.eat(types$12._with)) {
          return nodes;
        }
        this.expect(types$12.braceL);
        var attributeKeys = {};
        var first = true;
        while (!this.eat(types$12.braceR)) {
          if (!first) {
            this.expect(types$12.comma);
            if (this.afterTrailingComma(types$12.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          var attr = this.parseImportAttribute();
          var keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
          if (hasOwn2(attributeKeys, keyName)) {
            this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'");
          }
          attributeKeys[keyName] = true;
          nodes.push(attr);
        }
        return nodes;
      };
      pp$82.parseImportAttribute = function() {
        var node2 = this.startNode();
        node2.key = this.type === types$12.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
        this.expect(types$12.colon);
        if (this.type !== types$12.string) {
          this.unexpected();
        }
        node2.value = this.parseExprAtom();
        return this.finishNode(node2, "ImportAttribute");
      };
      pp$82.parseModuleExportName = function() {
        if (this.options.ecmaVersion >= 13 && this.type === types$12.string) {
          var stringLiteral = this.parseLiteral(this.value);
          if (loneSurrogate2.test(stringLiteral.value)) {
            this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
          }
          return stringLiteral;
        }
        return this.parseIdent(true);
      };
      pp$82.adaptDirectivePrologue = function(statements) {
        for (var i2 = 0; i2 < statements.length && this.isDirectiveCandidate(statements[i2]); ++i2) {
          statements[i2].directive = statements[i2].expression.raw.slice(1, -1);
        }
      };
      pp$82.isDirectiveCandidate = function(statement) {
        return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && // Reject parenthesized strings.
        (this.input[statement.start] === '"' || this.input[statement.start] === "'");
      };
      var pp$72 = Parser3.prototype;
      pp$72.toAssignable = function(node2, isBinding, refDestructuringErrors) {
        if (this.options.ecmaVersion >= 6 && node2) {
          switch (node2.type) {
            case "Identifier":
              if (this.inAsync && node2.name === "await") {
                this.raise(node2.start, "Cannot use 'await' as identifier inside an async function");
              }
              break;
            case "ObjectPattern":
            case "ArrayPattern":
            case "AssignmentPattern":
            case "RestElement":
              break;
            case "ObjectExpression":
              node2.type = "ObjectPattern";
              if (refDestructuringErrors) {
                this.checkPatternErrors(refDestructuringErrors, true);
              }
              for (var i2 = 0, list4 = node2.properties; i2 < list4.length; i2 += 1) {
                var prop = list4[i2];
                this.toAssignable(prop, isBinding);
                if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
                  this.raise(prop.argument.start, "Unexpected token");
                }
              }
              break;
            case "Property":
              if (node2.kind !== "init") {
                this.raise(node2.key.start, "Object pattern can't contain getter or setter");
              }
              this.toAssignable(node2.value, isBinding);
              break;
            case "ArrayExpression":
              node2.type = "ArrayPattern";
              if (refDestructuringErrors) {
                this.checkPatternErrors(refDestructuringErrors, true);
              }
              this.toAssignableList(node2.elements, isBinding);
              break;
            case "SpreadElement":
              node2.type = "RestElement";
              this.toAssignable(node2.argument, isBinding);
              if (node2.argument.type === "AssignmentPattern") {
                this.raise(node2.argument.start, "Rest elements cannot have a default value");
              }
              break;
            case "AssignmentExpression":
              if (node2.operator !== "=") {
                this.raise(node2.left.end, "Only '=' operator can be used for specifying default value.");
              }
              node2.type = "AssignmentPattern";
              delete node2.operator;
              this.toAssignable(node2.left, isBinding);
              break;
            case "ParenthesizedExpression":
              this.toAssignable(node2.expression, isBinding, refDestructuringErrors);
              break;
            case "ChainExpression":
              this.raiseRecoverable(node2.start, "Optional chaining cannot appear in left-hand side");
              break;
            case "MemberExpression":
              if (!isBinding) {
                break;
              }
            default:
              this.raise(node2.start, "Assigning to rvalue");
          }
        } else if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        return node2;
      };
      pp$72.toAssignableList = function(exprList, isBinding) {
        var end = exprList.length;
        for (var i2 = 0; i2 < end; i2++) {
          var elt = exprList[i2];
          if (elt) {
            this.toAssignable(elt, isBinding);
          }
        }
        if (end) {
          var last = exprList[end - 1];
          if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
            this.unexpected(last.argument.start);
          }
        }
        return exprList;
      };
      pp$72.parseSpread = function(refDestructuringErrors) {
        var node2 = this.startNode();
        this.next();
        node2.argument = this.parseMaybeAssign(false, refDestructuringErrors);
        return this.finishNode(node2, "SpreadElement");
      };
      pp$72.parseRestBinding = function() {
        var node2 = this.startNode();
        this.next();
        if (this.options.ecmaVersion === 6 && this.type !== types$12.name) {
          this.unexpected();
        }
        node2.argument = this.parseBindingAtom();
        return this.finishNode(node2, "RestElement");
      };
      pp$72.parseBindingAtom = function() {
        if (this.options.ecmaVersion >= 6) {
          switch (this.type) {
            case types$12.bracketL:
              var node2 = this.startNode();
              this.next();
              node2.elements = this.parseBindingList(types$12.bracketR, true, true);
              return this.finishNode(node2, "ArrayPattern");
            case types$12.braceL:
              return this.parseObj(true);
          }
        }
        return this.parseIdent();
      };
      pp$72.parseBindingList = function(close2, allowEmpty, allowTrailingComma, allowModifiers) {
        var elts = [], first = true;
        while (!this.eat(close2)) {
          if (first) {
            first = false;
          } else {
            this.expect(types$12.comma);
          }
          if (allowEmpty && this.type === types$12.comma) {
            elts.push(null);
          } else if (allowTrailingComma && this.afterTrailingComma(close2)) {
            break;
          } else if (this.type === types$12.ellipsis) {
            var rest = this.parseRestBinding();
            this.parseBindingListItem(rest);
            elts.push(rest);
            if (this.type === types$12.comma) {
              this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
            }
            this.expect(close2);
            break;
          } else {
            elts.push(this.parseAssignableListItem(allowModifiers));
          }
        }
        return elts;
      };
      pp$72.parseAssignableListItem = function(allowModifiers) {
        var elem = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(elem);
        return elem;
      };
      pp$72.parseBindingListItem = function(param) {
        return param;
      };
      pp$72.parseMaybeDefault = function(startPos, startLoc, left) {
        left = left || this.parseBindingAtom();
        if (this.options.ecmaVersion < 6 || !this.eat(types$12.eq)) {
          return left;
        }
        var node2 = this.startNodeAt(startPos, startLoc);
        node2.left = left;
        node2.right = this.parseMaybeAssign();
        return this.finishNode(node2, "AssignmentPattern");
      };
      pp$72.checkLValSimple = function(expr, bindingType, checkClashes) {
        if (bindingType === void 0) bindingType = BIND_NONE2;
        var isBind = bindingType !== BIND_NONE2;
        switch (expr.type) {
          case "Identifier":
            if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
              this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
            }
            if (isBind) {
              if (bindingType === BIND_LEXICAL2 && expr.name === "let") {
                this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
              }
              if (checkClashes) {
                if (hasOwn2(checkClashes, expr.name)) {
                  this.raiseRecoverable(expr.start, "Argument name clash");
                }
                checkClashes[expr.name] = true;
              }
              if (bindingType !== BIND_OUTSIDE2) {
                this.declareName(expr.name, bindingType, expr.start);
              }
            }
            break;
          case "ChainExpression":
            this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
            break;
          case "MemberExpression":
            if (isBind) {
              this.raiseRecoverable(expr.start, "Binding member expression");
            }
            break;
          case "ParenthesizedExpression":
            if (isBind) {
              this.raiseRecoverable(expr.start, "Binding parenthesized expression");
            }
            return this.checkLValSimple(expr.expression, bindingType, checkClashes);
          default:
            this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
        }
      };
      pp$72.checkLValPattern = function(expr, bindingType, checkClashes) {
        if (bindingType === void 0) bindingType = BIND_NONE2;
        switch (expr.type) {
          case "ObjectPattern":
            for (var i2 = 0, list4 = expr.properties; i2 < list4.length; i2 += 1) {
              var prop = list4[i2];
              this.checkLValInnerPattern(prop, bindingType, checkClashes);
            }
            break;
          case "ArrayPattern":
            for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
              var elem = list$1[i$1];
              if (elem) {
                this.checkLValInnerPattern(elem, bindingType, checkClashes);
              }
            }
            break;
          default:
            this.checkLValSimple(expr, bindingType, checkClashes);
        }
      };
      pp$72.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
        if (bindingType === void 0) bindingType = BIND_NONE2;
        switch (expr.type) {
          case "Property":
            this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
            break;
          case "AssignmentPattern":
            this.checkLValPattern(expr.left, bindingType, checkClashes);
            break;
          case "RestElement":
            this.checkLValPattern(expr.argument, bindingType, checkClashes);
            break;
          default:
            this.checkLValPattern(expr, bindingType, checkClashes);
        }
      };
      var TokContext3 = function TokContext4(token, isExpr, preserveSpace, override, generator) {
        this.token = token;
        this.isExpr = !!isExpr;
        this.preserveSpace = !!preserveSpace;
        this.override = override;
        this.generator = !!generator;
      };
      var types2 = {
        b_stat: new TokContext3("{", false),
        b_expr: new TokContext3("{", true),
        b_tmpl: new TokContext3("${", false),
        p_stat: new TokContext3("(", false),
        p_expr: new TokContext3("(", true),
        q_tmpl: new TokContext3("`", true, true, function(p) {
          return p.tryReadTemplateToken();
        }),
        f_stat: new TokContext3("function", false),
        f_expr: new TokContext3("function", true),
        f_expr_gen: new TokContext3("function", true, false, null, true),
        f_gen: new TokContext3("function", false, false, null, true)
      };
      var pp$62 = Parser3.prototype;
      pp$62.initialContext = function() {
        return [types2.b_stat];
      };
      pp$62.curContext = function() {
        return this.context[this.context.length - 1];
      };
      pp$62.braceIsBlock = function(prevType) {
        var parent = this.curContext();
        if (parent === types2.f_expr || parent === types2.f_stat) {
          return true;
        }
        if (prevType === types$12.colon && (parent === types2.b_stat || parent === types2.b_expr)) {
          return !parent.isExpr;
        }
        if (prevType === types$12._return || prevType === types$12.name && this.exprAllowed) {
          return lineBreak2.test(this.input.slice(this.lastTokEnd, this.start));
        }
        if (prevType === types$12._else || prevType === types$12.semi || prevType === types$12.eof || prevType === types$12.parenR || prevType === types$12.arrow) {
          return true;
        }
        if (prevType === types$12.braceL) {
          return parent === types2.b_stat;
        }
        if (prevType === types$12._var || prevType === types$12._const || prevType === types$12.name) {
          return false;
        }
        return !this.exprAllowed;
      };
      pp$62.inGeneratorContext = function() {
        for (var i2 = this.context.length - 1; i2 >= 1; i2--) {
          var context = this.context[i2];
          if (context.token === "function") {
            return context.generator;
          }
        }
        return false;
      };
      pp$62.updateContext = function(prevType) {
        var update, type = this.type;
        if (type.keyword && prevType === types$12.dot) {
          this.exprAllowed = false;
        } else if (update = type.updateContext) {
          update.call(this, prevType);
        } else {
          this.exprAllowed = type.beforeExpr;
        }
      };
      pp$62.overrideContext = function(tokenCtx) {
        if (this.curContext() !== tokenCtx) {
          this.context[this.context.length - 1] = tokenCtx;
        }
      };
      types$12.parenR.updateContext = types$12.braceR.updateContext = function() {
        if (this.context.length === 1) {
          this.exprAllowed = true;
          return;
        }
        var out = this.context.pop();
        if (out === types2.b_stat && this.curContext().token === "function") {
          out = this.context.pop();
        }
        this.exprAllowed = !out.isExpr;
      };
      types$12.braceL.updateContext = function(prevType) {
        this.context.push(this.braceIsBlock(prevType) ? types2.b_stat : types2.b_expr);
        this.exprAllowed = true;
      };
      types$12.dollarBraceL.updateContext = function() {
        this.context.push(types2.b_tmpl);
        this.exprAllowed = true;
      };
      types$12.parenL.updateContext = function(prevType) {
        var statementParens = prevType === types$12._if || prevType === types$12._for || prevType === types$12._with || prevType === types$12._while;
        this.context.push(statementParens ? types2.p_stat : types2.p_expr);
        this.exprAllowed = true;
      };
      types$12.incDec.updateContext = function() {
      };
      types$12._function.updateContext = types$12._class.updateContext = function(prevType) {
        if (prevType.beforeExpr && prevType !== types$12._else && !(prevType === types$12.semi && this.curContext() !== types2.p_stat) && !(prevType === types$12._return && lineBreak2.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$12.colon || prevType === types$12.braceL) && this.curContext() === types2.b_stat)) {
          this.context.push(types2.f_expr);
        } else {
          this.context.push(types2.f_stat);
        }
        this.exprAllowed = false;
      };
      types$12.colon.updateContext = function() {
        if (this.curContext().token === "function") {
          this.context.pop();
        }
        this.exprAllowed = true;
      };
      types$12.backQuote.updateContext = function() {
        if (this.curContext() === types2.q_tmpl) {
          this.context.pop();
        } else {
          this.context.push(types2.q_tmpl);
        }
        this.exprAllowed = false;
      };
      types$12.star.updateContext = function(prevType) {
        if (prevType === types$12._function) {
          var index2 = this.context.length - 1;
          if (this.context[index2] === types2.f_expr) {
            this.context[index2] = types2.f_expr_gen;
          } else {
            this.context[index2] = types2.f_gen;
          }
        }
        this.exprAllowed = true;
      };
      types$12.name.updateContext = function(prevType) {
        var allowed = false;
        if (this.options.ecmaVersion >= 6 && prevType !== types$12.dot) {
          if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
            allowed = true;
          }
        }
        this.exprAllowed = allowed;
      };
      var pp$52 = Parser3.prototype;
      pp$52.checkPropClash = function(prop, propHash, refDestructuringErrors) {
        if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
          return;
        }
        if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
          return;
        }
        var key = prop.key;
        var name2;
        switch (key.type) {
          case "Identifier":
            name2 = key.name;
            break;
          case "Literal":
            name2 = String(key.value);
            break;
          default:
            return;
        }
        var kind = prop.kind;
        if (this.options.ecmaVersion >= 6) {
          if (name2 === "__proto__" && kind === "init") {
            if (propHash.proto) {
              if (refDestructuringErrors) {
                if (refDestructuringErrors.doubleProto < 0) {
                  refDestructuringErrors.doubleProto = key.start;
                }
              } else {
                this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
              }
            }
            propHash.proto = true;
          }
          return;
        }
        name2 = "$" + name2;
        var other = propHash[name2];
        if (other) {
          var redefinition;
          if (kind === "init") {
            redefinition = this.strict && other.init || other.get || other.set;
          } else {
            redefinition = other.init || other[kind];
          }
          if (redefinition) {
            this.raiseRecoverable(key.start, "Redefinition of property");
          }
        } else {
          other = propHash[name2] = {
            init: false,
            get: false,
            set: false
          };
        }
        other[kind] = true;
      };
      pp$52.parseExpression = function(forInit, refDestructuringErrors) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
        if (this.type === types$12.comma) {
          var node2 = this.startNodeAt(startPos, startLoc);
          node2.expressions = [expr];
          while (this.eat(types$12.comma)) {
            node2.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
          }
          return this.finishNode(node2, "SequenceExpression");
        }
        return expr;
      };
      pp$52.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
        if (this.isContextual("yield")) {
          if (this.inGenerator) {
            return this.parseYield(forInit);
          } else {
            this.exprAllowed = false;
          }
        }
        var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
        if (refDestructuringErrors) {
          oldParenAssign = refDestructuringErrors.parenthesizedAssign;
          oldTrailingComma = refDestructuringErrors.trailingComma;
          oldDoubleProto = refDestructuringErrors.doubleProto;
          refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
        } else {
          refDestructuringErrors = new DestructuringErrors3();
          ownDestructuringErrors = true;
        }
        var startPos = this.start, startLoc = this.startLoc;
        if (this.type === types$12.parenL || this.type === types$12.name) {
          this.potentialArrowAt = this.start;
          this.potentialArrowInForAwait = forInit === "await";
        }
        var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
        if (afterLeftParse) {
          left = afterLeftParse.call(this, left, startPos, startLoc);
        }
        if (this.type.isAssign) {
          var node2 = this.startNodeAt(startPos, startLoc);
          node2.operator = this.value;
          if (this.type === types$12.eq) {
            left = this.toAssignable(left, false, refDestructuringErrors);
          }
          if (!ownDestructuringErrors) {
            refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
          }
          if (refDestructuringErrors.shorthandAssign >= left.start) {
            refDestructuringErrors.shorthandAssign = -1;
          }
          if (this.type === types$12.eq) {
            this.checkLValPattern(left);
          } else {
            this.checkLValSimple(left);
          }
          node2.left = left;
          this.next();
          node2.right = this.parseMaybeAssign(forInit);
          if (oldDoubleProto > -1) {
            refDestructuringErrors.doubleProto = oldDoubleProto;
          }
          return this.finishNode(node2, "AssignmentExpression");
        } else {
          if (ownDestructuringErrors) {
            this.checkExpressionErrors(refDestructuringErrors, true);
          }
        }
        if (oldParenAssign > -1) {
          refDestructuringErrors.parenthesizedAssign = oldParenAssign;
        }
        if (oldTrailingComma > -1) {
          refDestructuringErrors.trailingComma = oldTrailingComma;
        }
        return left;
      };
      pp$52.parseMaybeConditional = function(forInit, refDestructuringErrors) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseExprOps(forInit, refDestructuringErrors);
        if (this.checkExpressionErrors(refDestructuringErrors)) {
          return expr;
        }
        if (this.eat(types$12.question)) {
          var node2 = this.startNodeAt(startPos, startLoc);
          node2.test = expr;
          node2.consequent = this.parseMaybeAssign();
          this.expect(types$12.colon);
          node2.alternate = this.parseMaybeAssign(forInit);
          return this.finishNode(node2, "ConditionalExpression");
        }
        return expr;
      };
      pp$52.parseExprOps = function(forInit, refDestructuringErrors) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
        if (this.checkExpressionErrors(refDestructuringErrors)) {
          return expr;
        }
        return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
      };
      pp$52.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
        var prec = this.type.binop;
        if (prec != null && (!forInit || this.type !== types$12._in)) {
          if (prec > minPrec) {
            var logical = this.type === types$12.logicalOR || this.type === types$12.logicalAND;
            var coalesce = this.type === types$12.coalesce;
            if (coalesce) {
              prec = types$12.logicalAND.binop;
            }
            var op = this.value;
            this.next();
            var startPos = this.start, startLoc = this.startLoc;
            var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
            var node2 = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
            if (logical && this.type === types$12.coalesce || coalesce && (this.type === types$12.logicalOR || this.type === types$12.logicalAND)) {
              this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
            }
            return this.parseExprOp(node2, leftStartPos, leftStartLoc, minPrec, forInit);
          }
        }
        return left;
      };
      pp$52.buildBinary = function(startPos, startLoc, left, right, op, logical) {
        if (right.type === "PrivateIdentifier") {
          this.raise(right.start, "Private identifier can only be left side of binary expression");
        }
        var node2 = this.startNodeAt(startPos, startLoc);
        node2.left = left;
        node2.operator = op;
        node2.right = right;
        return this.finishNode(node2, logical ? "LogicalExpression" : "BinaryExpression");
      };
      pp$52.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
        var startPos = this.start, startLoc = this.startLoc, expr;
        if (this.isContextual("await") && this.canAwait) {
          expr = this.parseAwait(forInit);
          sawUnary = true;
        } else if (this.type.prefix) {
          var node2 = this.startNode(), update = this.type === types$12.incDec;
          node2.operator = this.value;
          node2.prefix = true;
          this.next();
          node2.argument = this.parseMaybeUnary(null, true, update, forInit);
          this.checkExpressionErrors(refDestructuringErrors, true);
          if (update) {
            this.checkLValSimple(node2.argument);
          } else if (this.strict && node2.operator === "delete" && isLocalVariableAccess2(node2.argument)) {
            this.raiseRecoverable(node2.start, "Deleting local variable in strict mode");
          } else if (node2.operator === "delete" && isPrivateFieldAccess2(node2.argument)) {
            this.raiseRecoverable(node2.start, "Private fields can not be deleted");
          } else {
            sawUnary = true;
          }
          expr = this.finishNode(node2, update ? "UpdateExpression" : "UnaryExpression");
        } else if (!sawUnary && this.type === types$12.privateId) {
          if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) {
            this.unexpected();
          }
          expr = this.parsePrivateIdent();
          if (this.type !== types$12._in) {
            this.unexpected();
          }
        } else {
          expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
          if (this.checkExpressionErrors(refDestructuringErrors)) {
            return expr;
          }
          while (this.type.postfix && !this.canInsertSemicolon()) {
            var node$1 = this.startNodeAt(startPos, startLoc);
            node$1.operator = this.value;
            node$1.prefix = false;
            node$1.argument = expr;
            this.checkLValSimple(expr);
            this.next();
            expr = this.finishNode(node$1, "UpdateExpression");
          }
        }
        if (!incDec && this.eat(types$12.starstar)) {
          if (sawUnary) {
            this.unexpected(this.lastTokStart);
          } else {
            return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
          }
        } else {
          return expr;
        }
      };
      function isLocalVariableAccess2(node2) {
        return node2.type === "Identifier" || node2.type === "ParenthesizedExpression" && isLocalVariableAccess2(node2.expression);
      }
      function isPrivateFieldAccess2(node2) {
        return node2.type === "MemberExpression" && node2.property.type === "PrivateIdentifier" || node2.type === "ChainExpression" && isPrivateFieldAccess2(node2.expression) || node2.type === "ParenthesizedExpression" && isPrivateFieldAccess2(node2.expression);
      }
      pp$52.parseExprSubscripts = function(refDestructuringErrors, forInit) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseExprAtom(refDestructuringErrors, forInit);
        if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
          return expr;
        }
        var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
        if (refDestructuringErrors && result.type === "MemberExpression") {
          if (refDestructuringErrors.parenthesizedAssign >= result.start) {
            refDestructuringErrors.parenthesizedAssign = -1;
          }
          if (refDestructuringErrors.parenthesizedBind >= result.start) {
            refDestructuringErrors.parenthesizedBind = -1;
          }
          if (refDestructuringErrors.trailingComma >= result.start) {
            refDestructuringErrors.trailingComma = -1;
          }
        }
        return result;
      };
      pp$52.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
        var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
        var optionalChained = false;
        while (true) {
          var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
          if (element.optional) {
            optionalChained = true;
          }
          if (element === base || element.type === "ArrowFunctionExpression") {
            if (optionalChained) {
              var chainNode = this.startNodeAt(startPos, startLoc);
              chainNode.expression = element;
              element = this.finishNode(chainNode, "ChainExpression");
            }
            return element;
          }
          base = element;
        }
      };
      pp$52.shouldParseAsyncArrow = function() {
        return !this.canInsertSemicolon() && this.eat(types$12.arrow);
      };
      pp$52.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
      };
      pp$52.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
        var optionalSupported = this.options.ecmaVersion >= 11;
        var optional = optionalSupported && this.eat(types$12.questionDot);
        if (noCalls && optional) {
          this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
        }
        var computed = this.eat(types$12.bracketL);
        if (computed || optional && this.type !== types$12.parenL && this.type !== types$12.backQuote || this.eat(types$12.dot)) {
          var node2 = this.startNodeAt(startPos, startLoc);
          node2.object = base;
          if (computed) {
            node2.property = this.parseExpression();
            this.expect(types$12.bracketR);
          } else if (this.type === types$12.privateId && base.type !== "Super") {
            node2.property = this.parsePrivateIdent();
          } else {
            node2.property = this.parseIdent(this.options.allowReserved !== "never");
          }
          node2.computed = !!computed;
          if (optionalSupported) {
            node2.optional = optional;
          }
          base = this.finishNode(node2, "MemberExpression");
        } else if (!noCalls && this.eat(types$12.parenL)) {
          var refDestructuringErrors = new DestructuringErrors3(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
          this.yieldPos = 0;
          this.awaitPos = 0;
          this.awaitIdentPos = 0;
          var exprList = this.parseExprList(types$12.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
          if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
            this.checkPatternErrors(refDestructuringErrors, false);
            this.checkYieldAwaitInDefaultParams();
            if (this.awaitIdentPos > 0) {
              this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
            }
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            this.awaitIdentPos = oldAwaitIdentPos;
            return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
          }
          this.checkExpressionErrors(refDestructuringErrors, true);
          this.yieldPos = oldYieldPos || this.yieldPos;
          this.awaitPos = oldAwaitPos || this.awaitPos;
          this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
          var node$1 = this.startNodeAt(startPos, startLoc);
          node$1.callee = base;
          node$1.arguments = exprList;
          if (optionalSupported) {
            node$1.optional = optional;
          }
          base = this.finishNode(node$1, "CallExpression");
        } else if (this.type === types$12.backQuote) {
          if (optional || optionalChained) {
            this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
          }
          var node$2 = this.startNodeAt(startPos, startLoc);
          node$2.tag = base;
          node$2.quasi = this.parseTemplate({ isTagged: true });
          base = this.finishNode(node$2, "TaggedTemplateExpression");
        }
        return base;
      };
      pp$52.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
        if (this.type === types$12.slash) {
          this.readRegexp();
        }
        var node2, canBeArrow = this.potentialArrowAt === this.start;
        switch (this.type) {
          case types$12._super:
            if (!this.allowSuper) {
              this.raise(this.start, "'super' keyword outside a method");
            }
            node2 = this.startNode();
            this.next();
            if (this.type === types$12.parenL && !this.allowDirectSuper) {
              this.raise(node2.start, "super() call outside constructor of a subclass");
            }
            if (this.type !== types$12.dot && this.type !== types$12.bracketL && this.type !== types$12.parenL) {
              this.unexpected();
            }
            return this.finishNode(node2, "Super");
          case types$12._this:
            node2 = this.startNode();
            this.next();
            return this.finishNode(node2, "ThisExpression");
          case types$12.name:
            var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
            var id = this.parseIdent(false);
            if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$12._function)) {
              this.overrideContext(types2.f_expr);
              return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
            }
            if (canBeArrow && !this.canInsertSemicolon()) {
              if (this.eat(types$12.arrow)) {
                return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
              }
              if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$12.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
                id = this.parseIdent(false);
                if (this.canInsertSemicolon() || !this.eat(types$12.arrow)) {
                  this.unexpected();
                }
                return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
              }
            }
            return id;
          case types$12.regexp:
            var value2 = this.value;
            node2 = this.parseLiteral(value2.value);
            node2.regex = { pattern: value2.pattern, flags: value2.flags };
            return node2;
          case types$12.num:
          case types$12.string:
            return this.parseLiteral(this.value);
          case types$12._null:
          case types$12._true:
          case types$12._false:
            node2 = this.startNode();
            node2.value = this.type === types$12._null ? null : this.type === types$12._true;
            node2.raw = this.type.keyword;
            this.next();
            return this.finishNode(node2, "Literal");
          case types$12.parenL:
            var start2 = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
            if (refDestructuringErrors) {
              if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
                refDestructuringErrors.parenthesizedAssign = start2;
              }
              if (refDestructuringErrors.parenthesizedBind < 0) {
                refDestructuringErrors.parenthesizedBind = start2;
              }
            }
            return expr;
          case types$12.bracketL:
            node2 = this.startNode();
            this.next();
            node2.elements = this.parseExprList(types$12.bracketR, true, true, refDestructuringErrors);
            return this.finishNode(node2, "ArrayExpression");
          case types$12.braceL:
            this.overrideContext(types2.b_expr);
            return this.parseObj(false, refDestructuringErrors);
          case types$12._function:
            node2 = this.startNode();
            this.next();
            return this.parseFunction(node2, 0);
          case types$12._class:
            return this.parseClass(this.startNode(), false);
          case types$12._new:
            return this.parseNew();
          case types$12.backQuote:
            return this.parseTemplate();
          case types$12._import:
            if (this.options.ecmaVersion >= 11) {
              return this.parseExprImport(forNew);
            } else {
              return this.unexpected();
            }
          default:
            return this.parseExprAtomDefault();
        }
      };
      pp$52.parseExprAtomDefault = function() {
        this.unexpected();
      };
      pp$52.parseExprImport = function(forNew) {
        var node2 = this.startNode();
        if (this.containsEsc) {
          this.raiseRecoverable(this.start, "Escape sequence in keyword import");
        }
        this.next();
        if (this.type === types$12.parenL && !forNew) {
          return this.parseDynamicImport(node2);
        } else if (this.type === types$12.dot) {
          var meta = this.startNodeAt(node2.start, node2.loc && node2.loc.start);
          meta.name = "import";
          node2.meta = this.finishNode(meta, "Identifier");
          return this.parseImportMeta(node2);
        } else {
          this.unexpected();
        }
      };
      pp$52.parseDynamicImport = function(node2) {
        this.next();
        node2.source = this.parseMaybeAssign();
        if (this.options.ecmaVersion >= 16) {
          if (!this.eat(types$12.parenR)) {
            this.expect(types$12.comma);
            if (!this.afterTrailingComma(types$12.parenR)) {
              node2.options = this.parseMaybeAssign();
              if (!this.eat(types$12.parenR)) {
                this.expect(types$12.comma);
                if (!this.afterTrailingComma(types$12.parenR)) {
                  this.unexpected();
                }
              }
            } else {
              node2.options = null;
            }
          } else {
            node2.options = null;
          }
        } else {
          if (!this.eat(types$12.parenR)) {
            var errorPos = this.start;
            if (this.eat(types$12.comma) && this.eat(types$12.parenR)) {
              this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
            } else {
              this.unexpected(errorPos);
            }
          }
        }
        return this.finishNode(node2, "ImportExpression");
      };
      pp$52.parseImportMeta = function(node2) {
        this.next();
        var containsEsc = this.containsEsc;
        node2.property = this.parseIdent(true);
        if (node2.property.name !== "meta") {
          this.raiseRecoverable(node2.property.start, "The only valid meta property for import is 'import.meta'");
        }
        if (containsEsc) {
          this.raiseRecoverable(node2.start, "'import.meta' must not contain escaped characters");
        }
        if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
          this.raiseRecoverable(node2.start, "Cannot use 'import.meta' outside a module");
        }
        return this.finishNode(node2, "MetaProperty");
      };
      pp$52.parseLiteral = function(value2) {
        var node2 = this.startNode();
        node2.value = value2;
        node2.raw = this.input.slice(this.start, this.end);
        if (node2.raw.charCodeAt(node2.raw.length - 1) === 110) {
          node2.bigint = node2.value != null ? node2.value.toString() : node2.raw.slice(0, -1).replace(/_/g, "");
        }
        this.next();
        return this.finishNode(node2, "Literal");
      };
      pp$52.parseParenExpression = function() {
        this.expect(types$12.parenL);
        var val = this.parseExpression();
        this.expect(types$12.parenR);
        return val;
      };
      pp$52.shouldParseArrow = function(exprList) {
        return !this.canInsertSemicolon();
      };
      pp$52.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
        var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
        if (this.options.ecmaVersion >= 6) {
          this.next();
          var innerStartPos = this.start, innerStartLoc = this.startLoc;
          var exprList = [], first = true, lastIsComma = false;
          var refDestructuringErrors = new DestructuringErrors3(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
          this.yieldPos = 0;
          this.awaitPos = 0;
          while (this.type !== types$12.parenR) {
            first ? first = false : this.expect(types$12.comma);
            if (allowTrailingComma && this.afterTrailingComma(types$12.parenR, true)) {
              lastIsComma = true;
              break;
            } else if (this.type === types$12.ellipsis) {
              spreadStart = this.start;
              exprList.push(this.parseParenItem(this.parseRestBinding()));
              if (this.type === types$12.comma) {
                this.raiseRecoverable(
                  this.start,
                  "Comma is not permitted after the rest element"
                );
              }
              break;
            } else {
              exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
            }
          }
          var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
          this.expect(types$12.parenR);
          if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$12.arrow)) {
            this.checkPatternErrors(refDestructuringErrors, false);
            this.checkYieldAwaitInDefaultParams();
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
          }
          if (!exprList.length || lastIsComma) {
            this.unexpected(this.lastTokStart);
          }
          if (spreadStart) {
            this.unexpected(spreadStart);
          }
          this.checkExpressionErrors(refDestructuringErrors, true);
          this.yieldPos = oldYieldPos || this.yieldPos;
          this.awaitPos = oldAwaitPos || this.awaitPos;
          if (exprList.length > 1) {
            val = this.startNodeAt(innerStartPos, innerStartLoc);
            val.expressions = exprList;
            this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
          } else {
            val = exprList[0];
          }
        } else {
          val = this.parseParenExpression();
        }
        if (this.options.preserveParens) {
          var par = this.startNodeAt(startPos, startLoc);
          par.expression = val;
          return this.finishNode(par, "ParenthesizedExpression");
        } else {
          return val;
        }
      };
      pp$52.parseParenItem = function(item) {
        return item;
      };
      pp$52.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
      };
      var empty4 = [];
      pp$52.parseNew = function() {
        if (this.containsEsc) {
          this.raiseRecoverable(this.start, "Escape sequence in keyword new");
        }
        var node2 = this.startNode();
        this.next();
        if (this.options.ecmaVersion >= 6 && this.type === types$12.dot) {
          var meta = this.startNodeAt(node2.start, node2.loc && node2.loc.start);
          meta.name = "new";
          node2.meta = this.finishNode(meta, "Identifier");
          this.next();
          var containsEsc = this.containsEsc;
          node2.property = this.parseIdent(true);
          if (node2.property.name !== "target") {
            this.raiseRecoverable(node2.property.start, "The only valid meta property for new is 'new.target'");
          }
          if (containsEsc) {
            this.raiseRecoverable(node2.start, "'new.target' must not contain escaped characters");
          }
          if (!this.allowNewDotTarget) {
            this.raiseRecoverable(node2.start, "'new.target' can only be used in functions and class static block");
          }
          return this.finishNode(node2, "MetaProperty");
        }
        var startPos = this.start, startLoc = this.startLoc;
        node2.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
        if (this.eat(types$12.parenL)) {
          node2.arguments = this.parseExprList(types$12.parenR, this.options.ecmaVersion >= 8, false);
        } else {
          node2.arguments = empty4;
        }
        return this.finishNode(node2, "NewExpression");
      };
      pp$52.parseTemplateElement = function(ref3) {
        var isTagged = ref3.isTagged;
        var elem = this.startNode();
        if (this.type === types$12.invalidTemplate) {
          if (!isTagged) {
            this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
          }
          elem.value = {
            raw: this.value.replace(/\r\n?/g, "\n"),
            cooked: null
          };
        } else {
          elem.value = {
            raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
            cooked: this.value
          };
        }
        this.next();
        elem.tail = this.type === types$12.backQuote;
        return this.finishNode(elem, "TemplateElement");
      };
      pp$52.parseTemplate = function(ref3) {
        if (ref3 === void 0) ref3 = {};
        var isTagged = ref3.isTagged;
        if (isTagged === void 0) isTagged = false;
        var node2 = this.startNode();
        this.next();
        node2.expressions = [];
        var curElt = this.parseTemplateElement({ isTagged });
        node2.quasis = [curElt];
        while (!curElt.tail) {
          if (this.type === types$12.eof) {
            this.raise(this.pos, "Unterminated template literal");
          }
          this.expect(types$12.dollarBraceL);
          node2.expressions.push(this.parseExpression());
          this.expect(types$12.braceR);
          node2.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
        }
        this.next();
        return this.finishNode(node2, "TemplateLiteral");
      };
      pp$52.isAsyncProp = function(prop) {
        return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$12.name || this.type === types$12.num || this.type === types$12.string || this.type === types$12.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$12.star) && !lineBreak2.test(this.input.slice(this.lastTokEnd, this.start));
      };
      pp$52.parseObj = function(isPattern, refDestructuringErrors) {
        var node2 = this.startNode(), first = true, propHash = {};
        node2.properties = [];
        this.next();
        while (!this.eat(types$12.braceR)) {
          if (!first) {
            this.expect(types$12.comma);
            if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$12.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          var prop = this.parseProperty(isPattern, refDestructuringErrors);
          if (!isPattern) {
            this.checkPropClash(prop, propHash, refDestructuringErrors);
          }
          node2.properties.push(prop);
        }
        return this.finishNode(node2, isPattern ? "ObjectPattern" : "ObjectExpression");
      };
      pp$52.parseProperty = function(isPattern, refDestructuringErrors) {
        var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
        if (this.options.ecmaVersion >= 9 && this.eat(types$12.ellipsis)) {
          if (isPattern) {
            prop.argument = this.parseIdent(false);
            if (this.type === types$12.comma) {
              this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
            }
            return this.finishNode(prop, "RestElement");
          }
          prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
          if (this.type === types$12.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
            refDestructuringErrors.trailingComma = this.start;
          }
          return this.finishNode(prop, "SpreadElement");
        }
        if (this.options.ecmaVersion >= 6) {
          prop.method = false;
          prop.shorthand = false;
          if (isPattern || refDestructuringErrors) {
            startPos = this.start;
            startLoc = this.startLoc;
          }
          if (!isPattern) {
            isGenerator = this.eat(types$12.star);
          }
        }
        var containsEsc = this.containsEsc;
        this.parsePropertyName(prop);
        if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
          isAsync = true;
          isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$12.star);
          this.parsePropertyName(prop);
        } else {
          isAsync = false;
        }
        this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
        return this.finishNode(prop, "Property");
      };
      pp$52.parseGetterSetter = function(prop) {
        var kind = prop.key.name;
        this.parsePropertyName(prop);
        prop.value = this.parseMethod(false);
        prop.kind = kind;
        var paramCount = prop.kind === "get" ? 0 : 1;
        if (prop.value.params.length !== paramCount) {
          var start2 = prop.value.start;
          if (prop.kind === "get") {
            this.raiseRecoverable(start2, "getter should have no params");
          } else {
            this.raiseRecoverable(start2, "setter should have exactly one param");
          }
        } else {
          if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
            this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
          }
        }
      };
      pp$52.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
        if ((isGenerator || isAsync) && this.type === types$12.colon) {
          this.unexpected();
        }
        if (this.eat(types$12.colon)) {
          prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
          prop.kind = "init";
        } else if (this.options.ecmaVersion >= 6 && this.type === types$12.parenL) {
          if (isPattern) {
            this.unexpected();
          }
          prop.method = true;
          prop.value = this.parseMethod(isGenerator, isAsync);
          prop.kind = "init";
        } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$12.comma && this.type !== types$12.braceR && this.type !== types$12.eq)) {
          if (isGenerator || isAsync) {
            this.unexpected();
          }
          this.parseGetterSetter(prop);
        } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
          if (isGenerator || isAsync) {
            this.unexpected();
          }
          this.checkUnreserved(prop.key);
          if (prop.key.name === "await" && !this.awaitIdentPos) {
            this.awaitIdentPos = startPos;
          }
          if (isPattern) {
            prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
          } else if (this.type === types$12.eq && refDestructuringErrors) {
            if (refDestructuringErrors.shorthandAssign < 0) {
              refDestructuringErrors.shorthandAssign = this.start;
            }
            prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
          } else {
            prop.value = this.copyNode(prop.key);
          }
          prop.kind = "init";
          prop.shorthand = true;
        } else {
          this.unexpected();
        }
      };
      pp$52.parsePropertyName = function(prop) {
        if (this.options.ecmaVersion >= 6) {
          if (this.eat(types$12.bracketL)) {
            prop.computed = true;
            prop.key = this.parseMaybeAssign();
            this.expect(types$12.bracketR);
            return prop.key;
          } else {
            prop.computed = false;
          }
        }
        return prop.key = this.type === types$12.num || this.type === types$12.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
      };
      pp$52.initFunction = function(node2) {
        node2.id = null;
        if (this.options.ecmaVersion >= 6) {
          node2.generator = node2.expression = false;
        }
        if (this.options.ecmaVersion >= 8) {
          node2.async = false;
        }
      };
      pp$52.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
        var node2 = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.initFunction(node2);
        if (this.options.ecmaVersion >= 6) {
          node2.generator = isGenerator;
        }
        if (this.options.ecmaVersion >= 8) {
          node2.async = !!isAsync;
        }
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.enterScope(functionFlags2(isAsync, node2.generator) | SCOPE_SUPER2 | (allowDirectSuper ? SCOPE_DIRECT_SUPER2 : 0));
        this.expect(types$12.parenL);
        node2.params = this.parseBindingList(types$12.parenR, false, this.options.ecmaVersion >= 8);
        this.checkYieldAwaitInDefaultParams();
        this.parseFunctionBody(node2, false, true, false);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.finishNode(node2, "FunctionExpression");
      };
      pp$52.parseArrowExpression = function(node2, params, isAsync, forInit) {
        var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.enterScope(functionFlags2(isAsync, false) | SCOPE_ARROW2);
        this.initFunction(node2);
        if (this.options.ecmaVersion >= 8) {
          node2.async = !!isAsync;
        }
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        node2.params = this.toAssignableList(params, true);
        this.parseFunctionBody(node2, true, false, forInit);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.finishNode(node2, "ArrowFunctionExpression");
      };
      pp$52.parseFunctionBody = function(node2, isArrowFunction, isMethod, forInit) {
        var isExpression = isArrowFunction && this.type !== types$12.braceL;
        var oldStrict = this.strict, useStrict = false;
        if (isExpression) {
          node2.body = this.parseMaybeAssign(forInit);
          node2.expression = true;
          this.checkParams(node2, false);
        } else {
          var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node2.params);
          if (!oldStrict || nonSimple) {
            useStrict = this.strictDirective(this.end);
            if (useStrict && nonSimple) {
              this.raiseRecoverable(node2.start, "Illegal 'use strict' directive in function with non-simple parameter list");
            }
          }
          var oldLabels = this.labels;
          this.labels = [];
          if (useStrict) {
            this.strict = true;
          }
          this.checkParams(node2, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node2.params));
          if (this.strict && node2.id) {
            this.checkLValSimple(node2.id, BIND_OUTSIDE2);
          }
          node2.body = this.parseBlock(false, void 0, useStrict && !oldStrict);
          node2.expression = false;
          this.adaptDirectivePrologue(node2.body.body);
          this.labels = oldLabels;
        }
        this.exitScope();
      };
      pp$52.isSimpleParamList = function(params) {
        for (var i2 = 0, list4 = params; i2 < list4.length; i2 += 1) {
          var param = list4[i2];
          if (param.type !== "Identifier") {
            return false;
          }
        }
        return true;
      };
      pp$52.checkParams = function(node2, allowDuplicates) {
        var nameHash = /* @__PURE__ */ Object.create(null);
        for (var i2 = 0, list4 = node2.params; i2 < list4.length; i2 += 1) {
          var param = list4[i2];
          this.checkLValInnerPattern(param, BIND_VAR2, allowDuplicates ? null : nameHash);
        }
      };
      pp$52.parseExprList = function(close2, allowTrailingComma, allowEmpty, refDestructuringErrors) {
        var elts = [], first = true;
        while (!this.eat(close2)) {
          if (!first) {
            this.expect(types$12.comma);
            if (allowTrailingComma && this.afterTrailingComma(close2)) {
              break;
            }
          } else {
            first = false;
          }
          var elt = void 0;
          if (allowEmpty && this.type === types$12.comma) {
            elt = null;
          } else if (this.type === types$12.ellipsis) {
            elt = this.parseSpread(refDestructuringErrors);
            if (refDestructuringErrors && this.type === types$12.comma && refDestructuringErrors.trailingComma < 0) {
              refDestructuringErrors.trailingComma = this.start;
            }
          } else {
            elt = this.parseMaybeAssign(false, refDestructuringErrors);
          }
          elts.push(elt);
        }
        return elts;
      };
      pp$52.checkUnreserved = function(ref3) {
        var start2 = ref3.start;
        var end = ref3.end;
        var name2 = ref3.name;
        if (this.inGenerator && name2 === "yield") {
          this.raiseRecoverable(start2, "Cannot use 'yield' as identifier inside a generator");
        }
        if (this.inAsync && name2 === "await") {
          this.raiseRecoverable(start2, "Cannot use 'await' as identifier inside an async function");
        }
        if (!(this.currentThisScope().flags & SCOPE_VAR2) && name2 === "arguments") {
          this.raiseRecoverable(start2, "Cannot use 'arguments' in class field initializer");
        }
        if (this.inClassStaticBlock && (name2 === "arguments" || name2 === "await")) {
          this.raise(start2, "Cannot use " + name2 + " in class static initialization block");
        }
        if (this.keywords.test(name2)) {
          this.raise(start2, "Unexpected keyword '" + name2 + "'");
        }
        if (this.options.ecmaVersion < 6 && this.input.slice(start2, end).indexOf("\\") !== -1) {
          return;
        }
        var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
        if (re.test(name2)) {
          if (!this.inAsync && name2 === "await") {
            this.raiseRecoverable(start2, "Cannot use keyword 'await' outside an async function");
          }
          this.raiseRecoverable(start2, "The keyword '" + name2 + "' is reserved");
        }
      };
      pp$52.parseIdent = function(liberal) {
        var node2 = this.parseIdentNode();
        this.next(!!liberal);
        this.finishNode(node2, "Identifier");
        if (!liberal) {
          this.checkUnreserved(node2);
          if (node2.name === "await" && !this.awaitIdentPos) {
            this.awaitIdentPos = node2.start;
          }
        }
        return node2;
      };
      pp$52.parseIdentNode = function() {
        var node2 = this.startNode();
        if (this.type === types$12.name) {
          node2.name = this.value;
        } else if (this.type.keyword) {
          node2.name = this.type.keyword;
          if ((node2.name === "class" || node2.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
            this.context.pop();
          }
          this.type = types$12.name;
        } else {
          this.unexpected();
        }
        return node2;
      };
      pp$52.parsePrivateIdent = function() {
        var node2 = this.startNode();
        if (this.type === types$12.privateId) {
          node2.name = this.value;
        } else {
          this.unexpected();
        }
        this.next();
        this.finishNode(node2, "PrivateIdentifier");
        if (this.options.checkPrivateFields) {
          if (this.privateNameStack.length === 0) {
            this.raise(node2.start, "Private field '#" + node2.name + "' must be declared in an enclosing class");
          } else {
            this.privateNameStack[this.privateNameStack.length - 1].used.push(node2);
          }
        }
        return node2;
      };
      pp$52.parseYield = function(forInit) {
        if (!this.yieldPos) {
          this.yieldPos = this.start;
        }
        var node2 = this.startNode();
        this.next();
        if (this.type === types$12.semi || this.canInsertSemicolon() || this.type !== types$12.star && !this.type.startsExpr) {
          node2.delegate = false;
          node2.argument = null;
        } else {
          node2.delegate = this.eat(types$12.star);
          node2.argument = this.parseMaybeAssign(forInit);
        }
        return this.finishNode(node2, "YieldExpression");
      };
      pp$52.parseAwait = function(forInit) {
        if (!this.awaitPos) {
          this.awaitPos = this.start;
        }
        var node2 = this.startNode();
        this.next();
        node2.argument = this.parseMaybeUnary(null, true, false, forInit);
        return this.finishNode(node2, "AwaitExpression");
      };
      var pp$42 = Parser3.prototype;
      pp$42.raise = function(pos, message) {
        var loc = getLineInfo2(this.input, pos);
        message += " (" + loc.line + ":" + loc.column + ")";
        if (this.sourceFile) {
          message += " in " + this.sourceFile;
        }
        var err = new SyntaxError(message);
        err.pos = pos;
        err.loc = loc;
        err.raisedAt = this.pos;
        throw err;
      };
      pp$42.raiseRecoverable = pp$42.raise;
      pp$42.curPosition = function() {
        if (this.options.locations) {
          return new Position3(this.curLine, this.pos - this.lineStart);
        }
      };
      var pp$32 = Parser3.prototype;
      var Scope3 = function Scope4(flags) {
        this.flags = flags;
        this.var = [];
        this.lexical = [];
        this.functions = [];
      };
      pp$32.enterScope = function(flags) {
        this.scopeStack.push(new Scope3(flags));
      };
      pp$32.exitScope = function() {
        this.scopeStack.pop();
      };
      pp$32.treatFunctionsAsVarInScope = function(scope) {
        return scope.flags & SCOPE_FUNCTION2 || !this.inModule && scope.flags & SCOPE_TOP2;
      };
      pp$32.declareName = function(name2, bindingType, pos) {
        var redeclared = false;
        if (bindingType === BIND_LEXICAL2) {
          var scope = this.currentScope();
          redeclared = scope.lexical.indexOf(name2) > -1 || scope.functions.indexOf(name2) > -1 || scope.var.indexOf(name2) > -1;
          scope.lexical.push(name2);
          if (this.inModule && scope.flags & SCOPE_TOP2) {
            delete this.undefinedExports[name2];
          }
        } else if (bindingType === BIND_SIMPLE_CATCH2) {
          var scope$1 = this.currentScope();
          scope$1.lexical.push(name2);
        } else if (bindingType === BIND_FUNCTION2) {
          var scope$2 = this.currentScope();
          if (this.treatFunctionsAsVar) {
            redeclared = scope$2.lexical.indexOf(name2) > -1;
          } else {
            redeclared = scope$2.lexical.indexOf(name2) > -1 || scope$2.var.indexOf(name2) > -1;
          }
          scope$2.functions.push(name2);
        } else {
          for (var i2 = this.scopeStack.length - 1; i2 >= 0; --i2) {
            var scope$3 = this.scopeStack[i2];
            if (scope$3.lexical.indexOf(name2) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH2 && scope$3.lexical[0] === name2) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name2) > -1) {
              redeclared = true;
              break;
            }
            scope$3.var.push(name2);
            if (this.inModule && scope$3.flags & SCOPE_TOP2) {
              delete this.undefinedExports[name2];
            }
            if (scope$3.flags & SCOPE_VAR2) {
              break;
            }
          }
        }
        if (redeclared) {
          this.raiseRecoverable(pos, "Identifier '" + name2 + "' has already been declared");
        }
      };
      pp$32.checkLocalExport = function(id) {
        if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
          this.undefinedExports[id.name] = id;
        }
      };
      pp$32.currentScope = function() {
        return this.scopeStack[this.scopeStack.length - 1];
      };
      pp$32.currentVarScope = function() {
        for (var i2 = this.scopeStack.length - 1; ; i2--) {
          var scope = this.scopeStack[i2];
          if (scope.flags & (SCOPE_VAR2 | SCOPE_CLASS_FIELD_INIT2 | SCOPE_CLASS_STATIC_BLOCK2)) {
            return scope;
          }
        }
      };
      pp$32.currentThisScope = function() {
        for (var i2 = this.scopeStack.length - 1; ; i2--) {
          var scope = this.scopeStack[i2];
          if (scope.flags & (SCOPE_VAR2 | SCOPE_CLASS_FIELD_INIT2 | SCOPE_CLASS_STATIC_BLOCK2) && !(scope.flags & SCOPE_ARROW2)) {
            return scope;
          }
        }
      };
      var Node3 = function Node4(parser, pos, loc) {
        this.type = "";
        this.start = pos;
        this.end = 0;
        if (parser.options.locations) {
          this.loc = new SourceLocation3(parser, loc);
        }
        if (parser.options.directSourceFile) {
          this.sourceFile = parser.options.directSourceFile;
        }
        if (parser.options.ranges) {
          this.range = [pos, 0];
        }
      };
      var pp$22 = Parser3.prototype;
      pp$22.startNode = function() {
        return new Node3(this, this.start, this.startLoc);
      };
      pp$22.startNodeAt = function(pos, loc) {
        return new Node3(this, pos, loc);
      };
      function finishNodeAt2(node2, type, pos, loc) {
        node2.type = type;
        node2.end = pos;
        if (this.options.locations) {
          node2.loc.end = loc;
        }
        if (this.options.ranges) {
          node2.range[1] = pos;
        }
        return node2;
      }
      pp$22.finishNode = function(node2, type) {
        return finishNodeAt2.call(this, node2, type, this.lastTokEnd, this.lastTokEndLoc);
      };
      pp$22.finishNodeAt = function(node2, type, pos, loc) {
        return finishNodeAt2.call(this, node2, type, pos, loc);
      };
      pp$22.copyNode = function(node2) {
        var newNode = new Node3(this, node2.start, this.startLoc);
        for (var prop in node2) {
          newNode[prop] = node2[prop];
        }
        return newNode;
      };
      var scriptValuesAddedInUnicode2 = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz";
      var ecma9BinaryProperties2 = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
      var ecma10BinaryProperties2 = ecma9BinaryProperties2 + " Extended_Pictographic";
      var ecma11BinaryProperties2 = ecma10BinaryProperties2;
      var ecma12BinaryProperties2 = ecma11BinaryProperties2 + " EBase EComp EMod EPres ExtPict";
      var ecma13BinaryProperties2 = ecma12BinaryProperties2;
      var ecma14BinaryProperties2 = ecma13BinaryProperties2;
      var unicodeBinaryProperties2 = {
        9: ecma9BinaryProperties2,
        10: ecma10BinaryProperties2,
        11: ecma11BinaryProperties2,
        12: ecma12BinaryProperties2,
        13: ecma13BinaryProperties2,
        14: ecma14BinaryProperties2
      };
      var ecma14BinaryPropertiesOfStrings2 = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";
      var unicodeBinaryPropertiesOfStrings2 = {
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: ecma14BinaryPropertiesOfStrings2
      };
      var unicodeGeneralCategoryValues2 = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
      var ecma9ScriptValues2 = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
      var ecma10ScriptValues2 = ecma9ScriptValues2 + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
      var ecma11ScriptValues2 = ecma10ScriptValues2 + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
      var ecma12ScriptValues2 = ecma11ScriptValues2 + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
      var ecma13ScriptValues2 = ecma12ScriptValues2 + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
      var ecma14ScriptValues2 = ecma13ScriptValues2 + " " + scriptValuesAddedInUnicode2;
      var unicodeScriptValues2 = {
        9: ecma9ScriptValues2,
        10: ecma10ScriptValues2,
        11: ecma11ScriptValues2,
        12: ecma12ScriptValues2,
        13: ecma13ScriptValues2,
        14: ecma14ScriptValues2
      };
      var data2 = {};
      function buildUnicodeData2(ecmaVersion2) {
        var d = data2[ecmaVersion2] = {
          binary: wordsRegexp2(unicodeBinaryProperties2[ecmaVersion2] + " " + unicodeGeneralCategoryValues2),
          binaryOfStrings: wordsRegexp2(unicodeBinaryPropertiesOfStrings2[ecmaVersion2]),
          nonBinary: {
            General_Category: wordsRegexp2(unicodeGeneralCategoryValues2),
            Script: wordsRegexp2(unicodeScriptValues2[ecmaVersion2])
          }
        };
        d.nonBinary.Script_Extensions = d.nonBinary.Script;
        d.nonBinary.gc = d.nonBinary.General_Category;
        d.nonBinary.sc = d.nonBinary.Script;
        d.nonBinary.scx = d.nonBinary.Script_Extensions;
      }
      for (var i = 0, list3 = [9, 10, 11, 12, 13, 14]; i < list3.length; i += 1) {
        var ecmaVersion = list3[i];
        buildUnicodeData2(ecmaVersion);
      }
      var pp$12 = Parser3.prototype;
      var BranchID3 = function BranchID4(parent, base) {
        this.parent = parent;
        this.base = base || this;
      };
      BranchID3.prototype.separatedFrom = function separatedFrom2(alt) {
        for (var self2 = this; self2; self2 = self2.parent) {
          for (var other = alt; other; other = other.parent) {
            if (self2.base === other.base && self2 !== other) {
              return true;
            }
          }
        }
        return false;
      };
      BranchID3.prototype.sibling = function sibling2() {
        return new BranchID3(this.parent, this.base);
      };
      var RegExpValidationState3 = function RegExpValidationState4(parser) {
        this.parser = parser;
        this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
        this.unicodeProperties = data2[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
        this.source = "";
        this.flags = "";
        this.start = 0;
        this.switchU = false;
        this.switchV = false;
        this.switchN = false;
        this.pos = 0;
        this.lastIntValue = 0;
        this.lastStringValue = "";
        this.lastAssertionIsQuantifiable = false;
        this.numCapturingParens = 0;
        this.maxBackReference = 0;
        this.groupNames = /* @__PURE__ */ Object.create(null);
        this.backReferenceNames = [];
        this.branchID = null;
      };
      RegExpValidationState3.prototype.reset = function reset2(start2, pattern, flags) {
        var unicodeSets = flags.indexOf("v") !== -1;
        var unicode = flags.indexOf("u") !== -1;
        this.start = start2 | 0;
        this.source = pattern + "";
        this.flags = flags;
        if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
          this.switchU = true;
          this.switchV = true;
          this.switchN = true;
        } else {
          this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
          this.switchV = false;
          this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
        }
      };
      RegExpValidationState3.prototype.raise = function raise2(message) {
        this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
      };
      RegExpValidationState3.prototype.at = function at2(i2, forceU) {
        if (forceU === void 0) forceU = false;
        var s = this.source;
        var l = s.length;
        if (i2 >= l) {
          return -1;
        }
        var c = s.charCodeAt(i2);
        if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l) {
          return c;
        }
        var next = s.charCodeAt(i2 + 1);
        return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
      };
      RegExpValidationState3.prototype.nextIndex = function nextIndex2(i2, forceU) {
        if (forceU === void 0) forceU = false;
        var s = this.source;
        var l = s.length;
        if (i2 >= l) {
          return l;
        }
        var c = s.charCodeAt(i2), next;
        if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l || (next = s.charCodeAt(i2 + 1)) < 56320 || next > 57343) {
          return i2 + 1;
        }
        return i2 + 2;
      };
      RegExpValidationState3.prototype.current = function current2(forceU) {
        if (forceU === void 0) forceU = false;
        return this.at(this.pos, forceU);
      };
      RegExpValidationState3.prototype.lookahead = function lookahead2(forceU) {
        if (forceU === void 0) forceU = false;
        return this.at(this.nextIndex(this.pos, forceU), forceU);
      };
      RegExpValidationState3.prototype.advance = function advance2(forceU) {
        if (forceU === void 0) forceU = false;
        this.pos = this.nextIndex(this.pos, forceU);
      };
      RegExpValidationState3.prototype.eat = function eat2(ch, forceU) {
        if (forceU === void 0) forceU = false;
        if (this.current(forceU) === ch) {
          this.advance(forceU);
          return true;
        }
        return false;
      };
      RegExpValidationState3.prototype.eatChars = function eatChars2(chs, forceU) {
        if (forceU === void 0) forceU = false;
        var pos = this.pos;
        for (var i2 = 0, list4 = chs; i2 < list4.length; i2 += 1) {
          var ch = list4[i2];
          var current2 = this.at(pos, forceU);
          if (current2 === -1 || current2 !== ch) {
            return false;
          }
          pos = this.nextIndex(pos, forceU);
        }
        this.pos = pos;
        return true;
      };
      pp$12.validateRegExpFlags = function(state) {
        var validFlags = state.validFlags;
        var flags = state.flags;
        var u = false;
        var v = false;
        for (var i2 = 0; i2 < flags.length; i2++) {
          var flag = flags.charAt(i2);
          if (validFlags.indexOf(flag) === -1) {
            this.raise(state.start, "Invalid regular expression flag");
          }
          if (flags.indexOf(flag, i2 + 1) > -1) {
            this.raise(state.start, "Duplicate regular expression flag");
          }
          if (flag === "u") {
            u = true;
          }
          if (flag === "v") {
            v = true;
          }
        }
        if (this.options.ecmaVersion >= 15 && u && v) {
          this.raise(state.start, "Invalid regular expression flag");
        }
      };
      function hasProp2(obj) {
        for (var _ in obj) {
          return true;
        }
        return false;
      }
      pp$12.validateRegExpPattern = function(state) {
        this.regexp_pattern(state);
        if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp2(state.groupNames)) {
          state.switchN = true;
          this.regexp_pattern(state);
        }
      };
      pp$12.regexp_pattern = function(state) {
        state.pos = 0;
        state.lastIntValue = 0;
        state.lastStringValue = "";
        state.lastAssertionIsQuantifiable = false;
        state.numCapturingParens = 0;
        state.maxBackReference = 0;
        state.groupNames = /* @__PURE__ */ Object.create(null);
        state.backReferenceNames.length = 0;
        state.branchID = null;
        this.regexp_disjunction(state);
        if (state.pos !== state.source.length) {
          if (state.eat(
            41
            /* ) */
          )) {
            state.raise("Unmatched ')'");
          }
          if (state.eat(
            93
            /* ] */
          ) || state.eat(
            125
            /* } */
          )) {
            state.raise("Lone quantifier brackets");
          }
        }
        if (state.maxBackReference > state.numCapturingParens) {
          state.raise("Invalid escape");
        }
        for (var i2 = 0, list4 = state.backReferenceNames; i2 < list4.length; i2 += 1) {
          var name2 = list4[i2];
          if (!state.groupNames[name2]) {
            state.raise("Invalid named capture referenced");
          }
        }
      };
      pp$12.regexp_disjunction = function(state) {
        var trackDisjunction = this.options.ecmaVersion >= 16;
        if (trackDisjunction) {
          state.branchID = new BranchID3(state.branchID, null);
        }
        this.regexp_alternative(state);
        while (state.eat(
          124
          /* | */
        )) {
          if (trackDisjunction) {
            state.branchID = state.branchID.sibling();
          }
          this.regexp_alternative(state);
        }
        if (trackDisjunction) {
          state.branchID = state.branchID.parent;
        }
        if (this.regexp_eatQuantifier(state, true)) {
          state.raise("Nothing to repeat");
        }
        if (state.eat(
          123
          /* { */
        )) {
          state.raise("Lone quantifier brackets");
        }
      };
      pp$12.regexp_alternative = function(state) {
        while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
        }
      };
      pp$12.regexp_eatTerm = function(state) {
        if (this.regexp_eatAssertion(state)) {
          if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
            if (state.switchU) {
              state.raise("Invalid quantifier");
            }
          }
          return true;
        }
        if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
          this.regexp_eatQuantifier(state);
          return true;
        }
        return false;
      };
      pp$12.regexp_eatAssertion = function(state) {
        var start2 = state.pos;
        state.lastAssertionIsQuantifiable = false;
        if (state.eat(
          94
          /* ^ */
        ) || state.eat(
          36
          /* $ */
        )) {
          return true;
        }
        if (state.eat(
          92
          /* \ */
        )) {
          if (state.eat(
            66
            /* B */
          ) || state.eat(
            98
            /* b */
          )) {
            return true;
          }
          state.pos = start2;
        }
        if (state.eat(
          40
          /* ( */
        ) && state.eat(
          63
          /* ? */
        )) {
          var lookbehind = false;
          if (this.options.ecmaVersion >= 9) {
            lookbehind = state.eat(
              60
              /* < */
            );
          }
          if (state.eat(
            61
            /* = */
          ) || state.eat(
            33
            /* ! */
          )) {
            this.regexp_disjunction(state);
            if (!state.eat(
              41
              /* ) */
            )) {
              state.raise("Unterminated group");
            }
            state.lastAssertionIsQuantifiable = !lookbehind;
            return true;
          }
        }
        state.pos = start2;
        return false;
      };
      pp$12.regexp_eatQuantifier = function(state, noError) {
        if (noError === void 0) noError = false;
        if (this.regexp_eatQuantifierPrefix(state, noError)) {
          state.eat(
            63
            /* ? */
          );
          return true;
        }
        return false;
      };
      pp$12.regexp_eatQuantifierPrefix = function(state, noError) {
        return state.eat(
          42
          /* * */
        ) || state.eat(
          43
          /* + */
        ) || state.eat(
          63
          /* ? */
        ) || this.regexp_eatBracedQuantifier(state, noError);
      };
      pp$12.regexp_eatBracedQuantifier = function(state, noError) {
        var start2 = state.pos;
        if (state.eat(
          123
          /* { */
        )) {
          var min = 0, max = -1;
          if (this.regexp_eatDecimalDigits(state)) {
            min = state.lastIntValue;
            if (state.eat(
              44
              /* , */
            ) && this.regexp_eatDecimalDigits(state)) {
              max = state.lastIntValue;
            }
            if (state.eat(
              125
              /* } */
            )) {
              if (max !== -1 && max < min && !noError) {
                state.raise("numbers out of order in {} quantifier");
              }
              return true;
            }
          }
          if (state.switchU && !noError) {
            state.raise("Incomplete quantifier");
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatAtom = function(state) {
        return this.regexp_eatPatternCharacters(state) || state.eat(
          46
          /* . */
        ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
      };
      pp$12.regexp_eatReverseSolidusAtomEscape = function(state) {
        var start2 = state.pos;
        if (state.eat(
          92
          /* \ */
        )) {
          if (this.regexp_eatAtomEscape(state)) {
            return true;
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatUncapturingGroup = function(state) {
        var start2 = state.pos;
        if (state.eat(
          40
          /* ( */
        )) {
          if (state.eat(
            63
            /* ? */
          )) {
            if (this.options.ecmaVersion >= 16) {
              var addModifiers = this.regexp_eatModifiers(state);
              var hasHyphen = state.eat(
                45
                /* - */
              );
              if (addModifiers || hasHyphen) {
                for (var i2 = 0; i2 < addModifiers.length; i2++) {
                  var modifier = addModifiers.charAt(i2);
                  if (addModifiers.indexOf(modifier, i2 + 1) > -1) {
                    state.raise("Duplicate regular expression modifiers");
                  }
                }
                if (hasHyphen) {
                  var removeModifiers = this.regexp_eatModifiers(state);
                  if (!addModifiers && !removeModifiers && state.current() === 58) {
                    state.raise("Invalid regular expression modifiers");
                  }
                  for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
                    var modifier$1 = removeModifiers.charAt(i$1);
                    if (removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 || addModifiers.indexOf(modifier$1) > -1) {
                      state.raise("Duplicate regular expression modifiers");
                    }
                  }
                }
              }
            }
            if (state.eat(
              58
              /* : */
            )) {
              this.regexp_disjunction(state);
              if (state.eat(
                41
                /* ) */
              )) {
                return true;
              }
              state.raise("Unterminated group");
            }
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatCapturingGroup = function(state) {
        if (state.eat(
          40
          /* ( */
        )) {
          if (this.options.ecmaVersion >= 9) {
            this.regexp_groupSpecifier(state);
          } else if (state.current() === 63) {
            state.raise("Invalid group");
          }
          this.regexp_disjunction(state);
          if (state.eat(
            41
            /* ) */
          )) {
            state.numCapturingParens += 1;
            return true;
          }
          state.raise("Unterminated group");
        }
        return false;
      };
      pp$12.regexp_eatModifiers = function(state) {
        var modifiers = "";
        var ch = 0;
        while ((ch = state.current()) !== -1 && isRegularExpressionModifier2(ch)) {
          modifiers += codePointToString2(ch);
          state.advance();
        }
        return modifiers;
      };
      function isRegularExpressionModifier2(ch) {
        return ch === 105 || ch === 109 || ch === 115;
      }
      pp$12.regexp_eatExtendedAtom = function(state) {
        return state.eat(
          46
          /* . */
        ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
      };
      pp$12.regexp_eatInvalidBracedQuantifier = function(state) {
        if (this.regexp_eatBracedQuantifier(state, true)) {
          state.raise("Nothing to repeat");
        }
        return false;
      };
      pp$12.regexp_eatSyntaxCharacter = function(state) {
        var ch = state.current();
        if (isSyntaxCharacter2(ch)) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      function isSyntaxCharacter2(ch) {
        return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
      }
      pp$12.regexp_eatPatternCharacters = function(state) {
        var start2 = state.pos;
        var ch = 0;
        while ((ch = state.current()) !== -1 && !isSyntaxCharacter2(ch)) {
          state.advance();
        }
        return state.pos !== start2;
      };
      pp$12.regexp_eatExtendedPatternCharacter = function(state) {
        var ch = state.current();
        if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
          state.advance();
          return true;
        }
        return false;
      };
      pp$12.regexp_groupSpecifier = function(state) {
        if (state.eat(
          63
          /* ? */
        )) {
          if (!this.regexp_eatGroupName(state)) {
            state.raise("Invalid group");
          }
          var trackDisjunction = this.options.ecmaVersion >= 16;
          var known = state.groupNames[state.lastStringValue];
          if (known) {
            if (trackDisjunction) {
              for (var i2 = 0, list4 = known; i2 < list4.length; i2 += 1) {
                var altID = list4[i2];
                if (!altID.separatedFrom(state.branchID)) {
                  state.raise("Duplicate capture group name");
                }
              }
            } else {
              state.raise("Duplicate capture group name");
            }
          }
          if (trackDisjunction) {
            (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
          } else {
            state.groupNames[state.lastStringValue] = true;
          }
        }
      };
      pp$12.regexp_eatGroupName = function(state) {
        state.lastStringValue = "";
        if (state.eat(
          60
          /* < */
        )) {
          if (this.regexp_eatRegExpIdentifierName(state) && state.eat(
            62
            /* > */
          )) {
            return true;
          }
          state.raise("Invalid capture group name");
        }
        return false;
      };
      pp$12.regexp_eatRegExpIdentifierName = function(state) {
        state.lastStringValue = "";
        if (this.regexp_eatRegExpIdentifierStart(state)) {
          state.lastStringValue += codePointToString2(state.lastIntValue);
          while (this.regexp_eatRegExpIdentifierPart(state)) {
            state.lastStringValue += codePointToString2(state.lastIntValue);
          }
          return true;
        }
        return false;
      };
      pp$12.regexp_eatRegExpIdentifierStart = function(state) {
        var start2 = state.pos;
        var forceU = this.options.ecmaVersion >= 11;
        var ch = state.current(forceU);
        state.advance(forceU);
        if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
          ch = state.lastIntValue;
        }
        if (isRegExpIdentifierStart2(ch)) {
          state.lastIntValue = ch;
          return true;
        }
        state.pos = start2;
        return false;
      };
      function isRegExpIdentifierStart2(ch) {
        return isIdentifierStart2(ch, true) || ch === 36 || ch === 95;
      }
      pp$12.regexp_eatRegExpIdentifierPart = function(state) {
        var start2 = state.pos;
        var forceU = this.options.ecmaVersion >= 11;
        var ch = state.current(forceU);
        state.advance(forceU);
        if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
          ch = state.lastIntValue;
        }
        if (isRegExpIdentifierPart2(ch)) {
          state.lastIntValue = ch;
          return true;
        }
        state.pos = start2;
        return false;
      };
      function isRegExpIdentifierPart2(ch) {
        return isIdentifierChar2(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
      }
      pp$12.regexp_eatAtomEscape = function(state) {
        if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
          return true;
        }
        if (state.switchU) {
          if (state.current() === 99) {
            state.raise("Invalid unicode escape");
          }
          state.raise("Invalid escape");
        }
        return false;
      };
      pp$12.regexp_eatBackReference = function(state) {
        var start2 = state.pos;
        if (this.regexp_eatDecimalEscape(state)) {
          var n = state.lastIntValue;
          if (state.switchU) {
            if (n > state.maxBackReference) {
              state.maxBackReference = n;
            }
            return true;
          }
          if (n <= state.numCapturingParens) {
            return true;
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatKGroupName = function(state) {
        if (state.eat(
          107
          /* k */
        )) {
          if (this.regexp_eatGroupName(state)) {
            state.backReferenceNames.push(state.lastStringValue);
            return true;
          }
          state.raise("Invalid named reference");
        }
        return false;
      };
      pp$12.regexp_eatCharacterEscape = function(state) {
        return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
      };
      pp$12.regexp_eatCControlLetter = function(state) {
        var start2 = state.pos;
        if (state.eat(
          99
          /* c */
        )) {
          if (this.regexp_eatControlLetter(state)) {
            return true;
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatZero = function(state) {
        if (state.current() === 48 && !isDecimalDigit2(state.lookahead())) {
          state.lastIntValue = 0;
          state.advance();
          return true;
        }
        return false;
      };
      pp$12.regexp_eatControlEscape = function(state) {
        var ch = state.current();
        if (ch === 116) {
          state.lastIntValue = 9;
          state.advance();
          return true;
        }
        if (ch === 110) {
          state.lastIntValue = 10;
          state.advance();
          return true;
        }
        if (ch === 118) {
          state.lastIntValue = 11;
          state.advance();
          return true;
        }
        if (ch === 102) {
          state.lastIntValue = 12;
          state.advance();
          return true;
        }
        if (ch === 114) {
          state.lastIntValue = 13;
          state.advance();
          return true;
        }
        return false;
      };
      pp$12.regexp_eatControlLetter = function(state) {
        var ch = state.current();
        if (isControlLetter2(ch)) {
          state.lastIntValue = ch % 32;
          state.advance();
          return true;
        }
        return false;
      };
      function isControlLetter2(ch) {
        return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
      }
      pp$12.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
        if (forceU === void 0) forceU = false;
        var start2 = state.pos;
        var switchU = forceU || state.switchU;
        if (state.eat(
          117
          /* u */
        )) {
          if (this.regexp_eatFixedHexDigits(state, 4)) {
            var lead = state.lastIntValue;
            if (switchU && lead >= 55296 && lead <= 56319) {
              var leadSurrogateEnd = state.pos;
              if (state.eat(
                92
                /* \ */
              ) && state.eat(
                117
                /* u */
              ) && this.regexp_eatFixedHexDigits(state, 4)) {
                var trail2 = state.lastIntValue;
                if (trail2 >= 56320 && trail2 <= 57343) {
                  state.lastIntValue = (lead - 55296) * 1024 + (trail2 - 56320) + 65536;
                  return true;
                }
              }
              state.pos = leadSurrogateEnd;
              state.lastIntValue = lead;
            }
            return true;
          }
          if (switchU && state.eat(
            123
            /* { */
          ) && this.regexp_eatHexDigits(state) && state.eat(
            125
            /* } */
          ) && isValidUnicode2(state.lastIntValue)) {
            return true;
          }
          if (switchU) {
            state.raise("Invalid unicode escape");
          }
          state.pos = start2;
        }
        return false;
      };
      function isValidUnicode2(ch) {
        return ch >= 0 && ch <= 1114111;
      }
      pp$12.regexp_eatIdentityEscape = function(state) {
        if (state.switchU) {
          if (this.regexp_eatSyntaxCharacter(state)) {
            return true;
          }
          if (state.eat(
            47
            /* / */
          )) {
            state.lastIntValue = 47;
            return true;
          }
          return false;
        }
        var ch = state.current();
        if (ch !== 99 && (!state.switchN || ch !== 107)) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      pp$12.regexp_eatDecimalEscape = function(state) {
        state.lastIntValue = 0;
        var ch = state.current();
        if (ch >= 49 && ch <= 57) {
          do {
            state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
            state.advance();
          } while ((ch = state.current()) >= 48 && ch <= 57);
          return true;
        }
        return false;
      };
      var CharSetNone2 = 0;
      var CharSetOk2 = 1;
      var CharSetString2 = 2;
      pp$12.regexp_eatCharacterClassEscape = function(state) {
        var ch = state.current();
        if (isCharacterClassEscape2(ch)) {
          state.lastIntValue = -1;
          state.advance();
          return CharSetOk2;
        }
        var negate = false;
        if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch === 80) || ch === 112)) {
          state.lastIntValue = -1;
          state.advance();
          var result;
          if (state.eat(
            123
            /* { */
          ) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(
            125
            /* } */
          )) {
            if (negate && result === CharSetString2) {
              state.raise("Invalid property name");
            }
            return result;
          }
          state.raise("Invalid property name");
        }
        return CharSetNone2;
      };
      function isCharacterClassEscape2(ch) {
        return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
      }
      pp$12.regexp_eatUnicodePropertyValueExpression = function(state) {
        var start2 = state.pos;
        if (this.regexp_eatUnicodePropertyName(state) && state.eat(
          61
          /* = */
        )) {
          var name2 = state.lastStringValue;
          if (this.regexp_eatUnicodePropertyValue(state)) {
            var value2 = state.lastStringValue;
            this.regexp_validateUnicodePropertyNameAndValue(state, name2, value2);
            return CharSetOk2;
          }
        }
        state.pos = start2;
        if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
          var nameOrValue = state.lastStringValue;
          return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
        }
        return CharSetNone2;
      };
      pp$12.regexp_validateUnicodePropertyNameAndValue = function(state, name2, value2) {
        if (!hasOwn2(state.unicodeProperties.nonBinary, name2)) {
          state.raise("Invalid property name");
        }
        if (!state.unicodeProperties.nonBinary[name2].test(value2)) {
          state.raise("Invalid property value");
        }
      };
      pp$12.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
        if (state.unicodeProperties.binary.test(nameOrValue)) {
          return CharSetOk2;
        }
        if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) {
          return CharSetString2;
        }
        state.raise("Invalid property name");
      };
      pp$12.regexp_eatUnicodePropertyName = function(state) {
        var ch = 0;
        state.lastStringValue = "";
        while (isUnicodePropertyNameCharacter2(ch = state.current())) {
          state.lastStringValue += codePointToString2(ch);
          state.advance();
        }
        return state.lastStringValue !== "";
      };
      function isUnicodePropertyNameCharacter2(ch) {
        return isControlLetter2(ch) || ch === 95;
      }
      pp$12.regexp_eatUnicodePropertyValue = function(state) {
        var ch = 0;
        state.lastStringValue = "";
        while (isUnicodePropertyValueCharacter2(ch = state.current())) {
          state.lastStringValue += codePointToString2(ch);
          state.advance();
        }
        return state.lastStringValue !== "";
      };
      function isUnicodePropertyValueCharacter2(ch) {
        return isUnicodePropertyNameCharacter2(ch) || isDecimalDigit2(ch);
      }
      pp$12.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
        return this.regexp_eatUnicodePropertyValue(state);
      };
      pp$12.regexp_eatCharacterClass = function(state) {
        if (state.eat(
          91
          /* [ */
        )) {
          var negate = state.eat(
            94
            /* ^ */
          );
          var result = this.regexp_classContents(state);
          if (!state.eat(
            93
            /* ] */
          )) {
            state.raise("Unterminated character class");
          }
          if (negate && result === CharSetString2) {
            state.raise("Negated character class may contain strings");
          }
          return true;
        }
        return false;
      };
      pp$12.regexp_classContents = function(state) {
        if (state.current() === 93) {
          return CharSetOk2;
        }
        if (state.switchV) {
          return this.regexp_classSetExpression(state);
        }
        this.regexp_nonEmptyClassRanges(state);
        return CharSetOk2;
      };
      pp$12.regexp_nonEmptyClassRanges = function(state) {
        while (this.regexp_eatClassAtom(state)) {
          var left = state.lastIntValue;
          if (state.eat(
            45
            /* - */
          ) && this.regexp_eatClassAtom(state)) {
            var right = state.lastIntValue;
            if (state.switchU && (left === -1 || right === -1)) {
              state.raise("Invalid character class");
            }
            if (left !== -1 && right !== -1 && left > right) {
              state.raise("Range out of order in character class");
            }
          }
        }
      };
      pp$12.regexp_eatClassAtom = function(state) {
        var start2 = state.pos;
        if (state.eat(
          92
          /* \ */
        )) {
          if (this.regexp_eatClassEscape(state)) {
            return true;
          }
          if (state.switchU) {
            var ch$1 = state.current();
            if (ch$1 === 99 || isOctalDigit2(ch$1)) {
              state.raise("Invalid class escape");
            }
            state.raise("Invalid escape");
          }
          state.pos = start2;
        }
        var ch = state.current();
        if (ch !== 93) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      pp$12.regexp_eatClassEscape = function(state) {
        var start2 = state.pos;
        if (state.eat(
          98
          /* b */
        )) {
          state.lastIntValue = 8;
          return true;
        }
        if (state.switchU && state.eat(
          45
          /* - */
        )) {
          state.lastIntValue = 45;
          return true;
        }
        if (!state.switchU && state.eat(
          99
          /* c */
        )) {
          if (this.regexp_eatClassControlLetter(state)) {
            return true;
          }
          state.pos = start2;
        }
        return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
      };
      pp$12.regexp_classSetExpression = function(state) {
        var result = CharSetOk2, subResult;
        if (this.regexp_eatClassSetRange(state)) ;
        else if (subResult = this.regexp_eatClassSetOperand(state)) {
          if (subResult === CharSetString2) {
            result = CharSetString2;
          }
          var start2 = state.pos;
          while (state.eatChars(
            [38, 38]
            /* && */
          )) {
            if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
              if (subResult !== CharSetString2) {
                result = CharSetOk2;
              }
              continue;
            }
            state.raise("Invalid character in character class");
          }
          if (start2 !== state.pos) {
            return result;
          }
          while (state.eatChars(
            [45, 45]
            /* -- */
          )) {
            if (this.regexp_eatClassSetOperand(state)) {
              continue;
            }
            state.raise("Invalid character in character class");
          }
          if (start2 !== state.pos) {
            return result;
          }
        } else {
          state.raise("Invalid character in character class");
        }
        for (; ; ) {
          if (this.regexp_eatClassSetRange(state)) {
            continue;
          }
          subResult = this.regexp_eatClassSetOperand(state);
          if (!subResult) {
            return result;
          }
          if (subResult === CharSetString2) {
            result = CharSetString2;
          }
        }
      };
      pp$12.regexp_eatClassSetRange = function(state) {
        var start2 = state.pos;
        if (this.regexp_eatClassSetCharacter(state)) {
          var left = state.lastIntValue;
          if (state.eat(
            45
            /* - */
          ) && this.regexp_eatClassSetCharacter(state)) {
            var right = state.lastIntValue;
            if (left !== -1 && right !== -1 && left > right) {
              state.raise("Range out of order in character class");
            }
            return true;
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatClassSetOperand = function(state) {
        if (this.regexp_eatClassSetCharacter(state)) {
          return CharSetOk2;
        }
        return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
      };
      pp$12.regexp_eatNestedClass = function(state) {
        var start2 = state.pos;
        if (state.eat(
          91
          /* [ */
        )) {
          var negate = state.eat(
            94
            /* ^ */
          );
          var result = this.regexp_classContents(state);
          if (state.eat(
            93
            /* ] */
          )) {
            if (negate && result === CharSetString2) {
              state.raise("Negated character class may contain strings");
            }
            return result;
          }
          state.pos = start2;
        }
        if (state.eat(
          92
          /* \ */
        )) {
          var result$1 = this.regexp_eatCharacterClassEscape(state);
          if (result$1) {
            return result$1;
          }
          state.pos = start2;
        }
        return null;
      };
      pp$12.regexp_eatClassStringDisjunction = function(state) {
        var start2 = state.pos;
        if (state.eatChars(
          [92, 113]
          /* \q */
        )) {
          if (state.eat(
            123
            /* { */
          )) {
            var result = this.regexp_classStringDisjunctionContents(state);
            if (state.eat(
              125
              /* } */
            )) {
              return result;
            }
          } else {
            state.raise("Invalid escape");
          }
          state.pos = start2;
        }
        return null;
      };
      pp$12.regexp_classStringDisjunctionContents = function(state) {
        var result = this.regexp_classString(state);
        while (state.eat(
          124
          /* | */
        )) {
          if (this.regexp_classString(state) === CharSetString2) {
            result = CharSetString2;
          }
        }
        return result;
      };
      pp$12.regexp_classString = function(state) {
        var count = 0;
        while (this.regexp_eatClassSetCharacter(state)) {
          count++;
        }
        return count === 1 ? CharSetOk2 : CharSetString2;
      };
      pp$12.regexp_eatClassSetCharacter = function(state) {
        var start2 = state.pos;
        if (state.eat(
          92
          /* \ */
        )) {
          if (this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state)) {
            return true;
          }
          if (state.eat(
            98
            /* b */
          )) {
            state.lastIntValue = 8;
            return true;
          }
          state.pos = start2;
          return false;
        }
        var ch = state.current();
        if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter2(ch)) {
          return false;
        }
        if (isClassSetSyntaxCharacter2(ch)) {
          return false;
        }
        state.advance();
        state.lastIntValue = ch;
        return true;
      };
      function isClassSetReservedDoublePunctuatorCharacter2(ch) {
        return ch === 33 || ch >= 35 && ch <= 38 || ch >= 42 && ch <= 44 || ch === 46 || ch >= 58 && ch <= 64 || ch === 94 || ch === 96 || ch === 126;
      }
      function isClassSetSyntaxCharacter2(ch) {
        return ch === 40 || ch === 41 || ch === 45 || ch === 47 || ch >= 91 && ch <= 93 || ch >= 123 && ch <= 125;
      }
      pp$12.regexp_eatClassSetReservedPunctuator = function(state) {
        var ch = state.current();
        if (isClassSetReservedPunctuator2(ch)) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      function isClassSetReservedPunctuator2(ch) {
        return ch === 33 || ch === 35 || ch === 37 || ch === 38 || ch === 44 || ch === 45 || ch >= 58 && ch <= 62 || ch === 64 || ch === 96 || ch === 126;
      }
      pp$12.regexp_eatClassControlLetter = function(state) {
        var ch = state.current();
        if (isDecimalDigit2(ch) || ch === 95) {
          state.lastIntValue = ch % 32;
          state.advance();
          return true;
        }
        return false;
      };
      pp$12.regexp_eatHexEscapeSequence = function(state) {
        var start2 = state.pos;
        if (state.eat(
          120
          /* x */
        )) {
          if (this.regexp_eatFixedHexDigits(state, 2)) {
            return true;
          }
          if (state.switchU) {
            state.raise("Invalid escape");
          }
          state.pos = start2;
        }
        return false;
      };
      pp$12.regexp_eatDecimalDigits = function(state) {
        var start2 = state.pos;
        var ch = 0;
        state.lastIntValue = 0;
        while (isDecimalDigit2(ch = state.current())) {
          state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
          state.advance();
        }
        return state.pos !== start2;
      };
      function isDecimalDigit2(ch) {
        return ch >= 48 && ch <= 57;
      }
      pp$12.regexp_eatHexDigits = function(state) {
        var start2 = state.pos;
        var ch = 0;
        state.lastIntValue = 0;
        while (isHexDigit2(ch = state.current())) {
          state.lastIntValue = 16 * state.lastIntValue + hexToInt2(ch);
          state.advance();
        }
        return state.pos !== start2;
      };
      function isHexDigit2(ch) {
        return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
      }
      function hexToInt2(ch) {
        if (ch >= 65 && ch <= 70) {
          return 10 + (ch - 65);
        }
        if (ch >= 97 && ch <= 102) {
          return 10 + (ch - 97);
        }
        return ch - 48;
      }
      pp$12.regexp_eatLegacyOctalEscapeSequence = function(state) {
        if (this.regexp_eatOctalDigit(state)) {
          var n1 = state.lastIntValue;
          if (this.regexp_eatOctalDigit(state)) {
            var n2 = state.lastIntValue;
            if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
              state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
            } else {
              state.lastIntValue = n1 * 8 + n2;
            }
          } else {
            state.lastIntValue = n1;
          }
          return true;
        }
        return false;
      };
      pp$12.regexp_eatOctalDigit = function(state) {
        var ch = state.current();
        if (isOctalDigit2(ch)) {
          state.lastIntValue = ch - 48;
          state.advance();
          return true;
        }
        state.lastIntValue = 0;
        return false;
      };
      function isOctalDigit2(ch) {
        return ch >= 48 && ch <= 55;
      }
      pp$12.regexp_eatFixedHexDigits = function(state, length) {
        var start2 = state.pos;
        state.lastIntValue = 0;
        for (var i2 = 0; i2 < length; ++i2) {
          var ch = state.current();
          if (!isHexDigit2(ch)) {
            state.pos = start2;
            return false;
          }
          state.lastIntValue = 16 * state.lastIntValue + hexToInt2(ch);
          state.advance();
        }
        return true;
      };
      var Token3 = function Token4(p) {
        this.type = p.type;
        this.value = p.value;
        this.start = p.start;
        this.end = p.end;
        if (p.options.locations) {
          this.loc = new SourceLocation3(p, p.startLoc, p.endLoc);
        }
        if (p.options.ranges) {
          this.range = [p.start, p.end];
        }
      };
      var pp2 = Parser3.prototype;
      pp2.next = function(ignoreEscapeSequenceInKeyword) {
        if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
          this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
        }
        if (this.options.onToken) {
          this.options.onToken(new Token3(this));
        }
        this.lastTokEnd = this.end;
        this.lastTokStart = this.start;
        this.lastTokEndLoc = this.endLoc;
        this.lastTokStartLoc = this.startLoc;
        this.nextToken();
      };
      pp2.getToken = function() {
        this.next();
        return new Token3(this);
      };
      if (typeof Symbol !== "undefined") {
        pp2[Symbol.iterator] = function() {
          var this$1$1 = this;
          return {
            next: function() {
              var token = this$1$1.getToken();
              return {
                done: token.type === types$12.eof,
                value: token
              };
            }
          };
        };
      }
      pp2.nextToken = function() {
        var curContext = this.curContext();
        if (!curContext || !curContext.preserveSpace) {
          this.skipSpace();
        }
        this.start = this.pos;
        if (this.options.locations) {
          this.startLoc = this.curPosition();
        }
        if (this.pos >= this.input.length) {
          return this.finishToken(types$12.eof);
        }
        if (curContext.override) {
          return curContext.override(this);
        } else {
          this.readToken(this.fullCharCodeAtPos());
        }
      };
      pp2.readToken = function(code3) {
        if (isIdentifierStart2(code3, this.options.ecmaVersion >= 6) || code3 === 92) {
          return this.readWord();
        }
        return this.getTokenFromCode(code3);
      };
      pp2.fullCharCodeAt = function(pos) {
        var code3 = this.input.charCodeAt(pos);
        if (code3 <= 55295 || code3 >= 56320) {
          return code3;
        }
        var next = this.input.charCodeAt(pos + 1);
        return next <= 56319 || next >= 57344 ? code3 : (code3 << 10) + next - 56613888;
      };
      pp2.fullCharCodeAtPos = function() {
        return this.fullCharCodeAt(this.pos);
      };
      pp2.skipBlockComment = function() {
        var startLoc = this.options.onComment && this.curPosition();
        var start2 = this.pos, end = this.input.indexOf("*/", this.pos += 2);
        if (end === -1) {
          this.raise(this.pos - 2, "Unterminated comment");
        }
        this.pos = end + 2;
        if (this.options.locations) {
          for (var nextBreak = void 0, pos = start2; (nextBreak = nextLineBreak2(this.input, pos, this.pos)) > -1; ) {
            ++this.curLine;
            pos = this.lineStart = nextBreak;
          }
        }
        if (this.options.onComment) {
          this.options.onComment(
            true,
            this.input.slice(start2 + 2, end),
            start2,
            this.pos,
            startLoc,
            this.curPosition()
          );
        }
      };
      pp2.skipLineComment = function(startSkip) {
        var start2 = this.pos;
        var startLoc = this.options.onComment && this.curPosition();
        var ch = this.input.charCodeAt(this.pos += startSkip);
        while (this.pos < this.input.length && !isNewLine2(ch)) {
          ch = this.input.charCodeAt(++this.pos);
        }
        if (this.options.onComment) {
          this.options.onComment(
            false,
            this.input.slice(start2 + startSkip, this.pos),
            start2,
            this.pos,
            startLoc,
            this.curPosition()
          );
        }
      };
      pp2.skipSpace = function() {
        loop: while (this.pos < this.input.length) {
          var ch = this.input.charCodeAt(this.pos);
          switch (ch) {
            case 32:
            case 160:
              ++this.pos;
              break;
            case 13:
              if (this.input.charCodeAt(this.pos + 1) === 10) {
                ++this.pos;
              }
            case 10:
            case 8232:
            case 8233:
              ++this.pos;
              if (this.options.locations) {
                ++this.curLine;
                this.lineStart = this.pos;
              }
              break;
            case 47:
              switch (this.input.charCodeAt(this.pos + 1)) {
                case 42:
                  this.skipBlockComment();
                  break;
                case 47:
                  this.skipLineComment(2);
                  break;
                default:
                  break loop;
              }
              break;
            default:
              if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace2.test(String.fromCharCode(ch))) {
                ++this.pos;
              } else {
                break loop;
              }
          }
        }
      };
      pp2.finishToken = function(type, val) {
        this.end = this.pos;
        if (this.options.locations) {
          this.endLoc = this.curPosition();
        }
        var prevType = this.type;
        this.type = type;
        this.value = val;
        this.updateContext(prevType);
      };
      pp2.readToken_dot = function() {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next >= 48 && next <= 57) {
          return this.readNumber(true);
        }
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
          this.pos += 3;
          return this.finishToken(types$12.ellipsis);
        } else {
          ++this.pos;
          return this.finishToken(types$12.dot);
        }
      };
      pp2.readToken_slash = function() {
        var next = this.input.charCodeAt(this.pos + 1);
        if (this.exprAllowed) {
          ++this.pos;
          return this.readRegexp();
        }
        if (next === 61) {
          return this.finishOp(types$12.assign, 2);
        }
        return this.finishOp(types$12.slash, 1);
      };
      pp2.readToken_mult_modulo_exp = function(code3) {
        var next = this.input.charCodeAt(this.pos + 1);
        var size = 1;
        var tokentype = code3 === 42 ? types$12.star : types$12.modulo;
        if (this.options.ecmaVersion >= 7 && code3 === 42 && next === 42) {
          ++size;
          tokentype = types$12.starstar;
          next = this.input.charCodeAt(this.pos + 2);
        }
        if (next === 61) {
          return this.finishOp(types$12.assign, size + 1);
        }
        return this.finishOp(tokentype, size);
      };
      pp2.readToken_pipe_amp = function(code3) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === code3) {
          if (this.options.ecmaVersion >= 12) {
            var next2 = this.input.charCodeAt(this.pos + 2);
            if (next2 === 61) {
              return this.finishOp(types$12.assign, 3);
            }
          }
          return this.finishOp(code3 === 124 ? types$12.logicalOR : types$12.logicalAND, 2);
        }
        if (next === 61) {
          return this.finishOp(types$12.assign, 2);
        }
        return this.finishOp(code3 === 124 ? types$12.bitwiseOR : types$12.bitwiseAND, 1);
      };
      pp2.readToken_caret = function() {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 61) {
          return this.finishOp(types$12.assign, 2);
        }
        return this.finishOp(types$12.bitwiseXOR, 1);
      };
      pp2.readToken_plus_min = function(code3) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === code3) {
          if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak2.test(this.input.slice(this.lastTokEnd, this.pos)))) {
            this.skipLineComment(3);
            this.skipSpace();
            return this.nextToken();
          }
          return this.finishOp(types$12.incDec, 2);
        }
        if (next === 61) {
          return this.finishOp(types$12.assign, 2);
        }
        return this.finishOp(types$12.plusMin, 1);
      };
      pp2.readToken_lt_gt = function(code3) {
        var next = this.input.charCodeAt(this.pos + 1);
        var size = 1;
        if (next === code3) {
          size = code3 === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
          if (this.input.charCodeAt(this.pos + size) === 61) {
            return this.finishOp(types$12.assign, size + 1);
          }
          return this.finishOp(types$12.bitShift, size);
        }
        if (next === 33 && code3 === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
          this.skipLineComment(4);
          this.skipSpace();
          return this.nextToken();
        }
        if (next === 61) {
          size = 2;
        }
        return this.finishOp(types$12.relational, size);
      };
      pp2.readToken_eq_excl = function(code3) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 61) {
          return this.finishOp(types$12.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
        }
        if (code3 === 61 && next === 62 && this.options.ecmaVersion >= 6) {
          this.pos += 2;
          return this.finishToken(types$12.arrow);
        }
        return this.finishOp(code3 === 61 ? types$12.eq : types$12.prefix, 1);
      };
      pp2.readToken_question = function() {
        var ecmaVersion2 = this.options.ecmaVersion;
        if (ecmaVersion2 >= 11) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 46) {
            var next2 = this.input.charCodeAt(this.pos + 2);
            if (next2 < 48 || next2 > 57) {
              return this.finishOp(types$12.questionDot, 2);
            }
          }
          if (next === 63) {
            if (ecmaVersion2 >= 12) {
              var next2$1 = this.input.charCodeAt(this.pos + 2);
              if (next2$1 === 61) {
                return this.finishOp(types$12.assign, 3);
              }
            }
            return this.finishOp(types$12.coalesce, 2);
          }
        }
        return this.finishOp(types$12.question, 1);
      };
      pp2.readToken_numberSign = function() {
        var ecmaVersion2 = this.options.ecmaVersion;
        var code3 = 35;
        if (ecmaVersion2 >= 13) {
          ++this.pos;
          code3 = this.fullCharCodeAtPos();
          if (isIdentifierStart2(code3, true) || code3 === 92) {
            return this.finishToken(types$12.privateId, this.readWord1());
          }
        }
        this.raise(this.pos, "Unexpected character '" + codePointToString2(code3) + "'");
      };
      pp2.getTokenFromCode = function(code3) {
        switch (code3) {
          // The interpretation of a dot depends on whether it is followed
          // by a digit or another two dots.
          case 46:
            return this.readToken_dot();
          // Punctuation tokens.
          case 40:
            ++this.pos;
            return this.finishToken(types$12.parenL);
          case 41:
            ++this.pos;
            return this.finishToken(types$12.parenR);
          case 59:
            ++this.pos;
            return this.finishToken(types$12.semi);
          case 44:
            ++this.pos;
            return this.finishToken(types$12.comma);
          case 91:
            ++this.pos;
            return this.finishToken(types$12.bracketL);
          case 93:
            ++this.pos;
            return this.finishToken(types$12.bracketR);
          case 123:
            ++this.pos;
            return this.finishToken(types$12.braceL);
          case 125:
            ++this.pos;
            return this.finishToken(types$12.braceR);
          case 58:
            ++this.pos;
            return this.finishToken(types$12.colon);
          case 96:
            if (this.options.ecmaVersion < 6) {
              break;
            }
            ++this.pos;
            return this.finishToken(types$12.backQuote);
          case 48:
            var next = this.input.charCodeAt(this.pos + 1);
            if (next === 120 || next === 88) {
              return this.readRadixNumber(16);
            }
            if (this.options.ecmaVersion >= 6) {
              if (next === 111 || next === 79) {
                return this.readRadixNumber(8);
              }
              if (next === 98 || next === 66) {
                return this.readRadixNumber(2);
              }
            }
          // Anything else beginning with a digit is an integer, octal
          // number, or float.
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return this.readNumber(false);
          // Quotes produce strings.
          case 34:
          case 39:
            return this.readString(code3);
          // Operators are parsed inline in tiny state machines. '=' (61) is
          // often referred to. `finishOp` simply skips the amount of
          // characters it is given as second argument, and returns a token
          // of the type given by its first argument.
          case 47:
            return this.readToken_slash();
          case 37:
          case 42:
            return this.readToken_mult_modulo_exp(code3);
          case 124:
          case 38:
            return this.readToken_pipe_amp(code3);
          case 94:
            return this.readToken_caret();
          case 43:
          case 45:
            return this.readToken_plus_min(code3);
          case 60:
          case 62:
            return this.readToken_lt_gt(code3);
          case 61:
          case 33:
            return this.readToken_eq_excl(code3);
          case 63:
            return this.readToken_question();
          case 126:
            return this.finishOp(types$12.prefix, 1);
          case 35:
            return this.readToken_numberSign();
        }
        this.raise(this.pos, "Unexpected character '" + codePointToString2(code3) + "'");
      };
      pp2.finishOp = function(type, size) {
        var str = this.input.slice(this.pos, this.pos + size);
        this.pos += size;
        return this.finishToken(type, str);
      };
      pp2.readRegexp = function() {
        var escaped, inClass, start2 = this.pos;
        for (; ; ) {
          if (this.pos >= this.input.length) {
            this.raise(start2, "Unterminated regular expression");
          }
          var ch = this.input.charAt(this.pos);
          if (lineBreak2.test(ch)) {
            this.raise(start2, "Unterminated regular expression");
          }
          if (!escaped) {
            if (ch === "[") {
              inClass = true;
            } else if (ch === "]" && inClass) {
              inClass = false;
            } else if (ch === "/" && !inClass) {
              break;
            }
            escaped = ch === "\\";
          } else {
            escaped = false;
          }
          ++this.pos;
        }
        var pattern = this.input.slice(start2, this.pos);
        ++this.pos;
        var flagsStart = this.pos;
        var flags = this.readWord1();
        if (this.containsEsc) {
          this.unexpected(flagsStart);
        }
        var state = this.regexpState || (this.regexpState = new RegExpValidationState3(this));
        state.reset(start2, pattern, flags);
        this.validateRegExpFlags(state);
        this.validateRegExpPattern(state);
        var value2 = null;
        try {
          value2 = new RegExp(pattern, flags);
        } catch (e) {
        }
        return this.finishToken(types$12.regexp, { pattern, flags, value: value2 });
      };
      pp2.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
        var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0;
        var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
        var start2 = this.pos, total = 0, lastCode = 0;
        for (var i2 = 0, e = len == null ? Infinity : len; i2 < e; ++i2, ++this.pos) {
          var code3 = this.input.charCodeAt(this.pos), val = void 0;
          if (allowSeparators && code3 === 95) {
            if (isLegacyOctalNumericLiteral) {
              this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
            }
            if (lastCode === 95) {
              this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
            }
            if (i2 === 0) {
              this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
            }
            lastCode = code3;
            continue;
          }
          if (code3 >= 97) {
            val = code3 - 97 + 10;
          } else if (code3 >= 65) {
            val = code3 - 65 + 10;
          } else if (code3 >= 48 && code3 <= 57) {
            val = code3 - 48;
          } else {
            val = Infinity;
          }
          if (val >= radix) {
            break;
          }
          lastCode = code3;
          total = total * radix + val;
        }
        if (allowSeparators && lastCode === 95) {
          this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
        }
        if (this.pos === start2 || len != null && this.pos - start2 !== len) {
          return null;
        }
        return total;
      };
      function stringToNumber2(str, isLegacyOctalNumericLiteral) {
        if (isLegacyOctalNumericLiteral) {
          return parseInt(str, 8);
        }
        return parseFloat(str.replace(/_/g, ""));
      }
      function stringToBigInt2(str) {
        if (typeof BigInt !== "function") {
          return null;
        }
        return BigInt(str.replace(/_/g, ""));
      }
      pp2.readRadixNumber = function(radix) {
        var start2 = this.pos;
        this.pos += 2;
        var val = this.readInt(radix);
        if (val == null) {
          this.raise(this.start + 2, "Expected number in radix " + radix);
        }
        if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
          val = stringToBigInt2(this.input.slice(start2, this.pos));
          ++this.pos;
        } else if (isIdentifierStart2(this.fullCharCodeAtPos())) {
          this.raise(this.pos, "Identifier directly after number");
        }
        return this.finishToken(types$12.num, val);
      };
      pp2.readNumber = function(startsWithDot) {
        var start2 = this.pos;
        if (!startsWithDot && this.readInt(10, void 0, true) === null) {
          this.raise(start2, "Invalid number");
        }
        var octal = this.pos - start2 >= 2 && this.input.charCodeAt(start2) === 48;
        if (octal && this.strict) {
          this.raise(start2, "Invalid number");
        }
        var next = this.input.charCodeAt(this.pos);
        if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
          var val$1 = stringToBigInt2(this.input.slice(start2, this.pos));
          ++this.pos;
          if (isIdentifierStart2(this.fullCharCodeAtPos())) {
            this.raise(this.pos, "Identifier directly after number");
          }
          return this.finishToken(types$12.num, val$1);
        }
        if (octal && /[89]/.test(this.input.slice(start2, this.pos))) {
          octal = false;
        }
        if (next === 46 && !octal) {
          ++this.pos;
          this.readInt(10);
          next = this.input.charCodeAt(this.pos);
        }
        if ((next === 69 || next === 101) && !octal) {
          next = this.input.charCodeAt(++this.pos);
          if (next === 43 || next === 45) {
            ++this.pos;
          }
          if (this.readInt(10) === null) {
            this.raise(start2, "Invalid number");
          }
        }
        if (isIdentifierStart2(this.fullCharCodeAtPos())) {
          this.raise(this.pos, "Identifier directly after number");
        }
        var val = stringToNumber2(this.input.slice(start2, this.pos), octal);
        return this.finishToken(types$12.num, val);
      };
      pp2.readCodePoint = function() {
        var ch = this.input.charCodeAt(this.pos), code3;
        if (ch === 123) {
          if (this.options.ecmaVersion < 6) {
            this.unexpected();
          }
          var codePos = ++this.pos;
          code3 = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
          ++this.pos;
          if (code3 > 1114111) {
            this.invalidStringToken(codePos, "Code point out of bounds");
          }
        } else {
          code3 = this.readHexChar(4);
        }
        return code3;
      };
      pp2.readString = function(quote) {
        var out = "", chunkStart = ++this.pos;
        for (; ; ) {
          if (this.pos >= this.input.length) {
            this.raise(this.start, "Unterminated string constant");
          }
          var ch = this.input.charCodeAt(this.pos);
          if (ch === quote) {
            break;
          }
          if (ch === 92) {
            out += this.input.slice(chunkStart, this.pos);
            out += this.readEscapedChar(false);
            chunkStart = this.pos;
          } else if (ch === 8232 || ch === 8233) {
            if (this.options.ecmaVersion < 10) {
              this.raise(this.start, "Unterminated string constant");
            }
            ++this.pos;
            if (this.options.locations) {
              this.curLine++;
              this.lineStart = this.pos;
            }
          } else {
            if (isNewLine2(ch)) {
              this.raise(this.start, "Unterminated string constant");
            }
            ++this.pos;
          }
        }
        out += this.input.slice(chunkStart, this.pos++);
        return this.finishToken(types$12.string, out);
      };
      var INVALID_TEMPLATE_ESCAPE_ERROR2 = {};
      pp2.tryReadTemplateToken = function() {
        this.inTemplateElement = true;
        try {
          this.readTmplToken();
        } catch (err) {
          if (err === INVALID_TEMPLATE_ESCAPE_ERROR2) {
            this.readInvalidTemplateToken();
          } else {
            throw err;
          }
        }
        this.inTemplateElement = false;
      };
      pp2.invalidStringToken = function(position2, message) {
        if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
          throw INVALID_TEMPLATE_ESCAPE_ERROR2;
        } else {
          this.raise(position2, message);
        }
      };
      pp2.readTmplToken = function() {
        var out = "", chunkStart = this.pos;
        for (; ; ) {
          if (this.pos >= this.input.length) {
            this.raise(this.start, "Unterminated template");
          }
          var ch = this.input.charCodeAt(this.pos);
          if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
            if (this.pos === this.start && (this.type === types$12.template || this.type === types$12.invalidTemplate)) {
              if (ch === 36) {
                this.pos += 2;
                return this.finishToken(types$12.dollarBraceL);
              } else {
                ++this.pos;
                return this.finishToken(types$12.backQuote);
              }
            }
            out += this.input.slice(chunkStart, this.pos);
            return this.finishToken(types$12.template, out);
          }
          if (ch === 92) {
            out += this.input.slice(chunkStart, this.pos);
            out += this.readEscapedChar(true);
            chunkStart = this.pos;
          } else if (isNewLine2(ch)) {
            out += this.input.slice(chunkStart, this.pos);
            ++this.pos;
            switch (ch) {
              case 13:
                if (this.input.charCodeAt(this.pos) === 10) {
                  ++this.pos;
                }
              case 10:
                out += "\n";
                break;
              default:
                out += String.fromCharCode(ch);
                break;
            }
            if (this.options.locations) {
              ++this.curLine;
              this.lineStart = this.pos;
            }
            chunkStart = this.pos;
          } else {
            ++this.pos;
          }
        }
      };
      pp2.readInvalidTemplateToken = function() {
        for (; this.pos < this.input.length; this.pos++) {
          switch (this.input[this.pos]) {
            case "\\":
              ++this.pos;
              break;
            case "$":
              if (this.input[this.pos + 1] !== "{") {
                break;
              }
            // fall through
            case "`":
              return this.finishToken(types$12.invalidTemplate, this.input.slice(this.start, this.pos));
            case "\r":
              if (this.input[this.pos + 1] === "\n") {
                ++this.pos;
              }
            // fall through
            case "\n":
            case "\u2028":
            case "\u2029":
              ++this.curLine;
              this.lineStart = this.pos + 1;
              break;
          }
        }
        this.raise(this.start, "Unterminated template");
      };
      pp2.readEscapedChar = function(inTemplate) {
        var ch = this.input.charCodeAt(++this.pos);
        ++this.pos;
        switch (ch) {
          case 110:
            return "\n";
          // 'n' -> '\n'
          case 114:
            return "\r";
          // 'r' -> '\r'
          case 120:
            return String.fromCharCode(this.readHexChar(2));
          // 'x'
          case 117:
            return codePointToString2(this.readCodePoint());
          // 'u'
          case 116:
            return "	";
          // 't' -> '\t'
          case 98:
            return "\b";
          // 'b' -> '\b'
          case 118:
            return "\v";
          // 'v' -> '\u000b'
          case 102:
            return "\f";
          // 'f' -> '\f'
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }
          // '\r\n'
          case 10:
            if (this.options.locations) {
              this.lineStart = this.pos;
              ++this.curLine;
            }
            return "";
          case 56:
          case 57:
            if (this.strict) {
              this.invalidStringToken(
                this.pos - 1,
                "Invalid escape sequence"
              );
            }
            if (inTemplate) {
              var codePos = this.pos - 1;
              this.invalidStringToken(
                codePos,
                "Invalid escape sequence in template string"
              );
            }
          default:
            if (ch >= 48 && ch <= 55) {
              var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
              var octal = parseInt(octalStr, 8);
              if (octal > 255) {
                octalStr = octalStr.slice(0, -1);
                octal = parseInt(octalStr, 8);
              }
              this.pos += octalStr.length - 1;
              ch = this.input.charCodeAt(this.pos);
              if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
                this.invalidStringToken(
                  this.pos - 1 - octalStr.length,
                  inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"
                );
              }
              return String.fromCharCode(octal);
            }
            if (isNewLine2(ch)) {
              if (this.options.locations) {
                this.lineStart = this.pos;
                ++this.curLine;
              }
              return "";
            }
            return String.fromCharCode(ch);
        }
      };
      pp2.readHexChar = function(len) {
        var codePos = this.pos;
        var n = this.readInt(16, len);
        if (n === null) {
          this.invalidStringToken(codePos, "Bad character escape sequence");
        }
        return n;
      };
      pp2.readWord1 = function() {
        this.containsEsc = false;
        var word = "", first = true, chunkStart = this.pos;
        var astral = this.options.ecmaVersion >= 6;
        while (this.pos < this.input.length) {
          var ch = this.fullCharCodeAtPos();
          if (isIdentifierChar2(ch, astral)) {
            this.pos += ch <= 65535 ? 1 : 2;
          } else if (ch === 92) {
            this.containsEsc = true;
            word += this.input.slice(chunkStart, this.pos);
            var escStart = this.pos;
            if (this.input.charCodeAt(++this.pos) !== 117) {
              this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
            }
            ++this.pos;
            var esc = this.readCodePoint();
            if (!(first ? isIdentifierStart2 : isIdentifierChar2)(esc, astral)) {
              this.invalidStringToken(escStart, "Invalid Unicode escape");
            }
            word += codePointToString2(esc);
            chunkStart = this.pos;
          } else {
            break;
          }
          first = false;
        }
        return word + this.input.slice(chunkStart, this.pos);
      };
      pp2.readWord = function() {
        var word = this.readWord1();
        var type = types$12.name;
        if (this.keywords.test(word)) {
          type = keywords2[word];
        }
        return this.finishToken(type, word);
      };
      var version2 = "8.16.0";
      Parser3.acorn = {
        Parser: Parser3,
        version: version2,
        defaultOptions: defaultOptions2,
        Position: Position3,
        SourceLocation: SourceLocation3,
        getLineInfo: getLineInfo2,
        Node: Node3,
        TokenType: TokenType3,
        tokTypes: types$12,
        keywordTypes: keywords2,
        TokContext: TokContext3,
        tokContexts: types2,
        isIdentifierChar: isIdentifierChar2,
        isIdentifierStart: isIdentifierStart2,
        Token: Token3,
        isNewLine: isNewLine2,
        lineBreak: lineBreak2,
        lineBreakG: lineBreakG2,
        nonASCIIwhitespace: nonASCIIwhitespace2
      };
      function parse4(input, options) {
        return Parser3.parse(input, options);
      }
      function parseExpressionAt2(input, pos, options) {
        return Parser3.parseExpressionAt(input, pos, options);
      }
      function tokenizer2(input, options) {
        return Parser3.tokenizer(input, options);
      }
      exports2.Node = Node3;
      exports2.Parser = Parser3;
      exports2.Position = Position3;
      exports2.SourceLocation = SourceLocation3;
      exports2.TokContext = TokContext3;
      exports2.Token = Token3;
      exports2.TokenType = TokenType3;
      exports2.defaultOptions = defaultOptions2;
      exports2.getLineInfo = getLineInfo2;
      exports2.isIdentifierChar = isIdentifierChar2;
      exports2.isIdentifierStart = isIdentifierStart2;
      exports2.isNewLine = isNewLine2;
      exports2.keywordTypes = keywords2;
      exports2.lineBreak = lineBreak2;
      exports2.lineBreakG = lineBreakG2;
      exports2.nonASCIIwhitespace = nonASCIIwhitespace2;
      exports2.parse = parse4;
      exports2.parseExpressionAt = parseExpressionAt2;
      exports2.tokContexts = types2;
      exports2.tokTypes = types$12;
      exports2.tokenizer = tokenizer2;
      exports2.version = version2;
    }));
  }
});

// node_modules/acorn-jsx/index.js
var require_acorn_jsx = __commonJS({
  "node_modules/acorn-jsx/index.js"(exports, module) {
    "use strict";
    var XHTMLEntities = require_xhtml();
    var hexNumber = /^[\da-fA-F]+$/;
    var decimalNumber = /^\d+$/;
    var acornJsxMap = /* @__PURE__ */ new WeakMap();
    function getJsxTokens(acorn) {
      acorn = acorn.Parser.acorn || acorn;
      let acornJsx2 = acornJsxMap.get(acorn);
      if (!acornJsx2) {
        const tt = acorn.tokTypes;
        const TokContext3 = acorn.TokContext;
        const TokenType3 = acorn.TokenType;
        const tc_oTag = new TokContext3("<tag", false);
        const tc_cTag = new TokContext3("</tag", false);
        const tc_expr = new TokContext3("<tag>...</tag>", true, true);
        const tokContexts = {
          tc_oTag,
          tc_cTag,
          tc_expr
        };
        const tokTypes = {
          jsxName: new TokenType3("jsxName"),
          jsxText: new TokenType3("jsxText", { beforeExpr: true }),
          jsxTagStart: new TokenType3("jsxTagStart", { startsExpr: true }),
          jsxTagEnd: new TokenType3("jsxTagEnd")
        };
        tokTypes.jsxTagStart.updateContext = function() {
          this.context.push(tc_expr);
          this.context.push(tc_oTag);
          this.exprAllowed = false;
        };
        tokTypes.jsxTagEnd.updateContext = function(prevType) {
          let out = this.context.pop();
          if (out === tc_oTag && prevType === tt.slash || out === tc_cTag) {
            this.context.pop();
            this.exprAllowed = this.curContext() === tc_expr;
          } else {
            this.exprAllowed = true;
          }
        };
        acornJsx2 = { tokContexts, tokTypes };
        acornJsxMap.set(acorn, acornJsx2);
      }
      return acornJsx2;
    }
    function getQualifiedJSXName(object) {
      if (!object)
        return object;
      if (object.type === "JSXIdentifier")
        return object.name;
      if (object.type === "JSXNamespacedName")
        return object.namespace.name + ":" + object.name.name;
      if (object.type === "JSXMemberExpression")
        return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
    }
    module.exports = function(options) {
      options = options || {};
      return function(Parser3) {
        return plugin({
          allowNamespaces: options.allowNamespaces !== false,
          allowNamespacedObjects: !!options.allowNamespacedObjects
        }, Parser3);
      };
    };
    Object.defineProperty(module.exports, "tokTypes", {
      get: function get_tokTypes() {
        return getJsxTokens(require_acorn()).tokTypes;
      },
      configurable: true,
      enumerable: true
    });
    function plugin(options, Parser3) {
      const acorn = Parser3.acorn || require_acorn();
      const acornJsx2 = getJsxTokens(acorn);
      const tt = acorn.tokTypes;
      const tok = acornJsx2.tokTypes;
      const tokContexts = acorn.tokContexts;
      const tc_oTag = acornJsx2.tokContexts.tc_oTag;
      const tc_cTag = acornJsx2.tokContexts.tc_cTag;
      const tc_expr = acornJsx2.tokContexts.tc_expr;
      const isNewLine2 = acorn.isNewLine;
      const isIdentifierStart2 = acorn.isIdentifierStart;
      const isIdentifierChar2 = acorn.isIdentifierChar;
      return class extends Parser3 {
        // Expose actual `tokTypes` and `tokContexts` to other plugins.
        static get acornJsx() {
          return acornJsx2;
        }
        // Reads inline JSX contents token.
        jsx_readToken() {
          let out = "", chunkStart = this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(this.start, "Unterminated JSX contents");
            let ch = this.input.charCodeAt(this.pos);
            switch (ch) {
              case 60:
              // '<'
              case 123:
                if (this.pos === this.start) {
                  if (ch === 60 && this.exprAllowed) {
                    ++this.pos;
                    return this.finishToken(tok.jsxTagStart);
                  }
                  return this.getTokenFromCode(ch);
                }
                out += this.input.slice(chunkStart, this.pos);
                return this.finishToken(tok.jsxText, out);
              case 38:
                out += this.input.slice(chunkStart, this.pos);
                out += this.jsx_readEntity();
                chunkStart = this.pos;
                break;
              case 62:
              // '>'
              case 125:
                this.raise(
                  this.pos,
                  "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (ch === 62 ? "&gt;" : "&rbrace;") + '` or `{"' + this.input[this.pos] + '"}`?'
                );
              default:
                if (isNewLine2(ch)) {
                  out += this.input.slice(chunkStart, this.pos);
                  out += this.jsx_readNewLine(true);
                  chunkStart = this.pos;
                } else {
                  ++this.pos;
                }
            }
          }
        }
        jsx_readNewLine(normalizeCRLF) {
          let ch = this.input.charCodeAt(this.pos);
          let out;
          ++this.pos;
          if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
            out = normalizeCRLF ? "\n" : "\r\n";
          } else {
            out = String.fromCharCode(ch);
          }
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          return out;
        }
        jsx_readString(quote) {
          let out = "", chunkStart = ++this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(this.start, "Unterminated string constant");
            let ch = this.input.charCodeAt(this.pos);
            if (ch === quote) break;
            if (ch === 38) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readEntity();
              chunkStart = this.pos;
            } else if (isNewLine2(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readNewLine(false);
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        }
        jsx_readEntity() {
          let str = "", count = 0, entity;
          let ch = this.input[this.pos];
          if (ch !== "&")
            this.raise(this.pos, "Entity must start with an ampersand");
          let startPos = ++this.pos;
          while (this.pos < this.input.length && count++ < 10) {
            ch = this.input[this.pos++];
            if (ch === ";") {
              if (str[0] === "#") {
                if (str[1] === "x") {
                  str = str.substr(2);
                  if (hexNumber.test(str))
                    entity = String.fromCharCode(parseInt(str, 16));
                } else {
                  str = str.substr(1);
                  if (decimalNumber.test(str))
                    entity = String.fromCharCode(parseInt(str, 10));
                }
              } else {
                entity = XHTMLEntities[str];
              }
              break;
            }
            str += ch;
          }
          if (!entity) {
            this.pos = startPos;
            return "&";
          }
          return entity;
        }
        // Read a JSX identifier (valid tag or attribute name).
        //
        // Optimized version since JSX identifiers can't contain
        // escape characters and so can be read as single slice.
        // Also assumes that first character was already checked
        // by isIdentifierStart in readToken.
        jsx_readWord() {
          let ch, start2 = this.pos;
          do {
            ch = this.input.charCodeAt(++this.pos);
          } while (isIdentifierChar2(ch) || ch === 45);
          return this.finishToken(tok.jsxName, this.input.slice(start2, this.pos));
        }
        // Parse next token as JSX identifier
        jsx_parseIdentifier() {
          let node2 = this.startNode();
          if (this.type === tok.jsxName)
            node2.name = this.value;
          else if (this.type.keyword)
            node2.name = this.type.keyword;
          else
            this.unexpected();
          this.next();
          return this.finishNode(node2, "JSXIdentifier");
        }
        // Parse namespaced identifier.
        jsx_parseNamespacedName() {
          let startPos = this.start, startLoc = this.startLoc;
          let name2 = this.jsx_parseIdentifier();
          if (!options.allowNamespaces || !this.eat(tt.colon)) return name2;
          var node2 = this.startNodeAt(startPos, startLoc);
          node2.namespace = name2;
          node2.name = this.jsx_parseIdentifier();
          return this.finishNode(node2, "JSXNamespacedName");
        }
        // Parses element name in any form - namespaced, member
        // or single identifier.
        jsx_parseElementName() {
          if (this.type === tok.jsxTagEnd) return "";
          let startPos = this.start, startLoc = this.startLoc;
          let node2 = this.jsx_parseNamespacedName();
          if (this.type === tt.dot && node2.type === "JSXNamespacedName" && !options.allowNamespacedObjects) {
            this.unexpected();
          }
          while (this.eat(tt.dot)) {
            let newNode = this.startNodeAt(startPos, startLoc);
            newNode.object = node2;
            newNode.property = this.jsx_parseIdentifier();
            node2 = this.finishNode(newNode, "JSXMemberExpression");
          }
          return node2;
        }
        // Parses any type of JSX attribute value.
        jsx_parseAttributeValue() {
          switch (this.type) {
            case tt.braceL:
              let node2 = this.jsx_parseExpressionContainer();
              if (node2.expression.type === "JSXEmptyExpression")
                this.raise(node2.start, "JSX attributes must only be assigned a non-empty expression");
              return node2;
            case tok.jsxTagStart:
            case tt.string:
              return this.parseExprAtom();
            default:
              this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
          }
        }
        // JSXEmptyExpression is unique type since it doesn't actually parse anything,
        // and so it should start at the end of last read token (left brace) and finish
        // at the beginning of the next one (right brace).
        jsx_parseEmptyExpression() {
          let node2 = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
          return this.finishNodeAt(node2, "JSXEmptyExpression", this.start, this.startLoc);
        }
        // Parses JSX expression enclosed into curly brackets.
        jsx_parseExpressionContainer() {
          let node2 = this.startNode();
          this.next();
          node2.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
          this.expect(tt.braceR);
          return this.finishNode(node2, "JSXExpressionContainer");
        }
        // Parses following JSX attribute name-value pair.
        jsx_parseAttribute() {
          let node2 = this.startNode();
          if (this.eat(tt.braceL)) {
            this.expect(tt.ellipsis);
            node2.argument = this.parseMaybeAssign();
            this.expect(tt.braceR);
            return this.finishNode(node2, "JSXSpreadAttribute");
          }
          node2.name = this.jsx_parseNamespacedName();
          node2.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
          return this.finishNode(node2, "JSXAttribute");
        }
        // Parses JSX opening tag starting after '<'.
        jsx_parseOpeningElementAt(startPos, startLoc) {
          let node2 = this.startNodeAt(startPos, startLoc);
          node2.attributes = [];
          let nodeName = this.jsx_parseElementName();
          if (nodeName) node2.name = nodeName;
          while (this.type !== tt.slash && this.type !== tok.jsxTagEnd)
            node2.attributes.push(this.jsx_parseAttribute());
          node2.selfClosing = this.eat(tt.slash);
          this.expect(tok.jsxTagEnd);
          return this.finishNode(node2, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
        }
        // Parses JSX closing tag starting after '</'.
        jsx_parseClosingElementAt(startPos, startLoc) {
          let node2 = this.startNodeAt(startPos, startLoc);
          let nodeName = this.jsx_parseElementName();
          if (nodeName) node2.name = nodeName;
          this.expect(tok.jsxTagEnd);
          return this.finishNode(node2, nodeName ? "JSXClosingElement" : "JSXClosingFragment");
        }
        // Parses entire JSX element, including it's opening tag
        // (starting after '<'), attributes, contents and closing tag.
        jsx_parseElementAt(startPos, startLoc) {
          let node2 = this.startNodeAt(startPos, startLoc);
          let children = [];
          let openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
          let closingElement = null;
          if (!openingElement.selfClosing) {
            contents: for (; ; ) {
              switch (this.type) {
                case tok.jsxTagStart:
                  startPos = this.start;
                  startLoc = this.startLoc;
                  this.next();
                  if (this.eat(tt.slash)) {
                    closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                    break contents;
                  }
                  children.push(this.jsx_parseElementAt(startPos, startLoc));
                  break;
                case tok.jsxText:
                  children.push(this.parseExprAtom());
                  break;
                case tt.braceL:
                  children.push(this.jsx_parseExpressionContainer());
                  break;
                default:
                  this.unexpected();
              }
            }
            if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
              this.raise(
                closingElement.start,
                "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">"
              );
            }
          }
          let fragmentOrElement = openingElement.name ? "Element" : "Fragment";
          node2["opening" + fragmentOrElement] = openingElement;
          node2["closing" + fragmentOrElement] = closingElement;
          node2.children = children;
          if (this.type === tt.relational && this.value === "<") {
            this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
          }
          return this.finishNode(node2, "JSX" + fragmentOrElement);
        }
        // Parse JSX text
        jsx_parseText() {
          let node2 = this.parseLiteral(this.value);
          node2.type = "JSXText";
          return node2;
        }
        // Parses entire JSX element from current position.
        jsx_parseElement() {
          let startPos = this.start, startLoc = this.startLoc;
          this.next();
          return this.jsx_parseElementAt(startPos, startLoc);
        }
        parseExprAtom(refShortHandDefaultPos) {
          if (this.type === tok.jsxText)
            return this.jsx_parseText();
          else if (this.type === tok.jsxTagStart)
            return this.jsx_parseElement();
          else
            return super.parseExprAtom(refShortHandDefaultPos);
        }
        readToken(code3) {
          let context = this.curContext();
          if (context === tc_expr) return this.jsx_readToken();
          if (context === tc_oTag || context === tc_cTag) {
            if (isIdentifierStart2(code3)) return this.jsx_readWord();
            if (code3 == 62) {
              ++this.pos;
              return this.finishToken(tok.jsxTagEnd);
            }
            if ((code3 === 34 || code3 === 39) && context == tc_oTag)
              return this.jsx_readString(code3);
          }
          if (code3 === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33) {
            ++this.pos;
            return this.finishToken(tok.jsxTagStart);
          }
          return super.readToken(code3);
        }
        updateContext(prevType) {
          if (this.type == tt.braceL) {
            var curContext = this.curContext();
            if (curContext == tc_oTag) this.context.push(tokContexts.b_expr);
            else if (curContext == tc_expr) this.context.push(tokContexts.b_tmpl);
            else super.updateContext(prevType);
            this.exprAllowed = true;
          } else if (this.type === tt.slash && prevType === tok.jsxTagStart) {
            this.context.length -= 2;
            this.context.push(tc_cTag);
            this.exprAllowed = false;
          } else {
            return super.updateContext(prevType);
          }
        }
      };
    }
  }
});

// node_modules/format/format.js
var require_format = __commonJS({
  "node_modules/format/format.js"(exports, module) {
    (function() {
      var namespace;
      if (typeof module !== "undefined") {
        namespace = module.exports = format;
      } else {
        namespace = (function() {
          return this || (1, eval)("this");
        })();
      }
      namespace.format = format;
      namespace.vsprintf = vsprintf;
      if (typeof console !== "undefined" && typeof console.log === "function") {
        namespace.printf = printf;
      }
      function printf() {
        console.log(format.apply(null, arguments));
      }
      function vsprintf(fmt, replacements) {
        return format.apply(null, [fmt].concat(replacements));
      }
      function format(fmt) {
        var argIndex = 1, args = [].slice.call(arguments), i = 0, n = fmt.length, result = "", c, escaped = false, arg, tmp, leadingZero = false, precision, nextArg = function() {
          return args[argIndex++];
        }, slurpNumber = function() {
          var digits = "";
          while (/\d/.test(fmt[i])) {
            digits += fmt[i++];
            c = fmt[i];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        };
        for (; i < n; ++i) {
          c = fmt[i];
          if (escaped) {
            escaped = false;
            if (c == ".") {
              leadingZero = false;
              c = fmt[++i];
            } else if (c == "0" && fmt[i + 1] == ".") {
              leadingZero = true;
              i += 2;
              c = fmt[i];
            } else {
              leadingZero = true;
            }
            precision = slurpNumber();
            switch (c) {
              case "b":
                result += parseInt(nextArg(), 10).toString(2);
                break;
              case "c":
                arg = nextArg();
                if (typeof arg === "string" || arg instanceof String)
                  result += arg;
                else
                  result += String.fromCharCode(parseInt(arg, 10));
                break;
              case "d":
                result += parseInt(nextArg(), 10);
                break;
              case "f":
                tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
                result += leadingZero ? tmp : tmp.replace(/^0/, "");
                break;
              case "j":
                result += JSON.stringify(nextArg());
                break;
              case "o":
                result += "0" + parseInt(nextArg(), 10).toString(8);
                break;
              case "s":
                result += nextArg();
                break;
              case "x":
                result += "0x" + parseInt(nextArg(), 10).toString(16);
                break;
              case "X":
                result += "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase();
                break;
              default:
                result += c;
                break;
            }
          } else if (c === "%") {
            escaped = true;
          } else {
            result += c;
          }
        }
        return result;
      }
    })();
  }
});

// src/docs-audit-v2.ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path2 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// src/types.ts
var schemaVersion = 1;
var actions = [
  "retained",
  "paraphrase",
  "moved",
  "split",
  "merged",
  "removed"
];
var reasons = [
  "same-scope",
  "redundant",
  "verbose",
  "mis-categorized",
  "generated-source",
  "obsolete",
  "unsupported",
  "duplicate-linking",
  "nav-only"
];
var statuses = [
  "covered",
  "partially-covered",
  "missing",
  "intentionally-removed",
  "needs-source-check"
];
var confidences = ["high", "medium", "low"];
var mappingKinds = [
  "exact-line",
  "semantic-confirmed",
  "generated-source",
  "external-reference",
  "block-fallback"
];

// node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error;
  }
}

// node_modules/unified/lib/index.js
var import_extend = __toESM(require_extend(), 1);

// node_modules/devlop/lib/default.js
function ok() {
}

// node_modules/is-plain-obj/index.js
function isPlainObject(value2) {
  if (typeof value2 !== "object" || value2 === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value2);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value2) && !(Symbol.iterator in value2);
}

// node_modules/trough/lib/index.js
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = (
        /** @type {Error} */
        error
      );
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result && result.then && typeof result.then === "function") {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value2) {
    done(null, value2);
  }
}

// node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value2) {
  if (!value2 || typeof value2 !== "object") {
    return "";
  }
  if ("position" in value2 || "type" in value2) {
    return position(value2.position);
  }
  if ("start" in value2 || "end" in value2) {
    return position(value2);
  }
  if ("line" in value2 || "column" in value2) {
    return point(value2);
  }
  return "";
}
function point(point3) {
  return index(point3 && point3.line) + ":" + index(point3 && point3.column);
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
function index(value2) {
  return value2 && typeof value2 === "number" ? value2 : 1;
}

// node_modules/vfile-message/lib/index.js
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(causeOrReason, optionsOrParentOrPlace, origin) {
    super();
    if (typeof optionsOrParentOrPlace === "string") {
      origin = optionsOrParentOrPlace;
      optionsOrParentOrPlace = void 0;
    }
    let reason = "";
    let options = {};
    let legacyCause = false;
    if (optionsOrParentOrPlace) {
      if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("type" in optionsOrParentOrPlace) {
        options = {
          ancestors: [optionsOrParentOrPlace],
          place: optionsOrParentOrPlace.position
        };
      } else {
        options = { ...optionsOrParentOrPlace };
      }
    }
    if (typeof causeOrReason === "string") {
      reason = causeOrReason;
    } else if (!options.cause && causeOrReason) {
      legacyCause = true;
      reason = causeOrReason.message;
      options.cause = causeOrReason;
    }
    if (!options.ruleId && !options.source && typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        options.ruleId = origin;
      } else {
        options.source = origin.slice(0, index2);
        options.ruleId = origin.slice(index2 + 1);
      }
    }
    if (!options.place && options.ancestors && options.ancestors) {
      const parent = options.ancestors[options.ancestors.length - 1];
      if (parent) {
        options.place = parent.position;
      }
    }
    const start2 = options.place && "start" in options.place ? options.place.start : options.place;
    this.ancestors = options.ancestors || void 0;
    this.cause = options.cause || void 0;
    this.column = start2 ? start2.column : void 0;
    this.fatal = void 0;
    this.file = "";
    this.message = reason;
    this.line = start2 ? start2.line : void 0;
    this.name = stringifyPosition(options.place) || "1:1";
    this.place = options.place || void 0;
    this.reason = this.message;
    this.ruleId = options.ruleId || void 0;
    this.source = options.source || void 0;
    this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
    this.actual = void 0;
    this.expected = void 0;
    this.note = void 0;
    this.url = void 0;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;

// node_modules/vfile/lib/minpath.js
import { default as default2 } from "node:path";

// node_modules/vfile/lib/minproc.js
import { default as default3 } from "node:process";

// node_modules/vfile/lib/minurl.js
import { fileURLToPath } from "node:url";

// node_modules/vfile/lib/minurl.shared.js
function isUrl(fileUrlOrPath) {
  return Boolean(
    fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
    fileUrlOrPath.auth === void 0
  );
}

// node_modules/vfile/lib/index.js
var order = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(value2) {
    let options;
    if (!value2) {
      options = {};
    } else if (isUrl(value2)) {
      options = { path: value2 };
    } else if (typeof value2 === "string" || isUint8Array(value2)) {
      options = { value: value2 };
    } else {
      options = value2;
    }
    this.cwd = "cwd" in options ? "" : default3.cwd();
    this.data = {};
    this.history = [];
    this.messages = [];
    this.value;
    this.map;
    this.result;
    this.stored;
    let index2 = -1;
    while (++index2 < order.length) {
      const field2 = order[index2];
      if (field2 in options && options[field2] !== void 0 && options[field2] !== null) {
        this[field2] = field2 === "history" ? [...options[field2]] : options[field2];
      }
    }
    let field;
    for (field in options) {
      if (!order.includes(field)) {
        this[field] = options[field];
      }
    }
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path === "string" ? default2.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(basename) {
    assertNonEmpty(basename, "basename");
    assertPart(basename, "basename");
    this.path = default2.join(this.dirname || "", basename);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path === "string" ? default2.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(dirname) {
    assertPath(this.basename, "dirname");
    this.path = default2.join(dirname || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path === "string" ? default2.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(extname) {
    assertPart(extname, "extname");
    assertPath(this.dirname, "extname");
    if (extname) {
      if (extname.codePointAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = default2.join(this.dirname, this.stem + (extname || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(path3) {
    if (isUrl(path3)) {
      path3 = fileURLToPath(path3);
    }
    assertNonEmpty(path3, "path");
    if (this.path !== path3) {
      this.history.push(path3);
    }
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path === "string" ? default2.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = default2.join(this.dirname || "", stem + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = true;
    throw message;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = void 0;
    return message;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = new VFileMessage(
      // @ts-expect-error: the overloads are fine.
      causeOrReason,
      optionsOrParentOrPlace,
      origin
    );
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    if (this.value === void 0) {
      return "";
    }
    if (typeof this.value === "string") {
      return this.value;
    }
    const decoder = new TextDecoder(encoding || void 0);
    return decoder.decode(this.value);
  }
};
function assertPart(part, name2) {
  if (part && part.includes(default2.sep)) {
    throw new Error(
      "`" + name2 + "` cannot be a path: did not expect `" + default2.sep + "`"
    );
  }
}
function assertNonEmpty(part, name2) {
  if (!part) {
    throw new Error("`" + name2 + "` cannot be empty");
  }
}
function assertPath(path3, name2) {
  if (!path3) {
    throw new Error("Setting `" + name2 + "` requires `path` to be set too");
  }
}
function isUint8Array(value2) {
  return Boolean(
    value2 && typeof value2 === "object" && "byteLength" in value2 && "byteOffset" in value2
  );
}

// node_modules/unified/lib/callable-instance.js
var CallableInstance = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(property) {
    const self2 = this;
    const constr = self2.constructor;
    const proto = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      constr.prototype
    );
    const value2 = proto[property];
    const apply = function() {
      return value2.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto);
    return apply;
  })
);

// node_modules/unified/lib/index.js
var own = {}.hasOwnProperty;
var Processor = class _Processor extends CallableInstance {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy");
    this.Compiler = void 0;
    this.Parser = void 0;
    this.attachers = [];
    this.compiler = void 0;
    this.freezeIndex = -1;
    this.frozen = void 0;
    this.namespace = {};
    this.parser = void 0;
    this.transformers = trough();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const destination = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new _Processor()
    );
    let index2 = -1;
    while (++index2 < this.attachers.length) {
      const attacher = this.attachers[index2];
      destination.use(...attacher);
    }
    destination.data((0, import_extend.default)(true, {}, this.namespace));
    return destination;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(key, value2) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", this.frozen);
        this.namespace[key] = value2;
        return this;
      }
      return own.call(this.namespace, key) && this.namespace[key] || void 0;
    }
    if (key) {
      assertUnfrozen("data", this.frozen);
      this.namespace = key;
      return this;
    }
    return this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen) {
      return this;
    }
    const self2 = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    while (++this.freezeIndex < this.attachers.length) {
      const [attacher, ...options] = this.attachers[this.freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(self2, ...options);
      if (typeof transformer === "function") {
        this.transformers.use(transformer);
      }
    }
    this.frozen = true;
    this.freezeIndex = Number.POSITIVE_INFINITY;
    return this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(file) {
    this.freeze();
    const realFile = vfile(file);
    const parser = this.parser || this.Parser;
    assertParser("parse", parser);
    return parser(String(realFile), realFile);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(file, done) {
    const self2 = this;
    this.freeze();
    assertParser("process", this.parser || this.Parser);
    assertCompiler("process", this.compiler || this.Compiler);
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve, reject) {
      const realFile = vfile(file);
      const parseTree = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        self2.parse(realFile)
      );
      self2.run(parseTree, realFile, function(error, tree, file2) {
        if (error || !tree || !file2) {
          return realDone(error);
        }
        const compileTree = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          tree
        );
        const compileResult = self2.stringify(compileTree, file2);
        if (looksLikeAValue(compileResult)) {
          file2.value = compileResult;
        } else {
          file2.result = compileResult;
        }
        realDone(
          error,
          /** @type {VFileWithOutput<CompileResult>} */
          file2
        );
      });
      function realDone(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          ok(done, "`done` is defined if `resolve` is not");
          done(void 0, file2);
        }
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(file) {
    let complete = false;
    let result;
    this.freeze();
    assertParser("processSync", this.parser || this.Parser);
    assertCompiler("processSync", this.compiler || this.Compiler);
    this.process(file, realDone);
    assertDone("processSync", "process", complete);
    ok(result, "we either bailed on an error or have a tree");
    return result;
    function realDone(error, file2) {
      complete = true;
      bail(error);
      result = file2;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(tree, file, done) {
    assertNode(tree);
    this.freeze();
    const transformers = this.transformers;
    if (!done && typeof file === "function") {
      done = file;
      file = void 0;
    }
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve, reject) {
      ok(
        typeof file !== "function",
        "`file` can\u2019t be a `done` anymore, we checked"
      );
      const realFile = vfile(file);
      transformers.run(tree, realFile, realDone);
      function realDone(error, outputTree, file2) {
        const resultingTree = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          outputTree || tree
        );
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(resultingTree);
        } else {
          ok(done, "`done` is defined if `resolve` is not");
          done(void 0, resultingTree, file2);
        }
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(tree, file) {
    let complete = false;
    let result;
    this.run(tree, file, realDone);
    assertDone("runSync", "run", complete);
    ok(result, "we either bailed on an error or have a tree");
    return result;
    function realDone(error, tree2) {
      bail(error);
      result = tree2;
      complete = true;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(tree, file) {
    this.freeze();
    const realFile = vfile(file);
    const compiler2 = this.compiler || this.Compiler;
    assertCompiler("stringify", compiler2);
    assertNode(tree);
    return compiler2(tree, realFile);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(value2, ...parameters) {
    const attachers = this.attachers;
    const namespace = this.namespace;
    assertUnfrozen("use", this.frozen);
    if (value2 === null || value2 === void 0) {
    } else if (typeof value2 === "function") {
      addPlugin(value2, parameters);
    } else if (typeof value2 === "object") {
      if (Array.isArray(value2)) {
        addList(value2);
      } else {
        addPreset(value2);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value2 + "`");
    }
    return this;
    function add(value3) {
      if (typeof value3 === "function") {
        addPlugin(value3, []);
      } else if (typeof value3 === "object") {
        if (Array.isArray(value3)) {
          const [plugin, ...parameters2] = (
            /** @type {PluginTuple<Array<unknown>>} */
            value3
          );
          addPlugin(plugin, parameters2);
        } else {
          addPreset(value3);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value3 + "`");
      }
    }
    function addPreset(result) {
      if (!("plugins" in result) && !("settings" in result)) {
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      }
      addList(result.plugins);
      if (result.settings) {
        namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, parameters2) {
      let index2 = -1;
      let entryIndex = -1;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entryIndex = index2;
          break;
        }
      }
      if (entryIndex === -1) {
        attachers.push([plugin, ...parameters2]);
      } else if (parameters2.length > 0) {
        let [primary, ...rest] = parameters2;
        const currentPrimary = attachers[entryIndex][1];
        if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
          primary = (0, import_extend.default)(true, currentPrimary, primary);
        }
        attachers[entryIndex] = [plugin, primary, ...rest];
      }
    }
  }
};
var unified = new Processor().freeze();
function assertParser(name2, value2) {
  if (typeof value2 !== "function") {
    throw new TypeError("Cannot `" + name2 + "` without `parser`");
  }
}
function assertCompiler(name2, value2) {
  if (typeof value2 !== "function") {
    throw new TypeError("Cannot `" + name2 + "` without `compiler`");
  }
}
function assertUnfrozen(name2, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name2 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node2) {
  if (!isPlainObject(node2) || typeof node2.type !== "string") {
    throw new TypeError("Expected node, got `" + node2 + "`");
  }
}
function assertDone(name2, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name2 + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value2) {
  return looksLikeAVFile(value2) ? value2 : new VFile(value2);
}
function looksLikeAVFile(value2) {
  return Boolean(
    value2 && typeof value2 === "object" && "message" in value2 && "messages" in value2
  );
}
function looksLikeAValue(value2) {
  return typeof value2 === "string" || isUint8Array2(value2);
}
function isUint8Array2(value2) {
  return Boolean(
    value2 && typeof value2 === "object" && "byteLength" in value2 && "byteOffset" in value2
  );
}

// node_modules/mdast-util-to-string/lib/index.js
var emptyOptions = {};
function toString(value2, options) {
  const settings = options || emptyOptions;
  const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
  const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
  return one(value2, includeImageAlt, includeHtml);
}
function one(value2, includeImageAlt, includeHtml) {
  if (node(value2)) {
    if ("value" in value2) {
      return value2.type === "html" && !includeHtml ? "" : value2.value;
    }
    if (includeImageAlt && "alt" in value2 && value2.alt) {
      return value2.alt;
    }
    if ("children" in value2) {
      return all(value2.children, includeImageAlt, includeHtml);
    }
  }
  if (Array.isArray(value2)) {
    return all(value2, includeImageAlt, includeHtml);
  }
  return "";
}
function all(values, includeImageAlt, includeHtml) {
  const result = [];
  let index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one(values[index2], includeImageAlt, includeHtml);
  }
  return result.join("");
}
function node(value2) {
  return Boolean(value2 && typeof value2 === "object");
}

// node_modules/character-entities/index.js
var characterEntities = {
  AElig: "\xC6",
  AMP: "&",
  Aacute: "\xC1",
  Abreve: "\u0102",
  Acirc: "\xC2",
  Acy: "\u0410",
  Afr: "\u{1D504}",
  Agrave: "\xC0",
  Alpha: "\u0391",
  Amacr: "\u0100",
  And: "\u2A53",
  Aogon: "\u0104",
  Aopf: "\u{1D538}",
  ApplyFunction: "\u2061",
  Aring: "\xC5",
  Ascr: "\u{1D49C}",
  Assign: "\u2254",
  Atilde: "\xC3",
  Auml: "\xC4",
  Backslash: "\u2216",
  Barv: "\u2AE7",
  Barwed: "\u2306",
  Bcy: "\u0411",
  Because: "\u2235",
  Bernoullis: "\u212C",
  Beta: "\u0392",
  Bfr: "\u{1D505}",
  Bopf: "\u{1D539}",
  Breve: "\u02D8",
  Bscr: "\u212C",
  Bumpeq: "\u224E",
  CHcy: "\u0427",
  COPY: "\xA9",
  Cacute: "\u0106",
  Cap: "\u22D2",
  CapitalDifferentialD: "\u2145",
  Cayleys: "\u212D",
  Ccaron: "\u010C",
  Ccedil: "\xC7",
  Ccirc: "\u0108",
  Cconint: "\u2230",
  Cdot: "\u010A",
  Cedilla: "\xB8",
  CenterDot: "\xB7",
  Cfr: "\u212D",
  Chi: "\u03A7",
  CircleDot: "\u2299",
  CircleMinus: "\u2296",
  CirclePlus: "\u2295",
  CircleTimes: "\u2297",
  ClockwiseContourIntegral: "\u2232",
  CloseCurlyDoubleQuote: "\u201D",
  CloseCurlyQuote: "\u2019",
  Colon: "\u2237",
  Colone: "\u2A74",
  Congruent: "\u2261",
  Conint: "\u222F",
  ContourIntegral: "\u222E",
  Copf: "\u2102",
  Coproduct: "\u2210",
  CounterClockwiseContourIntegral: "\u2233",
  Cross: "\u2A2F",
  Cscr: "\u{1D49E}",
  Cup: "\u22D3",
  CupCap: "\u224D",
  DD: "\u2145",
  DDotrahd: "\u2911",
  DJcy: "\u0402",
  DScy: "\u0405",
  DZcy: "\u040F",
  Dagger: "\u2021",
  Darr: "\u21A1",
  Dashv: "\u2AE4",
  Dcaron: "\u010E",
  Dcy: "\u0414",
  Del: "\u2207",
  Delta: "\u0394",
  Dfr: "\u{1D507}",
  DiacriticalAcute: "\xB4",
  DiacriticalDot: "\u02D9",
  DiacriticalDoubleAcute: "\u02DD",
  DiacriticalGrave: "`",
  DiacriticalTilde: "\u02DC",
  Diamond: "\u22C4",
  DifferentialD: "\u2146",
  Dopf: "\u{1D53B}",
  Dot: "\xA8",
  DotDot: "\u20DC",
  DotEqual: "\u2250",
  DoubleContourIntegral: "\u222F",
  DoubleDot: "\xA8",
  DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0",
  DoubleLeftRightArrow: "\u21D4",
  DoubleLeftTee: "\u2AE4",
  DoubleLongLeftArrow: "\u27F8",
  DoubleLongLeftRightArrow: "\u27FA",
  DoubleLongRightArrow: "\u27F9",
  DoubleRightArrow: "\u21D2",
  DoubleRightTee: "\u22A8",
  DoubleUpArrow: "\u21D1",
  DoubleUpDownArrow: "\u21D5",
  DoubleVerticalBar: "\u2225",
  DownArrow: "\u2193",
  DownArrowBar: "\u2913",
  DownArrowUpArrow: "\u21F5",
  DownBreve: "\u0311",
  DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E",
  DownLeftVector: "\u21BD",
  DownLeftVectorBar: "\u2956",
  DownRightTeeVector: "\u295F",
  DownRightVector: "\u21C1",
  DownRightVectorBar: "\u2957",
  DownTee: "\u22A4",
  DownTeeArrow: "\u21A7",
  Downarrow: "\u21D3",
  Dscr: "\u{1D49F}",
  Dstrok: "\u0110",
  ENG: "\u014A",
  ETH: "\xD0",
  Eacute: "\xC9",
  Ecaron: "\u011A",
  Ecirc: "\xCA",
  Ecy: "\u042D",
  Edot: "\u0116",
  Efr: "\u{1D508}",
  Egrave: "\xC8",
  Element: "\u2208",
  Emacr: "\u0112",
  EmptySmallSquare: "\u25FB",
  EmptyVerySmallSquare: "\u25AB",
  Eogon: "\u0118",
  Eopf: "\u{1D53C}",
  Epsilon: "\u0395",
  Equal: "\u2A75",
  EqualTilde: "\u2242",
  Equilibrium: "\u21CC",
  Escr: "\u2130",
  Esim: "\u2A73",
  Eta: "\u0397",
  Euml: "\xCB",
  Exists: "\u2203",
  ExponentialE: "\u2147",
  Fcy: "\u0424",
  Ffr: "\u{1D509}",
  FilledSmallSquare: "\u25FC",
  FilledVerySmallSquare: "\u25AA",
  Fopf: "\u{1D53D}",
  ForAll: "\u2200",
  Fouriertrf: "\u2131",
  Fscr: "\u2131",
  GJcy: "\u0403",
  GT: ">",
  Gamma: "\u0393",
  Gammad: "\u03DC",
  Gbreve: "\u011E",
  Gcedil: "\u0122",
  Gcirc: "\u011C",
  Gcy: "\u0413",
  Gdot: "\u0120",
  Gfr: "\u{1D50A}",
  Gg: "\u22D9",
  Gopf: "\u{1D53E}",
  GreaterEqual: "\u2265",
  GreaterEqualLess: "\u22DB",
  GreaterFullEqual: "\u2267",
  GreaterGreater: "\u2AA2",
  GreaterLess: "\u2277",
  GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273",
  Gscr: "\u{1D4A2}",
  Gt: "\u226B",
  HARDcy: "\u042A",
  Hacek: "\u02C7",
  Hat: "^",
  Hcirc: "\u0124",
  Hfr: "\u210C",
  HilbertSpace: "\u210B",
  Hopf: "\u210D",
  HorizontalLine: "\u2500",
  Hscr: "\u210B",
  Hstrok: "\u0126",
  HumpDownHump: "\u224E",
  HumpEqual: "\u224F",
  IEcy: "\u0415",
  IJlig: "\u0132",
  IOcy: "\u0401",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Icy: "\u0418",
  Idot: "\u0130",
  Ifr: "\u2111",
  Igrave: "\xCC",
  Im: "\u2111",
  Imacr: "\u012A",
  ImaginaryI: "\u2148",
  Implies: "\u21D2",
  Int: "\u222C",
  Integral: "\u222B",
  Intersection: "\u22C2",
  InvisibleComma: "\u2063",
  InvisibleTimes: "\u2062",
  Iogon: "\u012E",
  Iopf: "\u{1D540}",
  Iota: "\u0399",
  Iscr: "\u2110",
  Itilde: "\u0128",
  Iukcy: "\u0406",
  Iuml: "\xCF",
  Jcirc: "\u0134",
  Jcy: "\u0419",
  Jfr: "\u{1D50D}",
  Jopf: "\u{1D541}",
  Jscr: "\u{1D4A5}",
  Jsercy: "\u0408",
  Jukcy: "\u0404",
  KHcy: "\u0425",
  KJcy: "\u040C",
  Kappa: "\u039A",
  Kcedil: "\u0136",
  Kcy: "\u041A",
  Kfr: "\u{1D50E}",
  Kopf: "\u{1D542}",
  Kscr: "\u{1D4A6}",
  LJcy: "\u0409",
  LT: "<",
  Lacute: "\u0139",
  Lambda: "\u039B",
  Lang: "\u27EA",
  Laplacetrf: "\u2112",
  Larr: "\u219E",
  Lcaron: "\u013D",
  Lcedil: "\u013B",
  Lcy: "\u041B",
  LeftAngleBracket: "\u27E8",
  LeftArrow: "\u2190",
  LeftArrowBar: "\u21E4",
  LeftArrowRightArrow: "\u21C6",
  LeftCeiling: "\u2308",
  LeftDoubleBracket: "\u27E6",
  LeftDownTeeVector: "\u2961",
  LeftDownVector: "\u21C3",
  LeftDownVectorBar: "\u2959",
  LeftFloor: "\u230A",
  LeftRightArrow: "\u2194",
  LeftRightVector: "\u294E",
  LeftTee: "\u22A3",
  LeftTeeArrow: "\u21A4",
  LeftTeeVector: "\u295A",
  LeftTriangle: "\u22B2",
  LeftTriangleBar: "\u29CF",
  LeftTriangleEqual: "\u22B4",
  LeftUpDownVector: "\u2951",
  LeftUpTeeVector: "\u2960",
  LeftUpVector: "\u21BF",
  LeftUpVectorBar: "\u2958",
  LeftVector: "\u21BC",
  LeftVectorBar: "\u2952",
  Leftarrow: "\u21D0",
  Leftrightarrow: "\u21D4",
  LessEqualGreater: "\u22DA",
  LessFullEqual: "\u2266",
  LessGreater: "\u2276",
  LessLess: "\u2AA1",
  LessSlantEqual: "\u2A7D",
  LessTilde: "\u2272",
  Lfr: "\u{1D50F}",
  Ll: "\u22D8",
  Lleftarrow: "\u21DA",
  Lmidot: "\u013F",
  LongLeftArrow: "\u27F5",
  LongLeftRightArrow: "\u27F7",
  LongRightArrow: "\u27F6",
  Longleftarrow: "\u27F8",
  Longleftrightarrow: "\u27FA",
  Longrightarrow: "\u27F9",
  Lopf: "\u{1D543}",
  LowerLeftArrow: "\u2199",
  LowerRightArrow: "\u2198",
  Lscr: "\u2112",
  Lsh: "\u21B0",
  Lstrok: "\u0141",
  Lt: "\u226A",
  Map: "\u2905",
  Mcy: "\u041C",
  MediumSpace: "\u205F",
  Mellintrf: "\u2133",
  Mfr: "\u{1D510}",
  MinusPlus: "\u2213",
  Mopf: "\u{1D544}",
  Mscr: "\u2133",
  Mu: "\u039C",
  NJcy: "\u040A",
  Nacute: "\u0143",
  Ncaron: "\u0147",
  Ncedil: "\u0145",
  Ncy: "\u041D",
  NegativeMediumSpace: "\u200B",
  NegativeThickSpace: "\u200B",
  NegativeThinSpace: "\u200B",
  NegativeVeryThinSpace: "\u200B",
  NestedGreaterGreater: "\u226B",
  NestedLessLess: "\u226A",
  NewLine: "\n",
  Nfr: "\u{1D511}",
  NoBreak: "\u2060",
  NonBreakingSpace: "\xA0",
  Nopf: "\u2115",
  Not: "\u2AEC",
  NotCongruent: "\u2262",
  NotCupCap: "\u226D",
  NotDoubleVerticalBar: "\u2226",
  NotElement: "\u2209",
  NotEqual: "\u2260",
  NotEqualTilde: "\u2242\u0338",
  NotExists: "\u2204",
  NotGreater: "\u226F",
  NotGreaterEqual: "\u2271",
  NotGreaterFullEqual: "\u2267\u0338",
  NotGreaterGreater: "\u226B\u0338",
  NotGreaterLess: "\u2279",
  NotGreaterSlantEqual: "\u2A7E\u0338",
  NotGreaterTilde: "\u2275",
  NotHumpDownHump: "\u224E\u0338",
  NotHumpEqual: "\u224F\u0338",
  NotLeftTriangle: "\u22EA",
  NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangleEqual: "\u22EC",
  NotLess: "\u226E",
  NotLessEqual: "\u2270",
  NotLessGreater: "\u2278",
  NotLessLess: "\u226A\u0338",
  NotLessSlantEqual: "\u2A7D\u0338",
  NotLessTilde: "\u2274",
  NotNestedGreaterGreater: "\u2AA2\u0338",
  NotNestedLessLess: "\u2AA1\u0338",
  NotPrecedes: "\u2280",
  NotPrecedesEqual: "\u2AAF\u0338",
  NotPrecedesSlantEqual: "\u22E0",
  NotReverseElement: "\u220C",
  NotRightTriangle: "\u22EB",
  NotRightTriangleBar: "\u29D0\u0338",
  NotRightTriangleEqual: "\u22ED",
  NotSquareSubset: "\u228F\u0338",
  NotSquareSubsetEqual: "\u22E2",
  NotSquareSuperset: "\u2290\u0338",
  NotSquareSupersetEqual: "\u22E3",
  NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288",
  NotSucceeds: "\u2281",
  NotSucceedsEqual: "\u2AB0\u0338",
  NotSucceedsSlantEqual: "\u22E1",
  NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2",
  NotSupersetEqual: "\u2289",
  NotTilde: "\u2241",
  NotTildeEqual: "\u2244",
  NotTildeFullEqual: "\u2247",
  NotTildeTilde: "\u2249",
  NotVerticalBar: "\u2224",
  Nscr: "\u{1D4A9}",
  Ntilde: "\xD1",
  Nu: "\u039D",
  OElig: "\u0152",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Ocy: "\u041E",
  Odblac: "\u0150",
  Ofr: "\u{1D512}",
  Ograve: "\xD2",
  Omacr: "\u014C",
  Omega: "\u03A9",
  Omicron: "\u039F",
  Oopf: "\u{1D546}",
  OpenCurlyDoubleQuote: "\u201C",
  OpenCurlyQuote: "\u2018",
  Or: "\u2A54",
  Oscr: "\u{1D4AA}",
  Oslash: "\xD8",
  Otilde: "\xD5",
  Otimes: "\u2A37",
  Ouml: "\xD6",
  OverBar: "\u203E",
  OverBrace: "\u23DE",
  OverBracket: "\u23B4",
  OverParenthesis: "\u23DC",
  PartialD: "\u2202",
  Pcy: "\u041F",
  Pfr: "\u{1D513}",
  Phi: "\u03A6",
  Pi: "\u03A0",
  PlusMinus: "\xB1",
  Poincareplane: "\u210C",
  Popf: "\u2119",
  Pr: "\u2ABB",
  Precedes: "\u227A",
  PrecedesEqual: "\u2AAF",
  PrecedesSlantEqual: "\u227C",
  PrecedesTilde: "\u227E",
  Prime: "\u2033",
  Product: "\u220F",
  Proportion: "\u2237",
  Proportional: "\u221D",
  Pscr: "\u{1D4AB}",
  Psi: "\u03A8",
  QUOT: '"',
  Qfr: "\u{1D514}",
  Qopf: "\u211A",
  Qscr: "\u{1D4AC}",
  RBarr: "\u2910",
  REG: "\xAE",
  Racute: "\u0154",
  Rang: "\u27EB",
  Rarr: "\u21A0",
  Rarrtl: "\u2916",
  Rcaron: "\u0158",
  Rcedil: "\u0156",
  Rcy: "\u0420",
  Re: "\u211C",
  ReverseElement: "\u220B",
  ReverseEquilibrium: "\u21CB",
  ReverseUpEquilibrium: "\u296F",
  Rfr: "\u211C",
  Rho: "\u03A1",
  RightAngleBracket: "\u27E9",
  RightArrow: "\u2192",
  RightArrowBar: "\u21E5",
  RightArrowLeftArrow: "\u21C4",
  RightCeiling: "\u2309",
  RightDoubleBracket: "\u27E7",
  RightDownTeeVector: "\u295D",
  RightDownVector: "\u21C2",
  RightDownVectorBar: "\u2955",
  RightFloor: "\u230B",
  RightTee: "\u22A2",
  RightTeeArrow: "\u21A6",
  RightTeeVector: "\u295B",
  RightTriangle: "\u22B3",
  RightTriangleBar: "\u29D0",
  RightTriangleEqual: "\u22B5",
  RightUpDownVector: "\u294F",
  RightUpTeeVector: "\u295C",
  RightUpVector: "\u21BE",
  RightUpVectorBar: "\u2954",
  RightVector: "\u21C0",
  RightVectorBar: "\u2953",
  Rightarrow: "\u21D2",
  Ropf: "\u211D",
  RoundImplies: "\u2970",
  Rrightarrow: "\u21DB",
  Rscr: "\u211B",
  Rsh: "\u21B1",
  RuleDelayed: "\u29F4",
  SHCHcy: "\u0429",
  SHcy: "\u0428",
  SOFTcy: "\u042C",
  Sacute: "\u015A",
  Sc: "\u2ABC",
  Scaron: "\u0160",
  Scedil: "\u015E",
  Scirc: "\u015C",
  Scy: "\u0421",
  Sfr: "\u{1D516}",
  ShortDownArrow: "\u2193",
  ShortLeftArrow: "\u2190",
  ShortRightArrow: "\u2192",
  ShortUpArrow: "\u2191",
  Sigma: "\u03A3",
  SmallCircle: "\u2218",
  Sopf: "\u{1D54A}",
  Sqrt: "\u221A",
  Square: "\u25A1",
  SquareIntersection: "\u2293",
  SquareSubset: "\u228F",
  SquareSubsetEqual: "\u2291",
  SquareSuperset: "\u2290",
  SquareSupersetEqual: "\u2292",
  SquareUnion: "\u2294",
  Sscr: "\u{1D4AE}",
  Star: "\u22C6",
  Sub: "\u22D0",
  Subset: "\u22D0",
  SubsetEqual: "\u2286",
  Succeeds: "\u227B",
  SucceedsEqual: "\u2AB0",
  SucceedsSlantEqual: "\u227D",
  SucceedsTilde: "\u227F",
  SuchThat: "\u220B",
  Sum: "\u2211",
  Sup: "\u22D1",
  Superset: "\u2283",
  SupersetEqual: "\u2287",
  Supset: "\u22D1",
  THORN: "\xDE",
  TRADE: "\u2122",
  TSHcy: "\u040B",
  TScy: "\u0426",
  Tab: "	",
  Tau: "\u03A4",
  Tcaron: "\u0164",
  Tcedil: "\u0162",
  Tcy: "\u0422",
  Tfr: "\u{1D517}",
  Therefore: "\u2234",
  Theta: "\u0398",
  ThickSpace: "\u205F\u200A",
  ThinSpace: "\u2009",
  Tilde: "\u223C",
  TildeEqual: "\u2243",
  TildeFullEqual: "\u2245",
  TildeTilde: "\u2248",
  Topf: "\u{1D54B}",
  TripleDot: "\u20DB",
  Tscr: "\u{1D4AF}",
  Tstrok: "\u0166",
  Uacute: "\xDA",
  Uarr: "\u219F",
  Uarrocir: "\u2949",
  Ubrcy: "\u040E",
  Ubreve: "\u016C",
  Ucirc: "\xDB",
  Ucy: "\u0423",
  Udblac: "\u0170",
  Ufr: "\u{1D518}",
  Ugrave: "\xD9",
  Umacr: "\u016A",
  UnderBar: "_",
  UnderBrace: "\u23DF",
  UnderBracket: "\u23B5",
  UnderParenthesis: "\u23DD",
  Union: "\u22C3",
  UnionPlus: "\u228E",
  Uogon: "\u0172",
  Uopf: "\u{1D54C}",
  UpArrow: "\u2191",
  UpArrowBar: "\u2912",
  UpArrowDownArrow: "\u21C5",
  UpDownArrow: "\u2195",
  UpEquilibrium: "\u296E",
  UpTee: "\u22A5",
  UpTeeArrow: "\u21A5",
  Uparrow: "\u21D1",
  Updownarrow: "\u21D5",
  UpperLeftArrow: "\u2196",
  UpperRightArrow: "\u2197",
  Upsi: "\u03D2",
  Upsilon: "\u03A5",
  Uring: "\u016E",
  Uscr: "\u{1D4B0}",
  Utilde: "\u0168",
  Uuml: "\xDC",
  VDash: "\u22AB",
  Vbar: "\u2AEB",
  Vcy: "\u0412",
  Vdash: "\u22A9",
  Vdashl: "\u2AE6",
  Vee: "\u22C1",
  Verbar: "\u2016",
  Vert: "\u2016",
  VerticalBar: "\u2223",
  VerticalLine: "|",
  VerticalSeparator: "\u2758",
  VerticalTilde: "\u2240",
  VeryThinSpace: "\u200A",
  Vfr: "\u{1D519}",
  Vopf: "\u{1D54D}",
  Vscr: "\u{1D4B1}",
  Vvdash: "\u22AA",
  Wcirc: "\u0174",
  Wedge: "\u22C0",
  Wfr: "\u{1D51A}",
  Wopf: "\u{1D54E}",
  Wscr: "\u{1D4B2}",
  Xfr: "\u{1D51B}",
  Xi: "\u039E",
  Xopf: "\u{1D54F}",
  Xscr: "\u{1D4B3}",
  YAcy: "\u042F",
  YIcy: "\u0407",
  YUcy: "\u042E",
  Yacute: "\xDD",
  Ycirc: "\u0176",
  Ycy: "\u042B",
  Yfr: "\u{1D51C}",
  Yopf: "\u{1D550}",
  Yscr: "\u{1D4B4}",
  Yuml: "\u0178",
  ZHcy: "\u0416",
  Zacute: "\u0179",
  Zcaron: "\u017D",
  Zcy: "\u0417",
  Zdot: "\u017B",
  ZeroWidthSpace: "\u200B",
  Zeta: "\u0396",
  Zfr: "\u2128",
  Zopf: "\u2124",
  Zscr: "\u{1D4B5}",
  aacute: "\xE1",
  abreve: "\u0103",
  ac: "\u223E",
  acE: "\u223E\u0333",
  acd: "\u223F",
  acirc: "\xE2",
  acute: "\xB4",
  acy: "\u0430",
  aelig: "\xE6",
  af: "\u2061",
  afr: "\u{1D51E}",
  agrave: "\xE0",
  alefsym: "\u2135",
  aleph: "\u2135",
  alpha: "\u03B1",
  amacr: "\u0101",
  amalg: "\u2A3F",
  amp: "&",
  and: "\u2227",
  andand: "\u2A55",
  andd: "\u2A5C",
  andslope: "\u2A58",
  andv: "\u2A5A",
  ang: "\u2220",
  ange: "\u29A4",
  angle: "\u2220",
  angmsd: "\u2221",
  angmsdaa: "\u29A8",
  angmsdab: "\u29A9",
  angmsdac: "\u29AA",
  angmsdad: "\u29AB",
  angmsdae: "\u29AC",
  angmsdaf: "\u29AD",
  angmsdag: "\u29AE",
  angmsdah: "\u29AF",
  angrt: "\u221F",
  angrtvb: "\u22BE",
  angrtvbd: "\u299D",
  angsph: "\u2222",
  angst: "\xC5",
  angzarr: "\u237C",
  aogon: "\u0105",
  aopf: "\u{1D552}",
  ap: "\u2248",
  apE: "\u2A70",
  apacir: "\u2A6F",
  ape: "\u224A",
  apid: "\u224B",
  apos: "'",
  approx: "\u2248",
  approxeq: "\u224A",
  aring: "\xE5",
  ascr: "\u{1D4B6}",
  ast: "*",
  asymp: "\u2248",
  asympeq: "\u224D",
  atilde: "\xE3",
  auml: "\xE4",
  awconint: "\u2233",
  awint: "\u2A11",
  bNot: "\u2AED",
  backcong: "\u224C",
  backepsilon: "\u03F6",
  backprime: "\u2035",
  backsim: "\u223D",
  backsimeq: "\u22CD",
  barvee: "\u22BD",
  barwed: "\u2305",
  barwedge: "\u2305",
  bbrk: "\u23B5",
  bbrktbrk: "\u23B6",
  bcong: "\u224C",
  bcy: "\u0431",
  bdquo: "\u201E",
  becaus: "\u2235",
  because: "\u2235",
  bemptyv: "\u29B0",
  bepsi: "\u03F6",
  bernou: "\u212C",
  beta: "\u03B2",
  beth: "\u2136",
  between: "\u226C",
  bfr: "\u{1D51F}",
  bigcap: "\u22C2",
  bigcirc: "\u25EF",
  bigcup: "\u22C3",
  bigodot: "\u2A00",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigsqcup: "\u2A06",
  bigstar: "\u2605",
  bigtriangledown: "\u25BD",
  bigtriangleup: "\u25B3",
  biguplus: "\u2A04",
  bigvee: "\u22C1",
  bigwedge: "\u22C0",
  bkarow: "\u290D",
  blacklozenge: "\u29EB",
  blacksquare: "\u25AA",
  blacktriangle: "\u25B4",
  blacktriangledown: "\u25BE",
  blacktriangleleft: "\u25C2",
  blacktriangleright: "\u25B8",
  blank: "\u2423",
  blk12: "\u2592",
  blk14: "\u2591",
  blk34: "\u2593",
  block: "\u2588",
  bne: "=\u20E5",
  bnequiv: "\u2261\u20E5",
  bnot: "\u2310",
  bopf: "\u{1D553}",
  bot: "\u22A5",
  bottom: "\u22A5",
  bowtie: "\u22C8",
  boxDL: "\u2557",
  boxDR: "\u2554",
  boxDl: "\u2556",
  boxDr: "\u2553",
  boxH: "\u2550",
  boxHD: "\u2566",
  boxHU: "\u2569",
  boxHd: "\u2564",
  boxHu: "\u2567",
  boxUL: "\u255D",
  boxUR: "\u255A",
  boxUl: "\u255C",
  boxUr: "\u2559",
  boxV: "\u2551",
  boxVH: "\u256C",
  boxVL: "\u2563",
  boxVR: "\u2560",
  boxVh: "\u256B",
  boxVl: "\u2562",
  boxVr: "\u255F",
  boxbox: "\u29C9",
  boxdL: "\u2555",
  boxdR: "\u2552",
  boxdl: "\u2510",
  boxdr: "\u250C",
  boxh: "\u2500",
  boxhD: "\u2565",
  boxhU: "\u2568",
  boxhd: "\u252C",
  boxhu: "\u2534",
  boxminus: "\u229F",
  boxplus: "\u229E",
  boxtimes: "\u22A0",
  boxuL: "\u255B",
  boxuR: "\u2558",
  boxul: "\u2518",
  boxur: "\u2514",
  boxv: "\u2502",
  boxvH: "\u256A",
  boxvL: "\u2561",
  boxvR: "\u255E",
  boxvh: "\u253C",
  boxvl: "\u2524",
  boxvr: "\u251C",
  bprime: "\u2035",
  breve: "\u02D8",
  brvbar: "\xA6",
  bscr: "\u{1D4B7}",
  bsemi: "\u204F",
  bsim: "\u223D",
  bsime: "\u22CD",
  bsol: "\\",
  bsolb: "\u29C5",
  bsolhsub: "\u27C8",
  bull: "\u2022",
  bullet: "\u2022",
  bump: "\u224E",
  bumpE: "\u2AAE",
  bumpe: "\u224F",
  bumpeq: "\u224F",
  cacute: "\u0107",
  cap: "\u2229",
  capand: "\u2A44",
  capbrcup: "\u2A49",
  capcap: "\u2A4B",
  capcup: "\u2A47",
  capdot: "\u2A40",
  caps: "\u2229\uFE00",
  caret: "\u2041",
  caron: "\u02C7",
  ccaps: "\u2A4D",
  ccaron: "\u010D",
  ccedil: "\xE7",
  ccirc: "\u0109",
  ccups: "\u2A4C",
  ccupssm: "\u2A50",
  cdot: "\u010B",
  cedil: "\xB8",
  cemptyv: "\u29B2",
  cent: "\xA2",
  centerdot: "\xB7",
  cfr: "\u{1D520}",
  chcy: "\u0447",
  check: "\u2713",
  checkmark: "\u2713",
  chi: "\u03C7",
  cir: "\u25CB",
  cirE: "\u29C3",
  circ: "\u02C6",
  circeq: "\u2257",
  circlearrowleft: "\u21BA",
  circlearrowright: "\u21BB",
  circledR: "\xAE",
  circledS: "\u24C8",
  circledast: "\u229B",
  circledcirc: "\u229A",
  circleddash: "\u229D",
  cire: "\u2257",
  cirfnint: "\u2A10",
  cirmid: "\u2AEF",
  cirscir: "\u29C2",
  clubs: "\u2663",
  clubsuit: "\u2663",
  colon: ":",
  colone: "\u2254",
  coloneq: "\u2254",
  comma: ",",
  commat: "@",
  comp: "\u2201",
  compfn: "\u2218",
  complement: "\u2201",
  complexes: "\u2102",
  cong: "\u2245",
  congdot: "\u2A6D",
  conint: "\u222E",
  copf: "\u{1D554}",
  coprod: "\u2210",
  copy: "\xA9",
  copysr: "\u2117",
  crarr: "\u21B5",
  cross: "\u2717",
  cscr: "\u{1D4B8}",
  csub: "\u2ACF",
  csube: "\u2AD1",
  csup: "\u2AD0",
  csupe: "\u2AD2",
  ctdot: "\u22EF",
  cudarrl: "\u2938",
  cudarrr: "\u2935",
  cuepr: "\u22DE",
  cuesc: "\u22DF",
  cularr: "\u21B6",
  cularrp: "\u293D",
  cup: "\u222A",
  cupbrcap: "\u2A48",
  cupcap: "\u2A46",
  cupcup: "\u2A4A",
  cupdot: "\u228D",
  cupor: "\u2A45",
  cups: "\u222A\uFE00",
  curarr: "\u21B7",
  curarrm: "\u293C",
  curlyeqprec: "\u22DE",
  curlyeqsucc: "\u22DF",
  curlyvee: "\u22CE",
  curlywedge: "\u22CF",
  curren: "\xA4",
  curvearrowleft: "\u21B6",
  curvearrowright: "\u21B7",
  cuvee: "\u22CE",
  cuwed: "\u22CF",
  cwconint: "\u2232",
  cwint: "\u2231",
  cylcty: "\u232D",
  dArr: "\u21D3",
  dHar: "\u2965",
  dagger: "\u2020",
  daleth: "\u2138",
  darr: "\u2193",
  dash: "\u2010",
  dashv: "\u22A3",
  dbkarow: "\u290F",
  dblac: "\u02DD",
  dcaron: "\u010F",
  dcy: "\u0434",
  dd: "\u2146",
  ddagger: "\u2021",
  ddarr: "\u21CA",
  ddotseq: "\u2A77",
  deg: "\xB0",
  delta: "\u03B4",
  demptyv: "\u29B1",
  dfisht: "\u297F",
  dfr: "\u{1D521}",
  dharl: "\u21C3",
  dharr: "\u21C2",
  diam: "\u22C4",
  diamond: "\u22C4",
  diamondsuit: "\u2666",
  diams: "\u2666",
  die: "\xA8",
  digamma: "\u03DD",
  disin: "\u22F2",
  div: "\xF7",
  divide: "\xF7",
  divideontimes: "\u22C7",
  divonx: "\u22C7",
  djcy: "\u0452",
  dlcorn: "\u231E",
  dlcrop: "\u230D",
  dollar: "$",
  dopf: "\u{1D555}",
  dot: "\u02D9",
  doteq: "\u2250",
  doteqdot: "\u2251",
  dotminus: "\u2238",
  dotplus: "\u2214",
  dotsquare: "\u22A1",
  doublebarwedge: "\u2306",
  downarrow: "\u2193",
  downdownarrows: "\u21CA",
  downharpoonleft: "\u21C3",
  downharpoonright: "\u21C2",
  drbkarow: "\u2910",
  drcorn: "\u231F",
  drcrop: "\u230C",
  dscr: "\u{1D4B9}",
  dscy: "\u0455",
  dsol: "\u29F6",
  dstrok: "\u0111",
  dtdot: "\u22F1",
  dtri: "\u25BF",
  dtrif: "\u25BE",
  duarr: "\u21F5",
  duhar: "\u296F",
  dwangle: "\u29A6",
  dzcy: "\u045F",
  dzigrarr: "\u27FF",
  eDDot: "\u2A77",
  eDot: "\u2251",
  eacute: "\xE9",
  easter: "\u2A6E",
  ecaron: "\u011B",
  ecir: "\u2256",
  ecirc: "\xEA",
  ecolon: "\u2255",
  ecy: "\u044D",
  edot: "\u0117",
  ee: "\u2147",
  efDot: "\u2252",
  efr: "\u{1D522}",
  eg: "\u2A9A",
  egrave: "\xE8",
  egs: "\u2A96",
  egsdot: "\u2A98",
  el: "\u2A99",
  elinters: "\u23E7",
  ell: "\u2113",
  els: "\u2A95",
  elsdot: "\u2A97",
  emacr: "\u0113",
  empty: "\u2205",
  emptyset: "\u2205",
  emptyv: "\u2205",
  emsp13: "\u2004",
  emsp14: "\u2005",
  emsp: "\u2003",
  eng: "\u014B",
  ensp: "\u2002",
  eogon: "\u0119",
  eopf: "\u{1D556}",
  epar: "\u22D5",
  eparsl: "\u29E3",
  eplus: "\u2A71",
  epsi: "\u03B5",
  epsilon: "\u03B5",
  epsiv: "\u03F5",
  eqcirc: "\u2256",
  eqcolon: "\u2255",
  eqsim: "\u2242",
  eqslantgtr: "\u2A96",
  eqslantless: "\u2A95",
  equals: "=",
  equest: "\u225F",
  equiv: "\u2261",
  equivDD: "\u2A78",
  eqvparsl: "\u29E5",
  erDot: "\u2253",
  erarr: "\u2971",
  escr: "\u212F",
  esdot: "\u2250",
  esim: "\u2242",
  eta: "\u03B7",
  eth: "\xF0",
  euml: "\xEB",
  euro: "\u20AC",
  excl: "!",
  exist: "\u2203",
  expectation: "\u2130",
  exponentiale: "\u2147",
  fallingdotseq: "\u2252",
  fcy: "\u0444",
  female: "\u2640",
  ffilig: "\uFB03",
  fflig: "\uFB00",
  ffllig: "\uFB04",
  ffr: "\u{1D523}",
  filig: "\uFB01",
  fjlig: "fj",
  flat: "\u266D",
  fllig: "\uFB02",
  fltns: "\u25B1",
  fnof: "\u0192",
  fopf: "\u{1D557}",
  forall: "\u2200",
  fork: "\u22D4",
  forkv: "\u2AD9",
  fpartint: "\u2A0D",
  frac12: "\xBD",
  frac13: "\u2153",
  frac14: "\xBC",
  frac15: "\u2155",
  frac16: "\u2159",
  frac18: "\u215B",
  frac23: "\u2154",
  frac25: "\u2156",
  frac34: "\xBE",
  frac35: "\u2157",
  frac38: "\u215C",
  frac45: "\u2158",
  frac56: "\u215A",
  frac58: "\u215D",
  frac78: "\u215E",
  frasl: "\u2044",
  frown: "\u2322",
  fscr: "\u{1D4BB}",
  gE: "\u2267",
  gEl: "\u2A8C",
  gacute: "\u01F5",
  gamma: "\u03B3",
  gammad: "\u03DD",
  gap: "\u2A86",
  gbreve: "\u011F",
  gcirc: "\u011D",
  gcy: "\u0433",
  gdot: "\u0121",
  ge: "\u2265",
  gel: "\u22DB",
  geq: "\u2265",
  geqq: "\u2267",
  geqslant: "\u2A7E",
  ges: "\u2A7E",
  gescc: "\u2AA9",
  gesdot: "\u2A80",
  gesdoto: "\u2A82",
  gesdotol: "\u2A84",
  gesl: "\u22DB\uFE00",
  gesles: "\u2A94",
  gfr: "\u{1D524}",
  gg: "\u226B",
  ggg: "\u22D9",
  gimel: "\u2137",
  gjcy: "\u0453",
  gl: "\u2277",
  glE: "\u2A92",
  gla: "\u2AA5",
  glj: "\u2AA4",
  gnE: "\u2269",
  gnap: "\u2A8A",
  gnapprox: "\u2A8A",
  gne: "\u2A88",
  gneq: "\u2A88",
  gneqq: "\u2269",
  gnsim: "\u22E7",
  gopf: "\u{1D558}",
  grave: "`",
  gscr: "\u210A",
  gsim: "\u2273",
  gsime: "\u2A8E",
  gsiml: "\u2A90",
  gt: ">",
  gtcc: "\u2AA7",
  gtcir: "\u2A7A",
  gtdot: "\u22D7",
  gtlPar: "\u2995",
  gtquest: "\u2A7C",
  gtrapprox: "\u2A86",
  gtrarr: "\u2978",
  gtrdot: "\u22D7",
  gtreqless: "\u22DB",
  gtreqqless: "\u2A8C",
  gtrless: "\u2277",
  gtrsim: "\u2273",
  gvertneqq: "\u2269\uFE00",
  gvnE: "\u2269\uFE00",
  hArr: "\u21D4",
  hairsp: "\u200A",
  half: "\xBD",
  hamilt: "\u210B",
  hardcy: "\u044A",
  harr: "\u2194",
  harrcir: "\u2948",
  harrw: "\u21AD",
  hbar: "\u210F",
  hcirc: "\u0125",
  hearts: "\u2665",
  heartsuit: "\u2665",
  hellip: "\u2026",
  hercon: "\u22B9",
  hfr: "\u{1D525}",
  hksearow: "\u2925",
  hkswarow: "\u2926",
  hoarr: "\u21FF",
  homtht: "\u223B",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  hopf: "\u{1D559}",
  horbar: "\u2015",
  hscr: "\u{1D4BD}",
  hslash: "\u210F",
  hstrok: "\u0127",
  hybull: "\u2043",
  hyphen: "\u2010",
  iacute: "\xED",
  ic: "\u2063",
  icirc: "\xEE",
  icy: "\u0438",
  iecy: "\u0435",
  iexcl: "\xA1",
  iff: "\u21D4",
  ifr: "\u{1D526}",
  igrave: "\xEC",
  ii: "\u2148",
  iiiint: "\u2A0C",
  iiint: "\u222D",
  iinfin: "\u29DC",
  iiota: "\u2129",
  ijlig: "\u0133",
  imacr: "\u012B",
  image: "\u2111",
  imagline: "\u2110",
  imagpart: "\u2111",
  imath: "\u0131",
  imof: "\u22B7",
  imped: "\u01B5",
  in: "\u2208",
  incare: "\u2105",
  infin: "\u221E",
  infintie: "\u29DD",
  inodot: "\u0131",
  int: "\u222B",
  intcal: "\u22BA",
  integers: "\u2124",
  intercal: "\u22BA",
  intlarhk: "\u2A17",
  intprod: "\u2A3C",
  iocy: "\u0451",
  iogon: "\u012F",
  iopf: "\u{1D55A}",
  iota: "\u03B9",
  iprod: "\u2A3C",
  iquest: "\xBF",
  iscr: "\u{1D4BE}",
  isin: "\u2208",
  isinE: "\u22F9",
  isindot: "\u22F5",
  isins: "\u22F4",
  isinsv: "\u22F3",
  isinv: "\u2208",
  it: "\u2062",
  itilde: "\u0129",
  iukcy: "\u0456",
  iuml: "\xEF",
  jcirc: "\u0135",
  jcy: "\u0439",
  jfr: "\u{1D527}",
  jmath: "\u0237",
  jopf: "\u{1D55B}",
  jscr: "\u{1D4BF}",
  jsercy: "\u0458",
  jukcy: "\u0454",
  kappa: "\u03BA",
  kappav: "\u03F0",
  kcedil: "\u0137",
  kcy: "\u043A",
  kfr: "\u{1D528}",
  kgreen: "\u0138",
  khcy: "\u0445",
  kjcy: "\u045C",
  kopf: "\u{1D55C}",
  kscr: "\u{1D4C0}",
  lAarr: "\u21DA",
  lArr: "\u21D0",
  lAtail: "\u291B",
  lBarr: "\u290E",
  lE: "\u2266",
  lEg: "\u2A8B",
  lHar: "\u2962",
  lacute: "\u013A",
  laemptyv: "\u29B4",
  lagran: "\u2112",
  lambda: "\u03BB",
  lang: "\u27E8",
  langd: "\u2991",
  langle: "\u27E8",
  lap: "\u2A85",
  laquo: "\xAB",
  larr: "\u2190",
  larrb: "\u21E4",
  larrbfs: "\u291F",
  larrfs: "\u291D",
  larrhk: "\u21A9",
  larrlp: "\u21AB",
  larrpl: "\u2939",
  larrsim: "\u2973",
  larrtl: "\u21A2",
  lat: "\u2AAB",
  latail: "\u2919",
  late: "\u2AAD",
  lates: "\u2AAD\uFE00",
  lbarr: "\u290C",
  lbbrk: "\u2772",
  lbrace: "{",
  lbrack: "[",
  lbrke: "\u298B",
  lbrksld: "\u298F",
  lbrkslu: "\u298D",
  lcaron: "\u013E",
  lcedil: "\u013C",
  lceil: "\u2308",
  lcub: "{",
  lcy: "\u043B",
  ldca: "\u2936",
  ldquo: "\u201C",
  ldquor: "\u201E",
  ldrdhar: "\u2967",
  ldrushar: "\u294B",
  ldsh: "\u21B2",
  le: "\u2264",
  leftarrow: "\u2190",
  leftarrowtail: "\u21A2",
  leftharpoondown: "\u21BD",
  leftharpoonup: "\u21BC",
  leftleftarrows: "\u21C7",
  leftrightarrow: "\u2194",
  leftrightarrows: "\u21C6",
  leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD",
  leftthreetimes: "\u22CB",
  leg: "\u22DA",
  leq: "\u2264",
  leqq: "\u2266",
  leqslant: "\u2A7D",
  les: "\u2A7D",
  lescc: "\u2AA8",
  lesdot: "\u2A7F",
  lesdoto: "\u2A81",
  lesdotor: "\u2A83",
  lesg: "\u22DA\uFE00",
  lesges: "\u2A93",
  lessapprox: "\u2A85",
  lessdot: "\u22D6",
  lesseqgtr: "\u22DA",
  lesseqqgtr: "\u2A8B",
  lessgtr: "\u2276",
  lesssim: "\u2272",
  lfisht: "\u297C",
  lfloor: "\u230A",
  lfr: "\u{1D529}",
  lg: "\u2276",
  lgE: "\u2A91",
  lhard: "\u21BD",
  lharu: "\u21BC",
  lharul: "\u296A",
  lhblk: "\u2584",
  ljcy: "\u0459",
  ll: "\u226A",
  llarr: "\u21C7",
  llcorner: "\u231E",
  llhard: "\u296B",
  lltri: "\u25FA",
  lmidot: "\u0140",
  lmoust: "\u23B0",
  lmoustache: "\u23B0",
  lnE: "\u2268",
  lnap: "\u2A89",
  lnapprox: "\u2A89",
  lne: "\u2A87",
  lneq: "\u2A87",
  lneqq: "\u2268",
  lnsim: "\u22E6",
  loang: "\u27EC",
  loarr: "\u21FD",
  lobrk: "\u27E6",
  longleftarrow: "\u27F5",
  longleftrightarrow: "\u27F7",
  longmapsto: "\u27FC",
  longrightarrow: "\u27F6",
  looparrowleft: "\u21AB",
  looparrowright: "\u21AC",
  lopar: "\u2985",
  lopf: "\u{1D55D}",
  loplus: "\u2A2D",
  lotimes: "\u2A34",
  lowast: "\u2217",
  lowbar: "_",
  loz: "\u25CA",
  lozenge: "\u25CA",
  lozf: "\u29EB",
  lpar: "(",
  lparlt: "\u2993",
  lrarr: "\u21C6",
  lrcorner: "\u231F",
  lrhar: "\u21CB",
  lrhard: "\u296D",
  lrm: "\u200E",
  lrtri: "\u22BF",
  lsaquo: "\u2039",
  lscr: "\u{1D4C1}",
  lsh: "\u21B0",
  lsim: "\u2272",
  lsime: "\u2A8D",
  lsimg: "\u2A8F",
  lsqb: "[",
  lsquo: "\u2018",
  lsquor: "\u201A",
  lstrok: "\u0142",
  lt: "<",
  ltcc: "\u2AA6",
  ltcir: "\u2A79",
  ltdot: "\u22D6",
  lthree: "\u22CB",
  ltimes: "\u22C9",
  ltlarr: "\u2976",
  ltquest: "\u2A7B",
  ltrPar: "\u2996",
  ltri: "\u25C3",
  ltrie: "\u22B4",
  ltrif: "\u25C2",
  lurdshar: "\u294A",
  luruhar: "\u2966",
  lvertneqq: "\u2268\uFE00",
  lvnE: "\u2268\uFE00",
  mDDot: "\u223A",
  macr: "\xAF",
  male: "\u2642",
  malt: "\u2720",
  maltese: "\u2720",
  map: "\u21A6",
  mapsto: "\u21A6",
  mapstodown: "\u21A7",
  mapstoleft: "\u21A4",
  mapstoup: "\u21A5",
  marker: "\u25AE",
  mcomma: "\u2A29",
  mcy: "\u043C",
  mdash: "\u2014",
  measuredangle: "\u2221",
  mfr: "\u{1D52A}",
  mho: "\u2127",
  micro: "\xB5",
  mid: "\u2223",
  midast: "*",
  midcir: "\u2AF0",
  middot: "\xB7",
  minus: "\u2212",
  minusb: "\u229F",
  minusd: "\u2238",
  minusdu: "\u2A2A",
  mlcp: "\u2ADB",
  mldr: "\u2026",
  mnplus: "\u2213",
  models: "\u22A7",
  mopf: "\u{1D55E}",
  mp: "\u2213",
  mscr: "\u{1D4C2}",
  mstpos: "\u223E",
  mu: "\u03BC",
  multimap: "\u22B8",
  mumap: "\u22B8",
  nGg: "\u22D9\u0338",
  nGt: "\u226B\u20D2",
  nGtv: "\u226B\u0338",
  nLeftarrow: "\u21CD",
  nLeftrightarrow: "\u21CE",
  nLl: "\u22D8\u0338",
  nLt: "\u226A\u20D2",
  nLtv: "\u226A\u0338",
  nRightarrow: "\u21CF",
  nVDash: "\u22AF",
  nVdash: "\u22AE",
  nabla: "\u2207",
  nacute: "\u0144",
  nang: "\u2220\u20D2",
  nap: "\u2249",
  napE: "\u2A70\u0338",
  napid: "\u224B\u0338",
  napos: "\u0149",
  napprox: "\u2249",
  natur: "\u266E",
  natural: "\u266E",
  naturals: "\u2115",
  nbsp: "\xA0",
  nbump: "\u224E\u0338",
  nbumpe: "\u224F\u0338",
  ncap: "\u2A43",
  ncaron: "\u0148",
  ncedil: "\u0146",
  ncong: "\u2247",
  ncongdot: "\u2A6D\u0338",
  ncup: "\u2A42",
  ncy: "\u043D",
  ndash: "\u2013",
  ne: "\u2260",
  neArr: "\u21D7",
  nearhk: "\u2924",
  nearr: "\u2197",
  nearrow: "\u2197",
  nedot: "\u2250\u0338",
  nequiv: "\u2262",
  nesear: "\u2928",
  nesim: "\u2242\u0338",
  nexist: "\u2204",
  nexists: "\u2204",
  nfr: "\u{1D52B}",
  ngE: "\u2267\u0338",
  nge: "\u2271",
  ngeq: "\u2271",
  ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338",
  nges: "\u2A7E\u0338",
  ngsim: "\u2275",
  ngt: "\u226F",
  ngtr: "\u226F",
  nhArr: "\u21CE",
  nharr: "\u21AE",
  nhpar: "\u2AF2",
  ni: "\u220B",
  nis: "\u22FC",
  nisd: "\u22FA",
  niv: "\u220B",
  njcy: "\u045A",
  nlArr: "\u21CD",
  nlE: "\u2266\u0338",
  nlarr: "\u219A",
  nldr: "\u2025",
  nle: "\u2270",
  nleftarrow: "\u219A",
  nleftrightarrow: "\u21AE",
  nleq: "\u2270",
  nleqq: "\u2266\u0338",
  nleqslant: "\u2A7D\u0338",
  nles: "\u2A7D\u0338",
  nless: "\u226E",
  nlsim: "\u2274",
  nlt: "\u226E",
  nltri: "\u22EA",
  nltrie: "\u22EC",
  nmid: "\u2224",
  nopf: "\u{1D55F}",
  not: "\xAC",
  notin: "\u2209",
  notinE: "\u22F9\u0338",
  notindot: "\u22F5\u0338",
  notinva: "\u2209",
  notinvb: "\u22F7",
  notinvc: "\u22F6",
  notni: "\u220C",
  notniva: "\u220C",
  notnivb: "\u22FE",
  notnivc: "\u22FD",
  npar: "\u2226",
  nparallel: "\u2226",
  nparsl: "\u2AFD\u20E5",
  npart: "\u2202\u0338",
  npolint: "\u2A14",
  npr: "\u2280",
  nprcue: "\u22E0",
  npre: "\u2AAF\u0338",
  nprec: "\u2280",
  npreceq: "\u2AAF\u0338",
  nrArr: "\u21CF",
  nrarr: "\u219B",
  nrarrc: "\u2933\u0338",
  nrarrw: "\u219D\u0338",
  nrightarrow: "\u219B",
  nrtri: "\u22EB",
  nrtrie: "\u22ED",
  nsc: "\u2281",
  nsccue: "\u22E1",
  nsce: "\u2AB0\u0338",
  nscr: "\u{1D4C3}",
  nshortmid: "\u2224",
  nshortparallel: "\u2226",
  nsim: "\u2241",
  nsime: "\u2244",
  nsimeq: "\u2244",
  nsmid: "\u2224",
  nspar: "\u2226",
  nsqsube: "\u22E2",
  nsqsupe: "\u22E3",
  nsub: "\u2284",
  nsubE: "\u2AC5\u0338",
  nsube: "\u2288",
  nsubset: "\u2282\u20D2",
  nsubseteq: "\u2288",
  nsubseteqq: "\u2AC5\u0338",
  nsucc: "\u2281",
  nsucceq: "\u2AB0\u0338",
  nsup: "\u2285",
  nsupE: "\u2AC6\u0338",
  nsupe: "\u2289",
  nsupset: "\u2283\u20D2",
  nsupseteq: "\u2289",
  nsupseteqq: "\u2AC6\u0338",
  ntgl: "\u2279",
  ntilde: "\xF1",
  ntlg: "\u2278",
  ntriangleleft: "\u22EA",
  ntrianglelefteq: "\u22EC",
  ntriangleright: "\u22EB",
  ntrianglerighteq: "\u22ED",
  nu: "\u03BD",
  num: "#",
  numero: "\u2116",
  numsp: "\u2007",
  nvDash: "\u22AD",
  nvHarr: "\u2904",
  nvap: "\u224D\u20D2",
  nvdash: "\u22AC",
  nvge: "\u2265\u20D2",
  nvgt: ">\u20D2",
  nvinfin: "\u29DE",
  nvlArr: "\u2902",
  nvle: "\u2264\u20D2",
  nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2",
  nvrArr: "\u2903",
  nvrtrie: "\u22B5\u20D2",
  nvsim: "\u223C\u20D2",
  nwArr: "\u21D6",
  nwarhk: "\u2923",
  nwarr: "\u2196",
  nwarrow: "\u2196",
  nwnear: "\u2927",
  oS: "\u24C8",
  oacute: "\xF3",
  oast: "\u229B",
  ocir: "\u229A",
  ocirc: "\xF4",
  ocy: "\u043E",
  odash: "\u229D",
  odblac: "\u0151",
  odiv: "\u2A38",
  odot: "\u2299",
  odsold: "\u29BC",
  oelig: "\u0153",
  ofcir: "\u29BF",
  ofr: "\u{1D52C}",
  ogon: "\u02DB",
  ograve: "\xF2",
  ogt: "\u29C1",
  ohbar: "\u29B5",
  ohm: "\u03A9",
  oint: "\u222E",
  olarr: "\u21BA",
  olcir: "\u29BE",
  olcross: "\u29BB",
  oline: "\u203E",
  olt: "\u29C0",
  omacr: "\u014D",
  omega: "\u03C9",
  omicron: "\u03BF",
  omid: "\u29B6",
  ominus: "\u2296",
  oopf: "\u{1D560}",
  opar: "\u29B7",
  operp: "\u29B9",
  oplus: "\u2295",
  or: "\u2228",
  orarr: "\u21BB",
  ord: "\u2A5D",
  order: "\u2134",
  orderof: "\u2134",
  ordf: "\xAA",
  ordm: "\xBA",
  origof: "\u22B6",
  oror: "\u2A56",
  orslope: "\u2A57",
  orv: "\u2A5B",
  oscr: "\u2134",
  oslash: "\xF8",
  osol: "\u2298",
  otilde: "\xF5",
  otimes: "\u2297",
  otimesas: "\u2A36",
  ouml: "\xF6",
  ovbar: "\u233D",
  par: "\u2225",
  para: "\xB6",
  parallel: "\u2225",
  parsim: "\u2AF3",
  parsl: "\u2AFD",
  part: "\u2202",
  pcy: "\u043F",
  percnt: "%",
  period: ".",
  permil: "\u2030",
  perp: "\u22A5",
  pertenk: "\u2031",
  pfr: "\u{1D52D}",
  phi: "\u03C6",
  phiv: "\u03D5",
  phmmat: "\u2133",
  phone: "\u260E",
  pi: "\u03C0",
  pitchfork: "\u22D4",
  piv: "\u03D6",
  planck: "\u210F",
  planckh: "\u210E",
  plankv: "\u210F",
  plus: "+",
  plusacir: "\u2A23",
  plusb: "\u229E",
  pluscir: "\u2A22",
  plusdo: "\u2214",
  plusdu: "\u2A25",
  pluse: "\u2A72",
  plusmn: "\xB1",
  plussim: "\u2A26",
  plustwo: "\u2A27",
  pm: "\xB1",
  pointint: "\u2A15",
  popf: "\u{1D561}",
  pound: "\xA3",
  pr: "\u227A",
  prE: "\u2AB3",
  prap: "\u2AB7",
  prcue: "\u227C",
  pre: "\u2AAF",
  prec: "\u227A",
  precapprox: "\u2AB7",
  preccurlyeq: "\u227C",
  preceq: "\u2AAF",
  precnapprox: "\u2AB9",
  precneqq: "\u2AB5",
  precnsim: "\u22E8",
  precsim: "\u227E",
  prime: "\u2032",
  primes: "\u2119",
  prnE: "\u2AB5",
  prnap: "\u2AB9",
  prnsim: "\u22E8",
  prod: "\u220F",
  profalar: "\u232E",
  profline: "\u2312",
  profsurf: "\u2313",
  prop: "\u221D",
  propto: "\u221D",
  prsim: "\u227E",
  prurel: "\u22B0",
  pscr: "\u{1D4C5}",
  psi: "\u03C8",
  puncsp: "\u2008",
  qfr: "\u{1D52E}",
  qint: "\u2A0C",
  qopf: "\u{1D562}",
  qprime: "\u2057",
  qscr: "\u{1D4C6}",
  quaternions: "\u210D",
  quatint: "\u2A16",
  quest: "?",
  questeq: "\u225F",
  quot: '"',
  rAarr: "\u21DB",
  rArr: "\u21D2",
  rAtail: "\u291C",
  rBarr: "\u290F",
  rHar: "\u2964",
  race: "\u223D\u0331",
  racute: "\u0155",
  radic: "\u221A",
  raemptyv: "\u29B3",
  rang: "\u27E9",
  rangd: "\u2992",
  range: "\u29A5",
  rangle: "\u27E9",
  raquo: "\xBB",
  rarr: "\u2192",
  rarrap: "\u2975",
  rarrb: "\u21E5",
  rarrbfs: "\u2920",
  rarrc: "\u2933",
  rarrfs: "\u291E",
  rarrhk: "\u21AA",
  rarrlp: "\u21AC",
  rarrpl: "\u2945",
  rarrsim: "\u2974",
  rarrtl: "\u21A3",
  rarrw: "\u219D",
  ratail: "\u291A",
  ratio: "\u2236",
  rationals: "\u211A",
  rbarr: "\u290D",
  rbbrk: "\u2773",
  rbrace: "}",
  rbrack: "]",
  rbrke: "\u298C",
  rbrksld: "\u298E",
  rbrkslu: "\u2990",
  rcaron: "\u0159",
  rcedil: "\u0157",
  rceil: "\u2309",
  rcub: "}",
  rcy: "\u0440",
  rdca: "\u2937",
  rdldhar: "\u2969",
  rdquo: "\u201D",
  rdquor: "\u201D",
  rdsh: "\u21B3",
  real: "\u211C",
  realine: "\u211B",
  realpart: "\u211C",
  reals: "\u211D",
  rect: "\u25AD",
  reg: "\xAE",
  rfisht: "\u297D",
  rfloor: "\u230B",
  rfr: "\u{1D52F}",
  rhard: "\u21C1",
  rharu: "\u21C0",
  rharul: "\u296C",
  rho: "\u03C1",
  rhov: "\u03F1",
  rightarrow: "\u2192",
  rightarrowtail: "\u21A3",
  rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0",
  rightleftarrows: "\u21C4",
  rightleftharpoons: "\u21CC",
  rightrightarrows: "\u21C9",
  rightsquigarrow: "\u219D",
  rightthreetimes: "\u22CC",
  ring: "\u02DA",
  risingdotseq: "\u2253",
  rlarr: "\u21C4",
  rlhar: "\u21CC",
  rlm: "\u200F",
  rmoust: "\u23B1",
  rmoustache: "\u23B1",
  rnmid: "\u2AEE",
  roang: "\u27ED",
  roarr: "\u21FE",
  robrk: "\u27E7",
  ropar: "\u2986",
  ropf: "\u{1D563}",
  roplus: "\u2A2E",
  rotimes: "\u2A35",
  rpar: ")",
  rpargt: "\u2994",
  rppolint: "\u2A12",
  rrarr: "\u21C9",
  rsaquo: "\u203A",
  rscr: "\u{1D4C7}",
  rsh: "\u21B1",
  rsqb: "]",
  rsquo: "\u2019",
  rsquor: "\u2019",
  rthree: "\u22CC",
  rtimes: "\u22CA",
  rtri: "\u25B9",
  rtrie: "\u22B5",
  rtrif: "\u25B8",
  rtriltri: "\u29CE",
  ruluhar: "\u2968",
  rx: "\u211E",
  sacute: "\u015B",
  sbquo: "\u201A",
  sc: "\u227B",
  scE: "\u2AB4",
  scap: "\u2AB8",
  scaron: "\u0161",
  sccue: "\u227D",
  sce: "\u2AB0",
  scedil: "\u015F",
  scirc: "\u015D",
  scnE: "\u2AB6",
  scnap: "\u2ABA",
  scnsim: "\u22E9",
  scpolint: "\u2A13",
  scsim: "\u227F",
  scy: "\u0441",
  sdot: "\u22C5",
  sdotb: "\u22A1",
  sdote: "\u2A66",
  seArr: "\u21D8",
  searhk: "\u2925",
  searr: "\u2198",
  searrow: "\u2198",
  sect: "\xA7",
  semi: ";",
  seswar: "\u2929",
  setminus: "\u2216",
  setmn: "\u2216",
  sext: "\u2736",
  sfr: "\u{1D530}",
  sfrown: "\u2322",
  sharp: "\u266F",
  shchcy: "\u0449",
  shcy: "\u0448",
  shortmid: "\u2223",
  shortparallel: "\u2225",
  shy: "\xAD",
  sigma: "\u03C3",
  sigmaf: "\u03C2",
  sigmav: "\u03C2",
  sim: "\u223C",
  simdot: "\u2A6A",
  sime: "\u2243",
  simeq: "\u2243",
  simg: "\u2A9E",
  simgE: "\u2AA0",
  siml: "\u2A9D",
  simlE: "\u2A9F",
  simne: "\u2246",
  simplus: "\u2A24",
  simrarr: "\u2972",
  slarr: "\u2190",
  smallsetminus: "\u2216",
  smashp: "\u2A33",
  smeparsl: "\u29E4",
  smid: "\u2223",
  smile: "\u2323",
  smt: "\u2AAA",
  smte: "\u2AAC",
  smtes: "\u2AAC\uFE00",
  softcy: "\u044C",
  sol: "/",
  solb: "\u29C4",
  solbar: "\u233F",
  sopf: "\u{1D564}",
  spades: "\u2660",
  spadesuit: "\u2660",
  spar: "\u2225",
  sqcap: "\u2293",
  sqcaps: "\u2293\uFE00",
  sqcup: "\u2294",
  sqcups: "\u2294\uFE00",
  sqsub: "\u228F",
  sqsube: "\u2291",
  sqsubset: "\u228F",
  sqsubseteq: "\u2291",
  sqsup: "\u2290",
  sqsupe: "\u2292",
  sqsupset: "\u2290",
  sqsupseteq: "\u2292",
  squ: "\u25A1",
  square: "\u25A1",
  squarf: "\u25AA",
  squf: "\u25AA",
  srarr: "\u2192",
  sscr: "\u{1D4C8}",
  ssetmn: "\u2216",
  ssmile: "\u2323",
  sstarf: "\u22C6",
  star: "\u2606",
  starf: "\u2605",
  straightepsilon: "\u03F5",
  straightphi: "\u03D5",
  strns: "\xAF",
  sub: "\u2282",
  subE: "\u2AC5",
  subdot: "\u2ABD",
  sube: "\u2286",
  subedot: "\u2AC3",
  submult: "\u2AC1",
  subnE: "\u2ACB",
  subne: "\u228A",
  subplus: "\u2ABF",
  subrarr: "\u2979",
  subset: "\u2282",
  subseteq: "\u2286",
  subseteqq: "\u2AC5",
  subsetneq: "\u228A",
  subsetneqq: "\u2ACB",
  subsim: "\u2AC7",
  subsub: "\u2AD5",
  subsup: "\u2AD3",
  succ: "\u227B",
  succapprox: "\u2AB8",
  succcurlyeq: "\u227D",
  succeq: "\u2AB0",
  succnapprox: "\u2ABA",
  succneqq: "\u2AB6",
  succnsim: "\u22E9",
  succsim: "\u227F",
  sum: "\u2211",
  sung: "\u266A",
  sup1: "\xB9",
  sup2: "\xB2",
  sup3: "\xB3",
  sup: "\u2283",
  supE: "\u2AC6",
  supdot: "\u2ABE",
  supdsub: "\u2AD8",
  supe: "\u2287",
  supedot: "\u2AC4",
  suphsol: "\u27C9",
  suphsub: "\u2AD7",
  suplarr: "\u297B",
  supmult: "\u2AC2",
  supnE: "\u2ACC",
  supne: "\u228B",
  supplus: "\u2AC0",
  supset: "\u2283",
  supseteq: "\u2287",
  supseteqq: "\u2AC6",
  supsetneq: "\u228B",
  supsetneqq: "\u2ACC",
  supsim: "\u2AC8",
  supsub: "\u2AD4",
  supsup: "\u2AD6",
  swArr: "\u21D9",
  swarhk: "\u2926",
  swarr: "\u2199",
  swarrow: "\u2199",
  swnwar: "\u292A",
  szlig: "\xDF",
  target: "\u2316",
  tau: "\u03C4",
  tbrk: "\u23B4",
  tcaron: "\u0165",
  tcedil: "\u0163",
  tcy: "\u0442",
  tdot: "\u20DB",
  telrec: "\u2315",
  tfr: "\u{1D531}",
  there4: "\u2234",
  therefore: "\u2234",
  theta: "\u03B8",
  thetasym: "\u03D1",
  thetav: "\u03D1",
  thickapprox: "\u2248",
  thicksim: "\u223C",
  thinsp: "\u2009",
  thkap: "\u2248",
  thksim: "\u223C",
  thorn: "\xFE",
  tilde: "\u02DC",
  times: "\xD7",
  timesb: "\u22A0",
  timesbar: "\u2A31",
  timesd: "\u2A30",
  tint: "\u222D",
  toea: "\u2928",
  top: "\u22A4",
  topbot: "\u2336",
  topcir: "\u2AF1",
  topf: "\u{1D565}",
  topfork: "\u2ADA",
  tosa: "\u2929",
  tprime: "\u2034",
  trade: "\u2122",
  triangle: "\u25B5",
  triangledown: "\u25BF",
  triangleleft: "\u25C3",
  trianglelefteq: "\u22B4",
  triangleq: "\u225C",
  triangleright: "\u25B9",
  trianglerighteq: "\u22B5",
  tridot: "\u25EC",
  trie: "\u225C",
  triminus: "\u2A3A",
  triplus: "\u2A39",
  trisb: "\u29CD",
  tritime: "\u2A3B",
  trpezium: "\u23E2",
  tscr: "\u{1D4C9}",
  tscy: "\u0446",
  tshcy: "\u045B",
  tstrok: "\u0167",
  twixt: "\u226C",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  uArr: "\u21D1",
  uHar: "\u2963",
  uacute: "\xFA",
  uarr: "\u2191",
  ubrcy: "\u045E",
  ubreve: "\u016D",
  ucirc: "\xFB",
  ucy: "\u0443",
  udarr: "\u21C5",
  udblac: "\u0171",
  udhar: "\u296E",
  ufisht: "\u297E",
  ufr: "\u{1D532}",
  ugrave: "\xF9",
  uharl: "\u21BF",
  uharr: "\u21BE",
  uhblk: "\u2580",
  ulcorn: "\u231C",
  ulcorner: "\u231C",
  ulcrop: "\u230F",
  ultri: "\u25F8",
  umacr: "\u016B",
  uml: "\xA8",
  uogon: "\u0173",
  uopf: "\u{1D566}",
  uparrow: "\u2191",
  updownarrow: "\u2195",
  upharpoonleft: "\u21BF",
  upharpoonright: "\u21BE",
  uplus: "\u228E",
  upsi: "\u03C5",
  upsih: "\u03D2",
  upsilon: "\u03C5",
  upuparrows: "\u21C8",
  urcorn: "\u231D",
  urcorner: "\u231D",
  urcrop: "\u230E",
  uring: "\u016F",
  urtri: "\u25F9",
  uscr: "\u{1D4CA}",
  utdot: "\u22F0",
  utilde: "\u0169",
  utri: "\u25B5",
  utrif: "\u25B4",
  uuarr: "\u21C8",
  uuml: "\xFC",
  uwangle: "\u29A7",
  vArr: "\u21D5",
  vBar: "\u2AE8",
  vBarv: "\u2AE9",
  vDash: "\u22A8",
  vangrt: "\u299C",
  varepsilon: "\u03F5",
  varkappa: "\u03F0",
  varnothing: "\u2205",
  varphi: "\u03D5",
  varpi: "\u03D6",
  varpropto: "\u221D",
  varr: "\u2195",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varsubsetneq: "\u228A\uFE00",
  varsubsetneqq: "\u2ACB\uFE00",
  varsupsetneq: "\u228B\uFE00",
  varsupsetneqq: "\u2ACC\uFE00",
  vartheta: "\u03D1",
  vartriangleleft: "\u22B2",
  vartriangleright: "\u22B3",
  vcy: "\u0432",
  vdash: "\u22A2",
  vee: "\u2228",
  veebar: "\u22BB",
  veeeq: "\u225A",
  vellip: "\u22EE",
  verbar: "|",
  vert: "|",
  vfr: "\u{1D533}",
  vltri: "\u22B2",
  vnsub: "\u2282\u20D2",
  vnsup: "\u2283\u20D2",
  vopf: "\u{1D567}",
  vprop: "\u221D",
  vrtri: "\u22B3",
  vscr: "\u{1D4CB}",
  vsubnE: "\u2ACB\uFE00",
  vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00",
  vsupne: "\u228B\uFE00",
  vzigzag: "\u299A",
  wcirc: "\u0175",
  wedbar: "\u2A5F",
  wedge: "\u2227",
  wedgeq: "\u2259",
  weierp: "\u2118",
  wfr: "\u{1D534}",
  wopf: "\u{1D568}",
  wp: "\u2118",
  wr: "\u2240",
  wreath: "\u2240",
  wscr: "\u{1D4CC}",
  xcap: "\u22C2",
  xcirc: "\u25EF",
  xcup: "\u22C3",
  xdtri: "\u25BD",
  xfr: "\u{1D535}",
  xhArr: "\u27FA",
  xharr: "\u27F7",
  xi: "\u03BE",
  xlArr: "\u27F8",
  xlarr: "\u27F5",
  xmap: "\u27FC",
  xnis: "\u22FB",
  xodot: "\u2A00",
  xopf: "\u{1D569}",
  xoplus: "\u2A01",
  xotime: "\u2A02",
  xrArr: "\u27F9",
  xrarr: "\u27F6",
  xscr: "\u{1D4CD}",
  xsqcup: "\u2A06",
  xuplus: "\u2A04",
  xutri: "\u25B3",
  xvee: "\u22C1",
  xwedge: "\u22C0",
  yacute: "\xFD",
  yacy: "\u044F",
  ycirc: "\u0177",
  ycy: "\u044B",
  yen: "\xA5",
  yfr: "\u{1D536}",
  yicy: "\u0457",
  yopf: "\u{1D56A}",
  yscr: "\u{1D4CE}",
  yucy: "\u044E",
  yuml: "\xFF",
  zacute: "\u017A",
  zcaron: "\u017E",
  zcy: "\u0437",
  zdot: "\u017C",
  zeetrf: "\u2128",
  zeta: "\u03B6",
  zfr: "\u{1D537}",
  zhcy: "\u0436",
  zigrarr: "\u21DD",
  zopf: "\u{1D56B}",
  zscr: "\u{1D4CF}",
  zwj: "\u200D",
  zwnj: "\u200C"
};

// node_modules/decode-named-character-reference/index.js
var own2 = {}.hasOwnProperty;
function decodeNamedCharacterReference(value2) {
  return own2.call(characterEntities, value2) ? characterEntities[value2] : false;
}

// node_modules/micromark-util-chunked/index.js
function splice(list3, start2, remove, items) {
  const end = list3.length;
  let chunkStart = 0;
  let parameters;
  if (start2 < 0) {
    start2 = -start2 > end ? 0 : end + start2;
  } else {
    start2 = start2 > end ? end : start2;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start2, remove);
    list3.splice(...parameters);
  } else {
    if (remove) list3.splice(start2, remove);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start2, 0);
      list3.splice(...parameters);
      chunkStart += 1e4;
      start2 += 1e4;
    }
  }
}
function push(list3, items) {
  if (list3.length > 0) {
    splice(list3, list3.length, 0, items);
    return list3;
  }
  return items;
}

// node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all2 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2]);
  }
  return all2;
}
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left = maybe || (all2[hook] = {});
    const right = extension2[hook];
    let code3;
    if (right) {
      for (code3 in right) {
        if (!hasOwnProperty.call(left, code3)) left[code3] = [];
        const value2 = right[code3];
        constructs(
          // @ts-expect-error Looks like a list.
          left[code3],
          Array.isArray(value2) ? value2 : value2 ? [value2] : []
        );
      }
    }
  }
}
function constructs(existing, list3) {
  let index2 = -1;
  const before = [];
  while (++index2 < list3.length) {
    ;
    (list3[index2].add === "after" ? existing : before).push(list3[index2]);
  }
  splice(existing, 0, 0, before);
}

// node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value2, base) {
  const code3 = Number.parseInt(value2, base);
  if (
    // C0 except for HT, LF, FF, CR, space.
    code3 < 9 || code3 === 11 || code3 > 13 && code3 < 32 || // Control character (DEL) of C0, and C1 controls.
    code3 > 126 && code3 < 160 || // Lone high surrogates and low surrogates.
    code3 > 55295 && code3 < 57344 || // Noncharacters.
    code3 > 64975 && code3 < 65008 || /* eslint-disable no-bitwise */
    (code3 & 65535) === 65535 || (code3 & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    code3 > 1114111
  ) {
    return "\uFFFD";
  }
  return String.fromCodePoint(code3);
}

// node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value2) {
  return value2.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}

// node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code3) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code3 !== null && (code3 < 32 || code3 === 127)
  );
}
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code3) {
  return code3 !== null && code3 < -2;
}
function markdownLineEndingOrSpace(code3) {
  return code3 !== null && (code3 < 0 || code3 === 32);
}
function markdownSpace(code3) {
  return code3 === -2 || code3 === -1 || code3 === 32;
}
var unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
  return check;
  function check(code3) {
    return code3 !== null && code3 > -1 && regex.test(String.fromCharCode(code3));
  }
}

// node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok3, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start2;
  function start2(code3) {
    if (markdownSpace(code3)) {
      effects.enter(type);
      return prefix(code3);
    }
    return ok3(code3);
  }
  function prefix(code3) {
    if (markdownSpace(code3) && size++ < limit) {
      effects.consume(code3);
      return prefix;
    }
    effects.exit(type);
    return ok3(code3);
  }
}

// node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  let previous3;
  return contentStart;
  function afterContentStartConstruct(code3) {
    if (code3 === null) {
      effects.consume(code3);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code3) {
    effects.enter("paragraph");
    return lineStart(code3);
  }
  function lineStart(code3) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous3
    });
    if (previous3) {
      previous3.next = token;
    }
    previous3 = token;
    return data2(code3);
  }
  function data2(code3) {
    if (code3 === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code3);
      return;
    }
    if (markdownLineEnding(code3)) {
      effects.consume(code3);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code3);
    return data2;
  }
}

// node_modules/micromark/lib/initialize/document.js
var document = {
  tokenize: initializeDocument
};
var containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self2 = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start2;
  function start2(code3) {
    if (continued < stack.length) {
      const item = stack[continued];
      self2.containerState = item[1];
      return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code3);
    }
    return checkNewContainers(code3);
  }
  function documentContinue(code3) {
    continued++;
    if (self2.containerState._closeFlow) {
      self2.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self2.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point3;
      while (indexBeforeFlow--) {
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          point3 = self2.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self2.events.length) {
        self2.events[index2][1].end = {
          ...point3
        };
        index2++;
      }
      splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
      self2.events.length = index2;
      return checkNewContainers(code3);
    }
    return start2(code3);
  }
  function checkNewContainers(code3) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code3);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code3);
      }
      self2.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
    }
    self2.containerState = {};
    return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code3);
  }
  function thereIsANewContainer(code3) {
    if (childFlow) closeFlow();
    exitContainers(continued);
    return documentContinued(code3);
  }
  function thereIsNoNewContainer(code3) {
    self2.parser.lazy[self2.now().line] = continued !== stack.length;
    lineStartOffset = self2.now().offset;
    return flowStart(code3);
  }
  function documentContinued(code3) {
    self2.containerState = {};
    return effects.attempt(containerConstruct, containerContinue, flowStart)(code3);
  }
  function containerContinue(code3) {
    continued++;
    stack.push([self2.currentConstruct, self2.containerState]);
    return documentContinued(code3);
  }
  function flowStart(code3) {
    if (code3 === null) {
      if (childFlow) closeFlow();
      exitContainers(0);
      effects.consume(code3);
      return;
    }
    childFlow = childFlow || self2.parser.flow(self2.now());
    effects.enter("chunkFlow", {
      _tokenizer: childFlow,
      contentType: "flow",
      previous: childToken
    });
    return flowContinue(code3);
  }
  function flowContinue(code3) {
    if (code3 === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code3);
      return;
    }
    if (markdownLineEnding(code3)) {
      effects.consume(code3);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self2.interrupt = void 0;
      return start2;
    }
    effects.consume(code3);
    return flowContinue;
  }
  function writeToChild(token, endOfFile) {
    const stream = self2.sliceStream(token);
    if (endOfFile) stream.push(null);
    token.previous = childToken;
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self2.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
          childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return;
        }
      }
      const indexBeforeExits = self2.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point3;
      while (indexBeforeFlow--) {
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point3 = self2.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self2.events.length) {
        self2.events[index2][1].end = {
          ...point3
        };
        index2++;
      }
      splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
      self2.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self2.containerState = entry[1];
      entry[0].exit.call(self2, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self2.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok3, nok) {
  return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok3, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}

// node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code3) {
  if (code3 === null || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
    return 1;
  }
  if (unicodePunctuation(code3)) {
    return 2;
  }
}

// node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll;
    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }
  return events;
}

// node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  resolveAll: resolveAllAttention,
  tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open;
  let group;
  let text5;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset2;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start2 = {
            ...events[open][1].end
          };
          const end = {
            ...events[index2][1].start
          };
          movePoint(start2, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: start2,
            end: {
              ...events[open][1].end
            }
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...events[index2][1].start
            },
            end
          };
          text5 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: {
              ...events[open][1].end
            },
            end: {
              ...events[index2][1].start
            }
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: {
              ...openingSequence.start
            },
            end: {
              ...closingSequence.end
            }
          };
          events[open][1].end = {
            ...openingSequence.start
          };
          events[index2][1].start = {
            ...closingSequence.end
          };
          nextEvents = [];
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [["enter", events[open][1], context], ["exit", events[open][1], context]]);
          }
          nextEvents = push(nextEvents, [["enter", group, context], ["enter", openingSequence, context], ["exit", openingSequence, context], ["enter", text5, context]]);
          nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
          nextEvents = push(nextEvents, [["exit", text5, context], ["enter", closingSequence, context], ["exit", closingSequence, context], ["exit", group, context]]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset2 = 2;
            nextEvents = push(nextEvents, [["enter", events[index2][1], context], ["exit", events[index2][1], context]]);
          } else {
            offset2 = 0;
          }
          splice(events, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset2 - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
function tokenizeAttention(effects, ok3) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous3 = this.previous;
  const before = classifyCharacter(previous3);
  let marker;
  return start2;
  function start2(code3) {
    marker = code3;
    effects.enter("attentionSequence");
    return inside(code3);
  }
  function inside(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      return inside;
    }
    const token = effects.exit("attentionSequence");
    const after = classifyCharacter(code3);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code3);
    const close2 = !before || before === 2 && after || attentionMarkers2.includes(previous3);
    token._open = Boolean(marker === 42 ? open : open && (before || !close2));
    token._close = Boolean(marker === 42 ? close2 : close2 && (after || !open));
    return ok3(code3);
  }
}
function movePoint(point3, offset2) {
  point3.column += offset2;
  point3.offset += offset2;
  point3._bufferIndex += offset2;
}

// node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok3, nok) {
  let size = 0;
  return start2;
  function start2(code3) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code3);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  function open(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return schemeOrEmailAtext;
    }
    if (code3 === 64) {
      return nok(code3);
    }
    return emailAtext(code3);
  }
  function schemeOrEmailAtext(code3) {
    if (code3 === 43 || code3 === 45 || code3 === 46 || asciiAlphanumeric(code3)) {
      size = 1;
      return schemeInsideOrEmailAtext(code3);
    }
    return emailAtext(code3);
  }
  function schemeInsideOrEmailAtext(code3) {
    if (code3 === 58) {
      effects.consume(code3);
      size = 0;
      return urlInside;
    }
    if ((code3 === 43 || code3 === 45 || code3 === 46 || asciiAlphanumeric(code3)) && size++ < 32) {
      effects.consume(code3);
      return schemeInsideOrEmailAtext;
    }
    size = 0;
    return emailAtext(code3);
  }
  function urlInside(code3) {
    if (code3 === 62) {
      effects.exit("autolinkProtocol");
      effects.enter("autolinkMarker");
      effects.consume(code3);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok3;
    }
    if (code3 === null || code3 === 32 || code3 === 60 || asciiControl(code3)) {
      return nok(code3);
    }
    effects.consume(code3);
    return urlInside;
  }
  function emailAtext(code3) {
    if (code3 === 64) {
      effects.consume(code3);
      return emailAtSignOrDot;
    }
    if (asciiAtext(code3)) {
      effects.consume(code3);
      return emailAtext;
    }
    return nok(code3);
  }
  function emailAtSignOrDot(code3) {
    return asciiAlphanumeric(code3) ? emailLabel(code3) : nok(code3);
  }
  function emailLabel(code3) {
    if (code3 === 46) {
      effects.consume(code3);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code3 === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      effects.enter("autolinkMarker");
      effects.consume(code3);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok3;
    }
    return emailValue(code3);
  }
  function emailValue(code3) {
    if ((code3 === 45 || asciiAlphanumeric(code3)) && size++ < 63) {
      const next = code3 === 45 ? emailValue : emailLabel;
      effects.consume(code3);
      return next;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  partial: true,
  tokenize: tokenizeBlankLine
};
function tokenizeBlankLine(effects, ok3, nok) {
  return start2;
  function start2(code3) {
    return markdownSpace(code3) ? factorySpace(effects, after, "linePrefix")(code3) : after(code3);
  }
  function after(code3) {
    return code3 === null || markdownLineEnding(code3) ? ok3(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit,
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart
};
function tokenizeBlockQuoteStart(effects, ok3, nok) {
  const self2 = this;
  return start2;
  function start2(code3) {
    if (code3 === 62) {
      const state = self2.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code3);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    if (markdownSpace(code3)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code3);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok3;
    }
    effects.exit("blockQuotePrefix");
    return ok3(code3);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok3, nok) {
  const self2 = this;
  return contStart;
  function contStart(code3) {
    if (markdownSpace(code3)) {
      return factorySpace(effects, contBefore, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code3);
    }
    return contBefore(code3);
  }
  function contBefore(code3) {
    return effects.attempt(blockQuote, ok3, nok)(code3);
  }
}
function exit(effects) {
  effects.exit("blockQuote");
}

// node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok3, nok) {
  return start2;
  function start2(code3) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code3);
    effects.exit("escapeMarker");
    return inside;
  }
  function inside(code3) {
    if (asciiPunctuation(code3)) {
      effects.enter("characterEscapeValue");
      effects.consume(code3);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok3;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok3, nok) {
  const self2 = this;
  let size = 0;
  let max;
  let test;
  return start2;
  function start2(code3) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code3);
    effects.exit("characterReferenceMarker");
    return open;
  }
  function open(code3) {
    if (code3 === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code3);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test = asciiAlphanumeric;
    return value2(code3);
  }
  function numeric(code3) {
    if (code3 === 88 || code3 === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code3);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test = asciiHexDigit;
      return value2;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test = asciiDigit;
    return value2(code3);
  }
  function value2(code3) {
    if (code3 === 59 && size) {
      const token = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token))) {
        return nok(code3);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code3);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok3;
    }
    if (test(code3) && size++ < max) {
      effects.consume(code3);
      return value2;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/code-fenced.js
var nonLazyContinuation = {
  partial: true,
  tokenize: tokenizeNonLazyContinuation
};
var codeFenced = {
  concrete: true,
  name: "codeFenced",
  tokenize: tokenizeCodeFenced
};
function tokenizeCodeFenced(effects, ok3, nok) {
  const self2 = this;
  const closeStart = {
    partial: true,
    tokenize: tokenizeCloseStart
  };
  let initialPrefix = 0;
  let sizeOpen = 0;
  let marker;
  return start2;
  function start2(code3) {
    return beforeSequenceOpen(code3);
  }
  function beforeSequenceOpen(code3) {
    const tail = self2.events[self2.events.length - 1];
    initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    marker = code3;
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    return sequenceOpen(code3);
  }
  function sequenceOpen(code3) {
    if (code3 === marker) {
      sizeOpen++;
      effects.consume(code3);
      return sequenceOpen;
    }
    if (sizeOpen < 3) {
      return nok(code3);
    }
    effects.exit("codeFencedFenceSequence");
    return markdownSpace(code3) ? factorySpace(effects, infoBefore, "whitespace")(code3) : infoBefore(code3);
  }
  function infoBefore(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("codeFencedFence");
      return self2.interrupt ? ok3(code3) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code3);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code3);
  }
  function info(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return infoBefore(code3);
    }
    if (markdownSpace(code3)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, metaBefore, "whitespace")(code3);
    }
    if (code3 === 96 && code3 === marker) {
      return nok(code3);
    }
    effects.consume(code3);
    return info;
  }
  function metaBefore(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return infoBefore(code3);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code3);
  }
  function meta(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return infoBefore(code3);
    }
    if (code3 === 96 && code3 === marker) {
      return nok(code3);
    }
    effects.consume(code3);
    return meta;
  }
  function atNonLazyBreak(code3) {
    return effects.attempt(closeStart, after, contentBefore)(code3);
  }
  function contentBefore(code3) {
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return contentStart;
  }
  function contentStart(code3) {
    return initialPrefix > 0 && markdownSpace(code3) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code3) : beforeContentChunk(code3);
  }
  function beforeContentChunk(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code3);
    }
    effects.enter("codeFlowValue");
    return contentChunk(code3);
  }
  function contentChunk(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("codeFlowValue");
      return beforeContentChunk(code3);
    }
    effects.consume(code3);
    return contentChunk;
  }
  function after(code3) {
    effects.exit("codeFenced");
    return ok3(code3);
  }
  function tokenizeCloseStart(effects2, ok4, nok2) {
    let size = 0;
    return startBefore;
    function startBefore(code3) {
      effects2.enter("lineEnding");
      effects2.consume(code3);
      effects2.exit("lineEnding");
      return start3;
    }
    function start3(code3) {
      effects2.enter("codeFencedFence");
      return markdownSpace(code3) ? factorySpace(effects2, beforeSequenceClose, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code3) : beforeSequenceClose(code3);
    }
    function beforeSequenceClose(code3) {
      if (code3 === marker) {
        effects2.enter("codeFencedFenceSequence");
        return sequenceClose(code3);
      }
      return nok2(code3);
    }
    function sequenceClose(code3) {
      if (code3 === marker) {
        size++;
        effects2.consume(code3);
        return sequenceClose;
      }
      if (size >= sizeOpen) {
        effects2.exit("codeFencedFenceSequence");
        return markdownSpace(code3) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code3) : sequenceCloseAfter(code3);
      }
      return nok2(code3);
    }
    function sequenceCloseAfter(code3) {
      if (code3 === null || markdownLineEnding(code3)) {
        effects2.exit("codeFencedFence");
        return ok4(code3);
      }
      return nok2(code3);
    }
  }
}
function tokenizeNonLazyContinuation(effects, ok3, nok) {
  const self2 = this;
  return start2;
  function start2(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return lineStart;
  }
  function lineStart(code3) {
    return self2.parser.lazy[self2.now().line] ? nok(code3) : ok3(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
var furtherStart = {
  partial: true,
  tokenize: tokenizeFurtherStart
};
function tokenizeCodeIndented(effects, ok3, nok) {
  const self2 = this;
  return start2;
  function start2(code3) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code3);
  }
  function afterPrefix(code3) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code3) : nok(code3);
  }
  function atBreak(code3) {
    if (code3 === null) {
      return after(code3);
    }
    if (markdownLineEnding(code3)) {
      return effects.attempt(furtherStart, atBreak, after)(code3);
    }
    effects.enter("codeFlowValue");
    return inside(code3);
  }
  function inside(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("codeFlowValue");
      return atBreak(code3);
    }
    effects.consume(code3);
    return inside;
  }
  function after(code3) {
    effects.exit("codeIndented");
    return ok3(code3);
  }
}
function tokenizeFurtherStart(effects, ok3, nok) {
  const self2 = this;
  return furtherStart2;
  function furtherStart2(code3) {
    if (self2.parser.lazy[self2.now().line]) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return furtherStart2;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code3);
  }
  function afterPrefix(code3) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok3(code3) : markdownLineEnding(code3) ? furtherStart2(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  previous,
  resolve: resolveCodeText,
  tokenize: tokenizeCodeText
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
function previous(code3) {
  return code3 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok3, nok) {
  const self2 = this;
  let sizeOpen = 0;
  let size;
  let token;
  return start2;
  function start2(code3) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return sequenceOpen(code3);
  }
  function sequenceOpen(code3) {
    if (code3 === 96) {
      effects.consume(code3);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeTextSequence");
    return between(code3);
  }
  function between(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 32) {
      effects.enter("space");
      effects.consume(code3);
      effects.exit("space");
      return between;
    }
    if (code3 === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return sequenceClose(code3);
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return between;
    }
    effects.enter("codeTextData");
    return data2(code3);
  }
  function data2(code3) {
    if (code3 === null || code3 === 32 || code3 === 96 || markdownLineEnding(code3)) {
      effects.exit("codeTextData");
      return between(code3);
    }
    effects.consume(code3);
    return data2;
  }
  function sequenceClose(code3) {
    if (code3 === 96) {
      effects.consume(code3);
      size++;
      return sequenceClose;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok3(code3);
    }
    token.type = "codeTextData";
    return data2(code3);
  }
}

// node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var SpliceBuffer = class {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(initial) {
    this.left = initial ? [...initial] : [];
    this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(index2) {
    if (index2 < 0 || index2 >= this.left.length + this.right.length) {
      throw new RangeError("Cannot access index `" + index2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    }
    if (index2 < this.left.length) return this.left[index2];
    return this.right[this.right.length - index2 + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    this.setCursor(0);
    return this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(start2, end) {
    const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
    if (stop < this.left.length) {
      return this.left.slice(start2, stop);
    }
    if (start2 > this.left.length) {
      return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start2 + this.left.length).reverse();
    }
    return this.left.slice(start2).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(start2, deleteCount, items) {
    const count = deleteCount || 0;
    this.setCursor(Math.trunc(start2));
    const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
    if (items) chunkedPush(this.left, items);
    return removed.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    this.setCursor(Number.POSITIVE_INFINITY);
    return this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(item) {
    this.setCursor(Number.POSITIVE_INFINITY);
    this.left.push(item);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(items) {
    this.setCursor(Number.POSITIVE_INFINITY);
    chunkedPush(this.left, items);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(item) {
    this.setCursor(0);
    this.right.push(item);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(items) {
    this.setCursor(0);
    chunkedPush(this.right, items.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
    if (n < this.left.length) {
      const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
      chunkedPush(this.right, removed.reverse());
    } else {
      const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
      chunkedPush(this.left, removed.reverse());
    }
  }
};
function chunkedPush(list3, right) {
  let chunkStart = 0;
  if (right.length < 1e4) {
    list3.push(...right);
  } else {
    while (chunkStart < right.length) {
      list3.push(...right.slice(chunkStart, chunkStart + 1e4));
      chunkStart += 1e4;
    }
  }
}

// node_modules/micromark-util-subtokenize/index.js
function subtokenize(eventsArray) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  const events = new SpliceBuffer(eventsArray);
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events.get(index2);
    if (index2 && event[1].type === "chunkFlow" && events.get(index2 - 1)[1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events.get(otherIndex);
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events.get(lineIndex)[1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = {
          ...events.get(lineIndex)[1].start
        };
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        events.splice(lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
  return !more;
}
function subcontent(events, eventIndex) {
  const token = events.get(eventIndex)[1];
  const context = events.get(eventIndex)[2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  let tokenizer2 = token._tokenizer;
  if (!tokenizer2) {
    tokenizer2 = context.parser[token.contentType](token.start);
    if (token._contentTypeTextTrailing) {
      tokenizer2._contentTypeTextTrailing = true;
    }
  }
  const childEvents = tokenizer2.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous3;
  let index2 = -1;
  let current2 = token;
  let adjust = 0;
  let start2 = 0;
  const breaks = [start2];
  while (current2) {
    while (events.get(++startPosition)[1] !== current2) {
    }
    startPositions.push(startPosition);
    if (!current2._tokenizer) {
      stream = context.sliceStream(current2);
      if (!current2.next) {
        stream.push(null);
      }
      if (previous3) {
        tokenizer2.defineSkip(current2.start);
      }
      if (current2._isInFirstContentOfListItem) {
        tokenizer2._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer2.write(stream);
      if (current2._isInFirstContentOfListItem) {
        tokenizer2._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous3 = current2;
    current2 = current2.next;
  }
  current2 = token;
  while (++index2 < childEvents.length) {
    if (
      // Find a void token that includes a break.
      childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
    ) {
      start2 = index2 + 1;
      breaks.push(start2);
      current2._tokenizer = void 0;
      current2.previous = void 0;
      current2 = current2.next;
    }
  }
  tokenizer2.events = [];
  if (current2) {
    current2._tokenizer = void 0;
    current2.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start3 = startPositions.pop();
    jumps.push([start3, start3 + slice.length - 1]);
    events.splice(start3, 2, slice);
  }
  jumps.reverse();
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}

// node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  resolve: resolveContent,
  tokenize: tokenizeContent
};
var continuationConstruct = {
  partial: true,
  tokenize: tokenizeContinuation
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
function tokenizeContent(effects, ok3) {
  let previous3;
  return chunkStart;
  function chunkStart(code3) {
    effects.enter("content");
    previous3 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return chunkInside(code3);
  }
  function chunkInside(code3) {
    if (code3 === null) {
      return contentEnd(code3);
    }
    if (markdownLineEnding(code3)) {
      return effects.check(continuationConstruct, contentContinue, contentEnd)(code3);
    }
    effects.consume(code3);
    return chunkInside;
  }
  function contentEnd(code3) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok3(code3);
  }
  function contentContinue(code3) {
    effects.consume(code3);
    effects.exit("chunkContent");
    previous3.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous3
    });
    previous3 = previous3.next;
    return chunkInside;
  }
}
function tokenizeContinuation(effects, ok3, nok) {
  const self2 = this;
  return startLookahead;
  function startLookahead(code3) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return nok(code3);
    }
    const tail = self2.events[self2.events.length - 1];
    if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok3(code3);
    }
    return effects.interrupt(self2.parser.constructs.flow, nok, ok3)(code3);
  }
}

// node_modules/micromark-factory-destination/index.js
function factoryDestination(effects, ok3, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start2;
  function start2(code3) {
    if (code3 === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code3);
      effects.exit(literalMarkerType);
      return enclosedBefore;
    }
    if (code3 === null || code3 === 32 || code3 === 41 || asciiControl(code3)) {
      return nok(code3);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return raw(code3);
  }
  function enclosedBefore(code3) {
    if (code3 === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code3);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok3;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return enclosed(code3);
  }
  function enclosed(code3) {
    if (code3 === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return enclosedBefore(code3);
    }
    if (code3 === null || code3 === 60 || markdownLineEnding(code3)) {
      return nok(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? enclosedEscape : enclosed;
  }
  function enclosedEscape(code3) {
    if (code3 === 60 || code3 === 62 || code3 === 92) {
      effects.consume(code3);
      return enclosed;
    }
    return enclosed(code3);
  }
  function raw(code3) {
    if (!balance && (code3 === null || code3 === 41 || markdownLineEndingOrSpace(code3))) {
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok3(code3);
    }
    if (balance < limit && code3 === 40) {
      effects.consume(code3);
      balance++;
      return raw;
    }
    if (code3 === 41) {
      effects.consume(code3);
      balance--;
      return raw;
    }
    if (code3 === null || code3 === 32 || code3 === 40 || asciiControl(code3)) {
      return nok(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? rawEscape : raw;
  }
  function rawEscape(code3) {
    if (code3 === 40 || code3 === 41 || code3 === 92) {
      effects.consume(code3);
      return raw;
    }
    return raw(code3);
  }
}

// node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok3, nok, type, markerType, stringType) {
  const self2 = this;
  let size = 0;
  let seen;
  return start2;
  function start2(code3) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code3);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code3) {
    if (size > 999 || code3 === null || code3 === 91 || code3 === 93 && !seen || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    code3 === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs) {
      return nok(code3);
    }
    if (code3 === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code3);
      effects.exit(markerType);
      effects.exit(type);
      return ok3;
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return labelInside(code3);
  }
  function labelInside(code3) {
    if (code3 === null || code3 === 91 || code3 === 93 || markdownLineEnding(code3) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code3);
    }
    effects.consume(code3);
    if (!seen) seen = !markdownSpace(code3);
    return code3 === 92 ? labelEscape : labelInside;
  }
  function labelEscape(code3) {
    if (code3 === 91 || code3 === 92 || code3 === 93) {
      effects.consume(code3);
      size++;
      return labelInside;
    }
    return labelInside(code3);
  }
}

// node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok3, nok, type, markerType, stringType) {
  let marker;
  return start2;
  function start2(code3) {
    if (code3 === 34 || code3 === 39 || code3 === 40) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code3);
      effects.exit(markerType);
      marker = code3 === 40 ? 41 : code3;
      return begin;
    }
    return nok(code3);
  }
  function begin(code3) {
    if (code3 === marker) {
      effects.enter(markerType);
      effects.consume(code3);
      effects.exit(markerType);
      effects.exit(type);
      return ok3;
    }
    effects.enter(stringType);
    return atBreak(code3);
  }
  function atBreak(code3) {
    if (code3 === marker) {
      effects.exit(stringType);
      return begin(marker);
    }
    if (code3 === null) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return factorySpace(effects, atBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return inside(code3);
  }
  function inside(code3) {
    if (code3 === marker || code3 === null || markdownLineEnding(code3)) {
      effects.exit("chunkString");
      return atBreak(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? escape : inside;
  }
  function escape(code3) {
    if (code3 === marker || code3 === 92) {
      effects.consume(code3);
      return inside;
    }
    return inside(code3);
  }
}

// node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok3) {
  let seen;
  return start2;
  function start2(code3) {
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      seen = true;
      return start2;
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, start2, seen ? "linePrefix" : "lineSuffix")(code3);
    }
    return ok3(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
var titleBefore = {
  partial: true,
  tokenize: tokenizeTitleBefore
};
function tokenizeDefinition(effects, ok3, nok) {
  const self2 = this;
  let identifier;
  return start2;
  function start2(code3) {
    effects.enter("definition");
    return before(code3);
  }
  function before(code3) {
    return factoryLabel.call(
      self2,
      effects,
      labelAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code3);
  }
  function labelAfter(code3) {
    identifier = normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1));
    if (code3 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code3);
      effects.exit("definitionMarker");
      return markerAfter;
    }
    return nok(code3);
  }
  function markerAfter(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, destinationBefore)(code3) : destinationBefore(code3);
  }
  function destinationBefore(code3) {
    return factoryDestination(
      effects,
      destinationAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(code3);
  }
  function destinationAfter(code3) {
    return effects.attempt(titleBefore, after, after)(code3);
  }
  function after(code3) {
    return markdownSpace(code3) ? factorySpace(effects, afterWhitespace, "whitespace")(code3) : afterWhitespace(code3);
  }
  function afterWhitespace(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("definition");
      self2.parser.defined.push(identifier);
      return ok3(code3);
    }
    return nok(code3);
  }
}
function tokenizeTitleBefore(effects, ok3, nok) {
  return titleBefore2;
  function titleBefore2(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, beforeMarker)(code3) : nok(code3);
  }
  function beforeMarker(code3) {
    return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code3);
  }
  function titleAfter(code3) {
    return markdownSpace(code3) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code3) : titleAfterOptionalWhitespace(code3);
  }
  function titleAfterOptionalWhitespace(code3) {
    return code3 === null || markdownLineEnding(code3) ? ok3(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok3, nok) {
  return start2;
  function start2(code3) {
    effects.enter("hardBreakEscape");
    effects.consume(code3);
    return after;
  }
  function after(code3) {
    if (markdownLineEnding(code3)) {
      effects.exit("hardBreakEscape");
      return ok3(code3);
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  resolve: resolveHeadingAtx,
  tokenize: tokenizeHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content3;
  let text5;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content3 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text5 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [["enter", content3, context], ["enter", text5, context], ["exit", text5, context], ["exit", content3, context]]);
  }
  return events;
}
function tokenizeHeadingAtx(effects, ok3, nok) {
  let size = 0;
  return start2;
  function start2(code3) {
    effects.enter("atxHeading");
    return before(code3);
  }
  function before(code3) {
    effects.enter("atxHeadingSequence");
    return sequenceOpen(code3);
  }
  function sequenceOpen(code3) {
    if (code3 === 35 && size++ < 6) {
      effects.consume(code3);
      return sequenceOpen;
    }
    if (code3 === null || markdownLineEndingOrSpace(code3)) {
      effects.exit("atxHeadingSequence");
      return atBreak(code3);
    }
    return nok(code3);
  }
  function atBreak(code3) {
    if (code3 === 35) {
      effects.enter("atxHeadingSequence");
      return sequenceFurther(code3);
    }
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("atxHeading");
      return ok3(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, atBreak, "whitespace")(code3);
    }
    effects.enter("atxHeadingText");
    return data2(code3);
  }
  function sequenceFurther(code3) {
    if (code3 === 35) {
      effects.consume(code3);
      return sequenceFurther;
    }
    effects.exit("atxHeadingSequence");
    return atBreak(code3);
  }
  function data2(code3) {
    if (code3 === null || code3 === 35 || markdownLineEndingOrSpace(code3)) {
      effects.exit("atxHeadingText");
      return atBreak(code3);
    }
    effects.consume(code3);
    return data2;
  }
}

// node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
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
  "search",
  "section",
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
];
var htmlRawNames = ["pre", "script", "style", "textarea"];

// node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  concrete: true,
  name: "htmlFlow",
  resolveTo: resolveToHtmlFlow,
  tokenize: tokenizeHtmlFlow
};
var blankLineBefore = {
  partial: true,
  tokenize: tokenizeBlankLineBefore
};
var nonLazyContinuationStart = {
  partial: true,
  tokenize: tokenizeNonLazyContinuationStart
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
function tokenizeHtmlFlow(effects, ok3, nok) {
  const self2 = this;
  let marker;
  let closingTag;
  let buffer;
  let index2;
  let markerB;
  return start2;
  function start2(code3) {
    return before(code3);
  }
  function before(code3) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code3);
    return open;
  }
  function open(code3) {
    if (code3 === 33) {
      effects.consume(code3);
      return declarationOpen;
    }
    if (code3 === 47) {
      effects.consume(code3);
      closingTag = true;
      return tagCloseStart;
    }
    if (code3 === 63) {
      effects.consume(code3);
      marker = 3;
      return self2.interrupt ? ok3 : continuationDeclarationInside;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      buffer = String.fromCharCode(code3);
      return tagName;
    }
    return nok(code3);
  }
  function declarationOpen(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      marker = 2;
      return commentOpenInside;
    }
    if (code3 === 91) {
      effects.consume(code3);
      marker = 5;
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      marker = 4;
      return self2.interrupt ? ok3 : continuationDeclarationInside;
    }
    return nok(code3);
  }
  function commentOpenInside(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return self2.interrupt ? ok3 : continuationDeclarationInside;
    }
    return nok(code3);
  }
  function cdataOpenInside(code3) {
    const value2 = "CDATA[";
    if (code3 === value2.charCodeAt(index2++)) {
      effects.consume(code3);
      if (index2 === value2.length) {
        return self2.interrupt ? ok3 : continuation;
      }
      return cdataOpenInside;
    }
    return nok(code3);
  }
  function tagCloseStart(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      buffer = String.fromCharCode(code3);
      return tagName;
    }
    return nok(code3);
  }
  function tagName(code3) {
    if (code3 === null || code3 === 47 || code3 === 62 || markdownLineEndingOrSpace(code3)) {
      const slash = code3 === 47;
      const name2 = buffer.toLowerCase();
      if (!slash && !closingTag && htmlRawNames.includes(name2)) {
        marker = 1;
        return self2.interrupt ? ok3(code3) : continuation(code3);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        marker = 6;
        if (slash) {
          effects.consume(code3);
          return basicSelfClosing;
        }
        return self2.interrupt ? ok3(code3) : continuation(code3);
      }
      marker = 7;
      return self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code3) : closingTag ? completeClosingTagAfter(code3) : completeAttributeNameBefore(code3);
    }
    if (code3 === 45 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      buffer += String.fromCharCode(code3);
      return tagName;
    }
    return nok(code3);
  }
  function basicSelfClosing(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      return self2.interrupt ? ok3 : continuation;
    }
    return nok(code3);
  }
  function completeClosingTagAfter(code3) {
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeClosingTagAfter;
    }
    return completeEnd(code3);
  }
  function completeAttributeNameBefore(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      return completeEnd;
    }
    if (code3 === 58 || code3 === 95 || asciiAlpha(code3)) {
      effects.consume(code3);
      return completeAttributeName;
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAttributeNameBefore;
    }
    return completeEnd(code3);
  }
  function completeAttributeName(code3) {
    if (code3 === 45 || code3 === 46 || code3 === 58 || code3 === 95 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code3);
  }
  function completeAttributeNameAfter(code3) {
    if (code3 === 61) {
      effects.consume(code3);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code3);
  }
  function completeAttributeValueBefore(code3) {
    if (code3 === null || code3 === 60 || code3 === 61 || code3 === 62 || code3 === 96) {
      return nok(code3);
    }
    if (code3 === 34 || code3 === 39) {
      effects.consume(code3);
      markerB = code3;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAttributeValueBefore;
    }
    return completeAttributeValueUnquoted(code3);
  }
  function completeAttributeValueQuoted(code3) {
    if (code3 === markerB) {
      effects.consume(code3);
      markerB = null;
      return completeAttributeValueQuotedAfter;
    }
    if (code3 === null || markdownLineEnding(code3)) {
      return nok(code3);
    }
    effects.consume(code3);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code3) {
    if (code3 === null || code3 === 34 || code3 === 39 || code3 === 47 || code3 === 60 || code3 === 61 || code3 === 62 || code3 === 96 || markdownLineEndingOrSpace(code3)) {
      return completeAttributeNameAfter(code3);
    }
    effects.consume(code3);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code3) {
    if (code3 === 47 || code3 === 62 || markdownSpace(code3)) {
      return completeAttributeNameBefore(code3);
    }
    return nok(code3);
  }
  function completeEnd(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      return completeAfter;
    }
    return nok(code3);
  }
  function completeAfter(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return continuation(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAfter;
    }
    return nok(code3);
  }
  function continuation(code3) {
    if (code3 === 45 && marker === 2) {
      effects.consume(code3);
      return continuationCommentInside;
    }
    if (code3 === 60 && marker === 1) {
      effects.consume(code3);
      return continuationRawTagOpen;
    }
    if (code3 === 62 && marker === 4) {
      effects.consume(code3);
      return continuationClose;
    }
    if (code3 === 63 && marker === 3) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    if (code3 === 93 && marker === 5) {
      effects.consume(code3);
      return continuationCdataInside;
    }
    if (markdownLineEnding(code3) && (marker === 6 || marker === 7)) {
      effects.exit("htmlFlowData");
      return effects.check(blankLineBefore, continuationAfter, continuationStart)(code3);
    }
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("htmlFlowData");
      return continuationStart(code3);
    }
    effects.consume(code3);
    return continuation;
  }
  function continuationStart(code3) {
    return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code3);
  }
  function continuationStartNonLazy(code3) {
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return continuationBefore;
  }
  function continuationBefore(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return continuationStart(code3);
    }
    effects.enter("htmlFlowData");
    return continuation(code3);
  }
  function continuationCommentInside(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    return continuation(code3);
  }
  function continuationRawTagOpen(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      buffer = "";
      return continuationRawEndTag;
    }
    return continuation(code3);
  }
  function continuationRawEndTag(code3) {
    if (code3 === 62) {
      const name2 = buffer.toLowerCase();
      if (htmlRawNames.includes(name2)) {
        effects.consume(code3);
        return continuationClose;
      }
      return continuation(code3);
    }
    if (asciiAlpha(code3) && buffer.length < 8) {
      effects.consume(code3);
      buffer += String.fromCharCode(code3);
      return continuationRawEndTag;
    }
    return continuation(code3);
  }
  function continuationCdataInside(code3) {
    if (code3 === 93) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    return continuation(code3);
  }
  function continuationDeclarationInside(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      return continuationClose;
    }
    if (code3 === 45 && marker === 2) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    return continuation(code3);
  }
  function continuationClose(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("htmlFlowData");
      return continuationAfter(code3);
    }
    effects.consume(code3);
    return continuationClose;
  }
  function continuationAfter(code3) {
    effects.exit("htmlFlow");
    return ok3(code3);
  }
}
function tokenizeNonLazyContinuationStart(effects, ok3, nok) {
  const self2 = this;
  return start2;
  function start2(code3) {
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    return self2.parser.lazy[self2.now().line] ? nok(code3) : ok3(code3);
  }
}
function tokenizeBlankLineBefore(effects, ok3, nok) {
  return start2;
  function start2(code3) {
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return effects.attempt(blankLine, ok3, nok);
  }
}

// node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok3, nok) {
  const self2 = this;
  let marker;
  let index2;
  let returnState;
  return start2;
  function start2(code3) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code3);
    return open;
  }
  function open(code3) {
    if (code3 === 33) {
      effects.consume(code3);
      return declarationOpen;
    }
    if (code3 === 47) {
      effects.consume(code3);
      return tagCloseStart;
    }
    if (code3 === 63) {
      effects.consume(code3);
      return instruction;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return tagOpen;
    }
    return nok(code3);
  }
  function declarationOpen(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return commentOpenInside;
    }
    if (code3 === 91) {
      effects.consume(code3);
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return declaration;
    }
    return nok(code3);
  }
  function commentOpenInside(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return commentEnd;
    }
    return nok(code3);
  }
  function comment(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 45) {
      effects.consume(code3);
      return commentClose;
    }
    if (markdownLineEnding(code3)) {
      returnState = comment;
      return lineEndingBefore(code3);
    }
    effects.consume(code3);
    return comment;
  }
  function commentClose(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return commentEnd;
    }
    return comment(code3);
  }
  function commentEnd(code3) {
    return code3 === 62 ? end(code3) : code3 === 45 ? commentClose(code3) : comment(code3);
  }
  function cdataOpenInside(code3) {
    const value2 = "CDATA[";
    if (code3 === value2.charCodeAt(index2++)) {
      effects.consume(code3);
      return index2 === value2.length ? cdata : cdataOpenInside;
    }
    return nok(code3);
  }
  function cdata(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 93) {
      effects.consume(code3);
      return cdataClose;
    }
    if (markdownLineEnding(code3)) {
      returnState = cdata;
      return lineEndingBefore(code3);
    }
    effects.consume(code3);
    return cdata;
  }
  function cdataClose(code3) {
    if (code3 === 93) {
      effects.consume(code3);
      return cdataEnd;
    }
    return cdata(code3);
  }
  function cdataEnd(code3) {
    if (code3 === 62) {
      return end(code3);
    }
    if (code3 === 93) {
      effects.consume(code3);
      return cdataEnd;
    }
    return cdata(code3);
  }
  function declaration(code3) {
    if (code3 === null || code3 === 62) {
      return end(code3);
    }
    if (markdownLineEnding(code3)) {
      returnState = declaration;
      return lineEndingBefore(code3);
    }
    effects.consume(code3);
    return declaration;
  }
  function instruction(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 63) {
      effects.consume(code3);
      return instructionClose;
    }
    if (markdownLineEnding(code3)) {
      returnState = instruction;
      return lineEndingBefore(code3);
    }
    effects.consume(code3);
    return instruction;
  }
  function instructionClose(code3) {
    return code3 === 62 ? end(code3) : instruction(code3);
  }
  function tagCloseStart(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return tagClose;
    }
    return nok(code3);
  }
  function tagClose(code3) {
    if (code3 === 45 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return tagClose;
    }
    return tagCloseBetween(code3);
  }
  function tagCloseBetween(code3) {
    if (markdownLineEnding(code3)) {
      returnState = tagCloseBetween;
      return lineEndingBefore(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagCloseBetween;
    }
    return end(code3);
  }
  function tagOpen(code3) {
    if (code3 === 45 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return tagOpen;
    }
    if (code3 === 47 || code3 === 62 || markdownLineEndingOrSpace(code3)) {
      return tagOpenBetween(code3);
    }
    return nok(code3);
  }
  function tagOpenBetween(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      return end;
    }
    if (code3 === 58 || code3 === 95 || asciiAlpha(code3)) {
      effects.consume(code3);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenBetween;
      return lineEndingBefore(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagOpenBetween;
    }
    return end(code3);
  }
  function tagOpenAttributeName(code3) {
    if (code3 === 45 || code3 === 46 || code3 === 58 || code3 === 95 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code3);
  }
  function tagOpenAttributeNameAfter(code3) {
    if (code3 === 61) {
      effects.consume(code3);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenAttributeNameAfter;
      return lineEndingBefore(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code3);
  }
  function tagOpenAttributeValueBefore(code3) {
    if (code3 === null || code3 === 60 || code3 === 61 || code3 === 62 || code3 === 96) {
      return nok(code3);
    }
    if (code3 === 34 || code3 === 39) {
      effects.consume(code3);
      marker = code3;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenAttributeValueBefore;
      return lineEndingBefore(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code3);
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      marker = void 0;
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code3 === null) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenAttributeValueQuoted;
      return lineEndingBefore(code3);
    }
    effects.consume(code3);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueUnquoted(code3) {
    if (code3 === null || code3 === 34 || code3 === 39 || code3 === 60 || code3 === 61 || code3 === 96) {
      return nok(code3);
    }
    if (code3 === 47 || code3 === 62 || markdownLineEndingOrSpace(code3)) {
      return tagOpenBetween(code3);
    }
    effects.consume(code3);
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuotedAfter(code3) {
    if (code3 === 47 || code3 === 62 || markdownLineEndingOrSpace(code3)) {
      return tagOpenBetween(code3);
    }
    return nok(code3);
  }
  function end(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok3;
    }
    return nok(code3);
  }
  function lineEndingBefore(code3) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return lineEndingAfter;
  }
  function lineEndingAfter(code3) {
    return markdownSpace(code3) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code3) : lineEndingAfterPrefix(code3);
  }
  function lineEndingAfterPrefix(code3) {
    effects.enter("htmlTextData");
    return returnState(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  resolveAll: resolveAllLabelEnd,
  resolveTo: resolveToLabelEnd,
  tokenize: tokenizeLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var referenceFullConstruct = {
  tokenize: tokenizeReferenceFull
};
var referenceCollapsedConstruct = {
  tokenize: tokenizeReferenceCollapsed
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  const newEvents = [];
  while (++index2 < events.length) {
    const token = events[index2][1];
    newEvents.push(events[index2]);
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      const offset2 = token.type === "labelImage" ? 4 : 2;
      token.type = "data";
      index2 += offset2;
    }
  }
  if (events.length !== newEvents.length) {
    splice(events, 0, events.length, newEvents);
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset2 = 0;
  let token;
  let open;
  let close2;
  let media;
  while (index2--) {
    token = events[index2][1];
    if (open) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close2) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open = index2;
        if (token.type !== "labelLink") {
          offset2 = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close2 = index2;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: {
      ...events[open][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  const label = {
    type: "label",
    start: {
      ...events[open][1].start
    },
    end: {
      ...events[close2][1].end
    }
  };
  const text5 = {
    type: "labelText",
    start: {
      ...events[open + offset2 + 2][1].end
    },
    end: {
      ...events[close2 - 2][1].start
    }
  };
  media = [["enter", group, context], ["enter", label, context]];
  media = push(media, events.slice(open + 1, open + offset2 + 3));
  media = push(media, [["enter", text5, context]]);
  media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset2 + 4, close2 - 3), context));
  media = push(media, [["exit", text5, context], events[close2 - 2], events[close2 - 1], ["exit", label, context]]);
  media = push(media, events.slice(close2 + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open, events.length, media);
  return events;
}
function tokenizeLabelEnd(effects, ok3, nok) {
  const self2 = this;
  let index2 = self2.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self2.events[index2][1].type === "labelImage" || self2.events[index2][1].type === "labelLink") && !self2.events[index2][1]._balanced) {
      labelStart = self2.events[index2][1];
      break;
    }
  }
  return start2;
  function start2(code3) {
    if (!labelStart) {
      return nok(code3);
    }
    if (labelStart._inactive) {
      return labelEndNok(code3);
    }
    defined = self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize({
      start: labelStart.end,
      end: self2.now()
    })));
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code3);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return after;
  }
  function after(code3) {
    if (code3 === 40) {
      return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code3);
    }
    if (code3 === 91) {
      return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code3);
    }
    return defined ? labelEndOk(code3) : labelEndNok(code3);
  }
  function referenceNotFull(code3) {
    return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code3);
  }
  function labelEndOk(code3) {
    return ok3(code3);
  }
  function labelEndNok(code3) {
    labelStart._balanced = true;
    return nok(code3);
  }
}
function tokenizeResource(effects, ok3, nok) {
  return resourceStart;
  function resourceStart(code3) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code3);
    effects.exit("resourceMarker");
    return resourceBefore;
  }
  function resourceBefore(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, resourceOpen)(code3) : resourceOpen(code3);
  }
  function resourceOpen(code3) {
    if (code3 === 41) {
      return resourceEnd(code3);
    }
    return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code3);
  }
  function resourceDestinationAfter(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, resourceBetween)(code3) : resourceEnd(code3);
  }
  function resourceDestinationMissing(code3) {
    return nok(code3);
  }
  function resourceBetween(code3) {
    if (code3 === 34 || code3 === 39 || code3 === 40) {
      return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code3);
    }
    return resourceEnd(code3);
  }
  function resourceTitleAfter(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, resourceEnd)(code3) : resourceEnd(code3);
  }
  function resourceEnd(code3) {
    if (code3 === 41) {
      effects.enter("resourceMarker");
      effects.consume(code3);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok3;
    }
    return nok(code3);
  }
}
function tokenizeReferenceFull(effects, ok3, nok) {
  const self2 = this;
  return referenceFull;
  function referenceFull(code3) {
    return factoryLabel.call(self2, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code3);
  }
  function referenceFullAfter(code3) {
    return self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1))) ? ok3(code3) : nok(code3);
  }
  function referenceFullMissing(code3) {
    return nok(code3);
  }
}
function tokenizeReferenceCollapsed(effects, ok3, nok) {
  return referenceCollapsedStart;
  function referenceCollapsedStart(code3) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code3);
    effects.exit("referenceMarker");
    return referenceCollapsedOpen;
  }
  function referenceCollapsedOpen(code3) {
    if (code3 === 93) {
      effects.enter("referenceMarker");
      effects.consume(code3);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok3;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartImage
};
function tokenizeLabelStartImage(effects, ok3, nok) {
  const self2 = this;
  return start2;
  function start2(code3) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code3);
    effects.exit("labelImageMarker");
    return open;
  }
  function open(code3) {
    if (code3 === 91) {
      effects.enter("labelMarker");
      effects.consume(code3);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    return code3 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code3) : ok3(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartLink
};
function tokenizeLabelStartLink(effects, ok3, nok) {
  const self2 = this;
  return start2;
  function start2(code3) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code3);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code3) {
    return code3 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code3) : ok3(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok3) {
  return start2;
  function start2(code3) {
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(effects, ok3, "linePrefix");
  }
}

// node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok3, nok) {
  let size = 0;
  let marker;
  return start2;
  function start2(code3) {
    effects.enter("thematicBreak");
    return before(code3);
  }
  function before(code3) {
    marker = code3;
    return atBreak(code3);
  }
  function atBreak(code3) {
    if (code3 === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code3);
    }
    if (size >= 3 && (code3 === null || markdownLineEnding(code3))) {
      effects.exit("thematicBreak");
      return ok3(code3);
    }
    return nok(code3);
  }
  function sequence(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return markdownSpace(code3) ? factorySpace(effects, atBreak, "whitespace")(code3) : atBreak(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/list.js
var list = {
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd,
  name: "list",
  tokenize: tokenizeListStart
};
var listItemPrefixWhitespaceConstruct = {
  partial: true,
  tokenize: tokenizeListItemPrefixWhitespace
};
var indentConstruct = {
  partial: true,
  tokenize: tokenizeIndent
};
function tokenizeListStart(effects, ok3, nok) {
  const self2 = this;
  const tail = self2.events[self2.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start2;
  function start2(code3) {
    const kind = self2.containerState.type || (code3 === 42 || code3 === 43 || code3 === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self2.containerState.marker || code3 === self2.containerState.marker : asciiDigit(code3)) {
      if (!self2.containerState.type) {
        self2.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code3 === 42 || code3 === 45 ? effects.check(thematicBreak, nok, atMarker)(code3) : atMarker(code3);
      }
      if (!self2.interrupt || code3 === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code3);
      }
    }
    return nok(code3);
  }
  function inside(code3) {
    if (asciiDigit(code3) && ++size < 10) {
      effects.consume(code3);
      return inside;
    }
    if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code3 === self2.containerState.marker : code3 === 41 || code3 === 46)) {
      effects.exit("listItemValue");
      return atMarker(code3);
    }
    return nok(code3);
  }
  function atMarker(code3) {
    effects.enter("listItemMarker");
    effects.consume(code3);
    effects.exit("listItemMarker");
    self2.containerState.marker = self2.containerState.marker || code3;
    return effects.check(
      blankLine,
      // Can’t be empty when interrupting.
      self2.interrupt ? nok : onBlank,
      effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix)
    );
  }
  function onBlank(code3) {
    self2.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code3);
  }
  function otherPrefix(code3) {
    if (markdownSpace(code3)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code3);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code3);
  }
  function endOfPrefix(code3) {
    self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok3(code3);
  }
}
function tokenizeListContinuation(effects, ok3, nok) {
  const self2 = this;
  self2.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code3) {
    self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
    return factorySpace(effects, ok3, "listItemIndent", self2.containerState.size + 1)(code3);
  }
  function notBlank(code3) {
    if (self2.containerState.furtherBlankLines || !markdownSpace(code3)) {
      self2.containerState.furtherBlankLines = void 0;
      self2.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code3);
    }
    self2.containerState.furtherBlankLines = void 0;
    self2.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok3, notInCurrentItem)(code3);
  }
  function notInCurrentItem(code3) {
    self2.containerState._closeFlow = true;
    self2.interrupt = void 0;
    return factorySpace(effects, effects.attempt(list, ok3, nok), "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code3);
  }
}
function tokenizeIndent(effects, ok3, nok) {
  const self2 = this;
  return factorySpace(effects, afterPrefix, "listItemIndent", self2.containerState.size + 1);
  function afterPrefix(code3) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self2.containerState.size ? ok3(code3) : nok(code3);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok3, nok) {
  const self2 = this;
  return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
  function afterPrefix(code3) {
    const tail = self2.events[self2.events.length - 1];
    return !markdownSpace(code3) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok3(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  resolveTo: resolveToSetextUnderline,
  tokenize: tokenizeSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content3;
  let text5;
  let definition3;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text5 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition3 && events[index2][1].type === "definition") {
        definition3 = index2;
      }
    }
  }
  const heading2 = {
    type: "setextHeading",
    start: {
      ...events[content3][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  events[text5][1].type = "setextHeadingText";
  if (definition3) {
    events.splice(text5, 0, ["enter", heading2, context]);
    events.splice(definition3 + 1, 0, ["exit", events[content3][1], context]);
    events[content3][1].end = {
      ...events[definition3][1].end
    };
  } else {
    events[content3][1] = heading2;
  }
  events.push(["exit", heading2, context]);
  return events;
}
function tokenizeSetextUnderline(effects, ok3, nok) {
  const self2 = this;
  let marker;
  return start2;
  function start2(code3) {
    let index2 = self2.events.length;
    let paragraph2;
    while (index2--) {
      if (self2.events[index2][1].type !== "lineEnding" && self2.events[index2][1].type !== "linePrefix" && self2.events[index2][1].type !== "content") {
        paragraph2 = self2.events[index2][1].type === "paragraph";
        break;
      }
    }
    if (!self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph2)) {
      effects.enter("setextHeadingLine");
      marker = code3;
      return before(code3);
    }
    return nok(code3);
  }
  function before(code3) {
    effects.enter("setextHeadingLineSequence");
    return inside(code3);
  }
  function inside(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      return inside;
    }
    effects.exit("setextHeadingLineSequence");
    return markdownSpace(code3) ? factorySpace(effects, after, "lineSuffix")(code3) : after(code3);
  }
  function after(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("setextHeadingLine");
      return ok3(code3);
    }
    return nok(code3);
  }
}

// node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self2 = this;
  const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), "linePrefix"))
  );
  return initial;
  function atBlankEnding(code3) {
    if (code3 === null) {
      effects.consume(code3);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code3);
    effects.exit("lineEndingBlank");
    self2.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code3) {
    if (code3 === null) {
      effects.consume(code3);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    self2.currentConstruct = void 0;
    return initial;
  }
}

// node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver()
};
var string = initializeFactory("string");
var text = initializeFactory("text");
function initializeFactory(field) {
  return {
    resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
    tokenize: initializeText
  };
  function initializeText(effects) {
    const self2 = this;
    const constructs2 = this.parser.constructs[field];
    const text5 = effects.attempt(constructs2, start2, notText);
    return start2;
    function start2(code3) {
      return atBreak(code3) ? text5(code3) : notText(code3);
    }
    function notText(code3) {
      if (code3 === null) {
        effects.consume(code3);
        return;
      }
      effects.enter("data");
      effects.consume(code3);
      return data2;
    }
    function data2(code3) {
      if (atBreak(code3)) {
        effects.exit("data");
        return text5(code3);
      }
      effects.consume(code3);
      return data2;
    }
    function atBreak(code3) {
      if (code3 === null) {
        return true;
      }
      const list3 = constructs2[code3];
      let index2 = -1;
      if (list3) {
        while (++index2 < list3.length) {
          const item = list3[index2];
          if (!item.previous || item.previous.call(self2, self2.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data2 = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data2);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex) break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1) {
        } else {
          index2++;
          break;
        }
      }
      if (context._contentTypeTextTrailing && eventIndex === events.length) {
        size = 0;
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: index2 ? bufferIndex : data2.start._bufferIndex + bufferIndex,
            _index: data2.start._index + index2,
            line: data2.end.line,
            column: data2.end.column - size,
            offset: data2.end.offset - size
          },
          end: {
            ...data2.end
          }
        };
        data2.end = {
          ...token.start
        };
        if (data2.start.offset === data2.end.offset) {
          Object.assign(data2, token);
        } else {
          events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}

// node_modules/micromark/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document2,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2
});
var document2 = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote
};
var contentInitial = {
  [91]: definition
};
var flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
var flow2 = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced
};
var string2 = {
  [38]: characterReference,
  [92]: characterEscape
};
var text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
var insideSpan = {
  null: [attention, resolver]
};
var attentionMarkers = {
  null: [42, 95]
};
var disable = {
  null: []
};

// node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser, initialize, from) {
  let point3 = {
    _bufferIndex: -1,
    _index: 0,
    line: from && from.line || 1,
    column: from && from.column || 1,
    offset: from && from.offset || 0
  };
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  let consumed = true;
  const effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit: exit3,
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    code: null,
    containerState: {},
    defineSkip,
    events: [],
    now,
    parser,
    previous: null,
    sliceSerialize,
    sliceStream,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  let expectedCode;
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main2();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    const {
      _bufferIndex,
      _index,
      line,
      column,
      offset: offset2
    } = point3;
    return {
      _bufferIndex,
      _index,
      line,
      column,
      offset: offset2
    };
  }
  function defineSkip(value2) {
    columnStart[value2.line] = value2.column;
    accountForPotentialSkip();
  }
  function main2() {
    let chunkIndex;
    while (point3._index < chunks.length) {
      const chunk = chunks[point3._index];
      if (typeof chunk === "string") {
        chunkIndex = point3._index;
        if (point3._bufferIndex < 0) {
          point3._bufferIndex = 0;
        }
        while (point3._index === chunkIndex && point3._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point3._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code3) {
    consumed = void 0;
    expectedCode = code3;
    state = state(code3);
  }
  function consume(code3) {
    if (markdownLineEnding(code3)) {
      point3.line++;
      point3.column = 1;
      point3.offset += code3 === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code3 !== -1) {
      point3.column++;
      point3.offset++;
    }
    if (point3._bufferIndex < 0) {
      point3._index++;
    } else {
      point3._bufferIndex++;
      if (point3._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
      // strings.
      /** @type {string} */
      chunks[point3._index].length) {
        point3._bufferIndex = -1;
        point3._index++;
      }
    }
    context.previous = code3;
    consumed = true;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit3(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? (
        /* c8 ignore next 1 */
        handleListOfConstructs(constructs2)
      ) : "tokenize" in constructs2 ? (
        // Looks like a construct.
        handleListOfConstructs([
          /** @type {Construct} */
          constructs2
        ])
      ) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map3) {
        return start2;
        function start2(code3) {
          const left = code3 !== null && map3[code3];
          const all2 = code3 !== null && map3.null;
          const list3 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(left) ? left : left ? [left] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list3)(code3);
        }
      }
      function handleListOfConstructs(list3) {
        listOfConstructs = list3;
        constructIndex = 0;
        if (list3.length === 0) {
          return bogusState;
        }
        return handleConstruct(list3[constructIndex]);
      }
      function handleConstruct(construct) {
        return start2;
        function start2(code3) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok(code3);
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok3,
            nok
          )(code3);
        }
      }
      function ok3(code3) {
        consumed = true;
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code3) {
        consumed = true;
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      from: startEventsIndex,
      restore
    };
    function restore() {
      point3 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point3.line in columnStart && point3.column < 2) {
      point3.column = columnStart[point3.line];
      point3.offset += columnStart[point3.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      const head = view[0];
      if (typeof head === "string") {
        view[0] = head.slice(startBufferIndex);
      } else {
        view.shift();
      }
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value2;
    if (typeof chunk === "string") {
      value2 = chunk;
    } else switch (chunk) {
      case -5: {
        value2 = "\r";
        break;
      }
      case -4: {
        value2 = "\n";
        break;
      }
      case -3: {
        value2 = "\r\n";
        break;
      }
      case -2: {
        value2 = expandTabs ? " " : "	";
        break;
      }
      case -1: {
        if (!expandTabs && atTab) continue;
        value2 = " ";
        break;
      }
      default: {
        value2 = String.fromCharCode(chunk);
      }
    }
    atTab = chunk === -2;
    result.push(value2);
  }
  return result.join("");
}

// node_modules/micromark/lib/parse.js
function parse(options) {
  const settings = options || {};
  const constructs2 = (
    /** @type {FullNormalizedExtension} */
    combineExtensions([constructs_exports, ...settings.extensions || []])
  );
  const parser = {
    constructs: constructs2,
    content: create2(content),
    defined: [],
    document: create2(document),
    flow: create2(flow),
    lazy: {},
    string: create2(string),
    text: create2(text)
  };
  return parser;
  function create2(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}

// node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}

// node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = "";
  let start2 = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value2, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code3;
    value2 = buffer + (typeof value2 === "string" ? value2.toString() : new TextDecoder(encoding || void 0).decode(value2));
    startPosition = 0;
    buffer = "";
    if (start2) {
      if (value2.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start2 = void 0;
    }
    while (startPosition < value2.length) {
      search.lastIndex = startPosition;
      match = search.exec(value2);
      endPosition = match && match.index !== void 0 ? match.index : value2.length;
      code3 = value2.charCodeAt(endPosition);
      if (!match) {
        buffer = value2.slice(startPosition);
        break;
      }
      if (code3 === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value2.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code3) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next) chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
}

// node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value2) {
  return value2.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}

// node_modules/mdast-util-from-markdown/lib/index.js
var own3 = {}.hasOwnProperty;
function fromMarkdown(value2, encoding, options) {
  if (encoding && typeof encoding === "object") {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(postprocess(parse(options).document().write(preprocess()(value2, encoding, true))));
}
function compiler(options) {
  const config = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: opener2(link2),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener2(heading2),
      blockQuote: opener2(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener2(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener2(codeFlow, buffer),
      codeText: opener2(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener2(definition3),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener2(emphasis2),
      hardBreakEscape: opener2(hardBreak2),
      hardBreakTrailing: opener2(hardBreak2),
      htmlFlow: opener2(html2, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener2(html2, buffer),
      htmlTextData: onenterdata,
      image: opener2(image2),
      label: buffer,
      link: opener2(link2),
      listItem: opener2(listItem2),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener2(list3, onenterlistordered),
      listUnordered: opener2(list3),
      paragraph: opener2(paragraph2),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener2(heading2),
      strong: opener2(strong2),
      thematicBreak: opener2(thematicBreak3)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      characterReference: onexitcharacterreference,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  };
  configure(config, (options || {}).mdastExtensions || []);
  const data2 = {};
  return compile;
  function compile(events) {
    let tree = {
      type: "root",
      children: []
    };
    const context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit: exit3,
      buffer,
      resume,
      data: data2
    };
    const listStack = [];
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler2 = config[events[index2][0]];
      if (own3.call(handler2, events[index2][1].type)) {
        handler2[events[index2][1].type].call(Object.assign({
          sliceSerialize: events[index2][2].sliceSerialize
        }, context), events[index2][1]);
      }
    }
    if (context.tokenStack.length > 0) {
      const tail = context.tokenStack[context.tokenStack.length - 1];
      const handler2 = tail[1] || defaultOnError;
      handler2.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(events.length > 0 ? events[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: point2(events.length > 0 ? events[events.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start2, length) {
    let index2 = start2 - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem3;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      switch (event[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          if (event[0] === "enter") {
            containerBalance++;
          } else {
            containerBalance--;
          }
          atMarker = void 0;
          break;
        }
        case "lineEndingBlank": {
          if (event[0] === "enter") {
            if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
              firstBlankLineIndex = index2;
            }
            atMarker = void 0;
          }
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace": {
          break;
        }
        default: {
          atMarker = void 0;
        }
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem3) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit") continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
            } else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem3._spread = true;
          }
          listItem3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
          events.splice(lineIndex || index2, 0, ["exit", listItem3, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          const item = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          listItem3 = item;
          events.splice(index2, 0, ["enter", item, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start2][1]._spread = listSpread;
    return length;
  }
  function opener2(create2, and) {
    return open;
    function open(token) {
      enter.call(this, create2(token), token);
      if (and) and.call(this, token);
    }
  }
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node2, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent.children;
    siblings.push(node2);
    this.stack.push(node2);
    this.tokenStack.push([token, errorHandler || void 0]);
    node2.position = {
      start: point2(token.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function closer(and) {
    return close2;
    function close2(token) {
      if (and) and.call(this, token);
      exit3.call(this, token);
    }
  }
  function exit3(token, onExitError) {
    const node2 = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
        start: token.start,
        end: token.end
      }) + "): it\u2019s not open");
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler2 = open[1] || defaultOnError;
        handler2.call(this, token, open[0]);
      }
    }
    node2.position.end = point2(token.end);
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterlistordered() {
    this.data.expectingFirstListItemValue = true;
  }
  function onenterlistitemvalue(token) {
    if (this.data.expectingFirstListItemValue) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
      this.data.expectingFirstListItemValue = void 0;
    }
  }
  function onexitcodefencedfenceinfo() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.lang = data3;
  }
  function onexitcodefencedfencemeta() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.meta = data3;
  }
  function onexitcodefencedfence() {
    if (this.data.flowCodeInside) return;
    this.buffer();
    this.data.flowCodeInside = true;
  }
  function onexitcodefenced() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data3.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    this.data.flowCodeInside = void 0;
  }
  function onexitcodeindented() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data3.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data3;
  }
  function onexitdefinitiondestinationstring() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data3;
  }
  function onexitatxheadingsequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    if (!node2.depth) {
      const depth = this.sliceSerialize(token).length;
      node2.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function onexitsetextheadinglinesequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function onenterdata(token) {
    const node2 = this.stack[this.stack.length - 1];
    const siblings = node2.children;
    let tail = siblings[siblings.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text5();
      tail.position = {
        start: point2(token.start),
        // @ts-expect-error: we’ll add `end` later.
        end: void 0
      };
      siblings.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end);
      this.data.atHardBreak = void 0;
      return;
    }
    if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  function onexithardbreak() {
    this.data.atHardBreak = true;
  }
  function onexithtmlflow() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data3;
  }
  function onexithtmltext() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data3;
  }
  function onexitcodetext() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data3;
  }
  function onexitlink() {
    const node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitimage() {
    const node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitlabeltext(token) {
    const string3 = this.sliceSerialize(token);
    const ancestor = this.stack[this.stack.length - 2];
    ancestor.label = decodeString(string3);
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    this.data.inReference = true;
    if (node2.type === "link") {
      const children = fragment.children;
      node2.children = children;
    } else {
      node2.alt = value2;
    }
  }
  function onexitresourcedestinationstring() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data3;
  }
  function onexitresourcetitlestring() {
    const data3 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data3;
  }
  function onexitresource() {
    this.data.inReference = void 0;
  }
  function onenterreference() {
    this.data.referenceType = "collapsed";
  }
  function onexitreferencestring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    this.data.referenceType = "full";
  }
  function onexitcharacterreferencemarker(token) {
    this.data.characterReferenceType = token.type;
  }
  function onexitcharacterreferencevalue(token) {
    const data3 = this.sliceSerialize(token);
    const type = this.data.characterReferenceType;
    let value2;
    if (type) {
      value2 = decodeNumericCharacterReference(data3, type === "characterReferenceMarkerNumeric" ? 10 : 16);
      this.data.characterReferenceType = void 0;
    } else {
      const result = decodeNamedCharacterReference(data3);
      value2 = result;
    }
    const tail = this.stack[this.stack.length - 1];
    tail.value += value2;
  }
  function onexitcharacterreference(token) {
    const tail = this.stack.pop();
    tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = "mailto:" + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition3() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis2() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading2() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function hardBreak2() {
    return {
      type: "break"
    };
  }
  function html2() {
    return {
      type: "html",
      value: ""
    };
  }
  function image2() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link2() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list3(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      spread: token._spread,
      children: []
    };
  }
  function listItem2(token) {
    return {
      type: "listItem",
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  function paragraph2() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong2() {
    return {
      type: "strong",
      children: []
    };
  }
  function text5() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak3() {
    return {
      type: "thematicBreak"
    };
  }
}
function point2(d) {
  return {
    line: d.line,
    column: d.column,
    offset: d.offset
  };
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value2 = extensions[index2];
    if (Array.isArray(value2)) {
      configure(combined, value2);
    } else {
      extension(combined, value2);
    }
  }
}
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own3.call(extension2, key)) {
      switch (key) {
        case "canContainEols": {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case "transforms": {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case "enter":
        case "exit": {
          const right = extension2[key];
          if (right) {
            Object.assign(combined[key], right);
          }
          break;
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
      start: left.start,
      end: left.end
    }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is open");
  } else {
    throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is still open");
  }
}

// node_modules/remark-parse/lib/index.js
function remarkParse(options) {
  const self2 = this;
  self2.parser = parser;
  function parser(doc) {
    return fromMarkdown(doc, {
      ...self2.data("settings"),
      ...options,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: self2.data("micromarkExtensions") || [],
      mdastExtensions: self2.data("fromMarkdownExtensions") || []
    });
  }
}

// node_modules/mdast-util-mdx-expression/lib/index.js
function mdxExpressionFromMarkdown() {
  return {
    enter: {
      mdxFlowExpression: enterMdxFlowExpression,
      mdxTextExpression: enterMdxTextExpression
    },
    exit: {
      mdxFlowExpression: exitMdxExpression,
      mdxFlowExpressionChunk: exitMdxExpressionData,
      mdxTextExpression: exitMdxExpression,
      mdxTextExpressionChunk: exitMdxExpressionData
    }
  };
}
function mdxExpressionToMarkdown() {
  return {
    handlers: {
      mdxFlowExpression: handleMdxExpression,
      mdxTextExpression: handleMdxExpression
    },
    unsafe: [
      { character: "{", inConstruct: ["phrasing"] },
      { atBreak: true, character: "{" }
    ]
  };
}
function enterMdxFlowExpression(token) {
  this.enter({ type: "mdxFlowExpression", value: "" }, token);
  this.buffer();
}
function enterMdxTextExpression(token) {
  this.enter({ type: "mdxTextExpression", value: "" }, token);
  this.buffer();
}
function exitMdxExpression(token) {
  const value2 = this.resume();
  const estree = token.estree;
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "mdxFlowExpression" || node2.type === "mdxTextExpression");
  this.exit(token);
  node2.value = value2;
  if (estree) {
    node2.data = { estree };
  }
}
function exitMdxExpressionData(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function handleMdxExpression(node2, parent, state) {
  const value2 = node2.value || "";
  const result = state.indentLines(value2, function(line, index2, blank) {
    return (index2 === 0 || blank ? "" : "  ") + line;
  });
  return "{" + result + "}";
}

// node_modules/ccount/index.js
function ccount(value2, character) {
  const source = String(value2);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index2 = source.indexOf(character);
  while (index2 !== -1) {
    count++;
    index2 = source.indexOf(character, index2 + character.length);
  }
  return count;
}

// node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// node_modules/character-reference-invalid/index.js
var characterReferenceInvalid = {
  0: "\uFFFD",
  128: "\u20AC",
  130: "\u201A",
  131: "\u0192",
  132: "\u201E",
  133: "\u2026",
  134: "\u2020",
  135: "\u2021",
  136: "\u02C6",
  137: "\u2030",
  138: "\u0160",
  139: "\u2039",
  140: "\u0152",
  142: "\u017D",
  145: "\u2018",
  146: "\u2019",
  147: "\u201C",
  148: "\u201D",
  149: "\u2022",
  150: "\u2013",
  151: "\u2014",
  152: "\u02DC",
  153: "\u2122",
  154: "\u0161",
  155: "\u203A",
  156: "\u0153",
  158: "\u017E",
  159: "\u0178"
};

// node_modules/is-decimal/index.js
function isDecimal(character) {
  const code3 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code3 >= 48 && code3 <= 57;
}

// node_modules/is-hexadecimal/index.js
function isHexadecimal(character) {
  const code3 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code3 >= 97 && code3 <= 102 || code3 >= 65 && code3 <= 70 || code3 >= 48 && code3 <= 57;
}

// node_modules/is-alphabetical/index.js
function isAlphabetical(character) {
  const code3 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code3 >= 97 && code3 <= 122 || code3 >= 65 && code3 <= 90;
}

// node_modules/is-alphanumerical/index.js
function isAlphanumerical(character) {
  return isAlphabetical(character) || isDecimal(character);
}

// node_modules/parse-entities/lib/index.js
var messages = [
  "",
  /* 1: Non terminated (named) */
  "Named character references must be terminated by a semicolon",
  /* 2: Non terminated (numeric) */
  "Numeric character references must be terminated by a semicolon",
  /* 3: Empty (named) */
  "Named character references cannot be empty",
  /* 4: Empty (numeric) */
  "Numeric character references cannot be empty",
  /* 5: Unknown (named) */
  "Named character references must be known",
  /* 6: Disallowed (numeric) */
  "Numeric character references cannot be disallowed",
  /* 7: Prohibited (numeric) */
  "Numeric character references cannot be outside the permissible Unicode range"
];
function parseEntities(value2, options) {
  const settings = options || {};
  const additional = typeof settings.additional === "string" ? settings.additional.charCodeAt(0) : settings.additional;
  const result = [];
  let index2 = 0;
  let lines = -1;
  let queue = "";
  let point3;
  let indent3;
  if (settings.position) {
    if ("start" in settings.position || "indent" in settings.position) {
      indent3 = settings.position.indent;
      point3 = settings.position.start;
    } else {
      point3 = settings.position;
    }
  }
  let line = (point3 ? point3.line : 0) || 1;
  let column = (point3 ? point3.column : 0) || 1;
  let previous3 = now();
  let character;
  index2--;
  while (++index2 <= value2.length) {
    if (character === 10) {
      column = (indent3 ? indent3[lines] : 0) || 1;
    }
    character = value2.charCodeAt(index2);
    if (character === 38) {
      const following = value2.charCodeAt(index2 + 1);
      if (following === 9 || following === 10 || following === 12 || following === 32 || following === 38 || following === 60 || Number.isNaN(following) || additional && following === additional) {
        queue += String.fromCharCode(character);
        column++;
        continue;
      }
      const start2 = index2 + 1;
      let begin = start2;
      let end = start2;
      let type;
      if (following === 35) {
        end = ++begin;
        const following2 = value2.charCodeAt(end);
        if (following2 === 88 || following2 === 120) {
          type = "hexadecimal";
          end = ++begin;
        } else {
          type = "decimal";
        }
      } else {
        type = "named";
      }
      let characterReferenceCharacters = "";
      let characterReference2 = "";
      let characters = "";
      const test = type === "named" ? isAlphanumerical : type === "decimal" ? isDecimal : isHexadecimal;
      end--;
      while (++end <= value2.length) {
        const following2 = value2.charCodeAt(end);
        if (!test(following2)) {
          break;
        }
        characters += String.fromCharCode(following2);
        if (type === "named" && characterEntitiesLegacy.includes(characters)) {
          characterReferenceCharacters = characters;
          characterReference2 = decodeNamedCharacterReference(characters);
        }
      }
      let terminated = value2.charCodeAt(end) === 59;
      if (terminated) {
        end++;
        const namedReference = type === "named" ? decodeNamedCharacterReference(characters) : false;
        if (namedReference) {
          characterReferenceCharacters = characters;
          characterReference2 = namedReference;
        }
      }
      let diff = 1 + end - start2;
      let reference = "";
      if (!terminated && settings.nonTerminated === false) {
      } else if (!characters) {
        if (type !== "named") {
          warning(4, diff);
        }
      } else if (type === "named") {
        if (terminated && !characterReference2) {
          warning(5, 1);
        } else {
          if (characterReferenceCharacters !== characters) {
            end = begin + characterReferenceCharacters.length;
            diff = 1 + end - begin;
            terminated = false;
          }
          if (!terminated) {
            const reason = characterReferenceCharacters ? 1 : 3;
            if (settings.attribute) {
              const following2 = value2.charCodeAt(end);
              if (following2 === 61) {
                warning(reason, diff);
                characterReference2 = "";
              } else if (isAlphanumerical(following2)) {
                characterReference2 = "";
              } else {
                warning(reason, diff);
              }
            } else {
              warning(reason, diff);
            }
          }
        }
        reference = characterReference2;
      } else {
        if (!terminated) {
          warning(2, diff);
        }
        let referenceCode = Number.parseInt(
          characters,
          type === "hexadecimal" ? 16 : 10
        );
        if (prohibited(referenceCode)) {
          warning(7, diff);
          reference = String.fromCharCode(
            65533
            /* `�` */
          );
        } else if (referenceCode in characterReferenceInvalid) {
          warning(6, diff);
          reference = characterReferenceInvalid[referenceCode];
        } else {
          let output = "";
          if (disallowed(referenceCode)) {
            warning(6, diff);
          }
          if (referenceCode > 65535) {
            referenceCode -= 65536;
            output += String.fromCharCode(
              referenceCode >>> (10 & 1023) | 55296
            );
            referenceCode = 56320 | referenceCode & 1023;
          }
          reference = output + String.fromCharCode(referenceCode);
        }
      }
      if (reference) {
        flush();
        previous3 = now();
        index2 = end - 1;
        column += end - start2 + 1;
        result.push(reference);
        const next = now();
        next.offset++;
        if (settings.reference) {
          settings.reference.call(
            settings.referenceContext || void 0,
            reference,
            { start: previous3, end: next },
            value2.slice(start2 - 1, end)
          );
        }
        previous3 = next;
      } else {
        characters = value2.slice(start2 - 1, end);
        queue += characters;
        column += characters.length;
        index2 = end - 1;
      }
    } else {
      if (character === 10) {
        line++;
        lines++;
        column = 0;
      }
      if (Number.isNaN(character)) {
        flush();
      } else {
        queue += String.fromCharCode(character);
        column++;
      }
    }
  }
  return result.join("");
  function now() {
    return {
      line,
      column,
      offset: index2 + ((point3 ? point3.offset : 0) || 0)
    };
  }
  function warning(code3, offset2) {
    let position2;
    if (settings.warning) {
      position2 = now();
      position2.column += offset2;
      position2.offset += offset2;
      settings.warning.call(
        settings.warningContext || void 0,
        messages[code3],
        position2,
        code3
      );
    }
  }
  function flush() {
    if (queue) {
      result.push(queue);
      if (settings.text) {
        settings.text.call(settings.textContext || void 0, queue, {
          start: previous3,
          end: now()
        });
      }
      queue = "";
    }
  }
}
function prohibited(code3) {
  return code3 >= 55296 && code3 <= 57343 || code3 > 1114111;
}
function disallowed(code3) {
  return code3 >= 1 && code3 <= 8 || code3 === 11 || code3 >= 13 && code3 <= 31 || code3 >= 127 && code3 <= 159 || code3 >= 64976 && code3 <= 65007 || (code3 & 65535) === 65535 || (code3 & 65535) === 65534;
}

// node_modules/stringify-entities/lib/core.js
var defaultSubsetRegex = /["&'<>`]/g;
var surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
var controlCharactersRegex = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
);
var regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
var subsetToRegexCache = /* @__PURE__ */ new WeakMap();
function core(value2, options) {
  value2 = value2.replace(
    options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value2;
  }
  return value2.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
  function surrogate(pair, index2, all2) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all2.charCodeAt(index2 + 2),
      options
    );
  }
  function basic(character, index2, all2) {
    return options.format(
      character.charCodeAt(0),
      all2.charCodeAt(index2 + 1),
      options
    );
  }
}
function charactersToExpressionCached(subset) {
  let cached = subsetToRegexCache.get(subset);
  if (!cached) {
    cached = charactersToExpression(subset);
    subsetToRegexCache.set(subset, cached);
  }
  return cached;
}
function charactersToExpression(subset) {
  const groups = [];
  let index2 = -1;
  while (++index2 < subset.length) {
    groups.push(subset[index2].replace(regexEscapeRegex, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}

// node_modules/stringify-entities/lib/util/format-basic.js
function formatBasic(code3) {
  return "&#x" + code3.toString(16).toUpperCase() + ";";
}

// node_modules/stringify-entities/lib/index.js
function stringifyEntitiesLight(value2, options) {
  return core(value2, Object.assign({ format: formatBasic }, options));
}

// node_modules/mdast-util-mdx-jsx/lib/index.js
var indent = "  ";
function mdxJsxFromMarkdown() {
  return {
    canContainEols: ["mdxJsxTextElement"],
    enter: {
      mdxJsxFlowTag: enterMdxJsxTag,
      mdxJsxFlowTagClosingMarker: enterMdxJsxTagClosingMarker,
      mdxJsxFlowTagAttribute: enterMdxJsxTagAttribute,
      mdxJsxFlowTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
      mdxJsxFlowTagAttributeValueLiteral: buffer,
      mdxJsxFlowTagAttributeValueExpression: buffer,
      mdxJsxFlowTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker,
      mdxJsxTextTag: enterMdxJsxTag,
      mdxJsxTextTagClosingMarker: enterMdxJsxTagClosingMarker,
      mdxJsxTextTagAttribute: enterMdxJsxTagAttribute,
      mdxJsxTextTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
      mdxJsxTextTagAttributeValueLiteral: buffer,
      mdxJsxTextTagAttributeValueExpression: buffer,
      mdxJsxTextTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker
    },
    exit: {
      mdxJsxFlowTagClosingMarker: exitMdxJsxTagClosingMarker,
      mdxJsxFlowTagNamePrimary: exitMdxJsxTagNamePrimary,
      mdxJsxFlowTagNameMember: exitMdxJsxTagNameMember,
      mdxJsxFlowTagNameLocal: exitMdxJsxTagNameLocal,
      mdxJsxFlowTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
      mdxJsxFlowTagExpressionAttributeValue: data2,
      mdxJsxFlowTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
      mdxJsxFlowTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
      mdxJsxFlowTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
      mdxJsxFlowTagAttributeValueLiteralValue: data2,
      mdxJsxFlowTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
      mdxJsxFlowTagAttributeValueExpressionValue: data2,
      mdxJsxFlowTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
      mdxJsxFlowTag: exitMdxJsxTag,
      mdxJsxTextTagClosingMarker: exitMdxJsxTagClosingMarker,
      mdxJsxTextTagNamePrimary: exitMdxJsxTagNamePrimary,
      mdxJsxTextTagNameMember: exitMdxJsxTagNameMember,
      mdxJsxTextTagNameLocal: exitMdxJsxTagNameLocal,
      mdxJsxTextTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
      mdxJsxTextTagExpressionAttributeValue: data2,
      mdxJsxTextTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
      mdxJsxTextTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
      mdxJsxTextTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
      mdxJsxTextTagAttributeValueLiteralValue: data2,
      mdxJsxTextTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
      mdxJsxTextTagAttributeValueExpressionValue: data2,
      mdxJsxTextTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
      mdxJsxTextTag: exitMdxJsxTag
    }
  };
  function buffer() {
    this.buffer();
  }
  function point3(d) {
    return { line: d.line, column: d.column, offset: d.offset };
  }
  function data2(token) {
    this.config.enter.data.call(this, token);
    this.config.exit.data.call(this, token);
  }
  function enterMdxJsxTag(token) {
    const tag = {
      name: void 0,
      attributes: [],
      close: false,
      selfClosing: false,
      start: token.start,
      end: token.end
    };
    if (!this.data.mdxJsxTagStack) this.data.mdxJsxTagStack = [];
    this.data.mdxJsxTag = tag;
    this.buffer();
  }
  function enterMdxJsxTagClosingMarker(token) {
    const stack = this.data.mdxJsxTagStack;
    ok(stack, "expected `mdxJsxTagStack`");
    if (stack.length === 0) {
      throw new VFileMessage(
        "Unexpected closing slash `/` in tag, expected an open tag first",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-closing-slash"
      );
    }
  }
  function enterMdxJsxTagAnyAttribute(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    if (tag.close) {
      throw new VFileMessage(
        "Unexpected attribute in closing tag, expected the end of the tag",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-attribute"
      );
    }
  }
  function enterMdxJsxTagSelfClosingMarker(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    if (tag.close) {
      throw new VFileMessage(
        "Unexpected self-closing slash `/` in closing tag, expected the end of the tag",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-self-closing-slash"
      );
    }
  }
  function exitMdxJsxTagClosingMarker() {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    tag.close = true;
  }
  function exitMdxJsxTagNamePrimary(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    tag.name = this.sliceSerialize(token);
  }
  function exitMdxJsxTagNameMember(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    tag.name += "." + this.sliceSerialize(token);
  }
  function exitMdxJsxTagNameLocal(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    tag.name += ":" + this.sliceSerialize(token);
  }
  function enterMdxJsxTagAttribute(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    enterMdxJsxTagAnyAttribute.call(this, token);
    tag.attributes.push({
      type: "mdxJsxAttribute",
      name: "",
      value: null,
      position: {
        start: point3(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    });
  }
  function enterMdxJsxTagExpressionAttribute(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    enterMdxJsxTagAnyAttribute.call(this, token);
    tag.attributes.push({
      type: "mdxJsxExpressionAttribute",
      value: "",
      position: {
        start: point3(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    });
    this.buffer();
  }
  function exitMdxJsxTagExpressionAttribute(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    const tail = tag.attributes[tag.attributes.length - 1];
    ok(tail.type === "mdxJsxExpressionAttribute");
    const estree = token.estree;
    tail.value = this.resume();
    ok(tail.position !== void 0);
    tail.position.end = point3(token.end);
    if (estree) {
      tail.data = { estree };
    }
  }
  function exitMdxJsxTagAttributeNamePrimary(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    const node2 = tag.attributes[tag.attributes.length - 1];
    ok(node2.type === "mdxJsxAttribute");
    node2.name = this.sliceSerialize(token);
    ok(node2.position !== void 0);
    node2.position.end = point3(token.end);
  }
  function exitMdxJsxTagAttributeNameLocal(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    const node2 = tag.attributes[tag.attributes.length - 1];
    ok(node2.type === "mdxJsxAttribute");
    node2.name += ":" + this.sliceSerialize(token);
    ok(node2.position !== void 0);
    node2.position.end = point3(token.end);
  }
  function exitMdxJsxTagAttributeValueLiteral(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    const node2 = tag.attributes[tag.attributes.length - 1];
    node2.value = parseEntities(this.resume(), { nonTerminated: false });
    ok(node2.position !== void 0);
    node2.position.end = point3(token.end);
  }
  function exitMdxJsxTagAttributeValueExpression(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    const tail = tag.attributes[tag.attributes.length - 1];
    ok(tail.type === "mdxJsxAttribute");
    const node2 = { type: "mdxJsxAttributeValueExpression", value: this.resume() };
    const estree = token.estree;
    if (estree) {
      node2.data = { estree };
    }
    tail.value = node2;
    ok(tail.position !== void 0);
    tail.position.end = point3(token.end);
  }
  function exitMdxJsxTagSelfClosingMarker() {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    tag.selfClosing = true;
  }
  function exitMdxJsxTag(token) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    const stack = this.data.mdxJsxTagStack;
    ok(stack, "expected `mdxJsxTagStack`");
    const tail = stack[stack.length - 1];
    if (tag.close && tail.name !== tag.name) {
      throw new VFileMessage(
        "Unexpected closing tag `" + serializeAbbreviatedTag(tag) + "`, expected corresponding closing tag for `" + serializeAbbreviatedTag(tail) + "` (" + stringifyPosition(tail) + ")",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:end-tag-mismatch"
      );
    }
    this.resume();
    if (tag.close) {
      stack.pop();
    } else {
      this.enter(
        {
          type: token.type === "mdxJsxTextTag" ? "mdxJsxTextElement" : "mdxJsxFlowElement",
          name: tag.name || null,
          attributes: tag.attributes,
          children: []
        },
        token,
        onErrorRightIsTag
      );
    }
    if (tag.selfClosing || tag.close) {
      this.exit(token, onErrorLeftIsTag);
    } else {
      stack.push(tag);
    }
  }
  function onErrorRightIsTag(closing, open) {
    const stack = this.data.mdxJsxTagStack;
    ok(stack, "expected `mdxJsxTagStack`");
    const tag = stack[stack.length - 1];
    ok(tag, "expected `mdxJsxTag`");
    const place = closing ? " before the end of `" + closing.type + "`" : "";
    const position2 = closing ? { start: closing.start, end: closing.end } : void 0;
    throw new VFileMessage(
      "Expected a closing tag for `" + serializeAbbreviatedTag(tag) + "` (" + stringifyPosition({ start: open.start, end: open.end }) + ")" + place,
      position2,
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function onErrorLeftIsTag(a, b) {
    const tag = this.data.mdxJsxTag;
    ok(tag, "expected `mdxJsxTag`");
    throw new VFileMessage(
      "Expected the closing tag `" + serializeAbbreviatedTag(tag) + "` either after the end of `" + b.type + "` (" + stringifyPosition(b.end) + ") or another opening tag after the start of `" + b.type + "` (" + stringifyPosition(b.start) + ")",
      { start: a.start, end: a.end },
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function serializeAbbreviatedTag(tag) {
    return "<" + (tag.close ? "/" : "") + (tag.name || "") + ">";
  }
}
function mdxJsxToMarkdown(options) {
  const options_ = options || {};
  const quote = options_.quote || '"';
  const quoteSmart = options_.quoteSmart || false;
  const tightSelfClosing = options_.tightSelfClosing || false;
  const printWidth = options_.printWidth || Number.POSITIVE_INFINITY;
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error(
      "Cannot serialize attribute values with `" + quote + "` for `options.quote`, expected `\"`, or `'`"
    );
  }
  mdxElement.peek = peekElement;
  return {
    handlers: {
      mdxJsxFlowElement: mdxElement,
      mdxJsxTextElement: mdxElement
    },
    unsafe: [
      { character: "<", inConstruct: ["phrasing"] },
      { atBreak: true, character: "<" }
    ],
    // Always generate fenced code (never indented code).
    fences: true,
    // Always generate links with resources (never autolinks).
    resourceLink: true
  };
  function mdxElement(node2, _, state, info) {
    const flow3 = node2.type === "mdxJsxFlowElement";
    const selfClosing = node2.name ? !node2.children || node2.children.length === 0 : false;
    const depth = inferDepth(state);
    const currentIndent = createIndent(depth);
    const trackerOneLine = state.createTracker(info);
    const trackerMultiLine = state.createTracker(info);
    const serializedAttributes = [];
    const prefix = (flow3 ? currentIndent : "") + "<" + (node2.name || "");
    const exit3 = state.enter(node2.type);
    trackerOneLine.move(prefix);
    trackerMultiLine.move(prefix);
    if (node2.attributes && node2.attributes.length > 0) {
      if (!node2.name) {
        throw new Error("Cannot serialize fragment w/ attributes");
      }
      let index2 = -1;
      while (++index2 < node2.attributes.length) {
        const attribute = node2.attributes[index2];
        let result;
        if (attribute.type === "mdxJsxExpressionAttribute") {
          result = "{" + (attribute.value || "") + "}";
        } else {
          if (!attribute.name) {
            throw new Error("Cannot serialize attribute w/o name");
          }
          const value3 = attribute.value;
          const left = attribute.name;
          let right = "";
          if (value3 === null || value3 === void 0) {
          } else if (typeof value3 === "object") {
            right = "{" + (value3.value || "") + "}";
          } else {
            const appliedQuote = quoteSmart && ccount(value3, quote) > ccount(value3, alternative) ? alternative : quote;
            right = appliedQuote + stringifyEntitiesLight(value3, { subset: [appliedQuote] }) + appliedQuote;
          }
          result = left + (right ? "=" : "") + right;
        }
        serializedAttributes.push(result);
      }
    }
    let attributesOnTheirOwnLine = false;
    const attributesOnOneLine = serializedAttributes.join(" ");
    if (
      // Block:
      flow3 && // Including a line ending (expressions).
      (/\r?\n|\r/.test(attributesOnOneLine) || // Current position (including `<tag`).
      trackerOneLine.current().now.column + // -1 because columns, +1 for ` ` before attributes.
      // Attributes joined by spaces.
      attributesOnOneLine.length + // ` />`.
      (selfClosing ? tightSelfClosing ? 2 : 3 : 1) > printWidth)
    ) {
      attributesOnTheirOwnLine = true;
    }
    let tracker = trackerOneLine;
    let value2 = prefix;
    if (attributesOnTheirOwnLine) {
      tracker = trackerMultiLine;
      let index2 = -1;
      while (++index2 < serializedAttributes.length) {
        serializedAttributes[index2] = currentIndent + indent + serializedAttributes[index2];
      }
      value2 += tracker.move(
        "\n" + serializedAttributes.join("\n") + "\n" + currentIndent
      );
    } else if (attributesOnOneLine) {
      value2 += tracker.move(" " + attributesOnOneLine);
    }
    if (selfClosing) {
      value2 += tracker.move(
        (tightSelfClosing || attributesOnTheirOwnLine ? "" : " ") + "/"
      );
    }
    value2 += tracker.move(">");
    if (node2.children && node2.children.length > 0) {
      if (node2.type === "mdxJsxTextElement") {
        value2 += tracker.move(
          state.containerPhrasing(node2, {
            ...tracker.current(),
            before: ">",
            after: "<"
          })
        );
      } else {
        tracker.shift(2);
        value2 += tracker.move("\n");
        value2 += tracker.move(containerFlow(node2, state, tracker.current()));
        value2 += tracker.move("\n");
      }
    }
    if (!selfClosing) {
      value2 += tracker.move(
        (flow3 ? currentIndent : "") + "</" + (node2.name || "") + ">"
      );
    }
    exit3();
    return value2;
  }
}
function containerFlow(parent, state, info) {
  const indexStack = state.indexStack;
  const children = parent.children;
  const tracker = state.createTracker(info);
  const currentIndent = createIndent(inferDepth(state));
  const results = [];
  let index2 = -1;
  indexStack.push(-1);
  while (++index2 < children.length) {
    const child = children[index2];
    indexStack[indexStack.length - 1] = index2;
    const childInfo = { before: "\n", after: "\n", ...tracker.current() };
    const result = state.handle(child, parent, state, childInfo);
    const serializedChild = child.type === "mdxJsxFlowElement" ? result : state.indentLines(result, function(line, _, blank) {
      return (blank ? "" : currentIndent) + line;
    });
    results.push(tracker.move(serializedChild));
    if (child.type !== "list") {
      state.bulletLastUsed = void 0;
    }
    if (index2 < children.length - 1) {
      results.push(tracker.move("\n\n"));
    }
  }
  indexStack.pop();
  return results.join("");
}
function inferDepth(state) {
  let depth = 0;
  let index2 = state.stack.length;
  while (--index2 > -1) {
    const name2 = state.stack[index2];
    if (name2 === "blockquote" || name2 === "listItem") break;
    if (name2 === "mdxJsxFlowElement") depth++;
  }
  return depth;
}
function createIndent(depth) {
  return indent.repeat(depth);
}
function peekElement() {
  return "<";
}

// node_modules/mdast-util-mdxjs-esm/lib/index.js
function mdxjsEsmFromMarkdown() {
  return {
    enter: { mdxjsEsm: enterMdxjsEsm },
    exit: { mdxjsEsm: exitMdxjsEsm, mdxjsEsmData: exitMdxjsEsmData }
  };
}
function mdxjsEsmToMarkdown() {
  return { handlers: { mdxjsEsm: handleMdxjsEsm } };
}
function enterMdxjsEsm(token) {
  this.enter({ type: "mdxjsEsm", value: "" }, token);
  this.buffer();
}
function exitMdxjsEsm(token) {
  const value2 = this.resume();
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "mdxjsEsm");
  this.exit(token);
  const estree = token.estree;
  node2.value = value2;
  if (estree) {
    node2.data = { estree };
  }
}
function exitMdxjsEsmData(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function handleMdxjsEsm(node2) {
  return node2.value || "";
}

// node_modules/mdast-util-mdx/lib/index.js
function mdxFromMarkdown() {
  return [
    mdxExpressionFromMarkdown(),
    mdxJsxFromMarkdown(),
    mdxjsEsmFromMarkdown()
  ];
}
function mdxToMarkdown(options) {
  return {
    extensions: [
      mdxExpressionToMarkdown(),
      mdxJsxToMarkdown(options),
      mdxjsEsmToMarkdown()
    ]
  };
}

// node_modules/acorn/dist/acorn.mjs
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 78, 5, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 199, 7, 137, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 55, 9, 266, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 233, 0, 3, 0, 8, 1, 6, 0, 475, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 7, 25, 39, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 5, 57, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 24, 43, 261, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 33, 24, 3, 24, 45, 74, 6, 0, 67, 12, 65, 1, 2, 0, 15, 4, 10, 7381, 42, 31, 98, 114, 8702, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 208, 30, 2, 2, 2, 1, 2, 6, 3, 4, 10, 1, 225, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4381, 3, 5773, 3, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 8489];
var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};
var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
var keywords$1 = {
  5: ecma5AndLessKeywords,
  "5module": ecma5AndLessKeywords + " export import",
  6: ecma5AndLessKeywords + " const class extends export import super"
};
var keywordRelationalOperator = /^in(stanceof)?$/;
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
function isInAstralSet(code3, set) {
  var pos = 65536;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code3) {
      return false;
    }
    pos += set[i + 1];
    if (pos >= code3) {
      return true;
    }
  }
  return false;
}
function isIdentifierStart(code3, astral) {
  if (code3 < 65) {
    return code3 === 36;
  }
  if (code3 < 91) {
    return true;
  }
  if (code3 < 97) {
    return code3 === 95;
  }
  if (code3 < 123) {
    return true;
  }
  if (code3 <= 65535) {
    return code3 >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code3));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code3, astralIdentifierStartCodes);
}
function isIdentifierChar(code3, astral) {
  if (code3 < 48) {
    return code3 === 36;
  }
  if (code3 < 58) {
    return true;
  }
  if (code3 < 65) {
    return false;
  }
  if (code3 < 91) {
    return true;
  }
  if (code3 < 97) {
    return code3 === 95;
  }
  if (code3 < 123) {
    return true;
  }
  if (code3 <= 65535) {
    return code3 >= 170 && nonASCIIidentifier.test(String.fromCharCode(code3));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code3, astralIdentifierStartCodes) || isInAstralSet(code3, astralIdentifierCodes);
}
var TokenType = function TokenType2(label, conf) {
  if (conf === void 0) conf = {};
  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};
function binop(name2, prec) {
  return new TokenType(name2, { beforeExpr: true, binop: prec });
}
var beforeExpr = { beforeExpr: true };
var startsExpr = { startsExpr: true };
var keywords = {};
function kw(name2, options) {
  if (options === void 0) options = {};
  options.keyword = name2;
  return keywords[name2] = new TokenType(name2, options);
}
var types$1 = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  privateId: new TokenType("privateId", startsExpr),
  eof: new TokenType("eof"),
  // Punctuation token types.
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", { beforeExpr: true }),
  coalesce: binop("??", 1),
  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", { isLoop: true, beforeExpr: true }),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", { isLoop: true }),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", { isLoop: true }),
  _with: kw("with"),
  _new: kw("new", { beforeExpr: true, startsExpr: true }),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", { beforeExpr: true, binop: 7 }),
  _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
  _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
  _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
  _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
};
var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");
function isNewLine(code3) {
  return code3 === 10 || code3 === 13 || code3 === 8232 || code3 === 8233;
}
function nextLineBreak(code3, from, end) {
  if (end === void 0) end = code3.length;
  for (var i = from; i < end; i++) {
    var next = code3.charCodeAt(i);
    if (isNewLine(next)) {
      return i < end - 1 && next === 13 && code3.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
    }
  }
  return -1;
}
var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
var ref = Object.prototype;
var hasOwnProperty2 = ref.hasOwnProperty;
var toString2 = ref.toString;
var hasOwn = Object.hasOwn || (function(obj, propName) {
  return hasOwnProperty2.call(obj, propName);
});
var isArray = Array.isArray || (function(obj) {
  return toString2.call(obj) === "[object Array]";
});
var regexpCache = /* @__PURE__ */ Object.create(null);
function wordsRegexp(words) {
  return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"));
}
function codePointToString(code3) {
  if (code3 <= 65535) {
    return String.fromCharCode(code3);
  }
  code3 -= 65536;
  return String.fromCharCode((code3 >> 10) + 55296, (code3 & 1023) + 56320);
}
var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
var Position = function Position2(line, col) {
  this.line = line;
  this.column = col;
};
Position.prototype.offset = function offset(n) {
  return new Position(this.line, this.column + n);
};
var SourceLocation = function SourceLocation2(p, start2, end) {
  this.start = start2;
  this.end = end;
  if (p.sourceFile !== null) {
    this.source = p.sourceFile;
  }
};
function getLineInfo(input, offset2) {
  for (var line = 1, cur = 0; ; ) {
    var nextBreak = nextLineBreak(input, cur, offset2);
    if (nextBreak < 0) {
      return new Position(line, offset2 - cur);
    }
    ++line;
    cur = nextBreak;
  }
}
var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
  // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
  // (the latest version the library supports). This influences
  // support for strict mode, the set of reserved words, and support
  // for new syntax features.
  ecmaVersion: null,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"`, `"module"` or `"commonjs"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called when
  // a semicolon is automatically inserted. It will be passed the
  // position of the inserted semicolon as an offset, and if
  // `locations` is enabled, it is given the location as a `{line,
  // column}` object as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program, and an import.meta expression
  // in a script isn't considered an error.
  allowImportExportEverywhere: false,
  // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: null,
  // When enabled, super identifiers are not constrained to
  // appearing in methods and do not raise an error when they appear elsewhere.
  allowSuperOutsideMethod: null,
  // When enabled, hashbang directive in the beginning of file is
  // allowed and treated as a line comment. Enabled by default when
  // `ecmaVersion` >= 2023.
  allowHashBang: false,
  // By default, the parser will verify that private properties are
  // only used in places where they are valid and have been declared.
  // Set this to false to turn such checks off.
  checkPrivateFields: true,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  // When this option has an array as value, objects representing the
  // comments are pushed to it.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false
};
var warnedAboutEcmaVersion = false;
function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions) {
    options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
  }
  if (options.ecmaVersion === "latest") {
    options.ecmaVersion = 1e8;
  } else if (options.ecmaVersion == null) {
    if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
      warnedAboutEcmaVersion = true;
      console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
    }
    options.ecmaVersion = 11;
  } else if (options.ecmaVersion >= 2015) {
    options.ecmaVersion -= 2009;
  }
  if (options.allowReserved == null) {
    options.allowReserved = options.ecmaVersion < 5;
  }
  if (!opts || opts.allowHashBang == null) {
    options.allowHashBang = options.ecmaVersion >= 14;
  }
  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function(token) {
      return tokens.push(token);
    };
  }
  if (isArray(options.onComment)) {
    options.onComment = pushComment(options, options.onComment);
  }
  if (options.sourceType === "commonjs" && options.allowAwaitOutsideFunction) {
    throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
  }
  return options;
}
function pushComment(options, array) {
  return function(block, text5, start2, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text5,
      start: start2,
      end
    };
    if (options.locations) {
      comment.loc = new SourceLocation(this, startLoc, endLoc);
    }
    if (options.ranges) {
      comment.range = [start2, end];
    }
    array.push(comment);
  };
}
var SCOPE_TOP = 1;
var SCOPE_FUNCTION = 2;
var SCOPE_ASYNC = 4;
var SCOPE_GENERATOR = 8;
var SCOPE_ARROW = 16;
var SCOPE_SIMPLE_CATCH = 32;
var SCOPE_SUPER = 64;
var SCOPE_DIRECT_SUPER = 128;
var SCOPE_CLASS_STATIC_BLOCK = 256;
var SCOPE_CLASS_FIELD_INIT = 512;
var SCOPE_SWITCH = 1024;
var SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
}
var BIND_NONE = 0;
var BIND_VAR = 1;
var BIND_LEXICAL = 2;
var BIND_FUNCTION = 3;
var BIND_SIMPLE_CATCH = 4;
var BIND_OUTSIDE = 5;
var Parser = function Parser2(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
  var reserved = "";
  if (options.allowReserved !== true) {
    reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
    if (options.sourceType === "module") {
      reserved += " await";
    }
  }
  this.reservedWords = wordsRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
  this.reservedWordsStrict = wordsRegexp(reservedStrict);
  this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
  this.input = String(input);
  this.containsEsc = false;
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }
  this.type = types$1.eof;
  this.value = null;
  this.start = this.end = this.pos;
  this.startLoc = this.endLoc = this.curPosition();
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;
  this.context = this.initialContext();
  this.exprAllowed = true;
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);
  this.potentialArrowAt = -1;
  this.potentialArrowInForAwait = false;
  this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
  this.labels = [];
  this.undefinedExports = /* @__PURE__ */ Object.create(null);
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
    this.skipLineComment(2);
  }
  this.scopeStack = [];
  this.enterScope(
    this.options.sourceType === "commonjs" ? SCOPE_FUNCTION : SCOPE_TOP
  );
  this.regexpState = null;
  this.privateNameStack = [];
};
var prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowReturn: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, allowUsing: { configurable: true }, inClassStaticBlock: { configurable: true } };
Parser.prototype.parse = function parse2() {
  var node2 = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node2);
};
prototypeAccessors.inFunction.get = function() {
  return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
};
prototypeAccessors.inGenerator.get = function() {
  return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
};
prototypeAccessors.inAsync.get = function() {
  return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
};
prototypeAccessors.canAwait.get = function() {
  for (var i = this.scopeStack.length - 1; i >= 0; i--) {
    var ref2 = this.scopeStack[i];
    var flags = ref2.flags;
    if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT)) {
      return false;
    }
    if (flags & SCOPE_FUNCTION) {
      return (flags & SCOPE_ASYNC) > 0;
    }
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
prototypeAccessors.allowReturn.get = function() {
  if (this.inFunction) {
    return true;
  }
  if (this.options.allowReturnOutsideFunction && this.currentVarScope().flags & SCOPE_TOP) {
    return true;
  }
  return false;
};
prototypeAccessors.allowSuper.get = function() {
  var ref2 = this.currentThisScope();
  var flags = ref2.flags;
  return (flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod;
};
prototypeAccessors.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
};
prototypeAccessors.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
prototypeAccessors.allowNewDotTarget.get = function() {
  for (var i = this.scopeStack.length - 1; i >= 0; i--) {
    var ref2 = this.scopeStack[i];
    var flags = ref2.flags;
    if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) || flags & SCOPE_FUNCTION && !(flags & SCOPE_ARROW)) {
      return true;
    }
  }
  return false;
};
prototypeAccessors.allowUsing.get = function() {
  var ref2 = this.currentScope();
  var flags = ref2.flags;
  if (flags & SCOPE_SWITCH) {
    return false;
  }
  if (!this.inModule && flags & SCOPE_TOP) {
    return false;
  }
  return true;
};
prototypeAccessors.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
};
Parser.extend = function extend2() {
  var plugins = [], len = arguments.length;
  while (len--) plugins[len] = arguments[len];
  var cls = this;
  for (var i = 0; i < plugins.length; i++) {
    cls = plugins[i](cls);
  }
  return cls;
};
Parser.parse = function parse3(input, options) {
  return new this(options, input).parse();
};
Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
  var parser = new this(options, input, pos);
  parser.nextToken();
  return parser.parseExpression();
};
Parser.tokenizer = function tokenizer(input, options) {
  return new this(options, input);
};
Object.defineProperties(Parser.prototype, prototypeAccessors);
var pp$9 = Parser.prototype;
var literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
pp$9.strictDirective = function(start2) {
  if (this.options.ecmaVersion < 5) {
    return false;
  }
  for (; ; ) {
    skipWhiteSpace.lastIndex = start2;
    start2 += skipWhiteSpace.exec(this.input)[0].length;
    var match = literal.exec(this.input.slice(start2));
    if (!match) {
      return false;
    }
    if ((match[1] || match[2]) === "use strict") {
      skipWhiteSpace.lastIndex = start2 + match[0].length;
      var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
      var next = this.input.charAt(end);
      return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
    }
    start2 += match[0].length;
    skipWhiteSpace.lastIndex = start2;
    start2 += skipWhiteSpace.exec(this.input)[0].length;
    if (this.input[start2] === ";") {
      start2++;
    }
  }
};
pp$9.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};
pp$9.isContextual = function(name2) {
  return this.type === types$1.name && this.value === name2 && !this.containsEsc;
};
pp$9.eatContextual = function(name2) {
  if (!this.isContextual(name2)) {
    return false;
  }
  this.next();
  return true;
};
pp$9.expectContextual = function(name2) {
  if (!this.eatContextual(name2)) {
    this.unexpected();
  }
};
pp$9.canInsertSemicolon = function() {
  return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};
pp$9.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon) {
      this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
    }
    return true;
  }
};
pp$9.semicolon = function() {
  if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
    this.unexpected();
  }
};
pp$9.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma) {
      this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
    }
    if (!notNext) {
      this.next();
    }
    return true;
  }
};
pp$9.expect = function(type) {
  this.eat(type) || this.unexpected();
};
pp$9.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};
var DestructuringErrors = function DestructuringErrors2() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) {
    return;
  }
  if (refDestructuringErrors.trailingComma > -1) {
    this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
  }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) {
    this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) {
    return false;
  }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) {
    return shorthandAssign >= 0 || doubleProto >= 0;
  }
  if (shorthandAssign >= 0) {
    this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
  }
  if (doubleProto >= 0) {
    this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
  }
};
pp$9.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
    this.raise(this.yieldPos, "Yield expression cannot be a default value");
  }
  if (this.awaitPos) {
    this.raise(this.awaitPos, "Await expression cannot be a default value");
  }
};
pp$9.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression") {
    return this.isSimpleAssignTarget(expr.expression);
  }
  return expr.type === "Identifier" || expr.type === "MemberExpression";
};
var pp$8 = Parser.prototype;
pp$8.parseTopLevel = function(node2) {
  var exports = /* @__PURE__ */ Object.create(null);
  if (!node2.body) {
    node2.body = [];
  }
  while (this.type !== types$1.eof) {
    var stmt = this.parseStatement(null, true, exports);
    node2.body.push(stmt);
  }
  if (this.inModule) {
    for (var i = 0, list3 = Object.keys(this.undefinedExports); i < list3.length; i += 1) {
      var name2 = list3[i];
      this.raiseRecoverable(this.undefinedExports[name2].start, "Export '" + name2 + "' is not defined");
    }
  }
  this.adaptDirectivePrologue(node2.body);
  this.next();
  node2.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType;
  return this.finishNode(node2, "Program");
};
var loopLabel = { kind: "loop" };
var switchLabel = { kind: "switch" };
pp$8.isLet = function(context) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.fullCharCodeAt(next);
  if (nextCh === 91 || nextCh === 92) {
    return true;
  }
  if (context) {
    return false;
  }
  if (nextCh === 123) {
    return true;
  }
  if (isIdentifierStart(nextCh)) {
    var start2 = next;
    do {
      next += nextCh <= 65535 ? 1 : 2;
    } while (isIdentifierChar(nextCh = this.fullCharCodeAt(next)));
    if (nextCh === 92) {
      return true;
    }
    var ident = this.input.slice(start2, next);
    if (!keywordRelationalOperator.test(ident)) {
      return true;
    }
  }
  return false;
};
pp$8.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, after;
  return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.fullCharCodeAt(next + 8)) || after === 92));
};
pp$8.isUsingKeyword = function(isAwaitUsing, isFor) {
  if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length;
  if (lineBreak.test(this.input.slice(this.pos, next))) {
    return false;
  }
  if (isAwaitUsing) {
    var usingEndPos = next + 5, after;
    if (this.input.slice(next, usingEndPos) !== "using" || usingEndPos === this.input.length || isIdentifierChar(after = this.fullCharCodeAt(usingEndPos)) || after === 92) {
      return false;
    }
    skipWhiteSpace.lastIndex = usingEndPos;
    var skipAfterUsing = skipWhiteSpace.exec(this.input);
    next = usingEndPos + skipAfterUsing[0].length;
    if (skipAfterUsing && lineBreak.test(this.input.slice(usingEndPos, next))) {
      return false;
    }
  }
  var ch = this.fullCharCodeAt(next);
  if (!isIdentifierStart(ch) && ch !== 92) {
    return false;
  }
  var idStart = next;
  do {
    next += ch <= 65535 ? 1 : 2;
  } while (isIdentifierChar(ch = this.fullCharCodeAt(next)));
  if (ch === 92) {
    return true;
  }
  var id = this.input.slice(idStart, next);
  if (keywordRelationalOperator.test(id) || isFor && id === "of") {
    return false;
  }
  return true;
};
pp$8.isAwaitUsing = function(isFor) {
  return this.isUsingKeyword(true, isFor);
};
pp$8.isUsing = function(isFor) {
  return this.isUsingKeyword(false, isFor);
};
pp$8.parseStatement = function(context, topLevel, exports) {
  var starttype = this.type, node2 = this.startNode(), kind;
  if (this.isLet(context)) {
    starttype = types$1._var;
    kind = "let";
  }
  switch (starttype) {
    case types$1._break:
    case types$1._continue:
      return this.parseBreakContinueStatement(node2, starttype.keyword);
    case types$1._debugger:
      return this.parseDebuggerStatement(node2);
    case types$1._do:
      return this.parseDoStatement(node2);
    case types$1._for:
      return this.parseForStatement(node2);
    case types$1._function:
      if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
        this.unexpected();
      }
      return this.parseFunctionStatement(node2, false, !context);
    case types$1._class:
      if (context) {
        this.unexpected();
      }
      return this.parseClass(node2, true);
    case types$1._if:
      return this.parseIfStatement(node2);
    case types$1._return:
      return this.parseReturnStatement(node2);
    case types$1._switch:
      return this.parseSwitchStatement(node2);
    case types$1._throw:
      return this.parseThrowStatement(node2);
    case types$1._try:
      return this.parseTryStatement(node2);
    case types$1._const:
    case types$1._var:
      kind = kind || this.value;
      if (context && kind !== "var") {
        this.unexpected();
      }
      return this.parseVarStatement(node2, kind);
    case types$1._while:
      return this.parseWhileStatement(node2);
    case types$1._with:
      return this.parseWithStatement(node2);
    case types$1.braceL:
      return this.parseBlock(true, node2);
    case types$1.semi:
      return this.parseEmptyStatement(node2);
    case types$1._export:
    case types$1._import:
      if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
        if (nextCh === 40 || nextCh === 46) {
          return this.parseExpressionStatement(node2, this.parseExpression());
        }
      }
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) {
          this.raise(this.start, "'import' and 'export' may only appear at the top level");
        }
        if (!this.inModule) {
          this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
        }
      }
      return starttype === types$1._import ? this.parseImport(node2) : this.parseExport(node2, exports);
    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction()) {
        if (context) {
          this.unexpected();
        }
        this.next();
        return this.parseFunctionStatement(node2, true, !context);
      }
      var usingKind = this.isAwaitUsing(false) ? "await using" : this.isUsing(false) ? "using" : null;
      if (usingKind) {
        if (!this.allowUsing) {
          this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement");
        }
        if (usingKind === "await using") {
          if (!this.canAwait) {
            this.raise(this.start, "Await using cannot appear outside of async function");
          }
          this.next();
        }
        this.next();
        this.parseVar(node2, false, usingKind);
        this.semicolon();
        return this.finishNode(node2, "VariableDeclaration");
      }
      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
        return this.parseLabeledStatement(node2, maybeName, expr, context);
      } else {
        return this.parseExpressionStatement(node2, expr);
      }
  }
};
pp$8.parseBreakContinueStatement = function(node2, keyword) {
  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) {
    node2.label = null;
  } else if (this.type !== types$1.name) {
    this.unexpected();
  } else {
    node2.label = this.parseIdent();
    this.semicolon();
  }
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this.labels[i];
    if (node2.label == null || lab.name === node2.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) {
        break;
      }
      if (node2.label && isBreak) {
        break;
      }
    }
  }
  if (i === this.labels.length) {
    this.raise(node2.start, "Unsyntactic " + keyword);
  }
  return this.finishNode(node2, isBreak ? "BreakStatement" : "ContinueStatement");
};
pp$8.parseDebuggerStatement = function(node2) {
  this.next();
  this.semicolon();
  return this.finishNode(node2, "DebuggerStatement");
};
pp$8.parseDoStatement = function(node2) {
  this.next();
  this.labels.push(loopLabel);
  node2.body = this.parseStatement("do");
  this.labels.pop();
  this.expect(types$1._while);
  node2.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6) {
    this.eat(types$1.semi);
  } else {
    this.semicolon();
  }
  return this.finishNode(node2, "DoWhileStatement");
};
pp$8.parseForStatement = function(node2) {
  this.next();
  var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterScope(0);
  this.expect(types$1.parenL);
  if (this.type === types$1.semi) {
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node2, null);
  }
  var isLet = this.isLet();
  if (this.type === types$1._var || this.type === types$1._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    return this.parseForAfterInit(node2, init$1, awaitAt);
  }
  var startsWithLet = this.isContextual("let"), isForOf = false;
  var usingKind = this.isUsing(true) ? "using" : this.isAwaitUsing(true) ? "await using" : null;
  if (usingKind) {
    var init$2 = this.startNode();
    this.next();
    if (usingKind === "await using") {
      if (!this.canAwait) {
        this.raise(this.start, "Await using cannot appear outside of async function");
      }
      this.next();
    }
    this.parseVar(init$2, true, usingKind);
    this.finishNode(init$2, "VariableDeclaration");
    return this.parseForAfterInit(node2, init$2, awaitAt);
  }
  var containsEsc = this.containsEsc;
  var refDestructuringErrors = new DestructuringErrors();
  var initPos = this.start;
  var init = awaitAt > -1 ? this.parseExprSubscripts(refDestructuringErrors, "await") : this.parseExpression(true, refDestructuringErrors);
  if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (awaitAt > -1) {
      if (this.type === types$1._in) {
        this.unexpected(awaitAt);
      }
      node2.await = true;
    } else if (isForOf && this.options.ecmaVersion >= 8) {
      if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") {
        this.unexpected();
      } else if (this.options.ecmaVersion >= 9) {
        node2.await = false;
      }
    }
    if (startsWithLet && isForOf) {
      this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
    }
    this.toAssignable(init, false, refDestructuringErrors);
    this.checkLValPattern(init);
    return this.parseForIn(node2, init);
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) {
    this.unexpected(awaitAt);
  }
  return this.parseFor(node2, init);
};
pp$8.parseForAfterInit = function(node2, init, awaitAt) {
  if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init.declarations.length === 1) {
    if (this.options.ecmaVersion >= 9) {
      if (this.type === types$1._in) {
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
      } else {
        node2.await = awaitAt > -1;
      }
    }
    return this.parseForIn(node2, init);
  }
  if (awaitAt > -1) {
    this.unexpected(awaitAt);
  }
  return this.parseFor(node2, init);
};
pp$8.parseFunctionStatement = function(node2, isAsync, declarationPosition) {
  this.next();
  return this.parseFunction(node2, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
};
pp$8.parseIfStatement = function(node2) {
  this.next();
  node2.test = this.parseParenExpression();
  node2.consequent = this.parseStatement("if");
  node2.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
  return this.finishNode(node2, "IfStatement");
};
pp$8.parseReturnStatement = function(node2) {
  if (!this.allowReturn) {
    this.raise(this.start, "'return' outside of function");
  }
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) {
    node2.argument = null;
  } else {
    node2.argument = this.parseExpression();
    this.semicolon();
  }
  return this.finishNode(node2, "ReturnStatement");
};
pp$8.parseSwitchStatement = function(node2) {
  this.next();
  node2.discriminant = this.parseParenExpression();
  node2.cases = [];
  this.expect(types$1.braceL);
  this.labels.push(switchLabel);
  this.enterScope(SCOPE_SWITCH);
  var cur;
  for (var sawDefault = false; this.type !== types$1.braceR; ) {
    if (this.type === types$1._case || this.type === types$1._default) {
      var isCase = this.type === types$1._case;
      if (cur) {
        this.finishNode(cur, "SwitchCase");
      }
      node2.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) {
          this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
        }
        sawDefault = true;
        cur.test = null;
      }
      this.expect(types$1.colon);
    } else {
      if (!cur) {
        this.unexpected();
      }
      cur.consequent.push(this.parseStatement(null));
    }
  }
  this.exitScope();
  if (cur) {
    this.finishNode(cur, "SwitchCase");
  }
  this.next();
  this.labels.pop();
  return this.finishNode(node2, "SwitchStatement");
};
pp$8.parseThrowStatement = function(node2) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
    this.raise(this.lastTokEnd, "Illegal newline after throw");
  }
  node2.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node2, "ThrowStatement");
};
var empty$1 = [];
pp$8.parseCatchClauseParam = function() {
  var param = this.parseBindingAtom();
  var simple = param.type === "Identifier";
  this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
  this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
  this.expect(types$1.parenR);
  return param;
};
pp$8.parseTryStatement = function(node2) {
  this.next();
  node2.block = this.parseBlock();
  node2.handler = null;
  if (this.type === types$1._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types$1.parenL)) {
      clause.param = this.parseCatchClauseParam();
    } else {
      if (this.options.ecmaVersion < 10) {
        this.unexpected();
      }
      clause.param = null;
      this.enterScope(0);
    }
    clause.body = this.parseBlock(false);
    this.exitScope();
    node2.handler = this.finishNode(clause, "CatchClause");
  }
  node2.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
  if (!node2.handler && !node2.finalizer) {
    this.raise(node2.start, "Missing catch or finally clause");
  }
  return this.finishNode(node2, "TryStatement");
};
pp$8.parseVarStatement = function(node2, kind, allowMissingInitializer) {
  this.next();
  this.parseVar(node2, false, kind, allowMissingInitializer);
  this.semicolon();
  return this.finishNode(node2, "VariableDeclaration");
};
pp$8.parseWhileStatement = function(node2) {
  this.next();
  node2.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node2.body = this.parseStatement("while");
  this.labels.pop();
  return this.finishNode(node2, "WhileStatement");
};
pp$8.parseWithStatement = function(node2) {
  if (this.strict) {
    this.raise(this.start, "'with' in strict mode");
  }
  this.next();
  node2.object = this.parseParenExpression();
  node2.body = this.parseStatement("with");
  return this.finishNode(node2, "WithStatement");
};
pp$8.parseEmptyStatement = function(node2) {
  this.next();
  return this.finishNode(node2, "EmptyStatement");
};
pp$8.parseLabeledStatement = function(node2, maybeName, expr, context) {
  for (var i$1 = 0, list3 = this.labels; i$1 < list3.length; i$1 += 1) {
    var label = list3[i$1];
    if (label.name === maybeName) {
      this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    }
  }
  var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label$1 = this.labels[i];
    if (label$1.statementStart === node2.start) {
      label$1.statementStart = this.start;
      label$1.kind = kind;
    } else {
      break;
    }
  }
  this.labels.push({ name: maybeName, kind, statementStart: this.start });
  node2.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
  this.labels.pop();
  node2.label = expr;
  return this.finishNode(node2, "LabeledStatement");
};
pp$8.parseExpressionStatement = function(node2, expr) {
  node2.expression = expr;
  this.semicolon();
  return this.finishNode(node2, "ExpressionStatement");
};
pp$8.parseBlock = function(createNewLexicalScope, node2, exitStrict) {
  if (createNewLexicalScope === void 0) createNewLexicalScope = true;
  if (node2 === void 0) node2 = this.startNode();
  node2.body = [];
  this.expect(types$1.braceL);
  if (createNewLexicalScope) {
    this.enterScope(0);
  }
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node2.body.push(stmt);
  }
  if (exitStrict) {
    this.strict = false;
  }
  this.next();
  if (createNewLexicalScope) {
    this.exitScope();
  }
  return this.finishNode(node2, "BlockStatement");
};
pp$8.parseFor = function(node2, init) {
  node2.init = init;
  this.expect(types$1.semi);
  node2.test = this.type === types$1.semi ? null : this.parseExpression();
  this.expect(types$1.semi);
  node2.update = this.type === types$1.parenR ? null : this.parseExpression();
  this.expect(types$1.parenR);
  node2.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node2, "ForStatement");
};
pp$8.parseForIn = function(node2, init) {
  var isForIn = this.type === types$1._in;
  this.next();
  if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
    this.raise(
      init.start,
      (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
    );
  }
  node2.left = init;
  node2.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types$1.parenR);
  node2.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node2, isForIn ? "ForInStatement" : "ForOfStatement");
};
pp$8.parseVar = function(node2, isFor, kind, allowMissingInitializer) {
  node2.declarations = [];
  node2.kind = kind;
  for (; ; ) {
    var decl = this.startNode();
    this.parseVarId(decl, kind);
    if (this.eat(types$1.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      this.unexpected();
    } else if (!allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$1._in && !this.isContextual("of")) {
      this.raise(this.lastTokEnd, "Missing initializer in " + kind + " declaration");
    } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node2.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(types$1.comma)) {
      break;
    }
  }
  return node2;
};
pp$8.parseVarId = function(decl, kind) {
  decl.id = kind === "using" || kind === "await using" ? this.parseIdent() : this.parseBindingAtom();
  this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
};
var FUNC_STATEMENT = 1;
var FUNC_HANGING_STATEMENT = 2;
var FUNC_NULLABLE_ID = 4;
pp$8.parseFunction = function(node2, statement, allowExpressionBody, isAsync, forInit) {
  this.initFunction(node2);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
    if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
      this.unexpected();
    }
    node2.generator = this.eat(types$1.star);
  }
  if (this.options.ecmaVersion >= 8) {
    node2.async = !!isAsync;
  }
  if (statement & FUNC_STATEMENT) {
    node2.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
    if (node2.id && !(statement & FUNC_HANGING_STATEMENT)) {
      this.checkLValSimple(node2.id, this.strict || node2.generator || node2.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
    }
  }
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(node2.async, node2.generator));
  if (!(statement & FUNC_STATEMENT)) {
    node2.id = this.type === types$1.name ? this.parseIdent() : null;
  }
  this.parseFunctionParams(node2);
  this.parseFunctionBody(node2, allowExpressionBody, false, forInit);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node2, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
};
pp$8.parseFunctionParams = function(node2) {
  this.expect(types$1.parenL);
  node2.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};
pp$8.parseClass = function(node2, isStatement) {
  this.next();
  var oldStrict = this.strict;
  this.strict = true;
  this.parseClassId(node2, isStatement);
  this.parseClassSuper(node2);
  var privateNameMap = this.enterClassBody();
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types$1.braceL);
  while (this.type !== types$1.braceR) {
    var element = this.parseClassElement(node2.superClass !== null);
    if (element) {
      classBody.body.push(element);
      if (element.type === "MethodDefinition" && element.kind === "constructor") {
        if (hadConstructor) {
          this.raiseRecoverable(element.start, "Duplicate constructor in the same class");
        }
        hadConstructor = true;
      } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
        this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
      }
    }
  }
  this.strict = oldStrict;
  this.next();
  node2.body = this.finishNode(classBody, "ClassBody");
  this.exitClassBody();
  return this.finishNode(node2, isStatement ? "ClassDeclaration" : "ClassExpression");
};
pp$8.parseClassElement = function(constructorAllowsSuper) {
  if (this.eat(types$1.semi)) {
    return null;
  }
  var ecmaVersion = this.options.ecmaVersion;
  var node2 = this.startNode();
  var keyName = "";
  var isGenerator = false;
  var isAsync = false;
  var kind = "method";
  var isStatic = false;
  if (this.eatContextual("static")) {
    if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
      this.parseClassStaticBlock(node2);
      return node2;
    }
    if (this.isClassElementNameStart() || this.type === types$1.star) {
      isStatic = true;
    } else {
      keyName = "static";
    }
  }
  node2.static = isStatic;
  if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
    if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
      isAsync = true;
    } else {
      keyName = "async";
    }
  }
  if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
    isGenerator = true;
  }
  if (!keyName && !isAsync && !isGenerator) {
    var lastValue = this.value;
    if (this.eatContextual("get") || this.eatContextual("set")) {
      if (this.isClassElementNameStart()) {
        kind = lastValue;
      } else {
        keyName = lastValue;
      }
    }
  }
  if (keyName) {
    node2.computed = false;
    node2.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
    node2.key.name = keyName;
    this.finishNode(node2.key, "Identifier");
  } else {
    this.parseClassElementName(node2);
  }
  if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
    var isConstructor = !node2.static && checkKeyName(node2, "constructor");
    var allowsDirectSuper = isConstructor && constructorAllowsSuper;
    if (isConstructor && kind !== "method") {
      this.raise(node2.key.start, "Constructor can't have get/set modifier");
    }
    node2.kind = isConstructor ? "constructor" : kind;
    this.parseClassMethod(node2, isGenerator, isAsync, allowsDirectSuper);
  } else {
    this.parseClassField(node2);
  }
  return node2;
};
pp$8.isClassElementNameStart = function() {
  return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
};
pp$8.parseClassElementName = function(element) {
  if (this.type === types$1.privateId) {
    if (this.value === "constructor") {
      this.raise(this.start, "Classes can't have an element named '#constructor'");
    }
    element.computed = false;
    element.key = this.parsePrivateIdent();
  } else {
    this.parsePropertyName(element);
  }
};
pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
  var key = method.key;
  if (method.kind === "constructor") {
    if (isGenerator) {
      this.raise(key.start, "Constructor can't be a generator");
    }
    if (isAsync) {
      this.raise(key.start, "Constructor can't be an async method");
    }
  } else if (method.static && checkKeyName(method, "prototype")) {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }
  var value2 = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
  if (method.kind === "get" && value2.params.length !== 0) {
    this.raiseRecoverable(value2.start, "getter should have no params");
  }
  if (method.kind === "set" && value2.params.length !== 1) {
    this.raiseRecoverable(value2.start, "setter should have exactly one param");
  }
  if (method.kind === "set" && value2.params[0].type === "RestElement") {
    this.raiseRecoverable(value2.params[0].start, "Setter cannot use rest params");
  }
  return this.finishNode(method, "MethodDefinition");
};
pp$8.parseClassField = function(field) {
  if (checkKeyName(field, "constructor")) {
    this.raise(field.key.start, "Classes can't have a field named 'constructor'");
  } else if (field.static && checkKeyName(field, "prototype")) {
    this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
  }
  if (this.eat(types$1.eq)) {
    this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER);
    field.value = this.parseMaybeAssign();
    this.exitScope();
  } else {
    field.value = null;
  }
  this.semicolon();
  return this.finishNode(field, "PropertyDefinition");
};
pp$8.parseClassStaticBlock = function(node2) {
  node2.body = [];
  var oldLabels = this.labels;
  this.labels = [];
  this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node2.body.push(stmt);
  }
  this.next();
  this.exitScope();
  this.labels = oldLabels;
  return this.finishNode(node2, "StaticBlock");
};
pp$8.parseClassId = function(node2, isStatement) {
  if (this.type === types$1.name) {
    node2.id = this.parseIdent();
    if (isStatement) {
      this.checkLValSimple(node2.id, BIND_LEXICAL, false);
    }
  } else {
    if (isStatement === true) {
      this.unexpected();
    }
    node2.id = null;
  }
};
pp$8.parseClassSuper = function(node2) {
  node2.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
};
pp$8.enterClassBody = function() {
  var element = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  this.privateNameStack.push(element);
  return element.declared;
};
pp$8.exitClassBody = function() {
  var ref2 = this.privateNameStack.pop();
  var declared = ref2.declared;
  var used = ref2.used;
  if (!this.options.checkPrivateFields) {
    return;
  }
  var len = this.privateNameStack.length;
  var parent = len === 0 ? null : this.privateNameStack[len - 1];
  for (var i = 0; i < used.length; ++i) {
    var id = used[i];
    if (!hasOwn(declared, id.name)) {
      if (parent) {
        parent.used.push(id);
      } else {
        this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
      }
    }
  }
};
function isPrivateNameConflicted(privateNameMap, element) {
  var name2 = element.key.name;
  var curr = privateNameMap[name2];
  var next = "true";
  if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
    next = (element.static ? "s" : "i") + element.kind;
  }
  if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
    privateNameMap[name2] = "true";
    return false;
  } else if (!curr) {
    privateNameMap[name2] = next;
    return false;
  } else {
    return true;
  }
}
function checkKeyName(node2, name2) {
  var computed = node2.computed;
  var key = node2.key;
  return !computed && (key.type === "Identifier" && key.name === name2 || key.type === "Literal" && key.value === name2);
}
pp$8.parseExportAllDeclaration = function(node2, exports) {
  if (this.options.ecmaVersion >= 11) {
    if (this.eatContextual("as")) {
      node2.exported = this.parseModuleExportName();
      this.checkExport(exports, node2.exported, this.lastTokStart);
    } else {
      node2.exported = null;
    }
  }
  this.expectContextual("from");
  if (this.type !== types$1.string) {
    this.unexpected();
  }
  node2.source = this.parseExprAtom();
  if (this.options.ecmaVersion >= 16) {
    node2.attributes = this.parseWithClause();
  }
  this.semicolon();
  return this.finishNode(node2, "ExportAllDeclaration");
};
pp$8.parseExport = function(node2, exports) {
  this.next();
  if (this.eat(types$1.star)) {
    return this.parseExportAllDeclaration(node2, exports);
  }
  if (this.eat(types$1._default)) {
    this.checkExport(exports, "default", this.lastTokStart);
    node2.declaration = this.parseExportDefaultDeclaration();
    return this.finishNode(node2, "ExportDefaultDeclaration");
  }
  if (this.shouldParseExportStatement()) {
    node2.declaration = this.parseExportDeclaration(node2);
    if (node2.declaration.type === "VariableDeclaration") {
      this.checkVariableExport(exports, node2.declaration.declarations);
    } else {
      this.checkExport(exports, node2.declaration.id, node2.declaration.id.start);
    }
    node2.specifiers = [];
    node2.source = null;
    if (this.options.ecmaVersion >= 16) {
      node2.attributes = [];
    }
  } else {
    node2.declaration = null;
    node2.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types$1.string) {
        this.unexpected();
      }
      node2.source = this.parseExprAtom();
      if (this.options.ecmaVersion >= 16) {
        node2.attributes = this.parseWithClause();
      }
    } else {
      for (var i = 0, list3 = node2.specifiers; i < list3.length; i += 1) {
        var spec = list3[i];
        this.checkUnreserved(spec.local);
        this.checkLocalExport(spec.local);
        if (spec.local.type === "Literal") {
          this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
        }
      }
      node2.source = null;
      if (this.options.ecmaVersion >= 16) {
        node2.attributes = [];
      }
    }
    this.semicolon();
  }
  return this.finishNode(node2, "ExportNamedDeclaration");
};
pp$8.parseExportDeclaration = function(node2) {
  return this.parseStatement(null);
};
pp$8.parseExportDefaultDeclaration = function() {
  var isAsync;
  if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
    var fNode = this.startNode();
    this.next();
    if (isAsync) {
      this.next();
    }
    return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
  } else if (this.type === types$1._class) {
    var cNode = this.startNode();
    return this.parseClass(cNode, "nullableID");
  } else {
    var declaration = this.parseMaybeAssign();
    this.semicolon();
    return declaration;
  }
};
pp$8.checkExport = function(exports, name2, pos) {
  if (!exports) {
    return;
  }
  if (typeof name2 !== "string") {
    name2 = name2.type === "Identifier" ? name2.name : name2.value;
  }
  if (hasOwn(exports, name2)) {
    this.raiseRecoverable(pos, "Duplicate export '" + name2 + "'");
  }
  exports[name2] = true;
};
pp$8.checkPatternExport = function(exports, pat) {
  var type = pat.type;
  if (type === "Identifier") {
    this.checkExport(exports, pat, pat.start);
  } else if (type === "ObjectPattern") {
    for (var i = 0, list3 = pat.properties; i < list3.length; i += 1) {
      var prop = list3[i];
      this.checkPatternExport(exports, prop);
    }
  } else if (type === "ArrayPattern") {
    for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];
      if (elt) {
        this.checkPatternExport(exports, elt);
      }
    }
  } else if (type === "Property") {
    this.checkPatternExport(exports, pat.value);
  } else if (type === "AssignmentPattern") {
    this.checkPatternExport(exports, pat.left);
  } else if (type === "RestElement") {
    this.checkPatternExport(exports, pat.argument);
  }
};
pp$8.checkVariableExport = function(exports, decls) {
  if (!exports) {
    return;
  }
  for (var i = 0, list3 = decls; i < list3.length; i += 1) {
    var decl = list3[i];
    this.checkPatternExport(exports, decl.id);
  }
};
pp$8.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
pp$8.parseExportSpecifier = function(exports) {
  var node2 = this.startNode();
  node2.local = this.parseModuleExportName();
  node2.exported = this.eatContextual("as") ? this.parseModuleExportName() : node2.local;
  this.checkExport(
    exports,
    node2.exported,
    node2.exported.start
  );
  return this.finishNode(node2, "ExportSpecifier");
};
pp$8.parseExportSpecifiers = function(exports) {
  var nodes = [], first = true;
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    nodes.push(this.parseExportSpecifier(exports));
  }
  return nodes;
};
pp$8.parseImport = function(node2) {
  this.next();
  if (this.type === types$1.string) {
    node2.specifiers = empty$1;
    node2.source = this.parseExprAtom();
  } else {
    node2.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node2.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
  }
  if (this.options.ecmaVersion >= 16) {
    node2.attributes = this.parseWithClause();
  }
  this.semicolon();
  return this.finishNode(node2, "ImportDeclaration");
};
pp$8.parseImportSpecifier = function() {
  var node2 = this.startNode();
  node2.imported = this.parseModuleExportName();
  if (this.eatContextual("as")) {
    node2.local = this.parseIdent();
  } else {
    this.checkUnreserved(node2.imported);
    node2.local = node2.imported;
  }
  this.checkLValSimple(node2.local, BIND_LEXICAL);
  return this.finishNode(node2, "ImportSpecifier");
};
pp$8.parseImportDefaultSpecifier = function() {
  var node2 = this.startNode();
  node2.local = this.parseIdent();
  this.checkLValSimple(node2.local, BIND_LEXICAL);
  return this.finishNode(node2, "ImportDefaultSpecifier");
};
pp$8.parseImportNamespaceSpecifier = function() {
  var node2 = this.startNode();
  this.next();
  this.expectContextual("as");
  node2.local = this.parseIdent();
  this.checkLValSimple(node2.local, BIND_LEXICAL);
  return this.finishNode(node2, "ImportNamespaceSpecifier");
};
pp$8.parseImportSpecifiers = function() {
  var nodes = [], first = true;
  if (this.type === types$1.name) {
    nodes.push(this.parseImportDefaultSpecifier());
    if (!this.eat(types$1.comma)) {
      return nodes;
    }
  }
  if (this.type === types$1.star) {
    nodes.push(this.parseImportNamespaceSpecifier());
    return nodes;
  }
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    nodes.push(this.parseImportSpecifier());
  }
  return nodes;
};
pp$8.parseWithClause = function() {
  var nodes = [];
  if (!this.eat(types$1._with)) {
    return nodes;
  }
  this.expect(types$1.braceL);
  var attributeKeys = {};
  var first = true;
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var attr = this.parseImportAttribute();
    var keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
    if (hasOwn(attributeKeys, keyName)) {
      this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'");
    }
    attributeKeys[keyName] = true;
    nodes.push(attr);
  }
  return nodes;
};
pp$8.parseImportAttribute = function() {
  var node2 = this.startNode();
  node2.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  this.expect(types$1.colon);
  if (this.type !== types$1.string) {
    this.unexpected();
  }
  node2.value = this.parseExprAtom();
  return this.finishNode(node2, "ImportAttribute");
};
pp$8.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
    var stringLiteral = this.parseLiteral(this.value);
    if (loneSurrogate.test(stringLiteral.value)) {
      this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
    }
    return stringLiteral;
  }
  return this.parseIdent(true);
};
pp$8.adaptDirectivePrologue = function(statements) {
  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$8.isDirectiveCandidate = function(statement) {
  return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && // Reject parenthesized strings.
  (this.input[statement.start] === '"' || this.input[statement.start] === "'");
};
var pp$7 = Parser.prototype;
pp$7.toAssignable = function(node2, isBinding, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 6 && node2) {
    switch (node2.type) {
      case "Identifier":
        if (this.inAsync && node2.name === "await") {
          this.raise(node2.start, "Cannot use 'await' as identifier inside an async function");
        }
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        node2.type = "ObjectPattern";
        if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        for (var i = 0, list3 = node2.properties; i < list3.length; i += 1) {
          var prop = list3[i];
          this.toAssignable(prop, isBinding);
          if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
            this.raise(prop.argument.start, "Unexpected token");
          }
        }
        break;
      case "Property":
        if (node2.kind !== "init") {
          this.raise(node2.key.start, "Object pattern can't contain getter or setter");
        }
        this.toAssignable(node2.value, isBinding);
        break;
      case "ArrayExpression":
        node2.type = "ArrayPattern";
        if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        this.toAssignableList(node2.elements, isBinding);
        break;
      case "SpreadElement":
        node2.type = "RestElement";
        this.toAssignable(node2.argument, isBinding);
        if (node2.argument.type === "AssignmentPattern") {
          this.raise(node2.argument.start, "Rest elements cannot have a default value");
        }
        break;
      case "AssignmentExpression":
        if (node2.operator !== "=") {
          this.raise(node2.left.end, "Only '=' operator can be used for specifying default value.");
        }
        node2.type = "AssignmentPattern";
        delete node2.operator;
        this.toAssignable(node2.left, isBinding);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(node2.expression, isBinding, refDestructuringErrors);
        break;
      case "ChainExpression":
        this.raiseRecoverable(node2.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!isBinding) {
          break;
        }
      default:
        this.raise(node2.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) {
    this.checkPatternErrors(refDestructuringErrors, true);
  }
  return node2;
};
pp$7.toAssignableList = function(exprList, isBinding) {
  var end = exprList.length;
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) {
      this.toAssignable(elt, isBinding);
    }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
      this.unexpected(last.argument.start);
    }
  }
  return exprList;
};
pp$7.parseSpread = function(refDestructuringErrors) {
  var node2 = this.startNode();
  this.next();
  node2.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node2, "SpreadElement");
};
pp$7.parseRestBinding = function() {
  var node2 = this.startNode();
  this.next();
  if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
    this.unexpected();
  }
  node2.argument = this.parseBindingAtom();
  return this.finishNode(node2, "RestElement");
};
pp$7.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
      case types$1.bracketL:
        var node2 = this.startNode();
        this.next();
        node2.elements = this.parseBindingList(types$1.bracketR, true, true);
        return this.finishNode(node2, "ArrayPattern");
      case types$1.braceL:
        return this.parseObj(true);
    }
  }
  return this.parseIdent();
};
pp$7.parseBindingList = function(close2, allowEmpty, allowTrailingComma, allowModifiers) {
  var elts = [], first = true;
  while (!this.eat(close2)) {
    if (first) {
      first = false;
    } else {
      this.expect(types$1.comma);
    }
    if (allowEmpty && this.type === types$1.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close2)) {
      break;
    } else if (this.type === types$1.ellipsis) {
      var rest = this.parseRestBinding();
      this.parseBindingListItem(rest);
      elts.push(rest);
      if (this.type === types$1.comma) {
        this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
      }
      this.expect(close2);
      break;
    } else {
      elts.push(this.parseAssignableListItem(allowModifiers));
    }
  }
  return elts;
};
pp$7.parseAssignableListItem = function(allowModifiers) {
  var elem = this.parseMaybeDefault(this.start, this.startLoc);
  this.parseBindingListItem(elem);
  return elem;
};
pp$7.parseBindingListItem = function(param) {
  return param;
};
pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
    return left;
  }
  var node2 = this.startNodeAt(startPos, startLoc);
  node2.left = left;
  node2.right = this.parseMaybeAssign();
  return this.finishNode(node2, "AssignmentPattern");
};
pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
  if (bindingType === void 0) bindingType = BIND_NONE;
  var isBind = bindingType !== BIND_NONE;
  switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
        this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
      }
      if (isBind) {
        if (bindingType === BIND_LEXICAL && expr.name === "let") {
          this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
        }
        if (checkClashes) {
          if (hasOwn(checkClashes, expr.name)) {
            this.raiseRecoverable(expr.start, "Argument name clash");
          }
          checkClashes[expr.name] = true;
        }
        if (bindingType !== BIND_OUTSIDE) {
          this.declareName(expr.name, bindingType, expr.start);
        }
      }
      break;
    case "ChainExpression":
      this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      if (isBind) {
        this.raiseRecoverable(expr.start, "Binding member expression");
      }
      break;
    case "ParenthesizedExpression":
      if (isBind) {
        this.raiseRecoverable(expr.start, "Binding parenthesized expression");
      }
      return this.checkLValSimple(expr.expression, bindingType, checkClashes);
    default:
      this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
  }
};
pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
  if (bindingType === void 0) bindingType = BIND_NONE;
  switch (expr.type) {
    case "ObjectPattern":
      for (var i = 0, list3 = expr.properties; i < list3.length; i += 1) {
        var prop = list3[i];
        this.checkLValInnerPattern(prop, bindingType, checkClashes);
      }
      break;
    case "ArrayPattern":
      for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
        var elem = list$1[i$1];
        if (elem) {
          this.checkLValInnerPattern(elem, bindingType, checkClashes);
        }
      }
      break;
    default:
      this.checkLValSimple(expr, bindingType, checkClashes);
  }
};
pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
  if (bindingType === void 0) bindingType = BIND_NONE;
  switch (expr.type) {
    case "Property":
      this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(expr.left, bindingType, checkClashes);
      break;
    case "RestElement":
      this.checkLValPattern(expr.argument, bindingType, checkClashes);
      break;
    default:
      this.checkLValPattern(expr, bindingType, checkClashes);
  }
};
var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};
var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function(p) {
    return p.tryReadTemplateToken();
  }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};
var pp$6 = Parser.prototype;
pp$6.initialContext = function() {
  return [types.b_stat];
};
pp$6.curContext = function() {
  return this.context[this.context.length - 1];
};
pp$6.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types.f_expr || parent === types.f_stat) {
    return true;
  }
  if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
    return !parent.isExpr;
  }
  if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
    return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  }
  if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
    return true;
  }
  if (prevType === types$1.braceL) {
    return parent === types.b_stat;
  }
  if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
    return false;
  }
  return !this.exprAllowed;
};
pp$6.inGeneratorContext = function() {
  for (var i = this.context.length - 1; i >= 1; i--) {
    var context = this.context[i];
    if (context.token === "function") {
      return context.generator;
    }
  }
  return false;
};
pp$6.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types$1.dot) {
    this.exprAllowed = false;
  } else if (update = type.updateContext) {
    update.call(this, prevType);
  } else {
    this.exprAllowed = type.beforeExpr;
  }
};
pp$6.overrideContext = function(tokenCtx) {
  if (this.curContext() !== tokenCtx) {
    this.context[this.context.length - 1] = tokenCtx;
  }
};
types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return;
  }
  var out = this.context.pop();
  if (out === types.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};
types$1.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.exprAllowed = true;
};
types$1.dollarBraceL.updateContext = function() {
  this.context.push(types.b_tmpl);
  this.exprAllowed = true;
};
types$1.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
  this.context.push(statementParens ? types.p_stat : types.p_expr);
  this.exprAllowed = true;
};
types$1.incDec.updateContext = function() {
};
types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
    this.context.push(types.f_expr);
  } else {
    this.context.push(types.f_stat);
  }
  this.exprAllowed = false;
};
types$1.colon.updateContext = function() {
  if (this.curContext().token === "function") {
    this.context.pop();
  }
  this.exprAllowed = true;
};
types$1.backQuote.updateContext = function() {
  if (this.curContext() === types.q_tmpl) {
    this.context.pop();
  } else {
    this.context.push(types.q_tmpl);
  }
  this.exprAllowed = false;
};
types$1.star.updateContext = function(prevType) {
  if (prevType === types$1._function) {
    var index2 = this.context.length - 1;
    if (this.context[index2] === types.f_expr) {
      this.context[index2] = types.f_expr_gen;
    } else {
      this.context[index2] = types.f_gen;
    }
  }
  this.exprAllowed = true;
};
types$1.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
    if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
      allowed = true;
    }
  }
  this.exprAllowed = allowed;
};
var pp$5 = Parser.prototype;
pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
    return;
  }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
    return;
  }
  var key = prop.key;
  var name2;
  switch (key.type) {
    case "Identifier":
      name2 = key.name;
      break;
    case "Literal":
      name2 = String(key.value);
      break;
    default:
      return;
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name2 === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors) {
          if (refDestructuringErrors.doubleProto < 0) {
            refDestructuringErrors.doubleProto = key.start;
          }
        } else {
          this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
        }
      }
      propHash.proto = true;
    }
    return;
  }
  name2 = "$" + name2;
  var other = propHash[name2];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition) {
      this.raiseRecoverable(key.start, "Redefinition of property");
    }
  } else {
    other = propHash[name2] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};
pp$5.parseExpression = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
  if (this.type === types$1.comma) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.expressions = [expr];
    while (this.eat(types$1.comma)) {
      node2.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
    }
    return this.finishNode(node2, "SequenceExpression");
  }
  return expr;
};
pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) {
      return this.parseYield(forInit);
    } else {
      this.exprAllowed = false;
    }
  }
  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    oldDoubleProto = refDestructuringErrors.doubleProto;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors();
    ownDestructuringErrors = true;
  }
  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types$1.parenL || this.type === types$1.name) {
    this.potentialArrowAt = this.start;
    this.potentialArrowInForAwait = forInit === "await";
  }
  var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
  if (afterLeftParse) {
    left = afterLeftParse.call(this, left, startPos, startLoc);
  }
  if (this.type.isAssign) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.operator = this.value;
    if (this.type === types$1.eq) {
      left = this.toAssignable(left, false, refDestructuringErrors);
    }
    if (!ownDestructuringErrors) {
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
    }
    if (refDestructuringErrors.shorthandAssign >= left.start) {
      refDestructuringErrors.shorthandAssign = -1;
    }
    if (this.type === types$1.eq) {
      this.checkLValPattern(left);
    } else {
      this.checkLValSimple(left);
    }
    node2.left = left;
    this.next();
    node2.right = this.parseMaybeAssign(forInit);
    if (oldDoubleProto > -1) {
      refDestructuringErrors.doubleProto = oldDoubleProto;
    }
    return this.finishNode(node2, "AssignmentExpression");
  } else {
    if (ownDestructuringErrors) {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
  }
  if (oldParenAssign > -1) {
    refDestructuringErrors.parenthesizedAssign = oldParenAssign;
  }
  if (oldTrailingComma > -1) {
    refDestructuringErrors.trailingComma = oldTrailingComma;
  }
  return left;
};
pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(forInit, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) {
    return expr;
  }
  if (this.eat(types$1.question)) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.test = expr;
    node2.consequent = this.parseMaybeAssign();
    this.expect(types$1.colon);
    node2.alternate = this.parseMaybeAssign(forInit);
    return this.finishNode(node2, "ConditionalExpression");
  }
  return expr;
};
pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
  if (this.checkExpressionErrors(refDestructuringErrors)) {
    return expr;
  }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
};
pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
  var prec = this.type.binop;
  if (prec != null && (!forInit || this.type !== types$1._in)) {
    if (prec > minPrec) {
      var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
      var coalesce = this.type === types$1.coalesce;
      if (coalesce) {
        prec = types$1.logicalAND.binop;
      }
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
      var node2 = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
      if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
        this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
      }
      return this.parseExprOp(node2, leftStartPos, leftStartLoc, minPrec, forInit);
    }
  }
  return left;
};
pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  if (right.type === "PrivateIdentifier") {
    this.raise(right.start, "Private identifier can only be left side of binary expression");
  }
  var node2 = this.startNodeAt(startPos, startLoc);
  node2.left = left;
  node2.operator = op;
  node2.right = right;
  return this.finishNode(node2, logical ? "LogicalExpression" : "BinaryExpression");
};
pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && this.canAwait) {
    expr = this.parseAwait(forInit);
    sawUnary = true;
  } else if (this.type.prefix) {
    var node2 = this.startNode(), update = this.type === types$1.incDec;
    node2.operator = this.value;
    node2.prefix = true;
    this.next();
    node2.argument = this.parseMaybeUnary(null, true, update, forInit);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) {
      this.checkLValSimple(node2.argument);
    } else if (this.strict && node2.operator === "delete" && isLocalVariableAccess(node2.argument)) {
      this.raiseRecoverable(node2.start, "Deleting local variable in strict mode");
    } else if (node2.operator === "delete" && isPrivateFieldAccess(node2.argument)) {
      this.raiseRecoverable(node2.start, "Private fields can not be deleted");
    } else {
      sawUnary = true;
    }
    expr = this.finishNode(node2, update ? "UpdateExpression" : "UnaryExpression");
  } else if (!sawUnary && this.type === types$1.privateId) {
    if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) {
      this.unexpected();
    }
    expr = this.parsePrivateIdent();
    if (this.type !== types$1._in) {
      this.unexpected();
    }
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.operator = this.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this.checkLValSimple(expr);
      this.next();
      expr = this.finishNode(node$1, "UpdateExpression");
    }
  }
  if (!incDec && this.eat(types$1.starstar)) {
    if (sawUnary) {
      this.unexpected(this.lastTokStart);
    } else {
      return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
    }
  } else {
    return expr;
  }
};
function isLocalVariableAccess(node2) {
  return node2.type === "Identifier" || node2.type === "ParenthesizedExpression" && isLocalVariableAccess(node2.expression);
}
function isPrivateFieldAccess(node2) {
  return node2.type === "MemberExpression" && node2.property.type === "PrivateIdentifier" || node2.type === "ChainExpression" && isPrivateFieldAccess(node2.expression) || node2.type === "ParenthesizedExpression" && isPrivateFieldAccess(node2.expression);
}
pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors, forInit);
  if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
    return expr;
  }
  var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) {
      refDestructuringErrors.parenthesizedAssign = -1;
    }
    if (refDestructuringErrors.parenthesizedBind >= result.start) {
      refDestructuringErrors.parenthesizedBind = -1;
    }
    if (refDestructuringErrors.trailingComma >= result.start) {
      refDestructuringErrors.trailingComma = -1;
    }
  }
  return result;
};
pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
  var optionalChained = false;
  while (true) {
    var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
    if (element.optional) {
      optionalChained = true;
    }
    if (element === base || element.type === "ArrowFunctionExpression") {
      if (optionalChained) {
        var chainNode = this.startNodeAt(startPos, startLoc);
        chainNode.expression = element;
        element = this.finishNode(chainNode, "ChainExpression");
      }
      return element;
    }
    base = element;
  }
};
pp$5.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(types$1.arrow);
};
pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
};
pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
  var optionalSupported = this.options.ecmaVersion >= 11;
  var optional = optionalSupported && this.eat(types$1.questionDot);
  if (noCalls && optional) {
    this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  }
  var computed = this.eat(types$1.bracketL);
  if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.object = base;
    if (computed) {
      node2.property = this.parseExpression();
      this.expect(types$1.bracketR);
    } else if (this.type === types$1.privateId && base.type !== "Super") {
      node2.property = this.parsePrivateIdent();
    } else {
      node2.property = this.parseIdent(this.options.allowReserved !== "never");
    }
    node2.computed = !!computed;
    if (optionalSupported) {
      node2.optional = optional;
    }
    base = this.finishNode(node2, "MemberExpression");
  } else if (!noCalls && this.eat(types$1.parenL)) {
    var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
    if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      if (this.awaitIdentPos > 0) {
        this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
      }
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
    var node$1 = this.startNodeAt(startPos, startLoc);
    node$1.callee = base;
    node$1.arguments = exprList;
    if (optionalSupported) {
      node$1.optional = optional;
    }
    base = this.finishNode(node$1, "CallExpression");
  } else if (this.type === types$1.backQuote) {
    if (optional || optionalChained) {
      this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    }
    var node$2 = this.startNodeAt(startPos, startLoc);
    node$2.tag = base;
    node$2.quasi = this.parseTemplate({ isTagged: true });
    base = this.finishNode(node$2, "TaggedTemplateExpression");
  }
  return base;
};
pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
  if (this.type === types$1.slash) {
    this.readRegexp();
  }
  var node2, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
    case types$1._super:
      if (!this.allowSuper) {
        this.raise(this.start, "'super' keyword outside a method");
      }
      node2 = this.startNode();
      this.next();
      if (this.type === types$1.parenL && !this.allowDirectSuper) {
        this.raise(node2.start, "super() call outside constructor of a subclass");
      }
      if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
        this.unexpected();
      }
      return this.finishNode(node2, "Super");
    case types$1._this:
      node2 = this.startNode();
      this.next();
      return this.finishNode(node2, "ThisExpression");
    case types$1.name:
      var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
      var id = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
        this.overrideContext(types.f_expr);
        return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
      }
      if (canBeArrow && !this.canInsertSemicolon()) {
        if (this.eat(types$1.arrow)) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
        }
        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
          id = this.parseIdent(false);
          if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
            this.unexpected();
          }
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
        }
      }
      return id;
    case types$1.regexp:
      var value2 = this.value;
      node2 = this.parseLiteral(value2.value);
      node2.regex = { pattern: value2.pattern, flags: value2.flags };
      return node2;
    case types$1.num:
    case types$1.string:
      return this.parseLiteral(this.value);
    case types$1._null:
    case types$1._true:
    case types$1._false:
      node2 = this.startNode();
      node2.value = this.type === types$1._null ? null : this.type === types$1._true;
      node2.raw = this.type.keyword;
      this.next();
      return this.finishNode(node2, "Literal");
    case types$1.parenL:
      var start2 = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
      if (refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
          refDestructuringErrors.parenthesizedAssign = start2;
        }
        if (refDestructuringErrors.parenthesizedBind < 0) {
          refDestructuringErrors.parenthesizedBind = start2;
        }
      }
      return expr;
    case types$1.bracketL:
      node2 = this.startNode();
      this.next();
      node2.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node2, "ArrayExpression");
    case types$1.braceL:
      this.overrideContext(types.b_expr);
      return this.parseObj(false, refDestructuringErrors);
    case types$1._function:
      node2 = this.startNode();
      this.next();
      return this.parseFunction(node2, 0);
    case types$1._class:
      return this.parseClass(this.startNode(), false);
    case types$1._new:
      return this.parseNew();
    case types$1.backQuote:
      return this.parseTemplate();
    case types$1._import:
      if (this.options.ecmaVersion >= 11) {
        return this.parseExprImport(forNew);
      } else {
        return this.unexpected();
      }
    default:
      return this.parseExprAtomDefault();
  }
};
pp$5.parseExprAtomDefault = function() {
  this.unexpected();
};
pp$5.parseExprImport = function(forNew) {
  var node2 = this.startNode();
  if (this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword import");
  }
  this.next();
  if (this.type === types$1.parenL && !forNew) {
    return this.parseDynamicImport(node2);
  } else if (this.type === types$1.dot) {
    var meta = this.startNodeAt(node2.start, node2.loc && node2.loc.start);
    meta.name = "import";
    node2.meta = this.finishNode(meta, "Identifier");
    return this.parseImportMeta(node2);
  } else {
    this.unexpected();
  }
};
pp$5.parseDynamicImport = function(node2) {
  this.next();
  node2.source = this.parseMaybeAssign();
  if (this.options.ecmaVersion >= 16) {
    if (!this.eat(types$1.parenR)) {
      this.expect(types$1.comma);
      if (!this.afterTrailingComma(types$1.parenR)) {
        node2.options = this.parseMaybeAssign();
        if (!this.eat(types$1.parenR)) {
          this.expect(types$1.comma);
          if (!this.afterTrailingComma(types$1.parenR)) {
            this.unexpected();
          }
        }
      } else {
        node2.options = null;
      }
    } else {
      node2.options = null;
    }
  } else {
    if (!this.eat(types$1.parenR)) {
      var errorPos = this.start;
      if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
        this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
      } else {
        this.unexpected(errorPos);
      }
    }
  }
  return this.finishNode(node2, "ImportExpression");
};
pp$5.parseImportMeta = function(node2) {
  this.next();
  var containsEsc = this.containsEsc;
  node2.property = this.parseIdent(true);
  if (node2.property.name !== "meta") {
    this.raiseRecoverable(node2.property.start, "The only valid meta property for import is 'import.meta'");
  }
  if (containsEsc) {
    this.raiseRecoverable(node2.start, "'import.meta' must not contain escaped characters");
  }
  if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
    this.raiseRecoverable(node2.start, "Cannot use 'import.meta' outside a module");
  }
  return this.finishNode(node2, "MetaProperty");
};
pp$5.parseLiteral = function(value2) {
  var node2 = this.startNode();
  node2.value = value2;
  node2.raw = this.input.slice(this.start, this.end);
  if (node2.raw.charCodeAt(node2.raw.length - 1) === 110) {
    node2.bigint = node2.value != null ? node2.value.toString() : node2.raw.slice(0, -1).replace(/_/g, "");
  }
  this.next();
  return this.finishNode(node2, "Literal");
};
pp$5.parseParenExpression = function() {
  this.expect(types$1.parenL);
  var val = this.parseExpression();
  this.expect(types$1.parenR);
  return val;
};
pp$5.shouldParseArrow = function(exprList) {
  return !this.canInsertSemicolon();
};
pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    while (this.type !== types$1.parenR) {
      first ? first = false : this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
        lastIsComma = true;
        break;
      } else if (this.type === types$1.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseParenItem(this.parseRestBinding()));
        if (this.type === types$1.comma) {
          this.raiseRecoverable(
            this.start,
            "Comma is not permitted after the rest element"
          );
        }
        break;
      } else {
        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      }
    }
    var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
    this.expect(types$1.parenR);
    if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
    }
    if (!exprList.length || lastIsComma) {
      this.unexpected(this.lastTokStart);
    }
    if (spreadStart) {
      this.unexpected(spreadStart);
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }
  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression");
  } else {
    return val;
  }
};
pp$5.parseParenItem = function(item) {
  return item;
};
pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
};
var empty = [];
pp$5.parseNew = function() {
  if (this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  }
  var node2 = this.startNode();
  this.next();
  if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
    var meta = this.startNodeAt(node2.start, node2.loc && node2.loc.start);
    meta.name = "new";
    node2.meta = this.finishNode(meta, "Identifier");
    this.next();
    var containsEsc = this.containsEsc;
    node2.property = this.parseIdent(true);
    if (node2.property.name !== "target") {
      this.raiseRecoverable(node2.property.start, "The only valid meta property for new is 'new.target'");
    }
    if (containsEsc) {
      this.raiseRecoverable(node2.start, "'new.target' must not contain escaped characters");
    }
    if (!this.allowNewDotTarget) {
      this.raiseRecoverable(node2.start, "'new.target' can only be used in functions and class static block");
    }
    return this.finishNode(node2, "MetaProperty");
  }
  var startPos = this.start, startLoc = this.startLoc;
  node2.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
  if (this.eat(types$1.parenL)) {
    node2.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
  } else {
    node2.arguments = empty;
  }
  return this.finishNode(node2, "NewExpression");
};
pp$5.parseTemplateElement = function(ref2) {
  var isTagged = ref2.isTagged;
  var elem = this.startNode();
  if (this.type === types$1.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value.replace(/\r\n?/g, "\n"),
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types$1.backQuote;
  return this.finishNode(elem, "TemplateElement");
};
pp$5.parseTemplate = function(ref2) {
  if (ref2 === void 0) ref2 = {};
  var isTagged = ref2.isTagged;
  if (isTagged === void 0) isTagged = false;
  var node2 = this.startNode();
  this.next();
  node2.expressions = [];
  var curElt = this.parseTemplateElement({ isTagged });
  node2.quasis = [curElt];
  while (!curElt.tail) {
    if (this.type === types$1.eof) {
      this.raise(this.pos, "Unterminated template literal");
    }
    this.expect(types$1.dollarBraceL);
    node2.expressions.push(this.parseExpression());
    this.expect(types$1.braceR);
    node2.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
  }
  this.next();
  return this.finishNode(node2, "TemplateLiteral");
};
pp$5.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};
pp$5.parseObj = function(isPattern, refDestructuringErrors) {
  var node2 = this.startNode(), first = true, propHash = {};
  node2.properties = [];
  this.next();
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var prop = this.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) {
      this.checkPropClash(prop, propHash, refDestructuringErrors);
    }
    node2.properties.push(prop);
  }
  return this.finishNode(node2, isPattern ? "ObjectPattern" : "ObjectExpression");
};
pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types$1.comma) {
        this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement");
    }
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    return this.finishNode(prop, "SpreadElement");
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern) {
      isGenerator = this.eat(types$1.star);
    }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
    this.parsePropertyName(prop);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property");
};
pp$5.parseGetterSetter = function(prop) {
  var kind = prop.key.name;
  this.parsePropertyName(prop);
  prop.value = this.parseMethod(false);
  prop.kind = kind;
  var paramCount = prop.kind === "get" ? 0 : 1;
  if (prop.value.params.length !== paramCount) {
    var start2 = prop.value.start;
    if (prop.kind === "get") {
      this.raiseRecoverable(start2, "getter should have no params");
    } else {
      this.raiseRecoverable(start2, "setter should have exactly one param");
    }
  } else {
    if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
      this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
    }
  }
};
pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types$1.colon) {
    this.unexpected();
  }
  if (this.eat(types$1.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
    if (isPattern) {
      this.unexpected();
    }
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
    prop.kind = "init";
  } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
    if (isGenerator || isAsync) {
      this.unexpected();
    }
    this.parseGetterSetter(prop);
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (isGenerator || isAsync) {
      this.unexpected();
    }
    this.checkUnreserved(prop.key);
    if (prop.key.name === "await" && !this.awaitIdentPos) {
      this.awaitIdentPos = startPos;
    }
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else if (this.type === types$1.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0) {
        refDestructuringErrors.shorthandAssign = this.start;
      }
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else {
      prop.value = this.copyNode(prop.key);
    }
    prop.kind = "init";
    prop.shorthand = true;
  } else {
    this.unexpected();
  }
};
pp$5.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types$1.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types$1.bracketR);
      return prop.key;
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
pp$5.initFunction = function(node2) {
  node2.id = null;
  if (this.options.ecmaVersion >= 6) {
    node2.generator = node2.expression = false;
  }
  if (this.options.ecmaVersion >= 8) {
    node2.async = false;
  }
};
pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
  var node2 = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.initFunction(node2);
  if (this.options.ecmaVersion >= 6) {
    node2.generator = isGenerator;
  }
  if (this.options.ecmaVersion >= 8) {
    node2.async = !!isAsync;
  }
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(isAsync, node2.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
  this.expect(types$1.parenL);
  node2.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node2, false, true, false);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node2, "FunctionExpression");
};
pp$5.parseArrowExpression = function(node2, params, isAsync, forInit) {
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
  this.initFunction(node2);
  if (this.options.ecmaVersion >= 8) {
    node2.async = !!isAsync;
  }
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  node2.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node2, true, false, forInit);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node2, "ArrowFunctionExpression");
};
pp$5.parseFunctionBody = function(node2, isArrowFunction, isMethod, forInit) {
  var isExpression = isArrowFunction && this.type !== types$1.braceL;
  var oldStrict = this.strict, useStrict = false;
  if (isExpression) {
    node2.body = this.parseMaybeAssign(forInit);
    node2.expression = true;
    this.checkParams(node2, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node2.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      if (useStrict && nonSimple) {
        this.raiseRecoverable(node2.start, "Illegal 'use strict' directive in function with non-simple parameter list");
      }
    }
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) {
      this.strict = true;
    }
    this.checkParams(node2, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node2.params));
    if (this.strict && node2.id) {
      this.checkLValSimple(node2.id, BIND_OUTSIDE);
    }
    node2.body = this.parseBlock(false, void 0, useStrict && !oldStrict);
    node2.expression = false;
    this.adaptDirectivePrologue(node2.body.body);
    this.labels = oldLabels;
  }
  this.exitScope();
};
pp$5.isSimpleParamList = function(params) {
  for (var i = 0, list3 = params; i < list3.length; i += 1) {
    var param = list3[i];
    if (param.type !== "Identifier") {
      return false;
    }
  }
  return true;
};
pp$5.checkParams = function(node2, allowDuplicates) {
  var nameHash = /* @__PURE__ */ Object.create(null);
  for (var i = 0, list3 = node2.params; i < list3.length; i += 1) {
    var param = list3[i];
    this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
  }
};
pp$5.parseExprList = function(close2, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var elts = [], first = true;
  while (!this.eat(close2)) {
    if (!first) {
      this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(close2)) {
        break;
      }
    } else {
      first = false;
    }
    var elt = void 0;
    if (allowEmpty && this.type === types$1.comma) {
      elt = null;
    } else if (this.type === types$1.ellipsis) {
      elt = this.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
    } else {
      elt = this.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts;
};
pp$5.checkUnreserved = function(ref2) {
  var start2 = ref2.start;
  var end = ref2.end;
  var name2 = ref2.name;
  if (this.inGenerator && name2 === "yield") {
    this.raiseRecoverable(start2, "Cannot use 'yield' as identifier inside a generator");
  }
  if (this.inAsync && name2 === "await") {
    this.raiseRecoverable(start2, "Cannot use 'await' as identifier inside an async function");
  }
  if (!(this.currentThisScope().flags & SCOPE_VAR) && name2 === "arguments") {
    this.raiseRecoverable(start2, "Cannot use 'arguments' in class field initializer");
  }
  if (this.inClassStaticBlock && (name2 === "arguments" || name2 === "await")) {
    this.raise(start2, "Cannot use " + name2 + " in class static initialization block");
  }
  if (this.keywords.test(name2)) {
    this.raise(start2, "Unexpected keyword '" + name2 + "'");
  }
  if (this.options.ecmaVersion < 6 && this.input.slice(start2, end).indexOf("\\") !== -1) {
    return;
  }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name2)) {
    if (!this.inAsync && name2 === "await") {
      this.raiseRecoverable(start2, "Cannot use keyword 'await' outside an async function");
    }
    this.raiseRecoverable(start2, "The keyword '" + name2 + "' is reserved");
  }
};
pp$5.parseIdent = function(liberal) {
  var node2 = this.parseIdentNode();
  this.next(!!liberal);
  this.finishNode(node2, "Identifier");
  if (!liberal) {
    this.checkUnreserved(node2);
    if (node2.name === "await" && !this.awaitIdentPos) {
      this.awaitIdentPos = node2.start;
    }
  }
  return node2;
};
pp$5.parseIdentNode = function() {
  var node2 = this.startNode();
  if (this.type === types$1.name) {
    node2.name = this.value;
  } else if (this.type.keyword) {
    node2.name = this.type.keyword;
    if ((node2.name === "class" || node2.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
    this.type = types$1.name;
  } else {
    this.unexpected();
  }
  return node2;
};
pp$5.parsePrivateIdent = function() {
  var node2 = this.startNode();
  if (this.type === types$1.privateId) {
    node2.name = this.value;
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node2, "PrivateIdentifier");
  if (this.options.checkPrivateFields) {
    if (this.privateNameStack.length === 0) {
      this.raise(node2.start, "Private field '#" + node2.name + "' must be declared in an enclosing class");
    } else {
      this.privateNameStack[this.privateNameStack.length - 1].used.push(node2);
    }
  }
  return node2;
};
pp$5.parseYield = function(forInit) {
  if (!this.yieldPos) {
    this.yieldPos = this.start;
  }
  var node2 = this.startNode();
  this.next();
  if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
    node2.delegate = false;
    node2.argument = null;
  } else {
    node2.delegate = this.eat(types$1.star);
    node2.argument = this.parseMaybeAssign(forInit);
  }
  return this.finishNode(node2, "YieldExpression");
};
pp$5.parseAwait = function(forInit) {
  if (!this.awaitPos) {
    this.awaitPos = this.start;
  }
  var node2 = this.startNode();
  this.next();
  node2.argument = this.parseMaybeUnary(null, true, false, forInit);
  return this.finishNode(node2, "AwaitExpression");
};
var pp$4 = Parser.prototype;
pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  if (this.sourceFile) {
    message += " in " + this.sourceFile;
  }
  var err = new SyntaxError(message);
  err.pos = pos;
  err.loc = loc;
  err.raisedAt = this.pos;
  throw err;
};
pp$4.raiseRecoverable = pp$4.raise;
pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart);
  }
};
var pp$3 = Parser.prototype;
var Scope = function Scope2(flags) {
  this.flags = flags;
  this.var = [];
  this.lexical = [];
  this.functions = [];
};
pp$3.enterScope = function(flags) {
  this.scopeStack.push(new Scope(flags));
};
pp$3.exitScope = function() {
  this.scopeStack.pop();
};
pp$3.treatFunctionsAsVarInScope = function(scope) {
  return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
};
pp$3.declareName = function(name2, bindingType, pos) {
  var redeclared = false;
  if (bindingType === BIND_LEXICAL) {
    var scope = this.currentScope();
    redeclared = scope.lexical.indexOf(name2) > -1 || scope.functions.indexOf(name2) > -1 || scope.var.indexOf(name2) > -1;
    scope.lexical.push(name2);
    if (this.inModule && scope.flags & SCOPE_TOP) {
      delete this.undefinedExports[name2];
    }
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    var scope$1 = this.currentScope();
    scope$1.lexical.push(name2);
  } else if (bindingType === BIND_FUNCTION) {
    var scope$2 = this.currentScope();
    if (this.treatFunctionsAsVar) {
      redeclared = scope$2.lexical.indexOf(name2) > -1;
    } else {
      redeclared = scope$2.lexical.indexOf(name2) > -1 || scope$2.var.indexOf(name2) > -1;
    }
    scope$2.functions.push(name2);
  } else {
    for (var i = this.scopeStack.length - 1; i >= 0; --i) {
      var scope$3 = this.scopeStack[i];
      if (scope$3.lexical.indexOf(name2) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name2) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name2) > -1) {
        redeclared = true;
        break;
      }
      scope$3.var.push(name2);
      if (this.inModule && scope$3.flags & SCOPE_TOP) {
        delete this.undefinedExports[name2];
      }
      if (scope$3.flags & SCOPE_VAR) {
        break;
      }
    }
  }
  if (redeclared) {
    this.raiseRecoverable(pos, "Identifier '" + name2 + "' has already been declared");
  }
};
pp$3.checkLocalExport = function(id) {
  if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
    this.undefinedExports[id.name] = id;
  }
};
pp$3.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
pp$3.currentVarScope = function() {
  for (var i = this.scopeStack.length - 1; ; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK)) {
      return scope;
    }
  }
};
pp$3.currentThisScope = function() {
  for (var i = this.scopeStack.length - 1; ; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) && !(scope.flags & SCOPE_ARROW)) {
      return scope;
    }
  }
};
var Node = function Node2(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations) {
    this.loc = new SourceLocation(parser, loc);
  }
  if (parser.options.directSourceFile) {
    this.sourceFile = parser.options.directSourceFile;
  }
  if (parser.options.ranges) {
    this.range = [pos, 0];
  }
};
var pp$2 = Parser.prototype;
pp$2.startNode = function() {
  return new Node(this, this.start, this.startLoc);
};
pp$2.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc);
};
function finishNodeAt(node2, type, pos, loc) {
  node2.type = type;
  node2.end = pos;
  if (this.options.locations) {
    node2.loc.end = loc;
  }
  if (this.options.ranges) {
    node2.range[1] = pos;
  }
  return node2;
}
pp$2.finishNode = function(node2, type) {
  return finishNodeAt.call(this, node2, type, this.lastTokEnd, this.lastTokEndLoc);
};
pp$2.finishNodeAt = function(node2, type, pos, loc) {
  return finishNodeAt.call(this, node2, type, pos, loc);
};
pp$2.copyNode = function(node2) {
  var newNode = new Node(this, node2.start, this.startLoc);
  for (var prop in node2) {
    newNode[prop] = node2[prop];
  }
  return newNode;
};
var scriptValuesAddedInUnicode = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz";
var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
var ecma11BinaryProperties = ecma10BinaryProperties;
var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
var ecma13BinaryProperties = ecma12BinaryProperties;
var ecma14BinaryProperties = ecma13BinaryProperties;
var unicodeBinaryProperties = {
  9: ecma9BinaryProperties,
  10: ecma10BinaryProperties,
  11: ecma11BinaryProperties,
  12: ecma12BinaryProperties,
  13: ecma13BinaryProperties,
  14: ecma14BinaryProperties
};
var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";
var unicodeBinaryPropertiesOfStrings = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: ecma14BinaryPropertiesOfStrings
};
var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
var ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode;
var unicodeScriptValues = {
  9: ecma9ScriptValues,
  10: ecma10ScriptValues,
  11: ecma11ScriptValues,
  12: ecma12ScriptValues,
  13: ecma13ScriptValues,
  14: ecma14ScriptValues
};
var data = {};
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
    binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script;
  d.nonBinary.gc = d.nonBinary.General_Category;
  d.nonBinary.sc = d.nonBinary.Script;
  d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
for (i = 0, list3 = [9, 10, 11, 12, 13, 14]; i < list3.length; i += 1) {
  ecmaVersion = list3[i];
  buildUnicodeData(ecmaVersion);
}
var ecmaVersion;
var i;
var list3;
var pp$1 = Parser.prototype;
var BranchID = function BranchID2(parent, base) {
  this.parent = parent;
  this.base = base || this;
};
BranchID.prototype.separatedFrom = function separatedFrom(alt) {
  for (var self2 = this; self2; self2 = self2.parent) {
    for (var other = alt; other; other = other.parent) {
      if (self2.base === other.base && self2 !== other) {
        return true;
      }
    }
  }
  return false;
};
BranchID.prototype.sibling = function sibling() {
  return new BranchID(this.parent, this.base);
};
var RegExpValidationState = function RegExpValidationState2(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
  this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchV = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = /* @__PURE__ */ Object.create(null);
  this.backReferenceNames = [];
  this.branchID = null;
};
RegExpValidationState.prototype.reset = function reset(start2, pattern, flags) {
  var unicodeSets = flags.indexOf("v") !== -1;
  var unicode = flags.indexOf("u") !== -1;
  this.start = start2 | 0;
  this.source = pattern + "";
  this.flags = flags;
  if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
    this.switchU = true;
    this.switchV = true;
    this.switchN = true;
  } else {
    this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
    this.switchV = false;
    this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
  }
};
RegExpValidationState.prototype.raise = function raise(message) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
};
RegExpValidationState.prototype.at = function at(i, forceU) {
  if (forceU === void 0) forceU = false;
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return -1;
  }
  var c = s.charCodeAt(i);
  if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l) {
    return c;
  }
  var next = s.charCodeAt(i + 1);
  return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
};
RegExpValidationState.prototype.nextIndex = function nextIndex(i, forceU) {
  if (forceU === void 0) forceU = false;
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return l;
  }
  var c = s.charCodeAt(i), next;
  if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 56320 || next > 57343) {
    return i + 1;
  }
  return i + 2;
};
RegExpValidationState.prototype.current = function current(forceU) {
  if (forceU === void 0) forceU = false;
  return this.at(this.pos, forceU);
};
RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
  if (forceU === void 0) forceU = false;
  return this.at(this.nextIndex(this.pos, forceU), forceU);
};
RegExpValidationState.prototype.advance = function advance(forceU) {
  if (forceU === void 0) forceU = false;
  this.pos = this.nextIndex(this.pos, forceU);
};
RegExpValidationState.prototype.eat = function eat(ch, forceU) {
  if (forceU === void 0) forceU = false;
  if (this.current(forceU) === ch) {
    this.advance(forceU);
    return true;
  }
  return false;
};
RegExpValidationState.prototype.eatChars = function eatChars(chs, forceU) {
  if (forceU === void 0) forceU = false;
  var pos = this.pos;
  for (var i = 0, list3 = chs; i < list3.length; i += 1) {
    var ch = list3[i];
    var current2 = this.at(pos, forceU);
    if (current2 === -1 || current2 !== ch) {
      return false;
    }
    pos = this.nextIndex(pos, forceU);
  }
  this.pos = pos;
  return true;
};
pp$1.validateRegExpFlags = function(state) {
  var validFlags = state.validFlags;
  var flags = state.flags;
  var u = false;
  var v = false;
  for (var i = 0; i < flags.length; i++) {
    var flag = flags.charAt(i);
    if (validFlags.indexOf(flag) === -1) {
      this.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this.raise(state.start, "Duplicate regular expression flag");
    }
    if (flag === "u") {
      u = true;
    }
    if (flag === "v") {
      v = true;
    }
  }
  if (this.options.ecmaVersion >= 15 && u && v) {
    this.raise(state.start, "Invalid regular expression flag");
  }
};
function hasProp(obj) {
  for (var _ in obj) {
    return true;
  }
  return false;
}
pp$1.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);
  if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames)) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};
pp$1.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames = /* @__PURE__ */ Object.create(null);
  state.backReferenceNames.length = 0;
  state.branchID = null;
  this.regexp_disjunction(state);
  if (state.pos !== state.source.length) {
    if (state.eat(
      41
      /* ) */
    )) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(
      93
      /* ] */
    ) || state.eat(
      125
      /* } */
    )) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i = 0, list3 = state.backReferenceNames; i < list3.length; i += 1) {
    var name2 = list3[i];
    if (!state.groupNames[name2]) {
      state.raise("Invalid named capture referenced");
    }
  }
};
pp$1.regexp_disjunction = function(state) {
  var trackDisjunction = this.options.ecmaVersion >= 16;
  if (trackDisjunction) {
    state.branchID = new BranchID(state.branchID, null);
  }
  this.regexp_alternative(state);
  while (state.eat(
    124
    /* | */
  )) {
    if (trackDisjunction) {
      state.branchID = state.branchID.sibling();
    }
    this.regexp_alternative(state);
  }
  if (trackDisjunction) {
    state.branchID = state.branchID.parent;
  }
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(
    123
    /* { */
  )) {
    state.raise("Lone quantifier brackets");
  }
};
pp$1.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
  }
};
pp$1.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true;
  }
  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true;
  }
  return false;
};
pp$1.regexp_eatAssertion = function(state) {
  var start2 = state.pos;
  state.lastAssertionIsQuantifiable = false;
  if (state.eat(
    94
    /* ^ */
  ) || state.eat(
    36
    /* $ */
  )) {
    return true;
  }
  if (state.eat(
    92
    /* \ */
  )) {
    if (state.eat(
      66
      /* B */
    ) || state.eat(
      98
      /* b */
    )) {
      return true;
    }
    state.pos = start2;
  }
  if (state.eat(
    40
    /* ( */
  ) && state.eat(
    63
    /* ? */
  )) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(
        60
        /* < */
      );
    }
    if (state.eat(
      61
      /* = */
    ) || state.eat(
      33
      /* ! */
    )) {
      this.regexp_disjunction(state);
      if (!state.eat(
        41
        /* ) */
      )) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true;
    }
  }
  state.pos = start2;
  return false;
};
pp$1.regexp_eatQuantifier = function(state, noError) {
  if (noError === void 0) noError = false;
  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(
      63
      /* ? */
    );
    return true;
  }
  return false;
};
pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
  return state.eat(
    42
    /* * */
  ) || state.eat(
    43
    /* + */
  ) || state.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(state, noError);
};
pp$1.regexp_eatBracedQuantifier = function(state, noError) {
  var start2 = state.pos;
  if (state.eat(
    123
    /* { */
  )) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(
        44
        /* , */
      ) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(
        125
        /* } */
      )) {
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true;
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatAtom = function(state) {
  return this.regexp_eatPatternCharacters(state) || state.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
};
pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start2 = state.pos;
  if (state.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(state)) {
      return true;
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatUncapturingGroup = function(state) {
  var start2 = state.pos;
  if (state.eat(
    40
    /* ( */
  )) {
    if (state.eat(
      63
      /* ? */
    )) {
      if (this.options.ecmaVersion >= 16) {
        var addModifiers = this.regexp_eatModifiers(state);
        var hasHyphen = state.eat(
          45
          /* - */
        );
        if (addModifiers || hasHyphen) {
          for (var i = 0; i < addModifiers.length; i++) {
            var modifier = addModifiers.charAt(i);
            if (addModifiers.indexOf(modifier, i + 1) > -1) {
              state.raise("Duplicate regular expression modifiers");
            }
          }
          if (hasHyphen) {
            var removeModifiers = this.regexp_eatModifiers(state);
            if (!addModifiers && !removeModifiers && state.current() === 58) {
              state.raise("Invalid regular expression modifiers");
            }
            for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
              var modifier$1 = removeModifiers.charAt(i$1);
              if (removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 || addModifiers.indexOf(modifier$1) > -1) {
                state.raise("Duplicate regular expression modifiers");
              }
            }
          }
        }
      }
      if (state.eat(
        58
        /* : */
      )) {
        this.regexp_disjunction(state);
        if (state.eat(
          41
          /* ) */
        )) {
          return true;
        }
        state.raise("Unterminated group");
      }
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatCapturingGroup = function(state) {
  if (state.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 63) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(
      41
      /* ) */
    )) {
      state.numCapturingParens += 1;
      return true;
    }
    state.raise("Unterminated group");
  }
  return false;
};
pp$1.regexp_eatModifiers = function(state) {
  var modifiers = "";
  var ch = 0;
  while ((ch = state.current()) !== -1 && isRegularExpressionModifier(ch)) {
    modifiers += codePointToString(ch);
    state.advance();
  }
  return modifiers;
};
function isRegularExpressionModifier(ch) {
  return ch === 105 || ch === 109 || ch === 115;
}
pp$1.regexp_eatExtendedAtom = function(state) {
  return state.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
};
pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false;
};
pp$1.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
function isSyntaxCharacter(ch) {
  return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
}
pp$1.regexp_eatPatternCharacters = function(state) {
  var start2 = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start2;
};
pp$1.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_groupSpecifier = function(state) {
  if (state.eat(
    63
    /* ? */
  )) {
    if (!this.regexp_eatGroupName(state)) {
      state.raise("Invalid group");
    }
    var trackDisjunction = this.options.ecmaVersion >= 16;
    var known = state.groupNames[state.lastStringValue];
    if (known) {
      if (trackDisjunction) {
        for (var i = 0, list3 = known; i < list3.length; i += 1) {
          var altID = list3[i];
          if (!altID.separatedFrom(state.branchID)) {
            state.raise("Duplicate capture group name");
          }
        }
      } else {
        state.raise("Duplicate capture group name");
      }
    }
    if (trackDisjunction) {
      (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
    } else {
      state.groupNames[state.lastStringValue] = true;
    }
  }
};
pp$1.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(
      62
      /* > */
    )) {
      return true;
    }
    state.raise("Invalid capture group name");
  }
  return false;
};
pp$1.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
    }
    return true;
  }
  return false;
};
pp$1.regexp_eatRegExpIdentifierStart = function(state) {
  var start2 = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);
  if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true;
  }
  state.pos = start2;
  return false;
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
}
pp$1.regexp_eatRegExpIdentifierPart = function(state) {
  var start2 = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);
  if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true;
  }
  state.pos = start2;
  return false;
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
}
pp$1.regexp_eatAtomEscape = function(state) {
  if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
    return true;
  }
  if (state.switchU) {
    if (state.current() === 99) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false;
};
pp$1.regexp_eatBackReference = function(state) {
  var start2 = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true;
    }
    if (n <= state.numCapturingParens) {
      return true;
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatKGroupName = function(state) {
  if (state.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true;
    }
    state.raise("Invalid named reference");
  }
  return false;
};
pp$1.regexp_eatCharacterEscape = function(state) {
  return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
};
pp$1.regexp_eatCControlLetter = function(state) {
  var start2 = state.pos;
  if (state.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(state)) {
      return true;
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatZero = function(state) {
  if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 116) {
    state.lastIntValue = 9;
    state.advance();
    return true;
  }
  if (ch === 110) {
    state.lastIntValue = 10;
    state.advance();
    return true;
  }
  if (ch === 118) {
    state.lastIntValue = 11;
    state.advance();
    return true;
  }
  if (ch === 102) {
    state.lastIntValue = 12;
    state.advance();
    return true;
  }
  if (ch === 114) {
    state.lastIntValue = 13;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 32;
    state.advance();
    return true;
  }
  return false;
};
function isControlLetter(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
  if (forceU === void 0) forceU = false;
  var start2 = state.pos;
  var switchU = forceU || state.switchU;
  if (state.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (switchU && lead >= 55296 && lead <= 56319) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(
          92
          /* \ */
        ) && state.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail2 = state.lastIntValue;
          if (trail2 >= 56320 && trail2 <= 57343) {
            state.lastIntValue = (lead - 55296) * 1024 + (trail2 - 56320) + 65536;
            return true;
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true;
    }
    if (switchU && state.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(state) && state.eat(
      125
      /* } */
    ) && isValidUnicode(state.lastIntValue)) {
      return true;
    }
    if (switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start2;
  }
  return false;
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 1114111;
}
pp$1.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true;
    }
    if (state.eat(
      47
      /* / */
    )) {
      state.lastIntValue = 47;
      return true;
    }
    return false;
  }
  var ch = state.current();
  if (ch !== 99 && (!state.switchN || ch !== 107)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 49 && ch <= 57) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
      state.advance();
    } while ((ch = state.current()) >= 48 && ch <= 57);
    return true;
  }
  return false;
};
var CharSetNone = 0;
var CharSetOk = 1;
var CharSetString = 2;
pp$1.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();
  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return CharSetOk;
  }
  var negate = false;
  if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch === 80) || ch === 112)) {
    state.lastIntValue = -1;
    state.advance();
    var result;
    if (state.eat(
      123
      /* { */
    ) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(
      125
      /* } */
    )) {
      if (negate && result === CharSetString) {
        state.raise("Invalid property name");
      }
      return result;
    }
    state.raise("Invalid property name");
  }
  return CharSetNone;
};
function isCharacterClassEscape(ch) {
  return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
}
pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start2 = state.pos;
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(
    61
    /* = */
  )) {
    var name2 = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value2 = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name2, value2);
      return CharSetOk;
    }
  }
  state.pos = start2;
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
  }
  return CharSetNone;
};
pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name2, value2) {
  if (!hasOwn(state.unicodeProperties.nonBinary, name2)) {
    state.raise("Invalid property name");
  }
  if (!state.unicodeProperties.nonBinary[name2].test(value2)) {
    state.raise("Invalid property value");
  }
};
pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (state.unicodeProperties.binary.test(nameOrValue)) {
    return CharSetOk;
  }
  if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) {
    return CharSetString;
  }
  state.raise("Invalid property name");
};
pp$1.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== "";
};
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 95;
}
pp$1.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== "";
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
}
pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state);
};
pp$1.regexp_eatCharacterClass = function(state) {
  if (state.eat(
    91
    /* [ */
  )) {
    var negate = state.eat(
      94
      /* ^ */
    );
    var result = this.regexp_classContents(state);
    if (!state.eat(
      93
      /* ] */
    )) {
      state.raise("Unterminated character class");
    }
    if (negate && result === CharSetString) {
      state.raise("Negated character class may contain strings");
    }
    return true;
  }
  return false;
};
pp$1.regexp_classContents = function(state) {
  if (state.current() === 93) {
    return CharSetOk;
  }
  if (state.switchV) {
    return this.regexp_classSetExpression(state);
  }
  this.regexp_nonEmptyClassRanges(state);
  return CharSetOk;
};
pp$1.regexp_nonEmptyClassRanges = function(state) {
  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};
pp$1.regexp_eatClassAtom = function(state) {
  var start2 = state.pos;
  if (state.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(state)) {
      return true;
    }
    if (state.switchU) {
      var ch$1 = state.current();
      if (ch$1 === 99 || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start2;
  }
  var ch = state.current();
  if (ch !== 93) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatClassEscape = function(state) {
  var start2 = state.pos;
  if (state.eat(
    98
    /* b */
  )) {
    state.lastIntValue = 8;
    return true;
  }
  if (state.switchU && state.eat(
    45
    /* - */
  )) {
    state.lastIntValue = 45;
    return true;
  }
  if (!state.switchU && state.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true;
    }
    state.pos = start2;
  }
  return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
};
pp$1.regexp_classSetExpression = function(state) {
  var result = CharSetOk, subResult;
  if (this.regexp_eatClassSetRange(state)) ;
  else if (subResult = this.regexp_eatClassSetOperand(state)) {
    if (subResult === CharSetString) {
      result = CharSetString;
    }
    var start2 = state.pos;
    while (state.eatChars(
      [38, 38]
      /* && */
    )) {
      if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
        if (subResult !== CharSetString) {
          result = CharSetOk;
        }
        continue;
      }
      state.raise("Invalid character in character class");
    }
    if (start2 !== state.pos) {
      return result;
    }
    while (state.eatChars(
      [45, 45]
      /* -- */
    )) {
      if (this.regexp_eatClassSetOperand(state)) {
        continue;
      }
      state.raise("Invalid character in character class");
    }
    if (start2 !== state.pos) {
      return result;
    }
  } else {
    state.raise("Invalid character in character class");
  }
  for (; ; ) {
    if (this.regexp_eatClassSetRange(state)) {
      continue;
    }
    subResult = this.regexp_eatClassSetOperand(state);
    if (!subResult) {
      return result;
    }
    if (subResult === CharSetString) {
      result = CharSetString;
    }
  }
};
pp$1.regexp_eatClassSetRange = function(state) {
  var start2 = state.pos;
  if (this.regexp_eatClassSetCharacter(state)) {
    var left = state.lastIntValue;
    if (state.eat(
      45
      /* - */
    ) && this.regexp_eatClassSetCharacter(state)) {
      var right = state.lastIntValue;
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
      return true;
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatClassSetOperand = function(state) {
  if (this.regexp_eatClassSetCharacter(state)) {
    return CharSetOk;
  }
  return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
};
pp$1.regexp_eatNestedClass = function(state) {
  var start2 = state.pos;
  if (state.eat(
    91
    /* [ */
  )) {
    var negate = state.eat(
      94
      /* ^ */
    );
    var result = this.regexp_classContents(state);
    if (state.eat(
      93
      /* ] */
    )) {
      if (negate && result === CharSetString) {
        state.raise("Negated character class may contain strings");
      }
      return result;
    }
    state.pos = start2;
  }
  if (state.eat(
    92
    /* \ */
  )) {
    var result$1 = this.regexp_eatCharacterClassEscape(state);
    if (result$1) {
      return result$1;
    }
    state.pos = start2;
  }
  return null;
};
pp$1.regexp_eatClassStringDisjunction = function(state) {
  var start2 = state.pos;
  if (state.eatChars(
    [92, 113]
    /* \q */
  )) {
    if (state.eat(
      123
      /* { */
    )) {
      var result = this.regexp_classStringDisjunctionContents(state);
      if (state.eat(
        125
        /* } */
      )) {
        return result;
      }
    } else {
      state.raise("Invalid escape");
    }
    state.pos = start2;
  }
  return null;
};
pp$1.regexp_classStringDisjunctionContents = function(state) {
  var result = this.regexp_classString(state);
  while (state.eat(
    124
    /* | */
  )) {
    if (this.regexp_classString(state) === CharSetString) {
      result = CharSetString;
    }
  }
  return result;
};
pp$1.regexp_classString = function(state) {
  var count = 0;
  while (this.regexp_eatClassSetCharacter(state)) {
    count++;
  }
  return count === 1 ? CharSetOk : CharSetString;
};
pp$1.regexp_eatClassSetCharacter = function(state) {
  var start2 = state.pos;
  if (state.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state)) {
      return true;
    }
    if (state.eat(
      98
      /* b */
    )) {
      state.lastIntValue = 8;
      return true;
    }
    state.pos = start2;
    return false;
  }
  var ch = state.current();
  if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch)) {
    return false;
  }
  if (isClassSetSyntaxCharacter(ch)) {
    return false;
  }
  state.advance();
  state.lastIntValue = ch;
  return true;
};
function isClassSetReservedDoublePunctuatorCharacter(ch) {
  return ch === 33 || ch >= 35 && ch <= 38 || ch >= 42 && ch <= 44 || ch === 46 || ch >= 58 && ch <= 64 || ch === 94 || ch === 96 || ch === 126;
}
function isClassSetSyntaxCharacter(ch) {
  return ch === 40 || ch === 41 || ch === 45 || ch === 47 || ch >= 91 && ch <= 93 || ch >= 123 && ch <= 125;
}
pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
  var ch = state.current();
  if (isClassSetReservedPunctuator(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
function isClassSetReservedPunctuator(ch) {
  return ch === 33 || ch === 35 || ch === 37 || ch === 38 || ch === 44 || ch === 45 || ch >= 58 && ch <= 62 || ch === 64 || ch === 96 || ch === 126;
}
pp$1.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 95) {
    state.lastIntValue = ch % 32;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatHexEscapeSequence = function(state) {
  var start2 = state.pos;
  if (state.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true;
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start2;
  }
  return false;
};
pp$1.regexp_eatDecimalDigits = function(state) {
  var start2 = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
    state.advance();
  }
  return state.pos !== start2;
};
function isDecimalDigit(ch) {
  return ch >= 48 && ch <= 57;
}
pp$1.regexp_eatHexDigits = function(state) {
  var start2 = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start2;
};
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function hexToInt(ch) {
  if (ch >= 65 && ch <= 70) {
    return 10 + (ch - 65);
  }
  if (ch >= 97 && ch <= 102) {
    return 10 + (ch - 97);
  }
  return ch - 48;
}
pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true;
  }
  return false;
};
pp$1.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 48;
    state.advance();
    return true;
  }
  state.lastIntValue = 0;
  return false;
};
function isOctalDigit(ch) {
  return ch >= 48 && ch <= 55;
}
pp$1.regexp_eatFixedHexDigits = function(state, length) {
  var start2 = state.pos;
  state.lastIntValue = 0;
  for (var i = 0; i < length; ++i) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start2;
      return false;
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true;
};
var Token = function Token2(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations) {
    this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
  }
  if (p.options.ranges) {
    this.range = [p.start, p.end];
  }
};
var pp = Parser.prototype;
pp.next = function(ignoreEscapeSequenceInKeyword) {
  if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
  }
  if (this.options.onToken) {
    this.options.onToken(new Token(this));
  }
  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};
pp.getToken = function() {
  this.next();
  return new Token(this);
};
if (typeof Symbol !== "undefined") {
  pp[Symbol.iterator] = function() {
    var this$1$1 = this;
    return {
      next: function() {
        var token = this$1$1.getToken();
        return {
          done: token.type === types$1.eof,
          value: token
        };
      }
    };
  };
}
pp.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) {
    this.skipSpace();
  }
  this.start = this.pos;
  if (this.options.locations) {
    this.startLoc = this.curPosition();
  }
  if (this.pos >= this.input.length) {
    return this.finishToken(types$1.eof);
  }
  if (curContext.override) {
    return curContext.override(this);
  } else {
    this.readToken(this.fullCharCodeAtPos());
  }
};
pp.readToken = function(code3) {
  if (isIdentifierStart(code3, this.options.ecmaVersion >= 6) || code3 === 92) {
    return this.readWord();
  }
  return this.getTokenFromCode(code3);
};
pp.fullCharCodeAt = function(pos) {
  var code3 = this.input.charCodeAt(pos);
  if (code3 <= 55295 || code3 >= 56320) {
    return code3;
  }
  var next = this.input.charCodeAt(pos + 1);
  return next <= 56319 || next >= 57344 ? code3 : (code3 << 10) + next - 56613888;
};
pp.fullCharCodeAtPos = function() {
  return this.fullCharCodeAt(this.pos);
};
pp.skipBlockComment = function() {
  var startLoc = this.options.onComment && this.curPosition();
  var start2 = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) {
    this.raise(this.pos - 2, "Unterminated comment");
  }
  this.pos = end + 2;
  if (this.options.locations) {
    for (var nextBreak = void 0, pos = start2; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
      ++this.curLine;
      pos = this.lineStart = nextBreak;
    }
  }
  if (this.options.onComment) {
    this.options.onComment(
      true,
      this.input.slice(start2 + 2, end),
      start2,
      this.pos,
      startLoc,
      this.curPosition()
    );
  }
};
pp.skipLineComment = function(startSkip) {
  var start2 = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this.input.charCodeAt(++this.pos);
  }
  if (this.options.onComment) {
    this.options.onComment(
      false,
      this.input.slice(start2 + startSkip, this.pos),
      start2,
      this.pos,
      startLoc,
      this.curPosition()
    );
  }
};
pp.skipSpace = function() {
  loop: while (this.pos < this.input.length) {
    var ch = this.input.charCodeAt(this.pos);
    switch (ch) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        if (this.input.charCodeAt(this.pos + 1) === 10) {
          ++this.pos;
        }
      case 10:
      case 8232:
      case 8233:
        ++this.pos;
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break loop;
        }
        break;
      default:
        if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
          ++this.pos;
        } else {
          break loop;
        }
    }
  }
};
pp.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) {
    this.endLoc = this.curPosition();
  }
  var prevType = this.type;
  this.type = type;
  this.value = val;
  this.updateContext(prevType);
};
pp.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) {
    return this.readNumber(true);
  }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
    this.pos += 3;
    return this.finishToken(types$1.ellipsis);
  } else {
    ++this.pos;
    return this.finishToken(types$1.dot);
  }
};
pp.readToken_slash = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) {
    ++this.pos;
    return this.readRegexp();
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.slash, 1);
};
pp.readToken_mult_modulo_exp = function(code3) {
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code3 === 42 ? types$1.star : types$1.modulo;
  if (this.options.ecmaVersion >= 7 && code3 === 42 && next === 42) {
    ++size;
    tokentype = types$1.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, size + 1);
  }
  return this.finishOp(tokentype, size);
};
pp.readToken_pipe_amp = function(code3) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code3) {
    if (this.options.ecmaVersion >= 12) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 === 61) {
        return this.finishOp(types$1.assign, 3);
      }
    }
    return this.finishOp(code3 === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(code3 === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
};
pp.readToken_caret = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.bitwiseXOR, 1);
};
pp.readToken_plus_min = function(code3) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code3) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken();
    }
    return this.finishOp(types$1.incDec, 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.plusMin, 1);
};
pp.readToken_lt_gt = function(code3) {
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code3) {
    size = code3 === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) {
      return this.finishOp(types$1.assign, size + 1);
    }
    return this.finishOp(types$1.bitShift, size);
  }
  if (next === 33 && code3 === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken();
  }
  if (next === 61) {
    size = 2;
  }
  return this.finishOp(types$1.relational, size);
};
pp.readToken_eq_excl = function(code3) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) {
    return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
  }
  if (code3 === 61 && next === 62 && this.options.ecmaVersion >= 6) {
    this.pos += 2;
    return this.finishToken(types$1.arrow);
  }
  return this.finishOp(code3 === 61 ? types$1.eq : types$1.prefix, 1);
};
pp.readToken_question = function() {
  var ecmaVersion = this.options.ecmaVersion;
  if (ecmaVersion >= 11) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 46) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 < 48 || next2 > 57) {
        return this.finishOp(types$1.questionDot, 2);
      }
    }
    if (next === 63) {
      if (ecmaVersion >= 12) {
        var next2$1 = this.input.charCodeAt(this.pos + 2);
        if (next2$1 === 61) {
          return this.finishOp(types$1.assign, 3);
        }
      }
      return this.finishOp(types$1.coalesce, 2);
    }
  }
  return this.finishOp(types$1.question, 1);
};
pp.readToken_numberSign = function() {
  var ecmaVersion = this.options.ecmaVersion;
  var code3 = 35;
  if (ecmaVersion >= 13) {
    ++this.pos;
    code3 = this.fullCharCodeAtPos();
    if (isIdentifierStart(code3, true) || code3 === 92) {
      return this.finishToken(types$1.privateId, this.readWord1());
    }
  }
  this.raise(this.pos, "Unexpected character '" + codePointToString(code3) + "'");
};
pp.getTokenFromCode = function(code3) {
  switch (code3) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      return this.readToken_dot();
    // Punctuation tokens.
    case 40:
      ++this.pos;
      return this.finishToken(types$1.parenL);
    case 41:
      ++this.pos;
      return this.finishToken(types$1.parenR);
    case 59:
      ++this.pos;
      return this.finishToken(types$1.semi);
    case 44:
      ++this.pos;
      return this.finishToken(types$1.comma);
    case 91:
      ++this.pos;
      return this.finishToken(types$1.bracketL);
    case 93:
      ++this.pos;
      return this.finishToken(types$1.bracketR);
    case 123:
      ++this.pos;
      return this.finishToken(types$1.braceL);
    case 125:
      ++this.pos;
      return this.finishToken(types$1.braceR);
    case 58:
      ++this.pos;
      return this.finishToken(types$1.colon);
    case 96:
      if (this.options.ecmaVersion < 6) {
        break;
      }
      ++this.pos;
      return this.finishToken(types$1.backQuote);
    case 48:
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) {
        return this.readRadixNumber(16);
      }
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) {
          return this.readRadixNumber(8);
        }
        if (next === 98 || next === 66) {
          return this.readRadixNumber(2);
        }
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(false);
    // Quotes produce strings.
    case 34:
    case 39:
      return this.readString(code3);
    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(code3);
    case 124:
    case 38:
      return this.readToken_pipe_amp(code3);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(code3);
    case 60:
    case 62:
      return this.readToken_lt_gt(code3);
    case 61:
    case 33:
      return this.readToken_eq_excl(code3);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(types$1.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + codePointToString(code3) + "'");
};
pp.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str);
};
pp.readRegexp = function() {
  var escaped, inClass, start2 = this.pos;
  for (; ; ) {
    if (this.pos >= this.input.length) {
      this.raise(start2, "Unterminated regular expression");
    }
    var ch = this.input.charAt(this.pos);
    if (lineBreak.test(ch)) {
      this.raise(start2, "Unterminated regular expression");
    }
    if (!escaped) {
      if (ch === "[") {
        inClass = true;
      } else if (ch === "]" && inClass) {
        inClass = false;
      } else if (ch === "/" && !inClass) {
        break;
      }
      escaped = ch === "\\";
    } else {
      escaped = false;
    }
    ++this.pos;
  }
  var pattern = this.input.slice(start2, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) {
    this.unexpected(flagsStart);
  }
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start2, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);
  var value2 = null;
  try {
    value2 = new RegExp(pattern, flags);
  } catch (e) {
  }
  return this.finishToken(types$1.regexp, { pattern, flags, value: value2 });
};
pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
  var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0;
  var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
  var start2 = this.pos, total = 0, lastCode = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
    var code3 = this.input.charCodeAt(this.pos), val = void 0;
    if (allowSeparators && code3 === 95) {
      if (isLegacyOctalNumericLiteral) {
        this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
      }
      if (lastCode === 95) {
        this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
      }
      if (i === 0) {
        this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
      }
      lastCode = code3;
      continue;
    }
    if (code3 >= 97) {
      val = code3 - 97 + 10;
    } else if (code3 >= 65) {
      val = code3 - 65 + 10;
    } else if (code3 >= 48 && code3 <= 57) {
      val = code3 - 48;
    } else {
      val = Infinity;
    }
    if (val >= radix) {
      break;
    }
    lastCode = code3;
    total = total * radix + val;
  }
  if (allowSeparators && lastCode === 95) {
    this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
  }
  if (this.pos === start2 || len != null && this.pos - start2 !== len) {
    return null;
  }
  return total;
};
function stringToNumber(str, isLegacyOctalNumericLiteral) {
  if (isLegacyOctalNumericLiteral) {
    return parseInt(str, 8);
  }
  return parseFloat(str.replace(/_/g, ""));
}
function stringToBigInt(str) {
  if (typeof BigInt !== "function") {
    return null;
  }
  return BigInt(str.replace(/_/g, ""));
}
pp.readRadixNumber = function(radix) {
  var start2 = this.pos;
  this.pos += 2;
  var val = this.readInt(radix);
  if (val == null) {
    this.raise(this.start + 2, "Expected number in radix " + radix);
  }
  if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
    val = stringToBigInt(this.input.slice(start2, this.pos));
    ++this.pos;
  } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
    this.raise(this.pos, "Identifier directly after number");
  }
  return this.finishToken(types$1.num, val);
};
pp.readNumber = function(startsWithDot) {
  var start2 = this.pos;
  if (!startsWithDot && this.readInt(10, void 0, true) === null) {
    this.raise(start2, "Invalid number");
  }
  var octal = this.pos - start2 >= 2 && this.input.charCodeAt(start2) === 48;
  if (octal && this.strict) {
    this.raise(start2, "Invalid number");
  }
  var next = this.input.charCodeAt(this.pos);
  if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
    var val$1 = stringToBigInt(this.input.slice(start2, this.pos));
    ++this.pos;
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types$1.num, val$1);
  }
  if (octal && /[89]/.test(this.input.slice(start2, this.pos))) {
    octal = false;
  }
  if (next === 46 && !octal) {
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) {
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) {
      ++this.pos;
    }
    if (this.readInt(10) === null) {
      this.raise(start2, "Invalid number");
    }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) {
    this.raise(this.pos, "Identifier directly after number");
  }
  var val = stringToNumber(this.input.slice(start2, this.pos), octal);
  return this.finishToken(types$1.num, val);
};
pp.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code3;
  if (ch === 123) {
    if (this.options.ecmaVersion < 6) {
      this.unexpected();
    }
    var codePos = ++this.pos;
    code3 = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code3 > 1114111) {
      this.invalidStringToken(codePos, "Code point out of bounds");
    }
  } else {
    code3 = this.readHexChar(4);
  }
  return code3;
};
pp.readString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (; ; ) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated string constant");
    }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) {
      break;
    }
    if (ch === 92) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(false);
      chunkStart = this.pos;
    } else if (ch === 8232 || ch === 8233) {
      if (this.options.ecmaVersion < 10) {
        this.raise(this.start, "Unterminated string constant");
      }
      ++this.pos;
      if (this.options.locations) {
        this.curLine++;
        this.lineStart = this.pos;
      }
    } else {
      if (isNewLine(ch)) {
        this.raise(this.start, "Unterminated string constant");
      }
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types$1.string, out);
};
var INVALID_TEMPLATE_ESCAPE_ERROR = {};
pp.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err;
    }
  }
  this.inTemplateElement = false;
};
pp.invalidStringToken = function(position2, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR;
  } else {
    this.raise(position2, message);
  }
};
pp.readTmplToken = function() {
  var out = "", chunkStart = this.pos;
  for (; ; ) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated template");
    }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
      if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
        if (ch === 36) {
          this.pos += 2;
          return this.finishToken(types$1.dollarBraceL);
        } else {
          ++this.pos;
          return this.finishToken(types$1.backQuote);
        }
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(types$1.template, out);
    }
    if (ch === 92) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(true);
      chunkStart = this.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      ++this.pos;
      switch (ch) {
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
          }
        case 10:
          out += "\n";
          break;
        default:
          out += String.fromCharCode(ch);
          break;
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
};
pp.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++) {
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{") {
          break;
        }
      // fall through
      case "`":
        return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
      case "\r":
        if (this.input[this.pos + 1] === "\n") {
          ++this.pos;
        }
      // fall through
      case "\n":
      case "\u2028":
      case "\u2029":
        ++this.curLine;
        this.lineStart = this.pos + 1;
        break;
    }
  }
  this.raise(this.start, "Unterminated template");
};
pp.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
    case 110:
      return "\n";
    // 'n' -> '\n'
    case 114:
      return "\r";
    // 'r' -> '\r'
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    // 'x'
    case 117:
      return codePointToString(this.readCodePoint());
    // 'u'
    case 116:
      return "	";
    // 't' -> '\t'
    case 98:
      return "\b";
    // 'b' -> '\b'
    case 118:
      return "\v";
    // 'v' -> '\u000b'
    case 102:
      return "\f";
    // 'f' -> '\f'
    case 13:
      if (this.input.charCodeAt(this.pos) === 10) {
        ++this.pos;
      }
    // '\r\n'
    case 10:
      if (this.options.locations) {
        this.lineStart = this.pos;
        ++this.curLine;
      }
      return "";
    case 56:
    case 57:
      if (this.strict) {
        this.invalidStringToken(
          this.pos - 1,
          "Invalid escape sequence"
        );
      }
      if (inTemplate) {
        var codePos = this.pos - 1;
        this.invalidStringToken(
          codePos,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        this.pos += octalStr.length - 1;
        ch = this.input.charCodeAt(this.pos);
        if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
          this.invalidStringToken(
            this.pos - 1 - octalStr.length,
            inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"
          );
        }
        return String.fromCharCode(octal);
      }
      if (isNewLine(ch)) {
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }
        return "";
      }
      return String.fromCharCode(ch);
  }
};
pp.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) {
    this.invalidStringToken(codePos, "Bad character escape sequence");
  }
  return n;
};
pp.readWord1 = function() {
  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this.pos += ch <= 65535 ? 1 : 2;
    } else if (ch === 92) {
      this.containsEsc = true;
      word += this.input.slice(chunkStart, this.pos);
      var escStart = this.pos;
      if (this.input.charCodeAt(++this.pos) !== 117) {
        this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
      }
      ++this.pos;
      var esc = this.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
        this.invalidStringToken(escStart, "Invalid Unicode escape");
      }
      word += codePointToString(esc);
      chunkStart = this.pos;
    } else {
      break;
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos);
};
pp.readWord = function() {
  var word = this.readWord1();
  var type = types$1.name;
  if (this.keywords.test(word)) {
    type = keywords[word];
  }
  return this.finishToken(type, word);
};
var version = "8.16.0";
Parser.acorn = {
  Parser,
  version,
  defaultOptions,
  Position,
  SourceLocation,
  getLineInfo,
  Node,
  TokenType,
  tokTypes: types$1,
  keywordTypes: keywords,
  TokContext,
  tokContexts: types,
  isIdentifierChar,
  isIdentifierStart,
  Token,
  isNewLine,
  lineBreak,
  lineBreakG,
  nonASCIIwhitespace
};

// node_modules/micromark-extension-mdxjs/index.js
var import_acorn_jsx = __toESM(require_acorn_jsx(), 1);

// node_modules/estree-util-visit/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/estree-util-visit/lib/index.js
var own4 = {}.hasOwnProperty;
var CONTINUE = Symbol("continue");
var EXIT = Symbol("exit");
var SKIP = Symbol("skip");
function visit(tree, visitor) {
  let enter;
  let leave;
  if (typeof visitor === "function") {
    enter = visitor;
  } else if (visitor && typeof visitor === "object") {
    if (visitor.enter) enter = visitor.enter;
    if (visitor.leave) leave = visitor.leave;
  }
  build(tree, void 0, void 0, [])();
  function build(node2, key, index2, parents) {
    if (nodelike(node2)) {
      visit3.displayName = "node (" + color(node2.type) + ")";
    }
    return visit3;
    function visit3() {
      const result = enter ? toResult(enter(node2, key, index2, parents)) : [];
      if (result[0] === EXIT) {
        return result;
      }
      if (result[0] !== SKIP) {
        let cKey;
        for (cKey in node2) {
          if (own4.call(node2, cKey) && node2[cKey] && typeof node2[cKey] === "object" && // @ts-expect-error: custom esast extension.
          cKey !== "data" && // @ts-expect-error: custom esast extension.
          cKey !== "position") {
            const grandparents = parents.concat(node2);
            const value2 = node2[cKey];
            if (Array.isArray(value2)) {
              const nodes = (
                /** @type {Array<unknown>} */
                value2
              );
              let cIndex = 0;
              while (cIndex > -1 && cIndex < nodes.length) {
                const subvalue = nodes[cIndex];
                if (nodelike(subvalue)) {
                  const subresult = build(
                    subvalue,
                    cKey,
                    cIndex,
                    grandparents
                  )();
                  if (subresult[0] === EXIT) return subresult;
                  cIndex = typeof subresult[1] === "number" ? subresult[1] : cIndex + 1;
                } else {
                  cIndex++;
                }
              }
            } else if (nodelike(value2)) {
              const subresult = build(value2, cKey, void 0, grandparents)();
              if (subresult[0] === EXIT) return subresult;
            }
          }
        }
      }
      return leave ? toResult(leave(node2, key, index2, parents)) : result;
    }
  }
}
function toResult(value2) {
  if (Array.isArray(value2)) {
    return value2;
  }
  if (typeof value2 === "number") {
    return [CONTINUE, value2];
  }
  return [value2];
}
function nodelike(value2) {
  return Boolean(
    value2 && typeof value2 === "object" && "type" in value2 && typeof value2.type === "string" && value2.type.length > 0
  );
}

// node_modules/micromark-util-events-to-acorn/lib/index.js
function eventsToAcorn(events, options) {
  const prefix = options.prefix || "";
  const suffix = options.suffix || "";
  const acornOptions = Object.assign({}, options.acornOptions);
  const comments = [];
  const tokens = [];
  const onComment = acornOptions.onComment;
  const onToken = acornOptions.onToken;
  let swallow = false;
  let estree;
  let exception;
  const acornConfig = Object.assign({}, acornOptions, {
    onComment: comments,
    preserveParens: true
  });
  if (onToken) {
    acornConfig.onToken = tokens;
  }
  const collection = collect(events, options.tokenTypes);
  const source = collection.value;
  const value2 = prefix + source + suffix;
  const isEmptyExpression = options.expression && empty2(source);
  if (isEmptyExpression && !options.allowEmpty) {
    throw new VFileMessage("Unexpected empty expression", {
      place: parseOffsetToUnistPoint(0),
      ruleId: "unexpected-empty-expression",
      source: "micromark-extension-mdx-expression"
    });
  }
  try {
    estree = options.expression && !isEmptyExpression ? options.acorn.parseExpressionAt(value2, 0, acornConfig) : options.acorn.parse(value2, acornConfig);
  } catch (error_) {
    const error = (
      /** @type {AcornError} */
      error_
    );
    const point3 = parseOffsetToUnistPoint(error.pos);
    error.message = String(error.message).replace(/ \(\d+:\d+\)$/, "");
    error.pos = point3.offset;
    error.loc = {
      line: point3.line,
      column: point3.column - 1
    };
    exception = error;
    swallow = error.raisedAt >= prefix.length + source.length || // Broken comments are raised at their start, not their end.
    error.message === "Unterminated comment";
  }
  if (estree && options.expression && !isEmptyExpression) {
    if (empty2(value2.slice(estree.end, value2.length - suffix.length))) {
      estree = {
        type: "Program",
        start: 0,
        end: prefix.length + source.length,
        // @ts-expect-error: It’s good.
        body: [{
          type: "ExpressionStatement",
          expression: estree,
          start: 0,
          end: prefix.length + source.length
        }],
        sourceType: "module",
        comments: []
      };
    } else {
      const point3 = parseOffsetToUnistPoint(estree.end);
      const error = (
        /** @type {AcornError} */
        new Error("Unexpected content after expression")
      );
      error.pos = point3.offset;
      error.loc = {
        line: point3.line,
        column: point3.column - 1
      };
      exception = error;
      estree = void 0;
    }
  }
  if (estree) {
    estree.comments = comments;
    visit(estree, function(esnode, field, index2, parents) {
      let context = (
        /** @type {AcornNode | Array<AcornNode>} */
        parents[parents.length - 1]
      );
      let property = field;
      if (esnode.type === "ParenthesizedExpression" && context && property) {
        if (typeof index2 === "number") {
          context = context[property];
          property = index2;
        }
        context[property] = esnode.expression;
      }
      fixPosition(esnode);
    });
    if (Array.isArray(onComment)) {
      onComment.push(...comments);
    } else if (typeof onComment === "function") {
      for (const comment of comments) {
        onComment(comment.type === "Block", comment.value, comment.start, comment.end, comment.loc.start, comment.loc.end);
      }
    }
    for (const token of tokens) {
      if (token.end <= prefix.length || token.start - prefix.length >= source.length) {
        continue;
      }
      fixPosition(token);
      if (Array.isArray(onToken)) {
        onToken.push(token);
      } else {
        onToken(token);
      }
    }
  }
  return {
    estree,
    error: exception,
    swallow
  };
  function fixPosition(nodeOrToken) {
    const pointStart = parseOffsetToUnistPoint(nodeOrToken.start);
    const pointEnd = parseOffsetToUnistPoint(nodeOrToken.end);
    nodeOrToken.start = pointStart.offset;
    nodeOrToken.end = pointEnd.offset;
    nodeOrToken.loc = {
      start: {
        line: pointStart.line,
        column: pointStart.column - 1,
        // @ts-expect-error: not allowed by acorn types.
        offset: pointStart.offset
      },
      end: {
        line: pointEnd.line,
        column: pointEnd.column - 1,
        // @ts-expect-error: not allowed by acorn types.
        offset: pointEnd.offset
      }
    };
    nodeOrToken.range = [nodeOrToken.start, nodeOrToken.end];
  }
  function parseOffsetToUnistPoint(acornOffset) {
    let sourceOffset = acornOffset - prefix.length;
    if (sourceOffset < 0) {
      sourceOffset = 0;
    } else if (sourceOffset > source.length) {
      sourceOffset = source.length;
    }
    let point3 = relativeToPoint(collection.stops, sourceOffset);
    if (!point3) {
      point3 = {
        line: options.start.line,
        column: options.start.column,
        offset: options.start.offset
      };
    }
    return point3;
  }
}
function empty2(value2) {
  return /^\s*$/.test(value2.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, ""));
}
function collect(events, tokenTypes) {
  const result = {
    value: "",
    stops: []
  };
  let index2 = -1;
  while (++index2 < events.length) {
    const event = events[index2];
    if (event[0] === "enter") {
      const type = event[1].type;
      if (type === "lineEnding" || tokenTypes.includes(type)) {
        const chunks = event[2].sliceStream(event[1]);
        while (chunks.length > 0 && chunks[0] === -1) {
          chunks.shift();
        }
        const value2 = serializeChunks2(chunks);
        result.stops.push([result.value.length, event[1].start]);
        result.value += value2;
        result.stops.push([result.value.length, event[1].end]);
      }
    }
  }
  return result;
}
function relativeToPoint(stops, relative2) {
  let index2 = 0;
  while (index2 < stops.length && stops[index2][0] <= relative2) {
    index2 += 1;
  }
  if (index2 === 0) {
    return void 0;
  }
  const [stopRelative, stopAbsolute] = stops[index2 - 1];
  const rest = relative2 - stopRelative;
  return {
    line: stopAbsolute.line,
    column: stopAbsolute.column + rest,
    offset: stopAbsolute.offset + rest
  };
}
function serializeChunks2(chunks) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value2;
    if (typeof chunk === "string") {
      value2 = chunk;
    } else switch (chunk) {
      case -5: {
        value2 = "\r";
        break;
      }
      case -4: {
        value2 = "\n";
        break;
      }
      case -3: {
        value2 = "\r\n";
        break;
      }
      case -2: {
        value2 = "	";
        break;
      }
      /* c8 ignore next 6 */
      case -1: {
        if (atTab) continue;
        value2 = " ";
        break;
      }
      default: {
        value2 = String.fromCharCode(chunk);
      }
    }
    atTab = chunk === -2;
    result.push(value2);
  }
  return result.join("");
}

// node_modules/unist-util-position-from-estree/lib/index.js
function positionFromEstree(node2) {
  const nodeLike = node2 || {};
  const loc = nodeLike.loc || {};
  const range = nodeLike.range || [void 0, void 0];
  const start2 = pointOrUndefined(loc.start, range[0] || nodeLike.start);
  const end = pointOrUndefined(loc.end, range[1] || nodeLike.end);
  if (start2 && end) {
    return { start: start2, end };
  }
}
function pointOrUndefined(estreePoint, estreeOffset) {
  if (estreePoint && typeof estreePoint === "object") {
    const line = "line" in estreePoint ? numberOrUndefined(estreePoint.line) : void 0;
    const column = "column" in estreePoint ? numberOrUndefined(estreePoint.column) : void 0;
    if (line && column !== void 0) {
      return {
        line,
        column: column + 1,
        offset: numberOrUndefined(estreeOffset)
      };
    }
  }
}
function numberOrUndefined(value2) {
  return typeof value2 === "number" && value2 > -1 ? value2 : void 0;
}

// node_modules/micromark-factory-mdx-expression/index.js
var indentSize = 2;
var trouble = "https://github.com/micromark/micromark-extension-mdx-expression/tree/main/packages/micromark-extension-mdx-expression";
var unexpectedEndOfFileHash = "#unexpected-end-of-file-in-expression-expected-a-corresponding-closing-brace-for-";
var unexpectedLazyHash = "#unexpected-lazy-line-in-expression-in-container-expected-line-to-be-prefixed";
var nonSpreadHash = "#unexpected-type-in-code-expected-an-object-spread-spread";
var spreadExtraHash = "#unexpected-extra-content-in-spread-only-a-single-spread-is-supported";
var acornHash = "#could-not-parse-expression-with-acorn";
function factoryMdxExpression(effects, ok3, type, markerType, chunkType, acorn, acornOptions, addResult, spread, allowEmpty, allowLazy) {
  const self2 = this;
  const eventStart = this.events.length + 3;
  let size = 0;
  let pointStart;
  let lastCrash;
  return start2;
  function start2(code3) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code3);
    effects.exit(markerType);
    pointStart = self2.now();
    return before;
  }
  function before(code3) {
    if (code3 === null) {
      if (lastCrash) throw lastCrash;
      const error = new VFileMessage("Unexpected end of file in expression, expected a corresponding closing brace for `{`", {
        place: self2.now(),
        ruleId: "unexpected-eof",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + unexpectedEndOfFileHash;
      throw error;
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return eolAfter;
    }
    if (code3 === 125 && size === 0) {
      const next = acorn ? mdxExpressionParse.call(self2, acorn, acornOptions, chunkType, eventStart, pointStart, allowEmpty || false, spread || false) : {
        type: "ok",
        estree: void 0
      };
      if (next.type === "ok") {
        effects.enter(markerType);
        effects.consume(code3);
        effects.exit(markerType);
        const token = effects.exit(type);
        if (addResult && next.estree) {
          Object.assign(token, {
            estree: next.estree
          });
        }
        return ok3;
      }
      lastCrash = next.message;
      effects.enter(chunkType);
      effects.consume(code3);
      return inside;
    }
    effects.enter(chunkType);
    return inside(code3);
  }
  function inside(code3) {
    if (code3 === 125 && size === 0 || code3 === null || markdownLineEnding(code3)) {
      effects.exit(chunkType);
      return before(code3);
    }
    if (code3 === 123 && !acorn) {
      size += 1;
    } else if (code3 === 125) {
      size -= 1;
    }
    effects.consume(code3);
    return inside;
  }
  function eolAfter(code3) {
    const now = self2.now();
    if (now.line !== pointStart.line && !allowLazy && self2.parser.lazy[now.line]) {
      const error = new VFileMessage("Unexpected lazy line in expression in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", {
        place: self2.now(),
        ruleId: "unexpected-lazy",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + unexpectedLazyHash;
      throw error;
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, before, "linePrefix", indentSize + 1)(code3);
    }
    return before(code3);
  }
}
function mdxExpressionParse(acorn, acornOptions, chunkType, eventStart, pointStart, allowEmpty, spread) {
  const result = eventsToAcorn(this.events.slice(eventStart), {
    acorn,
    tokenTypes: [chunkType],
    acornOptions,
    start: pointStart,
    expression: true,
    allowEmpty,
    prefix: spread ? "({" : "",
    suffix: spread ? "})" : ""
  });
  const estree = result.estree;
  if (spread && estree) {
    const head = estree.body[0];
    if (head.type !== "ExpressionStatement" || head.expression.type !== "ObjectExpression") {
      const place = positionFromEstree(head);
      const error = new VFileMessage("Unexpected `" + head.type + "` in code: expected an object spread (`{...spread}`)", {
        place: place.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + nonSpreadHash;
      throw error;
    }
    if (head.expression.properties[1]) {
      const place = positionFromEstree(head.expression.properties[1]);
      const error = new VFileMessage("Unexpected extra content in spread: only a single spread is supported", {
        place: place.start,
        ruleId: "spread-extra",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + spreadExtraHash;
      throw error;
    }
    if (head.expression.properties[0] && head.expression.properties[0].type !== "SpreadElement") {
      const place = positionFromEstree(head.expression.properties[0]);
      const error = new VFileMessage("Unexpected `" + head.expression.properties[0].type + "` in code: only spread elements are supported", {
        place: place.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + nonSpreadHash;
      throw error;
    }
  }
  if (result.error) {
    const error = new VFileMessage("Could not parse expression with acorn", {
      cause: result.error,
      place: {
        line: result.error.loc.line,
        column: result.error.loc.column + 1,
        offset: result.error.pos
      },
      ruleId: "acorn",
      source: "micromark-extension-mdx-expression"
    });
    error.url = trouble + acornHash;
    return {
      type: "nok",
      message: error
    };
  }
  return {
    type: "ok",
    estree
  };
}

// node_modules/micromark-extension-mdx-expression/lib/syntax.js
function mdxExpression(options) {
  const options_ = options || {};
  const addResult = options_.addResult;
  const acorn = options_.acorn;
  const spread = options_.spread;
  let allowEmpty = options_.allowEmpty;
  let acornOptions;
  if (allowEmpty === null || allowEmpty === void 0) {
    allowEmpty = true;
  }
  if (acorn) {
    if (!acorn.parseExpressionAt) {
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    }
    acornOptions = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, options_.acornOptions);
  } else if (options_.acornOptions || options_.addResult) {
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  }
  return {
    flow: {
      [123]: {
        name: "mdxFlowExpression",
        tokenize: tokenizeFlowExpression,
        concrete: true
      }
    },
    text: {
      [123]: {
        name: "mdxTextExpression",
        tokenize: tokenizeTextExpression
      }
    }
  };
  function tokenizeFlowExpression(effects, ok3, nok) {
    const self2 = this;
    return start2;
    function start2(code3) {
      return before(code3);
    }
    function before(code3) {
      return factoryMdxExpression.call(self2, effects, after, "mdxFlowExpression", "mdxFlowExpressionMarker", "mdxFlowExpressionChunk", acorn, acornOptions, addResult, spread, allowEmpty)(code3);
    }
    function after(code3) {
      return markdownSpace(code3) ? factorySpace(effects, end, "whitespace")(code3) : end(code3);
    }
    function end(code3) {
      const lessThanValue = self2.parser.constructs.flow[60];
      const constructs2 = Array.isArray(lessThanValue) ? lessThanValue : (
        /* c8 ignore next 3 -- always a list when normalized. */
        lessThanValue ? [lessThanValue] : []
      );
      const jsxTag = constructs2.find(function(d) {
        return d.name === "mdxJsxFlowTag";
      });
      if (code3 === 60 && jsxTag) {
        return effects.attempt(jsxTag, end, nok)(code3);
      }
      return code3 === null || markdownLineEnding(code3) ? ok3(code3) : nok(code3);
    }
  }
  function tokenizeTextExpression(effects, ok3) {
    const self2 = this;
    return start2;
    function start2(code3) {
      return factoryMdxExpression.call(self2, effects, ok3, "mdxTextExpression", "mdxTextExpressionMarker", "mdxTextExpressionChunk", acorn, acornOptions, addResult, spread, allowEmpty, true)(code3);
    }
  }
}

// node_modules/estree-util-is-identifier-name/lib/index.js
var startRe = /[$_\p{ID_Start}]/u;
var contRe = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u;
var contReJsx = /[-$_\u{200C}\u{200D}\p{ID_Continue}]/u;
var emptyOptions2 = {};
function start(code3) {
  return code3 ? startRe.test(String.fromCodePoint(code3)) : false;
}
function cont(code3, options) {
  const settings = options || emptyOptions2;
  const re = settings.jsx ? contReJsx : contRe;
  return code3 ? re.test(String.fromCodePoint(code3)) : false;
}

// node_modules/micromark-extension-mdx-jsx/lib/factory-tag.js
var trouble2 = "https://github.com/micromark/micromark-extension-mdx-jsx";
function factoryTag(effects, ok3, nok, acorn, acornOptions, addResult, allowLazy, tagType, tagMarkerType, tagClosingMarkerType, tagSelfClosingMarker, tagNameType, tagNamePrimaryType, tagNameMemberMarkerType, tagNameMemberType, tagNamePrefixMarkerType, tagNameLocalType, tagExpressionAttributeType, tagExpressionAttributeMarkerType, tagExpressionAttributeValueType, tagAttributeType, tagAttributeNameType, tagAttributeNamePrimaryType, tagAttributeNamePrefixMarkerType, tagAttributeNameLocalType, tagAttributeInitializerMarkerType, tagAttributeValueLiteralType, tagAttributeValueLiteralMarkerType, tagAttributeValueLiteralValueType, tagAttributeValueExpressionType, tagAttributeValueExpressionMarkerType, tagAttributeValueExpressionValueType) {
  const self2 = this;
  let returnState;
  let marker;
  return start2;
  function start2(code3) {
    effects.enter(tagType);
    effects.enter(tagMarkerType);
    effects.consume(code3);
    effects.exit(tagMarkerType);
    return startAfter;
  }
  function startAfter(code3) {
    if (markdownLineEndingOrSpace(code3)) {
      return nok(code3);
    }
    returnState = nameBefore;
    return esWhitespaceStart(code3);
  }
  function nameBefore(code3) {
    if (code3 === 47) {
      effects.enter(tagClosingMarkerType);
      effects.consume(code3);
      effects.exit(tagClosingMarkerType);
      returnState = closingTagNameBefore;
      return esWhitespaceStart;
    }
    if (code3 === 62) {
      return tagEnd(code3);
    }
    if (code3 !== null && code3 >= 0 && start(code3)) {
      effects.enter(tagNameType);
      effects.enter(tagNamePrimaryType);
      effects.consume(code3);
      return primaryName;
    }
    crash(code3, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (code3 === 33 ? " (note: to create a comment in MDX, use `{/* text */}`)" : ""));
  }
  function closingTagNameBefore(code3) {
    if (code3 === 62) {
      return tagEnd(code3);
    }
    if (code3 !== null && code3 >= 0 && start(code3)) {
      effects.enter(tagNameType);
      effects.enter(tagNamePrimaryType);
      effects.consume(code3);
      return primaryName;
    }
    crash(code3, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (code3 === 42 || code3 === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function primaryName(code3) {
    if (code3 !== null && code3 >= 0 && cont(code3, {
      jsx: true
    })) {
      effects.consume(code3);
      return primaryName;
    }
    if (code3 === 46 || code3 === 47 || code3 === 58 || code3 === 62 || code3 === 123 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      effects.exit(tagNamePrimaryType);
      returnState = primaryNameAfter;
      return esWhitespaceStart(code3);
    }
    crash(code3, "in name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (code3 === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function primaryNameAfter(code3) {
    if (code3 === 46) {
      effects.enter(tagNameMemberMarkerType);
      effects.consume(code3);
      effects.exit(tagNameMemberMarkerType);
      returnState = memberNameBefore;
      return esWhitespaceStart;
    }
    if (code3 === 58) {
      effects.enter(tagNamePrefixMarkerType);
      effects.consume(code3);
      effects.exit(tagNamePrefixMarkerType);
      returnState = localNameBefore;
      return esWhitespaceStart;
    }
    if (code3 === 47 || code3 === 62 || code3 === 123 || code3 !== null && code3 >= 0 && start(code3)) {
      effects.exit(tagNameType);
      return attributeBefore(code3);
    }
    crash(code3, "after name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function memberNameBefore(code3) {
    if (code3 !== null && code3 >= 0 && start(code3)) {
      effects.enter(tagNameMemberType);
      effects.consume(code3);
      return memberName;
    }
    crash(code3, "before member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function memberName(code3) {
    if (code3 !== null && code3 >= 0 && cont(code3, {
      jsx: true
    })) {
      effects.consume(code3);
      return memberName;
    }
    if (code3 === 46 || code3 === 47 || code3 === 62 || code3 === 123 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      effects.exit(tagNameMemberType);
      returnState = memberNameAfter;
      return esWhitespaceStart(code3);
    }
    crash(code3, "in member name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (code3 === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function memberNameAfter(code3) {
    if (code3 === 46) {
      effects.enter(tagNameMemberMarkerType);
      effects.consume(code3);
      effects.exit(tagNameMemberMarkerType);
      returnState = memberNameBefore;
      return esWhitespaceStart;
    }
    if (code3 === 47 || code3 === 62 || code3 === 123 || code3 !== null && code3 >= 0 && start(code3)) {
      effects.exit(tagNameType);
      return attributeBefore(code3);
    }
    crash(code3, "after member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function localNameBefore(code3) {
    if (code3 !== null && code3 >= 0 && start(code3)) {
      effects.enter(tagNameLocalType);
      effects.consume(code3);
      return localName;
    }
    crash(code3, "before local name", "a character that can start a name, such as a letter, `$`, or `_`" + (code3 === 43 || code3 !== null && code3 > 46 && code3 < 58 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function localName(code3) {
    if (code3 !== null && code3 >= 0 && cont(code3, {
      jsx: true
    })) {
      effects.consume(code3);
      return localName;
    }
    if (code3 === 47 || code3 === 62 || code3 === 123 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      effects.exit(tagNameLocalType);
      returnState = localNameAfter;
      return esWhitespaceStart(code3);
    }
    crash(code3, "in local name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function localNameAfter(code3) {
    if (code3 === 47 || code3 === 62 || code3 === 123 || code3 !== null && code3 >= 0 && start(code3)) {
      effects.exit(tagNameType);
      return attributeBefore(code3);
    }
    crash(code3, "after local name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function attributeBefore(code3) {
    if (code3 === 47) {
      effects.enter(tagSelfClosingMarker);
      effects.consume(code3);
      effects.exit(tagSelfClosingMarker);
      returnState = selfClosing;
      return esWhitespaceStart;
    }
    if (code3 === 62) {
      return tagEnd(code3);
    }
    if (code3 === 123) {
      return factoryMdxExpression.call(self2, effects, attributeExpressionAfter, tagExpressionAttributeType, tagExpressionAttributeMarkerType, tagExpressionAttributeValueType, acorn, acornOptions, addResult, true, false, allowLazy)(code3);
    }
    if (code3 !== null && code3 >= 0 && start(code3)) {
      effects.enter(tagAttributeType);
      effects.enter(tagAttributeNameType);
      effects.enter(tagAttributeNamePrimaryType);
      effects.consume(code3);
      return attributePrimaryName;
    }
    crash(code3, "before attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function attributeExpressionAfter(code3) {
    returnState = attributeBefore;
    return esWhitespaceStart(code3);
  }
  function attributePrimaryName(code3) {
    if (code3 !== null && code3 >= 0 && cont(code3, {
      jsx: true
    })) {
      effects.consume(code3);
      return attributePrimaryName;
    }
    if (code3 === 47 || code3 === 58 || code3 === 61 || code3 === 62 || code3 === 123 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      effects.exit(tagAttributeNamePrimaryType);
      returnState = attributePrimaryNameAfter;
      return esWhitespaceStart(code3);
    }
    crash(code3, "in attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function attributePrimaryNameAfter(code3) {
    if (code3 === 58) {
      effects.enter(tagAttributeNamePrefixMarkerType);
      effects.consume(code3);
      effects.exit(tagAttributeNamePrefixMarkerType);
      returnState = attributeLocalNameBefore;
      return esWhitespaceStart;
    }
    if (code3 === 61) {
      effects.exit(tagAttributeNameType);
      effects.enter(tagAttributeInitializerMarkerType);
      effects.consume(code3);
      effects.exit(tagAttributeInitializerMarkerType);
      returnState = attributeValueBefore;
      return esWhitespaceStart;
    }
    if (code3 === 47 || code3 === 62 || code3 === 123 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || code3 !== null && code3 >= 0 && start(code3)) {
      effects.exit(tagAttributeNameType);
      effects.exit(tagAttributeType);
      returnState = attributeBefore;
      return esWhitespaceStart(code3);
    }
    crash(code3, "after attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeLocalNameBefore(code3) {
    if (code3 !== null && code3 >= 0 && start(code3)) {
      effects.enter(tagAttributeNameLocalType);
      effects.consume(code3);
      return attributeLocalName;
    }
    crash(code3, "before local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeLocalName(code3) {
    if (code3 !== null && code3 >= 0 && cont(code3, {
      jsx: true
    })) {
      effects.consume(code3);
      return attributeLocalName;
    }
    if (code3 === 47 || code3 === 61 || code3 === 62 || code3 === 123 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      effects.exit(tagAttributeNameLocalType);
      effects.exit(tagAttributeNameType);
      returnState = attributeLocalNameAfter;
      return esWhitespaceStart(code3);
    }
    crash(code3, "in local attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function attributeLocalNameAfter(code3) {
    if (code3 === 61) {
      effects.enter(tagAttributeInitializerMarkerType);
      effects.consume(code3);
      effects.exit(tagAttributeInitializerMarkerType);
      returnState = attributeValueBefore;
      return esWhitespaceStart;
    }
    if (code3 === 47 || code3 === 62 || code3 === 123 || code3 !== null && code3 >= 0 && start(code3)) {
      effects.exit(tagAttributeType);
      return attributeBefore(code3);
    }
    crash(code3, "after local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeValueBefore(code3) {
    if (code3 === 34 || code3 === 39) {
      effects.enter(tagAttributeValueLiteralType);
      effects.enter(tagAttributeValueLiteralMarkerType);
      effects.consume(code3);
      effects.exit(tagAttributeValueLiteralMarkerType);
      marker = code3;
      return attributeValueQuotedStart;
    }
    if (code3 === 123) {
      return factoryMdxExpression.call(self2, effects, attributeValueExpressionAfter, tagAttributeValueExpressionType, tagAttributeValueExpressionMarkerType, tagAttributeValueExpressionValueType, acorn, acornOptions, addResult, false, false, allowLazy)(code3);
    }
    crash(code3, "before attribute value", "a character that can start an attribute value, such as `\"`, `'`, or `{`" + (code3 === 60 ? " (note: to use an element or fragment as a prop value in MDX, use `{<element />}`)" : ""));
  }
  function attributeValueExpressionAfter(code3) {
    effects.exit(tagAttributeType);
    returnState = attributeBefore;
    return esWhitespaceStart(code3);
  }
  function attributeValueQuotedStart(code3) {
    if (code3 === null) {
      crash(code3, "in attribute value", "a corresponding closing quote `" + String.fromCodePoint(marker) + "`");
    }
    if (code3 === marker) {
      effects.enter(tagAttributeValueLiteralMarkerType);
      effects.consume(code3);
      effects.exit(tagAttributeValueLiteralMarkerType);
      effects.exit(tagAttributeValueLiteralType);
      effects.exit(tagAttributeType);
      marker = void 0;
      returnState = attributeBefore;
      return esWhitespaceStart;
    }
    if (markdownLineEnding(code3)) {
      returnState = attributeValueQuotedStart;
      return esWhitespaceStart(code3);
    }
    effects.enter(tagAttributeValueLiteralValueType);
    return attributeValueQuoted(code3);
  }
  function attributeValueQuoted(code3) {
    if (code3 === null || code3 === marker || markdownLineEnding(code3)) {
      effects.exit(tagAttributeValueLiteralValueType);
      return attributeValueQuotedStart(code3);
    }
    effects.consume(code3);
    return attributeValueQuoted;
  }
  function selfClosing(code3) {
    if (code3 === 62) {
      return tagEnd(code3);
    }
    crash(code3, "after self-closing slash", "`>` to end the tag" + (code3 === 42 || code3 === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function tagEnd(code3) {
    effects.enter(tagMarkerType);
    effects.consume(code3);
    effects.exit(tagMarkerType);
    effects.exit(tagType);
    return ok3;
  }
  function esWhitespaceStart(code3) {
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return esWhitespaceEolAfter;
    }
    if (markdownSpace(code3) || unicodeWhitespace(code3)) {
      effects.enter("esWhitespace");
      return esWhitespaceInside(code3);
    }
    return returnState(code3);
  }
  function esWhitespaceInside(code3) {
    if (markdownLineEnding(code3)) {
      effects.exit("esWhitespace");
      return esWhitespaceStart(code3);
    }
    if (markdownSpace(code3) || unicodeWhitespace(code3)) {
      effects.consume(code3);
      return esWhitespaceInside;
    }
    effects.exit("esWhitespace");
    return returnState(code3);
  }
  function esWhitespaceEolAfter(code3) {
    if (!allowLazy && self2.parser.lazy[self2.now().line]) {
      const error = new VFileMessage("Unexpected lazy line in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", self2.now(), "micromark-extension-mdx-jsx:unexpected-lazy");
      error.url = trouble2 + "#unexpected-lazy-line-in-container-expected-line-to-be";
      throw error;
    }
    return esWhitespaceStart(code3);
  }
  function crash(code3, at2, expect) {
    const error = new VFileMessage("Unexpected " + (code3 === null ? "end of file" : "character `" + (code3 === 96 ? "` ` `" : String.fromCodePoint(code3)) + "` (" + serializeCharCode(code3) + ")") + " " + at2 + ", expected " + expect, self2.now(), "micromark-extension-mdx-jsx:unexpected-" + (code3 === null ? "eof" : "character"));
    error.url = trouble2 + (code3 === null ? "#unexpected-end-of-file-at-expected-expect" : "#unexpected-character-at-expected-expect");
    throw error;
  }
}
function serializeCharCode(code3) {
  return "U+" + code3.toString(16).toUpperCase().padStart(4, "0");
}

// node_modules/micromark-extension-mdx-jsx/lib/jsx-text.js
function jsxText(acorn, options) {
  return {
    name: "mdxJsxTextTag",
    tokenize: tokenizeJsxText
  };
  function tokenizeJsxText(effects, ok3, nok) {
    return factoryTag.call(this, effects, ok3, nok, acorn, options.acornOptions, options.addResult, true, "mdxJsxTextTag", "mdxJsxTextTagMarker", "mdxJsxTextTagClosingMarker", "mdxJsxTextTagSelfClosingMarker", "mdxJsxTextTagName", "mdxJsxTextTagNamePrimary", "mdxJsxTextTagNameMemberMarker", "mdxJsxTextTagNameMember", "mdxJsxTextTagNamePrefixMarker", "mdxJsxTextTagNameLocal", "mdxJsxTextTagExpressionAttribute", "mdxJsxTextTagExpressionAttributeMarker", "mdxJsxTextTagExpressionAttributeValue", "mdxJsxTextTagAttribute", "mdxJsxTextTagAttributeName", "mdxJsxTextTagAttributeNamePrimary", "mdxJsxTextTagAttributeNamePrefixMarker", "mdxJsxTextTagAttributeNameLocal", "mdxJsxTextTagAttributeInitializerMarker", "mdxJsxTextTagAttributeValueLiteral", "mdxJsxTextTagAttributeValueLiteralMarker", "mdxJsxTextTagAttributeValueLiteralValue", "mdxJsxTextTagAttributeValueExpression", "mdxJsxTextTagAttributeValueExpressionMarker", "mdxJsxTextTagAttributeValueExpressionValue");
  }
}

// node_modules/micromark-extension-mdx-jsx/lib/jsx-flow.js
function jsxFlow(acorn, options) {
  return {
    concrete: true,
    name: "mdxJsxFlowTag",
    tokenize: tokenizeJsxFlow
  };
  function tokenizeJsxFlow(effects, ok3, nok) {
    const self2 = this;
    return start2;
    function start2(code3) {
      return before(code3);
    }
    function before(code3) {
      return factoryTag.call(self2, effects, after, nok, acorn, options.acornOptions, options.addResult, false, "mdxJsxFlowTag", "mdxJsxFlowTagMarker", "mdxJsxFlowTagClosingMarker", "mdxJsxFlowTagSelfClosingMarker", "mdxJsxFlowTagName", "mdxJsxFlowTagNamePrimary", "mdxJsxFlowTagNameMemberMarker", "mdxJsxFlowTagNameMember", "mdxJsxFlowTagNamePrefixMarker", "mdxJsxFlowTagNameLocal", "mdxJsxFlowTagExpressionAttribute", "mdxJsxFlowTagExpressionAttributeMarker", "mdxJsxFlowTagExpressionAttributeValue", "mdxJsxFlowTagAttribute", "mdxJsxFlowTagAttributeName", "mdxJsxFlowTagAttributeNamePrimary", "mdxJsxFlowTagAttributeNamePrefixMarker", "mdxJsxFlowTagAttributeNameLocal", "mdxJsxFlowTagAttributeInitializerMarker", "mdxJsxFlowTagAttributeValueLiteral", "mdxJsxFlowTagAttributeValueLiteralMarker", "mdxJsxFlowTagAttributeValueLiteralValue", "mdxJsxFlowTagAttributeValueExpression", "mdxJsxFlowTagAttributeValueExpressionMarker", "mdxJsxFlowTagAttributeValueExpressionValue")(code3);
    }
    function after(code3) {
      return markdownSpace(code3) ? factorySpace(effects, end, "whitespace")(code3) : end(code3);
    }
    function end(code3) {
      const leftBraceValue = self2.parser.constructs.flow[123];
      const constructs2 = Array.isArray(leftBraceValue) ? leftBraceValue : leftBraceValue ? [leftBraceValue] : [];
      let expression;
      for (const construct of constructs2) {
        if (construct.name === "mdxFlowExpression") {
          expression = construct;
          break;
        }
      }
      return code3 === 60 ? (
        // We can’t just say: fine. Lines of blocks have to be parsed until an eol/eof.
        start2(code3)
      ) : code3 === 123 && expression ? effects.attempt(expression, end, nok)(code3) : code3 === null || markdownLineEnding(code3) ? ok3(code3) : nok(code3);
    }
  }
}

// node_modules/micromark-extension-mdx-jsx/lib/syntax.js
function mdxJsx(options) {
  const settings = options || {};
  const acorn = settings.acorn;
  let acornOptions;
  if (acorn) {
    if (!acorn.parse || !acorn.parseExpressionAt) {
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    }
    acornOptions = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, settings.acornOptions, {
      locations: true
    });
  } else if (settings.acornOptions || settings.addResult) {
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  }
  return {
    flow: {
      [60]: jsxFlow(acorn || void 0, {
        acornOptions,
        addResult: settings.addResult || void 0
      })
    },
    text: {
      [60]: jsxText(acorn || void 0, {
        acornOptions,
        addResult: settings.addResult || void 0
      })
    }
  };
}

// node_modules/micromark-extension-mdx-md/index.js
function mdxMd() {
  return {
    disable: { null: ["autolink", "codeIndented", "htmlFlow", "htmlText"] }
  };
}

// node_modules/micromark-extension-mdxjs-esm/lib/syntax.js
var blankLineBefore2 = {
  tokenize: tokenizeNextBlank,
  partial: true
};
var trouble3 = "https://github.com/micromark/micromark-extension-mdxjs-esm";
var allowedAcornTypes = /* @__PURE__ */ new Set(["ExportAllDeclaration", "ExportDefaultDeclaration", "ExportNamedDeclaration", "ImportDeclaration"]);
function mdxjsEsm(options) {
  const exportImportConstruct = {
    tokenize: tokenizeExportImport,
    concrete: true
  };
  if (!options || !options.acorn || !options.acorn.parse) {
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  }
  const acorn = options.acorn;
  const acornOptions = Object.assign({
    ecmaVersion: 2024,
    sourceType: "module"
  }, options.acornOptions, {
    locations: true
  });
  return {
    flow: {
      [101]: exportImportConstruct,
      [105]: exportImportConstruct
    }
  };
  function tokenizeExportImport(effects, ok3, nok) {
    const self2 = this;
    const definedModuleSpecifiers = self2.parser.definedModuleSpecifiers || (self2.parser.definedModuleSpecifiers = []);
    const eventStart = this.events.length + 1;
    let buffer = "";
    return self2.interrupt ? nok : start2;
    function start2(code3) {
      if (self2.now().column > 1) return nok(code3);
      effects.enter("mdxjsEsm");
      effects.enter("mdxjsEsmData");
      effects.consume(code3);
      buffer += String.fromCharCode(code3);
      return word;
    }
    function word(code3) {
      if (asciiAlpha(code3)) {
        effects.consume(code3);
        buffer += String.fromCharCode(code3);
        return word;
      }
      if ((buffer === "import" || buffer === "export") && code3 === 32) {
        effects.consume(code3);
        return inside;
      }
      return nok(code3);
    }
    function inside(code3) {
      if (code3 === null || markdownLineEnding(code3)) {
        effects.exit("mdxjsEsmData");
        return lineStart(code3);
      }
      effects.consume(code3);
      return inside;
    }
    function lineStart(code3) {
      if (code3 === null) {
        return atEnd(code3);
      }
      if (markdownLineEnding(code3)) {
        return effects.check(blankLineBefore2, atEnd, continuationStart)(code3);
      }
      effects.enter("mdxjsEsmData");
      return inside(code3);
    }
    function continuationStart(code3) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return lineStart;
    }
    function atEnd(code3) {
      const result = eventsToAcorn(self2.events.slice(eventStart), {
        acorn,
        acornOptions,
        tokenTypes: ["mdxjsEsmData"],
        prefix: definedModuleSpecifiers.length > 0 ? "var " + definedModuleSpecifiers.join(",") + "\n" : ""
      });
      if (result.error) {
        if (code3 !== null && result.swallow) {
          return continuationStart(code3);
        }
        const error = new VFileMessage("Could not parse import/exports with acorn", {
          cause: result.error,
          place: {
            line: result.error.loc.line,
            column: result.error.loc.column + 1,
            offset: result.error.pos
          },
          ruleId: "acorn",
          source: "micromark-extension-mdxjs-esm"
        });
        error.url = trouble3 + "#could-not-parse-importexports-with-acorn";
        throw error;
      }
      if (definedModuleSpecifiers.length > 0) {
        const declaration = result.estree.body.shift();
      }
      let index2 = -1;
      while (++index2 < result.estree.body.length) {
        const node2 = result.estree.body[index2];
        if (!allowedAcornTypes.has(node2.type)) {
          const error = new VFileMessage("Unexpected `" + node2.type + "` in code: only import/exports are supported", {
            place: positionFromEstree(node2),
            ruleId: "non-esm",
            source: "micromark-extension-mdxjs-esm"
          });
          error.url = trouble3 + "#unexpected-type-in-code-only-importexports-are-supported";
          throw error;
        }
        if (node2.type === "ImportDeclaration" && !self2.interrupt) {
          let index3 = -1;
          while (++index3 < node2.specifiers.length) {
            const specifier = node2.specifiers[index3];
            definedModuleSpecifiers.push(specifier.local.name);
          }
        }
      }
      Object.assign(effects.exit("mdxjsEsm"), options.addResult ? {
        estree: result.estree
      } : void 0);
      return ok3(code3);
    }
  }
}
function tokenizeNextBlank(effects, ok3, nok) {
  return start2;
  function start2(code3) {
    effects.enter("lineEndingBlank");
    effects.consume(code3);
    effects.exit("lineEndingBlank");
    return effects.attempt(blankLine, ok3, nok);
  }
}

// node_modules/micromark-extension-mdxjs/index.js
function mdxjs(options) {
  const settings = Object.assign(
    {
      acorn: Parser.extend((0, import_acorn_jsx.default)()),
      acornOptions: { ecmaVersion: 2024, sourceType: "module" },
      addResult: true
    },
    options
  );
  return combineExtensions([
    mdxjsEsm(settings),
    mdxExpression(settings),
    mdxJsx(settings),
    mdxMd()
  ]);
}

// node_modules/remark-mdx/lib/index.js
var emptyOptions3 = {};
function remarkMdx(options) {
  const self2 = this;
  const settings = options || emptyOptions3;
  const data2 = self2.data();
  const micromarkExtensions = data2.micromarkExtensions || (data2.micromarkExtensions = []);
  const fromMarkdownExtensions = data2.fromMarkdownExtensions || (data2.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data2.toMarkdownExtensions || (data2.toMarkdownExtensions = []);
  micromarkExtensions.push(mdxjs(settings));
  fromMarkdownExtensions.push(mdxFromMarkdown());
  toMarkdownExtensions.push(mdxToMarkdown(settings));
}

// node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string3) {
  if (typeof string3 !== "string") {
    throw new TypeError("Expected a string");
  }
  return string3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// node_modules/unist-util-is/lib/index.js
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(test) {
    if (test === null || test === void 0) {
      return ok2;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        propertiesFactory(
          /** @type {Props} */
          test
        )
      );
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  })
);
function anyFactory(tests) {
  const checks = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks.length) {
      if (checks[index3].apply(this, parameters)) return true;
    }
    return false;
  }
}
function propertiesFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all2);
  function all2(node2) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node2
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node2) {
    return node2 && node2.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value2, index2, parent) {
    return Boolean(
      looksLikeANode(value2) && testFunction.call(
        this,
        value2,
        typeof index2 === "number" ? index2 : void 0,
        parent || void 0
      )
    );
  }
}
function ok2() {
  return true;
}
function looksLikeANode(value2) {
  return value2 !== null && typeof value2 === "object" && "type" in value2;
}

// node_modules/unist-util-visit-parents/lib/color.node.js
function color2(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/unist-util-visit-parents/lib/index.js
var empty3 = [];
var CONTINUE2 = true;
var EXIT2 = false;
var SKIP2 = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node2, index2, parents) {
    const value2 = (
      /** @type {Record<string, unknown>} */
      node2 && typeof node2 === "object" ? node2 : {}
    );
    if (typeof value2.type === "string") {
      const name2 = (
        // `hast`
        typeof value2.tagName === "string" ? value2.tagName : (
          // `xast`
          typeof value2.name === "string" ? value2.name : void 0
        )
      );
      Object.defineProperty(visit3, "name", {
        value: "node (" + color2(node2.type + (name2 ? "<" + name2 + ">" : "")) + ")"
      });
    }
    return visit3;
    function visit3() {
      let result = empty3;
      let subresult;
      let offset2;
      let grandparents;
      if (!test || is2(node2, index2, parents[parents.length - 1] || void 0)) {
        result = toResult2(visitor(node2, parents));
        if (result[0] === EXIT2) {
          return result;
        }
      }
      if ("children" in node2 && node2.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node2
        );
        if (nodeAsParent.children && result[0] !== SKIP2) {
          offset2 = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset2 > -1 && offset2 < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset2];
            subresult = factory(child, offset2, grandparents)();
            if (subresult[0] === EXIT2) {
              return subresult;
            }
            offset2 = typeof subresult[1] === "number" ? subresult[1] : offset2 + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult2(value2) {
  if (Array.isArray(value2)) {
    return value2;
  }
  if (typeof value2 === "number") {
    return [CONTINUE2, value2];
  }
  return value2 === null || value2 === void 0 ? empty3 : [value2];
}

// node_modules/mdast-util-find-and-replace/lib/index.js
function findAndReplace(tree, list3, options) {
  const settings = options || {};
  const ignored = convert(settings.ignore || []);
  const pairs = toPairs(list3);
  let pairIndex = -1;
  while (++pairIndex < pairs.length) {
    visitParents(tree, "text", visitor);
  }
  function visitor(node2, parents) {
    let index2 = -1;
    let grandparent;
    while (++index2 < parents.length) {
      const parent = parents[index2];
      const siblings = grandparent ? grandparent.children : void 0;
      if (ignored(
        parent,
        siblings ? siblings.indexOf(parent) : void 0,
        grandparent
      )) {
        return;
      }
      grandparent = parent;
    }
    if (grandparent) {
      return handler2(node2, parents);
    }
  }
  function handler2(node2, parents) {
    const parent = parents[parents.length - 1];
    const find = pairs[pairIndex][0];
    const replace2 = pairs[pairIndex][1];
    let start2 = 0;
    const siblings = parent.children;
    const index2 = siblings.indexOf(node2);
    let change = false;
    let nodes = [];
    find.lastIndex = 0;
    let match = find.exec(node2.value);
    while (match) {
      const position2 = match.index;
      const matchObject = {
        index: match.index,
        input: match.input,
        stack: [...parents, node2]
      };
      let value2 = replace2(...match, matchObject);
      if (typeof value2 === "string") {
        value2 = value2.length > 0 ? { type: "text", value: value2 } : void 0;
      }
      if (value2 === false) {
        find.lastIndex = position2 + 1;
      } else {
        if (start2 !== position2) {
          nodes.push({
            type: "text",
            value: node2.value.slice(start2, position2)
          });
        }
        if (Array.isArray(value2)) {
          nodes.push(...value2);
        } else if (value2) {
          nodes.push(value2);
        }
        start2 = position2 + match[0].length;
        change = true;
      }
      if (!find.global) {
        break;
      }
      match = find.exec(node2.value);
    }
    if (change) {
      if (start2 < node2.value.length) {
        nodes.push({ type: "text", value: node2.value.slice(start2) });
      }
      parent.children.splice(index2, 1, ...nodes);
    } else {
      nodes = [node2];
    }
    return index2 + nodes.length;
  }
}
function toPairs(tupleOrList) {
  const result = [];
  if (!Array.isArray(tupleOrList)) {
    throw new TypeError("Expected find and replace tuple or list of tuples");
  }
  const list3 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
  let index2 = -1;
  while (++index2 < list3.length) {
    const tuple = list3[index2];
    result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
  }
  return result;
}
function toExpression(find) {
  return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
}
function toFunction(replace2) {
  return typeof replace2 === "function" ? replace2 : function() {
    return replace2;
  };
}

// node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var inConstruct = "phrasing";
var notInConstruct = ["autolink", "link", "image", "label"];
function gfmAutolinkLiteralFromMarkdown() {
  return {
    transforms: [transformGfmAutolinkLiterals],
    enter: {
      literalAutolink: enterLiteralAutolink,
      literalAutolinkEmail: enterLiteralAutolinkValue,
      literalAutolinkHttp: enterLiteralAutolinkValue,
      literalAutolinkWww: enterLiteralAutolinkValue
    },
    exit: {
      literalAutolink: exitLiteralAutolink,
      literalAutolinkEmail: exitLiteralAutolinkEmail,
      literalAutolinkHttp: exitLiteralAutolinkHttp,
      literalAutolinkWww: exitLiteralAutolinkWww
    }
  };
}
function gfmAutolinkLiteralToMarkdown() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct,
        notInConstruct
      }
    ]
  };
}
function enterLiteralAutolink(token) {
  this.enter({ type: "link", title: null, url: "", children: [] }, token);
}
function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token);
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "link");
  node2.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
  this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
  findAndReplace(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function findUrl(_, protocol, domain2, path3, match) {
  let prefix = "";
  if (!previous2(match)) {
    return false;
  }
  if (/^w/i.test(protocol)) {
    domain2 = protocol + domain2;
    protocol = "";
    prefix = "http://";
  }
  if (!isCorrectDomain(domain2)) {
    return false;
  }
  const parts = splitUrl(domain2 + path3);
  if (!parts[0]) return false;
  const result = {
    type: "link",
    title: null,
    url: prefix + protocol + parts[0],
    children: [{ type: "text", value: protocol + parts[0] }]
  };
  if (parts[1]) {
    return [result, { type: "text", value: parts[1] }];
  }
  return result;
}
function findEmail(_, atext, label, match) {
  if (
    // Not an expected previous character.
    !previous2(match, true) || // Label ends in not allowed character.
    /[-\d_]$/.test(label)
  ) {
    return false;
  }
  return {
    type: "link",
    title: null,
    url: "mailto:" + atext + "@" + label,
    children: [{ type: "text", value: atext + "@" + label }]
  };
}
function isCorrectDomain(domain2) {
  const parts = domain2.split(".");
  if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
    return false;
  }
  return true;
}
function splitUrl(url) {
  const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
  if (!trailExec) {
    return [url, void 0];
  }
  url = url.slice(0, trailExec.index);
  let trail2 = trailExec[0];
  let closingParenIndex = trail2.indexOf(")");
  const openingParens = ccount(url, "(");
  let closingParens = ccount(url, ")");
  while (closingParenIndex !== -1 && openingParens > closingParens) {
    url += trail2.slice(0, closingParenIndex + 1);
    trail2 = trail2.slice(closingParenIndex + 1);
    closingParenIndex = trail2.indexOf(")");
    closingParens++;
  }
  return [url, trail2];
}
function previous2(match, email) {
  const code3 = match.input.charCodeAt(match.index - 1);
  return (match.index === 0 || unicodeWhitespace(code3) || unicodePunctuation(code3)) && // If it’s an email, the previous character should not be a slash.
  (!email || code3 !== 47);
}

// node_modules/mdast-util-gfm-footnote/lib/index.js
footnoteReference.peek = footnoteReferencePeek;
function enterFootnoteCallString() {
  this.buffer();
}
function enterFootnoteCall(token) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
}
function enterFootnoteDefinitionLabelString() {
  this.buffer();
}
function enterFootnoteDefinition(token) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    token
  );
}
function exitFootnoteCallString(token) {
  const label = this.resume();
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "footnoteReference");
  node2.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
  node2.label = label;
}
function exitFootnoteCall(token) {
  this.exit(token);
}
function exitFootnoteDefinitionLabelString(token) {
  const label = this.resume();
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "footnoteDefinition");
  node2.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
  node2.label = label;
}
function exitFootnoteDefinition(token) {
  this.exit(token);
}
function footnoteReferencePeek() {
  return "[";
}
function footnoteReference(node2, _, state, info) {
  const tracker = state.createTracker(info);
  let value2 = tracker.move("[^");
  const exit3 = state.enter("footnoteReference");
  const subexit = state.enter("reference");
  value2 += tracker.move(
    state.safe(state.associationId(node2), { after: "]", before: value2 })
  );
  subexit();
  exit3();
  value2 += tracker.move("]");
  return value2;
}
function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteCallString: enterFootnoteCallString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: enterFootnoteDefinition
    },
    exit: {
      gfmFootnoteCallString: exitFootnoteCallString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: exitFootnoteDefinition
    }
  };
}
function gfmFootnoteToMarkdown(options) {
  let firstLineBlank = false;
  if (options && options.firstLineBlank) {
    firstLineBlank = true;
  }
  return {
    handlers: { footnoteDefinition, footnoteReference },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function footnoteDefinition(node2, _, state, info) {
    const tracker = state.createTracker(info);
    let value2 = tracker.move("[^");
    const exit3 = state.enter("footnoteDefinition");
    const subexit = state.enter("label");
    value2 += tracker.move(
      state.safe(state.associationId(node2), { before: value2, after: "]" })
    );
    subexit();
    value2 += tracker.move("]:");
    if (node2.children && node2.children.length > 0) {
      tracker.shift(4);
      value2 += tracker.move(
        (firstLineBlank ? "\n" : " ") + state.indentLines(
          state.containerFlow(node2, tracker.current()),
          firstLineBlank ? mapAll : mapExceptFirst
        )
      );
    }
    exit3();
    return value2;
  }
}
function mapExceptFirst(line, index2, blank) {
  return index2 === 0 ? line : mapAll(line, index2, blank);
}
function mapAll(line, index2, blank) {
  return (blank ? "" : "    ") + line;
}

// node_modules/mdast-util-gfm-strikethrough/lib/index.js
var constructsWithoutStrikethrough = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: enterStrikethrough },
    exit: { strikethrough: exitStrikethrough }
  };
}
function gfmStrikethroughToMarkdown() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: constructsWithoutStrikethrough
      }
    ],
    handlers: { delete: handleDelete }
  };
}
function enterStrikethrough(token) {
  this.enter({ type: "delete", children: [] }, token);
}
function exitStrikethrough(token) {
  this.exit(token);
}
function handleDelete(node2, _, state, info) {
  const tracker = state.createTracker(info);
  const exit3 = state.enter("strikethrough");
  let value2 = tracker.move("~~");
  value2 += state.containerPhrasing(node2, {
    ...tracker.current(),
    before: value2,
    after: "~"
  });
  value2 += tracker.move("~~");
  exit3();
  return value2;
}
function peekDelete() {
  return "~";
}

// node_modules/markdown-table/index.js
function defaultStringLength(value2) {
  return value2.length;
}
function markdownTable(table, options) {
  const settings = options || {};
  const align = (settings.align || []).concat();
  const stringLength = settings.stringLength || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table.length) {
    const row2 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length;
    }
    while (++columnIndex2 < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex2]);
      if (settings.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row2.push(cell);
    }
    cellMatrix[rowIndex] = row2;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code3 = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code3;
    }
  }
  columnIndex = -1;
  const row = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code3 = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code3 === 99) {
      before = ":";
      after = ":";
    } else if (code3 === 108) {
      before = ":";
    } else if (code3 === 114) {
      after = ":";
    }
    let size = settings.alignDelimiters === false ? 1 : Math.max(
      1,
      longestCellByColumn[columnIndex] - before.length - after.length
    );
    const cell = before + "-".repeat(size) + after;
    if (settings.alignDelimiters !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row2 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row2[columnIndex] || "";
      let before = "";
      let after = "";
      if (settings.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code3 = alignments[columnIndex];
        if (code3 === 114) {
          before = " ".repeat(size);
        } else if (code3 === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if (settings.delimiterStart !== false && !columnIndex) {
        line.push("|");
      }
      if (settings.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) {
        line.push(" ");
      }
      if (settings.alignDelimiters !== false) {
        line.push(before);
      }
      line.push(cell);
      if (settings.alignDelimiters !== false) {
        line.push(after);
      }
      if (settings.padding !== false) {
        line.push(" ");
      }
      if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
        line.push("|");
      }
    }
    lines.push(
      settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
    );
  }
  return lines.join("\n");
}
function serialize(value2) {
  return value2 === null || value2 === void 0 ? "" : String(value2);
}
function toAlignment(value2) {
  const code3 = typeof value2 === "string" ? value2.codePointAt(0) : 0;
  return code3 === 67 || code3 === 99 ? 99 : code3 === 76 || code3 === 108 ? 108 : code3 === 82 || code3 === 114 ? 114 : 0;
}

// node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function blockquote(node2, _, state, info) {
  const exit3 = state.enter("blockquote");
  const tracker = state.createTracker(info);
  tracker.move("> ");
  tracker.shift(2);
  const value2 = state.indentLines(
    state.containerFlow(node2, tracker.current()),
    map
  );
  exit3();
  return value2;
}
function map(line, _, blank) {
  return ">" + (blank ? "" : " ") + line;
}

// node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function patternInScope(stack, pattern) {
  return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list3, none) {
  if (typeof list3 === "string") {
    list3 = [list3];
  }
  if (!list3 || list3.length === 0) {
    return none;
  }
  let index2 = -1;
  while (++index2 < list3.length) {
    if (stack.includes(list3[index2])) {
      return true;
    }
  }
  return false;
}

// node_modules/mdast-util-to-markdown/lib/handle/break.js
function hardBreak(_, _1, state, info) {
  let index2 = -1;
  while (++index2 < state.unsafe.length) {
    if (state.unsafe[index2].character === "\n" && patternInScope(state.stack, state.unsafe[index2])) {
      return /[ \t]/.test(info.before) ? "" : " ";
    }
  }
  return "\\\n";
}

// node_modules/longest-streak/index.js
function longestStreak(value2, substring) {
  const source = String(value2);
  let index2 = source.indexOf(substring);
  let expected = index2;
  let count = 0;
  let max = 0;
  if (typeof substring !== "string") {
    throw new TypeError("Expected substring");
  }
  while (index2 !== -1) {
    if (index2 === expected) {
      if (++count > max) {
        max = count;
      }
    } else {
      count = 1;
    }
    expected = index2 + substring.length;
    index2 = source.indexOf(substring, expected);
  }
  return max;
}

// node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function formatCodeAsIndented(node2, state) {
  return Boolean(
    state.options.fences === false && node2.value && // If there’s no info…
    !node2.lang && // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node2.value) && // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node2.value)
  );
}

// node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function checkFence(state) {
  const marker = state.options.fence || "`";
  if (marker !== "`" && marker !== "~") {
    throw new Error(
      "Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/code.js
function code(node2, _, state, info) {
  const marker = checkFence(state);
  const raw = node2.value || "";
  const suffix = marker === "`" ? "GraveAccent" : "Tilde";
  if (formatCodeAsIndented(node2, state)) {
    const exit4 = state.enter("codeIndented");
    const value3 = state.indentLines(raw, map2);
    exit4();
    return value3;
  }
  const tracker = state.createTracker(info);
  const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
  const exit3 = state.enter("codeFenced");
  let value2 = tracker.move(sequence);
  if (node2.lang) {
    const subexit = state.enter(`codeFencedLang${suffix}`);
    value2 += tracker.move(
      state.safe(node2.lang, {
        before: value2,
        after: " ",
        encode: ["`"],
        ...tracker.current()
      })
    );
    subexit();
  }
  if (node2.lang && node2.meta) {
    const subexit = state.enter(`codeFencedMeta${suffix}`);
    value2 += tracker.move(" ");
    value2 += tracker.move(
      state.safe(node2.meta, {
        before: value2,
        after: "\n",
        encode: ["`"],
        ...tracker.current()
      })
    );
    subexit();
  }
  value2 += tracker.move("\n");
  if (raw) {
    value2 += tracker.move(raw + "\n");
  }
  value2 += tracker.move(sequence);
  exit3();
  return value2;
}
function map2(line, _, blank) {
  return (blank ? "" : "    ") + line;
}

// node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function checkQuote(state) {
  const marker = state.options.quote || '"';
  if (marker !== '"' && marker !== "'") {
    throw new Error(
      "Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/definition.js
function definition2(node2, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const exit3 = state.enter("definition");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value2 = tracker.move("[");
  value2 += tracker.move(
    state.safe(state.associationId(node2), {
      before: value2,
      after: "]",
      ...tracker.current()
    })
  );
  value2 += tracker.move("]: ");
  subexit();
  if (
    // If there’s no url, or…
    !node2.url || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node2.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value2 += tracker.move("<");
    value2 += tracker.move(
      state.safe(node2.url, { before: value2, after: ">", ...tracker.current() })
    );
    value2 += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value2 += tracker.move(
      state.safe(node2.url, {
        before: value2,
        after: node2.title ? " " : "\n",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node2.title) {
    subexit = state.enter(`title${suffix}`);
    value2 += tracker.move(" " + quote);
    value2 += tracker.move(
      state.safe(node2.title, {
        before: value2,
        after: quote,
        ...tracker.current()
      })
    );
    value2 += tracker.move(quote);
    subexit();
  }
  exit3();
  return value2;
}

// node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function checkEmphasis(state) {
  const marker = state.options.emphasis || "*";
  if (marker !== "*" && marker !== "_") {
    throw new Error(
      "Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function encodeCharacterReference(code3) {
  return "&#x" + code3.toString(16).toUpperCase() + ";";
}

// node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function encodeInfo(outside, inside, marker) {
  const outsideKind = classifyCharacter(outside);
  const insideKind = classifyCharacter(inside);
  if (outsideKind === void 0) {
    return insideKind === void 0 ? (
      // Letter inside:
      // we have to encode *both* letters for `_` as it is looser.
      // it already forms for `*` (and GFMs `~`).
      marker === "_" ? { inside: true, outside: true } : { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode both (letter, whitespace).
      { inside: true, outside: true }
    ) : (
      // Punctuation inside: encode outer (letter)
      { inside: false, outside: true }
    );
  }
  if (outsideKind === 1) {
    return insideKind === void 0 ? (
      // Letter inside: already forms.
      { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode both (whitespace).
      { inside: true, outside: true }
    ) : (
      // Punctuation inside: already forms.
      { inside: false, outside: false }
    );
  }
  return insideKind === void 0 ? (
    // Letter inside: already forms.
    { inside: false, outside: false }
  ) : insideKind === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: true, outside: false }
  ) : (
    // Punctuation inside: already forms.
    { inside: false, outside: false }
  );
}

// node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
emphasis.peek = emphasisPeek;
function emphasis(node2, _, state, info) {
  const marker = checkEmphasis(state);
  const exit3 = state.enter("emphasis");
  const tracker = state.createTracker(info);
  const before = tracker.move(marker);
  let between = tracker.move(
    state.containerPhrasing(node2, {
      after: marker,
      before,
      ...tracker.current()
    })
  );
  const betweenHead = between.charCodeAt(0);
  const open = encodeInfo(
    info.before.charCodeAt(info.before.length - 1),
    betweenHead,
    marker
  );
  if (open.inside) {
    between = encodeCharacterReference(betweenHead) + between.slice(1);
  }
  const betweenTail = between.charCodeAt(between.length - 1);
  const close2 = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  if (close2.inside) {
    between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  }
  const after = tracker.move(marker);
  exit3();
  state.attentionEncodeSurroundingInfo = {
    after: close2.outside,
    before: open.outside
  };
  return before + between + after;
}
function emphasisPeek(_, _1, state) {
  return state.options.emphasis || "*";
}

// node_modules/unist-util-visit/lib/index.js
function visit2(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = void 0;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node2, parents) {
    const parent = parents[parents.length - 1];
    const index2 = parent ? parent.children.indexOf(node2) : void 0;
    return visitor(node2, index2, parent);
  }
}

// node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function formatHeadingAsSetext(node2, state) {
  let literalWithBreak = false;
  visit2(node2, function(node3) {
    if ("value" in node3 && /\r?\n|\r/.test(node3.value) || node3.type === "break") {
      literalWithBreak = true;
      return EXIT2;
    }
  });
  return Boolean(
    (!node2.depth || node2.depth < 3) && toString(node2) && (state.options.setext || literalWithBreak)
  );
}

// node_modules/mdast-util-to-markdown/lib/handle/heading.js
function heading(node2, _, state, info) {
  const rank = Math.max(Math.min(6, node2.depth || 1), 1);
  const tracker = state.createTracker(info);
  if (formatHeadingAsSetext(node2, state)) {
    const exit4 = state.enter("headingSetext");
    const subexit2 = state.enter("phrasing");
    const value3 = state.containerPhrasing(node2, {
      ...tracker.current(),
      before: "\n",
      after: "\n"
    });
    subexit2();
    exit4();
    return value3 + "\n" + (rank === 1 ? "=" : "-").repeat(
      // The whole size…
      value3.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(value3.lastIndexOf("\r"), value3.lastIndexOf("\n")) + 1)
    );
  }
  const sequence = "#".repeat(rank);
  const exit3 = state.enter("headingAtx");
  const subexit = state.enter("phrasing");
  tracker.move(sequence + " ");
  let value2 = state.containerPhrasing(node2, {
    before: "# ",
    after: "\n",
    ...tracker.current()
  });
  if (/^[\t ]/.test(value2)) {
    value2 = encodeCharacterReference(value2.charCodeAt(0)) + value2.slice(1);
  }
  value2 = value2 ? sequence + " " + value2 : sequence;
  if (state.options.closeAtx) {
    value2 += " " + sequence;
  }
  subexit();
  exit3();
  return value2;
}

// node_modules/mdast-util-to-markdown/lib/handle/html.js
html.peek = htmlPeek;
function html(node2) {
  return node2.value || "";
}
function htmlPeek() {
  return "<";
}

// node_modules/mdast-util-to-markdown/lib/handle/image.js
image.peek = imagePeek;
function image(node2, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const exit3 = state.enter("image");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value2 = tracker.move("![");
  value2 += tracker.move(
    state.safe(node2.alt, { before: value2, after: "]", ...tracker.current() })
  );
  value2 += tracker.move("](");
  subexit();
  if (
    // If there’s no url but there is a title…
    !node2.url && node2.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node2.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value2 += tracker.move("<");
    value2 += tracker.move(
      state.safe(node2.url, { before: value2, after: ">", ...tracker.current() })
    );
    value2 += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value2 += tracker.move(
      state.safe(node2.url, {
        before: value2,
        after: node2.title ? " " : ")",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node2.title) {
    subexit = state.enter(`title${suffix}`);
    value2 += tracker.move(" " + quote);
    value2 += tracker.move(
      state.safe(node2.title, {
        before: value2,
        after: quote,
        ...tracker.current()
      })
    );
    value2 += tracker.move(quote);
    subexit();
  }
  value2 += tracker.move(")");
  exit3();
  return value2;
}
function imagePeek() {
  return "!";
}

// node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
imageReference.peek = imageReferencePeek;
function imageReference(node2, _, state, info) {
  const type = node2.referenceType;
  const exit3 = state.enter("imageReference");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value2 = tracker.move("![");
  const alt = state.safe(node2.alt, {
    before: value2,
    after: "]",
    ...tracker.current()
  });
  value2 += tracker.move(alt + "][");
  subexit();
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter("reference");
  const reference = state.safe(state.associationId(node2), {
    before: value2,
    after: "]",
    ...tracker.current()
  });
  subexit();
  state.stack = stack;
  exit3();
  if (type === "full" || !alt || alt !== reference) {
    value2 += tracker.move(reference + "]");
  } else if (type === "shortcut") {
    value2 = value2.slice(0, -1);
  } else {
    value2 += tracker.move("]");
  }
  return value2;
}
function imageReferencePeek() {
  return "!";
}

// node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
inlineCode.peek = inlineCodePeek;
function inlineCode(node2, _, state) {
  let value2 = node2.value || "";
  let sequence = "`";
  let index2 = -1;
  while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value2)) {
    sequence += "`";
  }
  if (/[^ \r\n]/.test(value2) && (/^[ \r\n]/.test(value2) && /[ \r\n]$/.test(value2) || /^`|`$/.test(value2))) {
    value2 = " " + value2 + " ";
  }
  while (++index2 < state.unsafe.length) {
    const pattern = state.unsafe[index2];
    const expression = state.compilePattern(pattern);
    let match;
    if (!pattern.atBreak) continue;
    while (match = expression.exec(value2)) {
      let position2 = match.index;
      if (value2.charCodeAt(position2) === 10 && value2.charCodeAt(position2 - 1) === 13) {
        position2--;
      }
      value2 = value2.slice(0, position2) + " " + value2.slice(match.index + 1);
    }
  }
  return sequence + value2 + sequence;
}
function inlineCodePeek() {
  return "`";
}

// node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function formatLinkAsAutolink(node2, state) {
  const raw = toString(node2);
  return Boolean(
    !state.options.resourceLink && // If there’s a url…
    node2.url && // And there’s a no title…
    !node2.title && // And the content of `node` is a single text node…
    node2.children && node2.children.length === 1 && node2.children[0].type === "text" && // And if the url is the same as the content…
    (raw === node2.url || "mailto:" + raw === node2.url) && // And that starts w/ a protocol…
    /^[a-z][a-z+.-]+:/i.test(node2.url) && // And that doesn’t contain ASCII control codes (character escapes and
    // references don’t work), space, or angle brackets…
    !/[\0- <>\u007F]/.test(node2.url)
  );
}

// node_modules/mdast-util-to-markdown/lib/handle/link.js
link.peek = linkPeek;
function link(node2, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const tracker = state.createTracker(info);
  let exit3;
  let subexit;
  if (formatLinkAsAutolink(node2, state)) {
    const stack = state.stack;
    state.stack = [];
    exit3 = state.enter("autolink");
    let value3 = tracker.move("<");
    value3 += tracker.move(
      state.containerPhrasing(node2, {
        before: value3,
        after: ">",
        ...tracker.current()
      })
    );
    value3 += tracker.move(">");
    exit3();
    state.stack = stack;
    return value3;
  }
  exit3 = state.enter("link");
  subexit = state.enter("label");
  let value2 = tracker.move("[");
  value2 += tracker.move(
    state.containerPhrasing(node2, {
      before: value2,
      after: "](",
      ...tracker.current()
    })
  );
  value2 += tracker.move("](");
  subexit();
  if (
    // If there’s no url but there is a title…
    !node2.url && node2.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node2.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value2 += tracker.move("<");
    value2 += tracker.move(
      state.safe(node2.url, { before: value2, after: ">", ...tracker.current() })
    );
    value2 += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value2 += tracker.move(
      state.safe(node2.url, {
        before: value2,
        after: node2.title ? " " : ")",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node2.title) {
    subexit = state.enter(`title${suffix}`);
    value2 += tracker.move(" " + quote);
    value2 += tracker.move(
      state.safe(node2.title, {
        before: value2,
        after: quote,
        ...tracker.current()
      })
    );
    value2 += tracker.move(quote);
    subexit();
  }
  value2 += tracker.move(")");
  exit3();
  return value2;
}
function linkPeek(node2, _, state) {
  return formatLinkAsAutolink(node2, state) ? "<" : "[";
}

// node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
linkReference.peek = linkReferencePeek;
function linkReference(node2, _, state, info) {
  const type = node2.referenceType;
  const exit3 = state.enter("linkReference");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value2 = tracker.move("[");
  const text5 = state.containerPhrasing(node2, {
    before: value2,
    after: "]",
    ...tracker.current()
  });
  value2 += tracker.move(text5 + "][");
  subexit();
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter("reference");
  const reference = state.safe(state.associationId(node2), {
    before: value2,
    after: "]",
    ...tracker.current()
  });
  subexit();
  state.stack = stack;
  exit3();
  if (type === "full" || !text5 || text5 !== reference) {
    value2 += tracker.move(reference + "]");
  } else if (type === "shortcut") {
    value2 = value2.slice(0, -1);
  } else {
    value2 += tracker.move("]");
  }
  return value2;
}
function linkReferencePeek() {
  return "[";
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function checkBullet(state) {
  const marker = state.options.bullet || "*";
  if (marker !== "*" && marker !== "+" && marker !== "-") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function checkBulletOther(state) {
  const bullet = checkBullet(state);
  const bulletOther = state.options.bulletOther;
  if (!bulletOther) {
    return bullet === "*" ? "-" : "*";
  }
  if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
    throw new Error(
      "Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  }
  if (bulletOther === bullet) {
    throw new Error(
      "Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different"
    );
  }
  return bulletOther;
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function checkBulletOrdered(state) {
  const marker = state.options.bulletOrdered || ".";
  if (marker !== "." && marker !== ")") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function checkRule(state) {
  const marker = state.options.rule || "*";
  if (marker !== "*" && marker !== "-" && marker !== "_") {
    throw new Error(
      "Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/list.js
function list2(node2, parent, state, info) {
  const exit3 = state.enter("list");
  const bulletCurrent = state.bulletCurrent;
  let bullet = node2.ordered ? checkBulletOrdered(state) : checkBullet(state);
  const bulletOther = node2.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
  let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
  if (!node2.ordered) {
    const firstListItem = node2.children ? node2.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (bullet === "*" || bullet === "-") && // Empty first list item:
      firstListItem && (!firstListItem.children || !firstListItem.children[0]) && // Directly in two other list items:
      state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && // That are each the first child.
      state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0
    ) {
      useDifferentMarker = true;
    }
    if (checkRule(state) === bullet && firstListItem) {
      let index2 = -1;
      while (++index2 < node2.children.length) {
        const item = node2.children[index2];
        if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
          useDifferentMarker = true;
          break;
        }
      }
    }
  }
  if (useDifferentMarker) {
    bullet = bulletOther;
  }
  state.bulletCurrent = bullet;
  const value2 = state.containerFlow(node2, info);
  state.bulletLastUsed = bullet;
  state.bulletCurrent = bulletCurrent;
  exit3();
  return value2;
}

// node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function checkListItemIndent(state) {
  const style = state.options.listItemIndent || "one";
  if (style !== "tab" && style !== "one" && style !== "mixed") {
    throw new Error(
      "Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  }
  return style;
}

// node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function listItem(node2, parent, state, info) {
  const listItemIndent = checkListItemIndent(state);
  let bullet = state.bulletCurrent || checkBullet(state);
  if (parent && parent.type === "list" && parent.ordered) {
    bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
  }
  let size = bullet.length + 1;
  if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
    size = Math.ceil(size / 4) * 4;
  }
  const tracker = state.createTracker(info);
  tracker.move(bullet + " ".repeat(size - bullet.length));
  tracker.shift(size);
  const exit3 = state.enter("listItem");
  const value2 = state.indentLines(
    state.containerFlow(node2, tracker.current()),
    map3
  );
  exit3();
  return value2;
  function map3(line, index2, blank) {
    if (index2) {
      return (blank ? "" : " ".repeat(size)) + line;
    }
    return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
  }
}

// node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function paragraph(node2, _, state, info) {
  const exit3 = state.enter("paragraph");
  const subexit = state.enter("phrasing");
  const value2 = state.containerPhrasing(node2, info);
  subexit();
  exit3();
  return value2;
}

// node_modules/mdast-util-phrasing/lib/index.js
var phrasing = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  convert([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);

// node_modules/mdast-util-to-markdown/lib/handle/root.js
function root(node2, _, state, info) {
  const hasPhrasing = node2.children.some(function(d) {
    return phrasing(d);
  });
  const container = hasPhrasing ? state.containerPhrasing : state.containerFlow;
  return container.call(state, node2, info);
}

// node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function checkStrong(state) {
  const marker = state.options.strong || "*";
  if (marker !== "*" && marker !== "_") {
    throw new Error(
      "Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/strong.js
strong.peek = strongPeek;
function strong(node2, _, state, info) {
  const marker = checkStrong(state);
  const exit3 = state.enter("strong");
  const tracker = state.createTracker(info);
  const before = tracker.move(marker + marker);
  let between = tracker.move(
    state.containerPhrasing(node2, {
      after: marker,
      before,
      ...tracker.current()
    })
  );
  const betweenHead = between.charCodeAt(0);
  const open = encodeInfo(
    info.before.charCodeAt(info.before.length - 1),
    betweenHead,
    marker
  );
  if (open.inside) {
    between = encodeCharacterReference(betweenHead) + between.slice(1);
  }
  const betweenTail = between.charCodeAt(between.length - 1);
  const close2 = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  if (close2.inside) {
    between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  }
  const after = tracker.move(marker + marker);
  exit3();
  state.attentionEncodeSurroundingInfo = {
    after: close2.outside,
    before: open.outside
  };
  return before + between + after;
}
function strongPeek(_, _1, state) {
  return state.options.strong || "*";
}

// node_modules/mdast-util-to-markdown/lib/handle/text.js
function text3(node2, _, state, info) {
  return state.safe(node2.value, info);
}

// node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function checkRuleRepetition(state) {
  const repetition = state.options.ruleRepetition || 3;
  if (repetition < 3) {
    throw new Error(
      "Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more"
    );
  }
  return repetition;
}

// node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function thematicBreak2(_, _1, state) {
  const value2 = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
  return state.options.ruleSpaces ? value2.slice(0, -1) : value2;
}

// node_modules/mdast-util-to-markdown/lib/handle/index.js
var handle = {
  blockquote,
  break: hardBreak,
  code,
  definition: definition2,
  emphasis,
  hardBreak,
  heading,
  html,
  image,
  imageReference,
  inlineCode,
  link,
  linkReference,
  list: list2,
  listItem,
  paragraph,
  root,
  strong,
  text: text3,
  thematicBreak: thematicBreak2
};

// node_modules/mdast-util-gfm-table/lib/index.js
function gfmTableFromMarkdown() {
  return {
    enter: {
      table: enterTable,
      tableData: enterCell,
      tableHeader: enterCell,
      tableRow: enterRow
    },
    exit: {
      codeText: exitCodeText,
      table: exitTable,
      tableData: exit2,
      tableHeader: exit2,
      tableRow: exit2
    }
  };
}
function enterTable(token) {
  const align = token._align;
  ok(align, "expected `_align` on table");
  this.enter(
    {
      type: "table",
      align: align.map(function(d) {
        return d === "none" ? null : d;
      }),
      children: []
    },
    token
  );
  this.data.inTable = true;
}
function exitTable(token) {
  this.exit(token);
  this.data.inTable = void 0;
}
function enterRow(token) {
  this.enter({ type: "tableRow", children: [] }, token);
}
function exit2(token) {
  this.exit(token);
}
function enterCell(token) {
  this.enter({ type: "tableCell", children: [] }, token);
}
function exitCodeText(token) {
  let value2 = this.resume();
  if (this.data.inTable) {
    value2 = value2.replace(/\\([\\|])/g, replace);
  }
  const node2 = this.stack[this.stack.length - 1];
  ok(node2.type === "inlineCode");
  node2.value = value2;
  this.exit(token);
}
function replace($0, $1) {
  return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
  const settings = options || {};
  const padding = settings.tableCellPadding;
  const alignDelimiters = settings.tablePipeAlign;
  const stringLength = settings.stringLength;
  const around = padding ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: "\n", inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: true, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: true, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: true, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: inlineCodeWithTable,
      table: handleTable,
      tableCell: handleTableCell,
      tableRow: handleTableRow
    }
  };
  function handleTable(node2, _, state, info) {
    return serializeData(handleTableAsData(node2, state, info), node2.align);
  }
  function handleTableRow(node2, _, state, info) {
    const row = handleTableRowAsData(node2, state, info);
    const value2 = serializeData([row]);
    return value2.slice(0, value2.indexOf("\n"));
  }
  function handleTableCell(node2, _, state, info) {
    const exit3 = state.enter("tableCell");
    const subexit = state.enter("phrasing");
    const value2 = state.containerPhrasing(node2, {
      ...info,
      before: around,
      after: around
    });
    subexit();
    exit3();
    return value2;
  }
  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength
    });
  }
  function handleTableAsData(node2, state, info) {
    const children = node2.children;
    let index2 = -1;
    const result = [];
    const subexit = state.enter("table");
    while (++index2 < children.length) {
      result[index2] = handleTableRowAsData(children[index2], state, info);
    }
    subexit();
    return result;
  }
  function handleTableRowAsData(node2, state, info) {
    const children = node2.children;
    let index2 = -1;
    const result = [];
    const subexit = state.enter("tableRow");
    while (++index2 < children.length) {
      result[index2] = handleTableCell(children[index2], node2, state, info);
    }
    subexit();
    return result;
  }
  function inlineCodeWithTable(node2, parent, state) {
    let value2 = handle.inlineCode(node2, parent, state);
    if (state.stack.includes("tableCell")) {
      value2 = value2.replace(/\|/g, "\\$&");
    }
    return value2;
  }
}

// node_modules/mdast-util-gfm-task-list-item/lib/index.js
function gfmTaskListItemFromMarkdown() {
  return {
    exit: {
      taskListCheckValueChecked: exitCheck,
      taskListCheckValueUnchecked: exitCheck,
      paragraph: exitParagraphWithTaskListItem
    }
  };
}
function gfmTaskListItemToMarkdown() {
  return {
    unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
    handlers: { listItem: listItemWithTaskListItem }
  };
}
function exitCheck(token) {
  const node2 = this.stack[this.stack.length - 2];
  ok(node2.type === "listItem");
  node2.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
  const parent = this.stack[this.stack.length - 2];
  if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "paragraph");
    const head = node2.children[0];
    if (head && head.type === "text") {
      const siblings = parent.children;
      let index2 = -1;
      let firstParaghraph;
      while (++index2 < siblings.length) {
        const sibling2 = siblings[index2];
        if (sibling2.type === "paragraph") {
          firstParaghraph = sibling2;
          break;
        }
      }
      if (firstParaghraph === node2) {
        head.value = head.value.slice(1);
        if (head.value.length === 0) {
          node2.children.shift();
        } else if (node2.position && head.position && typeof head.position.start.offset === "number") {
          head.position.start.column++;
          head.position.start.offset++;
          node2.position.start = Object.assign({}, head.position.start);
        }
      }
    }
  }
  this.exit(token);
}
function listItemWithTaskListItem(node2, parent, state, info) {
  const head = node2.children[0];
  const checkable = typeof node2.checked === "boolean" && head && head.type === "paragraph";
  const checkbox = "[" + (node2.checked ? "x" : " ") + "] ";
  const tracker = state.createTracker(info);
  if (checkable) {
    tracker.move(checkbox);
  }
  let value2 = handle.listItem(node2, parent, state, {
    ...info,
    ...tracker.current()
  });
  if (checkable) {
    value2 = value2.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
  }
  return value2;
  function check($0) {
    return $0 + checkbox;
  }
}

// node_modules/mdast-util-gfm/lib/index.js
function gfmFromMarkdown() {
  return [
    gfmAutolinkLiteralFromMarkdown(),
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown(),
    gfmTableFromMarkdown(),
    gfmTaskListItemFromMarkdown()
  ];
}
function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmAutolinkLiteralToMarkdown(),
      gfmFootnoteToMarkdown(options),
      gfmStrikethroughToMarkdown(),
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown()
    ]
  };
}

// node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var wwwPrefix = {
  tokenize: tokenizeWwwPrefix,
  partial: true
};
var domain = {
  tokenize: tokenizeDomain,
  partial: true
};
var path = {
  tokenize: tokenizePath,
  partial: true
};
var trail = {
  tokenize: tokenizeTrail,
  partial: true
};
var emailDomainDotTrail = {
  tokenize: tokenizeEmailDomainDotTrail,
  partial: true
};
var wwwAutolink = {
  name: "wwwAutolink",
  tokenize: tokenizeWwwAutolink,
  previous: previousWww
};
var protocolAutolink = {
  name: "protocolAutolink",
  tokenize: tokenizeProtocolAutolink,
  previous: previousProtocol
};
var emailAutolink = {
  name: "emailAutolink",
  tokenize: tokenizeEmailAutolink,
  previous: previousEmail
};
var text4 = {};
function gfmAutolinkLiteral() {
  return {
    text: text4
  };
}
var code2 = 48;
while (code2 < 123) {
  text4[code2] = emailAutolink;
  code2++;
  if (code2 === 58) code2 = 65;
  else if (code2 === 91) code2 = 97;
}
text4[43] = emailAutolink;
text4[45] = emailAutolink;
text4[46] = emailAutolink;
text4[95] = emailAutolink;
text4[72] = [emailAutolink, protocolAutolink];
text4[104] = [emailAutolink, protocolAutolink];
text4[87] = [emailAutolink, wwwAutolink];
text4[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok3, nok) {
  const self2 = this;
  let dot;
  let data2;
  return start2;
  function start2(code3) {
    if (!gfmAtext(code3) || !previousEmail.call(self2, self2.previous) || previousUnbalanced(self2.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkEmail");
    return atext(code3);
  }
  function atext(code3) {
    if (gfmAtext(code3)) {
      effects.consume(code3);
      return atext;
    }
    if (code3 === 64) {
      effects.consume(code3);
      return emailDomain;
    }
    return nok(code3);
  }
  function emailDomain(code3) {
    if (code3 === 46) {
      return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code3);
    }
    if (code3 === 45 || code3 === 95 || asciiAlphanumeric(code3)) {
      data2 = true;
      effects.consume(code3);
      return emailDomain;
    }
    return emailDomainAfter(code3);
  }
  function emailDomainDot(code3) {
    effects.consume(code3);
    dot = true;
    return emailDomain;
  }
  function emailDomainAfter(code3) {
    if (data2 && dot && asciiAlpha(self2.previous)) {
      effects.exit("literalAutolinkEmail");
      effects.exit("literalAutolink");
      return ok3(code3);
    }
    return nok(code3);
  }
}
function tokenizeWwwAutolink(effects, ok3, nok) {
  const self2 = this;
  return wwwStart;
  function wwwStart(code3) {
    if (code3 !== 87 && code3 !== 119 || !previousWww.call(self2, self2.previous) || previousUnbalanced(self2.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkWww");
    return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code3);
  }
  function wwwAfter(code3) {
    effects.exit("literalAutolinkWww");
    effects.exit("literalAutolink");
    return ok3(code3);
  }
}
function tokenizeProtocolAutolink(effects, ok3, nok) {
  const self2 = this;
  let buffer = "";
  let seen = false;
  return protocolStart;
  function protocolStart(code3) {
    if ((code3 === 72 || code3 === 104) && previousProtocol.call(self2, self2.previous) && !previousUnbalanced(self2.events)) {
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkHttp");
      buffer += String.fromCodePoint(code3);
      effects.consume(code3);
      return protocolPrefixInside;
    }
    return nok(code3);
  }
  function protocolPrefixInside(code3) {
    if (asciiAlpha(code3) && buffer.length < 5) {
      buffer += String.fromCodePoint(code3);
      effects.consume(code3);
      return protocolPrefixInside;
    }
    if (code3 === 58) {
      const protocol = buffer.toLowerCase();
      if (protocol === "http" || protocol === "https") {
        effects.consume(code3);
        return protocolSlashesInside;
      }
    }
    return nok(code3);
  }
  function protocolSlashesInside(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      if (seen) {
        return afterProtocol;
      }
      seen = true;
      return protocolSlashesInside;
    }
    return nok(code3);
  }
  function afterProtocol(code3) {
    return code3 === null || asciiControl(code3) || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || unicodePunctuation(code3) ? nok(code3) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code3);
  }
  function protocolAfter(code3) {
    effects.exit("literalAutolinkHttp");
    effects.exit("literalAutolink");
    return ok3(code3);
  }
}
function tokenizeWwwPrefix(effects, ok3, nok) {
  let size = 0;
  return wwwPrefixInside;
  function wwwPrefixInside(code3) {
    if ((code3 === 87 || code3 === 119) && size < 3) {
      size++;
      effects.consume(code3);
      return wwwPrefixInside;
    }
    if (code3 === 46 && size === 3) {
      effects.consume(code3);
      return wwwPrefixAfter;
    }
    return nok(code3);
  }
  function wwwPrefixAfter(code3) {
    return code3 === null ? nok(code3) : ok3(code3);
  }
}
function tokenizeDomain(effects, ok3, nok) {
  let underscoreInLastSegment;
  let underscoreInLastLastSegment;
  let seen;
  return domainInside;
  function domainInside(code3) {
    if (code3 === 46 || code3 === 95) {
      return effects.check(trail, domainAfter, domainAtPunctuation)(code3);
    }
    if (code3 === null || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || code3 !== 45 && unicodePunctuation(code3)) {
      return domainAfter(code3);
    }
    seen = true;
    effects.consume(code3);
    return domainInside;
  }
  function domainAtPunctuation(code3) {
    if (code3 === 95) {
      underscoreInLastSegment = true;
    } else {
      underscoreInLastLastSegment = underscoreInLastSegment;
      underscoreInLastSegment = void 0;
    }
    effects.consume(code3);
    return domainInside;
  }
  function domainAfter(code3) {
    if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
      return nok(code3);
    }
    return ok3(code3);
  }
}
function tokenizePath(effects, ok3) {
  let sizeOpen = 0;
  let sizeClose = 0;
  return pathInside;
  function pathInside(code3) {
    if (code3 === 40) {
      sizeOpen++;
      effects.consume(code3);
      return pathInside;
    }
    if (code3 === 41 && sizeClose < sizeOpen) {
      return pathAtPunctuation(code3);
    }
    if (code3 === 33 || code3 === 34 || code3 === 38 || code3 === 39 || code3 === 41 || code3 === 42 || code3 === 44 || code3 === 46 || code3 === 58 || code3 === 59 || code3 === 60 || code3 === 63 || code3 === 93 || code3 === 95 || code3 === 126) {
      return effects.check(trail, ok3, pathAtPunctuation)(code3);
    }
    if (code3 === null || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      return ok3(code3);
    }
    effects.consume(code3);
    return pathInside;
  }
  function pathAtPunctuation(code3) {
    if (code3 === 41) {
      sizeClose++;
    }
    effects.consume(code3);
    return pathInside;
  }
}
function tokenizeTrail(effects, ok3, nok) {
  return trail2;
  function trail2(code3) {
    if (code3 === 33 || code3 === 34 || code3 === 39 || code3 === 41 || code3 === 42 || code3 === 44 || code3 === 46 || code3 === 58 || code3 === 59 || code3 === 63 || code3 === 95 || code3 === 126) {
      effects.consume(code3);
      return trail2;
    }
    if (code3 === 38) {
      effects.consume(code3);
      return trailCharacterReferenceStart;
    }
    if (code3 === 93) {
      effects.consume(code3);
      return trailBracketAfter;
    }
    if (
      // `<` is an end.
      code3 === 60 || // So is whitespace.
      code3 === null || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)
    ) {
      return ok3(code3);
    }
    return nok(code3);
  }
  function trailBracketAfter(code3) {
    if (code3 === null || code3 === 40 || code3 === 91 || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      return ok3(code3);
    }
    return trail2(code3);
  }
  function trailCharacterReferenceStart(code3) {
    return asciiAlpha(code3) ? trailCharacterReferenceInside(code3) : nok(code3);
  }
  function trailCharacterReferenceInside(code3) {
    if (code3 === 59) {
      effects.consume(code3);
      return trail2;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return trailCharacterReferenceInside;
    }
    return nok(code3);
  }
}
function tokenizeEmailDomainDotTrail(effects, ok3, nok) {
  return start2;
  function start2(code3) {
    effects.consume(code3);
    return after;
  }
  function after(code3) {
    return asciiAlphanumeric(code3) ? nok(code3) : ok3(code3);
  }
}
function previousWww(code3) {
  return code3 === null || code3 === 40 || code3 === 42 || code3 === 95 || code3 === 91 || code3 === 93 || code3 === 126 || markdownLineEndingOrSpace(code3);
}
function previousProtocol(code3) {
  return !asciiAlpha(code3);
}
function previousEmail(code3) {
  return !(code3 === 47 || gfmAtext(code3));
}
function gfmAtext(code3) {
  return code3 === 43 || code3 === 45 || code3 === 46 || code3 === 95 || asciiAlphanumeric(code3);
}
function previousUnbalanced(events) {
  let index2 = events.length;
  let result = false;
  while (index2--) {
    const token = events[index2][1];
    if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
      result = true;
      break;
    }
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}

// node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var indent2 = {
  tokenize: tokenizeIndent2,
  partial: true
};
function gfmFootnote() {
  return {
    document: {
      [91]: {
        name: "gfmFootnoteDefinition",
        tokenize: tokenizeDefinitionStart,
        continuation: {
          tokenize: tokenizeDefinitionContinuation
        },
        exit: gfmFootnoteDefinitionEnd
      }
    },
    text: {
      [91]: {
        name: "gfmFootnoteCall",
        tokenize: tokenizeGfmFootnoteCall
      },
      [93]: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: tokenizePotentialGfmFootnoteCall,
        resolveTo: resolveToPotentialGfmFootnoteCall
      }
    }
  };
}
function tokenizePotentialGfmFootnoteCall(effects, ok3, nok) {
  const self2 = this;
  let index2 = self2.events.length;
  const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
  let labelStart;
  while (index2--) {
    const token = self2.events[index2][1];
    if (token.type === "labelImage") {
      labelStart = token;
      break;
    }
    if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
      break;
    }
  }
  return start2;
  function start2(code3) {
    if (!labelStart || !labelStart._balanced) {
      return nok(code3);
    }
    const id = normalizeIdentifier(self2.sliceSerialize({
      start: labelStart.end,
      end: self2.now()
    }));
    if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
      return nok(code3);
    }
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    return ok3(code3);
  }
}
function resolveToPotentialGfmFootnoteCall(events, context) {
  let index2 = events.length;
  let labelStart;
  while (index2--) {
    if (events[index2][1].type === "labelImage" && events[index2][0] === "enter") {
      labelStart = events[index2][1];
      break;
    }
  }
  events[index2 + 1][1].type = "data";
  events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
  const call = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, events[index2 + 3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const marker = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, events[index2 + 3][1].end),
    end: Object.assign({}, events[index2 + 3][1].end)
  };
  marker.end.column++;
  marker.end.offset++;
  marker.end._bufferIndex++;
  const string3 = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, marker.end),
    end: Object.assign({}, events[events.length - 1][1].start)
  };
  const chunk = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, string3.start),
    end: Object.assign({}, string3.end)
  };
  const replacement = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    events[index2 + 1],
    events[index2 + 2],
    ["enter", call, context],
    // The `[`
    events[index2 + 3],
    events[index2 + 4],
    // The `^`.
    ["enter", marker, context],
    ["exit", marker, context],
    // Everything in between.
    ["enter", string3, context],
    ["enter", chunk, context],
    ["exit", chunk, context],
    ["exit", string3, context],
    // The ending (`]`, properly parsed and labelled).
    events[events.length - 2],
    events[events.length - 1],
    ["exit", call, context]
  ];
  events.splice(index2, events.length - index2 + 1, ...replacement);
  return events;
}
function tokenizeGfmFootnoteCall(effects, ok3, nok) {
  const self2 = this;
  const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
  let size = 0;
  let data2;
  return start2;
  function start2(code3) {
    effects.enter("gfmFootnoteCall");
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    return callStart;
  }
  function callStart(code3) {
    if (code3 !== 94) return nok(code3);
    effects.enter("gfmFootnoteCallMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallMarker");
    effects.enter("gfmFootnoteCallString");
    effects.enter("chunkString").contentType = "string";
    return callData;
  }
  function callData(code3) {
    if (
      // Too long.
      size > 999 || // Closing brace with nothing.
      code3 === 93 && !data2 || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code3 === null || code3 === 91 || markdownLineEndingOrSpace(code3)
    ) {
      return nok(code3);
    }
    if (code3 === 93) {
      effects.exit("chunkString");
      const token = effects.exit("gfmFootnoteCallString");
      if (!defined.includes(normalizeIdentifier(self2.sliceSerialize(token)))) {
        return nok(code3);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteCallLabelMarker");
      effects.exit("gfmFootnoteCall");
      return ok3;
    }
    if (!markdownLineEndingOrSpace(code3)) {
      data2 = true;
    }
    size++;
    effects.consume(code3);
    return code3 === 92 ? callEscape : callData;
  }
  function callEscape(code3) {
    if (code3 === 91 || code3 === 92 || code3 === 93) {
      effects.consume(code3);
      size++;
      return callData;
    }
    return callData(code3);
  }
}
function tokenizeDefinitionStart(effects, ok3, nok) {
  const self2 = this;
  const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
  let identifier;
  let size = 0;
  let data2;
  return start2;
  function start2(code3) {
    effects.enter("gfmFootnoteDefinition")._container = true;
    effects.enter("gfmFootnoteDefinitionLabel");
    effects.enter("gfmFootnoteDefinitionLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteDefinitionLabelMarker");
    return labelAtMarker;
  }
  function labelAtMarker(code3) {
    if (code3 === 94) {
      effects.enter("gfmFootnoteDefinitionMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionMarker");
      effects.enter("gfmFootnoteDefinitionLabelString");
      effects.enter("chunkString").contentType = "string";
      return labelInside;
    }
    return nok(code3);
  }
  function labelInside(code3) {
    if (
      // Too long.
      size > 999 || // Closing brace with nothing.
      code3 === 93 && !data2 || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code3 === null || code3 === 91 || markdownLineEndingOrSpace(code3)
    ) {
      return nok(code3);
    }
    if (code3 === 93) {
      effects.exit("chunkString");
      const token = effects.exit("gfmFootnoteDefinitionLabelString");
      identifier = normalizeIdentifier(self2.sliceSerialize(token));
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      effects.exit("gfmFootnoteDefinitionLabel");
      return labelAfter;
    }
    if (!markdownLineEndingOrSpace(code3)) {
      data2 = true;
    }
    size++;
    effects.consume(code3);
    return code3 === 92 ? labelEscape : labelInside;
  }
  function labelEscape(code3) {
    if (code3 === 91 || code3 === 92 || code3 === 93) {
      effects.consume(code3);
      size++;
      return labelInside;
    }
    return labelInside(code3);
  }
  function labelAfter(code3) {
    if (code3 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code3);
      effects.exit("definitionMarker");
      if (!defined.includes(identifier)) {
        defined.push(identifier);
      }
      return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
    }
    return nok(code3);
  }
  function whitespaceAfter(code3) {
    return ok3(code3);
  }
}
function tokenizeDefinitionContinuation(effects, ok3, nok) {
  return effects.check(blankLine, ok3, effects.attempt(indent2, ok3, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
  effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent2(effects, ok3, nok) {
  const self2 = this;
  return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 4 + 1);
  function afterPrefix(code3) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok3(code3) : nok(code3);
  }
}

// node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function gfmStrikethrough(options) {
  const options_ = options || {};
  let single = options_.singleTilde;
  const tokenizer2 = {
    name: "strikethrough",
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };
  if (single === null || single === void 0) {
    single = true;
  }
  return {
    text: {
      [126]: tokenizer2
    },
    insideSpan: {
      null: [tokenizer2]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function resolveAllStrikethrough(events, context) {
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
        let open = index2;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && // If the sizes are the same:
          events[index2][1].end.offset - events[index2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
            events[index2][1].type = "strikethroughSequence";
            events[open][1].type = "strikethroughSequence";
            const strikethrough = {
              type: "strikethrough",
              start: Object.assign({}, events[open][1].start),
              end: Object.assign({}, events[index2][1].end)
            };
            const text5 = {
              type: "strikethroughText",
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index2][1].start)
            };
            const nextEvents = [["enter", strikethrough, context], ["enter", events[open][1], context], ["exit", events[open][1], context], ["enter", text5, context]];
            const insideSpan2 = context.parser.constructs.insideSpan.null;
            if (insideSpan2) {
              splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan2, events.slice(open + 1, index2), context));
            }
            splice(nextEvents, nextEvents.length, 0, [["exit", text5, context], ["enter", events[index2][1], context], ["exit", events[index2][1], context], ["exit", strikethrough, context]]);
            splice(events, open - 1, index2 - open + 3, nextEvents);
            index2 = open + nextEvents.length - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "strikethroughSequenceTemporary") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeStrikethrough(effects, ok3, nok) {
    const previous3 = this.previous;
    const events = this.events;
    let size = 0;
    return start2;
    function start2(code3) {
      if (previous3 === 126 && events[events.length - 1][1].type !== "characterEscape") {
        return nok(code3);
      }
      effects.enter("strikethroughSequenceTemporary");
      return more(code3);
    }
    function more(code3) {
      const before = classifyCharacter(previous3);
      if (code3 === 126) {
        if (size > 1) return nok(code3);
        effects.consume(code3);
        size++;
        return more;
      }
      if (size < 2 && !single) return nok(code3);
      const token = effects.exit("strikethroughSequenceTemporary");
      const after = classifyCharacter(code3);
      token._open = !after || after === 2 && Boolean(before);
      token._close = !before || before === 2 && Boolean(after);
      return ok3(code3);
    }
  }
}

// node_modules/micromark-extension-gfm-table/lib/edit-map.js
var EditMap = class {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(index2, remove, add) {
    addImplementation(this, index2, remove, add);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(events) {
    this.map.sort(function(a, b) {
      return a[0] - b[0];
    });
    if (this.map.length === 0) {
      return;
    }
    let index2 = this.map.length;
    const vecs = [];
    while (index2 > 0) {
      index2 -= 1;
      vecs.push(events.slice(this.map[index2][0] + this.map[index2][1]), this.map[index2][2]);
      events.length = this.map[index2][0];
    }
    vecs.push(events.slice());
    events.length = 0;
    let slice = vecs.pop();
    while (slice) {
      for (const element of slice) {
        events.push(element);
      }
      slice = vecs.pop();
    }
    this.map.length = 0;
  }
};
function addImplementation(editMap, at2, remove, add) {
  let index2 = 0;
  if (remove === 0 && add.length === 0) {
    return;
  }
  while (index2 < editMap.map.length) {
    if (editMap.map[index2][0] === at2) {
      editMap.map[index2][1] += remove;
      editMap.map[index2][2].push(...add);
      return;
    }
    index2 += 1;
  }
  editMap.map.push([at2, remove, add]);
}

// node_modules/micromark-extension-gfm-table/lib/infer.js
function gfmTableAlign(events, index2) {
  let inDelimiterRow = false;
  const align = [];
  while (index2 < events.length) {
    const event = events[index2];
    if (inDelimiterRow) {
      if (event[0] === "enter") {
        if (event[1].type === "tableContent") {
          align.push(events[index2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
        }
      } else if (event[1].type === "tableContent") {
        if (events[index2 - 1][1].type === "tableDelimiterMarker") {
          const alignIndex = align.length - 1;
          align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
        }
      } else if (event[1].type === "tableDelimiterRow") {
        break;
      }
    } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
      inDelimiterRow = true;
    }
    index2 += 1;
  }
  return align;
}

// node_modules/micromark-extension-gfm-table/lib/syntax.js
function gfmTable() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: tokenizeTable,
        resolveAll: resolveTable
      }
    }
  };
}
function tokenizeTable(effects, ok3, nok) {
  const self2 = this;
  let size = 0;
  let sizeB = 0;
  let seen;
  return start2;
  function start2(code3) {
    let index2 = self2.events.length - 1;
    while (index2 > -1) {
      const type = self2.events[index2][1].type;
      if (type === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      type === "linePrefix") index2--;
      else break;
    }
    const tail = index2 > -1 ? self2.events[index2][1].type : null;
    const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
    if (next === bodyRowStart && self2.parser.lazy[self2.now().line]) {
      return nok(code3);
    }
    return next(code3);
  }
  function headRowBefore(code3) {
    effects.enter("tableHead");
    effects.enter("tableRow");
    return headRowStart(code3);
  }
  function headRowStart(code3) {
    if (code3 === 124) {
      return headRowBreak(code3);
    }
    seen = true;
    sizeB += 1;
    return headRowBreak(code3);
  }
  function headRowBreak(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      if (sizeB > 1) {
        sizeB = 0;
        self2.interrupt = true;
        effects.exit("tableRow");
        effects.enter("lineEnding");
        effects.consume(code3);
        effects.exit("lineEnding");
        return headDelimiterStart;
      }
      return nok(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, headRowBreak, "whitespace")(code3);
    }
    sizeB += 1;
    if (seen) {
      seen = false;
      size += 1;
    }
    if (code3 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      seen = true;
      return headRowBreak;
    }
    effects.enter("data");
    return headRowData(code3);
  }
  function headRowData(code3) {
    if (code3 === null || code3 === 124 || markdownLineEndingOrSpace(code3)) {
      effects.exit("data");
      return headRowBreak(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? headRowEscape : headRowData;
  }
  function headRowEscape(code3) {
    if (code3 === 92 || code3 === 124) {
      effects.consume(code3);
      return headRowData;
    }
    return headRowData(code3);
  }
  function headDelimiterStart(code3) {
    self2.interrupt = false;
    if (self2.parser.lazy[self2.now().line]) {
      return nok(code3);
    }
    effects.enter("tableDelimiterRow");
    seen = false;
    if (markdownSpace(code3)) {
      return factorySpace(effects, headDelimiterBefore, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code3);
    }
    return headDelimiterBefore(code3);
  }
  function headDelimiterBefore(code3) {
    if (code3 === 45 || code3 === 58) {
      return headDelimiterValueBefore(code3);
    }
    if (code3 === 124) {
      seen = true;
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      return headDelimiterCellBefore;
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterCellBefore(code3) {
    if (markdownSpace(code3)) {
      return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code3);
    }
    return headDelimiterValueBefore(code3);
  }
  function headDelimiterValueBefore(code3) {
    if (code3 === 58) {
      sizeB += 1;
      seen = true;
      effects.enter("tableDelimiterMarker");
      effects.consume(code3);
      effects.exit("tableDelimiterMarker");
      return headDelimiterLeftAlignmentAfter;
    }
    if (code3 === 45) {
      sizeB += 1;
      return headDelimiterLeftAlignmentAfter(code3);
    }
    if (code3 === null || markdownLineEnding(code3)) {
      return headDelimiterCellAfter(code3);
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterLeftAlignmentAfter(code3) {
    if (code3 === 45) {
      effects.enter("tableDelimiterFiller");
      return headDelimiterFiller(code3);
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterFiller(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return headDelimiterFiller;
    }
    if (code3 === 58) {
      seen = true;
      effects.exit("tableDelimiterFiller");
      effects.enter("tableDelimiterMarker");
      effects.consume(code3);
      effects.exit("tableDelimiterMarker");
      return headDelimiterRightAlignmentAfter;
    }
    effects.exit("tableDelimiterFiller");
    return headDelimiterRightAlignmentAfter(code3);
  }
  function headDelimiterRightAlignmentAfter(code3) {
    if (markdownSpace(code3)) {
      return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code3);
    }
    return headDelimiterCellAfter(code3);
  }
  function headDelimiterCellAfter(code3) {
    if (code3 === 124) {
      return headDelimiterBefore(code3);
    }
    if (code3 === null || markdownLineEnding(code3)) {
      if (!seen || size !== sizeB) {
        return headDelimiterNok(code3);
      }
      effects.exit("tableDelimiterRow");
      effects.exit("tableHead");
      return ok3(code3);
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterNok(code3) {
    return nok(code3);
  }
  function bodyRowStart(code3) {
    effects.enter("tableRow");
    return bodyRowBreak(code3);
  }
  function bodyRowBreak(code3) {
    if (code3 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      return bodyRowBreak;
    }
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("tableRow");
      return ok3(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, bodyRowBreak, "whitespace")(code3);
    }
    effects.enter("data");
    return bodyRowData(code3);
  }
  function bodyRowData(code3) {
    if (code3 === null || code3 === 124 || markdownLineEndingOrSpace(code3)) {
      effects.exit("data");
      return bodyRowBreak(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? bodyRowEscape : bodyRowData;
  }
  function bodyRowEscape(code3) {
    if (code3 === 92 || code3 === 124) {
      effects.consume(code3);
      return bodyRowData;
    }
    return bodyRowData(code3);
  }
}
function resolveTable(events, context) {
  let index2 = -1;
  let inFirstCellAwaitingPipe = true;
  let rowKind = 0;
  let lastCell = [0, 0, 0, 0];
  let cell = [0, 0, 0, 0];
  let afterHeadAwaitingFirstBodyRow = false;
  let lastTableEnd = 0;
  let currentTable;
  let currentBody;
  let currentCell;
  const map3 = new EditMap();
  while (++index2 < events.length) {
    const event = events[index2];
    const token = event[1];
    if (event[0] === "enter") {
      if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = false;
        if (lastTableEnd !== 0) {
          flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
          currentBody = void 0;
          lastTableEnd = 0;
        }
        currentTable = {
          type: "table",
          start: Object.assign({}, token.start),
          // Note: correct end is set later.
          end: Object.assign({}, token.end)
        };
        map3.add(index2, 0, [["enter", currentTable, context]]);
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        inFirstCellAwaitingPipe = true;
        currentCell = void 0;
        lastCell = [0, 0, 0, 0];
        cell = [0, index2 + 1, 0, 0];
        if (afterHeadAwaitingFirstBodyRow) {
          afterHeadAwaitingFirstBodyRow = false;
          currentBody = {
            type: "tableBody",
            start: Object.assign({}, token.start),
            // Note: correct end is set later.
            end: Object.assign({}, token.end)
          };
          map3.add(index2, 0, [["enter", currentBody, context]]);
        }
        rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
      } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        inFirstCellAwaitingPipe = false;
        if (cell[2] === 0) {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(map3, context, lastCell, rowKind, void 0, currentCell);
            lastCell = [0, 0, 0, 0];
          }
          cell[2] = index2;
        }
      } else if (token.type === "tableCellDivider") {
        if (inFirstCellAwaitingPipe) {
          inFirstCellAwaitingPipe = false;
        } else {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(map3, context, lastCell, rowKind, void 0, currentCell);
          }
          lastCell = cell;
          cell = [lastCell[1], index2, 0, 0];
        }
      }
    } else if (token.type === "tableHead") {
      afterHeadAwaitingFirstBodyRow = true;
      lastTableEnd = index2;
    } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
      lastTableEnd = index2;
      if (lastCell[1] !== 0) {
        cell[0] = cell[1];
        currentCell = flushCell(map3, context, lastCell, rowKind, index2, currentCell);
      } else if (cell[1] !== 0) {
        currentCell = flushCell(map3, context, cell, rowKind, index2, currentCell);
      }
      rowKind = 0;
    } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
      cell[3] = index2;
    }
  }
  if (lastTableEnd !== 0) {
    flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
  }
  map3.consume(context.events);
  index2 = -1;
  while (++index2 < context.events.length) {
    const event = context.events[index2];
    if (event[0] === "enter" && event[1].type === "table") {
      event[1]._align = gfmTableAlign(context.events, index2);
    }
  }
  return events;
}
function flushCell(map3, context, range, rowKind, rowEnd, previousCell) {
  const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
  const valueName = "tableContent";
  if (range[0] !== 0) {
    previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
    map3.add(range[0], 0, [["exit", previousCell, context]]);
  }
  const now = getPoint(context.events, range[1]);
  previousCell = {
    type: groupName,
    start: Object.assign({}, now),
    // Note: correct end is set later.
    end: Object.assign({}, now)
  };
  map3.add(range[1], 0, [["enter", previousCell, context]]);
  if (range[2] !== 0) {
    const relatedStart = getPoint(context.events, range[2]);
    const relatedEnd = getPoint(context.events, range[3]);
    const valueToken = {
      type: valueName,
      start: Object.assign({}, relatedStart),
      end: Object.assign({}, relatedEnd)
    };
    map3.add(range[2], 0, [["enter", valueToken, context]]);
    if (rowKind !== 2) {
      const start2 = context.events[range[2]];
      const end = context.events[range[3]];
      start2[1].end = Object.assign({}, end[1].end);
      start2[1].type = "chunkText";
      start2[1].contentType = "text";
      if (range[3] > range[2] + 1) {
        const a = range[2] + 1;
        const b = range[3] - range[2] - 1;
        map3.add(a, b, []);
      }
    }
    map3.add(range[3] + 1, 0, [["exit", valueToken, context]]);
  }
  if (rowEnd !== void 0) {
    previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
    map3.add(rowEnd, 0, [["exit", previousCell, context]]);
    previousCell = void 0;
  }
  return previousCell;
}
function flushTableEnd(map3, context, index2, table, tableBody) {
  const exits = [];
  const related = getPoint(context.events, index2);
  if (tableBody) {
    tableBody.end = Object.assign({}, related);
    exits.push(["exit", tableBody, context]);
  }
  table.end = Object.assign({}, related);
  exits.push(["exit", table, context]);
  map3.add(index2 + 1, 0, exits);
}
function getPoint(events, index2) {
  const event = events[index2];
  const side = event[0] === "enter" ? "start" : "end";
  return event[1][side];
}

// node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var tasklistCheck = {
  name: "tasklistCheck",
  tokenize: tokenizeTasklistCheck
};
function gfmTaskListItem() {
  return {
    text: {
      [91]: tasklistCheck
    }
  };
}
function tokenizeTasklistCheck(effects, ok3, nok) {
  const self2 = this;
  return open;
  function open(code3) {
    if (
      // Exit if there’s stuff before.
      self2.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !self2._gfmTasklistFirstContentOfListItem
    ) {
      return nok(code3);
    }
    effects.enter("taskListCheck");
    effects.enter("taskListCheckMarker");
    effects.consume(code3);
    effects.exit("taskListCheckMarker");
    return inside;
  }
  function inside(code3) {
    if (markdownLineEndingOrSpace(code3)) {
      effects.enter("taskListCheckValueUnchecked");
      effects.consume(code3);
      effects.exit("taskListCheckValueUnchecked");
      return close2;
    }
    if (code3 === 88 || code3 === 120) {
      effects.enter("taskListCheckValueChecked");
      effects.consume(code3);
      effects.exit("taskListCheckValueChecked");
      return close2;
    }
    return nok(code3);
  }
  function close2(code3) {
    if (code3 === 93) {
      effects.enter("taskListCheckMarker");
      effects.consume(code3);
      effects.exit("taskListCheckMarker");
      effects.exit("taskListCheck");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    if (markdownLineEnding(code3)) {
      return ok3(code3);
    }
    if (markdownSpace(code3)) {
      return effects.check({
        tokenize: spaceThenNonSpace
      }, ok3, nok)(code3);
    }
    return nok(code3);
  }
}
function spaceThenNonSpace(effects, ok3, nok) {
  return factorySpace(effects, after, "whitespace");
  function after(code3) {
    return code3 === null ? nok(code3) : ok3(code3);
  }
}

// node_modules/micromark-extension-gfm/index.js
function gfm(options) {
  return combineExtensions([
    gfmAutolinkLiteral(),
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable(),
    gfmTaskListItem()
  ]);
}

// node_modules/remark-gfm/lib/index.js
var emptyOptions4 = {};
function remarkGfm(options) {
  const self2 = (
    /** @type {Processor<Root>} */
    this
  );
  const settings = options || emptyOptions4;
  const data2 = self2.data();
  const micromarkExtensions = data2.micromarkExtensions || (data2.micromarkExtensions = []);
  const fromMarkdownExtensions = data2.fromMarkdownExtensions || (data2.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data2.toMarkdownExtensions || (data2.toMarkdownExtensions = []);
  micromarkExtensions.push(gfm(settings));
  fromMarkdownExtensions.push(gfmFromMarkdown());
  toMarkdownExtensions.push(gfmToMarkdown(settings));
}

// node_modules/fault/index.js
var import_format = __toESM(require_format(), 1);
var fault = Object.assign(create(Error), {
  eval: create(EvalError),
  range: create(RangeError),
  reference: create(ReferenceError),
  syntax: create(SyntaxError),
  type: create(TypeError),
  uri: create(URIError)
});
function create(Constructor) {
  FormattedError.displayName = Constructor.displayName || Constructor.name;
  return FormattedError;
  function FormattedError(format, ...values) {
    const reason = format ? (0, import_format.default)(format, ...values) : format;
    return new Constructor(reason);
  }
}

// node_modules/micromark-extension-frontmatter/lib/to-matters.js
var own5 = {}.hasOwnProperty;
var markers = {
  yaml: "-",
  toml: "+"
};
function toMatters(options) {
  const result = [];
  let index2 = -1;
  const presetsOrMatters = Array.isArray(options) ? options : options ? [options] : ["yaml"];
  while (++index2 < presetsOrMatters.length) {
    result[index2] = matter(presetsOrMatters[index2]);
  }
  return result;
}
function matter(option) {
  let result = option;
  if (typeof result === "string") {
    if (!own5.call(markers, result)) {
      throw fault("Missing matter definition for `%s`", result);
    }
    result = {
      type: result,
      marker: markers[result]
    };
  } else if (typeof result !== "object") {
    throw fault("Expected matter to be an object, not `%j`", result);
  }
  if (!own5.call(result, "type")) {
    throw fault("Missing `type` in matter `%j`", result);
  }
  if (!own5.call(result, "fence") && !own5.call(result, "marker")) {
    throw fault("Missing `marker` or `fence` in matter `%j`", result);
  }
  return result;
}

// node_modules/micromark-extension-frontmatter/lib/syntax.js
function frontmatter(options) {
  const matters = toMatters(options);
  const flow3 = {};
  let index2 = -1;
  while (++index2 < matters.length) {
    const matter2 = matters[index2];
    const code3 = fence(matter2, "open").charCodeAt(0);
    const construct = createConstruct(matter2);
    const existing = flow3[code3];
    if (Array.isArray(existing)) {
      existing.push(construct);
    } else {
      flow3[code3] = [construct];
    }
  }
  return {
    flow: flow3
  };
}
function createConstruct(matter2) {
  const anywhere = matter2.anywhere;
  const frontmatterType = (
    /** @type {TokenType} */
    matter2.type
  );
  const fenceType = (
    /** @type {TokenType} */
    frontmatterType + "Fence"
  );
  const sequenceType = (
    /** @type {TokenType} */
    fenceType + "Sequence"
  );
  const valueType = (
    /** @type {TokenType} */
    frontmatterType + "Value"
  );
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  let buffer;
  let bufferIndex = 0;
  return {
    tokenize: tokenizeFrontmatter,
    concrete: true
  };
  function tokenizeFrontmatter(effects, ok3, nok) {
    const self2 = this;
    return start2;
    function start2(code3) {
      const position2 = self2.now();
      if (
        // Indent not allowed.
        position2.column === 1 && // Normally, only allowed in first line.
        (position2.line === 1 || anywhere)
      ) {
        buffer = fence(matter2, "open");
        bufferIndex = 0;
        if (code3 === buffer.charCodeAt(bufferIndex)) {
          effects.enter(frontmatterType);
          effects.enter(fenceType);
          effects.enter(sequenceType);
          return openSequence(code3);
        }
      }
      return nok(code3);
    }
    function openSequence(code3) {
      if (bufferIndex === buffer.length) {
        effects.exit(sequenceType);
        if (markdownSpace(code3)) {
          effects.enter("whitespace");
          return openSequenceWhitespace(code3);
        }
        return openAfter(code3);
      }
      if (code3 === buffer.charCodeAt(bufferIndex++)) {
        effects.consume(code3);
        return openSequence;
      }
      return nok(code3);
    }
    function openSequenceWhitespace(code3) {
      if (markdownSpace(code3)) {
        effects.consume(code3);
        return openSequenceWhitespace;
      }
      effects.exit("whitespace");
      return openAfter(code3);
    }
    function openAfter(code3) {
      if (markdownLineEnding(code3)) {
        effects.exit(fenceType);
        effects.enter("lineEnding");
        effects.consume(code3);
        effects.exit("lineEnding");
        buffer = fence(matter2, "close");
        bufferIndex = 0;
        return effects.attempt(closingFenceConstruct, after, contentStart);
      }
      return nok(code3);
    }
    function contentStart(code3) {
      if (code3 === null || markdownLineEnding(code3)) {
        return contentEnd(code3);
      }
      effects.enter(valueType);
      return contentInside(code3);
    }
    function contentInside(code3) {
      if (code3 === null || markdownLineEnding(code3)) {
        effects.exit(valueType);
        return contentEnd(code3);
      }
      effects.consume(code3);
      return contentInside;
    }
    function contentEnd(code3) {
      if (code3 === null) {
        return nok(code3);
      }
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return effects.attempt(closingFenceConstruct, after, contentStart);
    }
    function after(code3) {
      effects.exit(frontmatterType);
      return ok3(code3);
    }
  }
  function tokenizeClosingFence(effects, ok3, nok) {
    let bufferIndex2 = 0;
    return closeStart;
    function closeStart(code3) {
      if (code3 === buffer.charCodeAt(bufferIndex2)) {
        effects.enter(fenceType);
        effects.enter(sequenceType);
        return closeSequence(code3);
      }
      return nok(code3);
    }
    function closeSequence(code3) {
      if (bufferIndex2 === buffer.length) {
        effects.exit(sequenceType);
        if (markdownSpace(code3)) {
          effects.enter("whitespace");
          return closeSequenceWhitespace(code3);
        }
        return closeAfter(code3);
      }
      if (code3 === buffer.charCodeAt(bufferIndex2++)) {
        effects.consume(code3);
        return closeSequence;
      }
      return nok(code3);
    }
    function closeSequenceWhitespace(code3) {
      if (markdownSpace(code3)) {
        effects.consume(code3);
        return closeSequenceWhitespace;
      }
      effects.exit("whitespace");
      return closeAfter(code3);
    }
    function closeAfter(code3) {
      if (code3 === null || markdownLineEnding(code3)) {
        effects.exit(fenceType);
        return ok3(code3);
      }
      return nok(code3);
    }
  }
}
function fence(matter2, prop) {
  return matter2.marker ? pick(matter2.marker, prop).repeat(3) : (
    // @ts-expect-error: They’re mutually exclusive.
    pick(matter2.fence, prop)
  );
}
function pick(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop];
}

// node_modules/mdast-util-frontmatter/lib/index.js
function frontmatterFromMarkdown(options) {
  const matters = toMatters(options);
  const enter = {};
  const exit3 = {};
  let index2 = -1;
  while (++index2 < matters.length) {
    const matter2 = matters[index2];
    enter[matter2.type] = opener(matter2);
    exit3[matter2.type] = close;
    exit3[matter2.type + "Value"] = value;
  }
  return { enter, exit: exit3 };
}
function opener(matter2) {
  return open;
  function open(token) {
    this.enter({ type: matter2.type, value: "" }, token);
    this.buffer();
  }
}
function close(token) {
  const data2 = this.resume();
  const node2 = this.stack[this.stack.length - 1];
  ok("value" in node2);
  this.exit(token);
  node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
}
function value(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function frontmatterToMarkdown(options) {
  const unsafe = [];
  const handlers = {};
  const matters = toMatters(options);
  let index2 = -1;
  while (++index2 < matters.length) {
    const matter2 = matters[index2];
    handlers[matter2.type] = handler(matter2);
    const open = fence2(matter2, "open");
    unsafe.push({
      atBreak: true,
      character: open.charAt(0),
      after: escapeStringRegexp(open.charAt(1))
    });
  }
  return { unsafe, handlers };
}
function handler(matter2) {
  const open = fence2(matter2, "open");
  const close2 = fence2(matter2, "close");
  return handle2;
  function handle2(node2) {
    return open + (node2.value ? "\n" + node2.value : "") + "\n" + close2;
  }
}
function fence2(matter2, prop) {
  return matter2.marker ? pick2(matter2.marker, prop).repeat(3) : (
    // @ts-expect-error: They’re mutually exclusive.
    pick2(matter2.fence, prop)
  );
}
function pick2(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop];
}

// node_modules/remark-frontmatter/lib/index.js
var emptyOptions5 = "yaml";
function remarkFrontmatter(options) {
  const self2 = (
    /** @type {Processor} */
    this
  );
  const settings = options || emptyOptions5;
  const data2 = self2.data();
  const micromarkExtensions = data2.micromarkExtensions || (data2.micromarkExtensions = []);
  const fromMarkdownExtensions = data2.fromMarkdownExtensions || (data2.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data2.toMarkdownExtensions || (data2.toMarkdownExtensions = []);
  micromarkExtensions.push(frontmatter(settings));
  fromMarkdownExtensions.push(frontmatterFromMarkdown(settings));
  toMarkdownExtensions.push(frontmatterToMarkdown(settings));
}

// src/parser.ts
function createMarkdownProcessor() {
  return unified().use(remarkParse).use(remarkMdx).use(remarkGfm).use(remarkFrontmatter, ["yaml", "toml"]);
}
function parseDocument(options) {
  const tree = createMarkdownProcessor().parse(options.content);
  const physicalLines = options.content.split(/\r?\n/);
  const blocks = [];
  const nodes = tree.children ?? [];
  for (const node2 of nodes) {
    if (!node2.position?.start?.line || !node2.position?.end?.line) {
      continue;
    }
    const kind = normalizeKind(node2, physicalLines);
    const blockIndex = blocks.length + 1;
    const blockId = `${options.id}.B${String(blockIndex).padStart(3, "0")}`;
    const startLine = node2.position.start.line;
    const endLine = node2.position.end.line;
    const lines = [];
    for (let lineNumber = startLine; lineNumber <= endLine; lineNumber += 1) {
      const text5 = physicalLines[lineNumber - 1] ?? "";
      const lineIndex = lineNumber - startLine + 1;
      lines.push({
        id: `${blockId}.L${String(lineIndex).padStart(3, "0")}`,
        path: options.path,
        line: lineNumber,
        columnStart: lineNumber === startLine ? node2.position.start.column : 1,
        columnEnd: lineNumber === endLine ? node2.position.end.column : Math.max(text5.length + 1, 1),
        text: text5
      });
    }
    blocks.push({
      id: blockId,
      kind,
      path: options.path,
      startLine,
      endLine,
      lines
    });
  }
  return {
    id: options.id,
    role: options.role,
    path: options.path,
    baseRef: options.baseRef,
    changedSinceBase: options.changedSinceBase ?? false,
    blocks
  };
}
function normalizeKind(node2, lines) {
  switch (node2.type) {
    case "yaml":
    case "toml":
      return "frontmatter";
    case "heading":
      return "heading";
    case "paragraph":
      return "paragraph";
    case "list":
      return "list";
    case "table":
      return "table";
    case "code":
      return "code";
    case "blockquote":
      return "blockquote";
    case "html":
      return "html";
    case "definition":
    case "footnoteDefinition":
      return "link-block";
    case "thematicBreak":
      return "thematic-break";
    case "mdxjsEsm":
    case "mdxFlowExpression":
    case "mdxJsxFlowElement":
      return "mdx";
    default:
      return looksLikeMdx(node2, lines) ? "mdx" : "paragraph";
  }
}
function looksLikeMdx(node2, lines) {
  if (node2.type.startsWith("mdx")) {
    return true;
  }
  const startLine = node2.position?.start?.line;
  if (!startLine) {
    return false;
  }
  const firstLine = lines[startLine - 1]?.trim() ?? "";
  return /^<\/?[A-Z][A-Za-z0-9_.:-]*(\s|>|\/>)/.test(firstLine);
}
function getLineById(document3, lineId) {
  for (const block of document3.blocks) {
    const line = block.lines.find((candidate) => candidate.id === lineId);
    if (line) {
      return line;
    }
  }
  return void 0;
}
function getBlockById(document3, blockId) {
  return document3.blocks.find((block) => block.id === blockId);
}
function allDocumentLines(document3) {
  return document3.blocks.flatMap((block) => block.lines);
}

// src/docs-audit-v2.ts
var usage = `docs-audit-v2 <command> [options]

Commands:
  scaffold      Create an audit JSON inventory from explicit source and destination docs.
  add-dest      Append destination docs to an existing audit without renumbering.
  reindex-dest  Refresh destination inventories and mark drifted destination entries stale.
  map           Merge authored mapping patch JSON into the audit.
  hydrate       Refresh source inventories and changed-file metadata.
  validate      Validate coverage, stale ranges, and schema invariants.
  render        Render Markdown and/or HTML review artifacts from audit JSON.
`;
async function main() {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "--help" || command === "-h") {
    process.stdout.write(usage);
    return;
  }
  const args = parseArgs(rest);
  switch (command) {
    case "scaffold":
      await scaffold(args);
      return;
    case "add-dest":
      await addDest(args);
      return;
    case "reindex-dest":
      await reindexDest(args);
      return;
    case "map":
      await mapPatch(args);
      return;
    case "hydrate":
      await hydrate(args);
      return;
    case "validate":
      await validateCommand(args);
      return;
    case "render":
      await render(args);
      return;
    default:
      throw new Error(`Unknown command: ${command}

${usage}`);
  }
}
function parseArgs(argv) {
  const parsed = {};
  for (let index2 = 0; index2 < argv.length; index2 += 1) {
    const token = argv[index2];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected positional argument: ${token}`);
    }
    const key = token.slice(2);
    const next = argv[index2 + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }
    parsed[key] = next;
    index2 += 1;
  }
  return parsed;
}
function stringArg(args, name2) {
  const value2 = args[name2];
  return typeof value2 === "string" ? value2 : void 0;
}
function requiredArg(args, name2) {
  const value2 = stringArg(args, name2);
  if (!value2) {
    throw new Error(`Missing required --${name2}`);
  }
  return value2;
}
function boolArg(args, name2) {
  return args[name2] === true;
}
function splitPaths(value2) {
  return value2.split(",").map((item) => item.trim()).filter(Boolean);
}
function cwdFromArgs(args) {
  return path2.resolve(stringArg(args, "cwd") ?? process.cwd());
}
async function scaffold(args) {
  const cwd = cwdFromArgs(args);
  const sourcePaths = splitPaths(requiredArg(args, "source"));
  const destPaths = splitPaths(requiredArg(args, "dest"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  const baseRef = stringArg(args, "base");
  await ensureWritable(out, boolArg(args, "force"));
  const sourceDocs = await Promise.all(
    sourcePaths.map(async (docPath, index2) => {
      const content3 = baseRef ? readGitFile(cwd, baseRef, docPath) : await readText(cwd, docPath);
      return parseDocument({
        id: `S${index2 + 1}`,
        role: "source",
        path: docPath,
        content: content3,
        baseRef,
        changedSinceBase: baseRef ? changedSinceBase(cwd, baseRef, docPath) : false
      });
    })
  );
  const destDocs = await Promise.all(
    destPaths.map(
      async (docPath, index2) => parseDocument({
        id: `D${index2 + 1}`,
        role: "destination",
        path: docPath,
        content: await readText(cwd, docPath),
        changedSinceBase: baseRef ? changedSinceBase(cwd, baseRef, docPath) : false
      })
    )
  );
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const data2 = {
    schemaVersion,
    audit: {
      id: inferAuditId(sourcePaths),
      title: "Docs Audit",
      baseRef,
      createdAt: now,
      updatedAt: now
    },
    sourceDocs,
    destDocs,
    mappings: [],
    validation: { errors: [], warnings: [], acceptedWarnings: [] }
  };
  await writeJson(out, data2);
  process.stdout.write(`wrote ${relative(cwd, out)}
`);
}
async function addDest(args) {
  const cwd = cwdFromArgs(args);
  const data2 = await readAudit(cwd, requiredArg(args, "data"));
  const destPaths = splitPaths(requiredArg(args, "dest"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  await ensureWritable(out, boolArg(args, "force"));
  const knownPaths = new Set(data2.destDocs.map((doc) => doc.path));
  for (const docPath of destPaths) {
    if (knownPaths.has(docPath)) {
      throw new Error(`Destination already exists in audit: ${docPath}`);
    }
    knownPaths.add(docPath);
  }
  let next = nextDocNumber(data2.destDocs, "D");
  for (const docPath of destPaths) {
    data2.destDocs.push(
      parseDocument({
        id: `D${next}`,
        role: "destination",
        path: docPath,
        content: await readText(cwd, docPath),
        changedSinceBase: data2.audit.baseRef ? changedSinceBase(cwd, data2.audit.baseRef, docPath) : false
      })
    );
    next += 1;
  }
  touch(data2);
  await writeJson(out, data2);
  process.stdout.write(`added ${destPaths.length} destination doc(s)
`);
}
async function reindexDest(args) {
  const cwd = cwdFromArgs(args);
  const data2 = await readAudit(cwd, requiredArg(args, "data"));
  const destPaths = splitPaths(requiredArg(args, "dest"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  await ensureWritable(out, boolArg(args, "force"));
  const oldDocsByPath = new Map(data2.destDocs.map((doc) => [doc.path, doc]));
  const newDocsByPath = /* @__PURE__ */ new Map();
  for (const docPath of destPaths) {
    const oldDoc = oldDocsByPath.get(docPath);
    if (!oldDoc) {
      throw new Error(`Unknown destination doc: ${docPath}`);
    }
    newDocsByPath.set(
      docPath,
      parseDocument({
        id: oldDoc.id,
        role: "destination",
        path: docPath,
        content: await readText(cwd, docPath),
        changedSinceBase: data2.audit.baseRef ? changedSinceBase(cwd, data2.audit.baseRef, docPath) : oldDoc.changedSinceBase
      })
    );
  }
  const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
  for (const mapping of data2.mappings) {
    for (const row of mapping.mapping) {
      row.dest = row.dest.map(
        (entry) => refreshDestinationEntry(entry, oldDocsByPath, newDocsByPath, checkedAt)
      );
    }
  }
  data2.destDocs = data2.destDocs.map((doc) => newDocsByPath.get(doc.path) ?? doc);
  touch(data2);
  await writeJson(out, data2);
  process.stdout.write(`reindexed ${destPaths.length} destination doc(s)
`);
}
async function mapPatch(args) {
  const cwd = cwdFromArgs(args);
  const data2 = await readAudit(cwd, requiredArg(args, "data"));
  const patch = await readJsonFile(cwd, requiredArg(args, "patch"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  await ensureWritable(out, boolArg(args, "force"));
  if (patch.schemaVersion !== schemaVersion) {
    throw new Error(`Unsupported mapping patch schemaVersion: ${String(patch.schemaVersion)}`);
  }
  if (!Array.isArray(patch.mappings)) {
    throw new Error("Mapping patch must contain mappings[]");
  }
  const patchIds = /* @__PURE__ */ new Set();
  for (const mapping of patch.mappings) {
    if (patchIds.has(mapping.id)) {
      throw new Error(`Duplicate mapping id ${mapping.id} in mapping patch.`);
    }
    patchIds.add(mapping.id);
  }
  const byId = new Map(data2.mappings.map((mapping) => [mapping.id, mapping]));
  for (const mapping of patch.mappings) {
    byId.set(mapping.id, mapping);
  }
  data2.mappings = [...byId.values()].sort(
    (left, right) => left.id.localeCompare(right.id, void 0, { numeric: true })
  );
  if (patch.acceptedWarnings) {
    data2.validation.acceptedWarnings = patch.acceptedWarnings;
  }
  const structural = await validateAudit(data2, cwd, { coverage: false });
  if (structural.errors.length > 0) {
    throw new Error(
      `Mapping patch failed structural validation:
${structural.errors.map((error) => `- ${error.code}: ${error.message}`).join("\n")}`
    );
  }
  touch(data2);
  await writeJson(out, data2);
  process.stdout.write(`merged ${patch.mappings.length} mapping(s)
`);
}
async function hydrate(args) {
  const cwd = cwdFromArgs(args);
  const data2 = await readAudit(cwd, requiredArg(args, "data"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  const overrideBase = stringArg(args, "base");
  await ensureWritable(out, boolArg(args, "force"));
  const staleSourceFindings = [];
  data2.sourceDocs = await Promise.all(
    data2.sourceDocs.map(async (doc) => {
      const sourceBase = overrideBase ?? doc.baseRef ?? data2.audit.baseRef;
      const content3 = sourceBase ? readGitFile(cwd, sourceBase, doc.path) : await readText(cwd, doc.path);
      const staleFindings = sourceRangeFindingsForContent(doc, content3);
      if (staleFindings.length > 0) {
        staleSourceFindings.push(...staleFindings);
        return {
          ...doc,
          changedSinceBase: sourceBase ? changedSinceBase(cwd, sourceBase, doc.path) : doc.changedSinceBase
        };
      }
      return parseDocument({
        id: doc.id,
        role: "source",
        path: doc.path,
        content: content3,
        baseRef: doc.baseRef,
        changedSinceBase: sourceBase ? changedSinceBase(cwd, sourceBase, doc.path) : false
      });
    })
  );
  data2.destDocs = data2.destDocs.map((doc) => ({
    ...doc,
    changedSinceBase: data2.audit.baseRef ? changedSinceBase(cwd, data2.audit.baseRef, doc.path) : doc.changedSinceBase
  }));
  if (staleSourceFindings.length > 0) {
    data2.validation.errors = [
      ...data2.validation.errors.filter((error) => error.code !== "stale-source-range"),
      ...staleSourceFindings
    ];
  }
  touch(data2);
  await writeJson(out, data2);
  process.stdout.write(`hydrated ${data2.sourceDocs.length} source doc(s)
`);
}
async function validateCommand(args) {
  const cwd = cwdFromArgs(args);
  const data2 = await readAudit(cwd, requiredArg(args, "data"));
  const findings = await validateAudit(data2, cwd, {
    coverage: true,
    changedOnly: boolArg(args, "changed-only"),
    diffBase: stringArg(args, "diff-base")
  });
  data2.validation.errors = findings.errors;
  data2.validation.warnings = findings.warnings;
  const out = stringArg(args, "out");
  if (out) {
    const outPath = resolveOut(cwd, out);
    await ensureWritable(outPath, boolArg(args, "force"));
    touch(data2);
    await writeJson(outPath, data2);
  }
  if (boolArg(args, "json")) {
    process.stdout.write(`${JSON.stringify(data2.validation, null, 2)}
`);
  } else {
    process.stdout.write(
      `validation: ${findings.errors.length} error(s), ${findings.warnings.length} warning(s)
`
    );
    for (const finding2 of [...findings.errors, ...findings.warnings]) {
      process.stdout.write(`- ${finding2.severity} ${finding2.code}: ${finding2.message}
`);
    }
  }
  if (findings.errors.length > 0) {
    process.exitCode = 1;
  }
}
async function render(args) {
  const cwd = cwdFromArgs(args);
  const data2 = await readAudit(cwd, requiredArg(args, "data"));
  const mdOut = stringArg(args, "md-out");
  const htmlOut = stringArg(args, "html-out");
  if (!mdOut && !htmlOut) {
    throw new Error("render requires --md-out and/or --html-out");
  }
  if (mdOut) {
    const output = resolveOut(cwd, mdOut);
    await ensureWritable(output, boolArg(args, "force"));
    await writeTextFile(output, renderMarkdown(data2));
    process.stdout.write(`wrote ${relative(cwd, output)}
`);
  }
  if (htmlOut) {
    const output = resolveOut(cwd, htmlOut);
    await ensureWritable(output, boolArg(args, "force"));
    await writeTextFile(output, await renderHtml(data2));
    process.stdout.write(`wrote ${relative(cwd, output)}
`);
  }
}
async function validateAudit(data2, cwd, options) {
  const errors = [];
  const warnings = [];
  const sourceDocsById = new Map(data2.sourceDocs.map((doc) => [doc.id, doc]));
  const sourceBlockIds = new Set(data2.sourceDocs.flatMap((doc) => doc.blocks.map((block) => block.id)));
  const destinationEntryIds = /* @__PURE__ */ new Set();
  const rowSourceCounts = /* @__PURE__ */ new Map();
  errors.push(...await validateSourceRanges(data2, cwd, options.diffBase));
  for (const accepted2 of data2.validation.acceptedWarnings ?? []) {
    if (accepted2.severity !== "warning") {
      errors.push(finding("error", "unknown-id", "Accepted warnings must have severity warning.", accepted2.sourceIds ?? [], accepted2.destinationIds ?? [], accepted2.ranges ?? []));
    }
    if (!accepted2.acceptedJustification?.trim()) {
      errors.push(finding("error", "missing-justification", "Accepted warning is missing acceptedJustification.", accepted2.sourceIds ?? [], accepted2.destinationIds ?? [], accepted2.ranges ?? []));
    }
  }
  const mappingIds = /* @__PURE__ */ new Set();
  for (const mapping of data2.mappings) {
    if (mappingIds.has(mapping.id)) {
      errors.push(finding("error", "unknown-id", `Duplicate mapping id ${mapping.id}.`, [], [], []));
    }
    mappingIds.add(mapping.id);
    validateMappingFields(mapping, errors);
    if (mapping.source.blockIds.length !== 1) {
      errors.push(finding("error", "unknown-id", `${mapping.id} must reference exactly one source block.`, mapping.source.lineIds, [], []));
    }
    const sourceDoc = sourceDocsById.get(mapping.source.docId);
    if (!sourceDoc) {
      errors.push(finding("error", "unknown-id", `${mapping.id} references unknown source doc ${mapping.source.docId}.`, [], [], []));
    }
    const mappedBlockId = mapping.source.blockIds[0];
    const mappedBlock = sourceDoc ? getBlockById(sourceDoc, mappedBlockId) : void 0;
    if (mappedBlockId && !mappedBlock) {
      if (!sourceBlockIds.has(mappedBlockId)) {
        errors.push(finding("error", "unknown-id", `${mapping.id} references unknown source block ${mappedBlockId}.`, [], [], []));
      } else {
        errors.push(
          finding(
            "error",
            "unknown-id",
            `${mapping.id} source block ${mappedBlockId} does not belong to ${mapping.source.docId}.`,
            mapping.source.lineIds,
            [],
            []
          )
        );
      }
    }
    for (const lineId of mapping.source.lineIds) {
      const sourceLine = sourceDoc ? getLineById(sourceDoc, lineId) : void 0;
      if (!sourceLine) {
        errors.push(finding("error", "unknown-id", `${mapping.id} references unknown source line ${lineId}.`, [lineId], [], []));
      } else if (mappedBlock && !mappedBlock.lines.some((line) => line.id === lineId)) {
        errors.push(
          finding(
            "error",
            "unknown-id",
            `${mapping.id} source line ${lineId} does not belong to ${mappedBlock.id}.`,
            [lineId],
            [],
            []
          )
        );
      }
    }
    const seenRows = /* @__PURE__ */ new Set();
    for (const row of mapping.mapping) {
      validateRowFields(mapping.id, row, errors);
      rowSourceCounts.set(row.sourceId, (rowSourceCounts.get(row.sourceId) ?? 0) + 1);
      if (seenRows.has(row.sourceId)) {
        errors.push(finding("error", "unknown-id", `${mapping.id} has duplicate row for ${row.sourceId}.`, [row.sourceId], [], []));
      }
      seenRows.add(row.sourceId);
      if (!mapping.source.lineIds.includes(row.sourceId)) {
        errors.push(finding("error", "unknown-id", `${mapping.id} row references source line outside mapping source: ${row.sourceId}.`, [row.sourceId], [], []));
      }
      const sourceLine = findSourceLine(data2, row.sourceId);
      const material = sourceLine ? !isFormattingOnly(sourceLine, data2) : true;
      await validateDestinations(data2, cwd, row, destinationEntryIds, errors, warnings);
      validateRowCoverage(row, material, errors, warnings);
    }
  }
  if (options.coverage) {
    for (const doc of data2.sourceDocs) {
      for (const block of doc.blocks) {
        for (const line of block.lines) {
          if (options.changedOnly && !sourceDocChangedForValidation(cwd, data2, doc, options.diffBase)) {
            continue;
          }
          if (isFormattingOnly(line, data2)) {
            continue;
          }
          const count = rowSourceCounts.get(line.id) ?? 0;
          if (count === 0) {
            errors.push(
              finding(
                "error",
                "unmapped-source-line",
                `${line.id} is material source content but is not mapped.`,
                [line.id],
                [],
                [lineRange(line)],
                "Add a line-level mapping entry or mark the content intentionally removed."
              )
            );
          } else if (count > 1) {
            errors.push(
              finding(
                "error",
                "unknown-id",
                `${line.id} is mapped by ${count} rows; each material source line must be accounted for exactly once.`,
                [line.id],
                [],
                [lineRange(line)]
              )
            );
          }
        }
      }
    }
  }
  const accepted = data2.validation.acceptedWarnings ?? [];
  const activeWarnings = warnings.filter((warning) => !accepted.some((item) => sameFinding(item, warning)));
  return { errors, warnings: activeWarnings };
}
function validateMappingFields(mapping, errors) {
  const required = [
    ["id", mapping.id],
    ["summary", mapping.summary],
    ["action", mapping.action],
    ["reason", mapping.reason],
    ["status", mapping.status],
    ["confidence", mapping.confidence],
    ["justification", mapping.justification]
  ];
  for (const [field, value2] of required) {
    if (typeof value2 !== "string" || !value2.trim()) {
      errors.push(finding("error", "missing-justification", `${mapping.id} is missing ${field}.`, mapping.source?.lineIds ?? [], [], []));
    }
  }
  if (!actions.includes(mapping.action)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown action ${String(mapping.action)}.`, mapping.source.lineIds, [], []));
  }
  if (!reasons.includes(mapping.reason)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown reason ${String(mapping.reason)}.`, mapping.source.lineIds, [], []));
  }
  if (!statuses.includes(mapping.status)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown status ${String(mapping.status)}.`, mapping.source.lineIds, [], []));
  }
  if (!confidences.includes(mapping.confidence)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown confidence ${String(mapping.confidence)}.`, mapping.source.lineIds, [], []));
  }
  if (!Array.isArray(mapping.mapping) || mapping.mapping.length === 0) {
    errors.push(finding("error", "unmapped-source-line", `${mapping.id} has no line-level mapping rows.`, mapping.source.lineIds, [], []));
  }
}
function validateRowFields(mappingId, row, errors) {
  if (!row.justification?.trim()) {
    errors.push(finding("error", "missing-justification", `${mappingId} row ${row.sourceId} is missing justification.`, [row.sourceId], [], []));
  }
  if (!actions.includes(row.action)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown action.`, [row.sourceId], [], []));
  }
  if (!reasons.includes(row.reason)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown reason.`, [row.sourceId], [], []));
  }
  if (!statuses.includes(row.status)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown status.`, [row.sourceId], [], []));
  }
  if (!confidences.includes(row.confidence)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown confidence.`, [row.sourceId], [], []));
  }
  if (!Array.isArray(row.dest)) {
    errors.push(finding("error", "missing-destination", `${mappingId} row ${row.sourceId} dest must be an array.`, [row.sourceId], [], []));
  }
}
async function validateDestinations(data2, cwd, row, destinationEntryIds, errors, warnings) {
  const destDocsById = new Map(data2.destDocs.map((doc) => [doc.id, doc]));
  for (const entry of row.dest) {
    if (!entry.id?.trim()) {
      errors.push(finding("error", "unknown-id", `Destination entry for ${row.sourceId} is missing id.`, [row.sourceId], [], []));
      continue;
    }
    if (destinationEntryIds.has(entry.id)) {
      errors.push(finding("error", "unknown-id", `Duplicate destination entry id ${entry.id}.`, [row.sourceId], [entry.id], []));
    }
    destinationEntryIds.add(entry.id);
    if (!entry.justification?.trim()) {
      errors.push(finding("error", "missing-justification", `${entry.id} is missing justification.`, [row.sourceId], [entry.id], []));
    }
    if (entry.kind === "external") {
      if (!entry.label?.trim()) {
        errors.push(finding("error", "missing-destination", `${entry.id} external destination is missing label.`, [row.sourceId], [entry.id], []));
      }
      continue;
    }
    const localEntry = entry;
    const doc = destDocsById.get(localEntry.docId);
    if (!doc) {
      errors.push(finding("error", "unknown-id", `${entry.id} references unknown destination doc ${localEntry.docId}.`, [row.sourceId], [entry.id], []));
      continue;
    }
    if (localEntry.range.path !== doc.path) {
      errors.push(
        finding(
          "error",
          "unknown-id",
          `${entry.id} range path ${localEntry.range.path} does not match destination doc ${doc.path}.`,
          [row.sourceId],
          [entry.id],
          [localEntry.range]
        )
      );
    }
    const docBlockIds = new Set(doc.blocks.map((block) => block.id));
    if (!Array.isArray(localEntry.blockIds) || localEntry.blockIds.length === 0) {
      errors.push(finding("error", "missing-destination", `${entry.id} is missing destination blockIds.`, [row.sourceId], [entry.id], []));
    } else {
      for (const blockId of localEntry.blockIds) {
        if (!docBlockIds.has(blockId)) {
          errors.push(finding("error", "unknown-id", `${entry.id} references unknown destination block ${blockId}.`, [row.sourceId], [entry.id], []));
        }
      }
    }
    const selectedBlocks = localEntry.blockIds.map((blockId) => getBlockById(doc, blockId)).filter((block) => Boolean(block));
    const selectedBlockLineIds = new Set(
      selectedBlocks.flatMap((block) => block.lines.map((line) => line.id))
    );
    if (!mappingKinds.includes(localEntry.mappingKind)) {
      errors.push(finding("error", "unknown-id", `${entry.id} uses unknown mappingKind ${String(localEntry.mappingKind)}.`, [row.sourceId], [entry.id], []));
    }
    if (localEntry.mappingKind === "block-fallback") {
      if (localEntry.lineIds.length !== 0) {
        errors.push(finding("error", "unknown-id", `${entry.id} block-fallback must have empty lineIds.`, [row.sourceId], [entry.id], []));
      }
    } else if (!Array.isArray(localEntry.lineIds) || localEntry.lineIds.length === 0) {
      errors.push(finding("error", "missing-destination", `${entry.id} needs exact destination lineIds.`, [row.sourceId], [entry.id], []));
    }
    for (const lineId of localEntry.lineIds) {
      const line = getLineById(doc, lineId);
      if (!line) {
        errors.push(finding("error", "unknown-id", `${entry.id} references unknown destination line ${lineId}.`, [row.sourceId], [entry.id], []));
      } else if (!selectedBlockLineIds.has(lineId)) {
        errors.push(
          finding(
            "error",
            "unknown-id",
            `${entry.id} destination line ${lineId} does not belong to its destination blockIds.`,
            [row.sourceId],
            [entry.id],
            [lineRange(line)]
          )
        );
      }
    }
    validateDestinationRangeSpan(entry.id, row.sourceId, localEntry, selectedBlocks, doc, errors);
    if (localEntry.stale) {
      errors.push(
        finding(
          "error",
          "stale-destination-entry",
          `${entry.id} is stale: ${localEntry.stale.message}`,
          [row.sourceId],
          [entry.id],
          [localEntry.stale.previousRange],
          "Run reindex-dest and update the mapping justification or destination range."
        )
      );
    } else {
      await validateCurrentDestinationText(cwd, doc, localEntry, row.sourceId, errors);
    }
    if (!localEntry.changedSinceBase) {
      warnings.push(
        finding(
          "warning",
          "unchanged-reference-destination",
          `${entry.id} references an unchanged destination page; render as related reference instead of a diff.`,
          [row.sourceId],
          [entry.id],
          [localEntry.range]
        )
      );
    }
    if (entry.kind === "generated") {
      const generated = entry;
      if (!generated.generator?.path) {
        errors.push(finding("error", "missing-destination", `${entry.id} generated destination is missing generator.path.`, [row.sourceId], [entry.id], [localEntry.range]));
      } else if (!generated.generator.startLine || !generated.generator.endLine) {
        warnings.push(
          finding(
            "warning",
            "low-confidence-mapping",
            `${entry.id} generated destination has no generator line range.`,
            [row.sourceId],
            [entry.id],
            [localEntry.range]
          )
        );
      }
    }
  }
}
function validateRowCoverage(row, material, errors, warnings) {
  const hasDest = row.dest.length > 0;
  const allBlockFallback = hasDest && row.dest.every(
    (entry) => entry.kind !== "external" && entry.mappingKind === "block-fallback"
  );
  if (row.confidence === "low") {
    warnings.push(
      finding("warning", "low-confidence-mapping", `${row.sourceId} has low mapping confidence.`, [row.sourceId], row.dest.map((entry) => entry.id), [])
    );
  }
  if (!material) {
    return;
  }
  if ((row.status === "covered" || row.status === "partially-covered") && !hasDest) {
    errors.push(
      finding(
        "error",
        "missing-destination",
        `${row.sourceId} is ${row.status} but has no destination proof.`,
        [row.sourceId],
        [],
        []
      )
    );
  }
  if (row.status === "covered" && allBlockFallback) {
    errors.push(
      finding(
        "error",
        "covered-block-fallback-only",
        `${row.sourceId} is covered only by broad block fallback.`,
        [row.sourceId],
        row.dest.map((entry) => entry.id),
        [],
        "Select exact destination lines or mark the row as partially-covered/needs-source-check."
      )
    );
  }
  if (allBlockFallback && (row.status === "partially-covered" || row.status === "needs-source-check" || row.status === "missing")) {
    warnings.push(
      finding(
        "warning",
        "weak-block-fallback",
        `${row.sourceId} uses only broad block fallback.`,
        [row.sourceId],
        row.dest.map((entry) => entry.id),
        []
      )
    );
  }
  if (row.status === "intentionally-removed" && !hasDest) {
    const removalWithoutDestination = ["obsolete", "unsupported", "duplicate-linking", "nav-only"].includes(row.reason);
    if (!removalWithoutDestination) {
      errors.push(
        finding(
          "error",
          "missing-destination",
          `${row.sourceId} is intentionally removed for ${row.reason} but requires a surviving destination.`,
          [row.sourceId],
          [],
          []
        )
      );
    }
  }
  if ((row.reason === "redundant" || row.reason === "generated-source") && !hasDest) {
    errors.push(
      finding(
        "error",
        "missing-destination",
        `${row.sourceId} uses ${row.reason} but has no surviving destination.`,
        [row.sourceId],
        [],
        []
      )
    );
  }
}
async function validateCurrentDestinationText(cwd, doc, entry, sourceId, errors) {
  const selectedLineObjects = entry.lineIds.length ? entry.lineIds.map((lineId) => getLineById(doc, lineId)).filter(isAuditLine) : linesInRange(doc, entry.range);
  const selectedLines = selectedLineObjects.map((line) => line.text);
  if (selectedLines.length === 0) {
    return;
  }
  let currentText = "";
  try {
    currentText = await readText(cwd, entry.range.path);
  } catch {
    errors.push(
      finding(
        "error",
        "stale-destination-range",
        `${entry.id} destination file is missing: ${entry.range.path}.`,
        [sourceId],
        [entry.id],
        [entry.range]
      )
    );
    return;
  }
  const currentLines = currentText.split(/\r?\n/);
  const currentSelected = selectedLineObjects.map((line) => currentLines[line.line - 1] ?? "");
  if (currentSelected.join("\n") !== selectedLines.join("\n")) {
    errors.push(
      finding(
        "error",
        "stale-destination-range",
        `${entry.id} destination range no longer matches current file text.`,
        [sourceId],
        [entry.id],
        [entry.range],
        "Run reindex-dest and refresh this mapping."
      )
    );
  }
}
async function validateSourceRanges(data2, cwd, diffBase) {
  const findings = [];
  for (const doc of data2.sourceDocs) {
    const ref2 = diffBase ?? doc.baseRef ?? data2.audit.baseRef;
    try {
      const content3 = ref2 ? readGitFile(cwd, ref2, doc.path) : await readText(cwd, doc.path);
      findings.push(...sourceRangeFindingsForContent(doc, content3));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      findings.push(
        finding(
          "error",
          "stale-source-range",
          `${doc.path} could not be read for source validation: ${message}`,
          doc.blocks.flatMap((block) => block.lines.map((line) => line.id)),
          [],
          doc.blocks.map((block) => ({ path: block.path, startLine: block.startLine, endLine: block.endLine }))
        )
      );
    }
  }
  return findings;
}
function sourceRangeFindingsForContent(doc, content3) {
  const currentLines = content3.split(/\r?\n/);
  const findings = [];
  for (const block of doc.blocks) {
    for (const line of block.lines) {
      if ((currentLines[line.line - 1] ?? "") !== line.text) {
        findings.push(
          finding(
            "error",
            "stale-source-range",
            `${line.id} no longer matches the configured source text.`,
            [line.id],
            [],
            [lineRange(line)],
            "Restore the original source ref or create a new audit inventory."
          )
        );
      }
    }
  }
  return findings;
}
function sourceDocChangedForValidation(cwd, data2, doc, diffBase) {
  const baseRef = diffBase ?? data2.audit.baseRef ?? doc.baseRef;
  if (!baseRef) {
    return doc.changedSinceBase;
  }
  return changedSinceBase(cwd, baseRef, doc.path);
}
function validateDestinationRangeSpan(entryId, sourceId, entry, selectedBlocks, doc, errors) {
  const selectedLines = entry.lineIds.length ? entry.lineIds.map((lineId) => getLineById(doc, lineId)).filter(isAuditLine) : selectedBlocks.flatMap((block) => block.lines);
  if (selectedLines.length === 0) {
    return;
  }
  const startLine = Math.min(...selectedLines.map((line) => line.line));
  const endLine = Math.max(...selectedLines.map((line) => line.line));
  if (entry.range.startLine > startLine || entry.range.endLine < endLine) {
    errors.push(
      finding(
        "error",
        "stale-destination-range",
        `${entryId} range does not span the selected destination lines.`,
        [sourceId],
        [entryId],
        [entry.range],
        "Update the destination range to span the selected destination line IDs."
      )
    );
  }
}
function refreshDestinationEntry(entry, oldDocsByPath, newDocsByPath, checkedAt) {
  if (entry.kind === "external") {
    return entry;
  }
  const targetPath = entry.range.path;
  const oldDoc = oldDocsByPath.get(targetPath);
  const newDoc = newDocsByPath.get(targetPath);
  if (!oldDoc || !newDoc) {
    return entry;
  }
  const previousLines = entry.lineIds.length ? entry.lineIds.map((lineId) => getLineById(oldDoc, lineId)).filter(isAuditLine) : linesInRange(oldDoc, entry.range);
  const previousText = previousLines.map((line) => line.text);
  const previousRange = entry.range;
  const previousLineIds = entry.lineIds;
  const matches = findContiguousMatches(newDoc, previousText);
  if (matches.length === 1) {
    const match = matches[0];
    const blockIds = [...new Set(match.lines.map((line) => parentBlockId(line.id)))];
    return {
      ...entry,
      blockIds,
      lineIds: entry.mappingKind === "block-fallback" ? [] : match.lines.map((line) => line.id),
      range: { path: targetPath, startLine: match.startLine, endLine: match.endLine },
      changedSinceBase: newDoc.changedSinceBase,
      stale: void 0
    };
  }
  const reason = previousText.length === 0 ? "missing-range" : matches.length > 1 ? "ambiguous-match" : "text-mismatch";
  const message = reason === "ambiguous-match" ? "Several destination ranges matched the previous text; reselect the destination." : reason === "missing-range" ? "Previous destination range could not be read from the old inventory." : "Destination line text changed; reselect or rejustify this mapping.";
  return {
    ...entry,
    stale: { reason, message, previousRange, previousLineIds, checkedAt }
  };
}
function findContiguousMatches(doc, expected) {
  if (expected.length === 0) {
    return [];
  }
  const lines = allDocumentLines(doc);
  const matches = [];
  for (let index2 = 0; index2 <= lines.length - expected.length; index2 += 1) {
    const slice = lines.slice(index2, index2 + expected.length);
    if (slice.map((line) => line.text).join("\n") === expected.join("\n")) {
      matches.push({
        startLine: slice[0].line,
        endLine: slice[slice.length - 1].line,
        lines: slice
      });
    }
  }
  return matches;
}
function renderMarkdown(data2) {
  const lines = [];
  lines.push(`# ${data2.audit.title}`);
  lines.push("");
  lines.push(`- Schema version: ${data2.schemaVersion}`);
  lines.push(`- Source docs: ${data2.sourceDocs.length}`);
  lines.push(`- Destination docs: ${data2.destDocs.length}`);
  lines.push(`- Mappings: ${data2.mappings.length}`);
  lines.push(`- Validation: ${data2.validation.errors.length} error(s), ${data2.validation.warnings.length} warning(s)`);
  lines.push("");
  lines.push("## Mapping Summary");
  lines.push("");
  lines.push("| ID | Source | Summary | Action | Reason | Destination | Status | Justification |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const mapping of data2.mappings) {
    const sourceRange = sourceRangeLabel(data2, mapping);
    const destination = destinationLabel(mapping);
    lines.push(
      `| ${mapping.id} | ${escapeTable(sourceRange)} | ${escapeTable(mapping.summary)} | ${mapping.action} | ${mapping.reason} | ${escapeTable(destination)} | ${mapping.status} | ${escapeTable(mapping.justification)} |`
    );
  }
  lines.push("");
  lines.push("## Line Mapping Details");
  lines.push("");
  lines.push("| Mapping | Source line | Source text | Action | Reason | Status | Confidence | Destinations | Justification |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const mapping of data2.mappings) {
    for (const row of mapping.mapping) {
      const sourceLine = findSourceLine(data2, row.sourceId);
      const sourceLabel = sourceLine ? `${sourceLine.path}:${sourceLine.line}` : row.sourceId;
      const sourceText = sourceLine?.text ?? "";
      lines.push(
        `| ${mapping.id} | ${escapeTable(sourceLabel)} | ${escapeTable(sourceText)} | ${row.action} | ${row.reason} | ${row.status} | ${row.confidence} | ${escapeTable(rowDestinationDetails(row))} | ${escapeTable(row.justification)} |`
      );
    }
  }
  if (data2.validation.errors.length > 0) {
    lines.push("");
    lines.push("## Validation Errors");
    lines.push("");
    for (const error of data2.validation.errors) {
      lines.push(`- ${error.code}: ${error.message}`);
    }
  }
  if (data2.validation.warnings.length > 0) {
    lines.push("");
    lines.push("## Validation Warnings");
    lines.push("");
    for (const warning of data2.validation.warnings) {
      lines.push(`- ${warning.code}: ${warning.message}`);
    }
  }
  if (data2.validation.acceptedWarnings.length > 0) {
    lines.push("");
    lines.push("## Accepted Warnings");
    lines.push("");
    for (const warning of data2.validation.acceptedWarnings) {
      lines.push(`- ${warning.code}: ${warning.message} (${warning.acceptedJustification})`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}
`;
}
async function renderHtml(data2) {
  const scriptPath = fileURLToPath2(import.meta.url);
  const templatePath = path2.resolve(path2.dirname(scriptPath), "../../assets/audit-viewer.html");
  const template = await readFile(templatePath, "utf8");
  const payload = JSON.stringify(data2).replace(/</g, "\\u003c");
  return template.replace("__AUDIT_JSON__", () => payload);
}
function destinationLabel(mapping) {
  const ranges = /* @__PURE__ */ new Set();
  for (const row of mapping.mapping) {
    for (const entry of row.dest) {
      if (entry.kind === "external") {
        ranges.add(entry.label);
      } else {
        ranges.add(`${entry.range.path}:${entry.range.startLine}-${entry.range.endLine}`);
      }
    }
  }
  return ranges.size > 0 ? [...ranges].join("<br />") : "none";
}
function rowDestinationDetails(row) {
  if (row.dest.length === 0) {
    return "none";
  }
  return row.dest.map(destinationEntryDetails).join("<br />");
}
function destinationEntryDetails(entry) {
  if (entry.kind === "external") {
    const parts2 = [`${entry.id} external`, entry.label];
    if (entry.url) {
      parts2.push(entry.url);
    }
    parts2.push(`justification=${entry.justification}`);
    return parts2.join("; ");
  }
  const parts = [
    `${entry.id} ${entry.kind}`,
    `${entry.range.path}:${entry.range.startLine}-${entry.range.endLine}`,
    `mappingKind=${entry.mappingKind}`,
    `changedSinceBase=${String(entry.changedSinceBase)}`,
    `justification=${entry.justification}`
  ];
  if (entry.kind === "generated") {
    const generatorRange = entry.generator.startLine && entry.generator.endLine ? `${entry.generator.path}:${entry.generator.startLine}-${entry.generator.endLine}` : entry.generator.path;
    parts.push(`generator=${generatorRange}`);
  }
  if (entry.stale) {
    parts.push(
      `stale=${entry.stale.reason}: ${entry.stale.message}; previous=${entry.stale.previousRange.path}:${entry.stale.previousRange.startLine}-${entry.stale.previousRange.endLine}`
    );
  }
  return parts.join("; ");
}
function sourceRangeLabel(data2, mapping) {
  const lines = mapping.source.lineIds.map((lineId) => findSourceLine(data2, lineId)).filter(isAuditLine);
  if (lines.length === 0) {
    return mapping.source.lineIds.join(", ");
  }
  return `${lines[0].path}:${lines[0].line}-${lines[lines.length - 1].line}`;
}
function escapeTable(value2) {
  return value2.replace(/\|/g, "\\|").replace(/\n/g, "<br />");
}
async function readAudit(cwd, filePath) {
  const data2 = await readJsonFile(cwd, filePath);
  if (data2.schemaVersion !== schemaVersion) {
    throw new Error(`Unsupported audit schemaVersion: ${String(data2.schemaVersion)}`);
  }
  return data2;
}
async function readJsonFile(cwd, filePath) {
  const absolutePath = path2.resolve(cwd, filePath);
  const raw = await readFile(absolutePath, "utf8");
  return JSON.parse(raw);
}
async function readText(cwd, filePath) {
  return readFile(path2.resolve(cwd, filePath), "utf8");
}
function readGitFile(cwd, ref2, filePath) {
  const result = spawnSync("git", ["show", `${ref2}:${filePath}`], {
    cwd,
    encoding: "utf8"
  });
  if (result.status !== 0) {
    throw new Error(`Could not read ${filePath} at ${ref2}: ${result.stderr.trim()}`);
  }
  return result.stdout;
}
function changedSinceBase(cwd, baseRef, filePath) {
  const result = spawnSync("git", ["diff", "--quiet", baseRef, "--", filePath], {
    cwd,
    encoding: "utf8"
  });
  if (result.status === 0) {
    return false;
  }
  if (result.status === 1) {
    return true;
  }
  return false;
}
async function ensureWritable(filePath, force) {
  if (existsSync(filePath) && !force) {
    throw new Error(`Refusing to overwrite existing file without --force: ${filePath}`);
  }
  await mkdir(path2.dirname(filePath), { recursive: true });
}
async function writeJson(filePath, data2) {
  await writeTextFile(filePath, `${JSON.stringify(data2, null, 2)}
`);
}
async function writeTextFile(filePath, content3) {
  await mkdir(path2.dirname(filePath), { recursive: true });
  await writeFile(filePath, content3, "utf8");
}
function resolveOut(cwd, filePath) {
  return path2.resolve(cwd, filePath);
}
function relative(cwd, filePath) {
  return path2.relative(cwd, filePath) || ".";
}
function touch(data2) {
  data2.audit.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
}
function inferAuditId(paths) {
  const first = paths[0]?.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return first ? `docs-audit-v2-${first}` : "docs-audit-v2";
}
function nextDocNumber(docs, prefix) {
  let max = 0;
  for (const doc of docs) {
    if (doc.id.startsWith(prefix)) {
      const value2 = Number.parseInt(doc.id.slice(1), 10);
      if (Number.isFinite(value2)) {
        max = Math.max(max, value2);
      }
    }
  }
  return max + 1;
}
function findSourceLine(data2, sourceId) {
  for (const doc of data2.sourceDocs) {
    const line = getLineById(doc, sourceId);
    if (line) {
      return line;
    }
  }
  return void 0;
}
function isAuditLine(value2) {
  return Boolean(value2);
}
function linesInRange(doc, range) {
  return allDocumentLines(doc).filter(
    (line) => line.line >= range.startLine && line.line <= range.endLine
  );
}
function parentBlockId(lineId) {
  return lineId.replace(/\.L\d+$/, "");
}
function lineRange(line) {
  return { path: line.path, startLine: line.line, endLine: line.line };
}
function isFormattingOnly(line, data2) {
  const block = findBlockForLine(data2, line.id);
  const text5 = line.text.trim();
  if (!text5) {
    return true;
  }
  if (block?.kind === "thematic-break") {
    return true;
  }
  if (block?.kind === "frontmatter" && (text5 === "---" || text5 === "+++")) {
    return true;
  }
  if (block?.kind === "code" && /^(```|~~~)/.test(text5)) {
    return true;
  }
  if (block?.kind === "table" && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(text5)) {
    return true;
  }
  if (block?.kind === "mdx" && /^<\/?[A-Z][A-Za-z0-9_.:-]*(\s[^>]*)?\/?>$/.test(text5)) {
    return true;
  }
  return false;
}
function findBlockForLine(data2, lineId) {
  const blockId = parentBlockId(lineId);
  for (const doc of [...data2.sourceDocs, ...data2.destDocs]) {
    const block = getBlockById(doc, blockId);
    if (block) {
      return block;
    }
  }
  return void 0;
}
function finding(severity, code3, message, sourceIds, destinationIds, ranges, suggestion) {
  return { severity, code: code3, message, sourceIds, destinationIds, ranges, suggestion };
}
function sameFinding(left, right) {
  return left.code === right.code && JSON.stringify(left.sourceIds ?? []) === JSON.stringify(right.sourceIds ?? []) && JSON.stringify(left.destinationIds ?? []) === JSON.stringify(right.destinationIds ?? []) && JSON.stringify(left.ranges ?? []) === JSON.stringify(right.ranges ?? []);
}
void main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}
`);
  process.exitCode = 1;
});
export {
  parseArgs,
  renderMarkdown,
  validateAudit
};
