import {cElement} from "../../core/element";
import {Component} from "../../core/component";
import {FormBuilder} from "../../core/form";
import {login} from "../../server/request/auth/authRequest";
import {Router, RouterInstance} from "../../core/router";

export function LoginComponent() {
    return new Component(render => {

        render.appendChild(() => cElement("h1").select().innerText("Login"));

        let form = new FormBuilder()
            .addInput("Email", "text", "emailAddress", "Email Address")
            .addInput("Password", "password", "password", "Password")
            .submitComponent((json) => {
                return new cElement("button")
                    .select()
                    .innerText("Login")
                    .action()
                    .click((selected) => {
                        login(json)
                            .then(data => {
                                if (data.success === true) {
                                    RouterInstance.route("user-list")
                                } else {
                                    RouterInstance.failed(cElement("h2").select().innerText(data.message))
                                }
                            });
                    })
                    .select()
            })
        render.appendChild(() => form)
        return render;
    })
}