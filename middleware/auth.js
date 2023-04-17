const db = require("../db");

function checkAuth(req, res, next) {
	const { path } = req.route;
	// Check role id to see if page can be accessed.
	if (req.session.loggedIn) {
		switch (path) {
			case "/employees":
				if (!req.session.isManager)
					return res.status(400).send("You are not able to view this page.");
				break;
		}
		return next();
	}
	req.session.save(() => res.redirect("/"));
}

module.exports = checkAuth;
