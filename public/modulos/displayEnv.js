export function displayEnv(todolist) {
    let botao = document.querySelector("#new_env");
    // loop pelos objetos do todolist
    for (const name in todolist) {
        // cria um elemento (que por enquanto não tá no html)
        let div = document.createElement('input');
        // coloca os atributos do elemento
        div.setAttribute('type', 'button');
        div.setAttribute('value', name);
        div.setAttribute('class', `env_button ${name}`);
        div.setAttribute('id', `env_button`);
        // só aq que eu adiciono no html.
        // nesse caso, eu coloco antes do elemento do botão
        botao.parentNode.insertBefore(div, botao);
    }
}