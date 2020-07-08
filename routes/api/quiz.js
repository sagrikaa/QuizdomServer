const express = require('express');
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//@route  POST api/quiz
//@desc   Insert a Quiz without questions
//@access Private
router.post('/', [ check('name', 'Name is required').not().isEmpty() ], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() });
	}

	try {
		const { name, category, difficult, description, questionset, published, creatorId } = req.body;
		console.log(req.body);
		const quizFields = {};
		quizFields.name = name;
		if (category) quizFields.category = category;
		if (difficult) quizFields.difficult = difficult;
		if (description) quizFields.description = description;
		if (questionset) quizFields.questionset = questionset;
		if (published) quizFields.published = published;
		if (creatorId) quizFields.creatorId = creatorId;
		const quiz = await new Quiz(quizFields);

		await quiz.save();
		console.log(quiz._id);
		res.json(quiz);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server error');
	}
});

//@route  GET api/quiz
//@desc   GET all Quizzes
//@access Public

router.get('/', async (req, res) => {
	try {
		const Quizes = await Quiz.find();
		Quizes.map((q) => console.log(q.getUser()));
		res.send(Quizes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
		const person = {
			name: 'John Doe', // key=name value='John Doe'
			age: 25,
			friends: {
				//key=friends value=Object
				friend1: 'Natasha',
				friend2: 'Jason'
			}
		};
	}
});

//@route  GET api/quiz/:quizId
//@desc   GET Quiz by Quiz ID
//@access Public

router.get('/:quizId', async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.quizId);
		res.json(quiz);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//@route  DELETE api/quiz
//@desc   DELETE a Quiz
//@access Private

router.delete('/', async (req, res) => {
	try {
		console.log(req.body.id);
		console.log(await Quiz.findById(req.body.id));
		await Quiz.deleteOne({ _id: req.body.id });
		res.status(200).send('Successfully Deleted');
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

// @route  POST api/quiz/:quizId/question
// @desc   Insert a Question
// @access Private

router.patch(
	'/:quizId/question',
	[
		check('question', 'Question is required').not().isEmpty(),
		check('correctAns', 'Answer has to be provided').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const quiz = await Quiz.findById(req.params.quizId);
			// const {question,options,correctAns}=req.body;
			quiz.questionset.unshift(req.body);
			// console.log(quiz);
			await quiz.save();
			res.json(quiz);
		} catch (error) {
			console.log(error);
			return res.status(500).send('Server error');
		}
	}
);

module.exports = router;
