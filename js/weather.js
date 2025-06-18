// weather.js - Gerenciamento de dados climáticos
import { CHAVE_API, elementos, URLS_API, CONFIG, mostrarErro } from './config.js';

export function obterDirecaoVento(graus) {
    const direcoes = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
    
    const indice = Math.round(graus / 45) % 8;
    return direcoes[indice];
}

export async function buscarDadosClimaticos(cidade, estado) {
    try {
        const respostaAtual = await fetch(
            `${URLS_API.openWeatherCurrent}?q=${cidade},${CONFIG.pais}&appid=${CHAVE_API}&units=${CONFIG.unidades}&lang=${CONFIG.idioma}`
        );
        const dadosAtuais = await respostaAtual.json();

        const respostaPrevisao = await fetch(
            `${URLS_API.openWeatherForecast}?q=${cidade},${CONFIG.pais}&appid=${CHAVE_API}&units=${CONFIG.unidades}&lang=${CONFIG.idioma}`
        );
        const dadosPrevisao = await respostaPrevisao.json();

        return { dadosAtuais, dadosPrevisao };
    } catch (erro) {
        console.error('Erro ao buscar dados meteorológicos:', erro);
        mostrarErro('Não foi possível carregar as informações meteorológicas. Por favor, tente novamente.');
        throw erro;



    }

}

export function atualizarDadosClimaticos(dadosAtuais, dadosPrevisao, estado) {
    document.getElementById('local-atual').textContent = `${dadosAtuais.name}, ${estado}`;
    document.getElementById('temperatura-atual').textContent = `${dadosAtuais.main.temp.toFixed(1)}°C`;
    document.getElementById('descricao-clima').textContent = dadosAtuais.weather[0].description;
    document.getElementById('temp-max').textContent = `${dadosAtuais.main.temp_max.toFixed(1)}°C`;
    document.getElementById('temp-min').textContent = `${dadosAtuais.main.temp_min.toFixed(1)}°C`;
    document.getElementById('umidade').textContent = `${dadosAtuais.main.humidity}%`;
    document.getElementById('vento').textContent = `${dadosAtuais.wind.speed} m/s`;
    
    const iconCode = dadosAtuais.weather[0].icon;
    document.getElementById('icone-clima').src = `${URLS_API.openWeatherIcon}/${iconCode}@2x.png`;
    
    // detalhes de temperatura
    document.getElementById('detalhes-temperatura').innerHTML = `
        <p><span>Atual:</span> <span>${dadosAtuais.main.temp.toFixed(1)}°C</span></p>
        <p><span>Sensação:</span> <span>${dadosAtuais.main.feels_like.toFixed(1)}°C</span></p>
        <p><span>Mínima:</span> <span>${dadosAtuais.main.temp_min.toFixed(1)}°C</span></p>
        <p><span>Máxima:</span> <span>${dadosAtuais.main.temp_max.toFixed(1)}°C</span></p>
    `;
    
    const pontoOrvalho = (dadosAtuais.main.temp - ((100 - dadosAtuais.main.humidity) / 5)).toFixed(1);
    document.getElementById('detalhes-umidade').innerHTML = `
        <p><span>Umidade:</span> <span>${dadosAtuais.main.humidity}%</span></p>
        <p><span>Pressão:</span> <span>${dadosAtuais.main.pressure} hPa</span></p>

        <p><span>Ponto de Orvalho:</span> <span>${pontoOrvalho}°C</span></p>
    `
    ;
    
    document.getElementById('detalhes-vento').innerHTML = `
        <p><span>Velocidade:</span> <span>${dadosAtuais.wind.speed} m/s</span></p>
        <p><span>Direção:</span> <span>${obterDirecaoVento(dadosAtuais.wind.deg)} (${dadosAtuais.wind.deg}°)</span></p>
        <p><span>Rajadas:</span> <span>${dadosAtuais.wind.gust ? dadosAtuais.wind.gust + ' m/s' : 'Sem dados'}</span></p>
    `;
    const nascerSol = new Date(dadosAtuais.sys.sunrise * 1000);
    const porSol = new Date(dadosAtuais.sys.sunset * 1000);
    const duracaoDia = ((porSol - nascerSol) / 3600000).toFixed(1);
    
    document.getElementById('detalhes-sol').innerHTML = `

        <p><span>Nascer:</span> <span>${nascerSol.toLocaleTimeString('pt-BR')}</span></p>
        <p><span>Pôr:</span> <span>${porSol.toLocaleTimeString('pt-BR')}</span></p>
        <p><span>Duração do Dia:</span> <span>${duracaoDia} horas</span></p>
    `;
    
    atualizarPrevisaoDias(dadosPrevisao);
    
    // mostra painel do clima
    elementos.painelClima.classList.remove('oculto');
}

function atualizarPrevisaoDias(dadosPrevisao) {
    const previsaoDias = document.getElementById('previsao-dias');
    previsaoDias.innerHTML = '';
    
    dadosPrevisao.list
        .filter((_, indice) => indice % 8 === 0)
        .slice(0, 5) 
        .forEach(previsao => {


            const data = new Date(previsao.dt * 1000);
            const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
            const dia = data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' });
            
            const cartaoPrevisao = document.createElement('div');
            cartaoPrevisao.className = 'cartao-previsao';
            cartaoPrevisao.innerHTML = `
                <div class="data-previsao">${diaSemana}<br>${dia}</div>
                <div class="icone-previsao">
                    <img src="${URLS_API.openWeatherIcon}/${previsao.weather[0].icon}@2x.png" alt="${previsao.weather[0].description}">
                </div>
                <div class="temperatura-previsao">${previsao.main.temp.toFixed(1)}°C</div>
                <div class="descricao-previsao">${previsao.weather[0].description}</div>
            `;
            
            previsaoDias.appendChild(cartaoPrevisao);
        });
}

