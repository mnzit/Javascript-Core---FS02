/**
 * TODO: Separation of Concern
 */

/**
 * Server paths
 */
const BASE_URL = "https://api-universityportal.herokuapp.com";
// const BASE_URL = "http://localhost:8080/UniversityPortal";
const LOGIN = `${BASE_URL}/login`;
const COURSE = `${BASE_URL}/courses`;
const USER = `${BASE_URL}/users`;
const ROLE = `${BASE_URL}/roles`;

/**
 * Main render component
 */
let render = select("#render")


/**
 * Controller and their mappings
 */
let controller = router(render)
controller.register('login', loginComponent)
controller.register('user', userListComponent)
controller.register('user-detail', userDetailComponent)
controller.register("user-create", createUserComponent)
controller.register('user-edit', userEditComponent)
controller.register('logout', loginComponent)
controller.onLoad(sessionStorage.getItem("token") != null ? userListComponent : loginComponent)


/**
 * 
 * User Login Component
 */
function loginComponent() {
  let render = cElement("div");
  let heading = cElement("h1").select().innerText("Login").data();
  render.appendChild(() => heading);
  let jsonDisplayer = cElement("pre").select()
  let form = formBuilder()
    .addInput("Email", "text", "emailAddress", "Email Address")
    .addInput("Password", "password", "password", "Password")
    // .onUpdate((json) => jsonDisplayer.innerText(JSON.stringify(json, null, 2)))
  render.appendChild(() => form.data())

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

/**
 * 
 * User Detail Component
 */
function userDetailComponent(user) {
  let render = cElement("div");
  render.appendChild(() => new routeButton("Users", "user", null, controller))
  render.appendChild(() => !isAuthenticated() ? new routeButton("Login", "login", null, controller) : new routeButton("Logout", "logout", () => sessionStorage.removeItem("token"), controller))
  let heading = cElement("h1").select().innerText("User Detail").data();
  render.appendChild(() => heading);
  render.appendChild(() => cElement("h2").select().innerText("Firstname: " + user.firstName).data())
  render.appendChild(() => cElement("h2").select().innerText("Middlename: " + user.middleName).data())
  render.appendChild(() => cElement("h2").select().innerText("Lastname: " + user.lastName).data())
  render.appendChild(() => cElement("h2").select().innerText("Gender: " + user.genderType).data())
  render.appendChild(() => cElement("h2").select().innerText("Address: " + user.address).data())
  render.appendChild(() => cElement("h2").select().innerText("Contact no: " + user.contactNo).data())
  render.appendChild(() => cElement("h2").select().innerText("Email Address: " + user.emailAddress).data())

  return render.data();
}

/**
 * 
 * User List Component
 */
function userListComponent() {
  let render = cElement("div");
  render.appendChild(() => new routeButton("Add User", "user-create", null, controller))
  render.appendChild(() => !isAuthenticated() ? new routeButton("Login", "login", null, controller) : new routeButton("Logout", "logout", () => sessionStorage.removeItem("token"), controller))
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
        .addColumnDynamic("Action", "firstName", function (user, row) {

          let detail = cElement("button")
            .select().innerText("View").action()
            .click((selected) => {
              let requestParameter = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': sessionStorage.getItem("token")
                }
              };
              fetch(`${USER}/${user.id}`, requestParameter)
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  if (data.success === true) {
                    controller.route('user-detail', data.data)
                  } else {
                    controller.failed(cElement("h2").select().innerText(data.message).data())
                  }
                })
            })
            .select().data();

          let edit = cElement("button")
            .select().innerText("Edit").action()
            .click((selected) => {
              let requestParameter = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': sessionStorage.getItem("token")
                }
              };
              fetch(`${USER}/${user.id}`, requestParameter)
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  if (data.success === true) {
                    controller.route('user-edit', data.data)
                  } else {
                    controller.failed(cElement("h2").select().innerText(data.message).data())
                  }
                })
            })
            .select()
            .data();

          let remove = cElement("button")
            .select().innerText("Delete").action()
            .click((selected) => {
              let requestParameter = {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': sessionStorage.getItem("token")
                }
              };
              fetch(`${USER}/${user.id}`, requestParameter)
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  if (data.success === true) {
                    row.remove();
                  } else {
                    controller.failed(cElement("h2").select().innerText(data.message).data())
                  }
                })

            })
            .select().data();

          return cElement("span")
            .appendChild(() => detail)
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

/**
 * 
 * Fetch Roles and Map them to dropdown format
 */
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
      response?.data?.roles?.forEach((role) => {
        rolesData.push({
          key: role.id,
          value: role.name
        })
      })
      return rolesData;
    })
}

/**
 * 
 * User Create Component
 */
function createUserComponent() {
  let render = cElement("div");
  render.appendChild(() => new routeButton("Users", "user", null, controller))
  render.appendChild(() => !isAuthenticated() ? new routeButton("Login", "login", null, controller) : new routeButton("Logout", "logout", () => sessionStorage.removeItem("token"), controller))
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
    // .onUpdate((formData) => jsonDisplayer.innerText(JSON.stringify(formData, null, 2)))
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

/**
 * 
 * User Edit Component
 */
function userEditComponent(user) {
  let render = cElement("div");
  render.appendChild(() => new routeButton("Users", "user", null, controller))
  render.appendChild(() => !isAuthenticated() ? new routeButton("Login", "login", null, controller) : new routeButton("Logout", "logout", () => sessionStorage.removeItem("token"), controller))

  let heading = cElement("h1").select().innerText("Edit User").data();
  render.appendChild(() => heading);

  let jsonDisplayer = cElement("pre").select()
  let form = formBuilder()
    .addInput("Firstname", "text", "firstName", "First Name")
    .addInput("Middlename", "text", "middleName", "Middle Name")
    .addInput("Lastname", "text", "lastName", "Last Name")
    .addInput("Gender", "dropdown", "genderType", "Gender", null, [{ key: "MALE", value: "Male" }, { key: "FEMALE", value: "Female" }])
    .addInput("Address", "text", "address", "Address")
    .addInput("Contact no", "text", "contactNo", "Contact no")
    .addInput("Email Address", "text", "emailAddress", "Email Address")
    .addInput("Role", "dropdown", "roleId", "Role", null, getRoles)
    .patch(user)
    // .onUpdate((formData) => jsonDisplayer.innerText(JSON.stringify(formData, null, 2)))
    .submitComponent((json) => {
      return cElement("button")
        .select()
        .innerText("Update")
        .action()
        .click((selected) => {
          let requestParameter = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem("token")
            },
            body: JSON.stringify(json)
          };
          fetch(USER, requestParameter)
            .then(response => {
              console.log(response)
              if (!response.ok) {
                controller.failed(cElement("h2").select().innerText("User update failed").data())
              } else {
                return response.json()
              }
            })
            .then(data => {
              if (data) {
                if (data.success === true) {
                  controller.route('user')
                } else {
                  controller.failed(cElement("h2").select().innerText(data.message).data())
                }
              } else {
                controller.failed(cElement("h2").select().innerText("User update failed").data())
              }
            }).catch(error => {
              controller.failed(cElement("h2").select().innerText("User update failed").data())
            })
        })
        .select()
        .data()
    })

  render.appendChild(() => form.data())
  render.appendChild(() => jsonDisplayer.data())
  return render.data();
}


/**
 * 
 * Authentication check
 */
function isAuthenticated() {
  return sessionStorage.getItem("token") != null;
}
