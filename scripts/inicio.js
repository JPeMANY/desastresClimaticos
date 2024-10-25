const titulo = document.querySelector('header .titulo h1');
const subtitulo = document.querySelector('header .titulo span');

const cartaoRio = document.getElementById('cartaoRio')
const cartaoIncendio = document.getElementById('cartaoIncendio');
const cartaoEnchente = document.getElementById('cartaoEnchente');
const cartaoTempestade = document.getElementById('cartaoTempestade');

const txtIncendio = cartaoIncendio.querySelector('p');
const txtEnchente = cartaoEnchente.querySelector('p');
const txtTempestade = cartaoTempestade.querySelector('p');

const btnAtualizar = document.getElementById('btnAtualizar');
const btnResetar = document.getElementById('btnResetar');

btnResetar.addEventListener('click', ()=> {
    localStorage.clear();
})

btnAtualizar.addEventListener('click', ()=> {
    localStorage.setItem('carregamentoLento', true);
    location.reload();
})

function calcularRio(altLim, altAt) {
    const altLimHTML = document.getElementById('valorAltLim');
    const altAtHTML = document.getElementById('valorAltAt');
    altLimHTML.textContent = altLim;
    altAtHTML.textContent = altAt;

    const altLimNumero = Number(altLim.replace(/[^\d,]/g, '').replace(',', '.'));
    const altAtNumero = Number(altAt.replace(/[^\d,]/g, '').replace(',', '.'));

    // Cálculos

    // retira 3 quartos do valor de altura atual e subtrai de ambos
    /* const desconto = (altAtNumero / 4) * 3;
    const altLimCalc = altLimNumero - desconto;
    console.log(altLimCalc)
    const altAtCalc = altAtNumero - desconto;
    console.log(altAtCalc)

    // Regra de 3
    const altAtPorcentagem = (altAtCalc * 100) / altLimCalc; */

    const linhaAlturaLimite = document.querySelector('.alturaLimite');
    const rioVetorHTML = document.querySelector('.conteudo .rio .rioVetor');

    if (altLimNumero > altAtNumero) {
        const altAtPorcentagem = (altAtNumero * 100) / altLimNumero;
        linhaAlturaLimite.style.height = '100%';
        rioVetorHTML.style.height = altAtPorcentagem + '%';

    } else {
        const altAtPorcentagem = (altLimNumero * 100) / altAtNumero;
        rioVetorHTML.style.height = '100%';
        linhaAlturaLimite.style.height = altAtPorcentagem + '%';
    }


    //const altAtPorcentagem = (altAtNumero * 100) / altLimNumero;

    
}

function atualizarInicio() {
    titulo.textContent = cidade;
    subtitulo.textContent = regiao;

    const jsonUrl = `dados/${regiao.replace(/\s+/g, '')}/${cidade.replace(/\s+/g, '')}.json?` + new Date().getTime();

    fetch(jsonUrl)
        .then(response => response.json()) // Converter a resposta para JSON
        .then(data => {
            
            // Armazena os dados em variáveis
            const incendio = data.incendio;
            const enchente = data.enchente;
            const tempestade = data.tempestade;

            const rio = data.rio;
            const alturaLimite = data.alturaLimite;
            const alturaAtual = data.alturaAtual;

            // Altera o texto de subtítulo dos cartões
            txtIncendio.textContent = incendio;
            txtEnchente.textContent = enchente;
            txtTempestade.textContent = tempestade;

            // Altera o estilo dos cartões
            cartaoIncendio.classList.add(incendio.replace(/\s+/g, '').toLowerCase());
            cartaoEnchente.classList.add(enchente.replace(/\s+/g, '').toLowerCase());
            cartaoTempestade.classList.add(tempestade.replace(/\s+/g, '').toLowerCase());

            // -----------

            const msnAlert = document.querySelector('.alertaTxt');

            const grauIncendio = Number(incendio.replace(/[^\d,]/g, ''));
            const grauEnchente = Number(enchente.replace(/[^\d,]/g, ''));
            const grauTempestade = Number(tempestade.replace(/[^\d,]/g, ''));

            console.log(grauIncendio, grauEnchente, grauTempestade)

            const incendioAlerta = document.querySelector('.incendioAlerta');
            const enchenteAlerta = document.querySelector('.enchenteAlerta');
            const tempestadeAlerta = document.querySelector('.tempestadeAlerta');

            if (grauIncendio === 3) {
                msnAlert.style.display = 'block';
                incendioAlerta.style.display = 'flex';
            }

            if (grauEnchente === 3) {
                msnAlert.style.display = 'block';
                enchenteAlerta.style.display = 'flex';
            }

            if (grauTempestade === 3) {
                console.log('jel')
                msnAlert.style.display = 'block';
                tempestadeAlerta.style.display = 'flex';
            }


            // Estilo cartão rio
            if (rio === "false") {
                cartaoRio.style.display = 'none';
            } else {
                cartaoRio.style.display = 'block';
                const nomeRio = document.getElementById('nomeRio');
                nomeRio.textContent = data.rio
                calcularRio(alturaLimite, alturaAtual);
            }

        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}

const avisoRioTela = document.getElementById('avisoRioTela');

const gatilhoRio = document.getElementById('gatilhoRio');
const som = new Audio('../assets/somAlerta.mp3');

let avisoRio = 0;

gatilhoRio.addEventListener('click', ()=> {
    avisoRio += 1;

    console.log(avisoRio)

    if (avisoRio === 5) {
        som.play();
        avisoRio = 0;

        avisoRioTela.style.display = 'flex';
        setTimeout(()=> {
            avisoRioTela.style.opacity = '0';
            setTimeout(()=> {
                avisoRioTela.style.display = 'none';
            },500)
        }, 5000)
    }
})


/* // NOTIFICAÇÕES --------------------

if (permission !== "granted") {
    pedirPermissao();
}

function pedirPermissao() {
    // Verificar suporte
    if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações de desktop.");
    } else {
        // Pedir permissão ao usuário
        Notification.requestPermission().then(function(permission) {
            alert('Notificações ativadas');
        });
    }
}

function enviarNotificacao(titulo, corpo) {
    if (Notification.permission === "granted") {
        new Notification(titulo, {
            body: corpo,
            icon: 'assets/logoSosClima.svg'
        });
    }
} */