import { http } from './http';

//Account
export async function postRegisterAccount(payload) {
    return http.post("/admin/account", payload);
}

export async function getAccount() {
    return http.get("/account");
}

export async function getAccountDetail(payload) {
    return http.get(`/account/${payload?.id}`)
}

export async function putAccount(accountId, payload) {
    return http.put(`/account/${accountId?.id}`, payload)
}

export async function deleteAccount(payload) {
    console.log(payload);
    return http.delete(`/account/${payload?.id}`);
}

//Campaign
export async function getCampaign() {
    return http.get("/campaign");
}

export async function postCampaign(payload) {
    return http.post("/campaign", payload);
}

export async function getCampaignDetail(payload) {
    return http.get(`/campaign/${payload.id}`);
}

export async function putCampaign(campaignId, payload) {
    return http.put(`/campaign/${campaignId.id}`, payload);
}

export async function deleteCampaign(payload) {
    return http.delete(`/campaign/${payload.id}`);
}

//Department
export async function getDepartment() {
    return http.get("/department");
}

export async function postDepartment(payload) {
    return http.post("/department", payload);
}

export async function getDepartmentDetail(payload) {
    return http.get(`/department/${payload.id}`);
}

export async function putDepartment(departmentId, payload) {
    return http.put(`/department/${departmentId.id}`, payload);
}

export async function deleteDepartment(payload) {
    return http.delete(`/department/${payload.id}`);
}