const router = require("express").Router();
const db = require("../db");
const path = require("path");
const { route } = require("./api-routes");
const express = require("express");
const axios = require("axios");
const apiurl = `https://raw.githubusercontent.com/ascholer/bjcp-styleview/main/styles.json`;
const { Configuration, OpenAIApi } = require("openai");
const checkAuth = require("../middleware/auth");
const app = express();

// START LOGIN
router.get("/", (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Login",
		title: "toot | login",
		isManager: req.session.isManager
	};
	res.render("index", data);
});
// END LOGIN

// START SECURITY
router.get("/security", async (req, res) => {
	const [questions] = await db.query(`
		SELECT * FROM security_questions
		ORDER BY id ASC
	`);
	const data = {
		question: questions
	};

	res.render("security", data);
});
// END SECURITY

// START DASHBOARD
router.get("/dashboard", checkAuth, async (req, res) => {
	const [[requests]] = await db.query(`
		SELECT COUNT(r.id) - COUNT(a.id) AS NumRequests
		FROM requests r
		LEFT JOIN approvals a ON a.request_id = r.id
	`);
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Dashboard",
		title: "toot | dashboard",
		isManager: req.session.isManager
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
			route: "/requests",
			numRequests: requests
		},
		{
			name: "Employees",
			bgColor: "employees-bg_dark",
			btnColor: "employees-bg_light",
			route: "/employees"
		},
		{
			name: "update employee profile",
			bgColor: "employees-bg_dark",
			btnColor: "employees-bg_light",
			route: "/update-employee"
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
// END DASHBOARD

// START EMPLOYEES
router.get("/employees", checkAuth, async (req, res) => {
	const [roles] = await db.query(`SELECT * FROM roles`);
	const [security_questions] = await db.query(`SELECT * FROM security_questions`);
	const [employees] = await db.query(`
		SELECT 
		emp.id AS employee_id,
		emp.first_name,
		emp.last_name,
		emp.email,
		r.role
		FROM employees emp
		JOIN roles r ON emp.role_id = r.id
	`);

	const data = {
		role: roles,
		employee: employees,
		question: security_questions,
		loggedIn: req.session.loggedIn,
		heading: "employee dashboard",
		headerBg: "employees-bg_dark",
		title: "toot | employees"
	};
	res.render("employees", data);
});
// END EMPLOYEES

// START UPDATE EMPLOYEES
router.get("/update-employee", async (req, res) => {
	const [questions] = await db.query(
		`
		SELECT * FROM security_questions 
	`,
		[req.session.userId]
	);

	const [[user_data]] = await db.query(
		`
		SELECT emp.*, r.role, sc.question
		FROM employees emp
		LEFT JOIN roles r ON r.id = emp.role_id
		LEFT JOIN security_questions sc ON sc.id = emp.question_id
		WHERE emp.id = ?
	`,
		[req.session.userId]
	);

	const data = {
		question: questions,
		user: user_data,
		loggedIn: req.session.loggedIn,
		heading: "update employee profile",
		headerBg: "employees-bg_dark",
		title: "toot | update employee"
	};

	res.render("update-employee", data);
});
// END UPDATE EMPLOYEES

// START STYLE SEARCH
router.get("/stylesearch", async (req, res) => {
	try {
		const beerJSON = await axios.get(apiurl);
		const beerData = beerJSON.data;

		const data = {
			loggedIn: req.session.loggedIn,
			heading: "style search",
			headerBg: "search-bg_dark",
			title: "toot | style search"
		};
		res.render("stylesearch", {
			beerData,
			data
		});
	} catch (error) {
		console.error("There was a problem fetching the JSON file:", error);
	}
});

router.post("/stylesearch/style", async (req, res) => {
	//deal with beer data, post category and style
	const beerJSON = await axios.get(apiurl);
	const beerData = beerJSON.data;
	exports.beerData = beerData;
	const { catList, nameList } = req.body;

	function filterKeys(beerData, { nameList }) {
		let matchingBeer = null;
		for (let i = 0; i < beerData.length; i++) {
			if (beerData[i].name === nameList) {
				console.log("this is fine");
				matchingBeer = beerData[i];
				console.log(beerData[i].categorynumber);

				matchingBeer = beerData[i];

				break;
			}
		}

		if (!matchingBeer) res.redirect("/stylesearch");
		return matchingBeer;
	}

	const results = filterKeys(beerData, {
		nameList
	});
	//deal with api image data

	//deal with api image data, take api key from open ai

	const configuration = new Configuration({
		organization: "org-UeFbUMZJFryaNCscKwZXQiJr",
		apiKey: process.env.OPENAI_API_KEY
	});
	const openai = new OpenAIApi(configuration);

	// Define the OpenAI API response data
	const response = await openai.createImage({
		prompt: nameList + "in a glass with an art deco background.",
		n: 1,
		size: "1024x1024"
	});

	//getting the first selection out of the ai generated data, inserting it into an embeddable
	//url to place into the image slot
	const image_url = response.data.data[0].url;

	res.render("stylesearch", {
		img: "public/images/toot.png",
		loggedIn: req.session.loggedIn,
		beerData,
		results,
		image_url
	});
});
// END STYLE SEARCH

// START TAP PLAN
/*
CREATED on_tap TABLE AND next_on_tap TABLE. JOIN THE TWO
TABLES TOGETHER TO RETRIEVE RESULTS AFTER DATA IS ENTERED USING
TAP PLAN PAGE. BOTH TABLES ARE SEEDED WITH tap_name ONLY.
CREATED inventory TABLE AND SEEDED IT WITH GENERIC BEERS.
THIS TABLE WILL CONTAIN CURRENT BEERS THAT HAVE BEEN BREWED
AND WILL BE USED TO POPULATE DROPDOWNS IN TAP PLAN PAGE.
YOU CAN UPDATE THIS IN seed.sql TO ANYTHING YOU LIKE AND ALSO
ADD ANY COLUMNS TO THE TABLE THAT YOU'D LIKE TO HAVE.
I THINK IT WOULD BE COOL TO ADD THE BEERS YOU CURRENTLY HAVE 
AT YOUR BREWERY.
*/
router.get("/tapplan", async (req, res) => {
	try {
		const [on_tap_data] = await db.query(`
			SELECT ot.*, inv.name AS beer_name, inv.style AS beer_style
			FROM on_tap ot 
			LEFT JOIN inventory inv ON inv.id = ot.beer_id
			ORDER BY id ASC
			`);

		const [next_on_tap_data] = await db.query(`
			SELECT ot.*, inv.name AS beer_name, inv.style AS beer_style
			FROM next_on_tap ot 
			LEFT JOIN inventory inv ON inv.id = ot.beer_id
			ORDER BY id ASC
		`);

		const [beers] = await db.query(`
			SELECT inv.* 
			FROM inventory inv 
			LEFT JOIN on_tap ot ON ot.beer_id = inv.id
			LEFT JOIN on_tap nt ON nt.beer_id = inv.id
			WHERE ot.beer_id IS NULL AND nt.beer_id IS NULL
		`);

		const data = {
			onTap: on_tap_data,
			nextOnTap: next_on_tap_data,
			beer: beers,
			loggedIn: req.session.loggedIn,
			heading: "Tap Plan",
			headerBg: "tapplan-bg_dark",
			title: "toot | tap plan",
			isManager: req.session.isManager
		};

		res.render("tapplan", data);
	} catch (err) {
		return res.status(500).send(` ${err.message} || ${err.sqlMessage}`);
	}
});
// END TAP PLAN

// START REQUESTS
router.get("/requests", async (req, res) => {
	const [requests] = await db.query(
		`
	SELECT
	r.*,
	a.approval_date,
	a.is_approved,
	CONCAT_WS(' ', emp1.first_name, emp1.last_name) AS requestor,
	CONCAT_WS(' ', emp2.first_name, emp2.last_name) AS approver
	FROM requests r
	LEFT JOIN approvals a ON r.id = a.request_id
	LEFT JOIN employees emp1 ON r.requestor_id = emp1.id
	LEFT JOIN employees emp2 ON a.approver_id = emp2.id
	`
	);

	const data = {
		request: requests,
		heading: "requests",
		loggedIn: req.session.loggedIn,
		title: "toot | requests",
		headerBg: "requests-bg_dark",
		isManager: req.session.isManager
	};

	res.render("requests", data);
});
// END REQUESTS
module.exports = router;
