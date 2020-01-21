infixToPostfix("a+b*(c^d-e)^(f+g*h)-i");

function infixToPostfix(expression) {
  var result = [];
  var stack = [];
  var segments = split(expression);

  while (segments.length) {
    var value = segments.shift();
    var type = getType(value);
    console.log(value);
    if (type === "variable" || type === "value") {
      result.push(value);
    } else if (type === '(') {
      stack.push(value);
    } else if (type === ')') {
      while (stack.length && peek(stack) !== '(')
        result.push(stack.pop());
    } else { // + - * / ^
      while (stack.length && getPriorityOperator(value) <= getPriorityOperator(peek(stack))) {
        result.push(stack.pop());
        console.log('pop : ' + peek(stack));
      }
      console.log('push : ' + value);
      stack.push(value);
    }
  }

  console.log(result.join(''));
  return result
}

function peek(stack) {
  return stack[stack.length - 1];
}

function getPriorityOperator(ch) {
  switch (ch) {
    case '+':
    case '-':
      return 1;

    case '*':
    case '/':
      return 2;

    case '^':
      return 3;
  }
  return -1;
}

function getType(text) {
  if (/^[a-zA-Z]/g.test(text)) return 'variable';
  if (/^[0-9]/g.test(text)) return 'number';
  return text;
}

function split(expression) {
  //"a+b*(c^d-e)^(f+g*h)-i"
  expression = expression.replace(/\s+/g, '');
  var segments = [];
  var lastIndex = -1;
  for (var i = 0; i <= expression.length; i++) {
    var e = expression[i];
    if (/[\+\-\/]|[\*]|[\^]|[\(\)]/g.test(e)) {
      var segment = expression.substring(lastIndex + 1, i);
      segments.push(segment);
      segments.push(e);
      lastIndex = i;
    }
  }

  segments.push(expression.substring(lastIndex + 1));
  return segments.filter(x => x);
}

