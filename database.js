  const mysql = require('mysql2');
  // const bluebird = require('bluebird');
  const { promisify } = require('util');
  const password = require('./filesToIgnore/config').password

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "q_and_a"
  });


  con.connect(function(err) {
    if (err) throw err;
    console.log("We are up and running!");
  });

  con.query = promisify(con.query);

module.exports = con;