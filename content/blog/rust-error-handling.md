+++
title = "Elegant Error Handling in Rust"
date = 2024-12-15
description = "Exploring Rust's Result type and how it leads to more maintainable code"
[taxonomies]
tags = ["rust", "programming", "best-practices"]
+++

One of the things I love most about Rust is how it forces you to think about error handling upfront. Coming from languages where exceptions can be thrown from anywhere, Rust's `Result<T, E>` type feels like a breath of fresh air.

## The Result Type

In Rust, functions that can fail return a `Result`:

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}
```

This makes it immediately clear which functions can fail and forces callers to handle errors explicitly.

## The ? Operator

The `?` operator makes error propagation elegant:

```rust
fn read_and_parse_file(path: &str) -> Result<Config, Box<dyn Error>> {
    let contents = fs::read_to_string(path)?;
    let config: Config = toml::from_str(&contents)?;
    Ok(config)
}
```

Each `?` says "if this fails, return early with the error." No try-catch blocks, no hidden control flow.

## Custom Error Types

For library code, defining custom error types makes APIs clearer:

```rust
#[derive(Debug)]
pub enum ParseError {
    InvalidSyntax(String),
    UnexpectedToken { expected: String, got: String },
    IoError(io::Error),
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ParseError::InvalidSyntax(msg) => write!(f, "Invalid syntax: {}", msg),
            ParseError::UnexpectedToken { expected, got } => {
                write!(f, "Expected {}, got {}", expected, got)
            }
            ParseError::IoError(e) => write!(f, "IO error: {}", e),
        }
    }
}
```

## Why This Matters

Explicit error handling might feel verbose at first, but it prevents an entire class of bugs. You can't forget to handle an error—the compiler won't let you.

The type system tells you exactly what can go wrong, making code easier to understand and maintain. It's one of those things that feels constraining at first but liberating once you get used to it.
