// process.send("i will disconnect....");
// console.log(process.channel);
// process.disconnect();
// console.log(process.connected);

// console.log("child id:", process.pid);
// console.log("parent id:", process.ppid);
// setTimeout(() => {
//   process.kill();
// }, 10000);
// process.unref();:use unref if parent process should not wait for child process to finish operation.
// setTimeout(() => {
//   console.log("operation finished");
//   process.exit(1);
// }, 3000);

// send messages:
// listen to messages with the message event, send messsage to parent with process.send(in child module).
process.on("message", (message) => {
  console.log(message);
  process.exit(1);
});

// send to parent.
process.send("testing communication", null, {}, (err, data) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
});

// signalCode
console.log(process.execPath);
