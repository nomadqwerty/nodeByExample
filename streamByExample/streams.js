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
// const fs = require("fs");
// const fsWritable = fs.createWriteStream("./writable.txt", {
//   encoding: "utf8",
//   flag: "w",
// });
// console.log(fsWritable.writableHighWaterMark);

// fsWritable.on("error", (err) => {
//   fsWritable.errored = err;
// });
// fsWritable.on("finish", () => {
//   console.log("stream is closed");
// });
// const writer = (str) => {
//   fsWritable.write(str + "\n", (err) => {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     console.log("flushed");
//     return;
//   });
// };

// writer("its a good day to serve the Lord, he is worthy.");
// writer("we offer our selves as living sacrifices unto him.");

// setTimeout(() => {
//   fsWritable.destroy(new Error("stream is destroyed "));
// }, 2500);

// Readable streams: Readable streams are an abstraction for a source from which it consumes data.

// read stream can be in two modes: paused mode or flow mode. note these mode are different from objectmode as a stream can be in object mode or not , regardless of if the stream is flowing or paused.

// flow mode: data is read from source to destination continually and as quickly as possible.

// paused mode: data is read from source to destination only when readable.read() is implicitly called.

// switching modes in readables.
// all readbles start in paused mode but then it is switched to flow mode by calling resume, listening for the data event or piping to a writable stream.

// and readbles can be switched to paused by  calling readable.pause(), or unpiping from a writable. removing event listener will not pause streams.

// readable streams will not generate data until a mechanism for consuming data is provided, if mechanism is disabled or deleted.

// on a lower level there are three modes.
// readableFlowing === null
// readableFlowing === false
// readableFlowing === true

// when flowing is null, no data consuming mechanism is provided.
// when flowing is false, stream has been unpiped or paused or recieving backpressure.
// when flowing is true, stream has been piped or resumed or there is a data event listener.

// choose one style of Api usage
// events: 'data' or 'readable'
// pipe

// stream Events: Readable

// async read stream events

const readAsync = async (readable) => {
  try {
    let data = "";

    for await (const chunk of readable.iterator({ destroyOnReturn: false })) {
      data += chunk;
    }

    data.toString("utf8");
    console.log("from async iterator", data);
    console.log(readable.destroyed);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

const serverRead = http.createServer(async (req, res) => {
  // "data": this event is emitted when ever the data is being read from the source. if stream is in object mode the data will be a string or buffer. listening for "data" will cause the stream to be switched to flow mode. the stream reliquishs ownership ofthe data to a consumer(event listener)
  req.on("data", (data) => {
    // pause the flow of data
    req.pause();
    console.log(data.toString("utf8"));
    // resume flow of data
    req.resume();
  });
  // only use readable or data event, not both.
  // "readable": this event is emitted when there is data to be read or new data has been read.
  // by using .read(), we read chunks of data, we can also specify the size of the data chunk, read(size)
  // req.on("readable", () => {
  //   let data;
  //   // perform read operation in the condition parenteses
  //   // every time readable.read() is called if there is data it will return a string or buffer(if stream is in object mode)
  // we neeed a loop to cnsume all the data.
  //   while ((data = req.read())) {
  //     console.log(data.toString("utf8"));
  //   }
  // });
  // "close": this event is emitted anytime a stream is closed.
  req.on("close", () => {
    console.log("closing stream......");
  });
  // "end": this event is emitted when there is no more data to be read.
  req.on("end", () => {
    console.log("request stream ended, finished reading data");
    console.log("is open: ", req.readable);
  });
  // "error": this event is emitted when there is an error while streaming.
  req.on("error", (err) => {
    console.log(err.message);
    console.log(err.stack);
  });
  // "pause": this event is emitted when the pause() is called by the read stream implementation.
  req.on("pause", () => {
    console.log(
      "stream has been paused, wont read data until stream is resumed"
    );
  });
  // The 'resume' event is emitted when stream.resume() is called and readableFlowing is not true.
  req.on("resume", () => {
    console.log("resuming stream...");
  });
  // read stream methods and props:
  // .destroy([error]): this will emit an error event if error was passed as an arg, will also emit a close event.
  // req.destroy(new Error("destroyed due to errors"));

  // .closed: returns bool after stream is closed
  // console.log(req.closed);

  // .destroyed:  returns bool after stream is destroyed
  // console.log(req.destroyed)

  // .isPaused(): returns a bool to indicate the state of the stream

  req.pause();
  console.log(req.isPaused());
  //////////////

  // .pipe(), this makes it possible to pipe a read stream to a write stream, this wll cause the data to flow into write stream to be written to the destination.
  // req.pipe(res)

  // .readable: returns bool is stream is still open for read operations
  console.log("is open: ", req.readable);
  // .readableAborted: returns bool is stream errored out before emitting the end event.

  // .readableDidRead: returns bool if data event was emitted.

  // .readableEncoding: gets the property of the encoding configured with the read stream.
  // setEncoding: setter function to set stream encoding

  // .readableEnded: returns bool if the stream emits an end event

  // .errored; returns error object passed into reable.destroy(error)

  // .readableFlowing, returns bool if stream is in flow mode.

  // .readableHighWaterMark: return highWaterMark for internal buffer object.
  //  .readableLength; returns the amount of bytes stored in buffer waaiting to be read

  // readableObjectMode: returns bool if streeam is opertating in object mode.

  // .resume(), swithces the stream back to flow mode if paused, ie:- req.resume(), to continiue reading data from req stream.

  // readdable.wrap(oldReadable): ,wrap() methods is used when devs want to interact with older node streams

  // arraylike methods for stream
  // readable[Symbol.asyncIterator]()
  await readAsync(req);

  // readable.map(cb,{options})
  // map over stream data chunks and perform operations on them

  // readable.find() find a specific chunk pf data

  // .every(cb,{options})

  // .some(cb,{options})

  // .filter(cb,{options})

  // .forEach(cb,{options})

  // .toArray(), turns stream chunks into array

  res.end("helloWorld");
});

serverRead.on("error", (err) => {
  console.log(err.message);
  console.log(err.stack);
});

// serverRead.listen(3002, () => {
//   console.log("read running");
// });

// map over stream data chunks and perform operations on them
const { Readable } = require("stream");

// (async () => {
//   await Readable.from([1, 2, 3, 4, 5]);
// })();

// //////////////////////////////////////////////////////////////////Duplex streams
//  duplex streams are streams that implement both the readable and writable streams interface.

// types of duplex streams: zlib, crypto & net

// zlib streams
const { createGzip } = require("zlib");

const { pipeline } = require("stream");

const { createReadStream, createWriteStream, stat } = require("fs");

const gzip = createGzip();

// duplex methods

// duplex.allowHalfOpen, this option determines if a the write stream should remain open after the read stream ends, if true the write stream will remain open after read ends, conteract this behavior by setting to false

// i.e.
gzip.allowHalfOpen = true;

// class Transform: these are duplex streams that the output is in one way related to the input. the transform stream is a duplex stream it has both readable and writable streams.
// transform methods
// .destroy(): this method is used to destroy a duplex stream. this will destroy both readable and writable streams.

// gzip.destroy(new Error("transform stream destroyed."));

const src = createReadStream("./writable.txt");

const dst = createWriteStream("./write.txt");

// pipeline: the pipeline method is used for duplex streams.
// it creates a pipeline between the read(src), transform(gzip) and write(dst) api. it creates a pipeine of multiple streams.
pipeline(src, gzip, dst, (err) => {
  if (!err) {
    console.log("compression finished");

    return;
  }

  console.log(err.name);
  console.log(err.message);
  process.exitCode = 1;
});

// finished method, checks if a stream finished or an error occured while streaming data
stream.finished(gzip, { error: true }, (err) => {
  if (!err) {
    console.log("stream finished");
    return;
  }
  console.log(err.message);
});
