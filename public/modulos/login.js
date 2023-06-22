
export function cadastrar(user, pswd) {
    let dados = {
        senha: pswd,
        todolist: {},
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
            window.location.href = "todolist.html";
        } else {
            alert(`${user}, sua senha está errada. Por favor, tente novamente.`);
        }
    }
}