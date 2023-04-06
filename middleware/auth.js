const db = require("../db");

function checkAuth(req, res, next) {
	const { path } = req.route;
	console.log(path);

	if (req.session.loggedIn) {
		const roleId = db.query(
			`
			SELECT role_id
			FROM employees
			WHERE id = ?`,
			[req.session.userId]
		);
		switch (path) {
			case "/employees":
				console.log(roleId);
				// if (roleId !== 1) return res.status(400).send("Wrong permission");
				break;
		}
		return next();
	}
	req.session.save(() => res.redirect("/"));
}

module.exports = checkAuth;
