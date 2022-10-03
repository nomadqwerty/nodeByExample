// spawn sub processes with child process API(CP API)

// the CP api is used to spawn mini processes.
const cp = require("child_process");

// spawn.
const ls = cp.spawn("cmd.exe", ["/c", "my.bat"]);

ls.stdout.on("data", (data) => {
  console.log(data);
});
ls.stderr.on("data", (error) => {
  console.log(error.toString("utf8"));
});

ls.on("close", (code) => {
  console.log(`child process closed with code ${code}`);
});
ls.on("exit", (code) => {
  console.log(`child process exited with code ${code}`);
});

// exec.
cp.exec("my.bat", (err, data, error) => {
  if (!err) {
    console.log(data);
  }
  //   console.log("error err object: ", err);
  //   console.log("error stderr: ", error);
});

// TODO:
// script with spaces inbetween.

//
// exec. continiue.
console.log("comSpec: ", process.env.ComSpec);
console.log("directory: ", __dirname == process.cwd());

// cp.exec('"./runThis.js"', {}, (err, stdOut, stdErr) => {
//   console.log(stdOut.toString("utf8"));
//   console.log(stdErr.toString("utf8"));
// });

/////exec file.
// execFile is similar to exec(), but it doesnt spwan a shell. it is spawn as a new process.
// cp.execFile(
//   "runThis.js",
//   [],
//   { shell: true, encoding: "utf-8" },
//   (err, stdOut, stdErr) => {
//     if (err) {
//       console.log(stdErr);
//     }
//     console.log(stdOut.toString());
//   }
// );

//spawn . this method spawns new shell and a new process to execute files and command.

const subproc = cp.spawn("node ./runThis.js", [], {
  shell: true,
  encoding: "utf8",
  cwd: __dirname,
});

//listen to the stdout stream for console logs
subproc.stdout.on("data", (data) => {
  console.log("process starting...");
  console.log(data.toString());
});
subproc.on("error", (err) => {
  console.log("process error...");
  console.log(err.toString());
});
subproc.on("close", () => {
  console.log("closing process...");
});
