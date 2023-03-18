import { http } from './http';

//Account
export async function postRegisterAccount(payload) {
    return http.post("/admin/account", payload);
}

export async function getAccount() {
    return http.get("/admin/account");
}

export async function getAccountDetail(payload) {
    return http.get(`/admin/account/${payload?.id}`)
}

export async function putAccount(accountId, payload) {
    return http.put(`/admin/account/${accountId?.id}`, payload)
}

export async function deleteAccount(payload) {
    console.log(payload);
    return http.delete(`/admin/account/${payload?.id}`);
}

//Campaign
export async function getCampaign() {
    return http.get("/admin/campaign");
}

export async function postCampaign(payload) {
    return http.post("/admin/campaign", payload);
}

export async function getCampaignDetail(payload) {
    return http.get(`/admin/campaign/${payload.id}`);
}

export async function putCampaign(campaignId, payload) {
    return http.put(`/admin/campaign/${campaignId.id}`, payload);
}

export async function deleteCampaign(payload) {
    return http.delete(`/admin/campaign/${payload.id}`);
}

//Department
export async function getDepartment() {
    return http.get("/admin/department");
}

export async function postDepartment(payload) {
    return http.post("/admin/department", payload);
}

export async function getDepartmentDetail(payload) {
    return http.get(`/admin/department/${payload.id}`);
}

export async function putDepartment(departmentId, payload) {
    return http.put(`/admin/department/${departmentId.id}`, payload);
}

export async function deleteDepartment(payload) {
    return http.delete(`/admin/department/${payload.id}`);
}