import { display } from '/modulos/display.js';
import { newEnv } from '/modulos/newEnv.js';
import { displayEnv } from './modulos/displayEnv.js';
import { changeEnv } from './modulos/changeEnv.js';
import { edit, remove } from './modulos/edit.js';
import { getCookie } from './modulos/cookie.js';
import { sort } from './modulos/sort.js';
import { description } from './modulos/description.js';
import { popup } from './modulos/popup.js';
import { logout } from './modulos/logout.js';

// para pegar o cookie que foi criado na aba de login.
// Pra conseguir pegar o nome do usuário que logou na aba de login
let user = getCookie('logado');
console.log("user: ", user);
if (!user)
    window.location.href = "/index.html";

// pega o nome do espaço em que o usuário está
let env = getCookie('env');
// document.querySelector("#pag_atual").innerHTML = `Você está em: ${env}`;
console.log("env: ", env);

// Pra mostrar q assim conseguimos pegar dados do usuario no localStorage
let dados = JSON.parse(localStorage.getItem(user));
console.log("dados:", dados);

// toda vez que faço refresh na página vai rodar essa função
// Pra mostrar as listas que estavam salvas no localStorage
// e pra mostrar os espaços que o usuário adicionou
displayEnv();
display();

// adiciona uma categoria
document.querySelector("#new_env").addEventListener("click", () => {
    newEnv();
})

// muda o env quando aperta
document.querySelector(".envs").addEventListener("click", (event) => {
    changeEnv(event);
})

document.querySelector("#list").addEventListener("input", (event) => {
    edit(event);
})

document.querySelector("#list").addEventListener("click", (event) => {
    remove(event);
    description(event);
})

document.querySelector("#sort").addEventListener("click", () => {
    sort();
})

document.querySelector('#expand_btn').addEventListener("click", () => {
    let sidenav = document.querySelector('#sidenav');
    sidenav.classList.toggle('retract');
    document.querySelector('#main').classList.toggle('retract');
})

document.querySelector(".detailUser").addEventListener("click", (event) => {
    popup();
})

document.querySelector("#displayUser").innerHTML = `Olá ${user}!`;

document.querySelector("#logout").addEventListener("click", () => {
    logout();
})