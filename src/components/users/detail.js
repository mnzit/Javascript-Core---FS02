import { Component } from "../../core/component";
import {cElement} from "../../core/element";

export function UserDetailComponent(user) {
  return new Component(render => {
    render.appendChild(() => new cElement("h1").select().innerText("User Detail"));
    render.appendChild(() => new cElement("h2").select().innerText("Firstname: " + user.firstName))
    render.appendChild(() => new cElement("h2").select().innerText("Middlename: " + user.middleName))
    render.appendChild(() => new cElement("h2").select().innerText("Lastname: " + user.lastName))
    render.appendChild(() => new cElement("h2").select().innerText("Gender: " + user.genderType))
    render.appendChild(() => new cElement("h2").select().innerText("Address: " + user.address))
    render.appendChild(() => new cElement("h2").select().innerText("Contact no: " + user.contactNo))
    render.appendChild(() => new cElement("h2").select().innerText("Email Address: " + user.emailAddress))
    return render;
  });
}
