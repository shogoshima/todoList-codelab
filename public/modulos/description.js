import { getCookie } from "./cookie.js";

export function description(event) {
    // pegar dados do usuário
    let user = getCookie('logado');
    let env = getCookie('env');
    let dados = JSON.parse(localStorage.getItem(user));
    let lista = dados.todolist[env];

    // pegar nome da classe que ativou o evento
    let classe = event.target.className.split(' ')[0];
    // console.log(classe);
    // caso a classe não seja o botão clicado, nada acontece
    if (classe != "more" && classe != "arrow")
        return 0;
    
    // pega o nome do id que ativou o evento
    let id = event.target.id;
    let taskId = id.split('-')[1]; // pegar apenas o número da id da task
    
    // a descrição vai surgir depois da div da task
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
        // muda a imagem do botao
        document.querySelector(`#arrow-${taskId}`).src = `./img/up-arrow.png`;
        
        // cria uma nova div de descrição, e coloca alguns atributos nele
        let desc = document.createElement('div');
        desc.setAttribute('class', 'description');
        desc.setAttribute('id', `description-${taskId}`);

        // cria um elemento de input de texto
        // criei como 'textarea' pois assim consigo ter controle do tamanho dele
        let descInput = document.createElement('textarea');
        descInput.setAttribute('class', 'descInput');
        descInput.setAttribute('id', `descInput-${taskId}`);
        descInput.setAttribute('rows', '3');
        descInput.setAttribute('cols', '89');
        descInput.setAttribute('placeholder', 'Descrição');

        // coloco o elemento criado dentro da div que criei anteriormente
        desc.appendChild(descInput);

        // coloco a div de descrição depois da div da task
        task.parentNode.insertBefore(desc, task.nextSibling);

        // o texto que tá contido nos dados do usuário vai ser atribuído nele
        descInput.value = lista[index].descricao;
    }

    // adiciono um addeventlistener para a div que acabei de criar
    // caso seja clicado, ele deve ser retraído e apagar o elemento do html
    document.querySelector(`#more-${taskId}`).addEventListener("click", () => {
        if (document.querySelector(`#description-${taskId}`)) {
            document.querySelector(`#arrow-${taskId}`).src = `./img/down-arrow.png`;
            document.querySelector(`#description-${taskId}`).style.animation = "removeDesc 0.25s linear";
            document.querySelector(`#description-${taskId}`).addEventListener("animationend", () => {
                // os elementos serão apagados somente quando a animação acabar
                const elements = document.querySelectorAll(`#description-${taskId}`);
                for (const el of elements) {
                    el.parentNode.removeChild(el);
                };
            })
        }
    })
}