import { http } from './http';

export async function postRegisterAccount(payload) {
    return http.post("/admin/register", payload);
}

export async function postCreateDepartment(payload) {
    return http.post("/admin/createDepartment", payload);
}

export async function postCreateCampaign(payload) {
    return http.post("/admin/createCampaign", payload);
}