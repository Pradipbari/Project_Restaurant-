const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "22102020",
  database: "restro",
});

module.exports = pool.promise();
