const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Adiciona um digito na tela da calculadora
  addDigit(digit) {
    console.log(digit);
    // Confirma se o nummero não é um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processa as operações da calculadora
  processOperation(operation) {
    // Verficiar se o valor está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Muda o operador
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Pega valores atuais ou antigos
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Mudar os valores na tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Checa se o valor é zero, se for adiciona um valor
      if (previous === 0) {
        operationValue = current;
      }
      // Adiciona um valor válido na tela
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Escolher Operador
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Deletar um Dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpar a Operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpar 
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processar uma Operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
