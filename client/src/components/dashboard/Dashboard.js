import { Fragment, React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	const [loadProfile, setloadProfile] = useState(0);
	useEffect(() => {
		getCurrentProfile();
		console.log('Dash', profile);
	}, [getCurrentProfile, loadProfile]);

	return loading && profile === !null ? (
		<div className='container'>
			<Spinner />
		</div>
	) : (
		<Fragment>
			<div className='container'>
				<h1 className='large text-primary'>Dashboard</h1>
				<p className='lead'>
					<i className='fas fa-user'> </i> Welcome {user && user.name}
				</p>
				{console.log(profile)}
				{profile !== null ? (
					<>
						<DashboardActions />
						{console.log('Check', profile)}
						<Experience
							deleteFlag={(e) => setloadProfile(loadProfile + 1)}
							experience={profile?.experience}
						/>
						<Education education={profile?.education} />
					</>
				) : (
					<>
						<p>You have not yet setup a profile, please add some info </p>
						<Link to='/create-profile' className='btn btn-primary my-1'>
							Create Profile
						</Link>
					</>
				)}
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
