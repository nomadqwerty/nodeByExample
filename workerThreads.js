const { Worker } = require("worker_threads");

const http = require("http");

const server = http
  .createServer(async (req, res) => {
    if (req.url === "/non-blocking") {
      console.log(req.url);
      res.statusCode = 200;
      res.write("this is non blocking");
      res.end();
    }
    if (req.url === "/blocking") {
      console.log(req.url);
      let worker = new Worker("./worker.js");
      worker.on("message", (msg) => {
        console.log(msg);
        res.write("done");
        res.statusCode = 200;
        res.end();
      });
      worker.on("error", (error) => {
        console.log(error);
        res.statusCode = 400;
        res.end();
      });

      res.statusCode = 200;
      res.write("this is blocking ");
    }
  })
  .listen(3001);
