import { Select } from "./select";

export function Css(object) {
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
        select: () => new Select(object)
    }
}
