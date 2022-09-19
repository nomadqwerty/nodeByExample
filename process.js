const process = require("process");

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

const promise = new Promise((resolve, reject) => {
  return reject("A");
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promise);
  console.log("unhandled rejection");
});
