const app = require("express");
const router = app();
const User = require("../models/User");//connection for database
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

// /:id it is the reference 
// REGISTER
router.put("/:id", async (req, res) => {
    
    if(req.body.userId === req.params.id)
    {
         if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         }
        //  if{new:true} is not there in the code, then the response field of the postman won't be updated
         
            try {
                const updateUser = await User.findByIdAndUpdate(req.params.id ,
                    {$set: req.body,
                    },
                    {new:true});
                    //take everything inside the req.body and set to findByIdAndUpdate

                res.status(200).json(updateUser);
            } catch (err) {
                res.status(500).json(err);
            }
        }

         else {
        res.status(401).json("you can update only your account");
            }
}
);
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id)
    {
        try{
            
            const user=  await User.findById(req.params.id);
            try {
                // await Post.deleteMany({username : user.username})
                
                //this will only delete the user id , email and password from the db
                //not the post created by the user 

                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted");

            } catch (err) {
                res.status(500).json(err);
            }
        }catch(err){
            res.status(404).json("User not found");
        }

    }
         else {
        res.status(401).json("you can update only your account");
            }
    
        });


    router.get('/:id',async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password ,...others} = user._doc;
            res.status(200).json(others)



        }catch(err){
            res.status(500).json(err)
        }
    })

module.exports = router;
