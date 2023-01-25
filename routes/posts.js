const app = require("express");
const router = app();
// const User = require("../models/User");//connection for database
// const bcrypt = require("bcrypt");
const Post = require("../models/Post")

// /:id it is the reference 
// Create
router.post("/",async(req, res)=>{
    const newPost =   new Post(req.body);
    try {
        const savedPost = await newPost.save();
    res.status(200).json(savedPost);

} catch (err) {
    res.status(500).json(err);
    
} 
});
//update

router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

    
    if (post.username === req.body.username)
    {
          
        //  if{new:true} is not there in the code, then the response field of the postman won't be updated
            try {
                const updateUser = await Post.findByIdAndUpdate(
                    req.params.id, 
                    {$set: req.body},
                    {new:true});
                    //take everything inside the req.body and set to findByIdAndUpdate

                res.status(200).json(updateUser);
            } catch (err) {
                res.status(400).json(err);
            }
        }

         else {
        res.status(401).json("you can update only your account");
            }
        }catch(err)
        {
            res.status(500).json(err)
        }
}
);

// //update
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); 
        if (post.username === req.body.username)
        {
            
            try {
                // await Post.deleteMany({username : user.username})
                
                //this will only delete the user id , email and password from the db
                //not the post created by the user 

                await post.delete(req.params.id)
                res.status(200).json("user has been deleted");

            } catch (err) {
                res.status(500).json(err);
            }
        }

        else {
            res.status(401).json("you can update only your account");
        }
    }catch(err){
        res.status(500).json(err)
    }
        
        });

router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        
           
            res.status(200).json(post);

        }catch(err){
            res.status(500).json(err);
        }
    }
)


// //get
router.get("/",async(req,res)=>{
    //catching the queires from the url section which will be defined like /?username?catName
    const username = req.query.user;
    const catName = req.query.cat;
    // const disc

        try{
            //response for the request is defined
            let posts;
            if(username){
                    //acessing object from the schema use this {objectname in schema}
                  posts = await Post.find({ username });
                //pass the username to the post
            }
            else if(catName){
                 posts = await Post.find({ categories : {
                    $in:[catName]
                    //if there is the catname in the db, then pass that cat value into the posts
                },
            });
            }
            else
            {
                posts = await Post.find();
            };

            
            // const {disc, ...tobeshown} = post._doc;
            // const {password ,...others} = user._doc;
            res.status(200).json(posts)
            //if we need to hidesomething then the creation of the new array
            //and _doc in the console section is to be considered


        }catch(err){
            res.status(500).json(err)
        }
    })

module.exports = router;
