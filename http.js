// http
const http = require("http");
const net = require("net");
const url = require("url");
const stream = require("stream");

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
  res.setHeader("Date", new Date());
  res.setHeader("Content-Type", "text/plain");
  res.writeHead(200);
  res.end("some data over a socket");
});

proxy.on("connect", (req, clientSocket, head) => {
  const { port, hostname } = new URL(`http://${req.url}`);
  console.log("here");
  const serverSocket = net.connect(port || 3000, hostname, () => {
    console.log("socket connected from server");
    console.log("head: ", head.length);

    clientSocket.write(
      "HTTP/1.1 200 Connection Established\r\n" +
        "Proxy-agent: Node.js-Proxy\r\n" +
        "\r\n"
    );
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

let serverPort = 3000;
proxy.listen(serverPort, () => {
  console.log("proxy running...");

  const options = {
    port: serverPort,
    host: "127.0.0.1",
    method: "CONNECT",
    path: "127.0.0.1:3000",
  };

  const req = http.request(options);
  req.end();

  req.on("connect", (res, socket, head) => {
    console.log("connected from client");
    console.log(head.length);
    socket.write(
      "GET / HTTP/1.1\r\n" +
        "Host: www.google.com:80\r\n" +
        "Connection: close\r\n" +
        "\r\n"
    );
    socket.on("data", (chunk) => {
      console.log(chunk.toString());
    });
    socket.on("end", () => {
      proxy.close();
    });
  });
});
