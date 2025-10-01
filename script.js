// Folgas fixas para cada turma (junho a dezembro de 2025)
const folgasPorTurmaEMes = {
    '2025-6': { // Junho 2025
        'A': [1, 2, 9, 10, 17, 18, 25, 26],
        'B': [3, 4, 11, 15, 19, 20, 27, 28],
        'C': [5, 6, 13, 14, 21, 22, 29, 30],
        'D': [7, 8, 12, 16, 23, 24]
    },
    '2025-7': { // Julho 2025
        'A': [3, 4, 11, 12, 19, 20, 24, 28],
        'B': [5, 6, 10, 14, 21, 22, 29, 30],
        'C': [7, 8, 15, 16, 23, 27, 31],
        'D': [1, 2, 9, 13, 17, 18, 25, 26]
    },
    '2025-8': { // Agosto 2025
        'A': [4, 5, 12, 13, 20, 24, 28, 29],
        'B': [6, 7, 14, 15, 22, 23, 30, 31],
        'C': [1, 8, 9, 16, 17, 21, 25],
        'D': [2, 3, 10, 11, 18, 19, 26, 27]
    },
    '2025-9': { // Setembro 2025
        'A': [5, 6, 13, 14, 18, 22, 29, 30],
        'B': [7, 8, 15, 16, 23, 24],
        'C': [1, 2, 9, 10, 17, 21, 25, 26],
        'D': [3, 4, 11, 12, 19, 20, 27, 28]
    },
    '2025-10': { // Outubro 2025
        'A': [7, 8, 15, 19, 23, 24, 31],
        'B': [1, 2, 9, 10, 17, 18, 25, 26],
        'C': [3, 4, 11, 12, 16, 20, 27, 28],
        'D': [5, 6, 13, 14, 21, 22, 29, 30]
    },
    '2025-11': { // Novembro 2025
        'A': [1, 8, 9, 13, 17, 24, 25],
        'B': [2, 3, 10, 11, 18, 19, 26, 27],
        'C': [4, 5, 12, 16, 20, 21, 28, 29],
        'D': [6, 7, 14, 15, 22, 23, 30]
    },
    '2025-12': { // Dezembro 2025
        'A': [2, 3, 10, 14, 18, 19, 26, 27],
        'B': [4, 5, 12, 13, 20, 21, 25, 29],
        'C': [6, 7, 11, 15, 22, 23, 30, 31],
        'D': [1, 8, 9, 16, 17, 24, 28]
    }
};

// Obtém a data atual
const hoje = new Date();
let mesAtual = hoje.getMonth(); // 0-11 (janeiro-dezembro)
let anoAtual = hoje.getFullYear();

// Variável para armazenar la turma selecionada
let turmaSelecionada = '';

// Variável para controlar o modo escuro
let darkMode = false;

// Carrega dados salvos ao iniciar e renderiza o calendário
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o mês atual está dentro do período coberto (junho a dezembro de 2025)
    if (anoAtual < 2025 || (anoAtual === 2025 && mesAtual < 5)) {
        mesAtual = 5; // Junho
        anoAtual = 2025;
    } else if (anoAtual > 2025 || (anoAtual === 2025 && mesAtual > 11)) {
        mesAtual = 11; // Dezembro
        anoAtual = 2025;
    }
    
    loadSavedData();
    updateMonthYearDisplay();
    renderCalendar();
    updateNavigationButtons();
    
    // Event listener para o menu suspenso (atualiza automaticamente)
    document.getElementById('turma').addEventListener('change', function() {
        turmaSelecionada = this.value;
        saveData();
        verificarFolgas();
        renderCalendar();
    });
    
    // Event listeners para navegação entre meses
    document.getElementById('prevMonth').addEventListener('click', function() {
        if (mesAtual === 5 && anoAtual === 2025) {
            // Não permite voltar antes de junho de 2025
            return;
        }
        
        if (mesAtual === 0) {
            mesAtual = 11;
            anoAtual--;
        } else {
            mesAtual--;
        }
        updateMonthYearDisplay();
        renderCalendar();
        updateNavigationButtons();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        if (mesAtual === 11 && anoAtual === 2025) {
            // Não permite avançar além de dezembro de 2025
            return;
        }
        
        if (mesAtual === 11) {
            mesAtual = 0;
            anoAtual++;
        } else {
            mesAtual++;
        }
        updateMonthYearDisplay();
        renderCalendar();
        updateNavigationButtons();
    });
    
    // Event listener para o botão de modo escuro
    document.getElementById('themeToggle').addEventListener('click', function() {
        toggleDarkMode();
    });
});

// Função para alternar o modo escuro
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    
    // Atualiza o ícone do botão baseado no estado atual
    updateThemeToggleIcon();
    
    // Salva a preferência
    saveData();
}

// Função para atualizar o ícone do botão de tema
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = darkMode ? '☀️' : '🌙';
}

// Atualiza os botões de navegação (desabilita quando necessário)
function updateNavigationButtons() {
    document.getElementById('prevMonth').disabled = (mesAtual === 5 && anoAtual === 2025);
    document.getElementById('nextMonth').disabled = (mesAtual === 11 && anoAtual === 2025);
}

// Atualiza o display do mês/ano
function updateMonthYearDisplay() {
    const meses = [
        'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
        'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
    ];
    document.getElementById('monthYear').textContent = `${meses[mesAtual]} ${anoAtual}`;
}

// Armazenamento local
function saveData() {
    const data = {
        turma: turmaSelecionada,
        darkMode: darkMode,
        lastUpdate: new Date().toISOString()
    };
    localStorage.setItem('folgaTurmaData', JSON.stringify(data));
}

function loadSavedData() {
    const savedData = localStorage.getItem('folgaTurmaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        turmaSelecionada = data.turma;
        
        // Aplica o modo escuro se estava ativo
        if (data.darkMode) {
            darkMode = data.darkMode;
            document.body.classList.add('dark-mode');
        }
        
        // Atualiza o ícone do botão baseado no estado carregado
        updateThemeToggleIcon();
        
        // Preenche o menu suspenso com os dados salvos
        if (turmaSelecionada) {
            document.getElementById('turma').value = turmaSelecionada;
            // Dispara o evento change para atualizar automaticamente
            document.getElementById('turma').dispatchEvent(new Event('change'));
        }
    }
}

// Renderização do calendário
function renderCalendar() {
    const today = new Date();
    const firstDayOfMonth = new Date(anoAtual, mesAtual, 1);
    const lastDayOfMonth = new Date(anoAtual, mesAtual + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Calcula o dia da semana do primeiro dia do mês (0 = Domingo, 6 = Sábado)
    const startingDay = firstDayOfMonth.getDay();
    
    let calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // Cria uma linha para cada semana
        const row = document.createElement('tr');
        
        // Cria células para cada dia da semana
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            
            if (i === 0 && j < startingDay) {
                // Células vazias antes do primeiro dia do mês
                cell.textContent = '';
            } else if (date > daysInMonth) {
                // Células vazias após o último dia do mês
                cell.textContent = '';
            } else {
                // Preenche with o dia do mês
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = date;
                cell.appendChild(dayNumber);
                
                // Verifica se é dia de folga para a turma selecionada
                if (turmaSelecionada) {
                    const chaveMes = `${anoAtual}-${mesAtual + 1}`;
                    const folgasDoMes = folgasPorTurmaEMes[chaveMes] || {};
                    const folgas = folgasDoMes[turmaSelecionada] || [];
                    const isFolga = folgas.includes(date);
                    
                    if (isFolga) {
                        cell.classList.add('off-day');
                        const span = document.createElement('span');
                        span.textContent = 'Folga';
                        cell.appendChild(span);
                    } else {
                        cell.classList.add('work-day');
                        const span = document.createElement('span');
                        span.textContent = 'Trabalho';
                        cell.appendChild(span);
                    }
                }
                
                // Destaca o dia atual (se for o mês/ano atual)
                if (date === today.getDate() && 
                    mesAtual === today.getMonth() && 
                    anoAtual === today.getFullYear()) {
                    cell.classList.add('today');
                }
                
                date++;
            }
            
            row.appendChild(cell);
        }
        
        calendarBody.appendChild(row);
        
        // Para de criar linhas se já preencheu todos os dias
        if (date > daysInMonth) {
            break;
        }
    }
}

// Função para verificar se hoje é folga
function verificarFolgas() {
    if (!turmaSelecionada) {
        document.getElementById('notification').style.display = 'none';
        return;
    }
    
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtualHoje = hoje.getMonth();
    const anoAtualHoje = hoje.getFullYear();
    
    // Só verifica se estivermos no mês/ano atualmente exibido
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

window.onload = function() {
    verificarFolgas();
};