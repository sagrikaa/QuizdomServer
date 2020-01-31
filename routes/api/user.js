const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const bycrptjs = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route  POST api/user
//@desc   Register User/SignUp
//@access Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter email in correct format').isEmail(),
		check('email', 'Email is required').not().isEmpty(),
		check('password', 'Password should be minimum of 6 characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}

		try {
			//check if the user exists
			const { name, email, password } = req.body;
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ error: [ { msg: 'User exists' } ] });
			}

			//setting a gravatar
			const avatar = await gravatar.url('email', {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				password,
				avatar
			});

			//encrypting password
			const salt = await bycrptjs.genSalt(10);
			user.password = await bycrptjs.hash(password, salt);
			//user added to database
			await user.save();

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
