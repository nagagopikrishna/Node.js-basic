const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const {PORT} = process.env


app.post("/api/user", function (req, res){
    const userDetails = req.body;
    console.log(userDetails);

    res.status(200).json({
        status: "success",
        message: "data recevied"
    })
})

// app.use(function(req, res){
//     console.log(req.body)
//     res.status(200).json({
//         status: "success",
//         message: "response recevied from user"
//     })
// })

app.listen(PORT, function(){
    console.log(`server running at ${PORT}`);
})