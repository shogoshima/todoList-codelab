// função que verifica se a task deve ser de uma cor ou outra
export function taskColor(d) {
    // da pra pensar a respeito como vamos definir esse tempo
    let red = 1000 * 60 * 60 * 24;
    let yellow = 1000 * 60 * 60 * 24 * 5;

    let date = new Date(d).getTime();
    let now = new Date();
    let dif = date - now;
    if (dif < 0)
        return 'black'; // se já passou do tempo, nao tem cor
    else if (dif < red)
        return 'red'; // se ta perto, fica vermelho
    else if (dif < yellow)
        return 'yellow'; // se ta relativamente perto, fica amarelo
    return 'green'; // se tem bastante tempo, fica verde
}