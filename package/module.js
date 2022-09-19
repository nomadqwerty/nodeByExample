const moduleApi = require("node:module");
const es = import("./es.mjs");
const require1 = moduleApi.createRequire(module.filename);
const ecm = require("./common");
const fs = require1("fs");

console.log(fs.readFileSync("./write"));
console.log(module.filename);

// console.log(module);
// main entry point