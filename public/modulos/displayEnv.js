export function displayEnv(todolist, activeEnv) {
    let botao = document.querySelector("#new_env");
    // loop pelos objetos do todolist
    document.querySelector(".envs").replaceChildren(botao);
    
    for (const name in todolist) {
        // cria um elemento (que por enquanto não tá no html)
        let div = document.createElement('input');
        // coloca os atributos do elemento
        div.setAttribute('type', 'button');
        div.setAttribute('value', name);
        div.setAttribute('class', `env_button`);
        div.setAttribute('id', `env_button-${name}`);
        // só aq que eu adiciono no html.
        // nesse caso, eu coloco antes do elemento do botão
        botao.parentNode.insertBefore(div, botao);
    }
    document.querySelector(`#env_button-${activeEnv}`).style = "background-color: rgb(158, 223, 208)";
    document.querySelector(".envs").style = "display:flex";
}