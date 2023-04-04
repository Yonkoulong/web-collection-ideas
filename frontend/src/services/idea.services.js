import { http } from './http';

//Idea

export async function getIdeaFilter(payload) {
    return await http.post(`/idea/filter`, payload);
}

export async function getIdeaById(payload) {
    return await http.get(`/idea/${payload?.id}`);
}

export async function getIdeaMostLike() {
    return await http.get('/idea/MostReaction');
}

export async function putIdea(id, payload) {
    return await http.put(`/idea/${id}`, payload)
}

export async function postIdea(payload) {
    return await http.post('/idea', payload);
}


//view
export async function postView(payload) {
    return await http.post('/view', payload);
}