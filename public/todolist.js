import { add } from '/modulos/add.js';
import { display } from '/modulos/display.js';
import { newEnv } from '/modulos/newEnv.js';
import { displayEnv } from './modulos/displayEnv.js';
import { changeEnv } from './modulos/changeEnv.js';
import { edit, remove } from './modulos/edit.js';

// para pegar o cookie que foi criado na aba de login.
// Pra conseguir pegar o nome do usuário que logou na aba de login
let user = document.cookie
    .split("; ")
    .find((row) => row.startsWith("logado="))
    ?.split("=")[1];

// pega o nome do espaço em que o usuário está
let env = localStorage.getItem('env');
document.querySelector("#pag_atual").innerHTML = `Você está em: ${env}`;
console.log("env: ", localStorage.getItem('env'));

// Pra mostrar q assim conseguimos pegar dados do usuario no localStorage
let dados = JSON.parse(localStorage.getItem(user));
console.log("dados:", dados);

// toda vez que faço refresh na página vai rodar essa função
// Pra mostrar as listas que estavam salvas no localStorage
// e pra mostrar os espaços que o usuário adicionou
displayEnv(dados.todolist);
display(dados.todolist[env], user, add);


// adiciona uma categoria
document.querySelector("#new_env").addEventListener("click", () => {
    let dados = JSON.parse(localStorage.getItem(user));
    newEnv(user, dados);
})

// muda o env quando aperta
document.querySelector(".envs").addEventListener("click", (event) => {
    changeEnv(event, display, add, user);
})

document.querySelector("#list").addEventListener("input", (event) => {
    let dados = JSON.parse(localStorage.getItem(user));
    let env = localStorage.getItem('env');
    edit(event, user, dados, env);
})

document.querySelector("#list").addEventListener("click", (event) => {
    let dados = JSON.parse(localStorage.getItem(user));
    let env = localStorage.getItem('env');
    remove(event, user, dados, env);
})

// adiciona uma tarefa
// document.querySelector("#new_task").addEventListener("click", () => {
//     let env = localStorage.getItem('env');
//     add(user, dados, env);
// })