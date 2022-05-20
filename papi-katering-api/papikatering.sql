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

CREATE TABLE Review (
    ReviewID INT,
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