import { add } from "./add.js";
import { getCookie } from "./cookie.js";
import { displayTask } from "./displayTask.js";

export function display(lista, user) {
    let dados = JSON.parse(localStorage.getItem(user));
    let env = getCookie('env');
    // cria um botao 
    let botao = document.createElement('button');
    botao.setAttribute('id', 'new_task');
    document.querySelector("#list").replaceChildren(botao);
    document.querySelector("#new_task").innerHTML = "Adicionar";

    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    for (let index = 0; index < lista.length; index++) {
        displayTask(index, lista, divBotao);
    }

    // barra de progresso
    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }
    document.querySelector("#barra").value = dados['progresso'][envNum] / lista.length * 100;
    
    // adicionando eventlistener pro botao que criei no começo dessa função
    document.querySelector("#new_task").addEventListener("click", () => {
        add(user, dados, env);
    })
}