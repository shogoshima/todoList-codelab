import { taskColor } from "./taskColor.js";

export function displayTask(index, lista, divBotao) {
    // faço a mesma coisa que fiz na função de adicionar task
    // nisso eu só criei o html base
    let taskId = lista[index].id;
    let div = document.createElement('div');
    div.setAttribute('id', 'task-' + taskId);
    div.setAttribute('class', 'task');
    let taskInfo = `<input class="checkbox" id="checkbox-${taskId}" type="checkbox"/>
                    <input class="task_name" id="task_name-${taskId}" onClick="this.select()"/>
                    <input class="date" id="date-${taskId}" type="date">
                    <div class="color" id="color-${taskId}"></div>
                    <button class="remove" id="remove-${taskId}">
                    <img class="trash" id="trash-${taskId}" src="./img/bin.png"></button>`;
    div.innerHTML = taskInfo;
    // colocando a div depois do elemento
    divBotao.parentNode.insertBefore(div, divBotao);

    // aqui eu atualizo os valores de acordo com o que tem na lista salva do localStorage
    document.querySelector(`#checkbox-${taskId}`).checked = lista[index].completo;
    if (lista[index].completo) {
        document.querySelector(`#task_name-${taskId}`).style = `text-decoration: line-through;
        color: rgba(0, 0, 0, 0.5);
        `;
    }
    document.querySelector(`#task_name-${taskId}`).value = lista[index].nome;
    document.querySelector(`#date-${taskId}`).value = lista[index].data;
    document.querySelector(`#color-${taskId}`).style.backgroundColor = taskColor(lista[index].data);
}
