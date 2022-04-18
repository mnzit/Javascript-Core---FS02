import {cElement} from "./element";

export function Router(renderElement = null) {
    const routes = new Map();
    let instance = null;
    let render = null;

    function instanceCreator() {
        return {
            setRender: function renderElement(element){
                render = element;
            },
            onLoad: function (component) {
                render.child(() => component())
            },
            register: function (route, component) {
                routes.set(route, component)
                return this;
            },
            failed: function (component) {
                render.child(() => component.data())
            },
            route: function (path, data = null) {
                let containsRoute = routes.has(path);

                if (containsRoute) {
                    if (data) {
                        render.child(() => routes.get(path)(data))
                    } else {
                        render.child(() => routes.get(path)())
                    }

                } else {
                    render.child(() => new cElement("h1").select().innerText("404 Not Found"))
                }
            }
        }
    }

    return new function () {
        return {
            getInstance: function () {
                if (instance === null) {
                    console.log("Singleton instance of Router")
                    instance = new instanceCreator();
                    instance.setRender(renderElement)
                }
                return instance;
            }
        }

    };
}

export function RouteButton(buttonName, route, func = null, controller) {
    return new cElement("button")
        .select()
        .innerText(buttonName)
        .action()
        .click((selected) => {
            controller.route(route)
            if (func != null) {
                func()
            }
        })
        .select()
        .data();
}