
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  port: "",
  user: "root",
  password: "",
  database: "jbgopera_inventario",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
