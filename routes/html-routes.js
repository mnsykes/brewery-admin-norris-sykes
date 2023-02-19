const router = require("express").Router();
const db = require("../db");
const path = require("path");

router.get("/", async (req, res) => {
	res.render("index", { heading: "Brewery Admin Tool", title: "Brewery Admin" });
});

module.exports = router;
