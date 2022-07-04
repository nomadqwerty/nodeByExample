const EventEmitter = require('events')

// events are used when a callback needs to be executed multiple times
const myEmmitter = new EventEmitter()

myEmmitter.on('signal',()=>{
    console.log('recieved');
})
myEmmitter.emit('signal')
console.log('on');