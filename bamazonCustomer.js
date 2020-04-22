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
afterConnection();



//Function that displays the item id, name and price. 
function afterConnection(){
    connection.query("SELECT item_id, product_name, price FROM products", function (err,res){

        if(err) throw err;
        console.table(res);
    })
    itemForSale();
   
    
}


//Create prompt with 2 messages request: id, number of units
function itemForSale (){
    
    inquirer.prompt({
        name: "idInput",
        type: "input",
        message: "What is the item's id you want to buy?"
    }).then(function(userInput){
        console.log(userInput);
    //     connection.query("SELECT item_id, product_name, price FROM products WHERE item_id = ?", userInput.idInput, function(err, res){
    //         if(err) throw err;
    //         console.table(res);
           availableUnit(userInput.idInput);
         })
    // })

  
}

function availableUnit (id){
    console.log(id);
    inquirer.prompt({
        name: "unit",
        type: "input",
        message: "How many units would you like to buy?"
    }).then(function(userInput){
        console.log(userInput);
    //      connection.query("SELECT item_id, product_name, price FROM products WHERE stock_qty = ? AND ? < stock_qty", userInput.unit, function(err, res){
    //         if(err) throw err;
    //         console.table(res);
         })
    // })
}

function updateUnit (newunit){
    connection.query("UPDATE products SET stock_qty = ?",  )
}

connection.end();
