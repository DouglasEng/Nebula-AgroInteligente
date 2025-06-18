# 🌌 NEBULA - Sistema Avançado de Análise Climática Agrícola
a
**Nébula** é uma aplicação web futurista que fornece **informações climáticas em tempo real** e gera **recomendações agrícolas inteligentes** com base no clima da cidade e na cultura selecionada.
\
Desenvolvido com foco em tecnologia, usabilidade e impacto no campo, o projeto combina dados meteorológicos com práticas do agronegócio para apoiar a tomada de decisão de produtores rurais.

---

## 🔗 Acesse o Projeto

Você pode acessar a versão online do Nébula pelo **GitHub Pages**:

 ### 👉 [NEBULA - Sistema Avançado de Análise Climática Agrícola](https://douglaseng.github.io/Nebula-AgroInteligente/)

---

## 🔧 Tecnologias Utilizadas

- **HTML5** & **CSS3** – Estrutura e estilo responsivo com visual moderno
- **JavaScript (modularizado)** – Lógica dividida em arquivos para melhor organização
- **Font Awesome** – Ícones estilizados e semânticos
- **[OpenWeatherMap API](https://openweathermap.org/api)** – Informações climáticas atualizadas
- **[IBGE API](https://servicodados.ibge.gov.br/api/docs/)** – Lista de cidades por estado no Brasil

---

## 🗂️ Estrutura de Pastas
```bash
/nebula 
├── index.html
├── style.css
├── /js
│ ├── config.js # Configurações gerais e chaves de API
│ ├── location.js # Lógica de estados e cidades via IBGE
│ ├── weather.js # Requisição e exibição de dados climáticos
│ ├── recommendations.js # Regras e lógica para recomendações agro
│ └── main.js # Inicialização e manipulação do DOM
```
---

## 🚀 Como Usar

1. Acesse o projeto [via GitHub Pages](https://douglaseng.github.io/Nebula-AgroInteligente/).
2. **Selecione o estado** desejado.
3. O campo de **cidades será ativado** com as opções do estado escolhido.
4. Após selecionar a cidade, as **informações climáticas** serão exibidas automaticamente.
5. Escolha uma **cultura agrícola** no campo "Cultura".
6. A aplicação exibirá **recomendações agrícolas personalizadas** com base nas condições climáticas atuais.

---

## 💡 Funcionalidades

- Previsão climática completa por cidade (temperatura, umidade, vento etc.)
- Lista dinâmica de estados e cidades do Brasil
- Sistema de recomendações agrícolas com base na cultura selecionada
- Design responsivo com estilo **futurista**
- Ícones intuitivos usando Font Awesome

---

## 🧪 Exemplos de Uso

- 🌽 Se você selecionar a cultura *Milho*, o sistema pode recomendar adiar o plantio em caso de chuva excessiva.
- ☀️ Se a cidade estiver com baixa umidade, pode haver recomendações de irrigação reforçada.

---

## 📎 Requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Conexão com a internet (para uso das APIs)

---

## 👨‍💻 Autor

**Douglas Rodrigues**  
Estudante de Desenvolvimento de Sistemas e Ciência de Dados  
[LinkedIn](https://www.linkedin.com/](https://www.linkedin.com/in/douglas-rodrigues-44364b316/)) | [GitHub](https://github.com/douglaseng)

---

## 📖 Licença

Este projeto é de código aberto e livre para estudos e adaptações.  
Licença: **MIT**

---
