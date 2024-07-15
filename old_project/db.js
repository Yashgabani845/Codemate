const mysql = require("mysql");
const conn = mysql.createConnection({
  host: 'localhost',
  database: 'techtitans',
  user: 'root',
  password: 'Yash@123#'
});
conn.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

module.exports = conn;
