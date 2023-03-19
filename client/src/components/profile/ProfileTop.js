import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		company,
		status,
		website,
		location,
		social,
		user: { name, avatar },
	},
}) => {
	return (
		<div className='profile-top bg-primary p-1'>
			<img className='round-img' src={avatar} alt='' />
			<h1 className='large'>Name : {name}</h1>
			<p className='lead'>
				Company :{status} {company && <span>at {company}</span>}
			</p>
			<p>{location && <span>Location : {location}</span>}</p>
			<div className='icons my-1'>
				{website && (
					<a href={website} target='_blank' rel='noopener noreferrer'>
						<i className='fas fa-globe fa-2x'></i>
					</a>
				)}

				{social && social.twitter && (
					<a href={social.twitter} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-twitter fa-2x'></i>
					</a>
				)}

				{social && social.facebook && (
					<a href={social.facebook} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-facebook fa-2x'></i>
					</a>
				)}
				{social && social.instagram && (
					<a href={social.instagram} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-aedin fa-2x'></i>
					</a>
				)}
				{social && social.aedin && (
					<a href={social.aedin} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-youtube fa-2x'></i>
					</a>
				)}
				{social && social.youtube && (
					<a href={social.youtube} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-instagram fa-2x'></i>
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
