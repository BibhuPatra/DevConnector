const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
// @route Post api/users
// @desc  Register user
// acsess Public
router.post(
	'/',
	[
		check('name', 'Name is required!').notEmpty(),
		check('email', 'Please enter a vaild email').isEmail(),
		check(
			'password',
			'Please enter a password more than 6 character'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			//if user exits
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ errors: [{ msg: 'user already exists' }] });
			}
			//get user gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});
			user = new User({
				name,
				email,
				avatar,
				password,
			});

			//Encrypt the password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			awaituser.save();
			//returning jsonwebtoken

			console.log(req.body);
			res.send('User Registed');
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
