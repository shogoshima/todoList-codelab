export function edit(event, user, dados, env) {
    let classe = event.target.className;
    let id = event.target.id;
    let lista = dados.todolist[env];
    let num = classe.split('-')[1]; // pegar o número da task na lista
    if (id === "task_name") {
        lista[num].nome = document.querySelector(`.task_name-${num}`).value;
    } else if (id === "checkbox") {
        lista[num].completo = document.querySelector(`.checkbox-${num}`).checked;
        if (lista[num].completo) {
            document.querySelector(`.task_name-${num}`).style = `text-decoration: line-through;
            color: rgba(0, 0, 0, 0.5);
            `;
        } else {
            document.querySelector(`.task_name-${num}`).style = "text-decoration: none";
        }
    } else if (id === "date") {
        lista[num].data = document.querySelector(`.date-${num}`).value;
    }
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}