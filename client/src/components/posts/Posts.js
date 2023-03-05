import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPost, post: { posts, loading } }) => {
	useEffect(() => {
		getPost();
	}, [getPost]);

	return loading ? (
		<div className='container'>
			<Spinner />
		</div>
	) : (
		<Fragment>
			<div className='container'>
				<h1 className='large text-primary'>Posts</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Welcome to the community
				</p>
				<PostForm />
				<div className='posts'>
					{posts.map((post) => (
						<PostItem key={post._id} post={post} />
					))}
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {};

const mapStateToProps = (state) => ({
	getPost: PropTypes.func.isRequired,
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Posts);
