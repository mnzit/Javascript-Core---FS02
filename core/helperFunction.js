function select(value) {
    let selected = null;
    if (value instanceof HTMLElement) {
        console.log("HTMLELement is passed")
        selected = value;
    } else {
        console.log("Query selector called")
        selected = document.querySelector(value)
    }
    return {
        data: () => selected,
        action: () => action(selected),
        appendChild: function (func) {
            selected.appendChild(func())
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
        textAlign: function(value){
            style.textAlign = value;
        },
        select: () => select(object)
    }
}

function action(object) {
    return {
        click: function (func) {
            object.addEventListener('click', () => func(object))
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
        select: () => select(object)
    }
}


function cElement(elementName){
    let element = document.createElement(elementName);
    return {
        data: () => element,
        select: () => select(element),
        innerText: function (value) {
            element.innerText= value
            return this;
        },
        appendChild: function (func) {
            element.appendChild(func())
            return this;
        }
    }
}