import "../App.css";
import { Link } from "react-router-dom";
import "../styles.scss";

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Unit Directory</h1>
				<ul>
					<Link to="/dashboard" className="nav-link">
						Dashboard
					</Link>
					<br></br>
					<Link to="/signup" className="nav-link">
						Sign up
					</Link>
					<br></br>
					<Link to="/login" className="nav-link">
						Login
					</Link>
				</ul>
			</header>
		</div>
	);
}

export default Home;
