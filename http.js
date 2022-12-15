// http
const http = require("http");
const net = require("net");
const url = require("url");
const stream = require("stream");
const event = require("events");

// node http makes it easy to use some certain protocol featured that are difficult to use.
// the interface doesnot buffer entire req or es rather it it streamed.

// HTTP message headers are represented by an object like this: { 'content-length': '123',
//   'content-type': 'text/plain',
//   'connection': 'keep-alive',
//   'host': 'example.com',
//   'accept': '*/*' }

// node js deals only with stream handling and parsing of meassage into a body and a header.

// raw headers, headers are they were recieved are stored inthe rawheaders prop,

// http Agent:
// manages and persists client server connection, and reuse connections for clients.it will maintain a queue of pending requests for a given host and port. the agent will use a single socket connection to handle all pending requests till the queue is empty. once queue is empty either the connection is destroyed or it is sent to pool to be reuse when the same host reconnects(this option is set on the agent options object, 'keep alive')

// although connection can be stored in pools, the server can destroy idle connections, if such occurs the server will create a new connection for host. Severs can also refuse multi req over the same conection. so for eachnew req from a particular host will happen over a new connection. connections closed by the server are removed from pool and unrefed to sothe process can exit if there are no pending requests.
//: good prectice to destroy useless agents.

// agent class.

const agent = new http.Agent({
  // single connection from a host
  keepAlive: true,
});

// setTimeout(() => {
//   agent.destroy(conn);
// }, 5000);

// const conn = agent.createConnection(
//   {
//     port: 3000,
//   },
//   () => {
//     try {
//       console.log("connected to server");
//       conn.setKeepAlive(true, 2000);
//       conn.end();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// );
// conn.on("data", (data) => {
//   console.log("here: ", data.toString("utf8"));
// });
// conn.on("close", () => {
//   console.log("server connection down");
// });

// console.log(agent.keepSocketAlive(conn));

// agent.destroy(conn);

// console.log(agent.freeSockets);

// //////
// http.ClientRequest
// this object is created internally when http.request() is called. it represents an inprogress request whos header has already been queued. the header property is still mutable.

// to get response , "response" event will be emitted when the server responds to the request. the cb is passed an instnace of response or http.incomingMessage
//
const proxy = http.createServer((req, res) => {
  console.log(req.url);
  res.setHeader("Date", new Date());
  res.setHeader("Content-Type", "text/plain");
  res.writeHead(101);
  res.end("some data over a socket");
});

// proxy.on("connect", (req, clientSocket, head) => {
//   const { port, hostname } = new URL(`http://${req.url}`);
//   console.log("here");
//   const serverSocket = net.connect(port || 3000, hostname, () => {
//     console.log("socket connected from server");
//     console.log("head: ", head.length);

//     clientSocket.write(
//       "HTTP/1.1 200 Connection Established\r\n" +
//         "Proxy-agent: Node.js-Proxy\r\n" +
//         "\r\n"
//     );
//     serverSocket.write(head);
//     serverSocket.pipe(clientSocket);
//     clientSocket.pipe(serverSocket);
//   });
// });

let serverPort = 3000;
// proxy.listen(serverPort, () => {
//   console.log("proxy running...");

// const options = {
//   port: serverPort,
//   host: "127.0.0.1",
//   method: "CONNECT",
//   path: "127.0.0.1:3000",
// };

// const req = http.request(options);
// req.end();
// req.on("finish", () => {
//   console.log("finished");
// });
// req.on("connect", (res, socket, head) => {
//   console.log("connected from client");
//   console.log(head.length);
//   socket.write(
//     "GET / HTTP/1.1\r\n" +
//       "Host: www.google.com:80\r\n" +
//       "Connection: close\r\n" +
//       "\r\n"
//   );
//   socket.on("data", (chunk) => {
//     console.log(chunk.toString());
//   });
//   socket.on("end", () => {
//     proxy.close();
//   });
// });
// });

// eventss:
// "finish"- emitted when ever the request stream is closed, when end() is called or data has finished streaming.

// "information". this event is emitted when ever the server responds with a 1** code, 100 continue, 101 upgrade etc. review info res codes, 100 - 199
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
});

server.on("upgrade", (req, socket, head) => {
  console.log("upgrade request");
  socket.write(
    "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
      "Upgrade: WebSocket\r\n" +
      "Connection: Upgrade\r\n" +
      "\r\n"
  );

  socket.pipe(socket);
});
server.on("error", (error) => {
  console.log(error);
});
// server.listen(serverPort, "127.0.0.1", () => {
//   console.log("running");
// });
// const options = {
//   host: "127.0.0.1",
//   port: 3000,
//   headers: {
//     Connection: "Upgrade",
//     Upgrade: "websocket",
//     contentType: "text/plain",
//   },
// };
// const infoReq = http.request(options);
// // .removeHeader(name/key), removes the specified value form the header: do this before req is sent
// infoReq.removeHeader("contentType");
// // setHeader: this is used to insert headersnames into the header object.

// infoReq.setHeader("Cookie", ["type:dmc", "language=ikwerreScript"]);
// infoReq.end();

// infoReq.on("error", (error) => {
//   console.log(error.message);
// });
// infoReq.on("information", (info) => {
//   console.log("info recieved");
// });

// // response event emits when server responsed to request
// infoReq.on("response", (res) => {
//   // console.log(res);
// });

// socket: emitted when there is a socket connection

// timeout: emitted when ever socket connection times out

// upgrade: event is emitted when ever the server responds with a 101 upgrade status code
// infoReq.on("upgrade", (res, socket, head) => {
//   console.log("upgrade response");
//   socket.end();
//   process.exit(0);
// });
// flushHeaders()
// by default node stores req headers in a buffer, until req.end() id called or data from req is recived. node then packs the header and data into one packet and sends it over tcp. this saves the req from being sent more than once over tcp.
// flushHeaders() , prevents this behaviour.

// getHeader(key)
// this function is used to retrieve a value
// console.log(infoReq.getHeader("host"));
// getHeaderNames()
// this function is used to retrieve all keys in req header
// console.log(infoReq.getHeaderNames());

// getHeaders()
// returns a copy of the header object
// console.log(infoReq.getHeaders());

// getRawHeaderNames(), this will return an array of all raw headers.
// console.log(infoReq.getRawHeaderNames());

// .hasHeader(name/key)
// checks if a given name/key is part of req header

// .maxHeaderCount- property for limiting maximum response header count

// .path = prop for resource path requested

// .method - holds the http method used for req.

// .host - holds the server domain.

// .protocol -  holds the networking protocol.

/////////////////////reused socket//////////
// const reuse = http
//   .createServer((req, res) => {
//     res.write("hello\n");
//     res.end();
//   })
//   .listen(3005, () => {
//     console.log("reuse running.....");
//   });
// setInterval(() => {
//   console.log("request.....");
//   http.get("http://localhost:3005"),
//     { agent },
//     (res) => {
//       console.log("response");
//       res.on("data", () => {
//         console.log("incoming response");
//       });
//     };
// }, 5000);

////////////////////////////////////////////////////
// http.Server

const server1 = http.createServer((req, res) => {
  res.end();
});

// server1.listen(3006, () => {
//   console.log("server running....");
// });

// if client request comes with an http : expect: 100-continue, this means the client expoects a 100 continue response from the server before the client will send any data.

// the checkContinue event is used to listen for req with http headers of Expect: 100-continue
server1.on("checkContinue", (req, res) => {
  console.log("continue");
  res.writeContinue();
  res.end("continue");
});
// the checkExpectation event is used to listen for req with http headers of Expect which is not 100-continue. ie 101,102,103
server1.on("checkExpectation", (req, res) => {
  console.log("expectations met");

  res.end("expectations met");
});

// methods:
// closing the server
server1.on("request", (req, res) => {
  console.log("incoming request");
  res.end("incoming request");
  server1.close(() => {
    console.log("closing server....");
  });
});
console.log(server1.headersTimeout);
console.log(server1.listening);
server1.maxHeadersCount = 2000;
console.log(server1.maxHeadersCount);
console.log(server1.requestTimeout);
server1.on("close", () => {
  console.log("closed");
});
server1.on("error", (err) => {
  console.log("closed");
  console.log(err.message);
});

// serverResponse.
const servRes = http.createServer((req, res) => {
  // response object represents out going messages sent from the server to client.
  // its an instnce of Stream and eventEmitter and http outgoing messages.
  // instances
  console.log("here");
  console.log(res instanceof stream);
  console.log(res instanceof event.EventEmitter);
  console.log(res instanceof http.OutgoingMessage);

  // events
  // close: emitted when res stream is closed
  res.on("close", () => {
    console.log("res closed");
  });
  // finish: emitted when res stream is finished writing data, will emit before close event
  res.on("finish", () => {
    console.log("data has been writen completly");
  });
  // methods:
  // addTrailers: this methods adds headers at the end of the response
  res.addTrailers({ Cookie: "abtjn343jn22j33" });

  // access underlaying socket
  // console.log(res.connection);

  // set header names and values in header object
  // res.setHeader("name", "john");
  res.setHeader("name", "dave");

  // remove header name from header object, perform before header is sent.
  res.removeHeader("name");

  // sent http header to client, this method is preferred to be called before res.write() and res.end() and after all changes to header has been made
  let respnseTxt = "helloWorld";
  res.writeHead(200, "success", {
    "Content-Type": "text/plain",
    "Content-Length": respnseTxt.length,
  });

  // force data into the internal buffer store
  res.cork();

  // set key value on header object.

  // return a list of header names or keys
  res.getHeaderNames();

  // return shallowcopy of header object
  res.getHeaders();

  // return bool, check if header object contains specified key or name
  res.hasHeader("name");

  // check if header was sent,returns bool
  res.headersSent;

  // get the original request object, (incomingMesage)
  res.req;

  // enable authomatic date header property innheader objects. true by default
  res.sendDate = true;

  // set status code, status code will be sent to client after headers have been flushed from internal buffer
  res.statusCode = 200;

  // set status message, status message will be sent to client after headers have been flushed from internal buffer
  res.statusMessage = "success";

  // remove data o forced into buffer by cork()
  res.uncork();

  // check if the res stream is ended, returns bool
  res.writableEnded;
  // check if the res stream is finished writing data, returns bool
  res.writableFinished;

  // write data to the outGoing (res writeable stream) stream
  res.write("hello", "utf8", () => {
    console.log("writing to res stream");
  });

  // responsed to 100 -expect-continue requests with,
  res.writeContinue();

  // send processesing messageto the client to indicate that the req body should be sent.
  res.writeProcessing();

  // get header by keys
  console.log(res.getHeader("name"));

  // end req res cycle by ending response
  res.end("ended", "utf-8", () => {
    console.log("res done");
  });

  // return boolean if response is finished
  console.log(res.finished);
});

// servRes.listen(3000, () => {
//   console.log("servRes.....");
// });

// http incoming message:
const inCome = http
  .createServer((req, res) => {
    res.end("done");
  })
  .listen(3000, () => {
    console.log("running...");
  });

// events
inCome.on("request", (req) => {
  console.log("incoming message...");

  // close event
  req.on("close", () => {
    console.log("closed");
    console.log(req.complete);
  });
  // // close event
  // req.on("close", () => {
  //   console.log("closed");
  // });

  // properties:
  // message.complete is used to check if message has been recieved and parsed: check after close, finished event
  console.log(req.complete);

  // .headers: access incoming http headers object
  console.log(req.headers);

  // .headersDistinct: returns http headers as array
  // console.log(req.headersDistinct);

  // httpVersion: returns the incoming message's http versions
  console.log(req.httpVersion);

  // message.method: returns the incoming message's http Method
  console.log(req.method);

  // message.rawHeaders: returns the incoming message headrs as they were sent. retuens a list of key/value pairs.
  console.log(req.rawHeaders);

  // rawTrailers: returns the trailing http headers sent at the end of the request.
  console.log(req.rawTrailers);
  // methods:
  // destroy(error) used to destroy a stream.
  // req.destroy(new Error("failed to read"));
});
inCome.on("error", (err) => {
  console.log(err.message);
});
