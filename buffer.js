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
const buff = Buffer.from([1,2,3,4,4])
const buff2 = Buffer.from('helloWorld')

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
// a specail incompatabilty is that. TypedArray.prototype.slice() creates a copy of the that part of the array, buffer.prototype.slice() doesnt create a copy, it only creates a view. if to slice a buffer use buffer.prototype.subarray()

// toString() method is only available on buffers.
// indexOf() method on buffer accepts additional args

const fBuff = Buffer.from([1,2,3,4])
console.log(fBuff.buffer)
console.log(fBuff.byteOffset)
console.log(fBuff.byteLength)

// passing buffers into typeArrays, buffers will be interpreted as an array and not a sequence of bytes

const arr32 = new Uint32Array(fBuff)
console.log(arr32)

// passing the bufffers underlying buffer will create a typeArray that shares mememry with the buffer

const arr3 = new Uint32Array(fBuff.buffer,fBuff.byteOffset)

// it is possible to make buffer share the same allocation memery as a typeArray
// use the array.buffer method
// because they are sharing memory an update to one will affect the other
const buffArr = Buffer.from(arr3.buffer)
console.log(buffArr)

// when turning arrays to buffers. with the .buffer property. it is possible to use only a portions of the buffer by specifying byteOffset and length
const arrBuff = new Uint32Array([1,2,3,4,5,6,7,8,,9,10])
const bufe = Buffer.from(arrBuff.buffer,0,5)
console.log(bufe.length)

// console.log(arrBuff)

/////////////////////////////////
// iterating a buffer.
const buffLoop = Buffer.from(['1','2','3'])
for(let i = 0; i < buffLoop.length;i++){
    console.log(buffLoop[i])
}


// class Buffer.
// buffer class is a global class for dealing with binary data
// Buffer methods:static
// .alloc(size,fill,encoding)
// size = length, should be >0 && < .constants.MAX_LENGTH, must be an int
// fill = string,int,buffer,array
// encoding- encoding if filled with strings
// allocates a new buffer with the specified args
//
const allocB = Buffer.alloc(10,'abcd','ascii')
const allocC = Buffer.alloc(10,1)
const allocD = Buffer.alloc(10,[1,2,3,4,5])

console.log(allocB)
console.log(allocC)
console.log(allocD)

// .allocUnsafe // 22.7


