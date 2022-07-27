// const {Buffer} = require('buffer')



// // the buffer is use to represent a fixed length sequence of bytes. 
// // the buffer class is a subclass of the js Uint8Array class.
// // node.js apis that support buffer also support the uint8

// // alloc method on buffe creates a zero filled buffer of length n
// // where n is the first param provided
// // the second param is for the value to fill the buffer with.
// // buffer is a fixed length sequence of bytes. the fixed length is 1st arg, the bytes to sequence are the 2nd arg
// // the third arg is the character encoding
// const buffer = Buffer.alloc(5,'a','ascii')

// console.log(buffer.toString())

// ///////////////////////////////////
// // buffers and chars encoding
// // specify encoding when converting buffers to string
// // if none was specified it would default to UTF-8
// // create buffer from array
// const buff = Buffer.from([1,2,3,4,4])
// const buff2 = Buffer.from('helloWorld')

// console.log(buff)
// console.log(buff2)

// // the encoding makes a buffer of our bytes and encodes with either of the provided char encodings.
// // to covert buffer to string specify desired enconding in param.
// // toString('encoding')

// console.log(buff2.toString('ascii'))

// // nodejs supported char encoding.
// // utf8- most common char encoding. consists of multiByte encoded unicode chars

// // utf16le- multiByte encoded chars, unlike utf8 each char in the string is encoded using 2/4 bytes.

// // latin1: 

// // using toString to convert buffers to string using any off the above is called decoding.


// ///////////////////////
// // binary to text encoding. this nworks the opposite the above.
// // converting buffer toString() is called encoding. and converting string to buffer is decoding.
// // support encoding formats.
// // base64
// // base64Url
// // hex/base16

// // buffers and typedArrays// 21/07
// // all buffers are instances of the TypedArray class.
// // all typed array methods are available on buffers
// // however there subtle incompatabilities with them.
// // a specail incompatabilty is that. TypedArray.prototype.slice() creates a copy of the that part of the array, buffer.prototype.slice() doesnt create a copy, it only creates a view. if to slice a buffer use buffer.prototype.subarray()

// // toString() method is only available on buffers.
// // indexOf() method on buffer accepts additional args

// const fBuff = Buffer.from([1,2,3,4])
// console.log(fBuff.buffer)
// console.log(fBuff.byteOffset)
// console.log(fBuff.byteLength)

// // passing buffers into typeArrays, buffers will be interpreted as an array and not a sequence of bytes

// const arr32 = new Uint32Array(fBuff)
// console.log(arr32)

// // passing the bufffers underlying buffer will create a typeArray that shares mememry with the buffer

// const arr3 = new Uint32Array(fBuff.buffer,fBuff.byteOffset)

// // it is possible to make buffer share the same allocation memery as a typeArray
// // use the array.buffer method
// // because they are sharing memory an update to one will affect the other
// const buffArr = Buffer.from(arr3.buffer)
// console.log(buffArr)

// // when turning arrays to buffers. with the .buffer property. it is possible to use only a portions of the buffer by specifying byteOffset and length
// const arrBuff = new Uint32Array([1,2,3,4,5,6,7,8,,9,10])
// const bufe = Buffer.from(arrBuff.buffer,0,5)
// console.log(bufe.length)

// // console.log(arrBuff)

// /////////////////////////////////
// // iterating a buffer.
// const buffLoop = Buffer.from(['1','2','3'])
// for(let i = 0; i < buffLoop.length;i++){
//     console.log(buffLoop[i])
// }


// // class Buffer.
// // buffer class is a global class for dealing with binary data
// // Buffer methods:static
// // .alloc(size,fill,encoding)
// // size = length, should be >0 && < .constants.MAX_LENGTH, must be an int
// // fill = string,int,buffer,array
// // encoding- encoding if filled with strings
// // allocates a new buffer with the specified args
// //
// const allocB = Buffer.alloc(10,'abcd','ascii')
// const allocC = Buffer.alloc(10,1)
// const allocD = Buffer.alloc(10,[1,2,3,4,5])

// // console.log(allocB)
// // console.log(allocC)
// // console.log(allocD)

// // .allocUnsafe // 22.7
// // Allocates a new Buffer of size bytes. If size is larger than buffer.constants.MAX_LENGTH or smaller than 0, ERR_INVALID_ARG_VALUE is thrown.
// // console.log(buffer.constants.MAX_LENGTH)

// // buffers created like this are not initialized. the contents are unknown and can contain sensitive data. the content of the buffer may contain data that the user did not add to the buffer

// const bword = Buffer.allocUnsafe(10).fill('a').
// // the allocBuffer has a chainable fill method. allocUnsafe unlike alloc has accepts onluy one param. 
// // th allocnsafe makes use of the Buffer.poolSize
// // console.log(bword)


// //////////////
// // .allocUnsafeSlow(size)

///////////////
//// buffer.byteLength()
//// arg1: string, arg2: encoding
//// returns the byteLenght of a string. this counts for the encoding use on the string.
const str1 = 'anvjshsjhs'

let len = Buffer.byteLength(str1,'ascii')
console.log(len)

///////////////////////////////////
// Buffer.compare(buf1,buf2)
// this method is used to compare two buffer objects.
// it returns 0/-1 0r 1 depending on the result
const bb1 = Buffer.from('abcd1ascx')
const bb2 = Buffer.from('abcdeaaaxx')
console.log(Buffer.compare(bb1,bb2))

///////////////////////////////////////////////////////////
// buffer.concat(list,len)
// used to join multiple buffers.
// to equal the len specified
// if lentgth not specified the length will be from both buffs
const bb3 = Buffer.concat([bb1,bb2],10)
console.log(bb3.toString())

//////////////////////////////////////////
// buffer.from(array)
// creates a buffer from array of bytes. in the range 0-255. entries above 255 will be trun ed to fit
// onluy accepts arrays or string
// additional args, arg2 bytOffset,length
// byteOffset len specify the memory range within the arrayBuffer that will be share by the buffer
// buffer.from can accept arrays,buffer,strings,objects
const fromm = Buffer.from([1,2,3,4])
const fromm2 = Buffer.from('absdj')
const fromm3 = Buffer.from(Buffer.alloc(10))

const obj = {a:'s'}

////////////////////////
// .from(obj)// 25.7
const obj2 = new Object([1,2,3])
const objBuf = Buffer.from(obj2,'ascii',10)
console.log(objBuf)
console.log(fromm2.toString('latin1'))


////////////////////
// .isBuffer()
// used to check if object is a buffer
// returns a boolean depending on the result
console.log(Buffer.isBuffer(objBuf))

//// .isEncoding()
// checks if an encoding is supported by the buffer instances
console.log(Buffer.isEncoding('ascii'))


//////buff[], the index helps find a byte at a given index. works like an array, cant find indexes less than 0 or more than the buffer length

const strBB = Buffer.from('Nodejs')

console.log(strBB[1])

////////////////////////
// buf.compare()
// arg1: buffer,array intsance
// compares a buffer object to another buffer,typeArray etc

const com1 = Buffer.from([1,2,3,4])
const com2 = Buffer.from([1,2,3,4])
// returns 0 if the same or -1 if not
console.log(com1.compare(com2))

// additional args, arg2:targetStart, ar3:targetEnd, ar4:sourceStart,arg5:sourceEnd



////////////////////////
// buf.copy
// arg1: buffer,array intsance
// copies data in a buffer object to another buffer,typeArray etc

const cop1 = Buffer.from([1,2,3,4])
const cop2 = Buffer.from([])
// returns 0 if the same or -1 if not
cop1.copy(cop2)
console.log(cop2)
// additional args, arg2:targetStart, arg3:sourceStart,arg4:sourceEnd


/////////////
// buf.entries()
// returns an iterator of index:bytes
// like object.entries
for(let pair of cop1.entries()){
    console.log(pair)
}

////////////////////////
// buf.equals(), returns a boolean is bytes in both buffer are identical
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf2));
console.log(buf2.toString())

const buf4 = Buffer.from(buf2)
console.log(buf1.equals(buf4))

//////buf.fill()
// fills  a given buffer with specified content. 
buf4.fill('h')
console.log(buf4.toString())



/////buf.includes checks if a buffer contains certain characters
// returns bool
console.log(buf1.includes('A'))

// buff.indexOf() returns the index of the character specified. if in buffer
console.log(buf1.indexOf('A'))

/// buff.keys iterator, returns keys of indexes in buff
for(let key of cop1.keys()){
    console.log(key)
}

// buff.lastIndexOf(), returns the index of the last occurance in a buffer

console.log(buf1.lastIndexOf('A'))

// buf.length()
// return len of buffer
console.log(buf4.length)


////buf.readBigInt64BE()