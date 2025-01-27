const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {PORT, DB_PASSWORD , DB_USER} = process.env
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ycpw657.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


// here our server contact DB by async mode
mongoose.connect(dbUrl).then(function(connection){
    console.log("successfully connected");
}).catch(error => console.log(error));


const userSchemaRules = {
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minlength: 8,
        validate: function(){
            return this.password == this.confirmPassword
        }
    },
    createAt:{
        type: Date,
        default: Date.now(),

    } ,
}
const userSchema = new mongoose.Schema(userSchemaRules);
// this model will have query or syntaxes
const UserModel = mongoose.model("UserModel", userSchema)


async function getAllUser(req, res){
    try{
        
        const userDateStore = await UserModel.find();
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

app.use(express.json());

async function createHandler(req, res){
    try{
        // console.log("post method called")
        const userDetails = req.body;
        // console.log(userDetails)
        // adding user to the DV
        const user = await UserModel.create(userDetails);
        res.status(200).json({
            status: "success",
            message: "added to db",
            user,
        })
    }

    catch(error){
        res.status(500).json({
            status: "failure",
            message: error.message,
        })
    }

    // console.log(req.body);
    // res.status(200).json({
    //     status: "success",
    //     message: "succesfull...............",
    //     b: req.body
    // })
}

async function getSpecifiUser(req, res)
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

app.post("/api/user", createHandler);

app.get("/user", getAllUser);


app.use(function(req, res){
    res.status(200).json({
        status: "sucess",
        message: "working properly use method"
    })
})

app.listen(PORT, function(){
    console.log(`server listing port number: ${PORT}`);
})