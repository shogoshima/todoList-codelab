import { add } from '/modulos/add.js';
import { display } from '/modulos/display.js';
import { newEnv } from '/modulos/newEnv.js';
import { displayEnv } from './modulos/displayEnv.js';
import { changeEnv } from './modulos/changeEnv.js';
import { edit, remove } from './modulos/edit.js';
import { cookie, getCookie } from './modulos/cookie.js';
import { sort } from './modulos/sort.js';

// para pegar o cookie que foi criado na aba de login.
// Pra conseguir pegar o nome do usuário que logou na aba de login
let user = getCookie('logado');
console.log("user: ", user);

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
displayEnv(dados.todolist, env);
display(dados.todolist[env], user, add, getCookie);


// adiciona uma categoria
document.querySelector("#new_env").addEventListener("click", () => {
    let dados = JSON.parse(localStorage.getItem(user));
    newEnv(user, dados, cookie);
})

// muda o env quando aperta
document.querySelector(".envs").addEventListener("click", (event) => {
    changeEnv(event, user, display, add, cookie, getCookie);
})

document.querySelector("#list").addEventListener("input", (event) => {
    let dados = JSON.parse(localStorage.getItem(user));
    let env = getCookie('env');
    edit(event, user, dados, env);
})

document.querySelector("#list").addEventListener("click", (event) => {
    let dados = JSON.parse(localStorage.getItem(user));
    let env = getCookie('env');
    remove(event, user, dados, env);
})

document.querySelector("#sort").addEventListener("click", () => {
    let dados = JSON.parse(localStorage.getItem(user));
    let env = getCookie('env');
    sort(user, dados, env, getCookie)
})