// the stream api is used in to node js for data streaming.
//  the api provides the interface for this. ie (req objects, process.stdio)

// streams can readale or writable. all streams are instnces of event emitter

const stream = require("stream");

// section one: how to use streams with
// all streams in node operate exclusively on strings, buffer, Uint8aaray objects.

// streams can also work on other js values, except for null.
// such streams are said to be object mode

// warning: Streams can be set to work in obj mode through the options object when implementing a stream. this might not be a good idea.

// as data travel through a stream, the data is first stored in buffer.

// the buffer is the store that stands between src and dst
// ie src=dataChunkA>>>>>>>>buffer[dataChunkA]>>>>>>dst=dataChunkA

// the amount of data(bytes) a buffer can hold can be specied by the high watermark option.
const fs = require("fs");
const http = require("http");

const fsRead = fs.createReadStream;

const readFile = fsRead("./nodeSchemes.txt", {});
// readable stream bufferring
// the data that has been pushed out by the read stream implementation will sit in the internal buffer. if the buffer is full(high water mark is reached) the data will stop being read until the buffer is drained). the buffer is drained by consuming the data stored in it.

// writable stream buffering.
// when a write stream implementation call .write(chunk), the data is stored in the internal buffer and sent to the destinantion. .write(chunk) will only work if the buffer size is below the high watermark threshold.

// the goal of the stream api, is to limit the buffering of data to acceptable levels so that sources and destinations of differing speed will not overwhelm the memory available.

// the high watermark threshold is not a limit, it simply specifies the amount of streamed data a buffer can hold. if size is reach it wont store anymore data until drained

// duplex streams are a combination of both read and write streams. both the read and write streams have their own independent buffer store. this enables both to operate independently.

// http stream.

// const server = http.createServer((req, res) => {
//   req.on("data", (data) => {
//     console.log("data");
//     const dataObj = JSON.parse(data.toString("utf8"));
//     res.write(typeof dataObj + " \n");
//   });
//   req.on("end", () => {
//     console.log("ended");
//     // drain:
//     // try {
//     //   let i = 10000000;
//     //   write();
//     //   function write() {
//     //     let bool = true;
//     //     do {
//     //       i--;
//     //       if (i === 0) {
//     //         res.write("i is now zero");
//     //       } else {
//     //         ok = res.write("is the mark reached");
//     //       }
//     //     } while (i > 0 && ok);
//     //     {
//     //       if (i > 0) {
//     //         res.once("drain", () => {
//     //           console.log("internal buffer drained");
//     //           write();
//     //         });
//     //       }
//     //     }
//     //   }
//     // } catch (error) {
//     //   console.log(error.message);
//     // }

//     res.write("data", "utf8", () => {
//       console.log("data");
//     });
//     res.on("error", (error) => {
//       console.log("error occured while writing data");
//     });
//     res.end("hello world");
//     res.on("finish", () => {
//       console.log("finished sending data");
//     });
//     res.on("close", () => {
//       console.log("close event emitted");
//     });
//   });
// });

// server.listen(3001, () => {
//   console.log("running....");
// });

// writable streams ie the res object in servers expose a write and end interface. this enables to write data to the stream.

// both read and write streams use event emitters, but the read stream use special events to notfy the app if the is incoming data on the stream.

// writable stream examples
// http client side request, http server side response, fs write streams, process stdio, zlib streams, crypto streams.

// above example of the res object writing data to the client.

// working with writable streams
////////////////////////////////
// events:
// 'close': emitted once the stream is closed and no other operation is to occur.

// 'drain': emitted when the internal buffer is drained and it is safe to continue writing data

// "error": emitted when an error occured while writing data to the stream.

// "finish": emitted write stream calls the end() method to end the stream
// const server = http.createServer((req, res) => {
//   req.on("data", (data) => {
//     console.log("data");
//     const dataObj = JSON.parse(data.toString("utf8"));
//     res.write(typeof dataObj + " \n");
//   });
//   req.on("end", () => {
//     console.log("ended");
//     // drain:
//     // try {
//     //   let i = 10000000;
//     //   write();
//     //   function write() {
//     //     let bool = true;
//     //     do {
//     //       i--;
//     //       if (i === 0) {
//     //         res.write("i is now zero");
//     //       } else {
//     //         ok = res.write("is the mark reached");
//     //       }
//     //     } while (i > 0 && ok);
//     //     {
//     //       if (i > 0) {
//     //         res.once("drain", () => {
//     //           console.log("internal buffer drained");
//     //           write();
//     //         });
//     //       }
//     //     }
//     //   }
//     // } catch (error) {
//     //   console.log(error.message);
//     // }

//     res.write("data", "utf8", () => {
//       console.log("data");
//     });
//     res.on("error", (error) => {
//       console.log("error occured while writing data");
//     });
//     res.end("hello world");
//     res.on("finish", () => {
//       console.log("finished sending data");
//     });
//     res.on("close", () => {
//       console.log("close event emitted");
//     });
//   });
// });

// server.listen(3001, () => {
//   console.log("running....");
// });

// http server pipe implementation.
const serverPipe = http.createServer(async (req, res) => {
  res.on("pipe", async (reqPipe) => {
    console.log("req is piping to res");
    res.write("the migos");
    reqPipe.on("data", (data) => {});
    res.end("pipe it up");
  });
  req.pipe(res);
});

serverPipe.listen(3001, () => {
  console.log("stream piped up");
});
