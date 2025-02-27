const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const validateEmail = (email) => {
	return /^\S+@\S+\.\S+$/.test(email);
};

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: "Email address is required",
		validate: [validateEmail, "Email not valid"],
	},
	password: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

// Hash password before saving
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();

// 	try {
// 		const salt = await bcrypt.genSalt(10);
// 		this.password = await bcrypt.hash(this.password, salt);
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
// 	return bcrypt.compare(candidatePassword, this.password);
// };

userSchema.pre("save", function (next) {
	const user = this;
	if (user.isNew || user.isModified("password")) {
		bcrypt.genSalt(10, (error, salt) => {
			if (error) {
				return next(error);
			}
			bcrypt.hash(user.password, salt, null, (error, hash) => {
				if (error) {
					return next(error);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
		if (error) {
			return callback(error);
		}
		callback(null, isMatch);
	});
};

module.exports = mongoose.model("User", userSchema);
