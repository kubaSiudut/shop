-- Up
   CREATE TABLE IF NOT EXISTS
    Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        neme TEXT,
        len INTEGER,
        height INTEGER,
        width INTEGER,
        material TEXT,
        tooltip TEXT,
        price REAL
       
        
    );
 

  CREATE TABLE IF NOT EXISTS
    Clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        familyName TEXT,
        company TEXT,
        street TEXT,
        postalCode TEXT,
        city TEXT,
        email TEXT,
        phone TEXT,
        password TEXT
    );

 
CREATE TABLE IF NOT EXISTS
    Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        price REAL,
        orderDescription TEXT,
        payment TEXT,
        delivery TEXT,
        firstName TEXT,
        familyName TEXT,
        company TEXT,
        street TEXT,
        postalCode TEXT,
        city TEXT,
        email TEXT,
        phone TEXT,
        addInfo TEXT,
        orderStatus TEXT
    );

 
CREATE TABLE IF NOT EXISTS
    SpecialOrders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderDescription TEXT,
        email TEXT
     
    );

 



-- Down
 

 

DROP TABLE Clients;
DROP TABLE Orders;
DROP TABLE SpecialOrders;
DROP TABLE Products;