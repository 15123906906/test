SET NAMES UTF8;

DROP DATABASE IF EXISTS bszc;

CREATE DATABASE bszc CHARSET=UTF8;

USE bszc;

CREATE TABLE admin(
	AdminID INT AUTO_INCREMENT,
	AdminUserName VARCHAR(16),
	AdminPwd VARCHAR(16),
	AdminName VARCHAR(16),
	AdminTelNum VARCHAR(16),
	PRIMARY KEY(AdminID)
);

CREATE TABLE orders(
	orderID INT AUTO_INCREMENT,
	carID INT,
	orderNum INT,
	orderPirce INT,
	uerID INT,
	PRIMARY KEY(orderID)
);

CREATE TABLE producti(
	carID INT AUTO_INCREMENT,
	carStyleID INT,
	car VARCHAR(16),
	brand VARCHAR(16),
	stock INT,
	pirce INT,
	summary VARCHAR(200),
	wordsID INT,
	PRIMARY KEY(carID)
);

CREATE TABLE orderi(
	orderID INT,
	orderDate DATE,
	orderStart DATE,
	orderStop DATE,
	dispatching BOOLEAN,
	address VARCHAR(30),
	name VARCHAR(16),
	telNum VARCHAR(16),
	email VARCHAR(50),
	PRIMARY KEY(orderID)
);

CREATE TABLE user(
	userID INT AUTO_INCREMENT,
	userName VARCHAR(16),
	userPwd VARCHAR(16),
	name VARCHAR(16),
	IDCard VARCHAR(19),
	gender VARCHAR(1),
	telNum VARCHAR(16),
	email VARCHAR(50),
	userDate DATE,
	PRIMARY KEY(userID)
);

CREATE TABLE img(
	imgID INT AUTO_INCREMENT,
	carID INT,
	imgName VARCHAR(16),
	imgLink VARCHAR(100),
	PRIMARY KEY(imgID)
);

CREATE TABLE wordsi(
	wordsID INT AUTO_INCREMENT,
	userID INT,
	carID INT,
	words VARCHAR(100),
	wordsDate DATE,
	PRIMARY KEY(wordsID)
);