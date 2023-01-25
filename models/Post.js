
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    disc:{
        type:String,
        required :true,
        
    },
    photo: {
        type:String,
        required:false,
    },
    categories:{
        type:Array,
        required : false,
    },
    
},
//for createdAt and updatedAt times 
{ timestamps : true}
);


module.exports  = mongoose.model("postsposts",PostSchema);