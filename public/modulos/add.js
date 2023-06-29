
// dados = dados do usuario logado
export function add(user, dados, env) {
    let lista = dados.todolist[env];
    // o id vai ser o tamanho da lista
    let id = lista.length == undefined ? 0 : lista.length;
    // criando elemento div (task)
    let div= document.createElement('div');
    // dando um class para a div
    // precisa ser um class, em vez de id.
    // isso pro mesmo css funcionar pra todas as tasks que vao ter ids diferentes
    // o mesmo funciona pra cada elemento da task, mas deixei as ids tbm (acho q pode apagar)
    div.setAttribute('id', 'task-' + id);
    div.setAttribute('class', 'task');
    let taskInfo = `<input class="checkbox" id="checkbox-${id}" type="checkbox">
                    <input class="task_name" id="task_name-${id}" onClick="this.select();">
                    <input class="date" id="date-${id}" type="date">
                    <button class="remove" id="remove-${id}">r</button>`;
    div.innerHTML = taskInfo;

    // pegar div do botao
    let divBotao = document.querySelector("#new_task");
    // colocando a div depois do elemento
    divBotao.parentNode.insertBefore(div, divBotao);
    // adicionar task depois do divBotao

    // so pra verificar se ta certo
    //console.log(document.querySelector("#list").innerHTML);

    // pegar data atual
    let data = new Date();
    let day = data.getDate();
    let month = data.getMonth() + 1;
    if ((month % 10) == month) {
        month.toString();
        month = "0" + month;
    }
    let year = data.getFullYear();
    // adicionando nova task na lista:
    let task = {
        id: id,
        nome: "",
        data: `${year}-${month}-${day}`,
        completo: false,
    }
    lista.push(task);
    document.querySelector(`#date-${id}`).value = `${year}-${month}-${day}`;

    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }
    document.querySelector("#barra").value = dados['progresso'][envNum] / lista.length * 100;

    // preciso atualizar a lista no localStorage
    // se eu não fizer isso, os dados no localStorage vão continuar sendo os antigos
    // e quando atualizo a página não vou conseguir ver as tasks que tinha criado nessa função
    // console.log(dados);
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}