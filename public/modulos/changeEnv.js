export function changeEnv(dados, event, display, add) {
    let name = event.target.value;
    if (name === "" || name === undefined)
        return 0;
    localStorage.setItem('env', name);
    window.location.href = "todolist.html"; 

    // document.querySelector("#pag_atual").innerHTML = `Você está em: ${name}`;
    // display(dados.todolist[name]);
    // document.querySelector("#new_task").addEventListener("click", () => {
    //     add(user, dados, name);
    // })
}