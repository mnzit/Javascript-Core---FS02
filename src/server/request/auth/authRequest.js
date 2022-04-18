import { Fetch, Request } from "../../../core/request";
import { LOGIN, urlBuilder } from "../../constants/UrlConstants";

export function login(body) {
    let request = new Request();
    request.url = urlBuilder(LOGIN);
    request.method = "POST";
    request.body = body;
    request.headers = {
        'Content-Type': 'application/json'
    }
    console.log(request)
    return new Fetch(request)
        .then(response => {
            if(response.status == 200){
                let token = response.headers.get('Authorization');
                sessionStorage.setItem("token", token);
            }
            return response.json()
        });
}


