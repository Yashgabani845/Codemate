---
title: Introduction to JavaScript
index: 1
hashtags: "#javascript, #basics"
description: An introduction to JavaScript programming language.
---

# Introduction
JavaScript is a versatile programming language used both on the client-side and server-side that allows you to make web pages interactive. It was created by Brendan Eich in 1995 and has since become one of the most popular programming languages in the world.

## Table of Contents
1. What is JavaScript?
2. Features of JavaScript
3. Getting Started
4. JavaScript Syntax
5. Variables and Data Types
6. Operators
7. Control Structures
8. Functions
9. Objects
10. DOM Manipulation
11. Events
12. Conclusion

## What is JavaScript?
JavaScript is a high-level, interpreted scripting language. It is lightweight and most commonly used as a part of web pages, allowing for the creation of dynamic content.

![JavaScript Logo](https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png)

## Features of JavaScript
JavaScript has several key features:
- **Interpreted Language**: JavaScript is executed line by line.
- **Lightweight**: It is a lightweight language.
- **Object-Oriented**: JavaScript supports object-oriented programming.
- **First-class Functions**: Functions in JavaScript are objects and can be manipulated like any other object.

## Getting Started
To start writing JavaScript, you can simply add a `<script>` tag to your HTML file. Here’s an example:

```
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Introduction</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <script>
    console.log('Hello, World!');
  </script>
</body>
</html>
```

## JavaScript Syntax
JavaScript syntax is the set of rules that define a correctly structured JavaScript program. For example:

```javascript
let message = 'Hello, World!';
console.log(message);
```

## Variables and Data Types
In JavaScript, you can declare variables using `var`, `let`, or `const`. JavaScript supports various data types including:

- **Number**
- **String**
- **Boolean**
- **Object**
- **Array**
- **Undefined**
- **Null**

Example:

```javascript
let age = 25; // Number
let name = 'John'; // String
let isStudent = true; // Boolean
let person = { firstName: 'John', lastName: 'Doe' }; // Object
let colors = ['Red', 'Green', 'Blue']; // Array
```

## Operators
JavaScript operators include arithmetic, assignment, comparison, logical, and more.

```javascript
let x = 10;
let y = 5;

console.log(x + y); // Addition
console.log(x - y); // Subtraction
console.log(x * y); // Multiplication
console.log(x / y); // Division
console.log(x % y); // Modulus
```

## Control Structures
JavaScript supports various control structures including conditional statements and loops.

### Conditional Statements

```javascript
let hour = 10;

if (hour < 12) {
  console.log('Good morning!');
} else if (hour < 18) {
  console.log('Good afternoon!');
} else {
  console.log('Good evening!');
}
```

### Loops

```javascript
for (let i = 0; i < 5; i++) {
  console.log('Number ' + i);
}
```

## Functions
Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code that performs a specific task.

```javascript
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('Alice'));
```

## Objects
Objects in JavaScript are used to store collections of data and more complex entities.

```javascript
let car = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2020,
  drive: function() {
    console.log('The car is driving');
  }
};

console.log(car.make);
car.drive();
```

## DOM Manipulation
The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.

```javascript
document.getElementById('myButton').addEventListener('click', function() {
  alert('Button was clicked!');
});
```

## Events
Events are actions or occurrences that happen in the system you are programming, which the system tells you about so your code can respond to them.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Document is fully loaded');
});
```

![Event Flow](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery/fix-event-flow.png)

## Conclusion
JavaScript is an essential language for modern web development. Its versatility and ease of use have made it a staple in the tech industry. By mastering JavaScript, you can create dynamic and interactive web applications.

### Further Reading
- [JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript Info](https://javascript.info/)
```
