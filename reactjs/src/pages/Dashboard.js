import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UnitsService from "../services/units.service";
import "../styles.scss";

function Dashboard() {
	const [units, setUnits] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [values, setValues] = useState({
		name: "",
		faction: "",
		type: "",
	});

	

	const navigate = useNavigate();

	const API_BASE =
		process.env.NODE_ENV === "development"
			? `http://localhost:8000/api/v1`
			: process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		UnitsService.getAllPrivateUnits().then(
			(response) => {
				setUnits(response.data);
			},
			(error) => {
				console.log("Secured Page Error:", error.response);
				if (error.response && error.response.status == 403) {
					AuthService.logout();
					navigate("/login");
				}
			}
		);
		// if (!ignore) {
		// 	getUnits();
		// }
		// return () => {
		// 	ignore = true;
		// };
	}, []);

	const getUnits = async () => {
		
		
		
		setLoading(true);
		console.log(`${API_BASE}/units`)
		try {
			await fetch(`${API_BASE}/units`)
				.then((res) => res.json())
				.then((data) => {
					console.log("get units:",data );
					setUnits(data);
				});
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
			
		}
	};
	//console.log(getUnits)

	const createUnit = async () => {
		try {
			await fetch(`${API_BASE}/units`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}).then(() => getUnits());
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
		}
	};
	
	const handleSubmit = (event) => {
		event.preventDefault();
		createUnit();
	};

	const handleInputChange = (event) => {
		event.persist();
		setValues((values) => ({
			...values,
			[event.target.name]: event.target.value,
		}));
	};
	//console.log("units state:",units);
	
	return (
		<div className="App">
			<header className="App-header">
				<h1>Units:</h1>
				<Link to="/" className="nav-link">
					Home
				</Link>
			
				<ul>
					{units &&
						units.map((unit) => (
							<li key={unit._id}>
								<Link to={`/units/${unit._id}`} className="unit-link">
									{unit.name}
								</Link>
							</li>
						))}
				</ul>
				<form onSubmit={(event) => handleSubmit(event)} className="unit-form">
					<label>
						Name:
						<input
							type="text"
							name="name"
							value={values.name}
							onChange={handleInputChange}
							className="input-field"
						/>
					</label>
					<label>
						Faction:
						<input
							type="text"
							name="faction"
							value={values.faction}
							onChange={handleInputChange}
							className="input-field"
						/>
					</label>
					<label>
						Type:
						<input
							type="text"
							name="type"
							value={values.type}
							onChange={handleInputChange}
							className="input-field"
						/>
					</label>
					<input type="submit" value="Submit" className="button" />
				</form>
			</header>
		</div>
	);
}

export default Dashboard;
