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

const server = http.createServer((req, res) => {
  req.on("data", (data) => {
    console.log("data");
    const dataObj = JSON.parse(data.toString("utf8"));
    res.write(typeof dataObj + " \n");
  });
  req.on("end", () => {
    console.log("ended");
    res.end("hello world");
  });
});

server.listen(3001, () => {
  console.log("running....");
});
