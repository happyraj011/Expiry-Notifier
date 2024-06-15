import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    
    manufacturedDate:{
        type:Date,
        required:true,
    },
    expiryDate:{
        type:Date,
        required:true,
    }
},{
    timestamps:true
})

const Product=mongoose.models.Product ||  mongoose.model("Product",productSchema);
export default Product;