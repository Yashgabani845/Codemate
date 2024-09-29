---
title:  Variables in Javascript
index: 2
hashtags: ["#javascript", "#basics"]
description: An introduction to JavaScript programming language.
---

# JavaScript Variables

In JavaScript, variables are containers for storing data values. There are three ways to declare variables:

1. `var` (function-scoped)
2. `let` (block-scoped)
3. `const` (block-scoped, constant)

## Variable Declarations

### 1. `var`

- **Scope**: `var` is function-scoped, meaning it is confined to the function within which it is declared. If declared outside a function, it becomes globally scoped.
- **Hoisting**: Variables declared with `var` are hoisted to the top of their scope, but they are not initialized until the code runs. This can lead to unexpected results.
- **Re-declaration**: You can re-declare and update `var` variables.

```javascript
var x = 5;
var x = 10; // Allowed

function example() {
  var message = "Hello";
  console.log(message); // Accessible within the function
}
```

### 2. `let`

- **Scope**: `let` is block-scoped, meaning it is confined to the block, statement, or expression where it is used.
- **Hoisting**: `let` is hoisted but not initialized. This means you cannot use a `let` variable before declaring it.
- **Re-declaration**: You cannot re-declare a variable within the same block scope, but you can update its value.

```javascript
let y = 5;
y = 10; // Allowed
// let y = 20; // Error: Cannot redeclare 'y' in the same scope

if (true) {
  let blockScoped = "Only in this block";
  console.log(blockScoped); // Accessible inside the block
}
// console.log(blockScoped); // Error: blockScoped is not defined
```

### 3. `const`

- **Scope**: Similar to `let`, `const` is block-scoped.
- **Hoisting**: Variables declared with `const` are also hoisted but not initialized.
- **Re-declaration**: Variables declared with `const` cannot be re-declared or updated. The value must be assigned at the time of declaration.
- **Mutability**: While `const` prevents the variable from being reassigned, objects or arrays declared as `const` can have their properties or elements updated.

```javascript
const z = 5;
// z = 10; // Error: Assignment to constant variable

const arr = [1, 2, 3];
arr.push(4); // Allowed: Modifying the array contents
console.log(arr); // Output: [1, 2, 3, 4]
```

## Differences Between `var`, `let`, and `const`

| Feature       | `var`              | `let`              | `const`            |
| ------------- | ------------------ | ------------------ | ------------------ |
| Scope         | Function-scoped     | Block-scoped       | Block-scoped       |
| Hoisting      | Hoisted (undefined) | Hoisted (uninitialized) | Hoisted (uninitialized) |
| Re-declaration | Allowed            | Not allowed        | Not allowed        |
| Re-assignment | Allowed            | Allowed            | Not allowed        |
| Initial value | Optional           | Optional           | Mandatory          |

---

This `variables.md` explains how variables work in JavaScript and the key differences between `var`, `let`, and `const`.