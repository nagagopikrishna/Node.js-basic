// import express 

const express = require("express");
// syntax -> used to create an express framework
const app = express();

// these line is the reason that the server is working
// port number is address for server (ex similart home address number)
// Nodemon is 

// server is run on port 5001

/****
 * app.use -> a method to communicate -> express
 * we are pass handle or callback function
 * it accept two object 
 * 1. req: object respresting request
 * 2. res: object respresting response
 * 3. this method irrespective of the call done by either get/ post / ect this will response
 * 
 * app.use is universal
 * *************/

// app.use(function (request, response, next){
//     console.log("before", request.body);
//     next()
// })


// to get the details from request
// it is inbuilt middleware => to get data comming in body of HTTP request to req.body

// inbuilt, userdefine , thirdparty => type of middleware
// app.use(express.json()); // => to get frontend data part

// app.use(function (request, response, next){
//     console.log("After", request.body);
//     console.log("i will called everytime")
//     next()
// })

app.use(express.json());

app.post("/api/user", function (request, response){
    console.log("i am inside post method", request.body);
    response.status(200).json({
        status: "success",
        message: "seding response from post method"
    })
})

// this is user defined middleware

// app.use(function cd(request, response, next){
//     // response.status(400).json({
//     //     status: 'failure',
//     //     message: 'route not found'
//     // })

//     console.log("i will called everytime")
//     next();
// })


// when someone makes a get request on the route api/user, the hanler will be executed

// app.get("/api/user", function (request, response){
//     console.log("I am in get method");
//     response.status(200).json({
//         status: 'success',
//         message: 'sending response from get method'
//     })
// })



// process.env.PROT => this search for .env file in the code server itself
// node --env-file =>  port value // commant to find detials in env file of project
// .env file are used in the project to just store important details -> Port, api keys

const port = process.env.PORT || 5001
app.listen(port, function(){
    console.log(`server is listening at port: ${port}`)
})