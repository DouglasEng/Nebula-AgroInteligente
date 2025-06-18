// config.js - Configurações e constantes do sistema NEBULA
export const CHAVE_API = '1f327f0f36a0e6967367d316b74c5432';

export const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", 
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const elementos = {
    
    selecaoEstado: document.getElementById('selecao-estado'),
    selecaoCidade: document.getElementById('selecao-cidade'),
    selecaoCultura: document.getElementById('selecao-cultura'),
    painelClima: document.getElementById('painel-clima'),
    recomendacoesAgricolas: document.getElementById('recomendacoes-agricolas'),
    dataAtual: document.getElementById('data-atual')
};

// urls das APIs
export const URLS_API = {
    ibge: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    openWeatherCurrent: 'https://api.openweathermap.org/data/2.5/weather',
    openWeatherForecast: 'https://api.openweathermap.org/data/2.5/forecast',
    openWeatherIcon: 'https://openweathermap.org/img/wn'
};

// configurações gerais
export const CONFIG = {
    idioma: 'pt_br',
    unidades: 'metric',
    pais: 'BR'

};

export function mostrarErro(mensagem) {
    alert(mensagem);
}

