

function calculate(expression) {

  const postfixExpression = infixToPostfix(expression);

  return evaluatePostfix(postfixExpression);
}

function infixToPostfix(infix) {
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };
  const output = [];
  const stack = [];

  for (let token of infix.split(/\s+/)) {
    if (!isNaN(token)) {
      output.push(parseFloat(token));
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      while (stack.length > 0 && precedence[token] <= precedence[stack[stack.length - 1]]) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  const stack = [];

  for (let token of postfix) {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      switch (token) {
        case '+':
          stack.push(operand1 + operand2);
          break;
        case '-':
          stack.push(operand1 - operand2);
          break;
        case '*':
          stack.push(operand1 * operand2);
          break;
        case '/':
          stack.push(operand1 / operand2);
          break;
      }
    }
  }

  return stack.pop();
}

module.exports = { calculate };


