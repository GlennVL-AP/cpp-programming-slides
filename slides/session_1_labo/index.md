# C/C++ Programming
## Labo 1
---
## Compiling with Clang
<https://clang.llvm.org/>
---
### C++03
```c++ []
// main.cpp

#include <iostream>

int main()
{
    std::cout << "Hello, world!\n";
}
```
---
### Piece of cake! 😎
```bash
clang++ -o helloworld main.cpp
```
---
### C++23
```c++ []
// main.cpp

import std;

int main()
{
    std::println("Hello, world!");
}
```
---
### Hmmm... 🤔
```bash
clang++ -std=c++23 -stdlib=libc++ \
  -Wno-reserved-identifier -Wno-reserved-module-identifier \
  --precompile -o std.pcm /usr/lib/llvm-19/share/libc++/v1/std.cppm

clang++ -std=c++23 -stdlib=libc++ \
  -fmodule-file=std=std.pcm -o helloworld std.pcm main.cpp
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
### Ouch!? 😬
```bash
clang++ -std=c++23 -stdlib=libc++ \
  -Wno-reserved-identifier -Wno-reserved-module-identifier \
  --precompile -o std.pcm /usr/lib/llvm-19/share/libc++/v1/std.cppm

clang++ -std=c++23 -stdlib=libc++ \
  -fmodule-file=std=std.pcm --precompile -o helloworld.pcm std.pcm helloworld.cpp

clang++ -std=c++23 -stdlib=libc++ \
  -fmodule-file=std=helloworld.pcm -o helloworld helloworld.pcm helloworld.cpp
```
---
### Let's not do this by hand!
* Gets complex very quickly
* Use build tool instead! 👍
---
![CMake](./assets/cmake-logo.jpg)
<https://cmake.org/>
