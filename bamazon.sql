CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(8,2),
    stock_quantity INTEGER

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hat", "Clothing", 5.00, 8), 
("Headphones","Electronics", 10.00, 5), 
("Nintendo Switch","Electronics", 299.99, 2), 
("Super Smash Bros Ultimate","Electronics", 59.99, 6), 
("Button-Down Shirt","Clothing", 19.99, 12), 
("Harry Potter and the Sorcerer's Stone","Books", 9.99, 7), 
("Mountain Dew 24 Pack","Food", 5.99, 50), 
("Bananas (1 lb)","Food", 0.29, 100), 
("Keyboard (3/5 Stars)","Electronics", 19.99, 10), 
("Philip Rivers Jersey","Clothing", 59.99, 1);

SELECT * FROM products;