// recommendations.js - Sistema de recomendações agrícolas
import { elementos } from './config.js';



export function gerarRecomendacoesAgricolas(dadosAtuais, dadosPrevisao, cultura) {
    const temperatura = dadosAtuais.main.temp;
    const umidade = dadosAtuais.main.humidity;
    const velocidadeVento = dadosAtuais.wind.speed;
    const descricaoTempo = dadosAtuais.weather[0].description.toLowerCase();
    const previsao5Dias = dadosPrevisao.list.filter((_, indice) => indice % 8 === 0).slice(0, 5);
    
    document.getElementById('recomendacoes-manejo').innerHTML = '';
    document.getElementById('recomendacoes-irrigacao').innerHTML = '';
    document.getElementById('recomendacoes-pragas').innerHTML = '';
    document.getElementById('recomendacoes-planejamento').innerHTML = '';
    
    const recomendacoesManejo = gerarRecomendacoesManejo(temperatura, umidade, velocidadeVento, descricaoTempo, cultura);
    const recomendacoesIrrigacao = gerarRecomendacoesIrrigacao(temperatura, umidade, descricaoTempo, previsao5Dias, cultura);
    const recomendacoesPragas = gerarRecomendacoesPragas(temperatura, umidade, cultura);
    const recomendacoesPlanejamento = gerarRecomendacoesPlanejamento(previsao5Dias, cultura);
    
    renderizarRecomendacoes('recomendacoes-manejo', recomendacoesManejo);
    renderizarRecomendacoes('recomendacoes-irrigacao', recomendacoesIrrigacao);
    renderizarRecomendacoes('recomendacoes-pragas', recomendacoesPragas);
    renderizarRecomendacoes('recomendacoes-planejamento', recomendacoesPlanejamento);
    
    elementos.recomendacoesAgricolas.classList.remove('oculto');

}

function gerarRecomendacoesManejo(temperatura, umidade, velocidadeVento, descricaoTempo, cultura) {
    const recomendacoes = [];
    
    // recomendações comuns para todas as culturas
    if (temperatura < 10) {
        recomendacoes.push({
            titulo: 'Proteção contra Geadas ',
            descricao: 'Temperatura muito baixa. Considere medidas de proteção contra geadas como cobertura das plantas ou irrigação por aspersão.',
            risco: 'alto'
        })
        ;
        
    } else if (temperatura > 35) {
        recomendacoes.push({
            titulo: 'Proteção contra Calor Excessivo',
            descricao: 'Temperatura muito alta. Considere sombreamento e irrigação mais frequente para evitar estresse térmico.',
            risco: 'alto'
        });
    }
    

    if (velocidadeVento > 10) {
        recomendacoes.push({
            titulo: 'Cuidado com Ventos Fortes',
            descricao: 'Ventos fortes podem causar danos mecânicos às plantas. Evite aplicações de defensivos.',
            risco: 'medio'
        });
    }
    
    if (descricaoTempo.includes('chuva')) {
        recomendacoes.push({
            titulo: 'Período Chuvoso',
            descricao: 'Evite atividades que necessitam de solo seco. Monitore drenagem e possível encharcamento.',
            risco: 'medio'
        });
    
    }
    
    // recomendações especificas por cultura
    switch (cultura) {
        case 'soja':
            if (temperatura >= 20 && temperatura <= 30 && umidade >= 60) {
                recomendacoes.push({
                    titulo: 'Condições Ideais para Soja',
                    descricao: 'Condições climáticas favoráveis para o desenvolvimento da soja. Mantenha o manejo regular.',
                    risco: 'baixo'
                });
            }
            break;

            
        case 'milho':
            if (temperatura >= 25 && temperatura <= 30) {
                recomendacoes.push({
                    titulo: 'Temperatura Ideal para Milho',
                    descricao: 'Temperatura favorável para o crescimento do milho. Período adequado para adubação.',
                    risco: 'baixo'
                });
            }
            break;
            
        case 'cafe':
            if (temperatura >= 18 && temperatura <= 25) {
                recomendacoes.push({
                    titulo: 'Condições Favoráveis para Café',
                    descricao: 'Temperatura ideal para o café. Período adequado para tratos culturais.',
                    risco: 'baixo'
                });
            }
            break;
    }
    
    return recomendacoes;
}

function gerarRecomendacoesIrrigacao(temperatura, umidade, descricaoTempo, previsao5Dias, cultura) {
    const recomendacoes = [];
    const temChuvaPrevisao = previsao5Dias.some(dia => 
        dia.weather[0].description.toLowerCase().includes('chuva')
    );
    if (temChuvaPrevisao) {
        recomendacoes.push({
            titulo: 'Irrigação Moderada',
            descricao: 'Previsão de chuva nos próximos dias. Ajuste a irrigação conforme necessário.',
            risco: 'baixo'
        });
    } else if (umidade < 40) {
        recomendacoes.push({
            titulo: 'Necessidade de Irrigação',
            descricao: 'Umidade baixa. Aumente a frequência de irrigação para evitar estresse hídrico.',
            risco: 'medio'

        });
    }
    
    switch (cultura) {
        case 'arroz':
            recomendacoes.push({
                titulo: 'Manutenção da Lâmina d\'água',
                descricao: 'Mantenha a lâmina d\'água entre 5-10 cm, dependendo do estágio da cultura.',
                risco: 'baixo'
            });
            break;
            
        case 'cafe':
            if (temperatura > 28 && umidade < 60) {
                recomendacoes.push({
                    titulo: 'Irrigação Suplementar',
                    descricao: 'Condições quentes e secas. Aumente a irrigação para manter a umidade do solo.',
                    risco: 'medio'
                });
            }
            break;
            
        case 'hortalicas':
            recomendacoes.push({

                titulo: 'Irrigação Frequente',
                descricao: 'Hortaliças necessitam de irrigação frequente e em menor volume. Prefira irrigação pela manhã.',
                risco: 'baixo'
            });
            break;
    }
    
    return recomendacoes;
}

function gerarRecomendacoesPragas(temperatura, umidade, cultura) {
    const recomendacoes = [];

    if (umidade > 80 && temperatura > 25) {
        recomendacoes.push({
            titulo: 'Condições Favoráveis para Fungos',
            descricao: 'Alta umidade e temperatura favorecem o desenvolvimento de doenças fúngicas. Monitore a lavoura.',
            risco: 'alto'
        }
    );
    }
    
    if (temperatura > 30 && umidade < 50) {
        recomendacoes.push({
            titulo: 'Alerta para Ácaros',
            descricao: 'Condições quentes e secas favorecem a proliferação de ácaros. Monitore a lavoura.',
            risco: 'medio'
        });
    }
    
    switch (cultura) {
        case 'soja':
            recomendacoes.push({
                titulo: 'Monitoramento de Ferrugem Asiática',
                descricao: 'Período crítico para ferrugem asiática. Realize inspeções regulares, especialmente após chuvas.',
                risco: 'medio'

            });
            break;
            
        case 'milho':
            recomendacoes.push({
                titulo: 'Monitoramento de Lagarta-do-cartucho',
                descricao: 'Verifique a presença de lagarta-do-cartucho, especialmente em períodos secos.',
                risco: 'medio'
            });
            break;
            
        case 'algodao':
            recomendacoes.push({
                titulo: 'Monitoramento de Bicudo',
                descricao: 'Realize o monitoramento constante do bicudo-do-algodoeiro com armadilhas.',
                risco: 'alto'
            });
            break;
    }
    
    return recomendacoes;
}

function gerarRecomendacoesPlanejamento(previsao5Dias, cultura) {
    const recomendacoes = [];
    
    // analise da previsão
    const diasChuva = previsao5Dias.filter(dia => 
        dia.weather[0].description.toLowerCase().includes('chuva')
    ).length;
    
    if (diasChuva >= 3) {
        recomendacoes.push({
            titulo: 'Planejamento para Período Chuvoso',
            descricao: 'Previsão de vários dias de chuva. Planeje atividades que necessitam de tempo seco para os próximos dias.',
            risco: 'medio'
        });
    } else if (diasChuva === 0 && previsao5Dias.every(dia => dia.main.temp > 30)) {
        recomendacoes.push({
            titulo: 'Planejamento para Período Quente',
            descricao: 'Previsão de dias quentes sem chuva. Planeje irrigações e atividades nas horas mais frescas do dia.',
            risco: 'medio'
        });
    }
    
    switch (cultura) {
        case 'soja':
        case 'milho':
        case 'feijao':
            if (diasChuva >= 2) {
                recomendacoes.push({
                    titulo: 'Aplicações de Defensivos',
                    descricao: 'Planeje aplicações de defensivos para períodos sem chuva para maior eficácia.',
                    risco: 'baixo'
                });
            }
            break;
        case 'cafe':
        case 'frutas':
            if (previsao5Dias.some(dia => dia.main.temp < 15)) {
                recomendacoes.push({
                    titulo: 'Proteção Contra Geadas',
                    descricao: 'Previsão de temperaturas baixas. Prepare medidas de proteção contra geadas se necessário.',
                    risco: 'medio'
                });
            }

            break;


    }
    
    return recomendacoes;
}
export function renderizarRecomendacoes(elementId, recomendacoes) {
    const elemento = document.getElementById(elementId);
    
    if (recomendacoes.length === 0) {
        elemento.innerHTML = '<p>Sem recomendações específicas no momento.</p>';
        atualizarIndicadorPrioridade(elementId, null);
        return;
    }
    

    let prioridadeMaisAlta = 'baixo';
    recomendacoes.forEach(rec => {
        if (rec.risco === 'alto') {
            prioridadeMaisAlta = 'alto';
        } else if (rec.risco === 'medio' && prioridadeMaisAlta !== 'alto') {
            prioridadeMaisAlta = 'medio';
        }
    });
    
    atualizarIndicadorPrioridade(elementId, prioridadeMaisAlta);
    


    recomendacoes.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'item-recomendacao';
        
        const titulo = document.createElement('div');
        titulo.className = 'titulo-recomendacao';
        titulo.textContent = rec.titulo;
        
        if (rec.risco) {
            const risco = document.createElement('span');
            risco.className = `nivel-risco risco-${rec.risco}`;
            risco.textContent = rec.risco === 'baixo' ? 'Baixo' : rec.risco === 'medio' ? 'Médio' : 'Alto';
            titulo.appendChild(risco);
        }
        
        const descricao = document.createElement('div');
        descricao.className = 'descricao-recomendacao';
        descricao.textContent = rec.descricao;
        
        item.appendChild(titulo);
        item.appendChild(descricao);
        elemento.appendChild(item);
    });
}

function atualizarIndicadorPrioridade(elementId, prioridade) {
    const mapeamentoCards = {

        'recomendacoes-manejo': 'manejo',
        'recomendacoes-irrigacao': 'irrigacao', 
        'recomendacoes-pragas': 'pragas',
        'recomendacoes-planejamento': 'planejamento'
    };
    
    const tipoCard = mapeamentoCards[elementId];
    if (!tipoCard) return;
    
    const cards = document.querySelectorAll('.cartao-recomendacao');
    let cardCorreto = null;
    
    cards.forEach(card => {
        const conteudo = card.querySelector(`#${elementId}`);
        if (conteudo) {
            cardCorreto = card;
        }
    });
    
    if (!cardCorreto) return;
    
    const indicador = cardCorreto.querySelector('.indicador-prioridade');
    if (!indicador) return;
    
    if (prioridade === null) {
        indicador.style.display = 'none';
    } else {
        indicador.style.display = 'block';
        indicador.classList.remove('high', 'medium', 'low');
        switch (prioridade) {
            case 'alto':
                indicador.classList.add('high');
                indicador.textContent = 'ALTA';
                break;
            case 'medio':
                indicador.classList.add('medium');
                indicador.textContent = 'MÉDIA';
                break;
            case 'baixo':
                indicador.classList.add('low');
                indicador.textContent = 'BAIXA';
                break;

        }
    }
}














