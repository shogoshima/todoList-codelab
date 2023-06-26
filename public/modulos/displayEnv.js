export function displayEnv(todolist) {
    let botao = document.querySelector("#new_env");
    // loop pelos objetos do todolist
    for (const name in todolist) {
        let div = document.createElement('input');
        div.setAttribute('type', 'button');
        div.setAttribute('value', name);
        div.setAttribute('class', `env_button ${name}`);
        botao.parentNode.insertBefore(div, botao);
    }
}