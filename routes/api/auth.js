const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bycrptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

//@route  GET api/auth
//@desc   Authorize User
//@access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		return res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//@route  POST api/auth
//@desc   Login User
//@access Public
router.post(
	'/',
	[
		check('email', 'Please enter email in correct format').isEmail(),
		check('email', 'Please enter Email address').not().isEmpty(),
		check('password', 'Please enter Password').not().isEmpty()
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}

		try {
			//check if the user exists
			const { email, password } = req.body;
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ error: [ { msg: 'Invalid Credentials' } ] });
			}

			//checking if the password is correct
			const isMatch = await bycrptjs.compare(password, user.password);
			console.log(isMatch);
			if (!isMatch) {
				return res.status(400).json({ error: [ { msg: 'Invalid Credentials' } ] });
			}

			//if everything goes okay!
			//Creating a token
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
			//
			// res.send('User Registered');
		} catch (err) {
			console.log(err);
			return res.status(500).send('Server error');
		}
	}
);

module.exports = router;
