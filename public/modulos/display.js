export function display(lista) {
    document.querySelector("#list").innerHTML = "<button id='new_task'>+</button>";
    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    for (let id = 0; id < lista.length; id++) {
        // faço a mesma coisa que fiz na função de adicionar task
        // nisso eu só criei o html base
        let div = document.createElement('div');
        div.setAttribute('class', 'task ' + id);
        let taskInfo = `<input class="checkbox ${id}" id="checkbox" type="checkbox"/>
                        <input class="task_name ${id}" id="task_name"/>
                        <input class="date ${id}" id="date" type="date">
                        <button class="remove ${id}" "id="remove">r</button>
                        <button class="edit ${id}" id="edit">e</button>`;
        div.innerHTML = taskInfo;
        // colocando a div depois do elemento
        divBotao.parentNode.insertBefore(div, divBotao.nextSibling);

        // aqui eu atualizo os valores de acordo com o que tem na lista salva do localStorage
        document.querySelector(`#checkbox`).value = lista[id].completo;
        document.querySelector(`#task_name`).value = lista[id].nome;
        document.querySelector(`#date`).value = lista[id].data;
    }
}