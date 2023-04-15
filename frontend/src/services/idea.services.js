import { http } from './http';

//Idea
export async function getAllIdea() {
    return await http.get('/all-ideas');
}

export async function getIdeaFilter(payload) {
    return await http.post(`/idea/filter`, payload);
}

export async function getIdeaById(payload) {
    return await http.get(`/idea/${payload?.id}`);
}

export async function getIdeaMostLike(payload) {
    return await http.post('/idea/mostLike', payload);
}

export async function getIdeasMostView(payload) {
    return await http.post('/idea/mostView', payload);
}

export async function getIdeasLatest(payload) {
    return await http.post('/idea/latest', payload)
}

export async function getIdeaMostComment(payload) {
    return await http.post('/idea/mostComment', payload);
}

export async function putIdea(id, payload) {
    return await http.put(`/idea/${id}`, payload)
}

export async function postIdea(payload) {
    return await http.post('/idea', payload);
}

export async function searchIdea(payload) {
    return await http.post('/idea/search', payload);
}


//view
export async function postView(payload) {
    return await http.post('/view', payload);
}

