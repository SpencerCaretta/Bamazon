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
    prompt();
});

//prompt for Manager to select what they want to do
function prompt() {
    inquirer.prompt([
        {
            name: "functions",
            message: "What would you like to do, boss?",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
        //All our manager functions
    ]).then(function(managerAnswer) {
        var answer = managerAnswer.functions
        //Show the manager all the products and all the information on those products
        if (answer === "View Products for Sale") {
            showAll();
            end();
        } else if (answer === "View Low Inventory") {
            connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
                if (err) throw err;
                console.log(res);
                end();
            });
        } else if (answer === "Add to Inventory") {
            showAll();
            inquirer.prompt([
                {
                    name: "SelectID",
                    message: "What is the ID of the Product you would like to which you will add?",
                    type: "list",
                    choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
                },
                {
                    name: "AddInventory",
                    message: "How many will you add to the inventory, boss?",
                    type: "input"

                }
            ]).then(function(managerAnswers) {

                setInventory(managerAnswers.SelectID, managerAnswers.AddInventory);
     
            });
        } else if (answer === "Add New Product") {
            inquirer.prompt([
                {
                    name: "ProductName",
                    message: "Enter the name of the new product.",
                    type: "input"
                },
                {
                    name: "DepartmentName",
                    message: "Enter the name of the department.",
                    type: "input"
                },
                {
                    name: "Price",
                    message: "Enter the price of the product",
                    type: "input"
                },
                {
                    name: "Inventory",
                    message: "How many of those do we have?",
                    input: "input"
                }
            ]).then(function(managerAnswers2) {

                addNewProduct(managerAnswers2.ProductName, managerAnswers2.DepartmentName, managerAnswers2.Price, managerAnswers2.Inventory);
            
            });

        };
       
        
    });
};

//Add new product function for nested functions
function addNewProduct(p1, p2, p3, p4) {
    var post = [
        {
            product_name: p1
        }, 
        {
            department_name: p2
        }, 
        {
            price: p3
        }, 
        {
            stock_quantity: p4
        }
    ];
    connection.query("INSERT INTO products SET ?, ?, ?, ?", post,
    function(err) {
        if (err) {
            console.log("Something went wrong Manager, please put in non-stupid answers.");
        };
        
    });
    end();
}

//Added inventory function for nested functions (sets the number of total inventory, does not add to current inventory)
function setInventory(p1, p2) {
    connection.query("UPDATE products SET ? WHERE ?", 
    [
        {
            stock_quantity: p2
        },
        {
            id: p1
        }
    ],
    function(err) {
        if (err) {
            console.log("Please enter a number next time manager.")
        };
    });
    end();
};


//show function because I use it multiple times
function showAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    }); 
}

//end connection function
function end() {
    connection.end();
    console.log("Thanks for your command, boss!");
};