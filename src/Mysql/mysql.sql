CREATE DATABASE productshop;

USE productshop;

ALTER TABLE users
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
	FOREIGN KEY (persona_id) REFERENCES person(uid),
)

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
	status VARCHAR(80) NULL,
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
	datee DATETIME,
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





--------------------------------------------------------
-----------------Storage Procedure----------------------
--------------------------------------------------------

-- VALIDATE LOGIN
DELIMITER //
CREATE PROCEDURE SP_VALIDATE_LOGIN( IN emaill VARCHAR(100) )
BEGIN
	SELECT u.persona_id, u.email, u.users, u.passwordd, image FROM users AS u
	INNER JOIN person AS p ON u.persona_id = p.uid
	WHERE email = emaill;
END//

-- Renew Token

DELIMITER //
CREATE PROCEDURE SP_RENEW_TOKEN(IN ID INT)
BEGIN
	SELECT u.persona_id, u.email, u.users, image FROM users AS u
	INNER JOIN person AS p ON u.persona_id = p.uid
	WHERE u.persona_id = ID;
END//


-- Add new users
DELIMITER //
CREATE PROCEDURE SP_REGISTER_USER (IN usu VARCHAR(50), IN email VARCHAR(100), IN passwordd VARCHAR(100) )
BEGIN
	INSERT INTO person ( firstName ) VALUE ( usu );
	INSERT INTO users ( users, email, passwordd , persona_id ) VALUE (usu, email, passwordd, LAST_INSERT_ID());
END//

-- Add new register personal
DELIMITER //
CREATE PROCEDURE SP_REGISTER_PERSONAL( IN uid INT, IN nam VARCHAR(90), IN lastt VARCHAR(90), IN phone VARCHAR(11), IN address VARCHAR(90), IN reference VARCHAR(90))
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
CREATE PROCEDURE SP_UPDATE_STREET(IN uid INT, IN address VARCHAR(90), IN reference VARCHAR(90) )
BEGIN
	UPDATE person
		SET address = address, 
			 reference = referenceperson
	WHERE person.uid = uid;
END//



-- SAVE IMAGE SELECTED 
DELIMITER //
CREATE PROCEDURE SP_SAVE_IMAGE_PROFILE( IN img VARCHAR(250), IN uid INT )
BEGIN
	UPDATE person
		SET image = img
	WHERE person.uid = uid;
END//


-- LIST PRODUCTS HOME JOIN CATEGORIES
DELIMITER //
CREATE PROCEDURE SP_LIST_PRODUCTS_HOME()
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, category FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	ORDER BY uidProduct DESC LIMIT 10;
END//


--- ADD A PRODUCT TO FAVORITE LIST
DELIMITER //
CREATE PROCEDURE SP_ADD_PRODUCT_FAVORITE( IN idPro INT, IN idUser INT )
BEGIN
	INSERT INTO favorite ( product_id, user_id ) VALUE ( idPro, idUser );
END//


--- DELETE A PRODUCT TO FAVORITE FROM LIST
DELIMITER //
CREATE PROCEDURE SP_DELETE_PRODUCT_FAVORITE( IN idPro INT, IN idUser INT )
BEGIN 
	DELETE FROM favorite
	WHERE product_id = idPro AND user_id = idUser;
END//


--- LIST FAVORITE OF PRODUCTS
DELIMITER //
CREATE PROCEDURE SP_LIST_FAVORITE_PRODUCTS( IN ID INT )
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, status, picture, category_id, f.product_id as favorite_id FROM Products AS p
	LEFT JOIN Favorite AS f ON p.uidProduct = f.product_id
	LEFT JOIN users AS u ON f.user_id = u.id
	WHERE u.id = ID;
END//


-- GET PRODUCTS FOR ID USER
DELIMITER //
CREATE PROCEDURE SP_ORDER_DETAILS( IN ID INT )
BEGIN
	SELECT o.uidOrderDetails, o.product_id, p.nameProduct, p.picture, o.quantity, o.price  FROM orderdetails o
	INNER JOIN products p ON o.product_id = p.uidProduct
	WHERE o.orderBuy_id = 3;
END//


