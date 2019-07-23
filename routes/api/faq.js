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
        
        const {question,answer} = req.body;
        let newFaq = await Faq.findOne({question});
        //checking if the faq already exists
        if(newFaq){
            return res.status(400).json({error:[{"msg":"Question already exists"}]});
        }

        //creating a new question
        newFaq = await new Faq({question,answer});
        await newFaq.save();
        res.json(newFaq);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
    
});

  router.get('/delete/:id', async (req, res) => {
    try {
        const FaqinQuestion = await Faq.findByIdAndDelete(req.params.id);
        res.send(FaqinQuestion);
        res.status(200).send('Successfully Deleted');
      
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  });



router.get('/',async(req,res)=>{

    res.json(await Faq.find());
    
})



router.put('/update/:id', async (req, res) => {
    try {
        const updatedTask = {
            question : req.body.question,
            answer : req.body.answer
           
        };
        
        const FaqToBeUpdated = await Faq.findByIdAndUpdate(req.params.id, updatedTask);
        res.send(await FaqToBeUpdated.save());
        res.status(200).send('Successfully Updated');
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
  });
module.exports=router;