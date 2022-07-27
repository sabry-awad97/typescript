import prompt from "prompt-sync";
const input = prompt({ sigint: true });

const operations = new Map([
  ["+", (a: number, b: number) => a + b],
  ["-", (a: number, b: number) => a - b],
  ["*", (a: number, b: number) => a * b],
  ["/", (a: number, b: number) => a / b],
]);

function calculator() {
  let num1 = parseInt(input("What is your first number? "));

  for (const [symbol, _] of operations) {
    console.log(symbol);
  }

  let shouldContinue = true;
  while (shouldContinue) {
    const operationSymbol = input("Pick an operation from above ");
    const num2 = parseInt(input("What is your next number? "));
    const calculationFunction = operations.get(operationSymbol);
    const answer = calculationFunction?.(num1, num2);

    console.log(`${num1} ${operationSymbol} ${num2} = ${answer}`);
    if (
      input(
        `Type 'y' for continue calculating with ${answer} or Type 'n' to start a new calculation: `
      ) === "y"
    ) {
      num1 = answer!;
    } else {
      shouldContinue = false;
      console.clear();
      calculator();
    }
  }
}

calculator();
