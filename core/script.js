select("body")
    .css()
        .padding("10px");

select("div#render")
    .css()
        .width("30px")
        .height("w0px")
        .color("white")
        .backgroundColor("black")
        .padding('10px') 
        .margin('10px')
        .border('1px solid black')
        .transition("0.2s all")
.select()
    .action()
        .click((selected) => alert("Box has been clicked"))
        .mouseOver((selected) => css(selected).color("black").backgroundColor("white"))
        .mouseLeave((selected) => css(selected).color("white").backgroundColor("black"))
.select()
    .appendChild(()=> {
        let div = document.createElement("div")
        div.innerText = "Hello"
        return div;
    })

