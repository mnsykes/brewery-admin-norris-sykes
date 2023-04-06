const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const checkAuth = require("../middleware/auth");

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		// console.log(req.body);
		if (!(username && password)) return res.status(400).send("Must include username and password");
		const [[user]] = await db.query(`SELECT * FROM employees WHERE username = ?`, [username]);
		// console.log(user);
		if (!user) return res.status(400).send("User not found");
		const isCorrectPassword = await bcrypt.compare(password, user.password);
		if (!isCorrectPassword) return res.status(400).send("Login error");

		req.session.loggedIn = true;
		req.session.userId = user.id;
		req.session.roleId = user.role_id;
		req.session.save(() => res.redirect("/dashboard"));
	} catch (err) {
		return res.status(500).send(err);
	}
});

// This route should create a new User
router.route("/employees").post(async (req, res) => {
	try {
		const { firstname, lastname, role, username, password, confirm_password } = req.body;
		if (!(username && password)) return res.status(400).send("User not found");
		if (password !== confirm_password) return res.status(409).send("Password doesn't match");
		const hash = await bcrypt.hash(password, 10);
		console.log(hash);
		const role_id = parseInt(role);
		await db.query(
			`INSERT INTO employees (first_name, last_name, role_id, username, password)
			 VALUES (?, ?, ?, ?, ?)`,
			[firstname, lastname, role_id, username, hash]
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

router.route("/requests").post(async (req, res) => {
	try {
		const insert_date = new Date();

		const { request_style, add_notes } = req.body;

		await db.query(
			`INSERT INTO requests (requestor_id, style, notes, request_date)
		     VALUES (?,?,?,?)
		     `,
			[req.session.userId, request_style, add_notes, insert_date]
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
	else res.status(404).send("Cart item not found");
});

router.route("/requests/:requestId").put(async (req, res) => {
	const approval_date = new Date();

	await db.query(
		`
		UPDATE requests
		SET approver_id = ?, approval_date = ?
		WHERE id = ?`,
		[req.session.userId, approval_date, req.params.requestId]
	);

	res.redirect("/requests");
});
module.exports = router;
