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
    makeAnOrder();
}


//Create prompt with 2 messages request: id, number of units
function makeAnOrder (){
    
    inquirer.prompt(
        [
            {
                name: "item_ID",
                type: "input",
                message: "What is the item's id you want to buy?"
            },

            {
                name: "unit",
                type: "input",
                message:"How many units would you like to buy?"
            }
        ]
        ).then(function(userAns){
        //console.log(userAns);
            var idInput = userAns.item_ID;
            var unitQty = userAns.unit;

            makePayment (idInput, unitQty);
         })
}

// makePayment() will check if the qty is surpass the inventory or not. 
//Create 2 conditions:
//If the qty surpass, return message to user.  
//If not, return total to user, update new stock_qty, update department sale.

function makePayment (idRequest, qtyRequest) {
    //console.log(qtyRequest)
    connection.query("SELECT * FROM products WHERE item_id =" + idRequest, function(err,res){
        if(err) throw err;

        // Retrieve the row as object
        var itemInfo = res[0];
        //console.log(itemInfo);
        //console.log(itemInfo.stock_qty);

        // Tell user "Insufficient amount" when they enter large qty
        var stockQuan = itemInfo.stock_qty;
            //console.log(stockQuan)
            if(qtyRequest > stockQuan){
                console.log("Insufficient amount!")
            } 

        // Calculate total when we have enough units in inventory
            else if (qtyRequest <= stockQuan) {
                var total = qtyRequest * itemInfo.price;
                console.log("Your total is $"+ total);
        
        //Update stock_qty in mySQLWorkbench
        var newInventory = parseInt(stockQuan - qtyRequest);
            //console.log(newInventory);
        connection.query("UPDATE products SET stock_qty =" + newInventory + " " + "WHERE item_id =" + idRequest)   
         }
    })
}








