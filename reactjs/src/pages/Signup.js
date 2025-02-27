import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles.scss";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSignup = async (event) => {
		event.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);

		if (!email || !password) {
			console.error("Email and password must not be empty.");
			return;
		}

		try {
			const response = await AuthService.signup(email, password);
			console.log("Signup successful:", response);
			navigate("/dashboard");
		} catch (error) {
			console.error("Signup failed:", error.response?.data || error.message);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Sign up screen</h1>
				<ul>
					<Link to="/dashboard" className="nav-link">
						Dashboard
					</Link>
				</ul>
				<section>
					<form onSubmit={handleSignup}>
						<input
							type="text"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="submit">Sign up</button>
					</form>
				</section>
			</header>
		</div>
	);
}

export default Signup;
