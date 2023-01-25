
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:false,
    },
    email:{
        type:String,
        required :true,
        unique:false,
    },
    password: {
        type:String,
        default :""
    },
    profilePic:{
        type:String,
        default:"",
    }
    
},
//for createdAt and updatedAt times 
{ timestamps : true}
);


module.exports  = mongoose.model("users",UserSchema);