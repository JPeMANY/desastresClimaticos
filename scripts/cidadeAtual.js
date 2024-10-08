const titulo = document.querySelector('header .titulo h1');
const subtitulo = document.querySelector('header .titulo span');

const cartaoRio = document.getElementById('cartaoRio')
const cartaoIncendio = document.getElementById('cartaoIncendio');
const cartaoEnchente = document.getElementById('cartaoEnchente');
const cartaoTempestade = document.getElementById('cartaoTempestade');

const txtIncendio = cartaoIncendio.querySelector('p');
const txtEnchente = cartaoEnchente.querySelector('p');
const txtTempestade = cartaoTempestade.querySelector('p');

function atualizarInicio() {
    titulo.textContent = cidade;
    subtitulo.textContent = regiao;

    const jsonUrl = `dados/${regiao.replace(/\s+/g, '')}/${cidade.replace(/\s+/g, '')}.json?` + new Date().getTime();

    fetch(jsonUrl)
        .then(response => response.json()) // Converter a resposta para JSON
        .then(data => {
            
            // Armazena os dados em variáveis
            const rio = data.rio;
            const incendio = data.incendio;
            const enchente = data.enchente;
            const tempestade = data.tempestade;

            // Altera o texto de subtítulo dos cartões
            txtIncendio.textContent = incendio;
            txtEnchente.textContent = enchente;
            txtTempestade.textContent = tempestade;

            // Altera o estilo dos cartões
            cartaoIncendio.classList.add(incendio.replace(/\s+/g, '').toLowerCase());
            cartaoEnchente.classList.add(enchente.replace(/\s+/g, '').toLowerCase());
            cartaoTempestade.classList.add(tempestade.replace(/\s+/g, '').toLowerCase());

            // Estilo cartão rio
            if (rio === "false") {
                cartaoRio.style.display = 'none';
            }

        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

}





