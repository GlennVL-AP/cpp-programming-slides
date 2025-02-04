# C/C++ Programming
![iso_cpp_logo](./assets/iso_cpp_logo.png)
---
## Hello, world!
---
```c++
import std;

int main()
{
    std::println("Hello, world!");
}
```
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
* Backwards compatibility
---
### You are not alone
![Tiobe Index 2025](./assets/tiobe_index.png)
<https://www.tiobe.com/tiobe-index/>
---
## History
---
![Bjarne Stroustrup](./assets/bjarne_stroustrup.jpg)
### Bjarne Stroustrup
---
### C with Classes
#### 1979
* C's ability to use hardware
* Simula's OOP concepts
---
### Renamed to C++
#### 1984
---
### First C++ compiler
#### 1985
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
## Compilation Model
---
### From source code to binary
```c++ []
import std;

int main()
{
    std::println("Hello, world!");
}
```
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
### Compilation steps
1. Parse files?
1. Compile each file?
1. Combine files into executable?
---
### Source code + 9 Compilation phases = Binary (exe, lib, ...)
---
| Phase | |
|:--|:--|
| 1-4 | Preprocessing |
| 5-7 | Deal with lexical, grammatical, static semantics rules |
| 8 | Template instantiation |
| 9 | Linking |
