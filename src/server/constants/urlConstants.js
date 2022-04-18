// export const BASE_URL = "https://api-universityportal.herokuapp.com";
const BASE_URL = "http://localhost:8080/UniversityPortal";
export const LOGIN = `login`;
export const COURSE = `courses`;
export const USER = `users`;
export const ROLE = `roles`;

export function urlBuilder(...path) {
    let url = BASE_URL;
    url += "/";
    if(path.length >= 2){
        path.forEach((path, index) => {
            url += path;
            if (index != path.length - 1) {
                url += "/";
            }
        })
    }else{
        url+=path[0]
    }
    return url;
}