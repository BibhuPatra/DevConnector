import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sample from '../../img/video.mp4';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<section className='landing'>
			<video className='videoTag' autoPlay loop muted>
				<source src={sample} type='video/mp4' />
			</video>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Developer Connector</h1>
					<p className='lead'>
						Create a developer profile/portfolio, share posts and get help from
						other developers
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
