const express = require("express");
const short = require("short-uuid");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const fs = require("fs");
const { EOF } = require("dns");
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDateStore = JSON.parse(strContent);


function getAllUser(req, res){
    try{
        
        if (userDateStore.length === 0) throw new Error("user Not found");
        else
        {
            res.status(200).json({
                status: "success",
                message: userDateStore
            })
        }
    }
    catch(error)
    {
        res.status(404).json({
            status: "failure",
            message: error.message,
        })
    }
}

function getUserDetails(id)
{
    const user = userDateStore.find((user) =>{
        return user.id === id
    })

    if (user === undefined) return "User Not Found";
    else return user
}

function getSpecifiUser(req, res)
{
    try{
        const Id = req.params.userId;
        console.log(Id)
        const userDetails = getUserDetails(Id);

        if (userDetails === "User Not Found") throw new Error(userDetails);
        else{
            res.status(200).json({
                status: "success",
                message: userDetails
            })
        }
    }

    catch(error)
    {
        res.status(404).json({
            status: "failure",
            message: error.message
        })
    }
}

app.use(express.json());


async function createHandler(req, res)
{
    const details = req.body;
    const user = await UserModel.create()
    const id = short.generate();
    details.id = id

    userDateStore.push(details);

    const strContent = JSON.stringify(userDateStore);
    fs.writeFileSync("./dev-data.json", strContent);

    res.status(200).json({
        status: "success",
        message: "got resonse from post method"
    })

}
app.use(function(req, res, next){
    if (req.method === "POST")
    {
        const details = req.body;
        const isEmpty = details.length === 0;
        if (isEmpty)
        {
            res.status(404).json({
                status: "failure",
                message: "not get any response from post method"
            })
        }
    }

    next();
})
app.post("/user", createHandler)


app.get("/user", getAllUser)
app.get("/user/:userId", getSpecifiUser)


/********** helper function  ***********/

app.use(function(req, res){
    res.status(404).json({
        status: "failure",
        message: "page not found"
    })
})

// app.use(function(req, res){
//     res.status(200).json({
//         status: "success",
//         message: "i am in use method"
//     })
// })

const port = process.env.PORT
app.listen(5001, function(){
    console.log(`servering running at port number: ${port} day-3`)
})