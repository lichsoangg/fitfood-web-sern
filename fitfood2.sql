 CREATE DATABASE fitfood1;

USE fitfood1;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
flush privileges;

 
-- Table User
CREATE TABLE user(
	Username varchar(100) NOT NULL,
    Password varchar(255) NOT NULL,
  	Role varchar(20) NOT NULL,
    IsActive Boolean DEFAULT 0,
	CONSTRAINT PK_User_ID PRIMARY KEY(Username)
);	



-- Table Customer
CREATE TABLE customer(
	CustomerID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    DayOfBirth date NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Gender int NOT NULL,
    Province varchar(10) NOT NULL,
    District varchar(10) NOT NULL,
    Ward varchar(10) NOT NULL,
    Address varchar(255) NOT NULL,
    Avatar varchar(255),
	Username varchar(100) NOT NULL,
	CONSTRAINT CK_Customer_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_Customer_Gender CHECK(Gender=0 OR Gender=1),
    CONSTRAINT CK_Customer_Username UNIQUE(Username),
    CONSTRAINT PK_Customer_Id PRIMARY KEY(CustomerID),
    CONSTRAINT FK_Customer_Username FOREIGN KEY(Username) REFERENCES User(Username)
);

-- Table Employee
CREATE TABLE employee(
	EmployeeID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    DayOfBirth date NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Gender int NOT NULL,
    Province varchar(10) NOT NULL,
    District varchar(10) NOT NULL,
    Ward varchar(10),
    Address varchar(255) NOT NULL,
	Avatar varchar(255),
	Username varchar(100) NOT NULL,

	CONSTRAINT CK_Employee_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_Employee_Gender CHECK(Gender=0 OR Gender=1),
    CONSTRAINT CK_Employee_Username UNIQUE(Username),
    CONSTRAINT PK_Employee_Id PRIMARY KEY(EmployeeID),
    CONSTRAINT FK_Employee_User FOREIGN KEY(Username) REFERENCES User(Username)
);

-- Table Provider
CREATE TABLE provider(
	ProviderID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Address varchar(255) NOT NULL,
    CONSTRAINT PK_Provider_ID PRIMARY KEY(ProviderID)
);

-- Table TypeProduct
CREATE TABLE typeproduct(
	TypeProductID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    CONSTRAINT PK_TypeProduct_ID PRIMARY KEY(TypeProductID)
);
-- Table Product
CREATE TABLE product(
	ProductID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    Price int NOT NULL,
    Quantity int NOT NULL,
	Unit varchar(10) NOT NULL,
    TypeProductID int NOT NULL,
	CONSTRAINT PK_Product_Id PRIMARY KEY(ProductID),
    CONSTRAINT FK_Product_TypeProduct FOREIGN KEY(TypeProductID) REFERENCES TypeProduct(TypeProductID)
);
-- Table Bill
CREATE TABLE bill(
	BillID int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    State varchar(20) Not NULL,
    CustomerID int NOT NULL,
    EmployeeID int,
    CONSTRAINT PK_Bill_Id PRIMARY KEY(BillID),
    CONSTRAINT FK_Bill_Customer FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT FK_Bill_Employee FOREIGN KEY(EmployeeID) REFERENCES Employee(EmployeeID)
    
);

-- Table DetailBill
CREATE TABLE detailbill(
	BillID int NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    SalePrice int NOT NULL,
    CONSTRAINT PK_DetailBill_PK PRIMARY KEY(BillID,ProductID),
    CONSTRAINT FK_DetailBill_Bill FOREIGN KEY(BillID) REFERENCES Bill(BillID),
    CONSTRAINT FK_DetailBill_Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID)
);

-- Table DeliveryNote
CREATE TABLE deliverynote(
	DeliveryNoteID int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    ProviderID int NOT NULL,
    EmployeeID int NOT NULL,
    CONSTRAINT PK_DeliveryNote_Id PRIMARY KEY(DeliveryNoteID),
    CONSTRAINT FK_DeliveryNote_Provider FOREIGN KEY(ProviderID) REFERENCES Provider(ProviderID),
    CONSTRAINT FK_DeliveryNote_Employee FOREIGN KEY(EmployeeID) REFERENCES Employee(EmployeeID)
);

-- Table DetailDeliveryNote
CREATE TABLE detaildeliverynote(
	DeliveryNoteID int NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    ImportPrice int NOT NULL,
    CONSTRAINT PK_DetailDeliveryNote_PK PRIMARY KEY(DeliveryNoteID,ProductID),
    CONSTRAINT FK_DetailDeliveryNote_DeliveryNote FOREIGN KEY(DeliveryNoteID) REFERENCES DeliveryNote(DeliveryNoteID),
    CONSTRAINT FK_DetailDeliveryNote__Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID)
);

-- Table Cart
CREATE TABLE cart(
	CustomerID int NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    CONSTRAINT PK_Cart_Customer_Product PRIMARY KEY(CustomerID,ProductID),
    CONSTRAINT FK_Cart_Cusotmer FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT FK_Cart_Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID)
);

-- Table Review
CREATE TABLE review(
	CustomerID int NOT NULL,
    ProductID int NOT NULL,
    Score int NOT NULL,
    Comment varchar(500),
	CONSTRAINT PK_Review_Customer_Product PRIMARY KEY(CustomerID,ProductID),
	CONSTRAINT FK_Review_Cusotmer FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT FK_Review_Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID),
    CONSTRAINT CK_Review_Score CHECK(Score >=1 and Score <=5)
);


