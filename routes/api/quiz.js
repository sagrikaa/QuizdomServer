const express = require('express');
const Quiz = require("../../models/Quiz");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//@route  POST api/quiz
//@desc   Insert a Quiz
//@access Private
router.post('/',[
    check('name','Name is required').not().isEmpty(),
   
],
async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    try {

        const{name,category,difficult,description} = req.body;
      
        const quizFields={};
        quizFields.name=name;
        if(category) quizFields.category=category;
        if(difficult) quizFields.difficult=difficult;
        if(description) quizFields.description=description;

       const quize = await new Quiz(quizFields);

       await quize.save();
    
       res.json(quize);
    } catch (error) {

       console.log(error);
       return res.status(500).send('Server error');
    }
   
});

//@route  GET api/quiz
//@desc   GET all Quizzes
//@access Public

router.get('/',async (req,res)=>{
    try{
         const Quizes = await Quiz.find();
         res.send(Quizes);

    }catch(err){
    console.log(err.message);
    res.status(500).send("Server error");
    }
});




//@route  DELETE api/quiz
//@desc   DELETE a Quiz
//@access Private

router.delete('/',async (req,res)=>{
    try{
        console.log(req.body.id);
        
         Quiz.deleteOne({ _id : req.body.id});
         res.status(200).send('Successfully Deleted');

    }catch(err){
    console.log(err.message);
    res.status(500).send("Server error");
    }
});



// @route  POST api/quiz/:quizId/question
// @desc   Insert a QuestionSet
// @access Private

router.patch('/:quizId/question',[
    check('question','Question is required').not().isEmpty(),
    check('correctAns','Answer has to be provided').not().isEmpty()
],
async(req,res)=>{
    const errors = validationResult(req);
    
    if((!errors.isEmpty())){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        console.log(quiz);
        const {question,options,correctAns}=req.body;
        let optionsArr=[];
        if(options)  optionsArr = options.split(",");
        
        const questionSet = {
            question,options:optionsArr,correctAns
        }

        // await quiz.questionSet.push(questionSet);
        quiz.questionset.unshift(questionSet);
        console.log(quiz);
        await quiz.save();

        res.json(quiz);
        
    } catch (error) {

        console.log(error);
        return res.status(500).send('Server error');
        
    }
}
);



module.exports= router ;