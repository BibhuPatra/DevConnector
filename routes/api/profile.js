const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route           GET api/rrofile/me
// @desc            Get current user's profile
// acsess           Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name'],
			['avatar']
		);
		if (!profile)
			return res.status(400).json({ msg: 'There is no profile for this user' });
		console.log('Test');
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
