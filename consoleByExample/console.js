// simple debugger console similar to js console, provided by web browser
// it comprises of two specific components.
// Console class. includes  methods like console.log(),console.error(),console.warn()
// global console instance configured to the stdout and stderr methods on process.
// the global console methods arent consistently synchronous like in the web browser. and it is not consistently async like other streams in node

try {
  new Error("error occured");
} catch (err) {
  console.log(err);
}
// the Console class is used to make simple logger with configurable out put streams.
// import Console class
const { Console } = console;
// console is a global module so require() is not required(lol)

// create a write stream, and err stream
const fs = require("fs");

const writer = fs.createWriteStream("./write.txt", { encoding: "utf8" });

const errWrite = fs.createWriteStream("./write", "utf8");
// create new instance of Console.
const logger = new Console(writer, errWrite);

logger.log("from console to stream");
logger.error(new Error("err message to stream"));

// .clear
console.log(1);
// console.clear();

//.count()
console.count("abc");
console.count("abc");

//.countReset
console.countReset("abc");
console.count("abc");

//.debug()
console.debug();

//.dir()

let obj = {
  [Symbol()]: "a",
  prop: "val",
};
console.dir(obj, { showHidden: true, depth: null });

//.error
console.error("error message");

//,group()
console.group("abcs", "123", "trueFalse");
//.info()
console.info(logger);
//.table();
console.table(obj);

//.time(),timeLog(),.timeEnd()
let d = new Date().getDate();
console.time(d);
console.timeLog(d);
console.timeEnd(d);

//.trace()
// returns a trace to the point .trace() was called from
