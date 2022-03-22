function select(value) {
    let selected = document.querySelector(value)

    return {
        data: () => selected,
        action: () => action(selected),
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
        backgroundColor: function (value){
            style.backgroundColor = value;
            return this;
        },
        height: function (value){
            style.height = value;
            return this;
        },
        width: function (value){
            style.width = value;
            return this;
        },
        action: () => action(object)
    }
}

function action(object){
    return {
        click: function(func){  
            object.addEventListener('click', () => func(object))
            return this;
        },
        mouseOver: function(func){  
            object.addEventListener('mouseover', () => func(object))
            return this;
        },
        mouseLeave: function(func){  
            object.addEventListener('mouseleave', () => func(object))
            return this;
        }
    }
}
