---
title: JavaScript Variables
index: 2
hashtags: #javascript, #variables
description: A detailed guide on JavaScript variables.
---

# JavaScript Variables
Variables are fundamental to all programming languages. In JavaScript, variables are used to store data values that can be changed and manipulated throughout your code.

## Table of Contents
1. What is a Variable?
2. Declaring Variables
3. Variable Naming Conventions
4. Variable Scope
5. Variable Hoisting
6. Data Types
7. Constants

## What is a Variable?
A variable is a container for storing data values. In JavaScript, you can create variables using the `var`, `let`, or `const` keywords.

## Declaring Variables
You can declare a variable using the `var`, `let`, or `const` keyword followed by the variable name.

### Using `var`
```javascript
var x = 10;
console.log(x); // 10
```

### Using `let`
```javascript
let y = 20;
console.log(y); // 20
```

### Using `const`
`const` is used to declare a constant variable that cannot be reassigned.

```javascript
const z = 30;
console.log(z); // 30
```

## Variable Naming Conventions
Variable names in JavaScript should follow these rules:
- Must begin with a letter, underscore (_), or dollar sign ($).
- Subsequent characters can be letters, digits, underscores, or dollar signs.
- Variable names are case-sensitive.

```javascript
let firstName = 'John';
let _age = 25;
let $salary = 50000;
```

## Variable Scope
JavaScript variables have different scopes:
- **Global Scope**: Variables declared outside any function have global scope.
- **Function Scope**: Variables declared inside a function are local to that function.
- **Block Scope**: Variables declared with `let` and `const` within a block `{}`.

### Global Scope
```javascript
var globalVar = 'I am global';

function showGlobalVar() {
  console.log(globalVar); // I am global
}
showGlobalVar();
```

### Function Scope
```javascript
function showLocalVar() {
  var localVar = 'I am local';
  console.log(localVar); // I am local
}
showLocalVar();
```

### Block Scope
```javascript
{
  let blockVar = 'I am block-scoped';
  console.log(blockVar); // I am block-scoped
}
// console.log(blockVar); // Error: blockVar is not defined
```

## Variable Hoisting
In JavaScript, variable declarations are hoisted to the top of their scope. However, this behavior is different for `var`, `let`, and `const`.

### Hoisting with `var`
```javascript
console.log(hoistedVar); // undefined
var hoistedVar = 'Hoisted';
```

### Hoisting with `let` and `const`
Variables declared with `let` and `const` are not initialized until their declaration is evaluated.

```javascript
// console.log(hoistedLet); // Error: Cannot access 'hoistedLet' before initialization
let hoistedLet = 'Not Hoisted';
```

## Data Types
Variables in JavaScript can hold different data types:
- **Number**
- **String**
- **Boolean**
- **Object**
- **Array**
- **Undefined**
- **Null**

### Example
```javascript
let age = 30; // Number
let name = 'Alice'; // String
let isStudent = true; // Boolean
let person = { firstName: 'John', lastName: 'Doe' }; // Object
let colors = ['Red', 'Green', 'Blue']; // Array
```

## Constants
Constants are declared using the `const` keyword and cannot be reassigned.

### Example
```javascript
const PI = 3.14;
console.log(PI); // 3.14

// PI = 3.1415; // Error: Assignment to constant variable.
```

## Conclusion
Understanding variables is crucial for mastering JavaScript. Variables store data values that can be used and manipulated in your programs. Always choose the appropriate keyword (`var`, `let`, `const`) based on the scope and mutability of the variable you need.

### Further Reading
- [JavaScript Variables - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations)
- [JavaScript Variable Scope - W3Schools](https://www.w3schools.com/js/js_scope.asp)
```

