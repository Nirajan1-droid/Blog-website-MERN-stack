const router = require("express");
const app = router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPass,
//     });

//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser =  new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
// app.post("/login", async (req, res) => {
//   try {
//     const user = await User.find({ username: req.body.username});

     
     
//     // !user && res.status(400).json("wrong credentails!")

//     //inserted password will be converted to the hash called user.password which will be compared to the req.body.password which is the db stored value
//     const validated = await bcrypt.compare(req.body.password, user.password);
//     // !validated && res.status(400).json("wrong credentails!")

//      !validated&&res.status(400).json("wrong credentails!"); 
   
//     const {password,...others}= user._doc;//all the data except password from the user._doc will be stored into the new array
//     res.status(200).json(others);//that array will be passed as the response from the server side
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = app