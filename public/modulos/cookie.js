export function cookie(key, value) {
    const d = new Date(); 
    d.setTime(d.getTime() + (60 * 60 * 1000)) // seta o tempo para 60 minutos depois de agora
    let expires = "expires=" + d.toUTCString(); // transforma em string
    document.cookie = key + "=" + value + ";" + expires; // adiciona no formato de um cookie
}

export function getCookie(key) {
    let value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(key + "="))
        ?.split("=")[1];
    return value;
}