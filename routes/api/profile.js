const express = require('express');
const router = express.Router();

// @route           GET api/rrofile
// @desc            Test route
// acsess           Public
router.get('/', (req, res) => {
	res.send('Profile Route');
});

module.exports = router;
