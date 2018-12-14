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
    showAll();
    //end();
});

//Shows all of our products
function showAll() {
    connection.query("SELECT id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        console.log("--------------------------------------");
    })
    prompt();
};

//Prompts the user to choose a product to buy
function prompt() {
    inquirer.prompt([
        {
            name: "SelectID",
            message: "Choose the ID of the product you would like to purchase.",
            type: "list",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        },
        {
            name: "quantity",
            message: "How many would you like to buy?",
            type: "list",
            choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        }
    ]).then(function(customerAnswers) {

        quantityCheck(customerAnswers.SelectID, customerAnswers.quantity);
        
    });
}

//Function to check the quantity of based on the prompt above
function quantityCheck(p1, p2) {
    connection.query("SELECT stock_quantity FROM products WHERE id = ?", [p1], function(err, res) {
        if (err) throw err;
        if (p2 === "0") {
            console.log("Oh?  You changed your mind?");
            end();
        } else if (p2 > res[0].stock_quantity) {
            console.log("Insufficient Quantity!");
            end();
        } else {
            customerOrder(p1, p2);
        }
    });      
};

//as long as the database quantity is less than the amount the customer wants to order, function to order that amount of the product
function customerOrder(p1, p2) {
    connection.query("SELECT * FROM products where id = ?", [p1], function(err, res) {
        if (err) throw err;
        var totalStock = res[0].stock_quantity;
        var totalPrice = p2 * res[0].price;
        var stockRemaining = totalStock - p2;
        //Update our database based on how many products the user selected
        connection.query("UPDATE products SET ? WHERE ?", 
        [
            {
                stock_quantity: stockRemaining
            },
            {
                id: p1
            }
        ], function(err, res) {
            if (err) throw err;
            //show the user their total cost
            console.log("The price of your items is " + totalPrice + ". Please Pay. Also we accept tips.");
            end();
        })
    })
}

//function to end our connection, used primarily so all other functions run first
function end() {
    connection.end();
    console.log("Smell ya later, Kid.")
}