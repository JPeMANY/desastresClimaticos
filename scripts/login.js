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
    login.classList.remove('none');
    setTimeout(()=>{
        login.classList.remove('oculto')
    }, 1000)
}

function ocultarMensagem() {
    login.classList.add('oculto');
    setTimeout(()=>{
        login.classList.add('none')
    }, 2000)
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


fetch(`../dados/ValeDoTaquari/listaCidades.json`)
    .then(response => response.json()) // Converter a resposta para JSON
    .then(data => {

        // Cria elementos option do select
        for (let i = 0; i < data.lista.length; i++) {
            let opcaoLista = document.createElement('option');
            opcaoLista.text = data.lista[i];
            cidadeSelect.appendChild(opcaoLista)
        }

})
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));


/* fetch('dados/listaCidades.json')
        .then(response => response.json()) // Converter a resposta para JSON
        .then(data => {
            
        for (let i = 0; i < data.lista.length)

        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
 */