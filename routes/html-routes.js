const router = require("express").Router();
const db = require("../db");
const path = require("path");
const {
	route
} = require("./api-routes");
const express = require('express')
const app = express();
const apiurl = `https://api.github.com/repos/ascholer/bjcp-styleview/contents/styles.json`;
const axios = require('axios');
const {
	getEnvironmentData
} = require("worker_threads");
const getData = require('/Users/daniellanorris/brewery-admin-norris-sykes/public/index.js');
const {
	runInNewContext
} = require("vm");
const {
	finished
} = require("stream");

router.get("/", async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Login"
	};
	res.render("index", {
		data
	});
});

router.get("/login", async (req, res) => {
	res.render("login", {
		heading: "Login",
		title: "Brewery Admin"
	});
});

router.get("/dashboard", async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Dashboard",
		title: "toot | dashboard"
	};

	const pages = [{
		name: "Style Search",
		bgColor: "search-bg_dark",
		btnColor: "search-bg_light",
		route: "/stylesearch"
	},
	{
		name: "Tap Plan",
		bgColor: "tapplan-bg_dark",
		btnColor: "tapplan-bg_light",
		route: "/tapplan"
	},
	{
		name: "Requests",
		bgColor: "requests-bg_dark",
		btnColor: "requests-bg_light",
		route: "/requests"
	},
	{
		name: "Employees",
		bgColor: "employees-bg_dark",
		btnColor: "employees-bg_light",
		route: "/employees"
	}
	];
	res.render("dashboard", {
		page: pages,
		loggedIn: req.session.loggedIn,
		heading: "Login",
		title: "Brewery",
		data
	});
});

router.get("/employees", async (req, res) => {
	const [roles] = await db.query(`SELECT * FROM roles`);
	const [employees] = await db.query(`
		SELECT 
		employees.id,
		employees.first_name,
		employees.last_name,
		roles.*
		FROM employees JOIN roles ON employees.role_id = roles.id
	`);

	res.render("employees", {
		role: roles,
		employee: employees,
		headerBg: "employees-bg_dark",
		loggedIn: req.session.loggedIn
	});
});

router.get("/stylesearch", async (req, res) => {
	try {
		const {
			data
		} = await axios.get(apiurl);
		const beerData = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));

		req.session.beerData = beerData;

		const dataLoad = {
			loggedIn: req.session.loggedIn,
			heading: "Style Search",
			headerBg: "search-bg_dark",
			beerimg: "/images/pils.jpeg",
			title: "toot | style search",
		};
		res.render("stylesearch", {
			beerData,
			dataLoad,
		});
	} catch (error) {
		console.error('There was a problem fetching the JSON file:', error);
	}
})



router.post("/stylesearch", async (req, res) => {

	const beerData = req.session.beerData;
	console.log(beerData)
	const {
		category,
		name
	} = req.body

	console.log(beerData)

	function filterKeys(beerData, {
		category,
		name
	}) {

		for (var i = 0; i < beerData.length; i++) {
			if (beerData[i] === category && beerData[i] === name) {
				console.log('this is fine')
				return beerData
			} else {
				console.log('this is not fine')
			}
		}

	}
	const results = filterKeys(beerData, {
		category,
		name
	})

	res.render("stylesearch", {
		beerData: req.session.beerData,
		results,
		headerBg: "search-bg_dark",
		beerimg: "/images/pils.jpeg"
	})
});



router.get("/tapplan", async (req, res) => {
	res.render("tapplan", {
		headerBg: "tapplan-bg_dark",
		loggedIn: req.session.loggedIn,
		arrow: "arrow fa-sharp fa-solid fa-arrow-left fa-2xl"
	});
});

router.get("/requests", async (req, res) => {
	const [requests] = await db.query(`
		SELECT req.*, CONCAT_WS(' ', emp.first_name, emp.last_name) AS requestor
		FROM requests req
		LEFT JOIN employees emp ON req.requestor_id = emp.id
	`);

	const data = {
		request: requests,
		heading: "Dashboard",
		title: "toot | dashboard",
		headerBg: "requests-bg_dark",
		loggedIn: req.session.loggedIn
	};

	res.render("requests", {
		request: requests,
		headerBg: "requests-bg_dark",
		loggedIn: req.session.loggedIn,
		data
	});
});

module.exports = router;