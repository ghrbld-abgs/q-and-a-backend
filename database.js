  const mysql = require('mysql2');
  // const bluebird = require('bluebird');
  const { promisify } = require('util');


  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "skipperd",
    database: "q_and_a"
  });


  con.connect(function(err) {
    if (err) throw err;
    console.log("We are up and running!");
  });

  con.query = promisify(con.query);

module.exports = con;