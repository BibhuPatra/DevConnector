import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getMyPost, post: { post, loading } }) => {
	const { id } = useParams();
	useEffect(() => {
		getMyPost(id);
	}, [getMyPost, id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<section className='container'>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<PostItem post={post} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</section>
	);
};

Post.propTypes = {
	getMyPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getMyPost })(Post);
