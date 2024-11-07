const display = document.getElementById("result"); //Display functionality
let expression = ""; // Intialize the expression variable
let memory = 0; // for memory functions

// Adding EventListener for the buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button);
  });
});

function handleButtonClick(button) {
  // handleButtonClick reads each button’s innerText value and passes it to processInput() for further handling.
  const value = button.innerText;

  switch (value) {
    case "√":
      calculateSquareRoot();
      break;
    case "M+":
      memoryAdd();
      break;
    case "M-":
      memorySub();
      break;
    case "MR":
      memoryRecall();
      break;
    case "MC":
      memoryClear();
      break;
    default:
      processInput(value); // handling the value based on type like number, operator, etc.
      break;
  }
  display.focus(); // to maintain focus after each button interaction
}

// now differet buttons functionality
function processInput(value) {
  if (!isNaN(value) || value === ".") {
    expression += value;
    display.value = expression;
  } else if (value === "Clear") {
    clear();
  } else if (value === "=") {
    calculate();
  } else {
    addOperator(value);
  }
}

//Clear function
function clear() {
  expression = "";
  display.value = "";
  display.focus(); // ensures focus after clearing
}

// Handling operations
function addOperator(op) {
  const lastChar = expression.slice(-1);
  if (["+", "-", "*", "/"].includes(lastChar)) {
    expression = expression.slice(0, -1); //Replace the last operator if needed
  }
  expression += op; // Add operator to expression
  display.value = expression;
}

function calculate() {
  try {
    const result = eval(expression); //Evaluating the expression with BODMAS
    if (result === Infinity) {
      display.value = "Error"; //Handle division by zero error
    } else {
      expression = result.toString();
      display.value = expression;
    }
    display.focus(); //keeps the focus on the calculator after each calculation
  } catch (error) {
    display.value = "Error"; // For invalid expressions
    display.focus();
  }
}

//Input Handling
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    processInput(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    if (expression === "") {
      event.preventDefault(); //Prevents focus shift if expression is empty
    } else {
      clear();
    }
  } else if (["+", "-", "*", "/"].includes(key)) {
    addOperator(key);
  }
  display.focus(); //ensures focus stays on the display after each Keypress
});

//Square root function
function calculateSquareRoot() {
  try {
    const result = Math.sqrt(eval(expression));
    expression = result.toString();
    display.value = expression;
  } catch (error) {
    display.value = "Error";
  }
}
//Memory functions
function memoryAdd() {
  const currentValue = parseFloat(display.value);
  if (!isNaN(currentValue)) {
    memory += currentValue;
  }
}
function memorySub() {
  const currentValue = parseFloat(display.value);
  if (!isNaN(currentValue)) {
    memory -= currentValue;
  }
}
function memoryRecall() {
  display.value = memory.toString(); // Display memory value
  expression = memory.toString(); // Update expression for further calculations
}
function memoryClear() {
  memory = 0; // Reset memory
  display.value = "0";
  expression = ""; // Clear expression
}

window.onload = () => display.focus(); // to make sure that display gets the focus when the page loads.
