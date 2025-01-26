const short = require("short-uuid")
const express = require("express");
const app = express();


const fs = require("fs"); // file system provide by node
const { json } = require("stream/consumers");


// read the json file when where we have our details user
const strContent = fs.readFileSync("./dev-data.json","utf-8");
// json format read from dev-data.json file need to be converted to normal json format from string format
// console.log(strContent);
const userDateStore = JSON.parse(strContent);
// app.get("/api/user", function (request, response){
//     console.log("I am get method")
//     // response.status(200).json({
//     //     status: "success",
//     //     message: "sending response from get method"
//     // })

//     let message = "";
//     if (userDateStore.length === 0) message = "Not user Data";
//     else{
//         message = userDateStore;
//     }

//     response.status(200).json({
//         status: "success",
//         message, //message: message
//     })
// })


app.get("/api/user", function(request, response){

    try{

        console.log("i inside get method");

        if (userDateStore.length === 0)
        {
            throw new Error("no user found");
        }

        else{
            response.status(200).json({
                status: "success",
                message: userDateStore //message: message
            })
        }
    }

    catch(err){
        response.status(401).json({
            status: "failure",
            message: err.message
        })
    }
})

function getUserById(id)
{
    const user = userDateStore.find(user=>{
        return user.id == id;
    })

    if (user === undefined) return "user Not found"
    else return user
}


// template route -> to user data based on user id
app.get("/api/user/:userId", function(request, response){

    try{

        const userParamas = request.params.userId;
        const userDetails = getUserById(userParamas);

        if (userDetails === "user not found") 
        {
                throw new Error(`user with ${userParamas} not found`);
        }
        else{
            response.status(200).json({
                status: "success",
                message: userDetails
            })
        }
    }

    catch(erro)
        {
            response.status(404).json({
                status: "failure",
                message: erro.message
            })
        }
    
})


app.use(express.json()); // to get data from user

app.use(function(req, res, next){ // checklist if we are sending the empty data or not to post method
    if (req.method === 'POST')
    {
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if (isEmpty)
        {
            res.status(404).json({
                status: "failure",
                message: "user details are empty"
            })
        }
        else next()
    }

    else next();
})


app.post("/api/user", function(req, res){
    // console.log("i am inside post");
    const id = short.generate(); // generate new user is when handler funtion is called;
    const userDetails = req.body
    userDetails.id = id;

    userDateStore.push(userDetails); // userDetails will be store in local store 
    // add new data into file 
    const strUserStore  = JSON.stringify(userDateStore);
    fs.writeFileSync("./dev-data.json", strUserStore);

    res.status(200).json({
        status: "success",
        message: "got response from post method"
    })
})

app.use(function(req, res){
    res.status(404).json({
        status: "failure",
        message: "page not found"
    })
})

const port = process.env.PORT || 5001
app.listen(port, function(){
    console.log(`server is running at : ${port} port`)
})