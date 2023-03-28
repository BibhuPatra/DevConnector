import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Button from 'react-bootstrap/esm/Button';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === !null ? (
		<div className='container'>
			<Spinner />
		</div>
	) : (
		<section className='container'>
			<h1 className='large text-primary'>Dashboard</h1>
			<div className='profile hide-sm p-1'>
				<a
					href='https://en.gravatar.com/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<img className='small-img' src={user?.avatar} alt='gravatar' />
				</a>
				<p className='lead'>
					<div>
						<i className='fa-solid fa-id-card'></i> Welcome Developer{' '}
						<div className='typing-demo'>{user?.name}</div>
					</div>
				</p>
			</div>
			{profile ? (
				<>
					<DashboardActions />
					<Experience experience={profile?.experience} />
					<Education education={profile?.education} />
					<div className='my-2'>
						<Button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fa fa-user-minus'>Delete My Account</i>
						</Button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet setup a profile, please add some info </p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</>
			)}
		</section>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
