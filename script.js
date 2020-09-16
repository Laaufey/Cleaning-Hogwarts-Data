"use strict";

const json = "https://petlatkea.dk/2020/hogwarts/students.json";
let list = [];
const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  house: "",
  image: "",
};
const template = document.querySelector("template").content;
const body = document.querySelector("tbody");

window.addEventListener("DOMContentLoaded", start);

function start() {
  loadData();
}

async function loadData() {
  const response = await fetch(json);
  list = await response.json();
  prepareData(json);
}

function prepareData() {
  list.forEach((jsonObject) => {
    const clone = template.cloneNode(true);
    const student = Object.create(Student);
    const fullName = jsonObject.fullname.trim();
    const splitted = fullName.split(" ");
    // const firstName = capitalize(fullName.substring(0, fullName.indexOf(" ")));
    let firstName;
    if (fullName.includes(" ")) {
      firstName = capitalize(fullName.substring(0, fullName.indexOf(" ")));
    } else {
      firstName = capitalize(fullName);
    }
    let lastName;
    if (fullName.includes(" ")) {
      lastName = capitalize(
        fullName.substring(fullName.lastIndexOf(" ")).trim()
      );
    }
    const house = capitalize(jsonObject.house.trim());
    let middleName;
    if (fullName.includes(`"`)) {
      middleName = null;
    } else if (fullName.includes(" ")) {
      middleName = fullName.substring(
        fullName.indexOf(" ") + 1,
        fullName.lastIndexOf(" ") + 1
      );
    } else {
      middleName = null;
    }
    let nickName;
    if (fullName.includes(`"`)) {
      nickName = fullName.substring(
        fullName.indexOf(" ") + 1,
        fullName.lastIndexOf(" ") + 1
      );
    } else {
      nickName = null;
    }

    clone.querySelector("[data-field=firstName]").innerHTML = firstName;
    clone.querySelector("[data-field=lastName]").innerHTML = lastName;
    clone.querySelector("[data-field=middleName]").innerHTML = middleName;
    clone.querySelector("[data-field=nickName]").innerHTML = nickName;
    clone.querySelector("[data-field=house]").innerHTML = house;
    //IMAGE
    body.appendChild(clone);
    // console.log(list);
    // console.log(splitted);
    // console.log(firstName);
    // console.log(lastName);
    // console.log(cleanHouse);
  });
}

function capitalize(str) {
  const cap =
    str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();

  return cap;
}
