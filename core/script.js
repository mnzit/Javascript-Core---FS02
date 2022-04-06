
let emailLabel = cElement("label").select().innerText("Email: ").data();
let passwordLabel = cElement("label").select().innerText("Password: ").data();

let emailInputBox = cInput("text").data();
let passwordInputBox = cInput("text").data();

let form = cElement("div")
  .appendChild(() => emailLabel)
  .appendChild(() => emailInputBox)
  .appendChild(() => passwordLabel)
  .appendChild(() => passwordInputBox)
  .data();

let loginButton = cElement("button")
  .select()
  .innerText("Login")
  .action()
  .click((selected) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api-universityportal.herokuapp.com/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let json = {
      emailAddress: emailInputBox.value,
      password: passwordInputBox.value
    };
    xhr.send(JSON.stringify(json));
    xhr.onload = () => {
      console.log(xhr.status)
      select("#render")
        .appendChild(() =>
          cElement("code")
            .select()
            .innerText(xhr.responseText)
            .data()
        )
    }

  })
  .select()
  .data()

select("#render")
  .appendChild(() => form)
  .appendChild(() => loginButton)

let requestParameter = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    emailAddress: "mnzitshakya@gmail.com",
    password: "password"
  })
};

fetch(`https://api-universityportal.herokuapp.com/login`, requestParameter)
  .then(response => response.json())
  .then(data => console.log(data))






