export function edit(event, user, dados, env) {
    let classe = event.target.className;
    let id = event.target.id;
    let lista = dados.todolist[env];
    let index = classe.split('-')[1]; // pegar o número da task na lista
    if (id === "task_name") {
        lista[index].nome = document.querySelector(`.task_name-${index}`).value;
    } else if (id === "checkbox") {
        lista[index].completo = document.querySelector(`.checkbox-${index}`).checked;
        if (lista[index].completo) {
            document.querySelector(`.task_name-${index}`).style = `text-decoration: line-through;
            color: rgba(0, 0, 0, 0.5);
            `;
        } else {
            document.querySelector(`.task_name-${index}`).style = "text-decoration: none";
        }
    } else if (id === "date") {
        lista[index].data = document.querySelector(`.date-${index}`).value;
    } else {
        return 0;
    }
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}

export function remove(event, user, dados, env) {
    let id = event.target.id;
    if (id != "remove")
        return 0;
    let classe = event.target.className;
    let lista = dados.todolist[env];
    let index = classe.split('-')[1]; // pegar o número da task na lista
    lista.splice(index, 1);
    const elements = document.querySelectorAll(`.task-${index}`);
    for (const el of elements) {
        el.parentNode.removeChild(el);
    }
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}