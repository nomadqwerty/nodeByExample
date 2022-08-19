// util
const util = require("util");
const fs = require("fs");

const v1 = 1;
const v2 = 1;

console.log(util.isDeepStrictEqual(v1, v2));

// turn callbacks to promises.

const callback = fs.readFile;

const promised = util.promisify(callback);

promised("./util.txt")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//

// text decoder. this module is usd for decoding encoded texts,this will return a string that repressents the decoded array,buffer,dataview
const decoder = new util.TextDecoder("utf8", { ignoreBOM: true, fatal: true });

const decodedTxt = decoder.decode(new Uint8Array([100, 75, 83]), {
  stream: false,
});

console.log(decodedTxt);
console.log(decoder.encoding);

// text encoder, encodes decoded texts opposite of text decoder. this returns an array of the string encoded values

const encoder = new util.TextEncoder();

//.encode()
console.log(encoder.encode("this is a string"));

//.encodeInto(src,dst)
const src = "this is the source";
const dst = new Uint8Array(src.length);

console.log(encoder.encodeInto(src, dst));

//.encoding()
console.log(encoder.encoding);

//.types, useful for type checks, long list of api please remember to use in future
console.log(util.types.isDate(new Date()));
console.log(util.types.isGeneratorObject(function* () {}));
