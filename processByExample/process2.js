const process = require("node:process");

// set callback to handle uncaught exceptions, exactly like listening to the uncaughtException event.
// process.setUncaughtExceptionCaptureCallback((err) => {
//   console.log(err.message);
// });

// //hasUncaughtExceptionCaptureCallback()
// // returns a bool if uncaughtExceptionCaptureCallback is set
// console.log(process.hasUncaughtExceptionCaptureCallback());

// get high resolution time in node
// console.log(process.hrtime());

// pid: process identifier
// console.log(process.pid);

// // process.kill, will abort a specified process.
// // pass in the process id of process to abort
// // process.kill(process.pid);

// // get mainModule object
// console.log(process.mainModule.path);

// // get details on the memory usage of a node process
// console.log(process.memoryUsage.heapTotal);

// // add callback to the next tick queue of callbacks
// const fN = () => {
//   setTimeout(() => {
//     console.log("times up");
//   }, 3000);
// };

// process.nextTick(() => {
//   fN();
//   console.log("next Tick");
// });

// microtask vs nextTick
// this apis are used to defer callbacks to be added to the nextTick queue to be executed later. this lines up tasks for eventloop, the nextTick queue has priority over the microTask queue and the callback queue.

// callback queue
setTimeout(function () {
  console.log("3");
});

//nextTick;
process.nextTick(
  (a, b) => {
    console.log("1");
    console.log(a, b);
  },
  "A",
  "B"
);

// microtask/ promise queue
queueMicrotask(() => {
  console.log("2");
});

// nextTick allows passing additional args. for the deffered function in specified

//check if deprecation warnings are turned off
console.log(process.noDeprecation);

// check the OS which node is currently running on.
console.log(process.platform);

//  get process id from a parent process, when in a child process.
console.log(process.ppid);

// check node release which is in use.
console.log(process.release);

// get methods used for generating diagnostic reports
// console.log(process.report);

// .compact specify if reports should compact one liners
console.log((process.report.compact = true));

// get the directory a report is written too
console.log(process.report.directory);

// get the file a report is written too
console.log(process.report.filename);

// get full diagnostic report. reports are used for debugging error, so the generate a report create an error object
// console.log(process.report.getReport(new Error("report this")));

// generate report when:
// setting to true will generate a report object when either occirs in a process
// there is fatal Error
// process.report.reportOnFatalError = false;
// // there is an uncaught exception
// process.report.reportOnUncaughtException = false;
// // there is a report signal
// process.report.reportOnSignal = false;

// trigger report with signals. using
// process.report.signal = "SIGNAL";

// write report object to a file or to the terminal.
// process.report.writeReport(
//   "./processReport.txt",
//   new Error("report to a file")
// );
// process.report.writeReport(process.stdout, new Error("report to a file"));

// if ever want to know about the resource the process is using use the
// console.log(process.resourceUsage());

// console.log(process.stderr.fd);
// console.log(process.stdin.read());
// process.stdin.pipe(process.stdout);

// process throw deprication
// set to node to either throw the warning or not. True or False
// process.throwDeprecation = false;

//print stack trace of deprecation warnings
process.traceDeprecation = true;

process.emitWarning("test", "DeprecationWarning");

// get the title of a process
console.log("title: ", process.title);

//check how long a node process has been Running
console.log("node process uptime: ", process.uptime());

// check node versions
console.log("node version: ", process.version);

// check version of nodejs core dependencies
console.log("node dependencies versions: ", process.versions);

// exit codes 1-14
// process.exit();
