
const mongoose = require("mongoose");
const ProductSchemaRules = {
    name:{
        type: String,
        require: [true, "Kindly pass the name"],
        unique: [true, "Product name should be unique"],
        maxlength: [40, "Your Product name length is more than 40 Character"]
    },

    price:{
        type: String,
        require: [true, "Kindly pass the price"],
        validate: {
            validator: function(){
            return this.price > 0
        },
        message: "Price can't be negative"
        }
    },

    categories:{
        type: String,
        require: true
    },
    ProductImage:{
        type: [String]
    },
    averageRating: Number, 
    discountedPrice:{
        type:Number,
        validate:{
            validator:function(){
                return this.discountedPrice < this.price;
         },
         message: "Discount must be less than actual price"
        },
     }

}
const ProductSchema = new mongoose.Schema(ProductSchemaRules);
// this model will have query or syntaxes
const ProductModel = mongoose.model("productModel", ProductSchema)

module.exports = ProductModel;