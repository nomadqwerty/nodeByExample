const rl = require("readline");
const { stdin, stdout } = require("process");
const fs = require("fs");
// readline api is used to read data from a readable stream on line at a time on send it to the write stream to be printed

// to used the readline create an interface.
// Class: InterfaceConstructor, this is a class to build the i/o interface. make use of instances .createInterface()
const wrote = fs.createWriteStream("./write.txt", "utf8");
const read = fs.createReadStream("./nodeSchemes.txt", "utf8");
read.on("data", (chunk) => {
  wrote.write(chunk);
});
const readL = rl.createInterface({ input: read, output: wrote });

// events:
readL.on("close", () => {
  console.log("closed stream");
});

readL.on("line", (line) => {
  //   console.log(line);
});

readL.on("history", (line) => {
  console.log(line);
});

readL.on("pause", () => {
  console.log("stream was paused");
});

//methods
// close, ends readline reliquishes control over read and write streams
readL.close();

// pause: pauses the read stream.
readL.pause();

//
const rdL = rl.createInterface({ input: stdin, output: stdout });

rdL.question("hello there!!!!", {}, (answer) => {
  console.log(answer);
});

rdL.setPrompt("it has been set");
rdL.prompt();
rdL.getPrompt();

//.line
