export function edit(event, user, dados, env) {
    // pego os dados do elemento que ativou o evento (nesse caso, o "oninput")
    // preciso da classe e da id
    let classe = event.target.className;
    
    // id no formato: "task_name-4"
    let id = event.target.id;
    
    // preciso da lista
    let lista = dados.todolist[env];

    // vou fazer split da id - vai resultar numa lista, por ex: ["task_name", "4"]
    // só quero o segundo item da lista, que é o index que preciso pra identificar
    let index = id.split('-')[1]; 
    let task = document.querySelector(`#task-${index}`);

    // nas próximas condicionais, eu confiro se o que está sendo mudado é
    // o nome da task, ou o checkbox, ou a data
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