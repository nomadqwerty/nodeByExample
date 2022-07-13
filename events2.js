const events = require('events')

const EventEmitter = events.EventEmitter

const EE = new EventEmitter()
let cb = ()=>{
    // console.log('here')
}
EE.on('signal',cb)

// getEventListeners
// array of callbacks assoiciated to an event
let EL = events.getEventListeners(EE,'signal')
// console.log(EL)
EE.emit('signal')

// events.once()
// async handle for events that return promises
const run = async function(){
    // EE instance
    const ee = new EventEmitter()

    process.nextTick(()=>{
        ee.emit('fire')
    })
    const val = events.once(ee, 'fire')

    console.log(val)

    const err = new Error('kaboom')

    process.nextTick(() => {
      ee.emit('error', err);
    });
  
    try {
      await once(ee, 'myevent');
    } catch (err) {
      console.log('error happened', err);
    }
}
