const { Worker } = require("worker_threads");
const os = require("os");
const http = require("http");

// create many workers

// half the cpu number
const numbOfCpu = os.cpus().length / 2;

// function to return promises
const workerFn = (res) => {
  return new Promise((resolve, reject) => {
    // in the promise create a new worker
    // in the worker file some operation is done.
    const worker = new Worker("./sixWorker.js", {
      // pass the cpuNum to the worker file:
      workerData: { numbOfCpu },
    });

    // listen for message returned by the worker
    worker.on("message", (msg) => {
      console.log(msg);
      resolve(msg);
    });

    // listen for errors too
    worker.on("error", (error) => {
      console.log(error);
      reject(error);
      res.statusCode = 400;
      res.end();
    });
  });
};

const server = http
  .createServer(async (req, res) => {
    if (req.url === "/non-blocking") {
      console.log(req.url);
      res.statusCode = 200;
      res.write("this is non blocking");
      res.end();
    }
    if (req.url === "/OptimizedBlocking") {
      // in the blocking route handler

      // create empty array to store return promises
      const workerArr = [];

      // loop as many times a number of cpu
      for (let i = 0; i < numbOfCpu; i++) {
        // each iteration will call the function that returns a promise
        // add each promise to workerArray
        workerArr.push(workerFn(res));
      }
      // the number of promises will be the number of cpus

      // then use the promise.all to handle array of worker promises.
      const threadResults = await Promise.all(workerArr);
      console.log(threadResults);
      console.log("done");
      res.end("done");
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
  .listen(3001, () => {
    console.log("server on");
  });
