const http = require("http");

http
  .createServer((req, res) => {
    res.end("hello");
  })
  .listen(3000, () => {
    console.log("running...");
  });

const req = http.request({ host: "127.0.0.1", port: 3000, path: "/" }).end();

req.on("response", (data) => {
  console.log(data.statusCode);
  console.log("response");
});

req.on("error", (err) => {
  console.log(err.message);
});
