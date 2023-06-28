// quando clico, devo:
// solicitar um nome pro novo environment: Input -> aperta enter -> confirma o nome do env -> vira texto
// criar um novo key no objeto do todolist com o nome do env e colocar uma lista vazia
// dar display da lista vazia

export function newEnv(user, dados, display) {
    let name;
    // cria um elemento de input para o usuário poder digitar um nome para o novo espaço
    let input = document.createElement('input');
    // cria atributos importantes para trabalhar com ele
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'envName');
    // pega o botao de adicionar um novo espaço
    let botao = document.querySelector("#new_env");
    // adiciona o input antes do botao, e apaga o botao temporariamente
    botao.parentNode.insertBefore(input, botao);
    botao.style = "display: none";
    // pega o input do usuário com o novo elemento criado. Quando o usuário clicar "enter", a função abaixo roda
    let inputName = document.querySelector("#envName");
    inputName.style = `font-size: large;
    width: 100%;
    text-align: center;
    border-radius: 5px;`;
    inputName.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            // name é o input que o usuário deu ao novo espaço
            name = inputName.value;
            // dá atributos importantes para o CSS do arquivo já pegar nele
            input.setAttribute('type', 'button');
            input.setAttribute('value', name);
            input.setAttribute('class', `env_button ${name}`);
            // cria uma nova chave no todolist com o nome do espaço
            let todolist = dados.todolist;

            // pegar data atual, pra deixar meio q como default quando cria o objeto
            let data = new Date();
            let day = data.getDate();
            let month = data.getMonth() + 1;
            if ((month % 10) == month) {
                month.toString();
                month = "0" + month;
            }
            let year = data.getFullYear();
            // pra criar o objeto
            todolist[name] = [
                {
                    id: 0,
                    nome: "Exemplo de tarefa",
                    data: `${year}-${month}-${day}`,
                    completo: false,
                }
            ];

            // manda para o localStorage e mostra o botão de novo
            dados = JSON.stringify(dados);
            localStorage.setItem(user, dados);
            botao.style = "display: block";

            // escreve no localStorage em qual página o usuário está agr
            localStorage.setItem('env', name);
            window.location.href = "todolist.html"; 
        }
    })
}