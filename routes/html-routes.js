const router = require("express").Router();
const db = require("../db");
const path = require("path");
const { route } = require("./api-routes");
const express = require('express')
const app = express();
const apiurl = `https://api.github.com/repos/ascholer/bjcp-styleview/contents/styles.json`;
const axios = require('axios');

router.get("/", async (req, res) => {
	res.render("index", { heading: "Brewery Admin Tool", title: "Brewery Admin" });
});

router.get("/stylesearch",async (req, res) => {
	try {
		const {data} = await axios.get(apiurl);
		console.log(data)
		const beerData = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
		res.render("stylesearch", {beerData, headerBg: "search-bg_dark", beerimg: "/images/pils.jpeg" });
		ariaHidden.document.querySelector('#search_results')
  
	} catch (error) {
		console.error('There was a problem fetching the JSON file:', error);
	}
	})

router.post("/stylesearch/style", async (req,res) => {
	 function getData() {
		 Handlebars.registerHelper("result", function(category, name) {
			if(req.query.category && req.query.name) {
				//put information into handlebars html
				document.querySelector('#search_results');
	
			} else {
				console.log('must select category and style');
				res.redirect("/stylesearch");
			}
		 });
		
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

