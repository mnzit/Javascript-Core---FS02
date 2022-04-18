import {Component} from "../../core/component";
import {save} from "../../server/request/users/usersRequest";
import {cElement} from "../../core/element";
import {genders} from "../../constants/dropdownConstants";
import {mapRolesAsDropdown} from "../../mapper/dropdownMapper";
import {roles} from "../../server/request/roles/rolesRequest";
import {FormBuilder} from "../../core/form";
import {router} from "../../index";

export function UserCreateComponent() {
    return new Component(render => {
        render.appendChild(() => new cElement("h1").select().innerText("Create User"));
        let form = new FormBuilder()
            .addInput("Firstname", "text", "firstName")
            .addInput("Middlename", "text", "middleName", "Middle Name")
            .addInput("Lastname", "text", "lastName", "Last Name")
            .addInput("Gender", "dropdown", "genderType", "Gender", null, genders)
            .addInput("Address", "text", "address", "Address")
            .addInput("Contact no", "text", "contactNo", "Contact no")
            .addInput("Email Address", "text", "emailAddress", "Email Address")
            .addInput("Send Email", "checkbox", "sendEmail", "Send Email")
            .addInput("Generate Password", "checkbox", "isPasswordGenerated", "Generate Password")
            .addInput("Role", "dropdown", "roleId", "Role", null, mapRolesAsDropdown(roles))
            .submitComponent(submitButtonComponent);
        render.appendChild(() => form)
        return render
    });
}

function submitButtonComponent(json) {
    return new cElement("button")
        .select()
        .innerText("Save")
        .action()
        .click((selected) => {
            save(json)
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        router.route('user')
                    } else {
                        router.failed(new cElement("h2").select().innerText(data.message))
                    }
                })
        }).select()
}