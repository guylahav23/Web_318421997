function ContactUs() {
  ValidateContactForm();
}

function ValidateContactForm() {
  var nameInput = document.getElementById("NameForm").value;
  var emailInput = document.getElementById("EmailForm").value;
  var reasonInput = document.getElementById("ReasonForm").value;
  var ret = false;
  var letters = /^[A-Za-z]+$/;
  if (!nameInput.match(letters) || nameInput == "") {
    document.getElementById("invalidName").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidName").style.display = "none";
  }
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailInput.match(mailFormat)) {
    document.getElementById("invalidEmail").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidEmail").style.display = "none";
  }
  if (ret) {
    return;
  } else {
    window.location.href = "Thanks.html";
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
    document.getElementById("OptionalRooms").style.display = "none";
  } else {
    // Valid Date
    document.getElementById("invalidDate").style.display = "none";
    document.getElementById("OptionalRooms").style.display = "block";
  }
}

function Reserve() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("ReservationWindow").style.display = "block";
}

function CancelReserve() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("ReservationWindow").style.display = "none";
}

function SubmitReservation() {
  ValidateReservation();
}

function ValidateReservation() {
  var nameInput = document.getElementById("NameForm").value;
  var phoneInput = document.getElementById("PhoneForm").value;
  var hourInput = document.getElementById("HourForm").value;
  var durationInput = document.getElementById("DurationForm").value;
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
  if (durationInput == "Wrong") {
    document.getElementById("invalidDuration").style.display = "block";
    ret = true;
  } else {
    document.getElementById("invalidDuration").style.display = "none";
  }
  if (ret) {
    return;
  } else {
    window.location.href = "Thanks.html";
  }
}

function PageLoad() {
  var path2 = window.location.pathname;
  var pageName = path2
    .split("/")
    .pop()
    .substring(0, path2.split("/").pop().indexOf("."));
  var btnName = pageName + "BTN";
  var AElements = document.getElementsByClassName("MainMenuA");
  for (var i = 0; i < AElements.length; i++) {
    if (AElements.item(i).id == btnName)
      AElements.item(i).classList.add("activeABTN");
  }
}
