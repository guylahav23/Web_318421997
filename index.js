const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;
const connection = require("./db/db");
const CRUD = require("./db/CRUD");
const { mainModule } = require("process");
const CRUDdb = require("./db/CRUDdb");

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("viwes", path.join(__dirname, "viwes"));
app.set("view engine", "pug");

//Routes
app.get("/", (req, res) => {
  res.redirect("/HomePage");
});

app.get("/HomePage", (req, res) => {
  res.render(path.join(__dirname, "views/HomePage.pug"));
});

app.get("/RoomReservation", (req, res) => {
  res.render(path.join(__dirname, "views/RoomReservation.pug"));
});

app.get("/Thanks", (req, res) => {
  res.render(path.join(__dirname, "views/Thanks.pug"));
});

app.get("/Contact", (req, res) => {
  res.render(path.join(__dirname, "views/Contact.pug"));
});

// show rooms route
app.post("/ShowAvailableRooms", CRUD.showAvailableRooms);

// make reservation route
app.post("/MakeReservation", CRUD.MakeReservation);

// ContactToDB
app.post("/ContactToDB", CRUD.ContactToDB);

// Create Insert and Drop table routes
// Create
app.get("/CreateRooms", CRUDdb.CreateRooms);

app.get("/CreateCustomers", CRUDdb.CreateCustomers);

app.get("/CreateRoomReservation", CRUDdb.CreateRoomReservation);

app.get("/CreateContacts", CRUDdb.CreateContacts);
// Insert
app.all("/InsertRooms", CRUDdb.InsertRooms);

app.all("/InsertCustomers", CRUDdb.InsertCustomers);

app.all("/InsertRoomReservation", CRUDdb.InsertRoomReservation);

app.all("/InsertContacts", CRUDdb.InsertContacts);
// Drop
app.get("/DropContacts", CRUDdb.DropContacts);

app.get("/DropRoomReservation", CRUDdb.DropRoomReservation);

app.get("/DropCustomers", CRUDdb.DropCustomers);

app.get("/DropRooms", CRUDdb.DropRooms);

//Listens
app.listen(port, () => {
  console.log("server is running on port " + port);
});
