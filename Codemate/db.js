const mysql = require("mysql");
const conn = mysql.createConnection({
  host: 'localhost',
  database: 'techtitans', // database name
  user: 'root',
  password: 'MySQL45' // password name
});
conn.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

module.exports = conn;
