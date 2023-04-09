import { http } from './http';

//Category
export async function getCategory() {
    return http.get("/categories");
}

export async function postCategory(payload) {
    return http.post("/category", payload);
}

export async function getCategoryDetail(payload) {
    return http.get(`/category/${payload.id}`);
}

export async function putCategory(categoryId, payload) {
    return http.put(`/category/${categoryId.id}`, payload);
}

export async function deleteCategory(payload) {
    return http.delete(`/category/${payload.id}`);
}

//file
export async function getCSVFile() {
    return http.get('/csvFile')
}
