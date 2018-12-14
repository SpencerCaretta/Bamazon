//Packages required
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "quasi",
    database: "bamazon"
});

//Our Connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("\nconnected as id " + connection.threadId);
});

