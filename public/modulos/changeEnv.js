import { display } from './display.js';
import { cookie, getCookie } from './cookie.js';

export function changeEnv(event) {
    let user = getCookie('logado');
    let oldEnv = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));
    document.querySelector(`#env_button-${oldEnv}`).style = "background-color: var(--meio_claro)";
    // o event é o evento que o addEventListener pegou.
    // nesse caso seria o click do elemento com id= "new_env"
    // quero pegar o nome em que o usuário clicou. Pra isso pego o value do botão
    let name = event.target.value;

    // esse embaixo eh pra não dar o erro que tava dando antes, do usuário clicar
    // no input e acabar acionando essa função
    if (event.target.className != "env_button")
        return 0;
    
    // seta o novo env para o que o usuário clicou, e da display
    cookie('env', name);
    display();
    console.log('env: ', name);
    //document.querySelector("#pag_atual").innerHTML = `Você está em: ${name}`;

    document.querySelector(`#env_button-${name}`).style = "background-color: rgb(158, 223, 208)";
}