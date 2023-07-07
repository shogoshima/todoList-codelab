import { getCookie } from "./cookie.js";

export function displayEnv() {
    let user = getCookie('logado');
    let activeEnv = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));
    let todolist = dados.todolist;
    let botao = document.querySelector("#new_env");
    // loop pelos objetos do todolist
    document.querySelector(".envs").replaceChildren(botao);
    
    for (const nameId in todolist) {
        let name = nameId.replace(/_/g, " ");
        // cria um elemento (que por enquanto não tá no html)
        let div = document.createElement('input');
        // coloca os atributos do elemento
        div.setAttribute('type', 'button');
        div.setAttribute('value', name);
        div.setAttribute('class', `env_button`);
        div.setAttribute('id', `env_button-${nameId}`);
        // só aq que eu adiciono no html.
        // nesse caso, eu coloco antes do elemento do botão
        botao.parentNode.insertBefore(div, botao);
    }
    document.querySelector(`#env_button-${activeEnv}`).classList.toggle("selected");
    document.querySelector(".envs").style = "display:flex";
}