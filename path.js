//path module
// thjs moule providexs utilities for working with files and directories.

const path = require("path").win32;

// .basename(path,extension)
const pathPath = path.win32.basename(
  "../nodeByExample/bufferByExample/buffer.js",
  "js"
);

console.log(pathPath);

//.delimiter
// console.log(process.env.PATH.split(path.delimiter));

// path.dirname:
console.log(path.dirname("./bufferByExample/buffer.js"));

// .extNme()
console.log(path.extname("./path.js"));

//.format(pathObj)
let pathObj = {
  dir: "c:\\bufferByExample",
  root: "",
  base: "",
  name: "\\buffer",
  ext: ".js",
};

console.log(path.format(pathObj));

//.isAbsolute()
console.log(path.isAbsolute(path.format(pathObj)));

// .join()

const joinPath = path.join(
  "../../../Desktop/NodeByExample",
  "../nodeByExample/bufferByExample/buffer.js"
);

// .normalise
console.log(path.normalize(joinPath));

// .parse()
// opposite of path.format
console.log(path.parse(joinPath));

// path .realative
const froM = "../../../Desktop/NodeByExample";
const to = "../nodeByExample/bufferByExample/buffer.js";

console.log(path.relative(froM, to));

// .resolve
console.log(
  path.resolve(
    "../../../Desktop/NodeByExample",
    "/bufferByExample/buffer.js",
    "../nodeByExample/"
  )
);

// .sep
console.log(to.split("/"));
console.log(to.split(path.sep));

// .namespace
console.log(path.toNamespacedPath(joinPath));
