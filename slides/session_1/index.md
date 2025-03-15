# C/C++ Programming

![iso_cpp_logo](./assets/iso_cpp_logo.png)

---

## Hello, world! ☺️

---

```c++
import std;

int main()
{
    std::println("Hello, world!");
}
```

Note:

* What stands out?
* Return at end of main is optional: defaults to `return 0`

---

## Why C++?

---

![Gaming Engines](./assets/gaming_engines.png)

---

![Medical Equipment](./assets/siemens_healthineers.png)

### Siemens Healthineers

---

![AI Engines](./assets/ai_engines.png)

---

![Boston Dynamics](./assets/boston_dynamics.jpg)

---
![High-frequency trading](./assets/high_frequencty_trading.png)

### High-frequency trading

---

![Ingenuity Mars helicopter](./assets/ingenuity_mars_helicopter.jpg)

<https://github.com/nasa/fprime>

---

### Why learn C++ in 2025?

* Performance and Efficiency
* Modern high-level language
* Directly access hardware

---

### You are not alone

![Tiobe Index 2025](./assets/tiobe_index.png)

<https://www.tiobe.com/tiobe-index/>

---

```mermaid
pie title Programming languages by popularity
    "Python" : 23.88
    "C++" : 11.37
    "Java" : 10.66
    "C" : 9.84
    "C#": 4.12
    "JavaScript": 3.78
    "Other" : 36.35
```

Note:

* Tiobe index as piechart.

---

## History

---

![Bjarne Stroustrup](./assets/bjarne_stroustrup.jpg)

### Bjarne Stroustrup

Note:

* Inventor of C++
* Born 30 december 1950 (age 74)

---

### C with Classes

#### 1979

* C's ability to use hardware
* Simula's OOP concepts

---

### Renamed to C++

#### 1984

---

### First commercial C++ compiler

#### 1985

Cfront: Translate C++ to C

---

### Standardization

#### 1989 - 1998

![First ISO meeting](./assets/first_iso_meeting.jpg)

---

### ISO C++98

First official ISO standard

---

### ISO C++03

Minor fixes

---

### ISO C++11

* Modern C++
* First major release

---

### ISO WG21 - Standard C++ Foundation

![ISO WG21](./assets/foundation_directors.png)

---

### New release model

* Release cycle of 3 years
* Backwards compatible!

---

* ISO C++14
* ISO C++17
* ISO C++20
* ISO C++23
* ISO C++26 (WiP)

---

<!-- .slide: data-visibility="hidden" -->

```mermaid
timeline
    title History of C++
    section Pre-standardization
      1979: C with Classes
      1984: Renamed to C++
      1985: CFront
    section Standardization
      1989: Request for standardization
      1998: First standard : ISO C++98
      2003: Minor fixes : ISO C++03
    section Modern C++
      2011: ISO C++11
      2014-...: ISO C++14
              : ISO C++17
              : ISO C++20
              : ISO C++23
              : ISO C++26 (WiP)
```

---

## Compilation Model

Note:

* How to convert source to binary?

---

```c++ []
// main.cpp

import std;

int main()
{
    std::println("Hello, world!");
}
```

---

![Compile Hello World](./assets/compile_helloworld.png)

---

```c++ []
// helloworld.cpp

export module helloworld;

import std;

export void hello()
{
    std::println("Hello, world!");
}
```

```c++ []
// main.cpp

import helloworld;

int main()
{
    hello();
}
```

---

![Compile Hello World multi](./assets/compile_helloworld_multi.png)

---

### Compilation steps

1. Compile each file
2. Combine results into executable

---

### Source code + 9 Compilation phases = Binary (exe, lib, ...)

---

| Phase | |
|:--|:--|
| 1-4 | Preprocessing |
| 5-7 | Deal with lexical, grammatical, static semantics rules |
| 8 | Template instantiation |
| 9 | Linking |

Note:

* Our goal is to avoid the preprocessor!
* Only use it if we have to include non-module libraries.
* `#include <some_library.h>`

---

```c++
// hello world before modules and println

#include <iostream>

int main()
{
    std::cout << "Hello, world!\n";
}
```

---

## C++ Core Guidelines

Note:

* Compiler checks if code is valid
* Backward compatible
* Old style also valid but unsafe

---

### Help people use modern C++ effectively

---

* Bjarne Stroustrup
* Herb Sutter

---

<https://isocpp.github.io/CppCoreGuidelines/>

* Lots of rules... 🙁
* Use tool to check compliance! 👍
* [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)

---

## Let's learn C++! 🥳
