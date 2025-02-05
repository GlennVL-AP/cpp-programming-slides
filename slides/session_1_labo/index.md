# C/C++ Programming
## Labo 1
---
## Clang Compiler
<https://clang.llvm.org/>
---
### Before C++20
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
## Exercise
---
1. Make sure you have docker installed!
1. Clone <https://gitlab.apstudent.be/cpp-programming/cpp-devcontainer-base>
1. Open with `vscode` or `clion`
1. Start devcontainer
1. Try compiling and running the two examples
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
  -fmodule-file=std=std.pcm --precompile -x c++-module -o helloworld.pcm helloworld.cpp

clang++ -std=c++23 -stdlib=libc++ \
  -fmodule-file=std=std.pcm -fmodule-file=helloworld=helloworld.pcm -o helloworld main.cpp
```
```basah
/usr/bin/ld: /tmp/main-2b3cf5.o: in function `main':
main.cpp:(.text+0x5): undefined reference to `hello@helloworld()'
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
```
---
### Let's not do this by hand!
* Gets complex very quickly
* Use build tool instead! 👍
---
![CMake](./assets/cmake-logo.jpg)
<https://cmake.org/>
---
### Exercise
---
1. Clone <https://gitlab.apstudent.be/cpp-programming/cpp-devcontainer-cmake>
1. Open with `vscode` or `clion`
1. Start devcontainer
1. Try cofiguring and building the project
