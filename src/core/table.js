import { cElement } from "./element";

export function TableBuilder(array = []) {
    let tableHeaders = [];
    return {
        addColumn: function (title, name) {
            tableHeaders.push({ key: name, value: new cElement("th").select().innerText(title).css().border("1px solid black").padding("10px").select() });
            return this;
        },
        addColumnComponent: function (title, func) {
            tableHeaders.push({ key: null, value: new cElement("th").select().innerText(title).css().border("1px solid black").padding("10px").select(), func: func });
            return this;
        },
        build: function () {
            let headerRow = new cElement("tr").select().css().border("1px solid black").padding("10px").backgroundColor("pink").select();
            tableHeaders.forEach((tableHeader) => headerRow.appendChild(() => tableHeader.value));

            let table = new cElement("table").select().css().border("1px solid black").padding("1px").backgroundColor("#F5B8AA").select();
            let thead = new cElement("thead");

            thead.appendChild(() => headerRow);
            table.appendChild(() => thead)

            let tbody = new cElement("tbody");
            
            array.forEach(data => {
                let bodyRow = new cElement("tr").select().css().border("1px solid black").backgroundColor("#EADEDB").padding("10px").select();
                tableHeaders.forEach(tableHeader => {
                    if (tableHeader.func) {
                        console.log("Error")
                        let td = new cElement('td').select().css().border("1px solid black").padding("10px").select().appendChild(() => tableHeader.func(data, bodyRow.data()));
                        bodyRow.appendChild(() => td);
                    } else {
                        let td = new cElement('td').select().css().border("1px solid black").padding("10px").select().innerText(data[tableHeader.key]);
                        bodyRow.appendChild(() => td);
                    }
                })
                tbody.appendChild(() => bodyRow)
            })

            table.appendChild(() => tbody)
            return table.data();
        }
    }
}