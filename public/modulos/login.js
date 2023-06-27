// se o seu localStorage estiver poluído:
// localStorage.clear();

// funcao para cadastrar:
// pega os dados do input (user e pswd) que seriam do document.getElementById.
// cria um objeto chamado dados, em que teria a senha do usuario e um outro objeto,
// que dessa vez vai ser um objeto com todas as informações das tabelas do todolist
// apos criar o objeto, ele é transformado em string e é mandado pro localStorage
export function cadastrar(user, pswd) {
    let data = new Date();
    let day = data.getDate();
    let month = data.getMonth() + 1;
    if ((month % 10) == month) {
        month.toString();
        month = "0" + month;
    }
    let year = data.getFullYear();
    console.log(data);
    let dados = {
        senha: pswd,
        todolist: {
            tarefas: [
                {
                    id: 0,
                    nome: "Exemplo de tarefa",
                    data: `${year}-${month}-${day}`,
                    completo: false,
                }
            ],
        },
    }
    if (user == "" || dados.senha == "") {
        alert("Parece que você esqueceu de digitar algo kkk");
        return 0;
    }
    console.log(dados.senha);
    dados = JSON.stringify(dados);
    console.log(dados);
    localStorage.setItem(user, dados);
    alert("Usuário cadastrado com sucesso!");
}

// funcao para logar:
// com JSON.parse, ele pega os dados salvos da chave "user" e o transforma em um objeto que o JS entende
// se "dados" não for vazio, ele vê se a senha que tava salva é a mesma q ta no input.
// se for a mesma, cria um cookie que expira depois de 15 minutos, e vai para o html do todolist
// senao, ele só diz q ta errado
export function login(user, pswd) {
    if (user == "" || pswd == "") {
        alert("Parece que você esqueceu de digitar algo kkk");
        return 0;
    }
    let dados = JSON.parse(localStorage.getItem(user));
    if (dados) {
        // encontrei dado do usuario, preciso verificar se a senha está correta
        if (dados.senha == pswd) {
            alert(`Bem vindo(a) de volta, ${user}!`);
            localStorage.setItem('env', 'tarefas'); // adiciona onde o usuário vai entrar primeiro
            const d = new Date(); 
            d.setTime(d.getTime() + (60 * 60 * 1000)) // seta o tempo para 60 minutos depois de agora
            let expires = "expires=" + d.toUTCString(); // transforma em string
            document.cookie = "logado=" + user + ";" + expires; // adiciona no formato de um cookie
            window.location.href = "todolist.html"; 
        } else {
            alert(`${user}, sua senha está errada. Por favor, tente novamente.`);
        }
    }
}