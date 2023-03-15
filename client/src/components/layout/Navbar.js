import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { Fragment } from 'react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li className='hvr-icon-bounce'>
				<Link to='/profiles'>
					Developers <i className='fa-solid fa-code hvr-icon'></i>
				</Link>
			</li>
			<li className='hvr-icon-rotate'>
				<Link to='/posts'>
					Posts <i className='fa fa-paperclip hvr-icon'></i>
				</Link>
			</li>
			<li className='hvr-icon-pop'>
				<Link to='/dashboard'>
					Dashboard <i className='fa fa-user-secret hvr-icon'></i>
				</Link>
			</li>
			<li className='hvr-icon-buzz-out logout'>
				<a onClick={logout} href='/'>
					Logout <i className='fa fa-lock hvr-icon'></i>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li className='hvr-icon-bounce'>
				<Link to='/profiles'>
					Developers <i className='fa-solid fa-code hvr-icon'></i>
				</Link>
			</li>
			{'\u00A0'}
			{'\u00A0'}

			<li className='hvr-icon-bounce'>
				<Link to='/register'>
					Register <i className='fa solid fa-id-card hvr-icon'></i>
				</Link>
			</li>
			{'\u00A0'}
			{'\u00A0'}
			<li className='hvr-icon-bounce'>
				<Link to='/login'>
					Login <i className='fa-solid fa-user-check hvr-icon'></i>
				</Link>
			</li>
			{'\u00A0'}
			{'\u00A0'}
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/' className='hvr-icon-bounce'>
					<i className='fa-brands fa-bilibili hvr-icon'></i> DevConnector
				</Link>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.protoTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
