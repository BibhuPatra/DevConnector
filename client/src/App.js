import { useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';

const App = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Alert />
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
					<Route
						path='dashboard'
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route path='create-profile' element={<ProfileForm />} />
					<Route path='edit-profile' element={<ProfileForm />} />
					<Route path='add-experience' element={<AddExperience />} />
					<Route path='add-education' element={<AddEducation />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;
