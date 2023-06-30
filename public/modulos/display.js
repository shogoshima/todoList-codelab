let ct;

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

export function display(lista, user, add, getCookie) {
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
        displayTask(index, lista, divBotao);
    }
    // barra de progresso
    document.querySelector("#barra").value = ct / lista.length * 100;
    
    // adicionando eventlistener pro botao que criei no começo dessa função
    document.querySelector("#new_task").addEventListener("click", () => {
        let dados = JSON.parse(localStorage.getItem(user));
        let env = getCookie('env');
        add(user, dados, env);
    })
}