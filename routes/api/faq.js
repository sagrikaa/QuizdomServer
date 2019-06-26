const express = require('express');
const router =  express.Router();
const { check, validationResult } = require('express-validator/check');
const Faq = require("../../models/Faq");

router.post('/',[
    check('question','Question is a required field').not().isEmpty(),
    check('answer','Answer is required field').not().isEmpty(),


],async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //pullling values from body
        const {question,answer} = req.body;
        let newFaq = await Faq.findOne({question});
        //checking if the category already exists
        if(newFaq){
            return res.status(400).json({error:[{"msg":"Question already exists"}]});
        }

        //creating a new category
        newFaq = await new Category({question,answer});
        await newFaq.save();
        res.json(newFaq);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
    
});



router.get('/',async(req,res)=>{

    res.json(await Faq.find());
    
})
module.exports=router;