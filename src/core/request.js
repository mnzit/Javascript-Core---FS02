export let Request = function () {
    return {
        url: null,
        method: null,
        headers: null,
        body: null
    }
}
export function Fetch(request) {
    let requestParameter = {
        method: request.method,
        headers: request.headers,
    };
    if(request.method !== "GET"){
        console.log(request.body)
        requestParameter.body =  JSON.stringify(request.body)
    }
    return fetch(request.url, requestParameter)
}
