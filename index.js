const express = require("express");
const app = express();
const dotenv = require("dotenv").config();//npm i dotenv 
// require('dotenv').config({path: __dirname +'/config/.env'});
 
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require('./routes/user')
const User = require('./models/User')
const cors = require("cors");
const bcrypt = require('bcrypt');
const postRoute = require("./routes/posts")
const catRoute = require("./routes/categories")

const multer = require("multer")
const path = require("path");




//for dotenv module integration

app.use(cors());
 
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));//makes the images available on the server side 


mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/BlogDb",{
  useNewUrlParser : "true",
  useUnifiedTopology: "true",
  
 
   
})
.then(console.log("connected to MongoDb"))
.catch((err)=>console.log(err));  

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
//the multer for storing the images
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use('/api/auth', authRoute);
app.use('/api/update', userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',catRoute);




app.listen(5000,()=>{
    console.log("backend is running ");
});

