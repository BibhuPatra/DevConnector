import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

// Create an instance of axios
export const api = axios.create({
	baseURL: 'https://wecode-jlsa.onrender.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
});
api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response.status === 401) {
			store.dispatch({ type: LOGOUT });
		}
		return Promise.reject(err);
	}
);
