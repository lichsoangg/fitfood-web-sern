CREATE DATABASE FITFOOD;

USE FITFOOD;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
flush privileges;


CREATE TABLE User(
	ID int NOT NULL AUTO_INCREMENT,
	Username varchar(100) NOT NULL,
    Password varchar(255) NOT NULL,
--     IsAdmin boolean NOT NULL DEFAULT false,
	CONSTRAINT PK_User_Id PRIMARY KEY(ID),
    CONSTRAINT UQ_User_Username UNIQUE(Username)
);	


create TABLE Customer(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    DayOfBirth date NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Gender int NOT NULL,
    Province int NOT NULL,
    District int NOT NULL,
    Ward int NOT NULL,
    Address varchar(255) NOT NULL,
    UserID int NOT NULL,
	CONSTRAINT CK_Customer_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_Customer_Gender CHECK(Gender=0 OR Gender=1),
    CONSTRAINT CK_Customer_UserID UNIQUE(UserID),
    CONSTRAINT PK_Customer_Id PRIMARY KEY(ID),
    CONSTRAINT FK_Customer_User FOREIGN KEY(UserID) REFERENCES User(ID)
);

create TABLE Employee(
	ID int NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    DayOfBirth date NOT NULL,
    PhoneNumber varchar(10) NOT NULL,
    Role varchar(20) NOT NULL,
    Salary int NOT NULL,
    Gender int NOT NULL,
    Province int NOT NULL,
    District int NOT NULL,
    Ward int,
    Address varchar(255) NOT NULL,
    UserID int NOT NULL,
	CONSTRAINT CK_Employee_PhoneNumber UNIQUE(PhoneNumber),
	CONSTRAINT CK_Employee_Gender CHECK(Gender=0 OR Gender=1),
    CONSTRAINT CK_Employee_UserID UNIQUE(UserID),
    CONSTRAINT PK_Employee_Id PRIMARY KEY(ID),
    CONSTRAINT FK_Employee_User FOREIGN KEY(UserID) REFERENCES User(ID)
);


INSERT INTO User (`username`,`password`,`isAdmin`)
VALUES ('Trần Hạ Khánh Duy ẮN ẲN ẴN BÁNH MÌ MÈO MÃ MỒ MẠ MÀI MIỆT1','12312456',false);

INSERT INTO Customer (`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`,`UserID`)
VALUES ('Trần Hạ Khánh Duy','2001-11-25','0333123452',1,12,11,11,'423 Điện Biên Phủ',1);

CREATE VIEW CustomerUser AS 
SELECT User.ID as `ID`, Username,Password,IsAdmin, Name, DayOfBirth, PhoneNumber, Gender, Province,District,Ward, Address
FROM User INNER JOIN Customer ON User.ID=Customer.ID;



Insert Into CustomerUser (`ID`,`Username`,`Password`,`IsAdmin`,`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`)

//insert customer
DELIMITER //
CREATE PROCEDURE InsertCustomerUser(IN Username varchar(100), IN Password varchar(255), IN Name varchar(100),
IN DayofBirth date, IN PhoneNumber varchar(10), IN Gender int, IN Province int, IN District int,IN Ward int,IN Address varchar(255)) 
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
          ROLLBACK;
          RESIGNAL;
    END;
START TRANSACTION;
INSERT INTO User (`username`,`password`,`isAdmin`)
VALUES (Username,Password,false);
SELECT MAX(ID) INTO @User_ID FROM User;
INSERT INTO Customer (`Name`,`DayOfBirth`,`PhoneNumber`,`Gender`,`Province`,`District`,`Ward`,`Address`,`UserID`)
VALUES (Name,DayOfBirth,PhoneNumber,Gender,Province,District,Ward,Address,@User_ID);
COMMIT;
END
//
DELIMITER ;


//insert employee
DELIMITER //
CREATE PROCEDURE InsertEmployeeUser(IN Username varchar(100), IN Password varchar(255), IN Name varchar(100),
IN DayofBirth date, IN PhoneNumber varchar(10),IN Role varchar(20),IN Salary int, IN Gender int, IN Province int, IN District int,IN Ward int,IN Address varchar(255)) 
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
          ROLLBACK;
          RESIGNAL;
    END;
START TRANSACTION;
INSERT INTO User (`username`,`password`,`isAdmin`)
VALUES (Username,Password,false);
SELECT MAX(ID) INTO @User_ID FROM User;
INSERT INTO Employee (`Name`,`DayOfBirth`,`PhoneNumber`,`Role`,`Salary`,`Gender`,`Province`,`District`,`Ward`,`Address`,`UserID`)
VALUES (Name,DayOfBirth,PhoneNumber,Role,Salary,Gender,Province,District,Ward,Address,@User_ID);
COMMIT;
END
//
DELIMITER ;


//get info user
DELIMITER //
CREATE PROCEDURE GetInfoUser(IN Username varchar(100)) 
BEGIN
DECLARE UserID int DEFAULT 0;
SELECT ID INTO UserID FROM User WHERE User.Username=Username;
If EXISTS (SELECT 1 FROM Customer WHERE Customer.UserID=UserID) THEN 
SELECT * FROM Customer WHERE Customer.UserID=UserID; END IF;

If EXISTS (SELECT 1 FROM Employee WHERE Employee.UserID=UserID) THEN 
SELECT * FROM Employee WHERE Employee.UserID=UserID; END IF;

END
//
DELIMITER ;


CALL GetInfoUser('taikhoan2');

CALL InsertCustomerUser('khanhduy','123456','Trần Hạ Khánh Duy','2001-11-14','0333521487',1,10,10,10,'423 Điện Biên Phủ');

CALL InsertEmployeeUser('khanhduy1','123456','Trần Hạ Khánh Duy','2001-11-14','0333521487','Ke Toan',100000,1,10,10,10,'423 Điện Biên Phủ');


select * from customer where phonenumber='0333521477';														

DROP PROCEDURE GetInfoUser;

select * from user inner join customer on user.ID=customer.userID where user.ID=29;

