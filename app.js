require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./db");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

const sessionStore = new MySQLStore({}, db);
app.use(
	session({
		key: "session_cookie",
		secret: process.env.SESSION_SECRET,
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		proxy: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("./public"));

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

app.use("/public", (req, res, next) => {
	if (req.url.endsWith(".json")) {
		res.setHeader("Content-Type", "application/json");
	}
	next();
});

//redirecting to main search page on load
app.get("/stylesearch/style", (req, res) => {
	res.redirect("/stylesearch");
});

app.get("");

module.exports = app;
