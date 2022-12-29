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



-- Data Employee
Call InsertEmployeeUser('tranhakhanhduy.fitfood@gmail.com','Trần Hạ Khánh Duy','2001-11-14','0333333333',1,'79','773','27283','Ho Chi Minh','EmployeeAvatar_1.png','Admin');
Call InsertEmployeeUser('levansu.fitfood@gmail.com','Lê Văn Sự','2001-11-14','0333333341',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_2.png','Admin');   
Call InsertEmployeeUser('truongthaibao.fitfood@gmail.com','Trương Thái Bảo','2001-11-16','0333333342',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_3.png','Admin'); 
Call InsertEmployeeUser('phamhuynhthaihoai.fitfood@gmail.com','Phạm Huỳnh Thái Hoài','2001-11-14','0333333343',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_4.png','Kế toán'); 
Call InsertEmployeeUser('nhathoang.fitfood@gmail.com','Nhật Hoàng','2001-11-14','0333333344',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_4.png','Kinh doanh'); 
Call InsertEmployeeUser('lethithuyvan.fitfood@gmail.com','Lê Thị Thuý Vân','2001-11-27','0333333345',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_5.png','Admin'); 
Call InsertEmployeeUser('nguyentuongvy.fitfood@gmail.com','Nguyễn Tường Vy','2001-11-14','0333333346',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_6.png','Admin'); 
Call InsertEmployeeUser('nguyenminhchau.fitfood@gmail.com','Nguyễn Minh Châu','2001-11-18','0333333347',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_1.png','Admin'); 
Call InsertEmployeeUser('tranvucongkhanh.fitfood@gmail.com','Trần Vũ Công Khanh','2001-11-12','0333333348',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_2.png','Admin'); 
Call InsertEmployeeUser('truongthainha.fitfood@gmail.com','Trương Thái Nhã','2001-11-13','0333333349',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_3.png','Admin'); 
Call InsertEmployeeUser('lehuuthinh.fitfood@gmail.com','Lê Hữu Thịnh','1999-08-15','0333333350',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_2.png','Kế toán'); 
Call InsertEmployeeUser('phamduynam.fitfood@gmail.com','Phạm Duy Nam','1999-11-14','0333333351',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_3.png','Kinh doanh'); 
Call InsertEmployeeUser('kieunguyetnga.fitfood@gmail.com','Kiều Nguyệt Nga','2000-11-14','0333333352',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_4.png','Admin'); 
Call InsertEmployeeUser('minhkhanh.fitfood@gmail.com','Minh Khánh','2002-11-20','0333333353',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_5.png','Kế toán'); 
Call InsertEmployeeUser('hoanghoang.fitfood@gmail.com','Hoàng Hoàng','1999-11-14','0333333354',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_6.png','Admin'); 
Call InsertEmployeeUser('duongthithuthuy.fitfood@gmail.com','Dương Thị Thu Thuỷ','1998-11-12','0333333355',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_3.png','Kinh doanh'); 
Call InsertEmployeeUser('tranhakhuongduy.fitfood@gmail.com','Trần Hạ Khương Duy','2001-11-11','0333333356',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_1.png','Kinh doanh'); 
Call InsertEmployeeUser('tranhongha.fitfood@gmail.com','Trần Hồng Hà','2000-10-05','0333333357',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_2.png','Admin'); 
Call InsertEmployeeUser('nguyencaonguyen.fitfood@gmail.com','Nguyễn Cao Nguyên','1999-08-06','0333333358',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_3.png','Kế toán'); 
Call InsertEmployeeUser('phamquanghuy.fitfood@gmail.com','Phạm Quang Huy','2000-12-11','0333333359',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_4.png','Admin'); 
Call InsertEmployeeUser('tuankhai.fitfood@gmail.com','Tuần Khải','1999-09-12','0333333360',1,'81','773','27283','Ho Chi Minh','EmployeeAvatar_5.png','Kế toán'); 

-- Data Customer
Call InsertCustomerUser('biao200@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Thái Bảo','2000-09-01','0333121111','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('onlyplaymid@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Công Hoàng','1999-01-24','0333121112','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('calisas001@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Trương Hữu Tài','2001-09-01','0333121113','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('taihhtp01@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Cao Sơn Tài','1998-09-01','0333121114','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('devnguyen02@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Bao Thái Sơn','1997-09-01','0333121115','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('julia002@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Công Hoàng','2000-07-01','0333121116','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('annie003@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Khắc Vĩ','2000-09-01','0333121117','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('darius485@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Nguyễn Thành Nhân','2000-11-01','0333121118','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('annivia001@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Trương Thành Nhơn','2000-09-01','0333121119','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('qiyana@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Lê Văn Tấn','2001-09-01','0333121120','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('levantai002@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Lê Văn Tài','2002-12-01','0333121121','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('nguyenmanh@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Nguyễn Mạnh','1999-09-01','0333121122','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('hhnguyen@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Nguyễn Hữu Hảo','1999-09-01','0333121123','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('biiiii2000@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Nguyễn Quốc Huy','2000-06-01','0333121124','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('phnk@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Cao Sơn Lâm','2000-09-01','0333121125','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('biao@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Phạm Gia Tài','2001-09-01','0333121126','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('81ninh@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Nguyễn Ninh','2001-03-01','0333121127','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('22phong@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Cao Toàn Phong','2000-09-01','0333121128','1','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('njaod101@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Đông Sơn','2002-04-01','0333121129','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('phuong.work@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Huỳnh Phương','1995-02-01','0333121130','2','81','773','27283','Ho Chi Minh');
Call InsertCustomerUser('nguyen.work@gmail.com','$2b$10$3vZxIa867MB5iQw6BNQhtOel/fpsqc5WqkaGFLEmrcn3hGmo/B3IC','Hoài Nguyên','2000-09-01','0333121131','1','81','773','27283','Ho Chi Minh');


-- Data ProductType

INSERT INTO ProductType (`Name`) Values ('Đồ uống');
INSERT INTO ProductType (`Name`) Values ('Đồ ăn');


-- Data Product
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('NƯỚC MÁT THẢO MỘC','100.000',15,'Chai',2,'ProductAvatar_1.png','1');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('FITFOOD JUICE SWEETIE','200.000',100,'Chai',2,'ProductAvatar_2.png','1');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('FITFOOD JUICE GREENIE','100.000',100,'Chai',2,'ProductAvatar_3.png','1');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('BOX Ức gà mềm mọng','379.000',100,'Hộp',2,'ProductAvatar_4.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Cơm gạo lức ăn liền ','100.000',80,'Gói',2,'ProductAvatar_5.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Nhân Burger Gà Teriyaki','100.000',87,'Gói',2,'ProductAvatar_6.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Ức gà ăn liền ','199.000',100,'Hộp',2,'ProductAvatar_7.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gạo lứt Rong Biển','100.000',80,'Hộp',2,'ProductAvatar_8.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Gạo lứt Chà Bông','100.000',100,'Hộp',2,'ProductAvatar_9.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Bánh ngói hạnh nhân','129.000',100,'Hộp',2,'ProductAvatar_10.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Biscotti vị socola','129.000',97,'Hộp',2,'ProductAvatar_11.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('Biscotti vị trà xanh ','100.000',100,'Hộp',2,'ProductAvatar_12.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('BOX Ức gà mềm mọng','379.000',100,'Hộp',2,'ProductAvatar_13.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('BOX Ức gà mềm mọng','379.000',100,'Hộp',2,'ProductAvatar_14.png','2');
Insert Into Product (Name, Price, Quantity, Unit, Highlight,Avatar, ProductTypeID) Values ('BOX Ức gà mềm mọng','379.000',100,'Hộp',2,'ProductAvatar_15.png','2');

SELECT ID, Employee.Username, Name, DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role From Employee INNER JOIN User ON Employee.Username=User.Username
WHERE CONCAT(Employee.Username,'',Name,'',DATE_FORMAT(DayOfBirth, '%Y/%m/%d'),'',PhoneNumber) Like '';

select * from ProductType;
select * from Product;
select * from customer;
select * from employee;
select * from bill;
select * from DetailBill;
INSERT INTO ProductType  SET Name='Type';





Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-10-11',1,1,null);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-12',1,1,null);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-13',1,1,null);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-13',1,2,1);
Insert Into Bill (Date, State, CustomerID, EmployeeID) Values ('2022-11-13',1,2,2);
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('1','2',12,'15000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('1','3',12,'15000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('2','2',12,'15000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('2','3',5,'2000');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('1','2',1,'4800');
Insert Into DetailBill (BillID, ProductID,Quantity, SalePrice) Values ('1','2',1,'15000');




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