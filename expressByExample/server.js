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
    next()
},(req,res,next)=>{
    //   do andathn
    res.end()
    next()
},[(req,res,next)=>{
    //   array of handler
    res.end()
    next()
},(req,res,next)=>{
    //   array 0f handler
    res.end()
    next()
}])

// app.route() this function helps use create chainable route handler. if the endpioint requires diff methods.
app.route('/chain').get((req,res)=>{res.end()}).post((req,res)=>{res.end()})


// express.Router() is class used for mounting middlewares. it is also equip with a route() method. so it can perform routing operations







app.listen(3000,()=>{
    console.log('server on')
})
