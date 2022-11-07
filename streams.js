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
const http = require("http");

// const fsRead = fs.createReadStream;

// const readFile = fsRead("./nodeSchemes.txt", {});
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
  console.log(res.writableHighWaterMark);
  res.on("pipe", async (reqPipe) => {
    res.cork();
    console.log(res.writableCorked);
    console.log("data in queue to be written: ", res.writableLength);
    res.write("the migos", "utf8", (error) => {
      if (error) console.log(error.message);

      console.log("data has be written and flushed");
    });
    res.write("culture3");
    console.log("is buffer full: ", res.writableNeedDrain);
    console.log("is stream in Obect mode: ", res.writableObjectMode);
    console.log("data in queue to be written: ", res.writableLength);
    req.on("data", (data) => {});
    res.uncork();
    console.log("data in queue to be written: ", res.writableLength);
    req.unpipe(res);
  });
  res.on("unpipe", () => {
    console.log("req is unpiped");
    // res.destroy(new Error("destroyed stream"));
    // console.log(res.errored);
    res.end("pipe it up", "utf8", () => {
      console.log("cycle ended");
    });

    console.log("is finished: ", res.writableFinished);
  });
  req.pipe(res);
});

// serverPipe.listen(3001, () => {
//   console.log("stream piped up");
// });

// the cork method forces all written data to be buffered to memory. to flush data from internal buffer , use writeStream.uncork() or writeStream.end(). for each call to cork and equal amount of calls to uncork is required

// destroy method, with immediately destroy the stream, this may lead to errors if the previous data is not streamed completely thus lead to loss of data.use end() to close a stream grcefully. this can also be used if error occured while writing data

// .closed: boolean, returns true if stream is closed.

// .destroyed: boolean, returns true if stream is destroyed.

// .end(): signals end of a stream, no further data is read or written.

// set deafault encoding for the stream.

// writableStream.writable, returns true(boolean), if stream is still open for writting

// .writableEnded: returns false if stream is open

// .writableCorked : number of time corked was called

// writable.errored: Returns error if the stream has been destroyed with an error.

// write.writableFinished: returns true if called befor the finish event is emitted.

// write.highWaterMark: Returns the high water mark property on the stream.

// write.writableLength: this specifies the amount of data(bytes) in queue to be written to a dst.

// writableNeedDrain: this returns a bolean if the buffer is full. if so the streeam will emit a drain event.

// writableObjectMode: check if stream is in object mode.
// write: this method is used to write data to stream, it will return true if data is written and false if not. if false the internal buffer needs to be drained. any further writs can cause memory usage issues.

// writable streams with fs api.
const fs = require("fs");
const fsWritable = fs.createWriteStream("./writable.txt", {
  encoding: "utf8",
  flag: "w",
});
console.log(fsWritable.writableHighWaterMark);
