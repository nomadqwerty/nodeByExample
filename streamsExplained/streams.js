//[27.7:wed] streams are abstract interfaces for streaming data in node js. the stream api makes it so we can implement streams. many node apis makes use of the stream api. std.out,std.err. the http api.

// streams can be readable and writeable. all streams are intsances of the eventEmitter class.

const {Writable,stream} = require('stream')
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
const { write } = require('fs')

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

// writable. streams like res expose methods like write() and end().
// its used to write data to stream.

// both read and write are instances of eventemitter class. this makes it possible to communicate to the app.


/////////////////////////////////////////
// writable streams. 
// this streams are used to write data to a destination.
// examples are, http req on client and http res on server,fswriteStream,zlib etc.

// all writable streams are instances of Writable class.

// class: stream.Writable. has some event will be emitted when certain operations are performed.

// Event:'close'
// the close event is emitted when the stream is closed and no more operation will be performed by the stream.

// event:'drain'
// the drain event is emmitted .write(data) method returns false. this is emiited when it is okY TO resume writing data.

// event:'error', this is emitted when an error occurs while writing data to the stream. this will close the stream

// event:'finish', this is emitted when the stream.end() method is called. and all data has been written to the destination.

const Write = new Writable()

// .cork method forces all written data to buffered to memory. bufffer will be flushed if .end() is called and .uncork() is called. 
Write.cork()

// .uncork method flushhed data stored in buffer. for the amunt of time .cork is called, uncork should be called. if cork is called twice so should oncork
Write.uncork()

// .destroy method, this is called to destroy the stream. it emitts an error event.

Write.destroy(new Error('stream blew up'))


// destroying a stream twice would raise an error.
Write.destroy(new Error('stream disconnected'))

Write.on('error', (err)=>{
console.log(err.message)
})

//.destroyed returns a boolean indicating whether the stream was destroyed

console.log(Write.destroyed)

//.end() is called when the stream is done writing or data has be written to destination completely.
const fs = require('fs');

const wri = fs.createWriteStream('./wrtie.txt')
wri.write('hello ')
wri.end('nodejs')

// .setDefaultEncoding(encoding) will set default encoding to what ever format was specified in arg.

let writeEn = new Writable()

writeEn.setDefaultEncoding('ascii')

// .wriable will return a bool indicating the stream is still active and not destroyed or errored out

//.wrtableEnded 


// Readable streams. this type of stream pulls data from a source, opposite of writable streams.
// two modes are supported by readable streams: flow mode and pause mode.
// flow mode, pulls data from a source and provides it to our node app.
// pause mode, data can only be pulled when, .read() is called


// all read streams are in paused mode initially, by calling .resume(),.pipe() or listening to the data event, we then switch to flow mode.

// the reading stream can be switch back to pause by calling. .pause(), .unpipe()

// note- readable streams wont generate data if the is no mechanism to consume or ignore the data.


///////////
// three states. the two modes are abstraction of the lowlevel internal state management that occurs when readable streams are implemented. 
// the stream states that read streams exist in:
// 1. readable.readableFlowing === null|| false || true
// when its null no mechanism for consuming data is provided.
// when its true, the data event is attached, or .pipe() is used or .resume() is called
// when its false, the close/end event attached, .unpipe() or .pause() is called. when false data may be stored in the internal buffer.

// chose one Api style. there are multiple styles for consuming streams and we devs should pick one events, class Methods and pipe(), pipe is recommended because it offers a high level of abstraction than the other two.

// read stream events.
// 'close'- this is emiited to signal that the stream/file Descriptor has closed and no more operation and events will occur

// 'data'- this event is emmited when the stream is sending data to a consumer. the 'data' evnt occurs when a stream is switch into flow mode. 'data' eventlistenrs,.pipe(),.resume(),etc will switch to flow mode and emite data events.

// 'end ' - this event is called when there is no more data to be read. in otherwords all readable data has been read.

// 'error' - this events is signalled when an error occured while reading the data from source.

// 'pause' - this is emitted when .pause() is called.

// 'readable' - this event is emitted when there is new data to be read and when the stream has reached the end. if the end of the stream is reached called .read() will trigger the 'end' and return null. the readable event may sometime send data to the internal buffer.