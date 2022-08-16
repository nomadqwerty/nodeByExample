// util module supports the needs of Node internal apis.
const util = require("util");
const fs = require("fs").promises;
const { EventEmitter } = require("events");

// callbackify
const readAFile = () => {
  return fs.readFile("./nodeSchemes.txt", {
    encoding: "utf-8",
    flag: "a+",
  });
};
const callbackified = util.callbackify(readAFile);

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
