
let emailLabel = cElement("label").select().innerText("Email: ").data();
let emailInputBox = cInput().type("text").placeHolder("Enter your Email Address").select().css().width("20%").select().data();
let br = cElement("br").data();
let passwordLabel = cElement("label").select().innerText("Password: ").data();
let passwordInputBox = cInput().type("password").placeHolder("Enter your Password").select().css().width("20%").select().data();
let code = cElement("h6").data();

let form = cElement("div")
  .appendChild(() => emailLabel)
  .appendChild(() => emailInputBox)
  .appendChild(() => br)
  .appendChild(() => passwordLabel)
  .appendChild(() => passwordInputBox)
  .data();

let loginButton = cElement("button")
  .select()
  .innerText("Login")
  .action()
  .click((selected) => {
    let requestParameter = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailAddress: emailInputBox.value,
        password: passwordInputBox.value
      })
    };
    fetch(`https://api-universityportal.herokuapp.com/login`, requestParameter)
      .then(response => response.json())
      .then(data => select(code).innerText(data.message).data())
  })
  .select()
  .data()

select("#render")
  .appendChild(() => form)
  .appendChild(() => loginButton)
  .appendChild(() => code)








