const btnLogin = document.getElementById('btnLogin');
const btnEditar = document.getElementById('btnEditar');

const login = document.querySelector('.login');

const regiaoSelect = document.getElementById('regiao');
const cidadeSelect = document.getElementById('cidade');

let regiao = localStorage.getItem('Região')
let cidade = localStorage.getItem('Cidade');

if (cidade === null) {
    mostrarMensagem();
} else {
    atualizarInicio();
}


function mostrarMensagem() {
    login.classList.remove('oculto');
    setTimeout(()=>{
        login.classList.remove('none')
    }, 3000)
}

function ocultarMensagem() {
    login.classList.add('oculto');
    setTimeout(()=>{
        login.classList.add('none')
    }, 3000)
}

btnEditar.addEventListener('click', ()=> {
    mostrarMensagem();
})

btnLogin.addEventListener('click', ()=> {
    ocultarMensagem();

    const regiaoValor = regiaoSelect.options[regiaoSelect.selectedIndex].text;
    const cidadeValor = cidadeSelect.options[cidadeSelect.selectedIndex].text;

    localStorage.setItem('Região', regiaoValor);
    localStorage.setItem('Cidade', cidadeValor);

    regiao = regiaoValor;
    cidade = cidadeValor;
    atualizarInicio();
})



/* localStorage.setItem('Nome', nomeUsuario);
            // Cookie armazenado em variável
            nomeCookie = localStorage.getItem('Nome'); */