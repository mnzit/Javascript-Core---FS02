"use strict";

var emailLabel = cElement("label").select().innerText("Email: ").data();
var passwordLabel = cElement("label").select().innerText("Password: ").data();
var emailInputBox = cInput("text").data();
var passwordInputBox = cInput("text").data();
var form = cElement("div").appendChild(function () {
  return emailLabel;
}).appendChild(function () {
  return emailInputBox;
}).appendChild(function () {
  return passwordLabel;
}).appendChild(function () {
  return passwordInputBox;
}).data();
var loginButton = cElement("button").select().innerText("Login").action().click(function (selected) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api-universityportal.herokuapp.com/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var json = {
    emailAddress: emailInputBox.value,
    password: passwordInputBox.value
  };
  xhr.send(JSON.stringify(json));

  xhr.onload = function () {
    console.log(xhr.status);
    select("#render").appendChild(function () {
      return cElement("code").select().innerText(xhr.responseText).data();
    });
  };
}).select().data();
select("#render").appendChild(function () {
  return form;
}).appendChild(function () {
  return loginButton;
});
var requestParameter = {
  method: 'POST',
  //This could be any http method
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    emailAddress: "mnzitshakya@gmail.com",
    password: "password"
  })
};
fetch("https://api-universityportal.herokuapp.com/login", requestParameter).then(function (response) {
  return response.json();
}).then(function (data) {
  return console.log(data);
});