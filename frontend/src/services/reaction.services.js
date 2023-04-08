import { http } from './http';

export async function getReactionByIdea() {
    return await http.get('/reaction');
}

export async function postReaction(payload) {
    return await http.post('/reaction', payload)
}
