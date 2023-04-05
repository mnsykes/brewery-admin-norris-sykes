const mysql = require("mysql2");

const config = process.env.JAWSDB_URL || {
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "root",
	database: "toot_app_db",
	port: '3000'
};
const db = mysql.createPool(config);

module.exports = db.promise();
