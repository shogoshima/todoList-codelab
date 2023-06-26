import { add } from '/modulos/add.js'

// para pegar o cookie que foi criado na aba de login.
// isso é so para conseguir pegar o nome do usuário que logou na aba de login
let user = document.cookie
    .split("; ")
    .find((row) => row.startsWith("logado="))
    ?.split("=")[1];

// Só pra mostrar q assim conseguimos pegar dados do usuario no localStorage
let dados = JSON.parse(localStorage.getItem(user));
document.querySelector("#bemvindo").innerHTML = `Oi ${user}! sua senha é "${dados.senha}"`;

document.querySelector("#new_task").addEventListener("click", () => {
    add(dados);
})


// so um exemplo de como acho q seria o objeto com o qual vamos trabalhar
// a gente teria acesso a ele escrevendo "dados.todolist".
// conseguimos mudar os dados toda vez q o usuario editar, ou criar um novo objeto na lista de tarefas
// let todolist = {
//     tarefas: [
//         {
//             nome: "cozinhar",
//             data: "20/07/2023",
//             completo: false,
//         },
//         {
//             nome: "fazer tarefa",
//             data: "20/07/2023",
//             completo: false,
//         },
//         {
//             nome: "dormir",
//             data: "20/07/2023",
//             completo: false,
//         }
//     ]
// }
// console.log(todolist.tarefas[1].nome); // printa "fazer tarefa"