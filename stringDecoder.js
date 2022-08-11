// the stringDecoder module is used for decoding buffer objects into strings in a way that preserves encoded multi-byte utf8/16 characters

const stringDecoder = require("string_decoder").StringDecoder;

let decoder = new stringDecoder("utf8");

const cent = Buffer.from(["0xC2", "0xA2"]);
console.log(decoder.write(cent));

const euro = Buffer.from([0xe2, 0x82, 0xac]);
console.log(decoder.write(euro));
console.log(decoder.end(euro));
