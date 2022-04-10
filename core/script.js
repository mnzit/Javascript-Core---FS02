const BASE_URL = "https://api-universityportal.herokuapp.com";
const LOGIN = `${BASE_URL}/login`;
const COURSE = `${BASE_URL}/courses`;
const USER = `${BASE_URL}/users`;
const ROLE = `${BASE_URL}/roles`;

let render = select("#render")

let loginLogoutButton = !isAuthenticated() ? new routeButton("Login", "login") : new routeButton("Logout", "logout", () => sessionStorage.removeItem("token"))
let userListButton = new routeButton("Users", "user")
let createUserButton = new routeButton("Add User", "user-create")

let controller = router(render)
controller.register('login', loginComponent)
controller.register('user', userListComponent)
controller.register('user-detail', userDetailComponent)
controller.register("user-create", createUserComponent)
controller.register('logout', loginComponent)
controller.onLoad(sessionStorage.getItem("token") != null ? userListComponent : loginComponent)

function loginComponent() {
  let render = cElement("div");
  let loading = cElement("img").select().src("loading.gif").css().width("25px").height("25px").select().data();
  let heading = cElement("h1").select().innerText("Login").data();
  render.appendChild(() => heading);
  let jsonDisplayer = cElement("pre").select()
  let form = formBuilder()
    .addInput("Email", "text", "emailAddress", "Email Address")
    .addInput("Password", "password", "password", "Password")
    .onUpdate((json) => jsonDisplayer.innerText(JSON.stringify(json, null, 2)))
  render.appendChild(() => form.data())

  let loginButton = cElement("button")
    .select()
    .innerText("Login")
    .action()
    .click((selected) => {
      select(h6).appendChild(() => loading);
      let requestParameter = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.json())
      };
      fetch(LOGIN, requestParameter)
        .then(response => {
          let token = response.headers.get('Authorization');
          sessionStorage.setItem("token", token);
          return response.json()
        })
        .then(data => {
          if (data.success === true) {
            controller.route('user')
          } else {
            controller.failed(cElement("h2").select().innerText(data.message).data())
          }
        })
    })
    .select()
    .data()

  render.appendChild(() => loginButton)
  render.appendChild(() => jsonDisplayer.data())

  let h6 = cElement("h6").data();
  render.appendChild(() => h6)

  return render.data();
}


function userDetailComponent(user) {
  let render = cElement("div");
  render.appendChild(() => userListButton)
  render.appendChild(() => loginLogoutButton)
  let heading = cElement("h1").select().innerText("User Detail").data();
  render.appendChild(() => heading);
  render.appendChild(() => cElement("h2").select().innerText("Firstname: " + user.firstName).data())
  render.appendChild(() => cElement("h2").select().innerText("Lastname: " + user.lastName).data())
  render.appendChild(() => cElement("h2").select().innerText("Gender: " + user.genderType).data())
  render.appendChild(() => cElement("h2").select().innerText("Address: " + user.address).data())
  render.appendChild(() => cElement("h2").select().innerText("Contact no: " + user.contactNo).data())
  render.appendChild(() => cElement("h2").select().innerText("Email Address: " + user.emailAddress).data())
  render.appendChild(() => cElement("h2").select().innerText("Role: " + user.role).data())

  return render.data();
}


function userListComponent() {
  let render = cElement("div");
  render.appendChild(() => loginLogoutButton)
  render.appendChild(() => createUserButton)
  let heading = cElement("h1").select().innerText("Users").data();
  render.appendChild(() => heading);

  let userTableWrapper = cElement("div");

  let requestParameter = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("token")
    }
  };

  fetch(USER, requestParameter).then(response => response.json())
    .then(response => {
      let table = tableBuilder(response.data)
        .addColumn("First name", "firstName")
        .addColumn("Last name", "lastName")
        .addColumn("Gender", "genderType")
        .addColumn("Address", "address")
        .addColumn("Contact no", "contactNo")
        .addColumn("Email Address", "emailAddress")
        .addColumn("Role", "role")
        .addColumnDynamic("Action", "firstName", function (user) {

          let edit = cElement("button")
            .select()
            .innerText("View")
            .action()
            .click((selected) => controller.route('user-detail', user))
            .select()
            .data();

          let remove = cElement("button")
            .select()
            .innerText("Delete")
            .action()
            .click((selected) => controller.route('user-detail', user))
            .select()
            .data();

          return cElement("span")
            .appendChild(() => edit)
            .appendChild(() => remove)
            .data();
        })
        .build();
      userTableWrapper.appendChild(() => table)
    })

  render.appendChild(() => userTableWrapper.data())
  return render.data();
}

function getRoles() {
  let requestParameter = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("token")
    }
  };

  return fetch(ROLE, requestParameter)
    .then(response => response.json())
    .then(response => {
      let rolesData = [];
      response.data.roles.forEach((role) => {
        rolesData.push({
          key: role.id,
          value: role.name
        })
      })
      return rolesData;
    })
}

function createUserComponent() {
  let render = cElement("div");
  render.appendChild(() => loginLogoutButton)
  render.appendChild(() => userListButton)
  let heading = cElement("h1").select().innerText("Create User").data();
  render.appendChild(() => heading);

  let jsonDisplayer = cElement("pre").select()
  let form = formBuilder()
    .addInput("Firstname", "text", "firstName", "First Name", { "notNull": true, "length": 10 })
    .addInput("Middlename", "text", "middleName", "Middle Name")
    .addInput("Lastname", "text", "lastName", "Last Name")
    .addInput("Gender", "dropdown", "genderType", "Gender", null, [{ key: "MALE", value: "Male" }, { key: "FEMALE", value: "Female" }])
    .addInput("Address", "text", "address", "Address")
    .addInput("Contact no", "text", "contactNo", "Contact no")
    .addInput("Email Address", "text", "emailAddress", "Email Address")
    .addInput("Send Email", "checkbox", "sendEmail", "Send Email")
    .addInput("Generate Password", "checkbox", "isPasswordGenerated", "Generate Password")
    .addInput("Role", "dropdown", "roleId", "Role", null, getRoles)
    .onUpdate((formData) => jsonDisplayer.innerText(JSON.stringify(formData, null, 2)))
    .submitComponent((json) => {
      return cElement("button")
        .select()
        .innerText("Save")
        .action()
        .click((selected) => {
          let requestParameter = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem("token")
            },
            body: JSON.stringify(json)
          };
          fetch(USER, requestParameter)
            .then(response => {
              return response.json()
            })
            .then(data => {
              if (data.success === true) {
                controller.route('user')
              } else {
                controller.failed(cElement("h2").select().innerText(data.message).data())
              }
            })
        })
        .select()
        .data()
    })

  render.appendChild(() => form.data())
  render.appendChild(() => jsonDisplayer.data())


  return render.data();
}

function isAuthenticated() {
  return sessionStorage.getItem("token") != null;
}




