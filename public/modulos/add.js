import { getCookie } from "./cookie.js";
import { removeEnv } from "./removeEnv.js";

// dados = dados do usuario logado
export function add() {
    // pega os dados do usuário
    let user = getCookie('logado');
    let env = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));
    let lista = dados.todolist[env];

    // a id que vai ser atribuída à task vai ser o número máximo que existe dentro da lista de tasks + 1
    const ids = lista.map(object => {
        return object.id;
    })
    let id = (lista.length == null || lista.length == undefined || lista.length == 0) ? 0 : Math.max(...ids) + 1;

    // criando elemento div (task)
    let div= document.createElement('div');
    // dando um class para a div
    // precisa ser um class, em vez de id.
    // isso pro mesmo css funcionar pra todas as tasks que vao ter ids diferentes
    // o mesmo funciona pra cada elemento da task, mas deixei as ids tbm (acho q pode apagar)
    div.setAttribute('id', 'task-' + id);
    div.setAttribute('class', 'task');
    let taskInfo = `<input class="checkbox" id="checkbox-${id}" type="checkbox">
                    <input class="task_name" id="task_name-${id}" placeholder="Tarefa"">
                    <button class="more" id="more-${id}">
                    <img class="arrow" id="arrow-${id}" src="./img/down-arrow.png"></button>
                    <input class="date" id="date-${id}" type="date">
                    <div class="color" id="color-${id}"></div>
                    <button class="remove" id="remove-${id}">
                    <img class="trash" id="trash-${id}" src="./img/bin.png"></button>`;
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
    day = day.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    let month = data.getMonth() + 1;
    month = month.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    let year = data.getFullYear();
    // adicionando nova task na lista:
    let task = {
        id: id,
        nome: "",
        data: `${year}-${month}-${day}`,
        completo: false,
        descricao: "",
    }
    lista.push(task);
    document.querySelector(`#date-${id}`).value = `${year}-${month}-${day}`;

    let envNum = 0;
    for (const envName in dados.todolist) {
        if (envName === env)
            break;
        envNum++;
    }

    let progresso = dados['progresso'][envNum] / lista.length * 100;
    document.querySelector("#barra").value = progresso;
    removeEnv(user, env, progresso);

    // preciso atualizar a lista no localStorage
    // se eu não fizer isso, os dados no localStorage vão continuar sendo os antigos
    // e quando atualizo a página não vou conseguir ver as tasks que tinha criado nessa função
    // console.log(dados);
    console.log("dados atualizados: ", dados);
    dados = JSON.stringify(dados);
    localStorage.setItem(user, dados);
}