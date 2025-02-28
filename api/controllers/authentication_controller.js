const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
	const timeStamp = new Date().getTime();
	return jwt.encode(
		{
			sub: user.id,
			iat: timeStamp,
		},
		config.secret
	);
};

exports.signin = (req, res) => {
	try {
		console.log("User authenticated:", req.user.email);

		const token = tokenForUser(req.user);
		res.json({ token, user_id: req.user._id });
	} catch (error) {
		console.error("Signin Error:", error);
		res.status(500).json({ error: "Server error during signin." });
	}
};

exports.signup = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(422)
				.json({ error: "Please provide email and password" });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(422).json({ error: "Email already in use" });
		}

		const user = new User({ email, password });
		await user.save();

		res.json({ user_id: user._id, token: tokenForUser(user) });
	} catch (error) {
		next(error);
	}
};
