const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
// @route           Post api/post
// @desc            Add Post
// acsess           Private
router.get('/', [auth], (req, res) => {
	res.send('Posts Route');
});

module.exports = router;
