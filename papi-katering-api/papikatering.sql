CREATE TABLE Customer (
    CustomerID INT,
    CustomerImage VARCHAR(100),
    CustomerName VARCHAR(50) NOT NULL,
    CustomerEmail VARCHAR(50) NOT NULL,
    CustomerPhone VARCHAR(13) NOT NULL,
    CustomerDOB DATE NOT NULL,
    CustomerGender VARCHAR(10) NOT NULL,
    CustomerPassword VARCHAR(50) NOT NULL,

    CONSTRAINT CustomerID_PK PRIMARY KEY(CustomerID),
    CONSTRAINT PhoneCheck CHECK(CustomerPhone ~ '[0-9]{11}|[0-9]{12}|[0-9]{13}'),
    CONSTRAINT GenderCheck CHECK(CustomerGender IN ('Male','Female'))
);

-- INSERT INTO Customer (CustomerID, CustomerImage, CustomerName, CustomerEmail, CustomerPhone, CustomerDOB, CustomerGender, CustomerPassword) 
-- VALUES(
--     2,
--     NULL,
--     'Beegang',
--     'bee@gimel.com',
--     '087712387912',
--     '2002-11-24',
--     'Female',
--     'maklosshi'
-- );

CREATE TABLE Merchant (
    MerchantID INT,
    CustomerID INT,
    MerchantImage VARCHAR(100),
    MerchantName VARCHAR(50) NOT NULL,
    MerchantAddress TEXT NOT NULL,
    MerchantPhone VARCHAR(13) NOT NULL,

    CONSTRAINT MerchantID_PK PRIMARY KEY(MerchantID),
    CONSTRAINT CustomerID_FK FOREIGN KEY(CustomerID)
        REFERENCES Customer(CustomerID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PhoneCheck CHECK(MerchantPhone ~ '[0-9]{11}|[0-9]{12}|[0-9]{13}')
);

-- INSERT INTO Merchant (MerchantID, CustomerID, MerchantImage, MerchantName, MerchantAddress, MerchantPhone)
-- VALUES (
--     102,
--     2,
--     NULL,
--     'purr',
--     'di maklo',
--     '0987654321098'
-- );

CREATE TABLE Payment (
    PaymentID INT,
    CustomerID INT,
    PaymentName VARCHAR(50),
    PaymentNumber CHAR(16),

    CONSTRAINT PaymentID_PK PRIMARY KEY(PaymentID),
    CONSTRAINT CustomerID_FK FOREIGN KEY(CustomerID)
        REFERENCES Customer(CustomerID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PaymentNumberCheck CHECK(PaymentNumber ~ '[0-9]*')
);

-- INSERT INTO Payment (PaymentID, CustomerID, PaymentName, PaymentNumber)
-- VALUES 
-- (1001, 1, 'Main Card', '1234123412341234'),
-- (1002, 1, 'Credit Card', '6969696969696969'),
-- (1003, 1, 'Debit Card', '1234567890123456')
-- ;

CREATE TABLE Address (
    AddressID SERIAL,
    CustomerID INT,
    AddressName VARCHAR(50),
    AddressDetails TEXT,

    CONSTRAINT AddressID_PK PRIMARY KEY(AddressID),
    CONSTRAINT CustomerID_FK FOREIGN KEY(CustomerID)
        REFERENCES Customer(CustomerID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- INSERT INTO Address (CustomerID, AddressName, AddressDetails)
-- VALUES 
-- (1, 'Rumah', 'Dimana mana hatiku senang'),
-- (1, 'Apartemen', 'Kaya gw')
-- ;

CREATE TABLE Preference (
    CustomerID INT,
    Halal INT NOT NULL,
    Vegetarian INT NOT NULL,
    MinPrice INT NOT NULL,
    MaxPrice INT NOT NULL,

    CONSTRAINT Preference_PK PRIMARY KEY(CustomerID),
    CONSTRAINT CustomerID_FK FOREIGN KEY(CustomerID)
        REFERENCES Customer(CustomerID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT HalalCheck CHECK(Halal IN (-1,0,1)),
    CONSTRAINT VegetarianCheck CHECK(Vegetarian IN (-1,0,1))
);

CREATE TABLE Packet (
    PacketID SERIAL,
    MerchantID INT,
    PacketName VARCHAR(50),
    PacketImage VARCHAR(100),
    PacketPrice INT,
    PacketDescription TEXT,

    CONSTRAINT PacketID_PK PRIMARY KEY(PacketID),
    CONSTRAINT MerchantID_FK FOREIGN KEY(MerchantID)
        REFERENCES Merchant(MerchantID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- INSERT INTO Packet(MerchantID, PacketName, PacketImage, PacketPrice, PacketDescription)
-- VALUES
-- (
--     102,
--     'Deez Nuts',
--     NULL,
--     25000,
--     'Enak pokonya'
-- );

CREATE TABLE Menu (
    MenuID SERIAL,
    PacketID INT,
    MenuDay INT,

    CONSTRAINT MenuID_PK PRIMARY KEY(MenuID),
    CONSTRAINT PacketID_FK FOREIGN KEY(PacketID)
        REFERENCES Packet(PacketID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT MenuDayCheck CHECK(MenuDay >=1 AND MenuDay <=7)

);

CREATE TABLE MenuItem (
    MenuItemID SERIAL,
    MenuID INT,
    MenuTime VARCHAR(10),
    MenuName VARCHAR(50),
    MenuImage VARCHAR(100),
    MenuDescription VARCHAR(255),

    CONSTRAINT MenuItemID_PK PRIMARY KEY(MenuItemID),
    CONSTRAINT MenuID_FK FOREIGN KEY(MenuID)
        REFERENCES Menu(MenuID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT MenuTimeCheck CHECK(MenuTime IN ('Breakfast','Lunch','Dinner'))
);

CREATE TABLE Orders (
    OrderID SERIAL,
    PacketID INT,
    MerchantID INT,
    CustomerID INT,
    AddressID INT,
    PaymentID INT,
    OrderDate DATE NOT NULL,
    OrderDayCount INT NOT NULL,
    OrderAdditionalPrice INT NOT NULL,
    OrderQuantity INT NOT NULL,
    OrderStatus INT NOT NULL, 

    CONSTRAINT OrderID_PK PRIMARY KEY(OrderID),
    CONSTRAINT PacketID_FK FOREIGN KEY(PacketID)
        REFERENCES Packet(PacketID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT MerchantID_FK FOREIGN KEY(MerchantID)
        REFERENCES Merchant(MerchantID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT CustomerID_FK FOREIGN KEY(CustomerID)
        REFERENCES Customer(CustomerID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT AddressID_FK FOREIGN KEY(AddressID)
        REFERENCES Address(AddressID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT OrderStatusCheck CHECK(OrderStatus IN (0,1))
);

-- INSERT INTO Orders (PacketID, MerchantID, CustomerID, AddressID, PaymentID, OrderDate, OrderDayCount, OrderAdditionalPrice, OrderQuantity, OrderStatus)
-- VALUES
-- (
--     2, 102, 1, 2, 1001,
--     '2022-01-12', 2, 10000, 3, 1
-- ),
-- (
--     2, 102, 1, 2, 1001,
--     '2022-06-02', 2, 15000, 4, 0
-- );

CREATE TABLE Review (
    ReviewID SERIAL,
    CustomerID INT,
    PacketID INT,
    ReviewDate DATE,
    ReviewRating INT,
    ReviewDescription TEXT,

    CONSTRAINT ReviewID_PK PRIMARY KEY(ReviewID),
    CONSTRAINT CustomerID_FK FOREIGN KEY(CustomerID)
        REFERENCES Customer(CustomerID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PacketID_FK FOREIGN KEY(PacketID)
        REFERENCES Packet(PacketID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ReviewRatingCheck CHECK(ReviewRating >=1 AND ReviewRating <=5)
);

INSERT INTO Review (CustomerID, PacketID, ReviewDate, ReviewRating, ReviewDescription)
VALUES
(1, 2, '2022-02-01', 4, 'Anjay Cakep Enak Mas'),
(1, 2, '2022-03-01', 5, 'Gels enak pars'),
(1, 2, '2022-01-02', 2, 'Kok ryne ga keri sih');

CREATE TABLE Category (
    CategoryID INT,
    CategoryName VARCHAR(50),

    CONSTRAINT CategoryID_PK PRIMARY KEY(CategoryID)
);

CREATE TABLE PacketCategory (
    PacketID INT,
    CategoryID INT,

    CONSTRAINT PKs PRIMARY KEY(PacketID, CategoryID),
    CONSTRAINT PacketID_FK FOREIGN KEY(PacketID)
        REFERENCES Packet(PacketID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT CategoryID_FK FOREIGN KEY(CategoryID)
        REFERENCES Category(CategoryID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- SELECT
--     *
-- FROM
--     orders o
--     JOIN packet p on p.PacketID = o.PacketID
--     JOIN merchant m on m.MerchantID = o.MerchantID
-- WHERE
--     o.CustomerID = 1
--     AND o.OrderStatus = 1;

-- SELECT
--     *
-- FROM
--     review r
--     JOIN customer c on c.CustomerID = r.CustomerID
--     JOIN packet p on p.CustomerID = r.CustomerID
-- WHERE
--     r.CustomerID = 1;