// error in nodejs.
// 4 types of errors expected
//1. Standard JavaScript errors such as <EvalError>, <SyntaxError>, <RangeError>, <ReferenceError>, <TypeError>, and <URIError>.

//2. System errors triggered by underlying operating system constraints such as attempting to open a file that does not exist or attempting to send data over a closed socket.

//3. User-specified errors triggered by application code.

//4. AssertionErrors are a special class of error that can be triggered when Node.js detects an exceptional logic violation that should never occur. These are raised typically by the assert module.

// All JavaScript and system errors raised by Node.js inherit from, or are instances of, the standard JavaScript <Error> class and are guaranteed to provide at least the properties available on that class.

////////
// error propagation and interception

// Node.js supports several mechanisms for propagating and handling errors that occur while an application is running. How these errors are reported and handled depends entirely on the type of Error and the style of the API that is called.

// All JavaScript errors are handled as exceptions that immediately generate and throw an error using the standard JavaScript throw mechanism. These are handled using the try…catch construct provided by the JavaScript language.

// Throws with a ReferenceError because z is not defined.
try {
    const m = 1;
    const n = m + z;
  } catch (err) {
    // Handle the error here.
    console.log(err.message)
  }

const { error } = require('console');
// Any use of the JavaScript throw mechanism will raise an exception that must be handled using try…catch or the Node.js process will exit immediately.
// throw('throw Mechanism')

// most sync apis that use blocking code. will normally use throw to report an error
// its one way with sync errs

//Most asynchronous methods that accept a callback function will accept an Error object passed as the first argument to that function. If that first argument is not null and is an instance of Error, then if an error occurred it should be handled.

// const fs = require('fs');
// fs.readFile('a file that does not exist', (err, data) => {
//   if (err) {
//     console.error('There was an error reading the file!', err);
//     return;
//   }
//   // Otherwise handle the data
// });

// callbacks errs are handled in the cb fn

// meanwhile Async methods called on instances of EventEmitter, if error are encounted it usaully emits an error event that should be handled

const {EventEmitter} = require('events')

let errEvnt = new EventEmitter()

errEvnt.on('error',(err)=>{
    console.log('an error occured',err.message)
})

errEvnt.emit('error',new Error('error'))

// const net = require('net');
// const connection = net.connect('localhost');

// // Adding an 'error' event handler to a stream:
// connection.on('error', (err) => {
//   // If the connection is reset by the server, or if it can't
//   // connect at all, or on any sort of error encountered by
//   // the connection, the error will be sent here.
//   console.error(err);
// });

// connection.pipe(process.stdout);

// A handful of typically asynchronous methods in the Node.js API may still use the throw mechanism to raise exceptions that must be handled using try…catch. There is no comprehensive list of such methods; please refer to the documentation of each method to determine the appropriate error handling mechanism required.

// The use of the 'error' event mechanism is most common for stream-based and event emitter-based APIs, which themselves represent a series of asynchronous operations over time (as opposed to a single operation that may pass or fail).

// For all EventEmitter objects, if an 'error' event handler is not provided, the error will be thrown, causing the Node.js process to report an uncaught exception and crash unless either: The domain module is used appropriately or a handler has been registered for the 'uncaughtException' event.

const crash = new EventEmitter()

// setTimeout(()=>{
//     crash.emit('error',new Error('errrr'))
// },10000)

// Error-first Callback or err back pattern
// this is used for mostly callback errors
// Most asynchronous methods exposed by the Node.js core API follow an idiomatic pattern referred to as an error-first callback. With this pattern, a callback function is passed to the method as an argument. When the operation either completes or an error is raised, the callback function is called with the Error object (if any) passed as the first argument. If no error was raised, the first argument will be passed as null.

const fs = require('fs')

// fs.readFile('./nowhere/existedNot',(err,data)=>{
//     if(!data || err){
//         console.log(err.message)
//     }
// })

// The JavaScript try…catch mechanism cannot be used to intercept errors generated by asynchronous APIs. A common mistake for beginners is to try to use throw inside an error-first callback:
// this wont work
// tryCatch cant catch async error. By the time async code is called. the tryCatch has alrready been Executed
try{
    fs.readFile('./nowhere/existedNot',(err,data)=>{
        if(data){
            console.log(data)
        }
    })
    
}catch(err){
    console.log(err)
}
// tryCatch is for throw mechanism errs which err thrown with throw
try {
    throw(new Error('an error was thrown'))
} catch (err) {
    console.log(err.message)
}

// ///////
// Error class
// A generic JavaScript <Error> object that does not denote any specific circumstance of why the error occurred. Error objects capture a "stack trace" detailing the point in the code at which the Error was instantiated, and may provide a text description of the error.

// All errors generated by Node.js, including all system and JavaScript errors, will either be instances of, or inherit from, the Error class.


/////////////////////
// new Error(message)
// message <string>

// Creates a new Error object and sets the error.message property to the provided text message. If an object is passed as message, the text message is generated by calling message.toString().
let err = new Error('errMessage')
let err1 = new Error({})
// console.log(err1)

// The error.stack property will represent the point in the code at which new Error() was called.
// console.log(err.stack)

// //////////
// Error.captureStackTrace(targetObj,f(n))
// creates .stack() property on the object to trace errror 
let obj1 = {}
Error.captureStackTrace(this,err)
// console.log(err.stack)


// Errors.stackTraceLimit.
// this specifies the number of stack frames collected by a stack trace
// this value can be updated to any positive js interger
Error.stackTraceLimit = 15
console.log(Error.stackTraceLimit)

//////////////
// when error are emitted they  need to be id. with error.code, devs can classify and identify certain errors by the error.code ths have
const anErr = new Error('find the errCode')
anErr.code

//////////////
// error messages are emitted with the error. the messasge is a detail for the error
console.log(anErr.message)

//////////////
// use error.stack to log the stack frames. the lines that start with 'at'. this shows where in our code the error was generated
// console.log(anErr.stack)

//////////////
// range error. this error occurs when an argument provided is not in the range of accepted values
// require('net').connect(-1)

////////////
// reference error is raised when a non existent variable or function is called
// console.log(notExisting)

//////////
// syntaxErrors are raised when invalid js syntax is used
// for(let i=0,i<5,i++){}


///////
// systemErrors may occur if the application violates the OS constraint s
// like reading files that do not exist 
const files = require('fs')
// files.unlinkSync('./nonExisting path')

///////////
// error.address#<string>
{/* If present, error.address is a string describing the address to which a network connection failed. */}

//////////
// error.dest, path destination when reporting fs err

////////////
//  error.errno: this is a negative number use to describe the error.
// get more info on error codes
// util.getSystemErrorName(error.errno)

// /////////
// error.info
// this is an object that stores details about the error condition

/////////////
// error.path this value holds the invalid path. for fs errors

///////////
// error.port 
// this specifies that the given port is invalid.

/////////
// /error.sysCall
// this is a string that specifies the system call made

///////////////////////////////////
// common system errors
// EACCES(permission denied), accessing restricted files with out permission. Error Access

// EADRINUSE, failed to bind server to port because port is in use. Error Address in use

// ECONNREFUSED, erro from failed connection, because endPoint refused connectivity. Error connection refused

// ECONNRESET, error. connection was forcly closed by peer

// EEXIST (File exists): An existing file was the target of an operation that required that the target not exist.
