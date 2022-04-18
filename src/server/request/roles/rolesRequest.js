import {Fetch, Request} from "../../../core/request";
import { ROLE, urlBuilder } from "../../constants/UrlConstants";

export function roles() {
    let request = new Request();
    request.url = new urlBuilder(ROLE);
    request.method = "GET";
    request.headers = {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("token")
    }
    return new Fetch(request)
        .then(response => {
            return response.json()
        });
}