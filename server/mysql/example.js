const mysql = require('mysql');
let connection = mysql.createConnection({
  host : 'host IP',
  user : 'user name',
  password : 'password',
  port : 3306,
  database: 'DB name'
});

connection.connect();

module.exports = connection;