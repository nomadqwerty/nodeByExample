const http = require("http");
let server = http.createServer((req, res) => {
  req.on("data", (data) => {
    console.log("i recieved", data, "from", req.headers.host);

    res.end("recieved");
  });

  res.end("didnt recieve");
});

server.listen(3000, () => {
  console.log("server running");
});
