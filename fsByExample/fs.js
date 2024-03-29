// 3.8 wednesday.
// fs- file system. this api enables interaction with the os fileSystem.
// the fs has promise based api and a callback based api.
// the api also has a synchronous implementation.
const fs = require('fs');
const fsPromise = require('fs').promises;

// use the promise API with the await key word. with tryCatch for error handling
// const getData = async ()=>{
//     try {
//         let data = await fsPromise.readFile('./wrtie.txt','utf-8')
//         console.log(data)
//         return data
//     } catch (error) {
//         console.log(error.message)
//     }
    
// }
// getData()

// // fs with callbacks
// // this type accepts a callback. the callback is called asynchronous after the specified path has been located. the callback uses the err back pattern. which is for all callbacks the first arg is the error. this is needed to handle and catch errors.
// let info = fs.readFile('./wrtie.txt',(err,data)=>{
//     console.log(data.toString('utf-8'))
// })

// // the callback method outperforms the promise method. in memory and time.

// // synchronous methods.
// // this is a blocking method. it halts execution until the operation is perform.
// let text = fs.readFileSync('./wrtie.txt','utf-8')
// console.log(text)


// /////////////////////////////////////
// // Class: FileHandle. this is an object wrapper for numeric file descriptor. they instances of eventEmitters.

// // if a FH is not closed using filehandle.close(), the file is close automatically. the file needs to be closed to prevent memeory leaks.
// FH FileHandle
const FH = require('fs')

// // event:Close. 
// // the close evnt is emitted when a file is closed.
// FH.close(1,()=>{})

// FH.open('close',()=>{
//     console.log('closed')
// })


// ///
// // FH(fileHandle)
// // .appendFile is used to append data to a file
// FH.appendFile('./wrtie.txt','add this data',(err)=>{
//     if(!err){
//         console.log('done')
//     }
    
// })

// // .chmod()
// // modifies permission on a file.
// FH.chmod('./wrtie.txt',077,(err)=>{
//     if(err)console.log(err.message)
// })

// // FH.chown()

// // file streaming. read
// FH.createReadStream('./wrtie.txt',{
//     encoding:'utf-8',
//     autoClose:true,
//     emitClose:true,
//     highWaterMark: 64*1024
// })

// // write stream
// FH.createWriteStream('./wrtie.txt',{
//     encoding:'utf-8',
//     autoClose:true,
//     emitClose:true,
// }).on('error',(err)=>{
//     console.log(err.message)
// })

// // exists- check if a file exists.
// FH.exists('./wrtie.txt',(exist)=>{
//     if(!exist){
//         console.log('file no dey my guy')
//     }else{
//         console.log('file dey here')
//     }
// })

// FH.stat('./wrtie.txt',err=>console.log(err))

// FH.futimes(0,new Date(), Date.now(),(err)=>{
//     if(err)console.log(err.message)
// })

// // get file stats.
// let stats = FH.lstat('./wrtie.txt',{
//     bigint:false
// },(err,data)=>{
//     // if(!err)console.log(data)
// })

// // create directory
// FH.mkdir('./direct',{recursive:true},(err)=>{
//     if(err)console.log(err.message)
// })

// //open file
// FH.open('./wrtie.txt','r',(err)=>{
//     if(!err){
//         console.log('file open')
//         FH.writeFile('./wrtie.txt','this is how to open a file',(err)=>{
//             console.log('done')
//         })
//     }
//     else{
//         console.log(err.message)
//     }
// })

// // open directory.
// FH.opendir('./direct',{encoding:'utf-8',bufferSize:50},(err,dir)=>{
//     console.log(dir)
// })

// // read dir
// FH.readdir('./bufferByExample',{encoding:'utf-8'},(err,dir)=>{
//     console.log(dir)
// })


// FH.readlink('./wrtie.txt',{encoding:'utf-8'},(err,linkStr)=>{
//     // console.log(linkStr)
// })

// FH.realpath('./wrtie.txt',{encoding:'utf-8'},(err,linkStr)=>{
//     console.log('pathTo:',linkStr)
// })

// FH.rename('./wrtie.txt','write.txt',(err)=>{
//     if(err)console.log(err.message)
// })


// FH.symlink('./wrtie.txt','./wrote.txt',(err)=>{
//     console.log(err)
// })

// FH.truncate('./wrtie.txt',(err)=>{
//     if(err)console.log(err.message)
//     console.log('trunced')
// })

// FH.unlink('./wrtie.txt',(err)=>{
//     if(err){
//         console.log('done')
//     }
// })

// // a+
// FH.readFile('./nuShii',{encoding:'utf-8',flag:'a+'},(err)=>{
//     if(err)console.log(err.message)
//     console.log('file created')
// })
// FH.readFile('./wrtie.txt',{encoding:'utf-8',flag:'a+'},(err)=>{
//     if(err)console.log(err.message)
//     console.log('file created')
// })

// // FH.unwatchFile('./write.txt')

// FH.utimes('./nuShii.txt',Date.now(),new Date().getDay(),err=>!err?'no error':err.message)

// FH.writeFile('./wrtie.txt','this file was recreated',{encoding:'utf-8'},(err)=>{
//     if(err)console.log(err.message)
// })

////////////
// class: fs.Dir

// const {Dir} = require('fs')

// const dir = FH.opendir()

FH.Stats('./',(err,stats)=>{
    console.log(stats)
    if(err){
        console.log(err.message)
    }
})