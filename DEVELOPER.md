# 💻 Documentação Técnica - Site Consulta de Escalas

Este documento fornece uma visão detalhada da arquitetura, lógica de negócios e estrutura de código da aplicação "Consulta de Escalas e Folgas". O projeto foi construído utilizando **HTML5, CSS3 e Vanilla JavaScript (ES6+)**, sem dependências de frameworks front-end, garantindo leveza e carregamento rápido.

## 🏗️ Arquitetura e Integrações

* **Hospedagem e CI/CD:** O deploy é realizado via **Vercel**.
* **Analytics:** A aplicação conta com duas ferramentas de monitoramento embutidas no `index.html`:
    * **Google Analytics (gtag.js):** Configurado com o ID `G-Q6ZHX2W8X1`.
    * **Vercel Web Insights:** Script carregado no final do body (`/_vercel/insights/script.js`).
* **Tipografia:** Utiliza a fonte **Quicksand** (pesos 300 a 700) via Google Fonts.

---

## 🧠 Lógica de Negócios e Estado (`script.js`)

O arquivo `script.js` concentra toda a inteligência da aplicação. A aplicação funciona com base em um "estado" global simples composto por quatro variáveis:
* `mesAtual` (0-11)
* `anoAtual` (YYYY)
* `turmaSelecionada` (String: 'A', 'B', 'C', 'D' ou vazia)
* `darkMode` (Boolean)

### 1. Base de Dados Estática (`folgasPorTurmaEMes`)
Os dados de folga estão *hardcoded* em um objeto literal. A estrutura de chave segue obrigatoriamente o padrão `YYYY-M` (ex: `2025-6` para Junho de 2025). Os meses não possuem zero à esquerda.
* **Manutenção:** Ao final de 2026, será necessário expandir este objeto para incluir os arrays de folgas de 2027.

### 2. Travas de Navegação (Boundary Checks)
A aplicação possui limites rígidos de navegação definidos no evento `DOMContentLoaded`.
Atualmente, os limites são **Junho de 2025 (`mesAtual = 5`)** até **Dezembro de 2026 (`mesAtual = 11`)**.
\`\`\`javascript
// Se o sistema carregar antes de Junho de 2025, força a exibição para Jun/2025
if (anoAtual < 2025 || (anoAtual === 2025 && mesAtual < 5)) {
    mesAtual = 5; 
    anoAtual = 2025;
} 
// Se passar de 2026, trava em Dezembro de 2026
else if (anoAtual > 2026) {
    mesAtual = 11;
    anoAtual = 2026;
}
\`\`\`
* **Atenção em Atualizações Futuras:** Ao adicionar dados de 2027, as travas acima e as validações dentro dos event listeners dos botões `#prevMonth` e `#nextMonth` **devem** ser atualizadas obrigatoriamente, caso contrário o usuário não conseguirá avançar de mês.

### 3. Função: `verificarFolgas()`
Esta função gerencia o banner de notificação. A lógica opera da seguinte forma:
1.  **Validação de Turma:** Se nenhuma turma estiver selecionada, o banner é ocultado.
2.  **Verificação de Escopo:** Compara o mês/ano que o usuário está visualizando na tela com o mês/ano real (`new Date()`). Se o usuário navegou para um mês diferente do atual, um aviso é exibido informando que ele está "Fora do período exibido".
3.  **Cálculo da Próxima Folga:** Se hoje for dia de trabalho, a função utiliza `.filter()` para pegar todos os dias do array da turma no mês atual que sejam *maiores* que `diaAtual`, aplica um `.sort()` e retorna a posição `[0]`, prevendo quando será o próximo dia de descanso.

### 4. Função: `renderCalendar()`
Responsável pela montagem dinâmica do calendário em formato de tabela (`<tbody>`).
* Calcula o `firstDay` do mês usando `new Date(ano, mes, 1).getDay()`.
* Calcula o total de dias no mês usando o "truque" do dia zero do mês seguinte: `new Date(ano, mes + 1, 0).getDate()`.
* Itera criando linhas (`<tr>`) e células (`<td>`). Compara cada `date` gerado com a chave `YYYY-M` correspondente na base de dados para injetar as classes `.work-day` ou `.off-day`.

### 5. Persistência de Dados (`localStorage`)
Para melhorar a experiência do usuário, as preferências não são perdidas no refresh.
* **Chave Utilizada:** `folgaTurmaData`.
* **Dados Armazenados:** Um objeto JSON stringificado contendo `{ turma, darkMode }`.
* A função `loadSavedData()` é chamada logo no carregamento inicial para resgatar essas variáveis e aplicar o tema/turma.

---

## 🎨 Estilização e Temas (`style.css`)

O CSS foi estruturado utilizando a abordagem de **CSS Custom Properties (Variáveis)** no escopo `:root`, o que torna a manutenção de cores e a troca de temas centralizadas em um só lugar.

### Gestão do Dark Mode
A alternância de temas não requer sobrescrita manual de dezenas de classes. Basta o JS adicionar a classe `.dark-mode` na tag `<body>`.
No CSS, há um bloco específico `body.dark-mode { ... }` que redefine o valor das variáveis declaradas no `:root`. 
* **Exemplo:** A cor da célula de trabalho (`--work-bg`) passa de `#fff5f5` (Claro) para `rgba(229, 62, 62, 0.15)` (Escuro) dinamicamente.

### Responsividade (Media Queries)
O layout é mobile-first em sua essência, mas ajusta proporções finas com os seguintes breakpoints:
* **`@media (max-width: 600px)`:** Reduz espaçamentos (`padding`), diminui o tamanho das fontes (ex: a fonte das células do calendário passa para `9px` com paddings ajustados para caber em telas menores), e reorganiza o espaçamento das bordas da tabela.
* **`@media (max-width: 400px)`:** Muda o comportamento do seletor de mês (`.month-selector`), transformando o `flex-direction` em `column` para evitar quebra horizontal dos botões em telas muito estreitas.
