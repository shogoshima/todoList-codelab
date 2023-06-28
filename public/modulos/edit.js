export function edit(event, user, dados, env) {
    let classe = event.target.className;
    let id = event.target.id;
    let lista = dados.todolist[env];
    let index = id.split('-')[1]; // pegar o número da task na lista
    let task = document.querySelector(`#task-${index}`);
    if (classe === "task_name") {
        task.style = "background-color: rgb(156, 166, 163);";
        lista[index].nome = document.querySelector(`#task_name-${index}`).value;
        task.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                task.style = "background-color: rgb(222, 222, 222)";
                document.querySelector(`#task_name-${index}`).blur();
            }
        })
    } else if (classe === "checkbox") {
        lista[index].completo = document.querySelector(`#checkbox-${index}`).checked;
        if (lista[index].completo) {
            document.querySelector(`#task_name-${index}`).style = `text-decoration: line-through;
            color: rgba(0, 0, 0, 0.5);
            `;
        } else {
            document.querySelector(`#task_name-${index}`).style = "text-decoration: none";
        }
    } else if (classe === "date") {
        lista[index].data = document.querySelector(`#date-${index}`).value;
    } else {
        return 0;
    }
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
    let index = id.split('-')[1]; // pegar o número da task na lista
    lista.splice(index, 1);
    const elements = document.querySelectorAll(`#task-${index}`);
    for (const el of elements) {
        el.parentNode.removeChild(el);
    }
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}