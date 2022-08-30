// TTY module is what node process.stdin and stdout uses for streaming data between the node app and the terminal. node. there is no need to create an instance of tty in an app,because its only used by stdin and stdout. but can be used for experimental purposes.
const tty = require("tty");

// check is std is instance of TTY
console.log(process.stdout.isTTY);
console.log(process.stderr.isTTY);
console.log(process.stdin instanceof tty.ReadStream);

// console.log(process.stdin.setRawMode(false));

// class: tty.ReadStream, readable stream of tty. stdin should be the only instance of tty.ReadStream

// class: tty.WriteStream, writable stream of tty. stdout/stderr should be the only instance of tty.WriteStream

// Events:
// resize

const changeSize = (size) => {
  // get size of columns
  process.stdout.columns = size;
  process.stdout.emit("resize");
};

process.stdout.on("resize", () => {
  console.log("size was changed");
});

// changeSize(101);

// cjeck supported colors
console.log(process.stdout.getColorDepth(process.env));
// console.log(process.env);

// return size of tty
console.log(process.stdout.getWindowSize());
process.stdout.clearLine(0, () => {
  console.log("line cleared");
});
process.stdout.clearScreenDown(() => {
  console.log("screen cleared");
});

console.log("hrllo");
