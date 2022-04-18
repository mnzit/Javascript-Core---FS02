import {Css} from "./css";
import {Event} from "./event";

export function Select(value) {
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
        appendChild: function (func) {
            selected.appendChild(func().data())
            return this;
        },
        child: function (func) {
            selected.innerText = "";
            selected.appendChild(func().data())
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
        parent: function (parent) {
            parent.appendChild(() => selected)
        },
        getValue: function (value) {
            console.log(selected)
            return selected.value
        },
        css: () => new Css(selected),
        action: () => new Event(selected),
        data: () => selected
    }
}
