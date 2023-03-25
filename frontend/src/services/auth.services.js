import { http, noTokenHttp } from './http';

export async function postLogin(payload) {
    return noTokenHttp.post("/login", payload, {
        withCredentials: true,
    });
}

export async function getRefreshToken() {
    return http.get("/refresh");
}

export async function getLogout() {
    return http.get("/logout");
}