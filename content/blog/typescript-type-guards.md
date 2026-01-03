+++
title = "TypeScript Type Guards: Making the Type System Work for You"
date = 2024-10-30
description = "How to use type guards to narrow types and write safer TypeScript code"
[taxonomies]
tags = ["typescript", "javascript", "programming"]
+++

TypeScript's type system is powerful, but sometimes you need to convince the compiler that you know more about a value's type than it does. That's where type guards come in.

## What Are Type Guards?

Type guards are expressions that perform runtime checks and inform TypeScript's type checker about a value's type in a specific scope.

The simplest type guard is `typeof`:

```typescript
function processValue(value: string | number) {
    if (typeof value === "string") {
        // TypeScript knows value is a string here
        console.log(value.toUpperCase());
    } else {
        // TypeScript knows value is a number here
        console.log(value.toFixed(2));
    }
}
```

## Custom Type Guards

For complex types, you can write custom type guard functions:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

interface Admin extends User {
    permissions: string[];
}

// Type predicate: 'user is Admin'
function isAdmin(user: User): user is Admin {
    return 'permissions' in user;
}

function handleUser(user: User) {
    if (isAdmin(user)) {
        // TypeScript knows user is Admin here
        console.log(`Admin with ${user.permissions.length} permissions`);
    } else {
        // Regular user
        console.log(`Regular user: ${user.name}`);
    }
}
```

## Discriminated Unions

One of my favorite patterns is discriminated unions with type guards:

```typescript
type Result<T, E> =
    | { success: true; value: T }
    | { success: false; error: E };

function processResult<T, E>(result: Result<T, E>): void {
    if (result.success) {
        // result.value is available
        console.log("Success:", result.value);
    } else {
        // result.error is available
        console.log("Error:", result.error);
    }
}
```

The `success` field acts as a discriminant—TypeScript uses it to narrow the type automatically.

## Array Type Guards

Filtering arrays with type guards:

```typescript
function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

const values: (string | null)[] = ["hello", null, "world", null];
const strings: string[] = values.filter(isNotNull);
// Type is string[], not (string | null)[]
```

## Why This Matters

Type guards bridge the gap between runtime checks and compile-time types. They let you write code that's both type-safe and handles real-world data that doesn't always match your expectations.

The key is teaching the type system what you know to be true based on your runtime checks. When you do this well, TypeScript becomes a powerful ally in catching bugs before they reach production.
