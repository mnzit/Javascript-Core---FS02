let counter = 10;

let rectangleCreator = () => new cElement("div")
.select()
.css()
    .width("40px")
    .height("20px")
    .color("white")
    .padding("10px")
    .backgroundColor("black")
    .margin((counter++)+'px')
    .border('1px solid black')
    .transition("0.1s all")
.select()
.action()
    .click((selected) => alert("Box has been clicked"))
    .mouseOver((selected) => css(selected).color("black").backgroundColor("white"))
    .mouseLeave((selected) => css(selected).color("white").backgroundColor("black"))
.select()
.data();

let rectangleCollection = cElement("div")
                            .select()
                                .css()
                                .padding("10px")
                                .width("10%")
                                .backgroundColor("red")
                                .border("1px solid yellow")
                            .select()
                            .data();

let button = cElement("button")
                .innerText("Create Rectangle")
            .select()
                .action()
                    .click((selected) => select(rectangleCollection).appendChild(()=>rectangleCreator()))
            .select()
            .data();

select("#render")
    .css()
        .padding("10px")
.select()
.appendChild(()=>rectangleCollection)
.appendChild(()=>button)




