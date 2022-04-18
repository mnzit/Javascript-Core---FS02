import { Select } from "./select";

export function cElement(elementName) {
    let element = document.createElement(elementName);
    return {
        data: () => element,
        select: () => new Select(element),
        appendChild: function (callback) {
            element.appendChild(callback().data())
            return this;
        }
    }
}
