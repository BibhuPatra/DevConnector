const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route Post api/AUTH
// @desc  LOGIN/AUTH and token user
// acsess Public
router.post(
	'/',
	[
		check('email', 'Please enter a vaild email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			//if user exits
			let user = await User.findOne({ email });
			if (!user)
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credientials' }] });
			const isMatched = await bcrypt.compare(password, user.password);

			if (!isMatched)
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credientials' }] });

			// user = new User({ email, password });
			//returning jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: '5 days' },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
