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
![Ingenuity Mars helicopter](./assets/ingenuity_mars_helicopter.jpg)
<https://github.com/nasa/fprime>
---
![Gaming Engines](./assets/gaming_engines.png)
---
![Medical Equipment](./assets/siemens_healthineers.png)
### Siemens Healthineers
---
![AI Engines](./assets/ai_engines.png)
---
### Robotics
---
### High-frequency trading
---
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
### New release cycle
* Release every 3 years
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
### C++23
```c++
import std;

int main()
{
    std::println("Hello, world!");
}
```
```bash
clang++ -std=c++23 -stdlib=libc++ \
  -Wno-reserved-identifier -Wno-reserved-module-identifier \
  --precompile -o std.pcm /usr/lib/llvm-19/share/libc++/v1/std.cppm

clang++ -std=c++23 -stdlib=libc++ \
  -fmodule-file=std=std.pcm -o helloworld std.pcm main.cpp
```
---
### C++03
```c++
#include <iostream>

int main()
{
    std::cout << "Hello, world!\n";
}
```
```bash
clang++ -std=c++23 -stdlib=libc++ -o helloworld main.cpp
```
