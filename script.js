// Folgas fixas para cada turma (Atualizado 2026)
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
    '2026-3': { 'A': [1, 5, 9, 16, 17, 24, 25], 'B': [2, 3, 10, 11, 18, 22, 26, 27], 'C': [4, 8, 12, 13, 20, 21, 28, 29], 'D': [6, 7, 14, 15, 23, 30, 31] },
    '2026-4': { 'A': [1, 2, 9, 10, 17, 18, 25, 26], 'B': [3, 4, 11, 12, 16, 20, 27, 28], 'C': [5, 6, 13, 14, 21, 22, 29, 30], 'D': [7, 8, 15, 19, 23, 24] },
    '2026-5': { 'A': [3, 4, 11, 12, 19, 20, 27, 28], 'B': [5, 6, 13, 17, 21, 22, 29, 30], 'C': [7, 8, 15, 16, 23, 24, 31], 'D': [1, 2, 9, 10, 14, 18, 25, 26] },
    '2026-6': { 'A': [4, 5, 12, 13, 20, 21, 25, 29], 'B': [6, 7, 11, 15, 22, 23, 30], 'C': [1, 8, 9, 16, 17, 24, 28], 'D': [2, 3, 10, 14, 18, 19, 26, 27] },
    '2026-7': { 'A': [6, 7, 14, 15, 22, 26, 30, 31], 'B': [1, 8, 12, 16, 17, 24, 25], 'C': [2, 3, 10, 11, 18, 19, 27], 'D': [4, 5, 9, 13, 20, 21, 28, 29] },
    '2026-8': { 'A': [7, 8, 15, 16, 20, 24, 31], 'B': [1, 2, 9, 10, 17, 18, 25, 26], 'C': [3, 4, 11, 12, 19, 23, 27, 28], 'D': [5, 6, 13, 14, 21, 22, 29, 30] },
    // Em setembro/2026 só valem os dias anteriores a DATA_CORTE (28/09); depois vale a escala nova.
    '2026-9': { 'A': [1, 8, 9, 16, 20, 24, 25], 'B': [2, 3, 10, 11, 18, 19, 26, 27], 'C': [4, 5, 12, 13, 21, 28, 29], 'D': [6, 7, 14, 15, 22, 23, 30] }
};

// Nova escala 5x2 (a partir de 28/09/2026), separada por setor. Mesma chave 'YYYY-M'.
const folgasNovaEscala = {
    'Inbound': {
        '2026-9': { 'A': [29, 30], 'B': [28], 'C': [], 'D': [] },
        '2026-10': { 'A': [5, 11, 17, 18, 22, 23, 27, 28], 'B': [4, 10, 11, 15, 16, 20, 21, 26], 'C': [3, 4, 8, 9, 13, 14, 19, 25, 31], 'D': [1, 2, 6, 7, 12, 18, 24, 25, 29, 30] },
        '2026-11': { 'A': [2, 8, 14, 15, 19, 20, 24, 25, 30], 'B': [1, 7, 8, 12, 13, 17, 18, 23, 29], 'C': [1, 5, 6, 10, 11, 16, 22, 28, 29], 'D': [3, 4, 9, 15, 21, 22, 26, 27] },
        '2026-12': { 'A': [6, 12, 13, 17, 18, 22, 23, 28], 'B': [5, 6, 10, 11, 15, 16, 21, 27], 'C': [3, 4, 8, 9, 14, 20, 26, 27, 31], 'D': [1, 2, 7, 13, 19, 20, 24, 25, 29, 30] }
    },
    'Outbound': {
        '2026-9': { 'A': [28], 'B': [], 'C': [29, 30], 'D': [] },
        '2026-10': { 'A': [4, 9, 10, 15, 16, 20, 21, 26], 'B': [1, 2, 6, 7, 12, 18, 23, 24, 29, 30], 'C': [5, 11, 16, 17, 22, 23, 27, 28], 'D': [2, 3, 8, 9, 13, 14, 19, 25, 30, 31] },
        '2026-11': { 'A': [1, 6, 7, 12, 13, 17, 18, 23, 29], 'B': [3, 4, 9, 15, 20, 21, 26, 27], 'C': [2, 8, 13, 14, 19, 20, 24, 25, 30], 'D': [5, 6, 10, 11, 16, 22, 27, 28] },
        '2026-12': { 'A': [4, 5, 10, 11, 15, 16, 21, 27], 'B': [1, 2, 7, 13, 18, 19, 24, 25, 29, 30], 'C': [6, 11, 12, 17, 18, 22, 23, 28], 'D': [3, 4, 8, 9, 14, 20, 25, 26, 31] }
    }
};

// A partir desta data (28/09/2026) a escala depende do setor (Inbound/Outbound).
const DATA_CORTE = new Date(2026, 8, 28);

const hoje = new Date();
let mesAtual = hoje.getMonth(); 
let anoAtual = hoje.getFullYear();
let turmaSelecionada = '';
let setorSelecionado = '';
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
    
    document.querySelectorAll('#setorToggle button').forEach(function(btn) {
        btn.addEventListener('click', function() {
            setorSelecionado = this.dataset.setor;
            saveData();
            updateSetorButtons();
            verificarFolgas();
            renderCalendar();
        });
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

function updateSetorButtons() {
    document.querySelectorAll('#setorToggle button').forEach(function(btn) {
        const ativo = btn.dataset.setor === setorSelecionado;
        btn.classList.toggle('active', ativo);
        btn.setAttribute('aria-pressed', ativo);
    });
}

// Retorna 'folga', 'trabalho' ou null quando não dá para saber
// (sem turma, ou dia na nova escala sem setor escolhido).
function statusDia(ano, mes, dia) {
    if (!turmaSelecionada) return null;
    const chave = `${ano}-${mes + 1}`;
    let folgas;
    if (new Date(ano, mes, dia) >= DATA_CORTE) {
        if (!setorSelecionado) return null;
        const mesNovo = folgasNovaEscala[setorSelecionado][chave] || {};
        folgas = mesNovo[turmaSelecionada] || [];
    } else {
        const mesAntigo = folgasPorTurmaEMes[chave] || {};
        folgas = mesAntigo[turmaSelecionada] || [];
    }
    return folgas.includes(dia) ? 'folga' : 'trabalho';
}

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
    
    const notification = document.getElementById('notification');
    notification.style.display = 'block';

    const status = statusDia(anoAtual, mesAtual, diaAtual);
    if (status === null) {
        notification.className = 'notification aviso';
        notification.innerHTML = '<strong>Selecione Inbound ou Outbound</strong><br>' +
            'A escala depende do setor a partir de 28/09/2026.';
        return;
    }

    if (status === 'folga') {
        notification.className = 'notification folga';
        notification.innerHTML = `<strong>Hoje (${diaAtual}/${mesAtual + 1}/${anoAtual}) é seu dia de folga!</strong> Aproveite para descansar.`;
    } else {
        notification.className = 'notification trabalho';
        notification.innerHTML = `<strong>Hoje (${diaAtual}/${mesAtual + 1}/${anoAtual}) é dia de trabalho.</strong>`;
        
        // Mostra quando será a próxima folga
        const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
        let proximaFolga = null;
        let faltaSetor = false;
        for (let dia = diaAtual + 1; dia <= diasNoMes; dia++) {
            const s = statusDia(anoAtual, mesAtual, dia);
            if (s === null) { faltaSetor = true; break; }
            if (s === 'folga') { proximaFolga = dia; break; }
        }
        if (proximaFolga !== null) {
            notification.innerHTML += `<br>Sua próxima folga será dia ${proximaFolga}/${mesAtual + 1}/${anoAtual}.`;
        } else if (faltaSetor) {
            notification.innerHTML += '<br>Selecione Inbound ou Outbound para ver as folgas a partir de 28/09/2026.';
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
                
                const status = statusDia(anoAtual, mesAtual, date);
                if (status) {
                    const isFolga = status === 'folga';
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

    // Avisa quando o mês exibido tem dias na nova escala e o setor não foi escolhido
    const ultimoDia = new Date(anoAtual, mesAtual, daysInMonth);
    const faltaSetor = turmaSelecionada && !setorSelecionado && ultimoDia >= DATA_CORTE;
    document.getElementById('setorHint').style.display = faltaSetor ? 'block' : 'none';
}

function saveData() {
    localStorage.setItem('folgaTurmaData', JSON.stringify({ turma: turmaSelecionada, setor: setorSelecionado, darkMode: darkMode }));
}

function loadSavedData() {
    const savedData = localStorage.getItem('folgaTurmaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        turmaSelecionada = data.turma || '';
        setorSelecionado = data.setor || '';
        darkMode = data.darkMode || false;
        updateSetorButtons();
        if (darkMode) document.body.classList.add('dark-mode');
        document.getElementById('turma').value = turmaSelecionada;
        document.getElementById('themeToggle').textContent = darkMode ? '☀️' : '🌙';
    }
}

window.onload = function() {
    verificarFolgas();
};
