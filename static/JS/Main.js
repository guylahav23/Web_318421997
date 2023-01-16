const { response } = require("express");

//Page Load
function PageLoad() {
  var path2 = window.location.pathname;
  var pageName = path2.replace("/", "");
  var btnName = pageName + "BTN";
  var AElements = document.getElementsByClassName("MainMenuA");
  for (var i = 0; i < AElements.length; i++) {
    if (AElements.item(i).id == btnName)
      AElements.item(i).classList.add("activeABTN");
  }
}

function ContactUs() {
  if (ValidateContactForm() == true) {
    var nameInput = document.getElementById("NameForm").value;
    var PhoneInput = document.getElementById("PhoneForm").value;
    var reasonInput = document.getElementById("ReasonForm").value;
    fetch("./ContactToDB", {
      method: "POST",
      body: JSON.stringify({
        Phone: PhoneInput,
        Name: nameInput,
        DateContact: new Date(),
        hour:
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds(),
        Reason: reasonInput,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert(json.message);
      });
    document.location.href = "thanks";
  }
}

function ValidateContactForm() {
  var nameInput = document.getElementById("NameForm").value;
  var phoneInput = document.getElementById("PhoneForm").value;
  var reasonInput = document.getElementById("ReasonForm").value;
  var ret = false;
  var letters = /^[A-Za-z]+$/;
  if (!nameInput.match(letters) || nameInput == "") {
    document.getElementById("invalidName").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidName").style.display = "none";
  }
  var phoneFormat = /^[0-9]+$/;
  if (!phoneInput.match(phoneFormat) || phoneInput.length != 10) {
    document.getElementById("invalidPhone").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidPhone").style.display = "none";
  }
  if (ret) {
    return false;
  } else {
    return true;
  }
}

function ShowOptionalReservations() {
  ValidateDate();
}

function ValidateDate() {
  var datePicked = document.getElementById("PickDateBTN").value;
  var dateToday = new Date();

  if (new Date(datePicked).getTime() < dateToday.getTime()) {
    // Invalid Date
    document.getElementById("invalidDate").style.display = "block";
  } else {
    // Valid Date
    document.getElementById("invalidDate").style.display = "none";
  }
}

function Reserve(RoomID, D1) {
  document
    .getElementById("ReservationWindowHeader")
    .setAttribute("name", "RoomIDForm");
  document.getElementById("ReservationWindowHeader").innerHTML =
    "הזמנת חדר " + RoomID;
  document.getElementById("RoomIDForm").value = RoomID;
  const MySelect = document.querySelector("select");
  var ResOptions = document.getElementsByClassName("ReservationOption");
  for (i = 10; i > 0; i--) {
    MySelect.remove(i);
  }
  for (var i = 0; i < ResOptions.length; i++) {
    if (ResOptions.item(i).getAttribute("name") == RoomID) {
      let newOption = new Option(
        ResOptions.item(i).textContent,
        ResOptions.item(i).textContent
      );
      MySelect.add(newOption, undefined);
    }
  }
  document.getElementById("overlay").style.display = "block";
  document.getElementById("ReservationWindow").style.display = "block";
}

function CancelReserve() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("ReservationWindow").style.display = "none";
}

function SubmitReservation() {
  if (ValidateReservation() == true) {
    var nameInput = document.getElementById("NameForm").value;
    var dateInput = document.getElementById("DateForm").value;
    var RoomIDInput = document.getElementById("RoomIDForm").value;
    var phoneInput = document.getElementById("PhoneForm").value;
    var hourInput = document.getElementById("HourForm").value;
    fetch("./MakeReservation", {
      method: "POST",
      body: JSON.stringify({
        Phone: phoneInput,
        Name: nameInput,
        Hour: hourInput,
        RoomID: RoomIDInput,
        DateReserved: dateInput,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert(json.message);
      });
    document.location.href = "thanks";
  }
}

function ValidateReservation() {
  var nameInput = document.getElementById("NameForm").value;
  var phoneInput = document.getElementById("PhoneForm").value;
  var hourInput = document.getElementById("HourForm").value;
  var ret = false;
  var letters = /^[A-Za-z]+$/;
  if (!nameInput.match(letters) || nameInput == "") {
    document.getElementById("invalidName").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidName").style.display = "none";
  }
  var phoneFormat = /^[0-9]+$/;
  if (!phoneInput.match(phoneFormat) || phoneInput.length != 10) {
    document.getElementById("invalidPhone").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidPhone").style.display = "none";
  }
  if (hourInput == "Wrong") {
    document.getElementById("invalidHour").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidHour").style.display = "none";
  }
  return !ret;
}
