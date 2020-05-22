function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "ERROR: DIVISION BY ZERO";
    }
    return a / b;
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "X":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR: INVALID OPERATOR";
    }
}

function numberButtonClicked(number) {
    const display = document.querySelector(".display-text");
    if (operatorIDs.includes(lastButtonClicked)) {
        display.textContent = "";
    }
    display.textContent += number;
}

function displayResult(result) {
    const display = document.querySelector(".display-text");
    display.textContent = result;
}

function getInputtedNumber(operand) {
    const display = document.querySelector(".display-text");
    let number = display.textContent;
    if (operand === "a") {
        operation.a = number;
    } else if (operand === "b") {
        operation.b = number;
    }
}

// evaluates and displays all intermediary results (if there is)
function operatorButtonClicked(operator) {
    const display = document.querySelector(".display-text");
    console.log(operation);
    if (operation.a === undefined) {
        getInputtedNumber("a");
        operation.operator = operator;
    } else if (operation.b === undefined) {
        getInputtedNumber("b");
        let result = operate(operation.a, operation.b, operation.operator);
        displayResult(result);
        operation.operator = operator;

        // if operator other than equals pressed, store result in a for further
        // evaluations
        operation.a = operator === "=" ? undefined : result;
        operation.b = undefined;
        console.log("a after: " + operation.a);
        console.log("b after: " + operation.b);
    }     
}

function updateLastButtonClicked(id) { // for resetting display (if needed)
    lastButtonClicked = id;
}

function clear() {
    const display = document.querySelector(".display-text");
    display.textContent = "";
    operation = {
        a: undefined,
        b: undefined,
        operator: undefined,
    }
}

// update screen when number is pressed
const numberButtons = document.querySelectorAll("#one, #two, #three, #four, #five, " +
                                                "#six, #seven, #eight, #nine, #zero");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {        
        numberButtonClicked(button.textContent);     
        updateLastButtonClicked(button.id);   
    });
});

// evaluate operation
const operatorButtons = document.querySelectorAll("#divide, #multiply, #subtract, " +
                                                    "#add, #equals");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateLastButtonClicked(button.id);
        operatorButtonClicked(button.textContent);        
    })
})

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);

// global variables
let operation = {
    a: undefined,
    b: undefined,
    operator: undefined,
}
let lastButtonClicked = "";
const numberIDs = ["one", "two", "three", "four", "five", "six", "seven",
                    "eight", "nine", "zero"];
const operatorIDs = ["divide", "multiply", "subtract", "add", "equals"];