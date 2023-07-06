import { deleteCookie } from "./cookie.js";

export function logout() {
    deleteCookie('logado', 'todolist.html');
    window.location.href = "index.html";
}