import { http } from './http';

export async function postLogin(payload) {
    return http.post("/login", payload);
}