const router = require("express").Router();
const db = require("../db");
const path = require("path");
const {
	route
} = require("./api-routes");
const express = require('express')
const app = express();
const apiurl = `https://raw.githubusercontent.com/ascholer/bjcp-styleview/main/styles.json`;
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const checkAuth = require("../middleware/auth");

router.get("/", (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Login",
		title: "toot | login"
	};
	res.render("index", data);
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

	pages = [
		{
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
		title: "toot | brewery",
		data
	});
});

router.get("/employees", checkAuth, async (req, res) => {
	const [roles] = await db.query(`SELECT * FROM roles`);
	const [employees] = await db.query(`
		SELECT 
		employees.id,
		employees.first_name,
		employees.last_name,
		roles.*
		FROM employees JOIN roles ON employees.role_id = roles.id
	`);
	const data = {
		role: roles,
		employee: employees,
		loggedIn: req.session.loggedIn,
		heading: "Employees",
		headerBg: "employees-bg_dark",
		title: "toot | employees"
	};

	res.render("employees", data);
});


router.get("/stylesearch", async (req, res) => {
	try {
		const beerJSON = await axios.get(apiurl)
		const beerData = beerJSON.data

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



router.post("/stylesearch/style", async (req, res) => {

	//deal with beer data, post category and style
	const beerJSON = await axios.get(apiurl)
	const beerData = beerJSON.data
	exports.beerData = beerData
	const {
		catList,
		nameList
	} = req.body

	function filterKeys(beerData, {
		catList,
		nameList
	}) {

		let matchingBeer = null;
		for (let i = 0; i < beerData.length; i++) {
			if (beerData[i].category === catList && beerData[i].name === nameList) {
				console.log('this is fine')
				matchingBeer = beerData[i]
				console.log(beerData[i].categorynumber)
				break;
			} else {
				console.log('this is not fine')
				console.log(beerData[i].name)
				console.log(beerData[i].category)
				console.log(i)

			}

		}
		if (!matchingBeer) res.redirect('/stylesearch')
		return matchingBeer;

	}

	const results = filterKeys(beerData, {
		catList,
		nameList
	})
	//deal with api image data

	const configuration = new Configuration({
		organization: "org-UeFbUMZJFryaNCscKwZXQiJr",
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	// Define the OpenAI API response data
	const response = await openai.createImage({
		prompt: nameList + "with little kittens inside of the glass",
		n: 1,
		size: "1024x1024",
	});
	const image_url = response.data.data[0].url;

	// Define the data you want to send in the POST request
	const postData = { image_url: image_url };

	res.render("stylesearch", {
		loggedIn: req.session.loggedIn,
		beerData,
		results,
		image_url
	})

});



router.get("/tapplan", async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Employees",
		headerBg: "tapplan-bg_dark",
		title: "toot | employees",
		arrow: "arrow fa-sharp fa-solid fa-arrow-left fa-2xl"
	};
	res.render("tapplan", data);
});

router.get("/requests", async (req, res) => {
	const [requests] = await db.query(`
		SELECT req.*, CONCAT_WS(' ', emp.first_name, emp.last_name) AS requestor
		FROM requests req
		LEFT JOIN employees emp ON req.requestor_id = emp.id
	`);
	console.log(requests)

	const data = {
		requests: requests,
		heading: "Dashboard",
		loggedIn: req.session.loggedIn,
		title: "toot | requests",
		headerBg: "requests-bg_dark"
	};

	res.render("requests", data);
});

module.exports = router;
