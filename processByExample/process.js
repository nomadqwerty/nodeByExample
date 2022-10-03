const process = require("process");
const event = require("events");
// beforExit signal is emiited when the are no more pending operations for the eventLoop causing the node process to exit.

// process.on("beforeExit", (code) => {
//   console.log("exiting process", code);
// });

// // make use of exit event instead to listen for end in a node process.

// // asynchrous because we wait for the event loop to finish and all synchronous and async code is executed and/or the process.exit() was called implicitly then the 'exit' event is fired and we listen to it
// process.on("exit", (code) => {
//     // listener function should not perfom async operation while node is shuttingdown, it will cause additional work for the eventloop and it will be abandoned.
//   console.log("node porcess halting..", code);
//   console.log(process.exitCode);
// });

// // the beforExit event is not emittted if the process is explicitly stopped, by calling process.exit()
// process.exit(1);

// process and Promise

const rejects = new Map();

const promise = new Promise((resolve, reject) => {
  return reject("A");
});

// process.on("unhandledRejection", (reason, promise) => {
//   // console.log("unhandled rejection");
//   rejects.set(promise, reason);
//   // console.log(rejects);
// });

process.on("rejectionHandled", (promise) => {
  // console.log("rejection has been handled");
  rejects.delete(promise);
  // console.log(rejects);
  setTimeout(() => {
    try {
      throw new Error("some exception");
    } catch (error) {}
  }, 500);
});
setTimeout(() => {
  promise.catch((err) => {});
}, 1000);

// uncaughtExceptions
// for cantching uncaughtException

process.on("uncaughtException", (err, origin) => {
  // console.log(err.message, "this was an", origin);
});

// handling warning events
process.on("warning", (warnings) => {
  console.log(warnings.name);
});

// process.emitWarning("this is a warning");
// Nodejs Warnings Names
const EE = new event.EventEmitter();

process.stdin.resume();
process.on("SIGINT", () => {
  console.log("signal");
});

// abort node processs with .abort()
EE.on("signal", () => {
  console.log("recieved");
  // process.abort();
});

EE.emit("signal");

// check for a list of allowed node flags- 156 flags
// console.log(process.allowedNodeEnvironmentFlags);
// get system architecture
console.log(process.arch);

// return command line args with .argv
// return first element of the argv array with argv0 similar to doing .argv[0]

console.log(process.argv, process.argv0);

// get process channel if process was spawned with ipc
console.log(process.channel);

// changed directory
console.log(process.cwd());

try {
  process.chdir("./assertByExample");
  console.log(process.cwd());
} catch (error) {
  console.log(error.message);
}

console.log("still here");

// check if the process is spawned with an ipc channel, returs a boolean
// process.disconnect();
console.log(process.connected);

// return cpu uptime and and usage*
console.log(process.cpuUsage({ user: 78000, system: 31000 }));

// current working directory
console.log(process.cwd());

// set debugger port using
process.debugPort = 5670;

// disconnect process from ipc channel, make process exit gracefully
console.log("graceful exit...");
console.log(process.connected);
process.disconnect();
console.log(process.connected);

// avoid duplicate warnings, best practice requires warnings to be emitted only once per process

// process.emitWarning("this is a warning", {
//   type: "test warning",
// });

// process.on("warning", function (warning) {
//   console.log("only emit once");

// });

// look at the userEnviroment, .env
// console.log(process.env);

// get flags specified when starting node process, withOut the exectuable, node file name or filepath
console.log(process.execArgv);
// get filePath specified when starting node process, withOut the flags
console.log(process.execPath);

// process.exitCode: exit code pass into process.exit(1||0), .exit() will exit the node process
process.on("exit", () => {
  console.log(process.exitCode);
});
// process.exit(1);

// using .exit is bad because it will abort async operations, and it is usually called internally in node if the event loops is down with pending tasks

// instead of calling .exit() directly set exitCode to 1 to allow process to exit naturally, or if the process is to be terminated due to errors then use the throw mechanism

// process.exitCode = 1;

// to check pending tasks for the eventLoop
// .getActiveResourcesInfo
// console.log(process.getActiveResourcesInfo());

// get nemrical effect groupd identity
console.log(1, process.getegid());
