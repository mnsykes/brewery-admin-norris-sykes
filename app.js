const express = require("express");
const path = require("path")
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
const app = express();

const exphbs = require("express-handlebars");
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

app.use('/public', (req, res, next) => {
	if (req.url.endsWith('.json')) {
	  res.setHeader('Content-Type', 'application/json');
	}
	next();
  });
module.exports = app;

