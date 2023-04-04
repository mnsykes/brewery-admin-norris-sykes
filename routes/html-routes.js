const router = require("express").Router();
const db = require("../db");
const path = require("path");
const { route } = require("./api-routes");
const express = require('express')
const app = express();
const apiurl = `https://api.github.com/repos/ascholer/bjcp-styleview/contents/styles.json`;
const axios = require('axios');
const { getEnvironmentData } = require("worker_threads");
const getData = require('/Users/daniellanorris/brewery-admin-norris-sykes/public/index.js')

router.get("/", async (req, res) => {
	res.render("index", { heading: "Brewery Admin Tool", title: "Brewery Admin" });
});

router.get("/stylesearch",async (req, res) => {
	try {
		const {data} = await axios.get(apiurl);
		console.log(data)
		const beerData = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
		res.render("stylesearch", {beerData, headerBg: "search-bg_dark", beerimg: "/images/pils.jpeg" });
		getData()
		
	} catch (error) {
		console.error('There was a problem fetching the JSON file:', error);
	}
	})


router.get("/tapplan", async (req, res) => {
	res.render("tapplan", { headerBg: "tapplan-bg_dark" });
});

router.get("/requests", async (req, res) => {
	const [requests] = await db.query(`SELECT * FROM requests`);
	const data = { request: requests, headerBg: "requests-bg_dark" };

	res.render("requests", data);
});

module.exports = router;

