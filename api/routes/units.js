const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");
const protectedRoute = passport.authenticate("jwt", { session: false });

const router = express.Router();

const Unit = require("../models/unit");
// RESTFUL ENDPOINTS
// GET, POST, PATCH, DELETE

const getUnit = async (req, res, next) => {
	let unit;
	try {
		unit = await Unit.findById(req.params.id);
		if (unit == null) {
			return res.status(404).json({ message: "Unit not found." });
		}
		res.unit = unit;
		next();
	} catch (error) {
		console.error("Error fetching unit:", error);
		return res.status(500).json({ message: error.message });
	}
};

// GET ALL
router.get("/", protectedRoute, async (req, res) => {
	console.log("get all");
	try {
		const units = await Unit.find();
		res.json(units);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET ONE
router.get("/:id", getUnit, async (req, res) => {
	res.json(res.unit);
});

// POST CREATE
router.post("/", async (req, res) => {
	const unit = new Unit({
		name: req.body.name,
		faction: req.body.faction,
		type: req.body.type,
	});

	try {
		const newUnit = await unit.save();
		res.status(201).json(newUnit);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// PATCH UPDATE
router.patch("/:id", getUnit, async (req, res) => {
	if (req.body.name != null) {
		res.unit.name = req.body.name;
	}
	if (req.body.faction != null) {
		res.unit.faction = req.body.faction;
	}
	if (req.body.type != null) {
		res.unit.type = req.body.type;
	}
	try {
		const updatedUnit = await res.unit.save();
		res.json(updatedUnit);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// DELETE
router.delete("/:id", getUnit, async (req, res) => {
	try {
		await res.unit.deleteOne();
		res.json({ message: "Removed unit" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
