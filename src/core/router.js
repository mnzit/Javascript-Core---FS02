import {cElement} from "./element";
let instance = null;
let render = null;
export function Router(renderElement = null) {
    const routes = new Map();


    function instanceCreator() {
        return {
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
            },
            getRender: function(){
                return render;
            }

        }
    }

    return new function () {
        return {
            getInstance: function () {
                if (instance === null) {
                    console.log("Singleton instance of Router")
                    render = renderElement;
                    instance = new instanceCreator();
                    console.log(instance.getRender())
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