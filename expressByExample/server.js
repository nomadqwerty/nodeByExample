const { application, request } = require('express')
const express = require('express')
const fs = require('fs')

const app = express()

// // define a route 
// app.get('/read',(req,res)=>{})
// app.post('/Create',(req,res)=>{})
// app.patch('/Update',(req,res)=>{})
// app.delete('/Del',(req,res)=>{})

// // app.all to handle all routes and methods.
// app.all('/allHTTPMETHODS',()=>{

// })

// // route params
// // these are like vars. the are used to capture vals in the url. :param
// // once captured the params are stored in request.params obj. so it can be accessed
// // to specify a param in url use /: , this triggers the capture


// // route handlers.
// // the callbacks attached to the method, is responsible for the actions that will happen if the endpoint/url is requested by a client.
// // we can specify multiple handlers, the behave like middleware and require the next() to be called. that way the req is passed to the next handler. 
// // with this method we can set preconditions on a request and do other operations based on the preconditions
// // handlers can be standAlone handler, in arrays of hsndlers or both 
// // always specify next as a param. and call it 
// // always end res-req cycle with res.end()
// app.get('/',(req,res,next)=>{
//     //   do somthn
//     res.end()
// },(req,res,next)=>{
//     //   do andathn
//     console.log('here')
//     next()
// },[(req,res,next)=>{
//     //   array of handler
//     next()
// },(req,res,next)=>{
//     //   array 0f handler
//     res.end()
//     next()
// }])

// // app.route() this function helps use create chainable route handler. if the endpioint requires diff methods.
// app.route('/chain').get((req,res)=>{res.end()}).post((req,res)=>{res.end()})


// // express.Router() is class used for mounting middlewares. it is also equip with a route() method. so it can perform routing operations

// let router = express.Router()
// router.use((req,res,next)=>{
//     res.end()
//     next()
// })

// router.get('/',(req,res,next)=>{
//     console.log('here')
//     res.end()
//     next()
// }).post('/',(req,res,next)=>{
//     res.end()
//     next()
// })

// ///////////////////////
// // creating middlewares.
// // middlewares are basically functions that sit between the sever client request response cycle.
// // ie: client requests =======> middleware()=======> server recieves request
// //     client recieves response <======== middleware() <======== server responds

// // middleware capabilites
// // execute any code,
// // manipulate the request and response objects
// // ends the req res cycle
// // call the next() fucntion

// // the next() is important because when called it executes the next middleware function
// // middleware in practice
// let middleware1 = (req,res,next)=>{
//     // console.log('Logged in bro')
//     next()
// }
// let middleware2 = (req,res,next)=>{
//     req.requestTime = Date.now()
//     console.log(req.requestTime)
//     next()
// }
// let middleware3 = (req,res,next)=>{}



// // we can mount middleware with the app.use() method// app.use(thisMiddleWare())
// // middles functions are called synchronously. the first middleware func mounted will get called first
// // note when mounting middle wares do not call them, they callbacks and will be called by express when it is needed
// app.use(middleware1)

// // .use() can be mounted for certain paths but for all methods
// app.use('/paths',middleware1)
// // also multi midlewares can be mounted
// app.use('/path',middleware1,middleware2,middleware3)

// // if a middleware is route specific it can be mounted on the router too like so:
// // app.get('/url,middleware())
// app.get('/middleware', middleware2,(req,res)=>{
//     res.end()
// })

// // externallyValidateCookie()

// // using middleware()
// // types of middleware in express.
// // 1. app level middleware
// // application middleware are bound to the express app instance
// // this middleware are mainly required by the app. on the topLevel.
// // like middleware for parsing req,cookies,xss protection etc
// // by using app.use() or app.get()'and other http methods put,patch,post,delete.'
// app.use(middleware1)

// // or
// // app.get('/url,middleware())
// // middleware mounted on the http methods, are specific to the methods. and the routes defined on them
// app.get('/middleware', middleware2,(req,res)=>{
//     res.end()
// })

// // to pass task of to the next middlewar func use next(). to byPass all middleware in the middleware stack use next('route').this ends the cycle. 
// app.get('/route',(req,res,next)=>{
//     console.log('bypassing rest')
//     next('route')
// },(req,res,next)=>{
//     console.log('was i bypassed?')
//     next()
// },(req,res,next)=>{
//     console.log('cycle ended')
//     res.end()
// })


// ////////////////////////////
// // router level middleware 
// // this works just like app level middle
// const a_router = express.Router()

// a_router.use(middleware1)
// a_router.use('/path',middleware1)
// a_router.get('/path',middleware1,(req,res)=>{
//     res.end()
// })

// // use next('route') to skip. jst like in app level

// // error handling middleware. 
// // error handling middlerware works like any other middle but it accepts one more param. which is the error.

// const errorMid = (err,req,res,next)=>{
//     console.log(err.stack)
//     res.status(500).send('try again!!!')
// }

// // express error handling. 
// // this refers to the express error handling mechanisms.
// // express has a default handler. 
// // catching handlers
// // sync error are hanlded by express. this errors occur in the hanlder.
// app.get('/errorTest',(req,res,next)=>{
//     throw(new Error('app error'))
// })

// // async error are hanlded by passing err into the next param.
// // by passing a val into next() besides 'route', is interpreted as an error.
// app.get('/file',(req,res,next)=>{
//     fs.readFile('/nowhere',(err,data)=>{
//         if(err) next(err)
//         else res.send(data)
//     })
    
// })


// //////////////
// // default error handling
// // if error is sent to next() with outbeign handled by constum handler , express will handle it and return a stackTrace back to client in dev mode, but in prod mode
// // express crafts the response obj as
// // 1. res.statuscode:500,
// // 2. res.statusMessage:
// // if next is called with an error, but u are already streaming data to tghe client, express closes the connection and fails the request.

// ////////
// // how to write error handlers. then middlerware acts jxt like any othe r middleware. but instead of 3 args its 4 including the err arg

// const errMid = (err,req,res,next)=>{
//     console.log(err.stack,'errt')
//     next(err)
//     res.status(500).send('error encountered')
// }
// app.get('/errorMid',errMid)


// /////////////////////////////////////
// // debugging express apps
// // express the nodejs debug api, to nlog info about route matches, middlewares,appmode, req res cycle
// // to see the internal logs use DEBUG=express:* node file.js

// //app.param
// // this is used to register params and their callback functions. \
// // params work like variable whose values are stored in req.param object on the req object.
// // .param() has two args , name('name of param variable, should be type of sting') and a callback function that will be called when the param var are given values from the incoming requests url.
// // name can be an array,[] this species multiple params. the callback function will be called for each param in the array. 
// // if each param has a specific callback function then inside each callback function call the next() so the next callback will be called. this should not be done in the last callback function, unless you want the rew res cycle to continue.


app.get('/req/:param',(req,res,next)=>{
    console.log('didnt get it')
    next()
})

/// params() will be called before any handler.
app.param('param',(req,res,next)=>{
    console.log('params')
    next()
})
app.get('/req/:param',(req,res,next)=>{
    console.log('me neither')
    res.end('lollzz')
})

app.listen(3000,()=>{
    console.log('server on')
})
