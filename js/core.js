function select(value) {
    let selected = null;
    if (value instanceof HTMLElement) {
        selected = value;
    } else {
        selected = document.querySelector(value)
    }
    return {
        id: function (id) {
            if (selected.id === null) {
                selected.id = id;
            } else {
                selected.id = selected.id + " " + id.trim()
            }
            return this;
        },
        class: function (value) {
            if (selected.class === null) {
                selected.class = value;
            } else {
                selected.class = selected.id + " " + value.trim()
            }
            return this;
        },
        data: () => selected,
        innerText: function (value) {
            selected.innerText = value
            return this;
        },
        innerHtml: function (value) {
            selected.innerHtml = value
            return this;
        },
        src: function (value) {
            selected.src = value
            return this;
        },
        action: () => action(selected),
        appendChild: function (func) {
            selected.appendChild(func())
            return this;
        },
        child: function (func) {
            selected.innerText = "";
            selected.appendChild(func())
            return this;
        },
        type: function (type) {
            selected.type = type
            return this;
        },
        placeHolder: function (placeHolder) {
            selected.placeholder = placeHolder
            return this;
        },
        value: function (value) {
            selected.value = value
            return this;
        },
        name: function (name) {
            selected.name = name
            return this;
        },
        css: () => css(selected)
    }
}

function css(object) {
    let style = object.style;

    return {
        border: function (value) {
            style.border = value;
            return this;
        },
        color: function (value) {
            style.color = value;
            return this;
        },
        padding: function (value) {
            style.padding = value;
            return this;
        },
        margin: function (value) {
            style.margin = value;
            return this;
        },
        backgroundColor: function (value) {
            style.backgroundColor = value;
            return this;
        },
        height: function (value) {
            style.height = value;
            return this;
        },
        width: function (value) {
            style.width = value;
            return this;
        },
        transition: function (value) {
            style.transition = value;
            return this;
        },
        textAlign: function (value) {
            style.textAlign = value;
            return this;
        },
        style: function (key, value) {
            style[key] = value
            return this;
        },
        select: () => select(object)
    }
}

function action(object) {
    return {
        click: function (func) {
            object.addEventListener('click', (e) => { e.preventDefault(); func(object) })
            return this;
        },
        doubleClick: function (func) {
            object.addEventListener('dblclick', () => func(object))
            return this;
        },
        mouseOver: function (func) {
            object.addEventListener('mouseover', () => func(object))
            return this;
        },
        mouseLeave: function (func) {
            object.addEventListener('mouseleave', () => func(object))
            return this;
        },
        event: function (event, func) {
            object.addEventListener(event, (e) => func(object, e))
            return this;
        },
        input: function (func) {
            object.addEventListener("input", (e) => func(object, e))
            return this;
        },
        select: () => select(object)
    }
}

function cInput() {
    let element = cElement('input').data();
    return {
        type: function (type) {
            element.type = type
            return this;
        },
        placeHolder: function (placeHolder) {
            element.placeholder = placeHolder
            return this;
        },
        value: function (value) {
            element.value = value
            return this;
        },
        name: function (name) {
            element.name = name
            return this;
        },
        data: () => element,
        select: () => select(element)
    }
}


function cElement(elementName) {
    let element = document.createElement(elementName);
    return {
        data: () => element,
        select: () => select(element),
        appendChild: function (func) {
            element.appendChild(func())
            return this;
        }
    }
}

function tableBuilder(array = []) {
    let tableHeaders = [];
    return {
        addColumn: function (title, name) {
            tableHeaders.push({ key: name, value: cElement("th").select().innerText(title).css().border("1px solid black").padding("10px").select().data() });
            return this;
        },
        addColumnDynamic: function (title, name, func) {
            tableHeaders.push({ key: name, value: cElement("th").select().innerText(title).css().border("1px solid black").padding("10px").select().data(), func: func });
            return this;
        },
        build: function () {
            let headerRow = cElement("tr").select().css().border("1px solid black").padding("10px").backgroundColor("pink").select();
            tableHeaders.forEach((tableHeader) => headerRow.appendChild(() => tableHeader.value));

            let table = cElement("table").select().css().border("1px solid black").padding("1px").backgroundColor("#F5B8AA").select();
            let thead = cElement("thead");

            thead.appendChild(() => headerRow.data());
            table.appendChild(() => thead.data())

            let tbody = cElement("tbody");

            array.forEach(data => {
                let bodyRow = cElement("tr").select().css().border("1px solid black").backgroundColor("#EADEDB").padding("10px").select();
                tableHeaders.forEach(tableHeader => {
                    if (tableHeader.func) {
                        let td = cElement('td').select().css().border("1px solid black").padding("10px").select().appendChild(() => tableHeader.func(data, bodyRow.data())).data();
                        bodyRow.appendChild(() => td);
                    } else {
                        let td = cElement('td').select().css().border("1px solid black").padding("10px").select().innerText(data[tableHeader.key]).data();
                        bodyRow.appendChild(() => td);
                    }
                })
                tbody.appendChild(() => bodyRow.data())
            })

            table.appendChild(() => tbody.data())
            return table.data();
        }
    }
}

function link(link) {
    let object = cElement("a").data();

    return {
        link: function () {
            object.href = link;
            return this;
        },
        select: () => select(object)
    }

}

function router(render) {
    const routes = new Map();
    return {
        onLoad: function (component) {
            render.child(() => component())
        },
        register: function (route, component) {
            routes.set(route, component)
            return this;
        },
        notFound: function () {
            render.child(() => cElement("h1").select().innerText("404 Not Found").data())
        },
        failed: function (component) {
            render.child(() => component)
        },
        route: function (path, data = null) {
            let containsRoute = routes.has(path);

            if (containsRoute) {
                if (data) {
                    render.child(() => routes.get(path)(data))
                } else {
                    render.child(() => routes.get(path)())
                }

            } else {
                render.child(() => cElement("h1").select().innerText("404 Not Found").data())
            }
        }
    }
}

function formBuilder() {
    let form = cElement('form');
    let table = cElement("table")
    form.appendChild(() => table.data())
    let onUpdateCallBack = null;
    let formJson = {}
    let patch = false;
    const formMap = new Map();
    let formBody = function () {
        this.type = null;
        this.component = null,
        this.validation = null,
        this.disabled = null
    }

    return {
        addInput: function (name, type, id, placeholder = "Enter value", validation = null, dropdown = []) {
            let tr = cElement("tr")
            let labelTd = cElement("td");
            let inputTd = cElement("td");
            labelTd.appendChild(() => cElement("label").select().innerText(name + ": ").css().style("fontWeight", 600).select().data())
            let body = new formBody();
            if (type === "dropdown") {
                let select = cElement("select")
                if (dropdown instanceof Function) {
                    dropdown().then(response => {
                        response.forEach(e => {
                            select.appendChild(() => cElement("option").select().value(e.key).innerText(e.value).data())
                        })
                        if (patch) {
                            this.patch(formJson);
                        }
                    })
                } else {
                    dropdown.forEach(e => {
                        select.appendChild(() => cElement("option").select().value(e.key).innerText(e.value).data())
                    })
                }
                inputTd.appendChild(() => select.data())
                body.component = select.data();
            } else {
                let input = cInput().type(type).name(id).placeHolder(placeholder)
                inputTd.appendChild(() => input.data())
                body.component = input.data();
            }

            tr.appendChild(() => labelTd.data())
            tr.appendChild(() => inputTd.data());
            table.appendChild(() => tr.data())

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
                if (component.type === "checkbox") {
                    formJson[k] = component.checked;
                } else {
                    formJson[k] = component.value;
                }
            })
            return formJson;
        },
        patch: function (json) {
            patch = true;
            formJson = json
            for (let key in formJson) {
                if (formMap.get(key)) {
                    console.log(`Setting value ${ formJson[key] } for component ${formMap.get(key).component}`)
                    let component = formMap.get(key).component;
                    component.value = formJson[key];
                }
            }
            console.log("JSON::::"+JSON.stringify(formJson))
            return this;
        },

        onUpdate: function (onUpdateCb) {
            console.log(formMap)
            onUpdateCallBack = onUpdateCb;
            formMap.forEach((v, k) => {
                let component = v.component;

                if (component.type === "checkbox") {
                    formJson[k] = component.checked;
                } else {
                    if (formJson[k] == null) {
                        formJson[k] = component.value;
                    }
                }
                select(component).action().input((input, event) => {
                    if (input.type === "checkbox") {
                        formJson[k] = input.checked;
                    } else {
                        formJson[k] = input.value;
                    }
                    console.log(formMap)
                    if (onUpdateCb != null) {
                        onUpdateCb(formJson);
                    }
                })
            })
            if (onUpdateCb != null) {
                onUpdateCb(formJson);
            }
            return this;
        },

        submitComponent: function (callBack) {
            form.appendChild(() => callBack());
            return this;
        }
    }
}

function routeButton(buttonName, route, func = null, controller) {
    return cElement("button")
        .select()
        .innerText(buttonName)
        .action()
        .click((selected) => {
            controller.route(route)
            if (func != null) { func() }
        })
        .select()
        .data();
}
