# C/C++ Programming

![iso_cpp_logo](./assets/iso_cpp_logo.png)

---

```mermaid
kanban
  column1[Namespaces]
    task1[Namespaces]
    task2[Anonymous namespace]
    task3[Using keyword]
  column2[Modules]
    task4[Modules]
    task5[Module fragments]
  column3[Unit tests]
    task6[Project structure]
    task7[Catch2 test framework]
```

---

What if two modules both export a function with the same name and arguments? 🤔

---

```c++ []
export module first;

import std;

export void hello()
{
    std::println("First!");
}
```

```c++ []
export module second;

import std;

export void hello()
{
    std::println("Second!");
}
```

Note:

* Both modules export a function named hello with no arguments.

---

```c++ []
import first;
import second;
import std;

int main()
try
{
    hello();
}
catch (std::exception const& e)
{
    std::cerr << e.what() << "\n";
}
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) First!</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">b) Second!</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">c) error</div>
</div>

---

<!-- markdownlint-disable line-length -->
```sh [1-6]
[build] first.cpp:5:13: error: declaration 'hello' attached to named module 'first' cannot be attached to other modules [clang-diagnostic-error]
[build]     5 | export void hello()
[build]       |             ^
[build] second.cpp:5:13: note: also found
[build]     5 | export void hello()
[build]       |             ^
[build] second.cpp:5:13: error: 'hello' has different definitions in different modules; definition in module 'second' first difference is function body [clang-diagnostic-error]
[build]     5 | export void hello()
[build]       |        ~~~~~^~~~~~~
[build]     6 | {
[build]       | ~
[build]     7 |     std::println("Second!");
[build]       |     ~~~~~~~~~~~~~~~~~~~~~~~~
[build]     8 | }
[build]       | ~
[build] first.cpp:5:13: note: but in 'first' found a different body
[build]     5 | export void hello()
[build]       |        ~~~~~^~~~~~~
[build]     6 | {
[build]       | ~
[build]     7 |     std::println("First!");
[build]       |     ~~~~~~~~~~~~~~~~~~~~~~~
[build]     8 | }
[build]       | ~
[build] 190036 warnings and 2 errors generated.
```
<!-- markdownlint-enable line-length -->

Violation of the [One Definition Rule](https://en.cppreference.com/w/cpp/language/definition) (ODR)!

---

How to distinguish symbols with the same name from different libraries?

---

## Namespaces

<https://en.cppreference.com/w/cpp/language/namespace>

---

Namespaces provide a method for preventing name conflicts in large projects.

---

<!-- .slide: data-background-image="./assets/clock.png" data-background-size="contain" data-background-opacity=".5" -->

<countdown time="300" autostart="yes" />

Note:

* Lookup on the Internet what namespaces are and how to use them.

---

![quiz image](./assets/quiz.png)

### namespaces

--

```c++
namespace a { void hello() { std::println("hello_a"); } }
namespace b { void hello() { std::println("hello_b"); } }
```

```c++
b::hello();
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) hello_a</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">b) hello_b</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">c) error</div>
</div>

Note:

* Directly call the hello function in the b namespace.
* <https://compiler-explorer.com/z/7qebs9eMo>

--

```c++
namespace a { void hello() { std::println("hello_a"); } }
namespace b { void hello() { std::println("hello_b"); } }
```

```c++
using namespace a;
hello();
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">a) hello_a</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">b) hello_b</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">c) error</div>
</div>

Note:

* Everything in the a namespace is now available in the global scope.
* Calling unqualified hello will call a::hello().
* <https://compiler-explorer.com/z/b14TG9Pqb>

--

```c++
namespace a { void hello() { std::println("hello_a"); } }
namespace b { void hello() { std::println("hello_b"); } }
```

```c++
using b::hello;
hello();
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) hello_a</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">b) hello_b</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">c) error</div>
</div>

Note:

* Bring only the hello function from the b namespace in scope.
* <https://compiler-explorer.com/z/59PfYMs9s>

--

```c++
namespace a { void hello() { std::println("hello_a"); } }
namespace b { void hello() { std::println("hello_b"); } }
```

```c++
using a::hello;
using b::hello;
hello();
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) hello_a</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">b) hello_b</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">c) error</div>
</div>

Note:

* Both hello from a and hello from b are now in scope.
* Compiler does not know which function to call.
* <https://compiler-explorer.com/z/7MqYja1MW>

--

```c++
namespace a {
  void f(int)    { std::println("a::f(int)");    }
  void f(double) { std::println("a::f(double)"); }
}
namespace b {
  void f(int)    { std::println("b::f(int)");    }
  void f(double) { std::println("b::f(double)"); }
  void f(char)   { std::println("b::f(char)");   }
}
```

```c++
using a::f;
using b::f;
f('a');
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) a::f(...)</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">b) b::f(...)</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">c) error</div>
</div>

Note:

* All f functions from both the a and the b namespace are in scope.
* But there is no ambiguity when calling f with a char, there's only one exact match b::f(char).
* <https://compiler-explorer.com/z/h9r4rqo31>

--

```c++
namespace a {
  void f(int)    { std::println("a::f(int)");    }
  void f(double) { std::println("a::f(double)"); }
}
namespace b {
  void f(int)    { std::println("b::f(int)");    }
  void f(double) { std::println("b::f(double)"); }
  void f(char)   { std::println("b::f(char)");   }
}
```

```c++
using a::f;
using b::f;
f(3.14);
```

What will the program print?

<div style="display: flex; justify-content: space-evenly;">
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) a::f(...)</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">b) b::f(...)</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">c) error</div>
</div>

Note:

* All f functions from both the a and the b namespace are in scope.
* Call a::f(double) or b::f(double)?
* <https://compiler-explorer.com/z/cGqWzhW5M>

---

### Summary

---

```c++
namespace a {
    void f();
}

namespace b::c {
    void f();
    void g();
}

namespace d = b::c;
```

Namespace definitions.

---

```c++
namespace a {
    void f();
}

namespace b::c {
    void f();
    void g();
}

namespace d = b::c;
```

```c++
using a::f;
using namespace d;

f(); // a::f()
g(); // b::c::g()
```

Using directives.

---

## Modules

<https://en.cppreference.com/w/cpp/language/modules>

---

TODO

---

## Unit tests

---

![Catch2 logo](./assets/catch2_logo.png)

---

TODO

---

## Exercises
