//[27.7:wed] streams are abstract interfaces for streaming data in node js. the stream api makes it so we can implement streams. many node apis makes use of the stream api. std.out,std.err. the http api.

// streams can be readable and writeable. all streams are intsances of the eventEmitter class.

const stream = require('stream')
// we the api we can create ne intances of stream.
// types of streams. write,read,duplex,transform streams.

// streams can be can perform operations mainly on strings and  buffers(uint8Array). streams may also work on other js values except null, null serves a special purpose in the streams api. such streams are considered to operate in 'Object mode'

// object mode must be set when the stream is created

//////////////////////////////////////
//// buffering. 
// all streams : read / write, make use of an internal buffer to store data. how much data a stream can hold depends on the highWater mark option passed into the stream constructor.
// for streams operating normal, HWM(high water mark) will be th e total number of bytes, but in object mode is=t means the total number of objects.

// data is buffered in read streams when the operation stream.push(BitsOfData) this will cause the data to sit in the buffer until stream.read() is called to cosume the data.

// when the HWM is reach the stream stops sending data to the buffer and wait until the buffer is drained or there is memory to continue

// data is also buffered in write streams when the writable.write() is called multiple times and will return true if the HWM is not reached

// .pipe() limits the buffering of data, so that the memory of the destination is not overwhelemed.

// HWM is a threshold not a limit. it indicates the amount of data the buffer can hold at given time.

// duplex and transform streams are both readable and writeable. they make use of both read buffering  and write buffering. and both sides operate independently allowu=ing flow of data. the net.socket implements duplex streams, one can write to the sockect and read from the socket. data might be written faster than it is read or visa vis, so the read and write streams need their own  buffer.


////////////////////////////
/// API for stream consumers
// this an implementation req stream.
const http = require('http')

const server = http.createServer((req,res)=>{
    let incomingData = ''

    req.setEncoding('utf-8')

    req.on('data',(chunk)=>{
        incomingData+=chunk
    })

    req.on('end',()=>{
        try{
            const recieved = JSON.parse(incomingData)

            res.write(typeof recieved)

            res.end()

        }catch(e){
            res.statusCode = 404
            return res.end(`error:${e.message}`)
        }
    })
}).listen(3000,'localhost')