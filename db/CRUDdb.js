const connection = require("./db");
const csv = require("csvtojson");
const path = require("path");

const CreateRooms = (req, res) => {
  var CreateRooms =
    "CREATE TABLE IF NOT EXISTS Rooms (RoomID int, MaxPersons int, ContainsScreenSound boolean, ContainsTable boolean, Price int, PRIMARY KEY (RoomID));";
  connection.query(CreateRooms, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "error in Creating table Rooms " + err });
      return;
    }
    console.log("Rooms Table Created!");
    res.send("Rooms table was created!");
  });
};

const CreateCustomers = (req, res) => {
  var CreateCustomers =
    "CREATE TABLE IF NOT EXISTS Customers (Phone BigInt, Name varchar(255), ReservationCounter int, PRIMARY KEY (Phone));";
  connection.query(CreateCustomers, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in Creating table Customers " + err });
      return;
    }
    console.log("Customers Table Created!");
    res.send("Customers table was created!");
  });
};

const CreateRoomReservation = (req, res) => {
  var CreateRoomReservation =
    "CREATE TABLE IF NOT EXISTS RoomReservation (RoomID int, Phone BigInt, DateReserved Date, hour varchar(5), status varchar(10), CONSTRAINT PK_RoomReservation PRIMARY KEY (RoomID,DateReserved,hour), FOREIGN KEY FK_RoomReservation_RoomID (RoomID) REFERENCES Rooms(RoomID), FOREIGN KEY FK_RoomReservation_Phone (Phone) REFERENCES Customers(Phone));";
  connection.query(CreateRoomReservation, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in Creating table RoomReservation " + err });
      return;
    }
    console.log("RoomReservation Table Created!");
    res.send("RoomReservation table was created!");
  });
};

const CreateContacts = (req, res) => {
  var CreateContacts =
    "CREATE TABLE Contacts(Phone BigInt, Name varchar(255), DateContact Date, hour varchar(8), Reason varchar(255), CONSTRAINT PK_Contacts PRIMARY KEY (Phone,DateContact, hour), FOREIGN KEY FK_Contacts_Phone (Phone) REFERENCES Customers(Phone));";
  connection.query(CreateContacts, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in Creating table Contacts " + err });
      return;
    }
    console.log("Contacts Table Created!");
    res.send("Contacts table was created!");
    return;
  });
};

const InsertRooms = (req, res) => {
  var InsertRoom = "insert into Rooms Set ?";
  const csvFilePath = path.join(__dirname, "Rooms.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var NewEntry = {
          RoomID: element.RoomID,
          MaxPersons: element.MaxPersons,
          ContainsScreenSound: element.ContainsScreenSound,
          ContainsTable: element.ContainsTable,
          Price: element.Price,
        };
        connection.query(InsertRoom, NewEntry, (err, mysqlres) => {
          if (err) {
            console.log("error: ", err);
            res
              .status(400)
              .send({ message: "error in inserting into table Rooms " + err });
          }
          console.log("Row inserted into Rooms Table!");
        });
      });
    });
  res.send("Rooms were Inserted");
};

const InsertCustomers = (req, res) => {
  var InsertCustomers = "insert into Customers Set ?;";
  const csvFilePath = path.join(__dirname, "Customers.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var NewEntry = {
          Phone: element.Phone,
          Name: element.Name,
          ReservationCounter: element.ReservationCounter,
        };
        connection.query(InsertCustomers, NewEntry, (err, mysqlres) => {
          if (err) {
            console.log("error: ", err);
            res.status(400).send({
              message: "error in inserting into table Customers " + err,
            });
          }
          console.log("Row inserted into Customers Table!");
        });
      });
    });
  res.send("Customers were Inserted");
};

const InsertRoomReservation = (req, res) => {
  var InsertRoomReservation = "insert into RoomReservation Set ?;";
  const csvFilePath = path.join(__dirname, "RoomReservation.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var NewEntry = {
          RoomID: element.RoomID,
          Phone: element.Phone,
          DateReserved: element.DateReserved,
          hour: element.hour,
          status: element.status,
        };
        connection.query(InsertRoomReservation, NewEntry, (err, mysqlres) => {
          if (err) {
            console.log("error: ", err);
            res.status(400).send({
              message: "error in inserting into table RoomReservation " + err,
            });
          }
          console.log("Row inserted into RoomReservation Table!");
        });
      });
    });
  res.send("Room Reservations were Inserted");
};

const InsertContacts = (req, res) => {
  var InsertContacts = "insert into Contacts Set ?;";
  const csvFilePath = path.join(__dirname, "Contacts.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var NewEntry = {
          Phone: element.Phone,
          Name: element.Name,
          DateContact: element.DateContact,
          Hour: element.Hour,
          Reason: element.Reason,
        };
        connection.query(InsertContacts, NewEntry, (err, mysqlres) => {
          if (err) {
            console.log("error: ", err);
            res.status(400).send({
              message: "error in inserting into table Contacts " + err,
            });
          }
          console.log("Row inserted into Contacts Table!");
        });
      });
    });
  res.send("Customers were Inserted");
};

const DropContacts = (req, res) => {
  var DropContacts = "Drop table Contacts;";
  connection.query(DropContacts, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in droppting table Contacts " + err });
      return;
    }
    console.log("Contacts Table Dropped!");
    res.send("Contacts table was Dropped!");
  });
};

const DropRoomReservation = (req, res) => {
  var DropRoomReservation = "Drop table RoomReservation;";
  connection.query(DropRoomReservation, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in droppting table RoomReservation " + err });
      return;
    }
    console.log("RoomReservation Table Dropped!");
    res.send("RoomReservation table was Dropped!");
  });
};

const DropCustomers = (req, res) => {
  var DropCustomers = "Drop table Customers;";
  connection.query(DropCustomers, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in droppting table Customers " + err });
      return;
    }
    console.log("Customers Table Dropped!");
    res.send("Customers table was Dropped!");
  });
};

const DropRooms = (req, res) => {
  var DropRooms = "Drop table Rooms;";
  connection.query(DropRooms, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in droppting table Rooms " + err });
      return;
    }
    console.log("Rooms Table Dropped!");
    res.send("Rooms table was Dropped!");
    return;
  });
};

module.exports = {
  CreateRooms,
  CreateCustomers,
  CreateRoomReservation,
  CreateContacts,
  InsertRooms,
  InsertCustomers,
  InsertRoomReservation,
  InsertContacts,
  DropContacts,
  DropRoomReservation,
  DropCustomers,
  DropRooms,
};
