const connection = require("./db");

function createCust(customer) {
  const Q1 = "INSERT IGNORE INTO Customers set ?";
  connection.query(Q1, customer, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "error in creating customer " + err });
      return;
    }
    console.log("New Customer Created!");
  });
}

function updateCountReservation(Phone) {
  const Q5 =
    "update Customers set ReservationCounter = ReservationCounter + 1 where right(Phone,9) like Substring(?,2,9)";
  connection.query(Q5, Phone, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in updating Reservation Counter " + err });
      return;
    }
    console.log("New Reservation Counted!");
  });
}

const ContactToDB = (req, res) => {
  //validation
  if (!req.body) {
    res.status(400).send({ message: "wrong inputs" });
    return;
  }
  //pull data to JSON

  const newCust = {
    Phone: req.body.Phone,
    Name: req.body.Name,
    ReservationCounter: 0,
  };
  createCust(newCust);

  const newContact = {
    Phone: req.body.Phone,
    Name: req.body.Name,
    DateContact: new Date(),
    hour:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
    Reason: req.body.Reason,
  };
  //run query
  const Q2 = "Insert into Contacts set ?";
  connection.query(Q2, newContact, (err2, mysqlres) => {
    if (err2) {
      console.log("error: ", err2);
      res.status(400).send({ message: "error in Contact" + err2 });
      return;
    }
    console.log("New Contact Created!");
    res.render("Thanks.pug");
    return;
  });
};

const showAvailableRooms = (req, res) => {
  //validation
  if (new Date(req.body.PickDateBTN) < new Date()) {
    return;
  }
  //pull data to JSON
  const DateParam = new Date(req.body.PickDateBTN);
  //run query
  const Q3 =
    "Select R1.*, IFNULL(CurrentReservations, 0) as CurrentReservations, IFNULL(R2.counter, 0) as ResCounter from Rooms R1 left join (Select RoomID, GROUP_CONCAT(hour) as CurrentReservations, count(*) as counter from RoomReservation where DateReserved = STR_TO_DATE(SUBSTRING(?, 1, 10), '%Y-%m-%d') group by RoomID) R2 on R1.RoomID = R2.RoomID where counter < 9 OR counter is null;";
  connection.query(Q3, DateParam, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in finding available Rooms" + err });
      return;
    }
    console.log("Success in finding available rooms");
    res.render("ShowAvailableRooms", {
      D1: DateParam.toLocaleDateString(),
      Rooms: mysqlres,
    });
    return;
  });
};

const MakeReservation = (req, res) => {
  //validation
  if (!req.body) {
    res.status(400).send({ message: "handle error!" });
    return;
  }

  //pull data to JSON
  const newCust = {
    Phone: req.body.Phone,
    Name: req.body.Name,
    ReservationCounter: 0,
  };
  createCust(newCust);
  updateCountReservation(req.body.Phone);
  const InsertedReservation = {
    RoomID: req.body.RoomID,
    Phone: req.body.Phone,
    DateReserved: new Date(req.body.DateReserved),
    Hour: req.body.Hour,
    Status: "Draft",
  };
  //run query
  const Q4 = "Insert into RoomReservation set ?";
  connection.query(Q4, InsertedReservation, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "error in Creating Reservation " + err });
      return;
    }
    console.log("Success in Creating Reservation");
    res.render("Thanks");
    return;
  });
};

module.exports = { MakeReservation, showAvailableRooms, ContactToDB };
