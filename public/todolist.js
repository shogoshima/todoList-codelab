import { add } from '/modulos/add.js';
import { display } from '/modulos/display.js';

// para pegar o cookie que foi criado na aba de login.
// Pra conseguir pegar o nome do usuário que logou na aba de login
let user = document.cookie
    .split("; ")
    .find((row) => row.startsWith("logado="))
    ?.split("=")[1];

// Pra mostrar q assim conseguimos pegar dados do usuario no localStorage
let dados = JSON.parse(localStorage.getItem(user));
document.querySelector("#bemvindo").innerHTML = `Oi ${user}! sua senha é "${dados.senha}"`;
console.log(dados);

// toda vez que faço refresh na página vai rodar essa função
// Pra mostrar as listas que estavam salvas no localStorage
display(dados);

document.querySelector("#new_task").addEventListener("click", () => {
    add(user, dados);
})


// so um exemplo de como acho q seria o objeto com o qual vamos trabalhar
// a gente teria acesso a ele escrevendo "dados.todolist".
// conseguimos mudar os dados toda vez q o usuario editar, ou criar um novo objeto na lista de tarefas
// let todolist = {
//     tarefas: [
//         {
//             id: 0,
//             nome: "cozinhar",
//             data: "20/07/2023",
//             completo: false,
//         },
//         {
//             id: 1,
//             nome: "fazer tarefa",
//             data: "20/07/2023",
//             completo: false,
//         },
//         {
//             id: 2,
//             nome: "dormir",
//             data: "20/07/2023",
//             completo: false,
//         }
//     ]
// }
// console.log(todolist.tarefas[1].nome); // printa "fazer tarefa"