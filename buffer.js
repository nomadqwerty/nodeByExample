const {Buffer} = require('buffer')



// the buffer is use to represent a fixed length sequence of bytes. 
// the buffer class is a subclass of the js Uint8Array class.
// node.js apis that support buffer also support the uint8

// alloc method on buffe creates a zero filled buffer of length n
// where n is the first param provided
// the second param is for the value to fill the buffer with.
// buffer is a fixed length sequence of bytes. the fixed length is 1st arg, the bytes to sequence are the 2nd arg
// the third arg is the character encoding
const buffer = Buffer.alloc(5,'a','ascii')

console.log(buffer.toString())

///////////////////////////////////
// buffers and chars encoding
// specify encoding when converting buffers to string
// if none was specified it would default to UTF-8
// create buffer from array
const buff = Buffer.from([1,2,3,4,4],'base64')
const buff2 = Buffer.from('helloWorld','ascii')

console.log(buff)
console.log(buff2)

// the encoding makes a buffer of our bytes and encodes with either of the provided char encodings.
// to covert buffer to string specify desired enconding in param.
// toString('encoding')

console.log(buff2.toString('ascii'))

// nodejs supported char encoding.
// utf8- most common char encoding. consists of multiByte encoded unicode chars

// utf16le- multiByte encoded chars, unlike utf8 each char in the string is encoded using 2/4 bytes.

// latin1: 

// using toString to convert buffers to string using any off the above is called decoding.


///////////////////////
// binary to text encoding. this nworks the opposite the above.
// converting buffer toString() is called encoding. and converting string to buffer is decoding.
// support encoding formats.
// base64
// base64Url
// hex/base16

// buffers and typedArrays// 21/07
// all buffers are instances of the TypedArray class.
// all typed array methods are available on buffers
// however there subtle incompatabilities with them.