const passport = require("passport");
//const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
//const { Strategy: LocalStrategy } = require("passport-local");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local");

const User = require("../models/user");
const config = require("../config");

const localOptions = {
	usernameField: "email",
};

const localStrategy = new LocalStrategy(localOptions, function (
	email,
	password,
	done
) {
	console.log("local Strat.");

	User.findOne({ email: email }, function (error, user) {
		console.log("findOne log", user?.email);
	
		if (error) {
			return done(error);
		}
	
		if (!user) {
			console.log("No user found");
			return done(null, false); 
		}
	

		user.comparePassword(password, function (error, isMatch) {
			console.log("compare password");
			if (error) {
				return done(error);
			}
			if (!isMatch) {
				console.log("no match found");
				return done(null, false);
			}
			console.log("post findOne log", user);
			return done(null, user);
		});
	});
});

const jwtOptions = {
	secretOrKey: config.secret,
	jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
};

//const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
// try {
// 	const user = await User.findById(payload.sub);
// 	if (user) {
// 		return done(null, user);
// 	} else {
// 		return done(null, false);
// 	}
// } catch (error) {
// 	return done(error, false);
// }

//});

const strategy = new JwtStrategy(jwtOptions, function (payload, done) {
	console.log("JWT Strat.");
	User.findById(payload.sub, function (error, user) {
		if (error) {
			return done(error, false);
		}
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(strategy);
passport.use(localStrategy);

module.exports = passport;
