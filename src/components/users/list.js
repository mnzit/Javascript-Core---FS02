import {Component} from "../../core/component";
import {cElement} from "../../core/element";
import {detail, list, remove} from "../../server/request/users/usersRequest";
import {TableBuilder} from "../../core/table";
import {router} from "../../index";

export function UserListComponent() {
    return new Component(render => {

        let heading = new cElement("h1").select().innerText("Users")
        render.appendChild(() => heading);

        let tableWrapper = new cElement("div");

        list()
            .then(response => {
                let table = new TableBuilder(response.data)
                    .addColumn("First name", "firstName")
                    .addColumn("Last name", "lastName")
                    .addColumn("Gender", "genderType")
                    .addColumn("Address", "address")
                    .addColumn("Contact no", "contactNo")
                    .addColumn("Email Address", "emailAddress")
                    .addColumn("Role", "role")
                    .addColumnComponent("Action", action)
                    .build();
                tableWrapper.appendChild(() => table)
            });

        render.appendChild(() => tableWrapper);

        return render;
    });
}

function action() {
    return (user, row) => {
        return new cElement("span")
            .appendChild(editButton(user.id))
            .appendChild(detailButton(user.id))
            .appendChild(removeButton(user.id, row))
            .select()
    }
}

function editButton(id) {
    return () => new cElement("button").select().innerText("Edit").action().click((selected) => {
        detail(id)
            .then(data => {
                if (data.success === true) {
                    router.route('user-edit', data.data)
                } else {
                    router.failed(new cElement("h2").select().innerText(data.message))
                }
            })
    }).select();
}

function detailButton(id) {
    return () => new cElement("button").select().innerText("View").action().click((selected) => {
        detail(id)
            .then(data => {
                if (data.success === true) {
                    router.route('user-detail', data.data)
                } else {
                    router.failed(new cElement("h2").select().innerText(data.message))
                }
            })
    }).select();
}

function removeButton(id, row) {
    return () => new cElement("button")
        .select()
        .innerText("Delete")
        .action()
        .click((selected) => {
            remove(id)
                .then(data => {
                    if (data.success === true) {
                        row.remove();
                    } else {
                        router.failed(new cElement("h2").select().innerText(data.message))
                    }
                })

        })
        .select();
}
