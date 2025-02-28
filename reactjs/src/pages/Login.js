import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles.scss";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(""); // To hold the error message
  
	const navigate = useNavigate();
  
	const handleLogin = async (event) => {
	  event.preventDefault();
  
	  try {
		console.log("attempt login");
		const response = await AuthService.login(email, password);
		console.log("Login successful:", response);
		navigate("/dashboard"); // Redirect to dashboard on successful login
	  } catch (error) {
		// Log the error for debugging
		console.error("Login failed:", error);
  
		// Display a meaningful error message to the user
		if (error.response && error.response.data) {
		  setErrorMessage(error.response.data.message || "Login failed. Please try again.");
		} else {
		  setErrorMessage("An error occurred. Please try again later.");
		}
	  }
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>Login Screen</h1>
				<ul>
					<Link to="/dashboard" className="nav-link">
						Dashboard
					</Link>
				</ul>
				<section>
					<form onSubmit={handleLogin}>
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
						<button type="submit">Login</button>
					</form>
				</section>
			</header>
		</div>
	);
}

export default Login;
