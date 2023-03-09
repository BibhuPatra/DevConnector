const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const { ResultWithContext } = require('express-validator/src/chain');

// @route           Post api/post
// @desc            Add Post
// acsess           Private
router.post(
	'/',
	[auth, [check('text', 'Text is required').notEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		try {
			const user = await User.findById(req.user.id).select('-password');
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
				email: user.email,
			});

			const post = await newPost.save();
			console.log('User Posted!');
			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route           GET api/posts
// @desc            get all posts
// acsess           Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route           DLETE api/posts/:id
// @desc            delete post by id
// acsess           Private

router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ msg: 'Post not found' });
		//check user
		if (post.user.toString() !== req.user.id)
			return res.status(401).send('User not authorized');
		else await post.remove();
		return res.json({ msg: 'Post Removed' });
		if (!post) res.status(404).json({ msg: 'Post not found' });
		return res.json(post);
	} catch (err) {
		if (err.kind == 'ObjectId')
			return res.status(404).json({ msg: 'Post not found' });
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route           Put api/posts/like/:id
// @desc            like a post
// acsess           Private

router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// check if the post is already been liked
		if (
			post.likes.filter((like) => like.user.toString() == req.user.id).length >
			0
		)
			return res.status(400).json({ msg: 'Post Already liked by the user' });
		post.likes.unshift({ user: req.user.id });
		await post.save();
		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		return res.status(400).send('Server Error');
	}
});

// @route           Put api/posts/unlike/:id
// @desc            like a post
// acsess           Private

router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// check if the Post not yet been liked by the user
		if (
			post.likes.filter((like) => like.user.toString() == req.user.id)
				.length === 0
		)
			return res
				.status(400)
				.json({ msg: 'Post not yet been liked by the user' });

		//get the remove index
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();
		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		return res.status(400).send('Server Error');
	}
});

// @route           Post api/post
// @desc            Add Post
// acsess           Private
router.post(
	'/',
	[auth, [check('text', 'Text is required').notEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		try {
			const user = await User.findById(req.user.id).select('-password');
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
				email: user.email,
			});

			const post = await newPost.save();
			console.log('User Posted!');
			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route           Post api/posts/comment/:id
// @desc            Add comment on a Post
// acsess           Private
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text is required').notEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
				email: user.email,
			};
			post.comments.unshift(newComment);

			await post.save();
			console.log('User commented on a post!');
			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route  DELETE api/posts/comment/:id/comment_id
//@desc   Delete a comment
//@access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//Pull out comment
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);
		//make sure comment is there! or for each method fails it will give false as output!
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exits' });
		}
		//check user

		if (comment.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: 'User Not authorised to delete this post' });
		}

		post.comments = post.comments.filter(
			({ id }) => id !== req.params.comment_id
		);

		//get the remove index
		// const removeIndex = post.comments
		// 	.map((comment) => comment.user.toString())
		// 	.indexOf(req.user.id);

		// post.comments.splice(removeIndex, 1);

		await post.save();
		return res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
