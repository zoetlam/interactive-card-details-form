let check = document.querySelectorAll(".check");
const inputs = document.querySelectorAll("input");
let inputArr = Array.from(inputs);
let year = new Date().getFullYear() % 100;
let arr = [];

//for change back to original value when input value = ''
let originalValue = [
  "0000 0000 0000 0000",
  "Jane Appleseed",
  "00",
  "00",
  "000",
];
let targetPlace = ["cardNum", "fullName", "month", "year", "cvc"];
let changePlace = [".card-num", "#name", ".f-month", ".f-year", ".b-cvc"];

let holder = document.querySelector(".info-name");
let card = document.querySelector(".info-numb");
let date = document.querySelector(".info-month-year");
let cvc = document.querySelector(".info-cvc");

function checkNumberWithoutSpace(element) {
  element = element.toString();
  return /^\d+$/.test(element);
}
function getValue(id, maxValue) {
  //limit letter in input field
  let inputElement = document.getElementById(id);
  inputElement.addEventListener("input", function () {
    if (this.value.length > maxValue) {
      this.value = this.value.slice(0, maxValue);
    }
  });
  // limit letter on card
  let value = document.getElementById(id).value;
  if (value.length > maxValue) {
    value = value.slice(0, maxValue);
  }
  return value;
}
function changeInnerHtml(change, a) {
  return (document.querySelector(change).innerText = a);
}
function addSpacesToNumber(number) {
  let numberString = number.toString();
  // Split the string into groups of four digits
  let groups = numberString.match(/.{1,4}/g);
  return groups.join(" ");
}

function noBlank(a) {
  return (a.lastElementChild.innerText = "can't be blank");
}
function showUp(a) {
  if (a.value == "") {
    // Appear Original Value when user delete all
    let z = targetPlace.indexOf(a.id);
    changeInnerHtml(changePlace[z], originalValue[z]);
  } else {
    if (a.id == "cardNum") {
      a.value = getValue(a.id, 16);
      changeInnerHtml(".card-num", addSpacesToNumber(a.value));
    }
    if (a.id == "fullName") {
      a.value = getValue(a.id, 30);
      changeInnerHtml("#name", a.value);
    }
    if (a.id == "month") {
      a.value = getValue(a.id, 2);
      changeInnerHtml(".f-month", a.value);
    }
    if (a.id == "year") {
      a.value = getValue(a.id, 2);
      changeInnerHtml(".f-year", a.value);
    }
    if (a.id == "cvc") {
      a.value = getValue(a.id, 3);
      changeInnerHtml(".b-cvc", a.value);
    }
  }
}

inputs.forEach((element) => {
  element.addEventListener("input", function () {
    const parentInput = this.parentElement;

    // show up on card
    showUp(this);

    //check Bank space and input Validation
    inputs[0].value === ""
      ? noBlank(holder)
      : (holder.lastElementChild.innerHTML = "");
    inputs[1].value === "" ? noBlank(card) : errorType(this);
    !(inputs[2].value === "") || !(inputs[3].value === "")
      ? errorType(this)
      : noBlank(date);
    inputs[4].value === "" ? noBlank(cvc) : errorType(this);
  });
});

function errorType(element) {
  const parentInput = element.parentElement;
  let inputId = element.id;

  //change element value
  if (!(element == inputs[0])) {
    if (!checkNumberWithoutSpace(element.value)) {
      parentInput.lastElementChild.innerText = "Wrong format, numbers only";
      element.classList.add("border-danger");
    } else if (element == inputs[1]) {
      if (element.value.length < 16) {
        parentInput.lastElementChild.innerText = "Please insert 16 digits";
        element.classList.add("border-danger");
      } else {
        parentInput.lastElementChild.innerText = "";
        element.classList.remove("border-danger");
      }
    } else if (element == inputs[2] || element == inputs[3]) {
      if (element.value.length < 2) {
        parentInput.lastElementChild.innerText = "Please insert 2 digits";
        element.classList.add("border-danger");
      } else {
        parentInput.lastElementChild.innerText = "";
        element.classList.remove("border-danger");
      }
      if (element == inputs[2]) {
        if (element.value > 12 || element.value == 0) {
          parentInput.lastElementChild.innerText =
            "Sorry month must in 1 to 12 range";
          element.classList.add("border-danger");
        }
      }
    } else if (element == inputs[4]) {
      if (element.value.length < 3) {
        parentInput.lastElementChild.innerText = "Please insert 3 digits";
        element.classList.add("border-danger");
      } else {
        parentInput.lastElementChild.innerText = "";
        element.classList.remove("border-danger");
      }
    }
  }
}

function checkValid() {
  if (inputs[2].value > 12 || inputs[2].value == 0) {
    date.lastElementChild.innerText = "Sorry month must in 1 to 12 range";
  }
  if (inputs[3].value < year || inputs[3].value == 0) {
    date.lastElementChild.innerText = "Sorry year must greater than " + year;
  }
  if (
    !checkNumberWithoutSpace(inputs[2].value) ||
    !checkNumberWithoutSpace(inputs[3].value)
  ) {
    date.lastElementChild.innerText = "Wrong format, numbers only";
  }
  if (
    inputs[0].value === "" &&
    inputs[1].value === "" &&
    inputs[2].value === "" &&
    inputs[3].value === "" &&
    inputs[4].value === ""
  ) {
    noBlank(holder);
    noBlank(card);
    noBlank(date);
    noBlank(cvc);
  }

  //if arr have any value different than '' then cannot submit
  for (i = 0; i < check.length; i++) {
    arr.push(check[i].innerText);
  }
  if (arr.every((ele) => ele === "")) {
    document.querySelector("#info").classList.add("invisible");
    document.querySelector("#success").classList.remove("invisible");
  }
  arr = [];
}

function reload() {
  window.location.reload();
}
