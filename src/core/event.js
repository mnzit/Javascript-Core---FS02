import { Select } from "./select";

export function Event(object) {
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
        select: () => new Select(object)
    }
}