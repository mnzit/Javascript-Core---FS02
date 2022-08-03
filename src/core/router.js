import {cElement} from "./element";

function Router() {
    let render;
    const routes = new Map();
    return {
        setRender: function(value){
            render = value;
            return this;
        },
        onLoad: function (component) {
            render.child(() => component())
        },
        register: function (route, component) {
            routes.set(route, component)
            return this;
        },
        notFound: function () {
            render.child(() => cElement("h1").select().innerText("404 Not Found"))
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

export const RouterInstance = new Router();


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