// Folgas fixas para cada turma (Junho 2025 a Dezembro 2026)
const folgasPorTurmaEMes = {
    '2025-6': { 'A': [1, 2, 9, 10, 17, 18, 25, 26], 'B': [3, 4, 11, 15, 19, 20, 27, 28], 'C': [5, 6, 13, 14, 21, 22, 29, 30], 'D': [7, 8, 12, 16, 23, 24] },
    '2025-7': { 'A': [3, 4, 11, 12, 19, 20, 24, 28], 'B': [5, 6, 10, 14, 21, 22, 29, 30], 'C': [7, 8, 15, 16, 23, 27, 31], 'D': [1, 2, 9, 13, 17, 18, 25, 26] },
    '2025-8': { 'A': [4, 5, 12, 13, 20, 24, 28, 29], 'B': [6, 7, 14, 15, 22, 23, 30, 31], 'C': [1, 8, 9, 16, 17, 21, 25], 'D': [2, 3, 10, 11, 18, 19, 26, 27] },
    '2025-9': { 'A': [5, 6, 13, 14, 18, 22, 29, 30], 'B': [7, 8, 15, 16, 23, 24], 'C': [1, 2, 9, 10, 17, 21, 25, 26], 'D': [3, 4, 11, 12, 19, 20, 27, 28] },
    '2025-10': { 'A': [7, 8, 15, 19, 23, 24, 31], 'B': [1, 2, 9, 10, 17, 18, 25, 26], 'C': [3, 4, 11, 12, 16, 20, 27, 28], 'D': [5, 6, 13, 14, 21, 22, 29, 30] },
    '2025-11': { 'A': [1, 8, 9, 13, 17, 24, 25], 'B': [2, 3, 10, 11, 18, 19, 26, 27], 'C': [4, 5, 12, 16, 20, 21, 28, 29], 'D': [6, 7, 14, 15, 22, 23, 30] },
    '2025-12': { 'A': [2, 3, 10, 14, 18, 19, 26, 27], 'B': [4, 5, 12, 13, 20, 21, 25, 29], 'C': [6, 7, 11, 15, 22, 23, 30, 31], 'D': [1, 8, 9, 16, 17, 24, 28] },
    
    '2026-1': { 'A': [3, 4, 8, 12, 19, 20, 27, 28], 'B': [5, 6, 13, 14, 21, 25, 29, 30], 'C': [7, 11, 15, 16, 23, 24, 31], 'D': [1, 2, 9, 10, 17, 18, 22, 26] },
    '2026-2': { 'A': [4, 8, 12, 13, 20, 21, 28], 'B': [6, 7, 14, 15, 19, 23], 'C': [1, 5, 9, 16, 17, 24, 25], 'D': [2, 3, 10, 11, 18, 22, 26, 27] }, 
    '2026-3': { 'A': [1, 5, 9, 16, 17, 24, 25], 'B': [2, 3, 10, 11, 18, 26, 27], 'C': [4, 8, 12, 13, 20, 21, 28, 29], 'D': [6, 7, 14, 15, 23, 30, 31] },
    '2026-4': { 'A': [1, 2, 9, 10, 17, 18, 25, 26], 'B': [3, 4, 11, 12, 16, 20, 27, 28], 'C': [5, 6, 13, 14, 21, 22, 29, 30], 'D': [7, 8, 15, 23, 24] },
    '2026-5': { 'A': [3, 4, 11, 12, 19, 20, 27, 28], 'B': [5, 6, 13, 17, 21, 22, 29, 30], 'C': [7, 8, 15, 16, 23, 24, 31], 'D': [1, 2, 9, 10, ,18, 25, 26] },
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
    // Mantém os limites de navegação 2025-2026
    if (anoAtual < 2025 || (anoAtual === 2025 && mesAtual < 5)) {
        mesAtual = 5; 
        anoAtual = 2025;
    } else if (anoAtual > 2026) {
        mesAtual = 11;
        anoAtual = 2026;
    }
    
    loadSavedData();
    updateMonthYearDisplay();
    renderCalendar();
    updateNavigationButtons();
    
    document.getElementById('turma').addEventListener('change', function() {
        turmaSelecionada = this.value;
        saveData();
        verificarFolgas(); // Chama a função para atualizar a frase
        renderCalendar();
    });
    
    document.getElementById('prevMonth').addEventListener('click', function() {
        if (mesAtual === 5 && anoAtual === 2025) return;
        if (mesAtual === 0) { mesAtual = 11; anoAtual--; } else { mesAtual--; }
        updateMonthYearDisplay();
        renderCalendar();
        updateNavigationButtons();
        verificarFolgas();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        if (mesAtual === 11 && anoAtual === 2026) return;
        if (mesAtual === 11) { mesAtual = 0; anoAtual++; } else { mesAtual++; }
        updateMonthYearDisplay();
        renderCalendar();
        updateNavigationButtons();
        verificarFolgas();
    });
    
    document.getElementById('themeToggle').addEventListener('click', function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        this.textContent = darkMode ? '☀️' : '🌙';
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

// RESTAURAÇÃO DA SUA FUNÇÃO ORIGINAL DE VERIFICAÇÃO
function verificarFolgas() {
    if (!turmaSelecionada) {
        document.getElementById('notification').style.display = 'none';
        return;
    }
    
    const hojeData = new Date();
    const diaAtual = hojeData.getDate();
    const mesAtualHoje = hojeData.getMonth();
    const anoAtualHoje = hojeData.getFullYear();
    
    // Verifica se estamos no mês/ano atualmente exibido
    if (mesAtualHoje !== mesAtual || anoAtualHoje !== anoAtual) {
        document.getElementById('notification').style.display = 'block';
        document.getElementById('notification').className = 'notification trabalho';
        document.getElementById('notification').innerHTML = 
            `<strong>Fora do período exibido (${mesAtual + 1}/${anoAtual})</strong><br>` +
            'Este aviso só mostra informações para o mês atualmente exibido.';
        return;
    }
    
    const chaveMes = `${anoAtual}-${mesAtual + 1}`;
    const folgasDoMes = folgasPorTurmaEMes[chaveMes] || {};
    const folgas = folgasDoMes[turmaSelecionada] || [];
    const ehFolga = folgas.includes(diaAtual);
    
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    
    if (ehFolga) {
        notification.className = 'notification folga';
        notification.innerHTML = `<strong>Hoje (${diaAtual}/${mesAtual + 1}/${anoAtual}) é seu dia de folga!</strong> Aproveite para descansar.`;
    } else {
        notification.className = 'notification trabalho';
        notification.innerHTML = `<strong>Hoje (${diaAtual}/${mesAtual + 1}/${anoAtual}) é dia de trabalho.</strong>`;
        
        // Mostra quando será a próxima folga
        const proximasFolgas = folgas.filter(dia => dia > diaAtual).sort((a, b) => a - b);
        if (proximasFolgas.length > 0) {
            notification.innerHTML += `<br>Sua próxima folga será dia ${proximasFolgas[0]}/${mesAtual + 1}/${anoAtual}.`;
        } else {
            notification.innerHTML += '<br>Este mês não há mais folgas para sua turma.';
        }
    }
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
                    const span = document.createElement('span');
                    span.textContent = isFolga ? 'Folga' : 'Trabalho';
                    cell.appendChild(span);
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

function saveData() {
    localStorage.setItem('folgaTurmaData', JSON.stringify({ turma: turmaSelecionada, darkMode: darkMode }));
}

function loadSavedData() {
    const savedData = localStorage.getItem('folgaTurmaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        turmaSelecionada = data.turma || '';
        darkMode = data.darkMode || false;
        if (darkMode) document.body.classList.add('dark-mode');
        document.getElementById('turma').value = turmaSelecionada;
        document.getElementById('themeToggle').textContent = darkMode ? '☀️' : '🌙';
    }
}

window.onload = function() {
    verificarFolgas();
};
