const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const {PORT, DB_USER, DB_PASSWORD} = process.env;
const app = express();
const UserModel = require("./UserModel")
const ProductModel = require("./ProductModel");

const {getAllFactory, createFactory, getByIdFactory, deleteByIdFactory} = require('./utility/crudFactory');


const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ycpw657.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbUrl).then(function(connection){
    console.log("connection successs")
}).catch((error) => console.log(error));




/************User******************/
// const getAllUser = async function (req, res){
//     try{
//         console.log("i am in get method");
//         const userDataStore = await UserModel.find();
//         if (userDataStore.length === 0) throw new Error("No User Found");
//         else 
//         {
//             res.status(200).json({
//                 status: "success",
//                 message: userDataStore
//             })
//         }
//     }

//     catch (error){
//         req.status(404).json({
//             status: "failure",
//             message: error.message
//         })
//     }
// }


// const getUserById = async function (req, res){
//     try{
//         const id = req.params.id;
//         const userDataStore = await UserModel.findById(id);
//         if (userDataStore.length === 0) throw new Error(`user with ${id} not found`);
//         else
//         {
//             res.status(200).json({
//                 status: "success",
//                 message: userDataStore
//             })
//         }
//     }

//     catch (error){
//         res.status(404).json({
//             status: "failure",
//             message: error.message
//         })
//     }
// }




app.use(express.json());// to get data from user

const checkPoint = function(req,res,next){// checklist if we are sending the empty data or not to post method
    if(req.method == "POST"){
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"user Details are empty"
            })
        }else{
            next()
        }
    }else{
        next();
    }
}

// const createUserHandler =  async function (req,res){
//     try{
//      const userDetails = req.body;
//      console.log(userDetails);
//      //adding user to the DB
//      const user = await UserModel.create(userDetails);
//      res.status(200).json({
//          status:"success",
//          message:`added the user`,
//          user,
//      })
//     }catch(err){
//      res.status(500).json({
//          status:"failure",
//          message:err.message
//      })
//     }
//  }


// const deleteByUserId = async function(req, res){
//     let {userId} = req.params;
//     console.log(userId)
//     try{
//         let user = await UserModel.findByIdAndDelete(userId);
//         res.status(200).json({
//             status: "successfully deletion",
//             message: user,
//         })
//     }

//     catch (error){
//         res.status(404).json({
//             status: "failure",
//             message: `user with id: ${userId} not found to delete`
//         })
//     }
// }



/************product************/

// const createProductHandler = async function (req,res){
//     try{
//      const ProductDetails = req.body;
//      console.log("product handler")
//      //adding user to the DB
//      const product = await ProductModel.create(ProductDetails);
//      res.status(200).json({
//          status:"success",
//          message:'added the Product',
//          product,
//      })
//     }catch(err){
//      res.status(500).json({
//          status:"failure",
//          message:err.message
//      })
//     }
//  }



// const getAllProduct = async function (req, res){
//     try{
//         console.log("i am in get method");
//         const productDataStore = await ProductModel.find();
//         if (productDataStore.length === 0) throw new Error("No User Found");
//         else 
//         {
//             res.status(200).json({
//                 status: "success",
//                 message: productDataStore
//             })
//         }
//     }

//     catch (error){
//         req.status(404).json({
//             status: "failure",
//             message: error.message
//         })
//     }
// }



// const getProductById = async function (req, res){
//     try{
//         const productId = req.params.productId;
//         console.log(productId);
//         const productDataStore = await ProductModel.findById(productId);
//         if (productDataStore.length === 0) throw new Error(`product with ${productId} not found`);
//         else
//         {
//             res.status(200).json({
//                 status: "success",
//                 message: productDataStore
//             })
//         }
//     }

//     catch (error){
//         res.status(404).json({
//             status: "failure",
//             message: error.message
//         })
//     }
// }



// const deleteProductById = async function(req, res){
//     let {productId} = req.params;
//     // console.log(userId)
//     try{
//         let product = await ProductModel.findByIdAndDelete(productId);
//         res.status(200).json({
//             status: "successfully deletion",
//             message: product,
//         })
//     }

//     catch (error){
//         res.status(404).json({
//             status: "failure",
//             message: `Product with id: ${productId} not found to delete`
//         })
//     }
// }







// all controller function


// const getAllFactory = function (ElementModel)
// {
//     return async function (req, res){
//         try{
//             console.log("i am in get method");
//             const elementDetails = await UserModel.find();
//             if (elementDetails.length === 0) throw new Error("No Element Found");
//             else 
//             {
//                 res.status(200).json({
//                     status: "success",
//                     message: elementDetails
//                 })
//             }
//         }
    
//         catch (error){
//             res.status(404).json({
//                 status: "failure",
//                 message: error.message
//             })
//         }
//     }
// }


/****** User ********/
const getAllUser = getAllFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const createUserHandler = createFactory(UserModel);
const deleteByUserId = deleteByIdFactory(UserModel);

/**** products ****/
const createProductHandler = createFactory(ProductModel);
const getAllProduct = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

/**********Routes**********/
/******************Users ***************************/
app.post("/user", checkPoint, createUserHandler);
app.get("/api/user", getAllUser);
app.get("/user/:id", getUserById);
app.delete("/api/user/:userId", deleteByUserId);
/*****************Product**************************** */
app.get("/api/product", getAllProduct);
app.post("/api/product", createProductHandler);
app.get("/api/product/:productId", getProductById)
app.delete("/api/product/:productId",  deleteProductById);




// like not page found
app.use(function(req,res){
    res.status(404).json({
        status:"failure",
        message:"404 Page Not Found"
    })
})

app.listen(PORT, function(){
    console.log(`server Running at ${PORT}`);
})




/*****
 * At code level -> prevent repetition -> Factory Design
 * At file level -> structure to segregate the code -> MVC -> mode view control
*/