const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const { findOne } = require('../../models/Profile');
const request = require('request');
const config = require('config');

// @route           GET api/profile/me
// @desc            Get current user's profile
// acsess           Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name'],
			['avatar']
		);
		if (!profile) return res.status(400).json({ msg: 'Profile Not Found' });
		console.log('Test');
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route           POST api/profile/
// @desc            Create or upate profile
// acsess           Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').notEmpty(),
			check('skills', 'skills is required').notEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			youtube,
			skills,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;
		//Build profile objects
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (githubusername) profileFields.githubusername = githubusername;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		//Build social Objects
		profileFields.social = {};

		if (twitter) profileFields.social.twitter = twitter;
		if (youtube) profileFields.social.youtube = youtube;
		if (instagram) profileFields.social.instagram = instagram;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			//Create
			profile = new Profile(profileFields);
			await profile.save();
			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route           GET api/profile/
// @desc            get all profiles
// acsess           Public

router.get('/', async (req, res) => {
	try {
		const allProfiles = await Profile.find().populate('user', [
			'email',
			'name',
			'avatar',
		]);
		res.json(allProfiles);
		console.log('All Profiles Updated');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route           get api/profile/user/user_id
// @desc            get logged in user profile
// acsess           Public

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['email', 'name', 'avatar']);

		if (!profile) return res.status(400).json({ msg: 'Profile Not Found' });
		res.json(profile);
		console.log(' Paticular Profile Updated');
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile Not Found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route           Delete api/profile/
// @desc            delete profile, user posts
// acsess           Private

router.delete('/', auth, async (req, res) => {
	try {
		//remove users posts
		//remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//Remove User
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User Deleted' });
		console.log('All Profiles Updated');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route           Put api/profile/
// @desc            add profile experience
// acsess           Private

router.put(
	'/experience',
	[
		auth,
		[check('title', 'Title is required').notEmpty()],
		[check('company', 'Company is required').notEmpty()],
		[check('from', 'From date is required').notEmpty()],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body;
		//building new object
		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route  Delete api/experence/:exp_id
//@desc   delete experience posts
//@acsess Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		//remove exp
		const profile = await Profile.findOne({ user: req.user.id });

		//get remove index

		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route           Delete api/profile/
// @desc            delete profile, user posts
// acsess           Private

router.delete('/', auth, async (req, res) => {
	try {
		//remove users posts
		//remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//Remove User
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User Deleted' });
		console.log('All Profiles Updated');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route  Delete api/experence/:exp_id
//@desc   delete experience posts
//@acsess Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		//remove exp
		const profile = await Profile.findOne({ user: req.user.id });

		//get remove index

		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		// res.json(profile);
		return res.json({ msg: 'User Deleted', profile });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route           Put api/profile/education
// @desc            add profile education
// acsess           Private

router.put(
	'/education',
	[
		auth,
		[check('school', 'School is required').notEmpty()],
		[check('degree', 'Degree is required').notEmpty()],
		[check('fieldofstudy', 'Field Of Study is required').notEmpty()],
		[check('from', 'From date is required').notEmpty()],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body;
		//building new object
		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);
//@route  Delete api/education/:exp_id
//@desc   delete education posts
//@acsess Private

router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		//remove exp
		const profile = await Profile.findOne({ user: req.user.id });

		//get remove index

		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.exp_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		// res.json(profile);
		return res.json({ msg: 'Education Deleted', profile });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route  Get api/profile/github/:username
//@desc   get user posts from Github
//@acsess public

router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&cleint_secret${config.get('githubSecret')}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' },
		};
		request(options, (error, response, body) => {
			if (error) console.error(error);
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No Github profile found' });
			}

			return res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
