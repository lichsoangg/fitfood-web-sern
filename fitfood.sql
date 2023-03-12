 CREATE DATABASE fitfood;

USE fitfood;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
-- flush privileges;

 SET SQL_SAFE_UPDATES = 0;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=0;   
 -- 1: Admin, 2: Customer
 -- 1: Non Active, 2: Active
 -- 1: Male, 2: Female

-- Table User
CREATE TABLE user(
	Username varchar(100) NOT NULL,
    Password varchar(255) NOT NULL,
  	Role int NOT NULl,
    IsActive Boolean DEFAULT 1,
	Name varchar(100) NOT NULL,
    DayOfBirth date,
    PhoneNumber varchar(10),
    Gender int NOT NULL,
    Province varchar(10),
    District varchar(10),
    Ward varchar(10) ,
    Address varchar(255),
    Avatar varchar(255),
    CONSTRAINT CK_User_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_User_Gender CHECK(Gender=1 OR Gender=2),
    CONSTRAINT CK_User_Username UNIQUE(Username),
	CONSTRAINT PK_User_ID PRIMARY KEY(Username)
);	

-- Table TypeProduct
CREATE TABLE producttype(
	ProductTypeID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    CONSTRAINT PK_ProductTypeId_ID PRIMARY KEY(ProductTypeId)
);
-- Table Product
-- Highlight 1-No 2-Yes
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
-- State 1: Order: 2:Success
-- Table Bill
CREATE TABLE bill(
	BillID int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
	Name varchar(100) NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Address varchar(500) NOT NULL,
    State int NOT NULL,
    Username varchar(100) NOT NULL,
    CONSTRAINT CK_Bill_State CHECK(State=1 OR State=2),
    CONSTRAINT PK_Bill_Id PRIMARY KEY(BillID),
    CONSTRAINT FK_Bill_Customer FOREIGN KEY(Username) REFERENCES User(Username)
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

-- Table Cart 
CREATE TABLE cart(
	Username varchar(100) NOT NULL,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    CONSTRAINT PK_Cart PRIMARY KEY(Username, ProductID),
    CONSTRAINT FK_Cart_User FOREIGN KEY(Username) REFERENCES User(Username),
    CONSTRAINT FK_Cart_Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID)
);

-- Table Rating
CREATE TABLE rating(
	Username varchar(100) NOT NULL,
    ProductID int NOT NULL,
    Rating float NOT NULL,
    CONSTRAINT PK_RATING_Username_ProductID Primary Key(Username, ProductID),
    CONSTRAINT CK_RATING_RATING CHECK(RATING >=0 AND RATING <=5),
    CONSTRAINT FK_RATING_Username FOREIGN KEY(Username) REFERENCES User(Username),
    CONSTRAINT FK_RATING_Product FOREIGN KEY(ProductID) REFERENCES Product(ProductID)
);

-- Data User
Insert Into user(Username,Password, Role, IsActive, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar) Values(
'duytran@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC',2,2,'Khánh Duy','2000-09-01','0333121131','1','79','773','27283','Ho Chi Minh','EmployeeAvatar_1.png'
);
Insert Into user(Username,Password, Role, IsActive, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar) Values(
'duytran1@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC',2,2,'Khánh Duy','2000-09-01','0333121132','1','79','773','27283','Ho Chi Minh','EmployeeAvatar_2.png'
);



-- Data ProductType

INSERT INTO producttype (`Name`) Values ('Đồ uống');
INSERT INTO producttype (`Name`) Values ('Đồ ăn');


-- Data Product
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('NƯỚC MÁT THẢO MỘC',100000,1234,'Chai',1,'ProductAvatar_1.png','1');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('FITFOOD JUICE SWEETIE',200000,21353,'Chai',2,'ProductAvatar_2.png','1');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('FITFOOD JUICE GREENIE',100000,42341,'Chai',2,'ProductAvatar_3.png','1');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('BOX Ức gà mềm mọng',379000,123,'Hộp',1,'ProductAvatar_4.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Cơm gạo lức ăn liền ',100000,4321,'Gói',1,'ProductAvatar_5.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Nhân Burger Gà Teriyaki',100000,123,'Gói',2,'ProductAvatar_6.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Ức gà ăn liền ',199000,342,'Hộp',1,'ProductAvatar_7.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gạo lứt Rong Biển',100000,2453,'Hộp',1,'ProductAvatar_8.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gạo lứt Chà Bông',100000,3246,'Hộp',1,'ProductAvatar_9.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Bánh ngói hạnh nhân',129000,100,'Hộp',1,'ProductAvatar_10.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Biscotti vị socola',129000,97,'Hộp',1,'ProductAvatar_11.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Biscotti vị trà xanh ',100000,100,'Hộp',2,'ProductAvatar_12.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Biscotti vị truyền thống',100000,100,'Hộp',2,'ProductAvatar_13.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Tempeh Tương Nén',100000,455,'Gói',2,'ProductAvatar_14.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Bánh mì ngũ cốc',85000,4567,'Hộp',2,'ProductAvatar_15.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói FIT 1',600000,324,'Gói',1,'ProductAvatar_16.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói FIT 2',600000,567,'Gói',1,'ProductAvatar_17.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói FIT 3',600000,678,'Gói',1,'ProductAvatar_18.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói MEAT-S',1200000,564,'Gói',1,'ProductAvatar_19.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói MEAT',950000,100,'Gói',1,'ProductAvatar_20.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói chay',600000,323,'Gói',1,'ProductAvatar_21.png','2');
Insert Into product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gói Full',750000,123,'Gói',1,'ProductAvatar_21.png','2');




-- Data Bill
Insert Into bill (Date,Name, PhoneNumber,Address, State, Username) Values ('2020-10-11','Duy','0333122222','An Hòa Đông',1,'duytran@gmail.com');
Insert Into bill (Date,Name, PhoneNumber,Address, State, Username) Values ('2020-10-11','Duy','0333122222','An Hòa Đông',2,'duytran@gmail.com');
Insert Into bill (Date,Name, PhoneNumber,Address, State, Username) Values ('2021-10-11','Duy','0333122222','An Hòa Đông',1,'duytran@gmail.com');
Insert Into bill (Date,Name, PhoneNumber,Address, State, Username) Values ('2021-10-11','Duy','0333122222','An Hòa Đông',1,'duytran1@gmail.com');
Insert Into bill (Date,Name, PhoneNumber,Address, State, Username) Values ('2021-12-21','Duy','0333122222','An Hòa Đông',1,'duytran1@gmail.com');


SELECT B.BillID, Date, State, B.Name as CustomerName, B.PhoneNumber,B.Address,SUM(DB.SalePrice * DB.Quantity) as Price,DB.ProductID, DB.Quantity,P.Name, Unit, P.Avatar, DB.SalePrice
        FROM Bill B INNER JOIN User U ON B.Username=U.Username
        INNER JOIN DetailBIll DB ON DB.BillID = B.BillID
        INNER JOIN Product P ON DB.ProductID= P.ProductID
        WHERE 1=1 
        GROUP BY B.BillID, Date, State, B.Name, B.PhoneNumber,B.Address

Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('1','1',11,'150000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('1','3',5342,'100000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('2','2',7123,'150000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('2','13',832,'130000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('3','12',239892,'150000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('3','13',13123,'210000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','5',1123222,'150000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','6',2123,'200000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','13',4123,'200000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','2',441223,'200000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','3',122312,'200000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','12',123,'200000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','14',44532,'200000');
Insert Into detailbill (BillID, ProductID,Quantity, SalePrice) Values ('4','15',140030,'200000');
-- Data Cart
Insert Into cart(Username, ProductID, Quantity) Values('duytran@gmail.com','1',3);
Insert Into cart(Username, ProductID, Quantity) Values('duytran@gmail.com','2',3);
Insert Into cart(Username, ProductID, Quantity) Values('duytran@gmail.com','4',3);
Insert Into cart(Username, ProductID, Quantity) Values('duytran@gmail.com','5',3);
Insert Into cart(Username, ProductID, Quantity) Values('duytran1@gmail.com','1',3);
Insert Into cart(Username, ProductID, Quantity) Values('duytran1@gmail.com','2',2);
Insert Into cart(Username, ProductID, Quantity) Values('duytran1@gmail.com','3',4);


-- Data Rating
Insert Into rating(Username, ProductID, Rating) Values('duytran1@gmail.com','1',4.3);
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','1','5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','2','4.8');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','3','5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','4','3.5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','5','3.5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','6','4.1');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','7','3.9');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','8','3.8');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','9','3.5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','10','4.6');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','12','4.9');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','13','4.4');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','15','4.2');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','17','5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','18','3.8');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','19','4.7');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','20','4.6');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','21','4.5');
Insert Into rating(Username,ProductID,Rating) Values('duytran@gmail.com','22','4');
Insert Into rating(Username,ProductID,Rating) Values('duytran1@gmail.com','21','4.3');
Insert Into rating(Username,ProductID,Rating) Values('duytran1@gmail.com','22','3');
Insert Into rating(Username,ProductID,Rating) Values('duytran1@gmail.com','20','4');

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

