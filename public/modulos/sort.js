// fazer com async function pra ficar bonito

function swapElements(arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}

function displayTask(index, lista, divBotao) {
    // faço a mesma coisa que fiz na função de adicionar task
    // nisso eu só criei o html base
    let taskId = lista[index].id;
    let div = document.createElement('div');
    div.setAttribute('id', 'task-' + taskId);
    div.setAttribute('class', 'task');
    let taskInfo = `<input class="checkbox" id="checkbox-${taskId}" type="checkbox"/>
                    <input class="task_name" id="task_name-${taskId}" onClick="this.select()"/>
                    <input class="date" id="date-${taskId}" type="date">
                    <button class="remove" id="remove-${taskId}">r</button>`;
    div.innerHTML = taskInfo;
    // colocando a div depois do elemento
    divBotao.parentNode.insertBefore(div, divBotao);

    // aqui eu atualizo os valores de acordo com o que tem na lista salva do localStorage
    document.querySelector(`#checkbox-${taskId}`).checked = lista[index].completo;
    if (lista[index].completo) {
        ct++;
        document.querySelector(`#task_name-${taskId}`).style = `text-decoration: line-through;
        color: rgba(0, 0, 0, 0.5);
        `;
    }
    document.querySelector(`#task_name-${taskId}`).value = lista[index].nome;
    document.querySelector(`#date-${taskId}`).value = lista[index].data;
}

export function sort(user, dados, env, getCookie) {
    let lista = dados.todolist[env];
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

    // contagem do progresso
    ct = 0;

    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    
    for (let index = 0; index < lista.length; index++) {
        setTimeout(() => {
            displayTask(index, lista, divBotao, getCookie);
        }, index * 25);
    }

    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
} 