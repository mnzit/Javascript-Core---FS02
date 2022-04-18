import {Fetch, Request} from "../../../core/request";
import {urlBuilder, USER} from "../../constants/UrlConstants";

export function list() {
  let request = new Request();

  request.url = urlBuilder(USER);
  request.method = "GET";
  request.headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem("token")
  }
  return  new Fetch(request)
    .then(response => {
      return response.json()
    });
}

export function detail(id) {
  let request = new Request();
  request.url = urlBuilder(USER, id);
  request.method = "GET";
  request.headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem("token")
  }
  return  new Fetch(request)
    .then(response => {
      return response.json()
    });
}

export function remove(id) {
  let request = new Request();
  request.url = urlBuilder(USER, id);
  request.method = "DELETE";
  request.headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem("token")
  }
  return new Fetch(request)
    .then(response => {
      return response.json()
    });
}


export function save(body) {
  let request = new Request();
  request.url = urlBuilder(USER);
  request.method = "POST";
  request.body = body;
  request.headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem("token")
  }

return new Fetch(request)
  .then(response => {
    return response.json()
  });
}

export function update(body) {
  let request = new Request();
  request.url = urlBuilder(USER);
  request.method = "PUT";
  request.body = body;
  request.headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem("token")
  }
  return new Fetch(request)
    .then(response => {
      return response.json()
    });
}
