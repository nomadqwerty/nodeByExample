const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCpus = os.cpus();

// start node cluster
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  let clust;
  //   fork workers
  for (let i = 0; i < 1; i++) {
    clust = cluster.fork("runThisIpc.js", [], {
      stdio: [0, 1, 2],
    });
  }
  console.log(cluster.isPrimary);
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} exitted...`);
  });

  cluster.on("disconnect", () => {
    console.log("worker disconnected");
  });
  cluster.on("fork", (worker) => {
    console.log("forked");
  });
  clust.on("message", (msg) => console.log(msg));
}
// Worker class ext event emitter:
