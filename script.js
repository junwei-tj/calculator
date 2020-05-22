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

/* function updateOperation(operator) {
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
} */

function getInputtedNumber(operand) {
    const display = document.querySelector(".display-text");
    let number = display.textContent;
    if (operand === "a") {
        operation.a = number;
    } else if (operand === "b") {
        operation.b = number;
    }
}

function operatorButtonClicked(operator) {
    const display = document.querySelector(".display-text");
    if (operation.a === undefined) {
        getInputtedNumber("a");
        console.log("a: " + operation.a);
        operation.operator = operator;
    } else if (operation.b === undefined) {
        getInputtedNumber("b");
        console.log("b: " + operation.b);
        let result = operate(operation.a, operation.b, operation.operator);
        displayResult(result);
        operation.operator = operator;

        // if operator other than equals pressed, store result in a for further
        // evaluations
        console.log("test");
        operation.a = operator === "=" ? undefined : result;
        operation.b = undefined;
        console.log("a after: " + operation.a);
        console.log("b after: " + operation.b);
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
        numberButtonClicked(button.textContent);     
        updateLastButtonClicked(button.id);   
    });
});

const operatorButtons = document.querySelectorAll("#divide, #multiply, #subtract, #add");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateLastButtonClicked(button.id);
        operatorButtonClicked(button.textContent);        
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