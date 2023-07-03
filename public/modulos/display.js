import { add } from "./add.js";
import { getCookie } from "./cookie.js";
import { displayTask } from "./displayTask.js";
import { removeEnv } from "./removeEnv.js";

export function display() {
    let user = getCookie('logado');
    let env = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));
    let lista = dados.todolist[env];
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
    let progresso = lista.length == 0 ? 0 : dados['progresso'][envNum] / (lista.length) * 100;
    document.querySelector("#barra").value = progresso;
    removeEnv(user, env, progresso);

    // adicionando eventlistener pro botao que criei no começo dessa função
    document.querySelector("#new_task").addEventListener("click", () => {
        add();
    })
}