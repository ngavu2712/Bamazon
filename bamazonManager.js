/* WHAT MANAGER CAN DO:
    * List: View product for sale / View Low Inventory / Add to Inventory / Add New Product
*/



var mysql = require ('mysql');
var inquirer = require ('inquirer');
require ('console.table');

//Create connection between mySQL and Node

var connection = mysql.createConnection( { 
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Rabbit2712!",
        database: "Bamazon_DB" 
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as is", connection.threadId);
    

});

// Call afterConnection()
afterConnection();

//Function that displays the item id, name and price. 
function afterConnection(){
    connection.query("SELECT item_id, product_name, price FROM products", function (err,res){

        if(err) throw err;
        console.table(res);
        managerView();
    })
}

// Function that initiate prompts to managers to choose

function managerView () {
    inquirer.promt (

        { name: "productManagement",
          type: "list",
          message: "Select an option",
          choices: ["View Product", "View Low Inventory", "Add To Inventory", "Add New Product"]
        }
    ).then(function(userInput){
        switch (userInput.productManagement) {
            
            case "View Product" :
                viewProduct();
            break;

            case "View Low Inventory" :
                lowInventory();
            break;

            case "Add To Inventory" :
                addInventory();
            break;

            case "Add New Product" :
                addProduct();
            break;
        }
    })
};

// Create viewProduct(), enable manager to view available profuct for sale, id, name, price and qty
function viewProduct() {
    connection.query("SELECT item_id, product_name, price, stock_qty FROM products", function (err,res){
        if(err) throw err;

        console.table(res)
    });
};

// lowInventory() list all items with an inventory count lower than five.
function lowInventory() {
   connection.query("SELECT item_id, product_name, price, stock_qty FROM products WHERE stock_qty < 5", function(err,res){
       if(err) throw err;
       console.table(res);
   })
};

// addInventory() display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "What item_ID do you want to increase inventory?",
        },
        {
            name: "addmore",
            type: "input",
            message: "Add More Item to Inventory",
        }
    ]).then(function(answer){
            var id = answer.itemID;
            var addMoreStock = answer.addmore;
            connection.query("UPDATE products SET stock_qty=" + addmoreStock + " " + "WHERE item_id =" + id, function (err,res){
                if (err) throw err;
                console.log(res);
            })
        })
};

// addProduct() allow the manager to add a completely new product to the store.
function addProduct() {
    inquirer.promt([
        {
            name: "productName",
            type: "input",
            message: "What's the product name?"
        },
        {
            name: "departmentName",
            type: "input",
            message: "What's the Department name?"
        },
        {
            name: "productPrice",
            type: "input",
            message: "What's the product price?"
        },
        {
            name: "inventory",
            type: "input",
            message: "Input item's stock quantity: "
        }
    ]).then(function(ans){
        var product = ans.productName;
        var department = ans.departmentName;
        var price = ans.productPrice;
        var stock = ans.inventory;
        var query = "INSERT INTO products (product_name, department_name, price, stock_qty) VALUES ('?','?',?,?,)";
        connection.query(query, {product: ans})
    })
   
};
