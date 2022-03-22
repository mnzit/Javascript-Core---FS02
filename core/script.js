select("body")
    .css()
        .padding("10px");

select("div#render")
    .css()
        .width("20px")
        .height("20px")
        .color("white")
        .backgroundColor("black")
        .padding('10px')
        .margin('10px')
        .border('1px solid black')
    .action()
        .click((selected) => alert("Box has been clicked"))
        .mouseOver((selected) => css(selected).color("black").backgroundColor("white"))
        .mouseLeave((selected) => css(selected).color("white").backgroundColor("black"))

