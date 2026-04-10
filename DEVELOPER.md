# 💻 Documentação Técnica - Site de Consulta de Escalas

Este documento é destinado a desenvolvedores que farão manutenção, atualizações ou melhorias no projeto. O site é uma aplicação Single Page Application (SPA) construída com HTML, CSS e JavaScript puros (Vanilla JS), sem uso de frameworks complexos, visando alta performance e facilidade de manutenção.

## 📂 Estrutura de Arquivos

* `index.html`: Estrutura principal da página, formulários de seleção e a tabela do calendário.
* `style.css`: Toda a estilização da página, incluindo variáveis CSS (Custom Properties) para o controle do Tema Claro/Escuro e design responsivo.
* `script.js`: Lógica de negócio, manipulação do DOM, controle de LocalStorage e a base de dados de folgas.

## 🔄 Como atualizar a base de dados de Folgas (Anualmente/Mensalmente)

O coração da aplicação é a constante `folgasPorTurmaEMes` localizada no início do arquivo `script.js`. Ela funciona como a "banco de dados" estático do site.

Para adicionar novos meses ou anos, você deve seguir estritamente o formato abaixo:

\`\`\`javascript
const folgasPorTurmaEMes = {
    // Formato da chave: 'YYYY-M' (Ano - Mês atual, sem zero à esquerda)
    // O Mês vai de 1 (Janeiro) a 12 (Dezembro).
    '2027-1': { 
        'A': [1, 5, 9, ...], // Array com os dias de folga da Turma A
        'B': [2, 6, 10, ...], // Array com os dias de folga da Turma B
        'C': [3, 7, 11, ...], // Array com os dias de folga da Turma C
        'D': [4, 8, 12, ...]  // Array com os dias de folga da Turma D
    },
    // ...
};
\`\`\`

**Atenção aos limites de data:**
No `script.js`, dentro do evento `DOMContentLoaded`, existem travas de segurança para impedir que o usuário navegue para meses vazios. Se você adicionar dados para 2027, precisará atualizar a validação de limite:

\`\`\`javascript
// Exemplo: Atualizar se adicionar dados de 2027
if (anoAtual < 2025 || (anoAtual === 2025 && mesAtual < 5)) {
    // ... limite inferior
} else if (anoAtual > 2027) { // <-- Atualizar o ano máximo aqui
    mesAtual = 11;
    anoAtual = 2027; // <-- Atualizar o ano máximo aqui
}
\`\`\`
*(Nota: O mesmo deve ser feito na função `updateNavigationButtons()` e nos listeners de `prevMonth` e `nextMonth`).*

## 🧠 Lógica Principal (`script.js`)

A aplicação roda baseada em manipulação de estado local e reconstrução da tabela HTML.

* **`verificarFolgas()`**: Identifica o dia atual, compara com a base de dados e exibe o banner de notificação. Também calcula o próximo dia de folga fazendo um `.filter()` nos dias maiores que hoje.
* **`renderCalendar()`**: Destrói e recria o `<tbody>` do calendário toda vez que o mês ou a turma mudam. Ele calcula o primeiro dia do mês e a quantidade de dias, preenchendo as células `<td>` e injetando as classes CSS correspondentes (`.off-day` ou `.work-day`).
* **`saveData()` e `loadSavedData()`**: A preferência de Turma e o Tema (Claro/Escuro) são salvos no cache do navegador (`localStorage` na chave `folgaTurmaData`) para que o usuário não precise selecionar a turma novamente ao recarregar a página.

## 🎨 Estilização e Temas (`style.css`)

O projeto utiliza a estratégia de **Variáveis CSS** no `:root` para gerenciar as cores.

* Para alterar a paleta do **Tema Claro**, edite as variáveis dentro do bloco `:root { ... }`.
* O **Tema Escuro** é ativado adicionando a classe `.dark-mode` na tag `<body>`. As cores correspondentes devem ser alteradas no bloco `body.dark-mode { ... }`.

O layout utiliza `flexbox` para alinhamento e é adaptado para dispositivos móveis via `@media queries` (breakpoints principais em `600px` e `400px`), ajustando tamanhos de fonte e margens para caber na tela do celular sem quebrar a tabela.
