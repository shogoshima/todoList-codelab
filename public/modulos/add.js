
// dados = dados do usuario logado
export function add(dados) {
    // pega a lista com todas as tasks
    let lista = dados.todolist.tarefas;
    console.log(lista);
    let id = lista.length == undefined ? 0 : lista.length;
    // criando elemento div (task)
    let div= document.createElement('div');
    // dando um class para a div
    // precisa ser um class, em vez de id.
    // isso pro mesmo css funcionar pra todas as tasks que vao ter ids diferentes
    // o mesmo funciona pra cada elemento da task, mas deixei as ids tbm (acho q pode apagar)
    div.setAttribute('class', 'task ' + id);
    let taskInfo = `<input class="checkbox ${id}" id="checkbox" type="checkbox"/>
                    <input class="task_name ${id}" id="task_name"/>
                    <input class="date ${id}" id="date" type="date">
                    <button class="remove ${id}" "id="remove">r</button>
                    <button class="edit ${id}" id="edit">e</button>`;
    div.innerHTML = taskInfo;
    console.log(div);

    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    // colocando a div depois do elemento
    divBotao.parentNode.insertBefore(div, divBotao.nextSibling);
    // adicionar task depois do divBotao

    // so pra verificar se ta certo
    //console.log(document.querySelector("#list").innerHTML);

    // adicionando nova task na lista:
    let task = {
        id: id,
        nome: "",
        data: "",
        completo: false,
    }
    lista.push(task);
}