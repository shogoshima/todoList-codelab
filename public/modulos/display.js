export function display(lista) {
    // se não existir um botao na div de lista, cria um novo
    let botao = document.createElement('div');
    botao.setAttribute('type', 'button');
    botao.setAttribute('id', 'new_task');
    //document.querySelector("#list").innerHTML = `<button id="new_task">Adicionar</button>`;
    document.querySelector("#list").replaceChildren(botao);
    document.querySelector("#new_task").innerHTML = "Adicionar";
    
    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    for (let id = 0; id < lista.length; id++) {
        // faço a mesma coisa que fiz na função de adicionar task
        // nisso eu só criei o html base
        let div = document.createElement('div');
        div.setAttribute('id', 'task-' + id);
        div.setAttribute('class', 'task');
        let taskInfo = `<input class="checkbox" id="checkbox-${id}" type="checkbox"/>
                        <input class="task_name" id="task_name-${id}" onClick="this.select()"/>
                        <input class="date" id="date-${id}" type="date">
                        <button class="remove" id="remove-${id}">r</button>`;
        div.innerHTML = taskInfo;
        // colocando a div depois do elemento
        divBotao.parentNode.insertBefore(div, divBotao);

        // aqui eu atualizo os valores de acordo com o que tem na lista salva do localStorage
        document.querySelector(`#checkbox-${id}`).checked = lista[id].completo;
        if (lista[id].completo) {
            document.querySelector(`#task_name-${id}`).style = `text-decoration: line-through;
            color: rgba(0, 0, 0, 0.5);
            `;
        }
        document.querySelector(`#task_name-${id}`).value = lista[id].nome;
        document.querySelector(`#date-${id}`).value = lista[id].data;
    }
    document.querySelector("#list").style = "display:flex";
}