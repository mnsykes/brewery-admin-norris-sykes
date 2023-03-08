const router = require("express").Router();
const db = require("../db");
const path = require("path");

router.get("/", async (req, res) => {
	res.render("index", { heading: "Brewery Admin Tool", title: "Brewery Admin" });
});

router.get("/stylesearch", async (req, res) => {
	res.render("stylesearch", { headerBg: "search-bg_dark", beerimg: "/images/pils.jpeg" });
});

router.get("/tapplan", async (req, res) => {
	res.render("tapplan", { headerBg: "tapplan-bg_dark" });
});

router.get("/requests", async (req, res) => {
	const [requests] = await db.query(`SELECT * FROM requests`);
	const data = { request: requests, headerBg: "requests-bg_dark" };

	res.render("requests", data);
});

module.exports = router;
