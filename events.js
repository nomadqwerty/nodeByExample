const EventEmitter = require('events')

// events are used when a callback needs to be executed multiple times

// instance of event emmitter class
const myEmmitter = new EventEmitter()

// attach an event listerner with .on() or .addListener()
myEmmitter.on('signal',(data)=>{
    // run cb f(n) when signal is detected
    // the this key word doesnt point to the EventEmiiter but rather the instance inwhich .on() was used
    setImmediate(()=>{
        console.log('async evnt listener')
    })
    setTimeout(()=>{
        console.log('times execution')
    },1000)
    console.log('recieved',data,this==EventEmitter,this === myEmmitter);
})
console.log('on');

myEmmitter.once('signal',()=>{
    console.log('happens once')
})
// similate an signal BC
// can pass additional params into emit()
myEmmitter.emit('signal','hello')

// eventemitter are usaully synchronius to ensure code runs sequentially and to avoid race conditions and logic error

// switch between sync and async using setImmediate. this tells takes it off the thread of execution and moves it to the eventloop to be handled async

// can make the listener respond once to an event
// setInterval(() => {
//   myEmmitter.emit('signal','hi')  
// }, 1000);