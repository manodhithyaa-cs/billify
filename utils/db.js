require("dotenv").config();
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

module.exports = conn;

/*

const db = require("./db");

db.query("SELECT * FROM users", (err, results) => {
  if (err) throw err;
  console.log(results);
});

*/
