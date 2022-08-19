// util module supports the needs of Node internal apis.
const util = require("util");
const fs = require("fs");
const { EventEmitter } = require("events");

// // callbackify
// const readAFile = () => {
//   return fs.readFile("./nodeSchemes.txt", {
//     encoding: "utf-8",
//     flag: "a+",
//   });
// };
// const callbackified = util.callbackify(readAFile);

// callbackified((err, data) => {
//   if (err) console.log(err.message);
//   console.log(data);
// });

// deboglog

// NODE_DEBUG = "foo";

// const debglg = util.debuglog("foo");

// debglg("hello from foo [%d]", 123);

// deprecate
// used to wrapp deprecated code, so the function is called it prints out a deprecation warning to the terminal.
const oldfunc = util.deprecate(
  () => {
    return "i did something";
  },
  "this function is deprecated",
  "123"
);

oldfunc();

// util.getSystemErrorName
// util.getSystemErrorMap
// this tools helps in geting the string name for a numeric error code.
fs.readFile("./noSuchFile", (err) => {
  if (err) {
    // console.log(util.getSystemErrorName(err.errno));

    // returns error code and message in an array
    console.log(util.getSystemErrorMap().get(err.errno));
  }
});

////////////////////////////////
const Files = function () {
  EventEmitter.call(this);
};

util.inherits(Files, EventEmitter);

Files.prototype.read = function (path) {
  fs.readFile(path, (err, data) => {
    if (err) {
      return err.message;
    }
    this.emit("data", data);
    return;
  });
};

const files = new Files();

console.log(files instanceof EventEmitter);

files.on("data", (data) => {
  console.log(data.toString());
});

// files.read("./nodeSchemes.txt");

//util.inspect, returns a string represenation of an object to be debugged.
let obj4 = {
  a: Symbol(),
  [Symbol()]: new Map([
    [1, 2],
    ["a", true],
  ]),
};

console.log(
  util.inspect(obj4, {
    compact: true,
    depth: 5,
    breakLength: 80,
    showHidden: true,
    sorted: true,
  })
);

// util.custom
