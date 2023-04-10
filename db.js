const mysql = require("mysql2");

const config = process.env.JAWSDB_URL || {
	connectionLimit: 50,
	host: "localhost",
	user: "root",
	database: "toot_app_db",
};
const db = mysql.createPool(config);

module.exports = db.promise();
