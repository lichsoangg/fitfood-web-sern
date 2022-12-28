 CREATE DATABASE fitfood;

USE fitfood;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
flush privileges;

 SET SQL_SAFE_UPDATES = 0;
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
	CONSTRAINT CK_Customer_Gender CHECK(Gender=1 OR Gender=2),
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
	CONSTRAINT CK_Employee_Gender CHECK(Gender=1 OR Gender=2),
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
	CONSTRAINT CK_Provider_PhoneNumber UNIQUE(PhoneNumber),
    CONSTRAINT PK_Provider_ID PRIMARY KEY(ProviderID)
);

-- Table TypeProduct
CREATE TABLE producttype(
	ProductTypeID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    CONSTRAINT PK_ProductTypeId_ID PRIMARY KEY(ProductTypeId)
);
-- Table Product
CREATE TABLE product(
	ProductID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    Price int NOT NULL,
    Quantity int NOT NULL,
	Unit varchar(10) NOT NULL,
    Avatar varchar(255),
    Highlight int NOT NULL,
    ProductTypeId int NOT NULL,
	CONSTRAINT PK_Product_Id PRIMARY KEY(ProductID),
    CONSTRAINT FK_ProductType_Product FOREIGN KEY(ProductTypeId) REFERENCES ProductType(ProductTypeId)
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
	ReviewID int NOT NULL AUTO_INCREMENT,
	CustomerID int NOT NULL,
    ProductID int NOT NULL,
    Score int NOT NULL,
    Comment varchar(500),
	CONSTRAINT PK_Review_ReviewID PRIMARY KEY(ReviewID),
	CONSTRAINT FK_Review_Customer FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT FK_Review_Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID),
    CONSTRAINT CK_Review_Score CHECK(Score >=1 and Score <=5)
);


-- insert customer
DELIMITER //
CREATE PROCEDURE InsertCustomerUser(IN Username varchar(100), IN Password varchar(255), IN Name varchar(100),
IN DayofBirth date, IN PhoneNumber varchar(10), IN Gender int, IN Province varchar(10), IN District varchar(10),IN Ward varchar(10),IN Address varchar(255)) 
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
          ROLLBACK;
          RESIGNAL;
    END;
START TRANSACTION;
INSERT INTO User (`username`,`password`,`Role`)
VALUES (Username,Password,'Khách hàng');
INSERT INTO Customer (`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`,`Username`)
VALUES (Name,DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Username);
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
INSERT INTO User (`username`,`password`,`Role`,`IsActive`)
VALUES (Username,'$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC',Role,1);

INSERT INTO Employee (`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`,`Username`,`Avatar`)
VALUES (Name,DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Username,Avatar);
COMMIT;
END
//
DELIMITER ;
Call InsertEmployeeUser('admin.fitfood2@gmail.com','Admin','2001-11-14','0333333402',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood3@gmail.com','Admin','2001-11-14','0333333403',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood4@gmail.com','Admin','2001-11-14','0333333404',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood5@gmail.com','Admin','2001-11-14','0333333405',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood6@gmail.com','Admin','2001-11-14','0333333406',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood7@gmail.com','Admin','2001-11-14','0333333407',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood8@gmail.com','Admin','2001-11-14','0333333408',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood9@gmail.com','Admin','2001-11-14','0333333409',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood10@gmail.com','Admin','2001-11-14','0333333410',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood11@gmail.com','Admin','2001-11-14','0333333411',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood12@gmail.com','Admin','2001-11-14','0333333412',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood13@gmail.com','Admin','2001-11-14','0333333413',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood14@gmail.com','Admin','2001-11-14','0333333414',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood15@gmail.com','Admin','2001-11-14','0333333415',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood16@gmail.com','Admin','2001-11-14','0333333416',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood17@gmail.com','Admin','2001-11-14','0333333417',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood18@gmail.com','Admin','2001-11-14','0333333418',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood19@gmail.com','Admin','2001-11-14','0333333419',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood20@gmail.com','Admin','2001-11-14','0333333420',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('admin.fitfood21@gmail.com','Admin','2001-11-14','0333333421',1,'79','773','27283','Ho Chi Minh 2','','Admin');
Call InsertEmployeeUser('tranhakhanhduynguyenkhanh.fitfood@gmail.com','Admin','2001-11-14','0333333422',1,'79','773','27283','Ho Chi Minh 2','','Admin');             
Call InsertEmployeeUser('tranhakhanhduynguyenkhanh27.fitfood@gmail.com','Khánh Nguyễn','2001-11-14','0333333427',1,'79','773','27283','Ho Chi Minh 2','','Kinh doanh');            






-- get info user
DELIMITER //
CREATE PROCEDURE GetInfoUser(IN UsernameInput varchar(100)) 
BEGIN
If EXISTS (SELECT 1 FROM Customer WHERE Customer.Username=Username) THEN 
SELECT CustomerID,Name,DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Avatar,User.Username,Role,IsActive FROM Customer INNER JOIN User ON Customer.Username=User.Username WHERE Customer.Username=UsernameInput; END IF;

If EXISTS (SELECT 1 FROM Employee WHERE Employee.Username=Username) THEN 
SELECT EmployeeID,Name,DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,Avatar,User.Username,Role,IsActive FROM Employee INNER JOIN User ON Employee.Username=User.Username  WHERE Employee.Username=UsernameInput; END IF;

END
//
DELIMITER ;



SELECT ID, Employee.Username, Name, DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role From Employee INNER JOIN User ON Employee.Username=User.Username
WHERE CONCAT(Employee.Username,'',Name,'',DATE_FORMAT(DayOfBirth, '%Y/%m/%d'),'',PhoneNumber) Like '';

select * from ProductType;
select * from Product;
select * from customer;
select * from employee;
select * from bill;
select * from DetailBill;
INSERT INTO ProductType  SET Name='Type';
INSERT INTO ProductType (`Name`) Values ('Đồ uống');
INSERT INTO ProductType (`Name`) Values ('Đồ ăn lạnh');

Insert Into Product (Name, Price, Quantity, Unit, Highlight, ProductTypeID) Values ('Trà sữa','15.000',15,'Chai',2,'2');


Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-10-11',1,1,null);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-12',1,1,null);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-13',1,1,null);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-13',1,2,1);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-13',1,2,2);
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('3','2',12,'15000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('3','3',12,'15000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('4','2',12,'15000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('9','3',5,'2000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('9','2',1,'4800');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('10','2',1,'15000');



-- Query Revenue

SELECT Sum(Quantity * SalePrice) as Revenue FROM Bill B INNER JOIN DetailBill DB ON B.BillID = DB.BillID  Where Date >= '2022-09-11' And Date <= '2022-12-13' And ProductID='3';
-- Query Employees Revenue
SELECT E.EmployeeID, E.Avatar, E.Name, Sum(Quantity* SalePrice) FROM Bill B 
INNER JOIN DetailBill DB ON B.BillID=DB.BillID 
INNER JOIN Employee E ON E.EmployeeID= B.EmployeeID Where Date >= '2022-09-11' and Date <= '2022-12-13'
Group By E.EmployeeID, E.Avatar, E.Name
Order by Sum(Quantity* SalePrice) DESC;

-- Query Customers Revenue
SELECT C.CustomerID, C.Avatar, C.Name, Sum(Quantity* SalePrice) FROM Bill B 
INNER JOIN DetailBill DB ON B.BillID=DB.BillID 
INNER JOIN Customer C ON C.CustomerID= B.CustomerID Where Date >= '2022-09-11' and Date <= '2022-12-13'
Group By C.CustomerID, C.Avatar, C.Name
Order by Sum(Quantity* SalePrice) DESC;

-- Query Products Revenue
SELECT P.ProductID,P.Name, Sum(DB.Quantity* SalePrice) FROM Bill B 
INNER JOIN DetailBill DB ON B.BillID=DB.BillID 
INNER JOIN Product P ON P.ProductID= DB.ProductID Where Date >= '2022-09-11' and Date <= '2022-12-13'
Group By P.ProductID, P.Name
Order by Sum(Quantity* SalePrice) DESC;

select * from deliverynote;
Select * from detaildeliverynote;
DELETE FROM DetailDeliveryNote Where DeliveryNoteID="1" And (ProductID="" OR ProductID is NULL);
    
 Insert Into DeliveryNote (Date, ProviderID, EmployeeID) Values ('2022-10-11','1','1');
 SELECT DeliverNote.ProviderID From DeliveryNote;
 Select * From DeliveryNote;
 Insert Into DetailDeliveryNote (DeliveryNoteID, ProductID, Quantity,ImportPrice) Values ('1','2','10','15000');