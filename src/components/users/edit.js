import {Component} from "../../core/component";
import {cElement} from "../../core/element";
import {FormBuilder} from "../../core/form";
import {router} from "../../index";
import {update} from "../../server/request/users/usersRequest";
import {genders} from "../../constants/dropdownConstants";
import {mapRolesAsDropdown} from "../../mapper/dropdownMapper";
import {roles} from "../../server/request/roles/rolesRequest";

export function UserEditComponent(user) {
    return new Component(render => {

        render.appendChild(() =>  new cElement("h1").select().innerText("Edit User"));

        let form = FormBuilder()
            .addInput("Firstname", "text", "firstName", "First Name")
            .addInput("Middlename", "text", "middleName", "Middle Name")
            .addInput("Lastname", "text", "lastName", "Last Name")
            .addInput("Gender", "dropdown", "genderType", "Gender", null, genders)
            .addInput("Address", "text", "address", "Address")
            .addInput("Contact no", "text", "contactNo", "Contact no")
            .addInput("Email Address", "text", "emailAddress", "Email Address")
            .addInput("Role", "dropdown", "roleId", "Role", null, mapRolesAsDropdown(roles))
            .patch(user)
            .submitComponent((json) => {
                return new cElement("button")
                    .select()
                    .innerText("Update")
                    .action()
                    .click((selected) => {
                        update(json)
                            .then(data => {
                                    if (data.success === true) {
                                        router.route('user')
                                    } else {
                                        router.failed(new cElement("h2").select().innerText(data.message))
                                    }
                            });
                    })
                    .select()
            })
        render.appendChild(() => form);
        return render;
    });
}