// simple debugger console similar to js console, provided by web browser
// it comprises of two specific components.
// Console class. includes  methods like console.log(),console.error(),console.warn()
// global console instance configured to the stdout and stderr methods on process.
// the global console methods arent consistently synchronous like in the web browser. and it is not consistently async like other streams in node

console.error(new Error('error occured'))
