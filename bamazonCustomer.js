var mysql = require("mysql");
var inquirer = require("inquirer");

// Create connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Username
  user: "root",

  // Password
    // Look into how to hide this...
  password: "Ocelot84!",
  database: "bamazon"
});

// Connect to MySQL server and database
connection.connect(function(err) {
  if (err) throw err;
  // Run start function
  inventory();
});

// Displays entire inventory (IDs, Names, & Prices)
function inventory() {
  console.log("**************************");
  console.log("***Welcome to Bamazon!!***");
  console.log("**************************");
  console.log("");
  console.log("");
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

// Function to display entire inventory


function start() {
  inquirer
    .prompt({
      name: "itemId",
      type: "input",
      message: "What is the product ID of the item you would like to purchase?",
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "POST") {
        postAuction();
      }
      else if (answer.postOrBid === "BID") {
        bidAuction();
      }
      else {
        connection.end();
      }
    });
}