import { http } from './http';

export async function getComments() {
    return await http.get('/comment');
}

export async function postComment(payload) {
    return await http.post('/comment', payload)
}

export async function getCommentById(payload) {
    return await http.get(`/comment/${payload?.id}`);
}

export async function putComment(payload) {
    return await http.put(`/comment/${payload?.id}`, payload)
}

export async function deleteComment(payload) {
    return await http.delete(`/comment/${payload?.id}`);
}