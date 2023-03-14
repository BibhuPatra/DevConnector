import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import formatDate from '../../utils/formatDate';
import { deleteExperience } from '../../actions/profile';
import Button from 'react-bootstrap/Button';

const Experience = ({ experience, deleteExperience, deleteFlag }) => {
	const [showResults, setShowResults] = useState(false);
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td className='hide-sm'>{exp.location}</td>
			<td>
				{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
			</td>
			<td>
				<Button
					variant='danger'
					onClick={() => {
						deleteExperience(exp._id);
						deleteFlag(true);
					}}
					className='btn btn-danger'
				>
					Delete
				</Button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h2 className='my-2'>Experience Credentials</h2>
			<Button
				className='btn btn-primary'
				onClick={() => {
					setShowResults(!showResults);
				}}
			>
				Veiw Experience History
			</Button>
			{showResults && (
				<Fragment>
					<table className='table'>
						<thead>
							<tr>
								<th>Company</th>
								<th className='hide-sm'>Title</th>
								<th className='hide-sm'>Location</th>
								<th className='hide-sm'>Years</th>
								<th className='hide-sm'>Action</th>
							</tr>
						</thead>
						<tbody>{experiences}</tbody>
					</table>
				</Fragment>
			)}
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
