const repl = require("repl");
global.assert = require("assert");

repl.REPLServer(1 + 2);
repl.context = {};
repl.context.m = "message";
console.log("");
