function checkAuth(req, res, next) {
	if (req.session.loggedIn) {
		return next();
	}
	req.session.save(() => res.redirect("/login"));
}

module.exports = checkAuth;
