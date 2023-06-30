export function edit(event, user, dados, env) {
    // pego os dados do elemento que ativou o evento (nesse caso, o "oninput")
    // preciso da classe e da id
    let classe = event.target.className;
    
    // id no formato: "task_name-4"
    let id = event.target.id;
    
    // preciso da lista
    let lista = dados.todolist[env];

    // vou fazer split da id - vai resultar numa lista, por ex: ["task_name", "4"]
    let taskId = id.split('-')[1]; 
    let task = document.querySelector(`#task-${taskId}`);

    // encontra a 'index' da categoria no objeto do todolist
    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }

    // encontra index da task na lista, de acordo com a id da task
    let index = lista.findIndex(x => x.id == taskId);
    
    // nas próximas condicionais, eu confiro se o que está sendo mudado é
    // o nome da task, ou o checkbox, ou a data
    if (classe === "task_name") {
        task.style = "background-color: rgb(156, 166, 163);";
        lista[index].nome = document.querySelector(`#task_name-${taskId}`).value;

        // se o usuário apertar enter, o elemento fica claro de novo
        task.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                task.style = "background-color: rgb(222, 222, 222)";
                document.querySelector(`#task_name-${taskId}`).blur();
            }
        })
        // se o usuário clicar fora, o elemento fica claro de novo
        window.addEventListener('click', (event) => {
            if (!task.contains(event.target))
                task.style = "background-color: rgb(222, 222, 222)";
        })
    } else if (classe === "checkbox") {
        lista[index].completo = document.querySelector(`#checkbox-${taskId}`).checked;
        if (lista[index].completo) {
            document.querySelector(`#task_name-${taskId}`).style = `text-decoration: line-through;
            color: rgba(0, 0, 0, 0.5);`;
            dados.progresso[envNum]++;
            document.querySelector("#barra").value = dados['progresso'][envNum] / lista.length * 100;
        } else {
            dados['progresso'][envNum]--;
            document.querySelector(`#task_name-${taskId}`).style = "text-decoration: none";
            document.querySelector("#barra").value = dados['progresso'][envNum] / lista.length * 100;
        }
    } else if (classe === "date") {
        lista[index].data = document.querySelector(`#date-${taskId}`).value;
    } else {
        return 0;
    }

    // passo os dados atualizados pro banco de dados
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}

export function remove(event, user, dados, env) {
    let classe = event.target.className;
    if (classe != "remove")
        return 0;
    let id = event.target.id;
    let lista = dados.todolist[env];
    let taskId = id.split('-')[1]; // pegar o id da task na lista
    const elements = document.querySelectorAll(`#task-${taskId}`);
    for (const el of elements) {
        el.parentNode.removeChild(el);
    }

    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }

    // encontra index da task na lista, de acordo com a id da task
    let index = lista.findIndex(x => x.id == taskId);

    // Vê se a task tá completa
    let seCompleto = lista[index].completo;
    if (seCompleto)
        dados.progresso[envNum]--;
    
    document.querySelector("#barra").value = dados['progresso'][envNum] / (lista.length - 1) * 100;
    
    // apaga o objeto selecionado da lista e atualiza no banco de dados
    lista.splice(index, 1);
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}