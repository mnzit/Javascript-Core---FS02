import {cElement} from "./element";

export function Component(callback){
    return callback(cElement("div"));
}



