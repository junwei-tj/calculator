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
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR: INVALID OPERATOR";
    }
}

function displayInputtedNumber(number) {
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

function updateOperation(operator) {
    const display = document.querySelector(".display-text");
    let number = display.textContent;
    if (operation.a === undefined) {
        operation.a = number;
        operation.operator = operator;
    } else if (operation.b === undefined) {
        operation.b = number;
        let result = operate(operation.a, operation.b, operation.operator);
        displayResult(result);
        operation.a = operator === "=" ? undefined : result;
        operation.b = undefined;
        operation.operator = operator;
        console.log(operation);
    }    
}

function updateLastButtonClicked(id) { // for resetting display (if needed)
    lastButtonClicked = id;
}

// add eventlistener to number buttons
const numberButtons = document.querySelectorAll("#one, #two, #three, #four, #five, " +
                                                "#six, #seven, #eight, #nine, #zero");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        displayInputtedNumber(button.textContent);
        updateLastButtonClicked(button.id);
    });
});

const operatorButtons = document.querySelectorAll("#divide, #multiply, #subtract, #add");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateOperation(button.textContent);
        updateLastButtonClicked(button.id);
    })
})

let operation = {
    a: undefined,
    b: undefined,
    operator: undefined,
}
let lastButtonClicked = "";
const numberIDs = ["one", "two", "three", "four", "five", "six", "seven",
                    "eight", "nine", "zero"];
const operatorIDs = ["divide", "multiply", "subtract", "add"];