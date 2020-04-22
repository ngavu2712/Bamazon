DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;


USE bamazon_DB;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS departments;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(200) NOT NULL,
department_name VARCHAR(200) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_qty INT(200) NOT NULL,
products_sale DECIMAL(10,2),
department_id INT,
PRIMARY KEY (item_id) );

CREATE TABLE departments (
department_id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR (200) NOT NULL,
over_head_costs INT(200) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty) 
	VALUES ('Osprey Backpack', 'Outdoor Gear', 180.00, 100),
		   ('Chaco Sandal', 'Clothing', 98.00, 70),
		   ('Field&Stream Sleeping bag', 'Outdoor Gear', 55.00, 150),
           ('Prana Capris', 'Clothing', 75.00, 30),
	       ('Eddie Bauer Fleece', 'Clothing', 60.00, 45),
           ('Foldable bowl', 'Outdoor Gear', 35.00, 500),
           ('Bear Spray', 'Safety Equipment', 30.00, 200),
           ('Jetboil', 'Outdoor Gear', 149.95, 100),
		   ('Chalk Bag', 'Athletic Product', 28.99, 20),
           ('Road Bike', 'Outdoor Gear', 598.95, 30)
    ;
   
INSERT INTO departments (department_name, over_head_costs)
	VALUES ('Outdoor Gear', 1000),
		   ('Clothing', 300),
           ('Athletic Product', 100),
           ('Safety Equipment', 500);

#DELETE FROM products WHERE item_id <= 10;

#UPDATE products SET stock_qty = 52 WHERE item_id =9;


UPDATE products SET products_sale = price*stock_qty; 
UPDATE products INNER JOIN departments ON departments.department_name = products.department_name
 SET products.department_id = departments.department_id;

SELECT SUM(departments.department_id) department_id, departments.department_name, SUM(over_head_costs) over_head_costs, SUM(products_sale) products_sale, SUM(products_sale - over_head_costs) Total_Profit
FROM departments LEFT JOIN products ON departments.department_name = products.department_name
GROUP BY departments.department_name;