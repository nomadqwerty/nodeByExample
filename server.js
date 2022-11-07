const http = require("http");
const net = require("net");
const url = require("url");

let server = http.createServer((req, res) => {
  req.on("data", (data) => {
    console.log("i recieved", data, "from", req.headers.host);

    res.end("recieved");
  });

  res.end("didnt recieve");
});

server.on("connect", (req, clientSocket, head) => {
  const url = new url.URL(`http://${req.url}`);
  const serverSocket = net.connect(url.port || 80, url.hostname, () => {
    clientSocket.write(
      "HTTP/1.1 200 Connection Established\r\n" +
        "Proxy-agent: Node.js-Proxy\r\n" +
        "\r\n"
    );
  });
});

server.listen(3000, () => {
  console.log("server running");
});
