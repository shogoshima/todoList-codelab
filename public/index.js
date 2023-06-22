// aqui vamos importar módulos js.
// na hora de criar funções javascript, criar um arquivo novo na mesma pasta,
// e linka aqui, tipo: import { soma, sub, mult, div } from './modulo.js';

import { login, cadastrar } from '/modulos/login.js';

document.querySelector("#cadastro").addEventListener("click", () => {
    cadastrar(document.querySelector("#usuario").value, document.querySelector("#senha").value);
}); 
document.querySelector("#login").addEventListener("click", () => {
    login(document.querySelector("#usuario").value, document.querySelector("#senha").value);
});
