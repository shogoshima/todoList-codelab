// aparece um botão só quando a barra de progresso está em 100%
// senão, ele desaparece
// se o usuário clica nesse botão, apaga o env e vai para o primeiro objecto existente nos dados
import { cookie, getCookie } from "./cookie.js";
import { display } from "./display.js";
import { displayEnv } from "./displayEnv.js";
import { add } from "./add.js";

function changeEnv(user, newEnv) {
    let dados = JSON.parse(localStorage.getItem(user));
    //document.querySelector(`#env_button-${oldEnv}`).style = "background-color: rgba(94,200,174,255)";
    // seta o novo env para o que o usuário clicou, e da display
    cookie('env', newEnv);
    display(dados.todolist[newEnv], user, add, getCookie);
    console.log('env: ', newEnv);

    // deixa o botao da categoria selecionada clara
    displayEnv(dados.todolist, newEnv);
    document.querySelector(`#env_button-${newEnv}`).style = "background-color: rgb(158, 223, 208)";
}

export function removeEnv(user, env, progresso) {
    let dados = JSON.parse(localStorage.getItem(user));
    let progressBar = document.querySelector("#barra");
    let botao = document.querySelector('#botaoRemover');
    if (progresso == 100) {
        if (botao == null) {
            let botaoRemover = document.createElement('input');
            botaoRemover.setAttribute('type', 'button');
            botaoRemover.setAttribute('id', 'botaoRemover');
            botaoRemover.setAttribute('value', 'Remover');
            progressBar.parentNode.insertBefore(botaoRemover, progressBar.nextSibling);
        }
    } else {
        if (botao != null) {
            botao.style.animation = 'removeRemover 0.2s linear';
            botao.addEventListener("animationend", () => {
                botao.remove();
            });
        }
        return 0;
    }
    document.querySelector("#botaoRemover").addEventListener('click', () => {
        let todolist = dados.todolist;
        let listaProgresso = dados.progresso;
        if (listaProgresso.length == 1) {
            alert('Você não pode apagar a sua única categoria atual!');
            return 0;
        }
        // encontra a 'index' da categoria no objeto do todolist
        let envNum = 0;
        for (const envName in dados.todolist) {
            if (envName === env)
                break;
            envNum++;
        }
        delete todolist[env];
        listaProgresso.splice(envNum, 1);
        let nextEnv = Object.keys(todolist)[0];

        console.log("dados atualizados: ", dados);
        dados = JSON.stringify(dados);
        localStorage.setItem(user, dados);
        changeEnv(user, nextEnv);
    })
}