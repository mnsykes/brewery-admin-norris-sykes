const router = require("express").Router();
const db = require("../db");
const path = require("path");
const checkAuth = require("../middleware/auth");

router.get("/", async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Login",
		title: "toot | login"
	};
	res.render("index", data);
});

router.get("/login", async (req, res) => {
	res.render("login", { heading: "Login", title: "Brewery Admin" });
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
			route: "/stylesearch",
			management: true,
			brewhouse: true,
			taproom: true
		},
		{
			name: "Tap Plan",
			bgColor: "tapplan-bg_dark",
			btnColor: "tapplan-bg_light",
			route: "/tapplan",
			management: true,
			taproom: true
		},
		{
			name: "Requests",
			bgColor: "requests-bg_dark",
			btnColor: "requests-bg_light",
			route: "/requests",
			management: true,
			brewhouse: true
		},
		{
			name: "Employees",
			bgColor: "employees-bg_dark",
			btnColor: "employees-bg_light",
			route: "/employees",
			management: true
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

router.get("/employees", async (req, res) => {
	// console.log(req.session);
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
	const data = {
		loggedIn: req.session.loggedIn,
		heading: "Style Search",
		headerBg: "search-bg_dark",
		beerimg: "/images/pils.jpeg",
		title: "toot | style search"
	};

	res.render("stylesearch", data);
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

	const data = {
		request: requests,
		heading: "Dashboard",
		loggedIn: req.session.loggedIn,
		title: "toot | requests",
		headerBg: "requests-bg_dark"
	};

	res.render("requests", data);
});

module.exports = router;
