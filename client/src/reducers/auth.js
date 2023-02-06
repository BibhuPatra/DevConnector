import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

function authReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};

		case REGISTER_FAIL:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: false,
				loading: true,
			};
		default:
			return state;
	}
}

export default authReducer;
