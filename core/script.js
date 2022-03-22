let target = document.getElementsByTagName("nischal")[0];
let h1 = document.createElement('h1');
h1.innerText = "Nabin"
let h2 = document.createElement('anita');
h2.innerText = "Sapana"
target.appendChild(h1)
target.appendChild(h2)

action(target)
    .click(() => {console.log("Click gariyo")})
    .mouseOver(()=> {
        css(target)
            .border('1px solid red')
            .color('red')
            .padding('10px')
    })
    .mouseLeave(()=> {
        css(target)
            .border(null)
            .color('black')
            .padding('10px')
    })


function css(object) {
    let style = object.style;

    return {
        border: function(value) {
            style.border = value;
            return this;
        },
        color: function(value) {
            style.color = value;
            return this;
        },
        padding: function(value) {
            style.padding = value;
            return this;
        },
    }
}

function action(object){
    return {
        click: function(func){  
            object.addEventListener('click', func)
            return this;
        },
        mouseOver: function(func){  
            object.addEventListener('mouseover', func)
            return this;
        },
        mouseLeave: function(func){  
            object.addEventListener('mouseleave', func)
            return this;
        }
    }
}
