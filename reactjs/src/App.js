import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthService from "./services/auth.service";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Unit from "./pages/Unit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./styles.scss";

function App() {
	const [currentUser, setCurrentUser] = useState(false);

	useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
		}
	}, []);

	const logOut = () => {
		AuthService.logout();
	};

	return (
		<div>
			<h1>Unit Directory</h1>
			<div>
				{currentUser === false ? <h2>Logged In</h2> : <h2>Logged Out</h2>}
			</div>
			<section>
				<Routes>
					<Route path="/signup" exact element={<Signup />} />
					<Route path="/login" exact element={<Login />} />
					<Route path="/units/:id" exact element={<Unit />} />
					<Route path="/dashboard" exact element={<Dashboard />} />
					<Route path="/" exact element={<Home />} />
				</Routes>
			</section>
		</div>
	);
}

export default App;
