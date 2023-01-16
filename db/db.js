const mysql = require("mysql2");
const dbConfig = require("./db.config");

//create connection to the DB
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the DB");
});
module.exports = connection;
