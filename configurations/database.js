'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'nodejs_login'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;











