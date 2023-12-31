import { displayTask } from './displayTask.js';
import { add } from './add.js';
import { getCookie } from "./cookie.js";

function swapElements(arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}

export function sort() {
    let user = getCookie('logado');
    let env = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));
    let lista = dados.todolist[env];

    // bubble sort rsrs
    let ct = 1;
    while (ct != 0) {
        ct = 0;
        for (let i = 1; i < lista.length; i++) {
            if (lista[i].data < lista[i - 1].data) {
                swapElements(lista, i, i - 1);
                ct++
            }
        }
    }
    
    // cria um botao 
    let botao = document.createElement('button');
    botao.setAttribute('id', 'new_task');
    document.querySelector("#list").replaceChildren(botao);
    document.querySelector("#new_task").innerHTML = "Adicionar";

    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    
    for (let index = 0; index < lista.length; index++) {
        setTimeout(() => {
            displayTask(index, lista, divBotao);
        }, index * 75);
    }

    document.querySelector("#new_task").addEventListener("click", () => {
        add(user);
    })

    // console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
} 