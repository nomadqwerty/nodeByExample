// spawn sub processes with child process API(CP API)

// the CP api is used to spawn mini processes.
const cp = require("child_process");

// spawn.
// const ls = cp.spawn("cmd.exe", ["/c", "my.bat"]);

// ls.stdout.on("data", (data) => {
//   console.log(data);
// });
// ls.stderr.on("data", (error) => {
//   console.log(error.toString("utf8"));
// });

// ls.on("close", (code) => {
//   console.log(`child process closed with code ${code}`);
// });
// ls.on("exit", (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// // exec.
// cp.exec("my.bat", (err, data, error) => {
//   if (!err) {
//     console.log(data);
//   }
//   //   console.log("error err object: ", err);
//   //   console.log("error stderr: ", error);
// });

// TODO:
// script with spaces inbetween.

//
// exec. continiue.
// spawns a shell to execute commands and files
// console.log("comSpec: ", process.env.ComSpec);
// console.log("directory: ", __dirname == process.cwd());

// cp.exec('node "./runThis.js"', {}, (err, stdOut, stdErr) => {
//   if (err) {
//     console.log(stdErr.toString("utf8"));
//   }
//   console.log(stdOut.toString("utf8"));
// });

/////exec file.
// execFile is similar to exec(), this will run files and commands as a new Process.
// setInterval(() => {
//   cp.execFile(
//     "git commit",
//     ["."],
//     { shell: true, encoding: "utf-8" },
//     (err, stdOut, stdErr) => {
//       if (err) {
//         console.log(stdErr);
//       }
//       console.log("executed...");
//       console.log(stdOut.toString());
//     }
//   );
// }, 20000);

//spawn . this method spawns new shell and a new process to execute files and command.

// const subproc = cp.spawn("node ./runThis.js", [], {
//   shell: true,
//   encoding: "utf8",
//   cwd: __dirname,
// });

// //listen to the stdout stream for console logs
// subproc.stdout.on("data", (data) => {
//   console.log("process starting...");
//   console.log(data.toString());
// });
// subproc.on("error", (err) => {
//   console.log("process error...");
//   console.log(err.toString());
// });
// subproc.on("close", () => {
//   console.log("closing process...");
// });

/// fork;
// this is a special usecase of spawn. this type of spawn returns the childProcess object and opens a communication channel(IPC channel) between parent annd child process.
////////////////////////////////
// fork will spawn a whole new node process, so becarefull when using fork
// const child = cp.fork("runThis.js", [], {});

// child.on("close", () => {
//   console.log("closing...");
// });

// child.on("message", (message) => {
//   console.log(message);
// });

///
// options object
// options.detached: this makes it possible for the child to keep running after the parent exits. cant be disabed once set.
// detache a child
// const subproc = cp.spawn("node ./runThis.js", [], {
//   shell: true,
//   encoding: "utf8",
//   cwd: __dirname,
// });

// const sub = cp.spawn("node ./runThis.js", [], {
//   shell: true,
//   encoding: "utf8",
//   cwd: __dirname,
//   // detached: true,
// });

// sub.stdout.on("data", (data) => {
//   console.log("process starting...");
//   console.log(data.toString());
// });
// sub.on("error", (err) => {
//   console.log("process error...");
//   sub.exit(1);
//   console.log(err.toString());
// });
// sub.on("close", () => {
//   console.log("closing process...");
// });
// sub.unref();

//options.stdio
// stdio option makes it possible to modify the pipe thats set between the parent and child process.
// by default listen stderr, stdout and stdin streams by using the stdin,stderr, stdout property on the child process object.
// const sub = cp.spawn("node ./runThis.js", [], {
//   shell: true,
//   encoding: "utf8",
//   cwd: __dirname,
//   // detached: true,
// });

// sub.stdout.on("data", (data) => {
//   console.log("process starting...");
//   console.log(data.toString());
// });
// sub.on("error", (err) => {
//   console.log("process error...");
//   sub.exit(1);
//   console.log(err.toString());
// });
// sub.on("close", () => {
//   console.log("closing process...");
// });
// // sub.unref();

///////////////////////////////////////////////////////////
///// Child Process class.

// const child = cp.execFile('node "runThis.js"', [], { shell: true });

// child.stdout.on("data", (data) => {
//   console.log(data);
// });

// child.on("disconnect", () => {
//   console.log("child disconnected");
// });

// child.on("close", (code, signal) => {
//   console.log(`closing code ${code}, closing signal ${signal}`);
// });

const child_fork = cp.fork("runThisIpc.js", [], {
  stdio: "pipe",
});

child_fork.stdout.on("data", (data) => {
  console.log(data.toString());
});

child_fork.on("message", (message) => {
  console.log(message);
  setTimeout(
    () =>
      child_fork.send("comms good, message recieved", null, {}, (err) => {
        if (err) child_fork.exit(1);
      }),
    1000
  );
});

child_fork.on("spawn", () => {
  console.log("spawned");
});

child_fork.on("exit", () => {
  console.log("child running", child_fork.killed);
});

console.log(child_fork.spawnargs);
console.log(child_fork.signalCode);
console.log(child_fork.spawnfile);
console.log(child_fork.stdio);
console.log(process.pid);

// send message.
