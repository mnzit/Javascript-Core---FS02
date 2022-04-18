import {cElement} from "./element";
import {Select} from "./select";

export function FormBuilder() {
    console.log("Initializing Form")
    let form = new cElement('form');
    let table = new cElement("table")
    form.appendChild(() => table)
    let onUpdateCallBack = null;
    let formJson = {}
    let patch = false;
    const formMap = new Map();

    let formBody = function () {
        return {
            type: null,
            component: null,
            validation: null,
            disabled: null
        }
    }

    return {
        addInput: function (name, type, id, placeholder = "Enter value", validation = null, dropdown = []) {
            console.log(`Adding [${name}] => [${type}]`)
            let tr = new cElement("tr")
            let labelTd = new cElement("td");
            let inputTd = new cElement("td");
            labelTd.appendChild(() => new cElement("label").select().innerText(name + ": ").css().style("fontWeight", 600).select())
            let body = new formBody();
            if (type === "dropdown") {
                let select = new cElement("select")
                if (dropdown instanceof Function) {
                    dropdown().then(response => {
                        response.forEach(e => {
                            select.appendChild(() => new cElement("option").select().value(e.key).innerText(e.value))
                        })
                        this.onUpdate(onUpdateCallBack)
                        if (patch) {
                            this.patch(formJson);
                        }
                    })
                } else {
                    dropdown.forEach(e => {
                        select.appendChild(() => new cElement("option").select().value(e.key).innerText(e.value))
                    })
                }
                inputTd.appendChild(() => select)
                body.component = select;
            } else {
                let input = new cElement('input').select().type(type).name(id).placeHolder(placeholder)
                inputTd.appendChild(() => input)
                body.component = input;
            }

            body.component.action().input((input, event) => {
                if (input.type === "checkbox") {
                    console.log(input.checked);
                    formJson[id] = input.checked;
                } else {
                    console.log(input.value);
                    formJson[id] = input.value;
                }
            })

            tr.appendChild(() => labelTd)
            tr.appendChild(() => inputTd);
            table.appendChild(() => tr)

            body.type = type;
            body.validation = validation;
            formMap.set(id, body)
            return this;
        },
        data: function () {
            return form.data();
        },
        json: function () {
            formMap.forEach((v, k) => {
                let component = v.component;
                console.log(component)
                if (component.data().type === "checkbox") {
                    formJson[k] = component.data().checked;
                } else {
                    formJson[k] = component.getValue();
                }
            })
            return formJson;
        },
        patch: function (json) {
            patch = true;
            formJson = json
            for (let key in formJson) {
                if (formMap.get(key)) {
                    let component = formMap.get(key).component;
                    component.value = formJson[key];
                }
            }
            return this;
        },

        onUpdate: function (onUpdateCb) {
            return this;
        },

        submitComponent: function (callBack) {
            console.log("Adding Submit Button")
            form.appendChild(() => callBack(formJson));
            return this;
        }
    }
}