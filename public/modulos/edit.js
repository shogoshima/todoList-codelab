import { taskColor } from "./taskColor.js";
import { removeEnv } from "./removeEnv.js";
import { getCookie } from "./cookie.js";

// funcao que lida com qualquer tipo de edição da task (checkbox, mudança de nome, mudança de data)
export function edit(event) {
    let user = getCookie('logado');
    let env = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));

    // pego os dados do elemento que ativou o evento (nesse caso, o "oninput")
    // preciso da classe e da id
    let classe = event.target.className.split(' ')[0];
    
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
        // let imgRemove = document.querySelector(`#trash-${taskId}`);
        // let botaoRemove = document.querySelector(`#remove-${taskId}`);
        lista[index].nome = document.querySelector(`#task_name-${taskId}`).value;

        // se o usuário apertar enter, o elemento fica claro de novo
        task.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                document.querySelector(`#task_name-${taskId}`).blur();
            }
        })
    } else if (classe === "checkbox") {
        // atualiza nos dados se foi marcado como 'true' ou 'false'
        lista[index].completo = document.querySelector(`#checkbox-${taskId}`).checked;
        // se for 'true', entao vai rodar o de baixo. senao, o outro roda
        if (lista[index].completo) {
            // coloca um risco no texto se tiver algo escrito
            document.querySelector(`#task_name-${taskId}`).classList.add("riscado");

            // atualiza na lista de progresso e mostra o progresso atualizado na barra
            dados.progresso[envNum]++;
            let progresso = dados['progresso'][envNum] / lista.length * 100;
            document.querySelector("#barra").value = progresso;
            removeEnv(user, env, progresso);
        } else {
            // atualiza na lista, tira o risco que tinha no texto e mostra o progresso atualizado na barra
            dados['progresso'][envNum]--;
            document.querySelector(`#task_name-${taskId}`).classList.remove("riscado");
            let progresso = dados['progresso'][envNum] / lista.length * 100;
            document.querySelector("#barra").value = progresso;
            removeEnv(user, env, progresso);
        }
    } else if (classe === "date") {
        lista[index].data = document.querySelector(`#date-${taskId}`).value;
        document.querySelector(`#color-${taskId}`).style.backgroundColor = taskColor(lista[index].data);
    } else if (classe === "descInput") {
        lista[index].descricao = document.querySelector(`#descInput-${taskId}`).value;
    } else {
        return 0;
    }

    // passo os dados atualizados pro banco de dados
    // console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}

// funcao para remover a task
export function remove(event) {
    let user = getCookie('logado');
    let env = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));

    let classe = event.target.className.split(' ')[0];
    if (classe != "remove" && classe != "trash")
        return 0;
    let id = event.target.id;
    let lista = dados.todolist[env];
    let taskId = id.split('-')[1]; // pegar o id da task na lista
    // encontra index da task na lista, de acordo com a id da task
    
    // animacao de remocao
    document.querySelector(`#task-${taskId}`).style.animation = "removeTask 0.25s ease-in";
    if (document.querySelector(`#description-${taskId}`))
        document.querySelector(`#description-${taskId}`).style.animation = "removeDesc 0.25s ease-in";
    document.querySelector(`#task-${taskId}`).addEventListener("animationend", () => {
        const elements = document.querySelectorAll(`#task-${taskId}`);
        for (const el of elements) {
            el.parentNode.removeChild(el);
        }
        if (document.querySelector(`#description-${taskId}`))
            document.querySelector(`#description-${taskId}`).remove();
    })

    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }

    let index = lista.findIndex(x => x.id == taskId);
    // Vê se a task tá completa
    let seCompleto = lista[index].completo;
    if (seCompleto)
        dados.progresso[envNum]--;
    
    let progresso = lista.length == 1 ? 0 : dados['progresso'][envNum] / (lista.length - 1) * 100;
    document.querySelector("#barra").value = progresso;
    removeEnv(user, env, progresso);
    
    // apaga o objeto selecionado da lista e atualiza no banco de dados
    lista.splice(index, 1);
    // console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}