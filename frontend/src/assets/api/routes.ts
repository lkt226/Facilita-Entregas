import { PostUser } from "../data/types";

const baseURL = 'http://localhost:5000/api';

const headers = new Headers();
headers.append("Content-Type", "application/json");

const users = {
    getAll: () => fetch(`${baseURL}/users`),
    getOne: (id:number) => fetch(`${baseURL}/users/${id}`),
    create: (data: PostUser) => fetch(`${baseURL}/users`, { method: 'POST', headers, body: JSON.stringify(data)}),
    update: (id:number, data:PostUser) => fetch(`${baseURL}/users/${id}`, { method: 'PUT', headers, body: JSON.stringify(data)}),
    delete: (id:number) => fetch(`${baseURL}/users/${id}`, { method: 'DELETE' }),
};

const trajectory = {
    calcule: (usersIds: number[]) => fetch(`${baseURL}/trajectory/`, { method: 'POST', headers, body: JSON.stringify({usersIds})}),
}

const routes = {
    users,
    trajectory,
}

export default routes;