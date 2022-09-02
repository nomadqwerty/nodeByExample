const fs = require("fs");
import("./ecma.mjs");
console.log(require.main);
console.log(require.cache);
console.log(__dirname);
console.log(__filename);
console.log(process.NODE_PATH);
console.log(exports);
