const app = require("express");
const router = app();
const Category = require("../models/Category");

router.post("/",async(req, res)=>{
    const newCat = new Category(req.body)
    try{
        const SavedCat = await newCat.save();
        res.status(200).json(SavedCat);
    }catch(err){
        res.status(500).json(err)
    }
});
router.get("/",async(req, res)=>{

//    const name = req.query.cat;

    try{
        const dind = await Category.find()
        res.status(200).json(dind);
    }catch(err){
        res.status(500).json(err)
    }
});



module.exports = router;