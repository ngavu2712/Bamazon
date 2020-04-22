CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(200) NOT NULL,
department_name VARCHAR(200) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_qty INT NOT NULL,
PRIMARY KEY (item_id) );

INSERT INTO products (product_name, department_name, price, stock_qty) 
	VALUES ('Osprey Backpack', 'Outdoor Gear', 180.00, 100),
		   ('Chaco Sandal', 'Clothing ', 98.00, 70),
		   ('Field&Stream Sleeping bag', 'Outdoor Gear', 55.00, 150),
           ('Prana Capris', 'Clothing', 75.00, 30),
	       ('Eddie Bauer Fleece', 'Clothing', 60.00, 45),
           ('Foldable bowl', 'Outdoor Gear', 35.00, 500),
           ('Bear Spray', 'Safety Equipment', 30.00, 200),
           ('Jetboil', 'Outdoor Gear', 149.95, 100),
		   ('Chalk Bag', 'Athletic Products', 28.99, 20),
           ('Road Bike', 'Outdoor Gear', 598.95, 30)
    ;
   
