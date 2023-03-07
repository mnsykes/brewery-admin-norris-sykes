const router = require("express").Router();
const db = require("../db");

router.route("/requests").post(async (req, res) => {
	try {
		console.log(req.body);
		const insert_date = new Date();
		console.log(insert_date);
		const { request_style, requestor, add_notes } = req.body;
		await db.query(
			`INSERT INTO requests (style, request_date, request_notes)
		     VALUES (?,?,?)
		     [request_style, insert_date, add_notes]`
		);
		res.redirect("/requests");
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY")
			return res.status(409).send("That style has already been requested.");
		return res.status(500).send(`Error: ${err.message} || ${err.sqlMessage}`);
	}
});
module.exports = router;
