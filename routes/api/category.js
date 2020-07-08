const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Category = require('../../models/Category');

//@route  POST api/category
//@desc   Setting a new Category
//@access Private
router.post('/', [ check('name', 'Name is required').not().isEmpty() ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	}

	try {
		//pullling values from body
		const { name, category } = req.body;
		let newCategory = await Category.findOne({ name });
		//checking if the category already exists
		if (newCategory) {
			return res.status(400).json({ error: [ { msg: 'Category already exists' } ] });
		}

		//creating a new category
		newCategory = await new Category({ name, category });
		await newCategory.save();
		res.json(newCategory);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server error');
	}
});

//@route  GET api/category
//@desc   List all categories
//@access Public

router.get('/', async (req, res) => {
	res.json(await Category.find());
});
module.exports = router;
