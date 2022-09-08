// ecma modules
// standard javasript way to package reusable code
// uses import export statements

import common from "./common.js";
import assert from "assert";
import module from "module";

const es = await import("./es.mjs");

// const require = async (path) => {
//   return await import(path);
// };
// const fs = await require("fs");

//import specifiers are string after from keyword
const essPath =
  "file:///C:/Users/davex/OneDrive/Desktop/2ndSemester/Node/nodeByExample/es.mjs";
console.log(import.meta.url);
const ess = module.createRequire(essPath);

// console.log(fs.readFileSync("./write.txt").toString());
//es vs common.js
console.log(ess);
