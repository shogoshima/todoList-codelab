// aparece um botão só quando a barra de progresso está em 100%
// senão, ele desaparece
// se o usuário clica nesse botão, apaga o env e vai para o primeiro objecto existente nos dados
import { cookie } from "./cookie.js";
import { display } from "./display.js";
import { displayEnv } from "./displayEnv.js";

function nextEnv(user, newEnv) {
    let dados = JSON.parse(localStorage.getItem(user));
    //document.querySelector(`#env_button-${oldEnv}`).style = "background-color: rgba(94,200,174,255)";
    // seta o novo env para o que o usuário clicou, e da display
    cookie('env', newEnv);
    display();
    // console.log('env: ', newEnv);

    // deixa o botao da categoria selecionada clara
    displayEnv();
    document.querySelector(`#env_button-${newEnv}`).classList.add("selected");
}

// função que verifica se é para remover a categoria ou não, e se sim, cria um botão de remover
// e se o botão de remover for clicado, ele remove tudo
export function removeEnv(user, env, progresso) {
    // pega dados do usuário
    let dados = JSON.parse(localStorage.getItem(user));

    //pega a barra de progresso
    let progressBar = document.querySelector("#barra");
    let botao = document.querySelector('#botaoRemover');

    // caso o progresso seja 100%, então devo criar o botão de remover (se não tiver criado já)
    // caso o progresso não seja 100%, preciso apagar o botão (se existir um botão) e sai da função
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

    // atribui ao botao criado anteriormente o evento de clique
    // caso seja apertado, deve
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
        let newEnv = Object.keys(todolist)[0];

        // console.log("dados atualizados: ", dados);
        dados = JSON.stringify(dados);
        localStorage.setItem(user, dados);
        nextEnv(user, newEnv);
    })
}