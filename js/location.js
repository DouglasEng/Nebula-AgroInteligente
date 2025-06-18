// location.js - Gerenciamento de localização (estados e cidades)
import { estados, elementos, URLS_API, mostrarErro } from './config.js';

// Inicializar seleção de estados
export function inicializarEstados() {
    estados.forEach(estado => {
        const opcao = document.createElement('option');
        opcao.value = estado;
        opcao.textContent = estado;
        elementos.selecaoEstado.appendChild(opcao);
        
    });
}

export async function carregarCidades(estado) {
    elementos.selecaoCidade.innerHTML = '<option value="">Selecione uma Cidade</option>';
    elementos.selecaoCidade.disabled = true;
    // se o estado mudar ocultar seções
    elementos.painelClima.classList.add('oculto');
    elementos.recomendacoesAgricolas.classList.add('oculto');

    if (estado) {
        try {
            const resposta = await fetch(`${URLS_API.ibge}/${estado}/municipios`);
            const cidades = await resposta.json();
            
            cidades.sort((a, b) => a.nome.localeCompare(b.nome));
            
            cidades.forEach(cidade => {
                const opcao = document.createElement('option');
                opcao.value = cidade.nome;
                opcao.textContent = cidade.nome;
                elementos.selecaoCidade.appendChild(opcao);
            });
            elementos.selecaoCidade.disabled = false;
        } catch (erro) {
            console.error('Erro ao carregar cidades:', erro);
            mostrarErro('Não foi possível carregar as cidades. Por favor, tente novamente.');
        }
    }

}

export function obterLocalizacaoAtual() {
    return {
        estado: elementos.selecaoEstado.value,
        cidade: elementos.selecaoCidade.value,
        cultura: elementos.selecaoCultura.value
    };
}

export function configurarEventosLocalizacao(onCidadeChange) {
    elementos.selecaoEstado.addEventListener('change', async (evento) => {
        const estado = evento.target.value;
        await carregarCidades(estado);
    });

    elementos.selecaoCidade.addEventListener('change', onCidadeChange);
    
    elementos.selecaoCultura.addEventListener('change', () => {
        const { cidade, estado } = obterLocalizacaoAtual();
        
        if (cidade && estado && !elementos.painelClima.classList.contains('oculto')) {
            const event = new Event('change');
            elementos.selecaoCidade.dispatchEvent(event);
        }
    });
}

