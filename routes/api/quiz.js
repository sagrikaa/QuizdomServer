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

// @route  POST api/quiz/:quizId/question
// @desc   Insert a QuestionSet
// @access Private

router.post('/:quizId/question',[
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
        const {question,options,correctAns}=req.body;
        const optionsArr=[];
        if(options)  optionsArr = option.split(",");
        
        const questionSet = {
            question,optionsArr,correctAns
        }

        await quiz.questionSet.push(questionSet);
        // quiz.questionSet=[...quiz.questionSet,questionSet];
        
    } catch (error) {

        console.log(error);
        return res.status(500).send('Server error');
        
    }
}
);


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
module.exports= router ;