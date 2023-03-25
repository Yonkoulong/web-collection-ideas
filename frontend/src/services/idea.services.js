import { http } from './http';

//Idea

export async function getIdeas() {
    return await http.get('/idea');
}