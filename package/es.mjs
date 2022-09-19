import module from "node:module";

console.log(import.meta.url);
const require = module.createRequire(import.meta.url);

// use require in an es module
// console.log(require("fs"));
export default {};
