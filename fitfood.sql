CREATE DATABASE fitfood;

USE fitfood;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
flush privileges;

-- Table User
CREATE TABLE user(
	ID int NOT NULL AUTO_INCREMENT,
	Username varchar(100) NOT NULL,
    Password varchar(255) NOT NULL,
  	Role varchar(20) NOT NULL,
	CONSTRAINT PK_User_ID PRIMARY KEY(ID)
);	



-- Table Customer
CREATE TABLE customer(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    DayOfBirth date NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Gender int NOT NULL,
    Province varchar(10) NOT NULL,
    District varchar(10) NOT NULL,
    Ward varchar(10) NOT NULL,
    Address varchar(255) NOT NULL,
    Avatar varchar(255),
	UserID int NOT NULL,
	CONSTRAINT CK_Customer_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_Customer_Gender CHECK(Gender=0 OR Gender=1),
    CONSTRAINT CK_Customer_UserID UNIQUE(UserID),
    CONSTRAINT PK_Customer_Id PRIMARY KEY(ID),
    CONSTRAINT FK_Customer_Username FOREIGN KEY(UserID) REFERENCES User(ID)
);


-- Table Employee
CREATE TABLE employee(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    DayOfBirth date NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Gender int NOT NULL,
    Province varchar(10) NOT NULL,
    District varchar(10) NOT NULL,
    Ward varchar(10),
    Address varchar(255) NOT NULL,
	Avatar varchar(255),
	UserID int NOT NULL,

	CONSTRAINT CK_Employee_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_Employee_Gender CHECK(Gender=0 OR Gender=1),
    CONSTRAINT CK_Employee_UserID UNIQUE(UserID),
    CONSTRAINT PK_Employee_Id PRIMARY KEY(ID),
    CONSTRAINT FK_Employee_User FOREIGN KEY(UserID) REFERENCES User(ID)
);

-- Table Provider
CREATE TABLE provider(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Address varchar(255) NOT NULL,
    CONSTRAINT PK_Provider_ID PRIMARY KEY(ID)
);

-- Table TypeProduct
CREATE TABLE typeproduct(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    CONSTRAINT PK_TypeProduct_ID PRIMARY KEY(ID)
);
-- Table Product
CREATE TABLE product(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    Price int NOT NULL,
    Quantity int NOT NULL,
	Unit varchar(10) NOT NULL,
    TypeProductID int NOT NULL,
	CONSTRAINT PK_Product_Id PRIMARY KEY(ID),
    CONSTRAINT FK_Product_TypeProduct FOREIGN KEY(TypeProductID) REFERENCES TypeProduct(ID)
);
-- Table Bill
CREATE TABLE bill(
	ID int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    State varchar(20) Not NULL,
    CustomerID int NOT NULL,
    EmployeeID int,
    CONSTRAINT PK_Bill_Id PRIMARY KEY(ID),
    CONSTRAINT FK_Bill_Customer FOREIGN KEY(CustomerID) REFERENCES Customer(ID),
    CONSTRAINT FK_Bill_Employee FOREIGN KEY(EmployeeID) REFERENCES Employee(ID)
    
);

-- Table DetailBill
CREATE TABLE detailbill(
	BillID int NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    SalePrice int NOT NULL,
    CONSTRAINT PK_DetailBill_PK PRIMARY KEY(BillID,ProductID),
    CONSTRAINT FK_DetailBill_Bill FOREIGN KEY(BillID) REFERENCES Bill(ID),
    CONSTRAINT FK_DetailBill_Product FOREIGN KEY(ProductID) REFERENCES Product(ID)
);

-- Table DeliveryNote
CREATE TABLE deliverynote(
	ID int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    ProviderID int NOT NULL,
    EmployeeID int NOT NULL,
    CONSTRAINT PK_DeliveryNote_Id PRIMARY KEY(ID),
    CONSTRAINT FK_DeliveryNote_Provider FOREIGN KEY(ProviderID) REFERENCES Provider(ID),
    CONSTRAINT FK_DeliveryNote_Employee FOREIGN KEY(EmployeeID) REFERENCES Employee(ID)
);

-- Table DetailDeliveryNote
CREATE TABLE detaildeliverynote(
	DeliveryNoteID int NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    ImportPrice int NOT NULL,
    CONSTRAINT PK_DetailDeliveryNote_PK PRIMARY KEY(DeliveryNoteID,ProductID),
    CONSTRAINT FK_DetailDeliveryNote_DeliveryNote FOREIGN KEY(DeliveryNoteID) REFERENCES DeliveryNote(ID),
    CONSTRAINT FK_DetailDeliveryNote__Product FOREIGN KEY(ProductID) REFERENCES Product(ID)
);

-- Table Cart
CREATE TABLE cart(
	CustomerID int NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    CONSTRAINT PK_Cart_Customer_Product PRIMARY KEY(CustomerID,ProductID),
    CONSTRAINT FK_Cart_Cusotmer FOREIGN KEY(CustomerID) REFERENCES Customer(ID),
    CONSTRAINT FK_Cart_Product FOREIGN KEY(ProductID) REFERENCES Product(ID)
);

-- Table Review
CREATE TABLE review(
	CustomerID int NOT NULL,
    ProductID int NOT NULL,
    Score int NOT NULL,
    Comment varchar(500),
	CONSTRAINT PK_Review_Customer_Product PRIMARY KEY(CustomerID,ProductID),
	CONSTRAINT FK_Review_Cusotmer FOREIGN KEY(CustomerID) REFERENCES Customer(ID),
    CONSTRAINT FK_Review_Product FOREIGN KEY(ProductID) REFERENCES Product(ID),
    CONSTRAINT CK_Review_Score CHECK(Score >=1 and Score <=5)
);



-- insert customer
DELIMITER //
CREATE PROCEDURE InsertCustomerUser(IN Username varchar(100), IN Password varchar(255), IN Name varchar(100),
IN DayofBirth date, IN PhoneNumber varchar(10), IN Gender int, IN Province varchar(10), IN District varchar(10),IN Ward varchar(10),IN Address varchar(255)) 
BEGIN
DECLARE Last_User_ID INT DEFAULT 0;
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
          ROLLBACK;
          RESIGNAL;
    END;
START TRANSACTION;

INSERT INTO User (`username`,`password`,`Role`)
VALUES (Username,Password,'Customer');
SELECT Max(ID) INTO Last_User_ID From User;
INSERT INTO Customer (`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`,`UserID`)
VALUES (Name,DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Last_User_ID);
COMMIT;
END
//
DELIMITER ;

-- insert employee
DELIMITER //
CREATE PROCEDURE InsertEmployeeUser(IN Username varchar(100), IN Name varchar(100),
IN DayOfBirth date, IN PhoneNumber varchar(10), IN Gender int, IN Province varchar(10), IN District varchar(10),IN Ward varchar(10),IN Address varchar(255), IN Avatar varchar(255), IN Role varchar(20)) 
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
          ROLLBACK;
          RESIGNAL;
    END;
START TRANSACTION;
INSERT INTO User (`username`,`password`,`Role`)
VALUES (Username,'$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC',Role);

INSERT INTO Employee (`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`,`Username`,`Avatar`)
VALUES (Name,DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Username,Avatar);
COMMIT;
END
//
DELIMITER ;
Call InsertEmployeeUser('taikhoan4','Tài khoản 3 nè','2001-11-14','0333521474',1,'79','773','27283','Ho Chi Minh 2','','Gì đó');

select * from user;




SELECT COALESCE(max(id),0) FROM Employee Where Name='Tài khoản 3 nè';
-- get info user
DELIMITER //
CREATE PROCEDURE GetInfoUser(IN Username varchar(100)) 
BEGIN
If EXISTS (SELECT 1 FROM Customer WHERE Customer.Username=Username) THEN 
SELECT ID,Name,DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Avatar,Username FROM Customer WHERE Customer.Username=Username; END IF;

If EXISTS (SELECT 1 FROM Employee WHERE Employee.Username=Username) THEN 
SELECT ID,Name,DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Avatar,Username FROM Employee WHERE Employee.Username=Username; END IF;

END
//
DELIMITER ;



select * from user;
select * from customer;



;

