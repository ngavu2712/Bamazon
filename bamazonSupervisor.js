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
    display();
});

function display () {
    var department_name="departments.department_name"
    connection.query(`SELECT SUM(departments.department_id) department_id, departments.department_name, SUM(over_head_costs) over_head_costs, SUM(products_sale) products_sale, SUM(products_sale - over_head_costs) Total_Profit
    FROM departments LEFT JOIN products ON departments.department_name = products.department_name
    GROUP BY ${department_name}`, function(err,res){
        console.table(res);
    })
}

