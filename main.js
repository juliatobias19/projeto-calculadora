let displayValue = '0';
let history = [];

// Função usada para atualizar o visor
function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

// Função usada para adicionar os digitos no visor
function appendToDisplay(value) {
    if (displayValue === '0') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

// Função usada para limpar o conteúdo do visor 
function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

// Função usada para salvar o histórico
function setOperation(op) {
    history.push(displayValue);
    history.push(op);
    updateHistoryTable();
    clearDisplay();
}

// Função usada para fazer o cálculo 
function calculate() {
    if (history.length < 2) {
        return;
    }

    history.push(displayValue);
    const expression = history.join(' ');
    const result = eval(expression);

    history.push('=');
    history.push(result);
    updateHistoryTable();

    displayValue = result.toString();
    history = [];
    updateDisplay();
}

// Função usada para mostrar a data e hora do histórico 
function updateHistoryTable() {
    const table = document.getElementById('history-table');
    const row = table.insertRow(-1);
    const timestampCell = row.insertCell(0);
    const expressionCell = row.insertCell(1);

    const expression = history.slice(0, -2).join(' '); // Exclui os dois últimos elementos (o '=' e o resultado)
    expressionCell.innerText = expression;

    const timestamp = new Date().toLocaleString(); // Obtém a data e hora atual
    timestampCell.innerText = timestamp;

    row.addEventListener('click', function() {
        displayValue = expression;
        updateDisplay();
    });
}


