// Folgas fixas para cada turma (Junho 2025 a Dezembro 2026)
const folgasPorTurmaEMes = {
    '2025-6': { 'A': [1, 2, 9, 10, 17, 18, 25, 26], 'B': [3, 4, 11, 15, 19, 20, 27, 28], 'C': [5, 6, 13, 14, 21, 22, 29, 30], 'D': [7, 8, 12, 16, 23, 24] },
    '2025-7': { 'A': [3, 4, 11, 12, 19, 20, 24, 28], 'B': [5, 6, 10, 14, 21, 22, 29, 30], 'C': [7, 8, 15, 16, 23, 27, 31], 'D': [1, 2, 9, 13, 17, 18, 25, 26] },
    '2025-8': { 'A': [4, 5, 12, 13, 20, 24, 28, 29], 'B': [6, 7, 14, 15, 22, 23, 30, 31], 'C': [1, 8, 9, 16, 17, 21, 25], 'D': [2, 3, 10, 11, 18, 19, 26, 27] },
    '2025-9': { 'A': [5, 6, 13, 14, 18, 22, 29, 30], 'B': [7, 8, 15, 16, 23, 24], 'C': [1, 2, 9, 10, 17, 21, 25, 26], 'D': [3, 4, 11, 12, 19, 20, 27, 28] },
    '2025-10': { 'A': [7, 8, 15, 19, 23, 24, 31], 'B': [1, 2, 9, 10, 17, 18, 25, 26], 'C': [3, 4, 11, 12, 16, 20, 27, 28], 'D': [5, 6, 13, 14, 21, 22, 29, 30] },
    '2025-11': { 'A': [1, 8, 9, 13, 17, 24, 25], 'B': [2, 3, 10, 11, 18, 19, 26, 27], 'C': [4, 5, 12, 16, 20, 21, 28, 29], 'D': [6, 7, 14, 15, 22, 23, 30] },
    '2025-12': { 'A': [2, 3, 10, 14, 18, 19, 26, 27], 'B': [4, 5, 12, 13, 20, 21, 25, 29], 'C': [6, 7, 11, 15, 22, 23, 30, 31], 'D': [1, 8, 9, 16, 17, 24, 28] },
    
    // Ano 2026 (Preencha os dias reais de folga abaixo)
    '2026-1': { 'A': [3, 4, 8, 12, 19, 20,27, 28], 'B': [5, 6, 13, 14, 21, 25, 29, 30], 'C': [7, 11, 15, 16, 23, 24, 31], 'D': [1, 2, 9, 10, 17, 18, 22, 26] },
    '2026-2': { 'A': [4, 8, 12, 13, 20, 21, 28], 'B': [6, 7, 14, 15, 19, 23], 'C': [1, 5, 9, 16, 17, 24, 25], 'D': [2, 3, 10, 11, 18, 22, 26, 27] }, 
    '2026-3': { 'A': [1, 5, 9, 16, 17, 24, 25], 'B': [2, 3, 10, 11, 18, 26, 27], 'C': [4, 8, 12, 13, 20, 21, 28, 29], 'D': [6, 7, 14, 15, 23, 30, 31] },
    '2026-4': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-5': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-6': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-7': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-8': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-9': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-10': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-11': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] },
    '2026-12': { 'A': [1, 2], 'B': [3, 4], 'C': [5, 6], 'D': [7, 8] }
};

const hoje = new Date();
let mesAtual = hoje.getMonth();
let anoAtual = hoje.getFullYear();
let turmaSelecionada = '';
let darkMode = false;

document.addEventListener('DOMContentLoaded', function() {
    // Ajusta limites: Mínimo Junho/2025 - Máximo Dezembro/2026
    const dataMinima = new Date(2025, 5); 
    const dataMaxima = new Date(2026, 11);
    const dataAtualComp = new Date(anoAtual, mesAtual);

    if (dataAtualComp < dataMinima) {
        mesAtual = 5; anoAtual = 2025;
    } else if (dataAtualComp > dataMaxima) {
        mesAtual = 11; anoAtual = 2026;
    }
    
    loadSavedData();
    updateMonthYearDisplay();
    renderCalendar();
    updateNavigationButtons();
    
    document.getElementById('turma').addEventListener('change', function() {
        turmaSelecionada = this.value;
        saveData();
        verificarFolgas();
        renderCalendar();
    });
    
    document.getElementById('prevMonth').addEventListener('click', function() {
        if (mesAtual === 5 && anoAtual === 2025) return;
        if (mesAtual === 0) { mesAtual = 11; anoAtual--; } 
        else { mesAtual--; }
        updateMonthYearDisplay();
        renderCalendar();
        updateNavigationButtons();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        if (mesAtual === 11 && anoAtual === 2026) return;
        if (mesAtual === 11) { mesAtual = 0; anoAtual++; } 
        else { mesAtual++; }
        updateMonthYearDisplay();
        renderCalendar();
        updateNavigationButtons();
    });
    
    document.getElementById('themeToggle').addEventListener('click', function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        document.getElementById('themeToggle').textContent = darkMode ? '☀️' : '🌙';
        saveData();
    });
});

function updateNavigationButtons() {
    document.getElementById('prevMonth').disabled = (mesAtual === 5 && anoAtual === 2025);
    document.getElementById('nextMonth').disabled = (mesAtual === 11 && anoAtual === 2026);
}

function updateMonthYearDisplay() {
    const meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    document.getElementById('monthYear').textContent = `${meses[mesAtual]} ${anoAtual}`;
}

function renderCalendar() {
    const firstDay = new Date(anoAtual, mesAtual, 1).getDay();
    const daysInMonth = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay || date > daysInMonth) {
                cell.textContent = '';
            } else {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day-number';
                dayDiv.textContent = date;
                cell.appendChild(dayDiv);
                
                if (turmaSelecionada) {
                    const chave = `${anoAtual}-${mesAtual + 1}`;
                    const folgas = (folgasPorTurmaEMes[chave] && folgasPorTurmaEMes[chave][turmaSelecionada]) || [];
                    const isFolga = folgas.includes(date);
                    cell.classList.add(isFolga ? 'off-day' : 'work-day');
                    const status = document.createElement('span');
                    status.textContent = isFolga ? 'Folga' : 'Trabalho';
                    cell.appendChild(status);
                }
                
                if (date === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear()) {
                    cell.classList.add('today');
                }
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
        if (date > daysInMonth) break;
    }
}

function verificarFolgas() {
    const notification = document.getElementById('notification');
    if (!turmaSelecionada) { notification.style.display = 'none'; return; }
    
    notification.style.display = 'block';
    const chave = `${anoAtual}-${mesAtual + 1}`;
    const folgas = (folgasPorTurmaEMes[chave] && folgasPorTurmaEMes[chave][turmaSelecionada]) || [];
    
    if (hoje.getMonth() !== mesAtual || hoje.getFullYear() !== anoAtual) {
        notification.className = 'notification trabalho';
        notification.innerHTML = `Exibindo agenda de ${mesAtual + 1}/${anoAtual}`;
        return;
    }

    const ehFolga = folgas.includes(hoje.getDate());
    notification.className = ehFolga ? 'notification folga' : 'notification trabalho';
    notification.innerHTML = ehFolga ? `<strong>Hoje é folga!</strong>` : `<strong>Hoje é dia de trabalho.</strong>`;
}

function saveData() {
    localStorage.setItem('folgaTurmaData', JSON.stringify({ turma: turmaSelecionada, darkMode: darkMode }));
}

function loadSavedData() {
    const data = JSON.parse(localStorage.getItem('folgaTurmaData'));
    if (data) {
        turmaSelecionada = data.turma;
        darkMode = data.darkMode;
        if (darkMode) document.body.classList.add('dark-mode');
        document.getElementById('turma').value = turmaSelecionada || '';
    }
}

window.onload = verificarFolgas;
