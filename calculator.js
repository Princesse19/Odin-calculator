let displayValue = '0';
let previousValue = null;
let selectedOperator = null;

function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = displayValue;
}

function appendToDisplay(value) {
  if (displayValue === '0') {
    displayValue = value;
  } else {
    if (
      !isNaN(displayValue[displayValue.length - 1]) ||
      !isNaN(value) ||
      value === '.'
    ) {
      // Append the entered value if it is a number or a decimal point,
      // or if the last character of displayValue is a number.
      displayValue += value;
    } else {
      // Replace the last operator with the new operator if it is not a number or a decimal point.
      displayValue = displayValue.slice(0, -1) + value;
    }
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = '0';
  previousValue = null;
  selectedOperator = null;
  updateDisplay();
}

function deleteLast() {
  if (displayValue.length === 1) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
}

function performOperation(operator) {
  if (displayValue !== '' && displayValue !== '0') {
    selectedOperator = operator;
    previousValue = displayValue;
    displayValue += operator;
  }
}

function calculateResult() {
  if (selectedOperator && previousValue && displayValue) {
    displayValue = eval(displayValue).toString();
    previousValue = null;
    selectedOperator = null;
    updateDisplay();
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  }
});

updateDisplay();