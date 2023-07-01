export function description(event, user, dados, env) {
    let lista = dados.todolist[env];
    let classe = event.target.className;
    if (classe != "more")
        return 0;
    let id = event.target.id;
    let taskId = id.split('-')[1]; // pegar o id da task
    // a descrição vai surgir daqui
    let task = document.querySelector(`#task-${taskId}`);
    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }
    // pega o index da task na lista
    let index = lista.findIndex(x => x.id == taskId);

    if (document.querySelector(`#description-${taskId}`) === null) {
        let desc = document.createElement('div');
        desc.setAttribute('class', 'description');
        desc.setAttribute('id', `description-${taskId}`);
        let descInput = document.createElement('textarea');
        descInput.setAttribute('class', 'descInput');
        descInput.setAttribute('id', `descInput-${taskId}`);
        descInput.setAttribute('rows', '3');
        descInput.setAttribute('cols', '89');
        desc.appendChild(descInput);
        task.parentNode.insertBefore(desc, task.nextSibling);
        descInput.value = lista[index].descricao;
    }

    document.querySelector(`#more-${taskId}`).addEventListener("click", () => {
        if (document.querySelector(`#description-${taskId}`)) {
            document.querySelector(`#description-${taskId}`).style.animation = "removeDesc 0.25s linear";
            document.querySelector(`#description-${taskId}`).addEventListener("animationend", () => {
                const elements = document.querySelectorAll(`#description-${taskId}`);
                for (const el of elements) {
                    el.parentNode.removeChild(el);
                }
            })
        }
    })
}