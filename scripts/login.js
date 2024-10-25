const btnLogin = document.getElementById('btnLogin');
const btnEditar = document.querySelector('.editarRegiao');

const login = document.querySelector('.login');
const telaCarregamento = document.querySelector('.telaCarregamento');

const regiaoSelect = document.getElementById('regiao');
const cidadeSelect = document.getElementById('cidade');

let regiao = localStorage.getItem('Região')
let cidade = localStorage.getItem('Cidade');
let carregamentoLento = localStorage.getItem('carregamentoLento');

console.log(carregamentoLento)

if (carregamentoLento === 'true') {
    telaCarregamento.classList.remove('carregar');
    telaCarregamento.classList.add('carregamentoLento');
    localStorage.setItem('carregamentoLento', false);

    setTimeout(()=> {
        expandirBarra();
        telaCarregamento.classList.remove('carregamentoLento');
    }, 16000)


} else {

    if (cidade === null) {
        setTimeout(()=> {
            expandirBarra();
        }, 7000)
    } else {
        atualizarInicio();
        setTimeout(()=> {
            fecharLogin();
        }, 7500);
    }
}

function expandirBarra() {
    telaCarregamento.classList.add('abrirCaixa');
}

function abrirLogin() {
    telaCarregamento.classList.remove('carregar');
    telaCarregamento.classList.remove('none');
    setTimeout(()=>{
        telaCarregamento.classList.remove('oculto')
    }, 500)
}

function fecharLogin() {
    telaCarregamento.classList.add('oculto');
    setTimeout(()=>{
        telaCarregamento.classList.add('none')
    }, 1000)
}

btnEditar.addEventListener('click', ()=> {
    abrirLogin();
    expandirBarra();
})

btnLogin.addEventListener('click', ()=> {
    fecharLogin();

    const regiaoValor = regiaoSelect.options[regiaoSelect.selectedIndex].text;
    const cidadeValor = cidadeSelect.options[cidadeSelect.selectedIndex].text;

    localStorage.setItem('Região', regiaoValor);
    localStorage.setItem('Cidade', cidadeValor);

    regiao = regiaoValor;
    cidade = cidadeValor;
    atualizarInicio();
})




fetch('../dados/ValeDoTaquari/cidades/listaCidades.json')
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