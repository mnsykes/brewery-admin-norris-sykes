const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const fs = require("fs");
const express = require("express");
const app = express();
const checkAuth = require("../middleware/auth");

// START LOGIN
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!(username && password)) return res.status(400).send("Must include username and password");
		const [[user]] = await db.query(
			`
			SELECT emp.id, emp.username, emp.password, emp.role_id, r.is_manager, r.is_brewhouse, r.is_taproom 
			FROM employees emp
			LEFT JOIN roles r ON emp.role_id = r.id
			WHERE username = ?;
		`,
			[username]
		);
		if (!user) return res.status(400).send("User not found");
		const isCorrectPassword = await bcrypt.compare(password, user.password);

		if (!isCorrectPassword) return res.status(400).send("Login error");

		req.session.username = user.username;
		req.session.loggedIn = true;
		req.session.userId = user.id;
		req.session.roleId = user.role_id;
		req.session.isManager = user.is_manager;
		req.session.isBrewhouse = user.is_brewhouse;
		req.session.isTaproom = user.is_taproom;

		req.session.save(() => res.redirect("/dashboard"));
	} catch (err) {
		return res.status(500).send(err);
	}
});
// END LOGIN

// START LOGOUT
router.get("/logout", async (req, res) => {
	req.session.destroy(() => res.redirect("/"));
});
// END LOGOUT

// START SECURITY
router.post("/security", async (req, res) => {
	try {
		const { employee_id, firstname, lastname, security_answer } = req.body;

		if (!(employee_id && firstname && lastname && security_answer))
			return res.status(400).send("All fields must be completed for validation.");
		const [[user]] = await db.query(
			`
			SELECT * 
			FROM employees
			WHERE id = ? AND first_name = ? AND last_name = ?;
		`,
			[employee_id, firstname, lastname]
		);

		if (!user) return res.status(400).send("User not found");
		const isCorrectAnswer = await bcrypt.compare(security_answer, user.security_answer);

		if (!isCorrectAnswer) return res.status(400).send("Invalid credentials");

		req.session.userId = user.id;

		req.session.save(() => res.redirect("/update-employee"));
	} catch (err) {
		return res.status(500).send(err);
	}
});
// END SECURITY

// START EMPLOYEES
router.route("/employees").post(async (req, res) => {
	try {
		const {
			firstname,
			lastname,
			email,
			role,
			username,
			password,
			confirm_password,
			secret_question,
			secret_answer
		} = req.body;
		if (!(username && password)) return res.status(400).send("User not found");
		if (password !== confirm_password) return res.status(409).send("Password doesn't match");
		const hash = await bcrypt.hash(password, 10);
		const hash_secret_answer = await bcrypt.hash(secret_answer, 10);

		await db.query(
			`INSERT INTO employees (first_name, last_name, email, role_id, username, password, question_id, security_answer)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[firstname, lastname, email, role, username, hash, secret_question, hash_secret_answer]
		);
		res.redirect("/employees");
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY") return res.status(409).send("User already exists");
		return res.status(500).send(`Error creating user: ${err.message} || ${err.sqlMessage}`);
	}
});

router.route("/employees/:employeeId").delete(async (req, res) => {
	const [{ affectedRows }] = await db.query(`DELETE FROM employees WHERE id = ?`, [
		req.params.employeeId
	]);

	if (affectedRows === 1) res.status(204).end();
	else res.status(404).send("Cart item not found");
});

// END EMPLOYEES

// START UPDATE EMPLOYEES
router.route("/update-employee/:employeeId").post(async (req, res) => {
	try {
		const { email, secret_question, secret_answer, password, confirm_password } = req.body;
		if (password !== confirm_password) return res.status(409).send("Password doesn't match");
		const hash = await bcrypt.hash(password, 10);
		const hash_secret_answer = await bcrypt.hash(secret_answer, 10);

		await db.query(
			` 
			UPDATE employees
			SET email = ?, question_id = ?, security_answer = ?, password = ?
			WHERE id = ?
		`,
			[email, secret_question, hash_secret_answer, hash, req.session.userId]
		);

		res.redirect("/update-employee");
	} catch (err) {}
});

// END UPDATE EMPLOYEES

// START REQUESTS
router.route("/requests").post(async (req, res) => {
	try {
		const insert_date = new Date();

		const { request_style, add_notes } = req.body;

		const requestor_id = req.session.userId;

		await db.query(
			`INSERT INTO requests (requestor_id, style, notes, request_date)
		     VALUES (?,?,?,?)
		     `,
			[requestor_id, request_style, add_notes, insert_date]
		);
		res.redirect("/requests");
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY")
			return res.status(409).send("That style has already been requested.");
		return res.status(500).send(`Error: ${err.message} || ${err.sqlMessage}`);
	}
});

router.route("/requests/:requestId").delete(async (req, res) => {
	const [{ affectedRows }] = await db.query(`DELETE FROM requests WHERE id = ?`, [
		req.params.requestId
	]);

	if (affectedRows === 1) res.status(204).end();
	else res.status(404).send("request not found");
});

router.route("/requests/:requestId").put(async (req, res) => {
	const approval_date = new Date();

	await db.query(
		`
		INSERT INTO approvals (approver_id, approval_date, request_id, is_approved)
		VALUES (?, ?, ?, true)`,
		[req.session.userId, approval_date, req.params.requestId]
	);

	res.redirect("/requests");
});
// END REQUESTS

// START STYLE SEARCH
router.route("/stylesearch").post(async (req, res) => {
	try {
		var body = req.body;
		var res_body = {
			category: body.category,
			name: body.name
		};
		res.render("beer", res_body);
	} catch (err) {
		console.log(error);
	}
});
// END STYLE SEARCH

// START TAP PLAN
router.route("/tapplan/now").post(async (req, res) => {
	try {
		const { beerId, tapId } = req.body;
		const date_added = new Date();

		await db.query(
			`
			UPDATE on_tap 
			SET beer_id = ?, date_added = ?, added_by = ?
			WHERE id = ?`,
			[beerId, date_added, req.session.userId, tapId]
		);
		res.redirect("/tapplan");
	} catch (err) {
		return res.status(500).send(`Error: ${err.message} || ${err.sqlMessage}`);
	}
});

router.route("/tapplan/next").post(async (req, res) => {
	try {
		const { beerId, tapId } = req.body;
		const date_added = new Date();

		await db.query(
			`
			UPDATE next_on_tap 
			SET beer_id = ?, date_added = ?, added_by = ?
			WHERE id = ?`,
			[beerId, date_added, req.session.userId, tapId]
		);

		req.session.save(() => res.redirect("/tapplan"));
	} catch (err) {
		return res.status(500).send(`Error: ${err.message} || ${err.sqlMessage}`);
	}
});

router.route("/tapplan/now/:tapId").put(async (req, res) => {
	const [{ beerDelete }] = await db.query(
		`UPDATE on_tap SET beer_id = NULL, date_added = NULL WHERE id = ?`,
		[req.params.tapId]
	);

	if (beerDelete === 1) res.status(204).end();
	else res.status(404).send("beer not found");

	req.session.save(() => res.redirect("/tapplan"));
});

router.route("/tapplan/next/:tapId").put(async (req, res) => {
	const [{ nextDelete }] = await db.query(
		`UPDATE next_on_tap SET beer_id = NULL, date_added = NULL WHERE id = ?`,
		[req.params.tapId]
	);

	if (nextDelete === 1) res.status(204).end();
	else res.status(404).send("beer not found");

	req.session.save(() => res.redirect("/tapplan"));
});

// END TAP PLAN

module.exports = router;
