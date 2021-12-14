CREATE DATABASE productshop;

USE productshop;

CREATE TABLE person
(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(50) NULL,
	lastName VARCHAR(50) NULL,
	phone VARCHAR(11) NULL,
	address VARCHAR(90) NULL,
	reference VARCHAR(90) NULL,
	image VARCHAR(250) NULL
)

CREATE TABLE users
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	users VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	passwordd VARCHAR(100) NOT NULL,
	token VARCHAR(256) NULL,
	statuss BOOL NULL DEFAULT 1,
	verified_email BOOL NULL,
	persona_id INT NOT NULL,
	created DATETIME DEFAULT NOW(),
	UNIQUE KEY (email),
	FOREIGN KEY (persona_id) REFERENCES person(uid)
)


CREATE TABLE Home_carousel
(
	uidCarousel INT PRIMARY KEY AUTO_INCREMENT,
	image VARCHAR(256) NULL,
	category VARCHAR(100) NULL
)

CREATE TABLE Category
(
	uidCategory INT PRIMARY KEY AUTO_INCREMENT,
	category VARCHAR(80),
	picture VARCHAR(100),
	status BOOL DEFAULT 1
)

CREATE TABLE Products
(
	uidProduct INT PRIMARY KEY AUTO_INCREMENT,
	nameProduct VARCHAR(90) NULL,
	description VARCHAR(256) NULL,
	codeProduct VARCHAR(100) NULL,
	stock INT NULL,
	price DOUBLE(18,2) NULL,
	status VARCHAR(80) DEFAULT 'active',
	picture VARCHAR(256) NULL,
	category_id INT,
	FOREIGN KEY (category_id) REFERENCES Category(uidCategory)
)

CREATE TABLE favorite
(
	uidFavorite INT PRIMARY KEY AUTO_INCREMENT,
	product_id INT,
	user_id INT,
	FOREIGN KEY(product_id) REFERENCES Products(uidProduct),
	FOREIGN KEY(user_id) REFERENCES users(persona_id)
)

CREATE TABLE orderBuy
(
	uidOrderBuy INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	receipt VARCHAR(100),
	created_at DATETIME DEFAULT NOW(),
	amount DOUBLE(11,2),
	FOREIGN KEY(user_id) REFERENCES users(persona_id)
)

CREATE TABLE orderDetails
(
	uidOrderDetails INT PRIMARY KEY AUTO_INCREMENT,
	orderBuy_id INT,
	product_id INT,
	quantity INT,
	price DOUBLE(11,2),
	FOREIGN KEY(orderBuy_id) REFERENCES orderBuy(uidOrderBuy),
	FOREIGN KEY(product_id) REFERENCES Products(uidProduct)
)





/*---------------------------------------------------------------------------*/
/*-----------------  Storage PROCEDURE  || FRAVE SHOP ----------------------*/
/*-------------------------------------------------------------------------*/

DELIMITER //
CREATE PROCEDURE SP_GET_USER_BY_ID(IN UID INT )
BEGIN
	SELECT pe.uid, pe.firstName, pe.lastName, pe.phone, pe.address, pe.reference, pe.image, us.users, us.email 
	FROM person pe
	INNER JOIN users us ON pe.uid = us.persona_id
	WHERE pe.uid = UID;
END//


-- Add new users
DELIMITER //
CREATE PROCEDURE SP_REGISTER_USER (IN usu VARCHAR(50), IN email VARCHAR(100), IN passwordd VARCHAR(100) )
BEGIN
	INSERT INTO person ( firstName ) VALUE ( usu );
	INSERT INTO users ( users, email, passwordd , persona_id ) VALUE (usu, email, passwordd, LAST_INSERT_ID());
END//


DELIMITER //
CREATE PROCEDURE SP_UPDATE_INFORMATION( IN uid INT, IN nam VARCHAR(90), IN lastt VARCHAR(90), IN phone VARCHAR(11), IN address VARCHAR(90), IN reference VARCHAR(90))
BEGIN
	UPDATE person
		SET firstName = nam, 
			 lastName = lastt,
			 phone = phone, 
			 address = address, 
			 reference = reference
	WHERE person.uid = uid;
END//


-- Update Street Address - user
DELIMITER //
CREATE PROCEDURE SP_UPDATE_STREET(IN uid INT, IN ADDRESS VARCHAR(90), IN REFERENCESS VARCHAR(90) )
BEGIN
	UPDATE person
		SET address = ADDRESS, 
			 reference = REFERENCESS
	WHERE person.uid = uid;
END//


-- LIST PRODUCTS HOME
DELIMITER //
CREATE PROCEDURE SP_LIST_PRODUCTS_HOME(IN UID INT)
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, c.category,
	(SELECT COUNT(fa.uidFavorite) FROM favorite fa WHERE fa.user_id = UID AND fa.product_id = p.uidProduct ) AS is_favorite
	FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	ORDER BY uidProduct DESC LIMIT 10;
END//


--- LIST FAVORITE OF PRODUCTS
DELIMITER //
CREATE PROCEDURE SP_LIST_FAVORITE_PRODUCTS( IN UID INT )
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, c.category,
	(SELECT COUNT(fa.uidFavorite) FROM favorite fa WHERE fa.user_id = UID AND fa.product_id = p.uidProduct ) AS is_favorite
	FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	INNER JOIN favorite AS f ON p.uidProduct = f.product_id
	INNER JOIN users AS u ON f.user_id = u.id
	WHERE u.id = UID;
END//

--- LIST PRODUCTS FOR CATEGORIES
DELIMITER //
CREATE PROCEDURE SP_LIST_PRODUCTS_FOR_CATEGORY(IN UIDCATEGORY INT, IN UIDUSER INT)
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, c.category,
	(SELECT COUNT(fa.uidFavorite) FROM favorite fa WHERE fa.user_id = UIDUSER AND fa.product_id = p.uidProduct ) AS is_favorite
	FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	LEFT JOIN favorite AS f ON p.uidProduct = f.product_id
	LEFT JOIN users AS u ON f.user_id = u.id
	WHERE c.uidCategory = UIDCATEGORY;
END//


-- GET PRODUCTS FOR ID USER
DELIMITER //
CREATE PROCEDURE SP_ORDER_DETAILS( IN ID INT )
BEGIN
	SELECT o.uidOrderDetails, o.product_id, p.nameProduct, p.picture, o.quantity, o.price  FROM orderdetails o
	INNER JOIN products p ON o.product_id = p.uidProduct
	WHERE o.orderBuy_id = ID;
END//











