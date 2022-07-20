const { application, request } = require('express')
const express = require('express')

const app = express()

// define a route 
app.get('/read',(req,res)=>{})
app.post('/Create',(req,res)=>{})
app.patch('/Update',(req,res)=>{})
app.delete('/Del',(req,res)=>{})

// app.all to handle all routes and methods.
app.all('/allHTTPMETHODS',()=>{

})

// route params
// these are like vars. the are used to capture vals in the url. :param
// once captured the params are stored in request.params obj. so it can be accessed
// to specify a param in url use /: , this triggers the capture


// route handlers.
// the callbacks attached to the method, is responsible for the actions that will happen if the endpoint/url is requested by a client.
// we can specify multiple handlers, the behave like middleware and require the next() to be called. that way the req is passed to the next handler. 
// with this method we can set preconditions on a request and do other operations based on the preconditions
// handlers can be standAlone handler, in arrays of hsndlers or both 
// always specify next as a param. and call it 
// always end res-req cycle with res.end()
app.get('/',(req,res,next)=>{
    //   do somthn
    res.end()
},(req,res,next)=>{
    //   do andathn
    console.log('here')
    next()
},[(req,res,next)=>{
    //   array of handler
    next()
},(req,res,next)=>{
    //   array 0f handler
    res.end()
    next()
}])

// app.route() this function helps use create chainable route handler. if the endpioint requires diff methods.
app.route('/chain').get((req,res)=>{res.end()}).post((req,res)=>{res.end()})


// express.Router() is class used for mounting middlewares. it is also equip with a route() method. so it can perform routing operations

let router = express.Router()
router.use((req,res,next)=>{
    res.end()
    next()
})

router.get('/',(req,res,next)=>{
    console.log('here')
    res.end()
    next()
}).post('/',(req,res,next)=>{
    res.end()
    next()
})

///////////////////////
// creating middlewares.
// middlewares are basically functions that sit between the sever client request response cycle.
// ie: client requests =======> middleware()=======> server recieves request
//     client recieves response <======== middleware() <======== server responds

// middleware capabilites
// execute any code,
// manipulate the request and response objects
// ends the req res cycle
// call the next() fucntion

// the next() is important because when called it executes the next middleware function
// middleware in practice
let middleware1 = (req,res,next)=>{
    console.log('Logged in bro')
    next()
}
let middleware2 = (req,res,next)=>{
    req.requestTime = Date.now().toLocaleString()
    console.log(req.requestTime)
    next()
}
let middleware3 = (req,res,next)=>{}



// we can mount middleware with the app.use() method// app.use(thisMiddleWare())
// middles functions are called synchronously. the first middleware func mounted will get called first
app.use(middleware1)

app.get('/middleware', middleware2,(req,res)=>{
    res.end()
})





app.listen(3000,()=>{
    console.log('server on')
})
