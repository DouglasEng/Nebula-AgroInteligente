// main.js - Orquestrador principal do sistema NEBULA
import { elementos } from './config.js';
import { inicializarEstados, configurarEventosLocalizacao, obterLocalizacaoAtual } from './location.js';
import { buscarDadosClimaticos, atualizarDadosClimaticos } from './weather.js';
import { gerarRecomendacoesAgricolas } from './recommendations.js';

// inicializa sistema
document.addEventListener('DOMContentLoaded', () => {
    inicializarSistema();
});
function inicializarSistema() {
    // data atual
    const dataAtual = new Date();
    elementos.dataAtual.textContent = dataAtual.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // inicializa os modulos
    inicializarEstados();
    configurarEventosLocalizacao(onCidadeChange);


}

// callback para mudança de cidade
async function onCidadeChange() {
    const { cidade, estado, cultura } = obterLocalizacaoAtual();

    if (cidade && estado) {
        try {
            const { dadosAtuais, dadosPrevisao } = await buscarDadosClimaticos(cidade, estado);
            
            atualizarDadosClimaticos(dadosAtuais, dadosPrevisao, estado);
            // gera recomendações se uma cultura for selecionada
            if (cultura) {
                gerarRecomendacoesAgricolas(dadosAtuais, dadosPrevisao, cultura);
            } else {
                elementos.recomendacoesAgricolas.classList.add('oculto');
            }
        } catch (erro) {
            console.error('Erro no processamento dos dados:', erro)
            ;
        }
    }
    
}

