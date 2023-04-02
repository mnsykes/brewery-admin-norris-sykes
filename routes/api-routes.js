const router = require("express").Router();
const db = require("../db");
const fs = require('fs');
const express = require('express')
const app = express();

router.route("/requests").post(async (req, res) => {
	try {
		const insert_date = new Date();
		// This is hard coded for now until sessions are
		// set up then this will be replaced by user_id
		const requestor = "Matt";
		const { request_style, add_notes } = req.body;
		await db.query(
			`INSERT INTO requests (style, requestor, notes, request_date)
		     VALUES (?,?,?,?)
		     `,
			[request_style, requestor, add_notes, insert_date]
		);
		res.redirect("/requests");
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY")
			return res.status(409).send("That style has already been requested.");
		return res.status(500).send(`Error: ${err.message} || ${err.sqlMessage}`);
	}
});

router.route("/requests/:requestId").delete(async (req, res) => {
	const [{ affectedRows }] = await db.query(`DELETE FROM requests WHERE id=?`, [
		req.params.requestId
	]);

	if (affectedRows === 1) res.status(204).end();
	else res.status(404).send("Cart item not found");
});

router
	.route("/stylesearch")
	.post(async (req, res) => {
		try{
			var body = req.body
			var res_body = {
				category: body.category,
				name: body.name
			};
			res.render('beer', res_body)
		}
		catch{
	
		}
	

	
	})



module.exports = router;

