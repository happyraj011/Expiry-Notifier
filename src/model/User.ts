import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
        
    },
    phoneNumber:{
        type:Number,
        require:true,
        length:10
    },
    address:{
        type:String,
        require:true,
        
    },
    password:{
        type:String,
        require:true,
        
    },


})

const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;