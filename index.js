// All Variables
let input = '';
let solution = '';
let clearCount = 0;
let resetNext = false;
let percentageApplied = false;

let lastinput = '';
let lastsolution = '';

const result = document.getElementById('result');
const display = document.getElementById('displayInput');
const history = document.getElementById('history');

// Input Display and Result
function updateDisplay() {
    display.innerHTML = input || 0;
    result.innerHTML = solution !== '' ? solution : '';
}

// All History List
function updateHistory() {
    if(lastinput !== '' && lastsolution !== '') {
        history.innerHTML += `<div>${lastinput} = ${lastsolution}`;

        history.scrollTop = history.scrollHeight
    
        lastinput = '';
        lastsolution = '';
    }
}

// Number Keys
function press(val) {
    if (resetNext) {
        updateHistory();
        input = '';
        solution = '';
        display.classList.remove('fade-size');
        resetNext = false;
    }

    if (input === '0') {
        if (val === '0') {
            return;
        } else if ("123456789".includes(val)) {
            input = val;
        } else {
            input += val;
        }
    } else if (input.slice(-1) === ')') {
        input += '*' + val;
    } else {
        input += val;
    }

    percentageApplied = false;
    clearCount = 0;
    updateDisplay();
}

// All Operators
function pressOperator(op) {
    if (resetNext) {
        updateHistory();
        input = solution;
        solution = '';
        display.classList.remove('fade-size');
        resetNext = false;
        clearCount = 0;
    } else if ("+-*/".includes(input.slice(-1))) {
        input = input.slice (0,-1);
    }    

    input += op;
    percentageApplied = false;
    clearCount = 0;
    updateDisplay();
}

// Find Last Number
function getLastNumber(str) {
    return str.trim().split(/[\+\-\*\/]/).pop();
}

// % Function
function percentage() {
    if (percentageApplied) return;

    if (resetNext) {
        input = solution.toString();
        solution = '';
        resetNext = false;
        display.classList.remove('fade-size');
    }

    const operators = ['+', '-', '*', '/'];
    let lastOperatorIndex = -1;

    for (let i = input.length - 1; i >= 0; i--) {
        if (operators.includes(input[i])) {
            lastOperatorIndex = i;
            break;
        }
    }

    if (lastOperatorIndex !== -1) {
        const leftPart = input.slice(0, lastOperatorIndex);
        const operator = input[lastOperatorIndex];
        const rightPart = input.slice(lastOperatorIndex + 1);

        const right = parseFloat(rightPart);

        if (!isNaN(right)) {
            let newValue;

            if (operator === '+' || operator === '-') {
                const left = eval(leftPart);
                if (!isNaN(left)) {
                    newValue = (left * right) / 100;
                }
            } else if (operator === '*' || operator === '/') {
                newValue = right / 100;
            }

            if (newValue !== undefined) {
                input = leftPart + operator + newValue;
                percentageApplied = true;
                updateDisplay();
            }
        }
    } else {
        const num = parseFloat(input);
        if (!isNaN(num)) {
            input = (num / 100).toString();
            percentageApplied = true;
            updateDisplay();
        }
    }
}

// decimal function
function decimal(dec) {
    if (resetNext) {
        updateHistory();
        input = solution.toString();
        resetNext = false;
        solution = '';
        display.classList.remove('fade-size');
    }

    const lastNum = getLastNumber(input);

    if (input === '') {
        input = '0.';
    } else if (!lastNum.includes('.')) {
        input += dec;
    }

    updateDisplay();
}

// clear entry and clear all
function clearEA() {
    if (clearCount===0) {
        input = '';
        solution = '';
        display.classList.remove('fade-size');
        updateDisplay();
        clearCount = 1;

        lastinput = '';
        lastsolution = '';

    } else {
        history.innerHTML = '';
        clearCount = 0;
    }
}

// backspace function
function backspace() {
    if (!resetNext) {
        input = input.slice(0,-1);
        percentageApplied = false;
        updateDisplay();
        clearCount = 0;
    }
}

// change '+' and '-'
function toggleSign() {
    if (resetNext) {
        updateHistory();
        input = solution.toString();
        solution = '';
        resetNext = false;
        display.classList.remove('fade-size');
    }

    const lastNum = getLastNumber(input);
    if (!lastNum || lastNum === '0') return;

    const i = input.lastIndexOf(lastNum);

    if (/^\(-\d+(\.\d+)?\)$/.test(lastNum)) {
        input = input.slice(0, i) + lastNum.slice(2, -1);
    } else if (/^\d+(\.\d+)?$/.test(lastNum)) {
        input = input.slice(0, i) + `(-${lastNum})`;
    }

    updateDisplay();
}

// calculate function
function equal() {
    if (!input) {
        solution = '';
        updateDisplay();
        return;
    }

    if ("+-/*".includes(input.slice(-1))) {
        lastinput = input;
        solution = input.slice(0,-1);
        lastsolution = solution;
        display.classList.add('fade-size');

        updateDisplay();
        clearCount = 0;
        resetNext = true;
        percentageApplied = false;
        return;
    }

    try {
        lastinput = input;
        solution = eval(input);
        lastsolution = solution;
        display.classList.add('fade-size');

        updateDisplay();
        clearCount = 0;
        resetNext = true;
        percentageApplied = false;
    } catch {
        solution = '';
        resetNext = true;
    }
}

// mode change function
function toggleMode() {

    const body = document.body.classList;

    body.toggle('dark-mode');

    const modeBtn = document.querySelector('.toggle-mode');

    if (body.contains('dark-mode')) {
        modeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        modeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    
}