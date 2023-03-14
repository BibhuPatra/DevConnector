import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import formatDate from '../../utils/formatDate';
import { deleteEducation } from '../../actions/profile';
import Button from 'react-bootstrap/esm/Button';

const Education = ({ education, deleteEducation }) => {
	const [showResults, setShowResults] = useState(false);
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td className='hide-sm'>{edu.fieldofstudy}</td>
			<td>
				{formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
			</td>
			<td>
				<buttton
					onClick={() => {
						deleteEducation(edu._id);
					}}
					className='btn btn-danger'
				>
					Delete
				</buttton>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h2 className='my-2'>Education Credentials</h2>
			<Button
				className='btn btn-primary'
				onClick={() => {
					setShowResults(!showResults);
				}}
			>
				Veiw Education History
			</Button>
			{showResults ? (
				<Fragment>
					<table className='table'>
						<thead>
							<tr>
								<th>School</th>
								<th className='hide-sm'>Degree</th>
								<th className='hide-sm'>Feild Of study</th>
								<th className='hide-sm'>Years</th>
								<th className='hide-sm'>Action</th>
							</tr>
						</thead>
						<tbody>{educations}</tbody>
					</table>
				</Fragment>
			) : null}
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
};

export default connect(null, { deleteEducation })(Education);
