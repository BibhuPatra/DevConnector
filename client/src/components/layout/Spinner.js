import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => (
	<Fragment>
		<img className='spinner' src={spinner} alt='Loading...' />
	</Fragment>
);

export default Spinner;
