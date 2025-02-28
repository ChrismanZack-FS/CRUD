import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles.scss";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			await AuthService.login(email,password).then(
                response =>{
                    navigate("/dashboard")
                },
                error => {
                    console.error(error)
                }
            )
        } catch (error) {
            console.error(error)
        }
    }
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
