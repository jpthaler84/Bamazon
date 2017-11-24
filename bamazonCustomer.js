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
    password: "",
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
        start();
    });
}

// Function to display entire inventory
function start(inventory) {
    inquirer
        .prompt({
            name: "itemId",
            type: "input",
            message: "What is the product ID of the item you would like to purchase?",
        })
        .then(function(answer) {
            var itemId = parseInt(val.itemId);

            if (inventoryCheck(itemId,inventory)) {
              itemQuantity(product);
            }
            });
      };

// Check inventory
function inventoryCheck(itemId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {

      return inventory[i];
    }
}
};


// Prompt the customer for a product quantity
function itemQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("Insufficient quantity.");
        loadProducts();
      }
      else {
        makePurchase(product, quantity);
      }
    });
  };
