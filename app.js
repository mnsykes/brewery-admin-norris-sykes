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

app.use(express.static('public', {type: 'text/html'}))

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

module.exports = app;

