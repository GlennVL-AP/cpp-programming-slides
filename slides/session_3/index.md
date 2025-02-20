# C/C++ Programming
![iso_cpp_logo](./assets/iso_cpp_logo.png)
---
* STL containers
  * std::vector, std::array, std::unordered_map
  * std::span, std::string_view
* Errors
  * Compile-time, link-time, run-time
  * Exceptions
  * Avoiding and finding errors
---
## More stl containers
---
* `std::vector`
* `std::array`
* `std::unordered_map`
---
### std::array
---
* std::vector for dynamic number of elements
* std::array for static number of elements

Note:
* Know the number of elements at compile-time? std::array
* Don't know the number of elements at compile-time? std::vector
---
```c++
std::array<int, 5> my_array{1, 2, 3, 4, 5};
```

Note:
* Type and length can be deduced: std::array my_array{1, 2, 3, 4, 5};
* Don't use c-style arrays in c++! int my_array[] = {1, 2, 3, 4, 5}; // bad
---
```c++
my_array[3] = 7;
```
```c++
for (auto const& value : my_array)
{
    std::println("{}", value);
}
```
```c++
for (auto&& value : my_array)
{
    value += 5;
}
```

Note:
* Can be used the same way as std::vector
---
#### Arrays as function arguments
---
```c++
void read_array(std::array<int, 5> array)
{
  // this function only accepts arrays with 5 elements 🙁
  // array is passed by value, so I can't modify items 🙁
}
```

Note:
* Passed by value means a copy is made that is used in the function.
* Making changes to the copy does not affect the original.
---
#### std::span
---
A span is an array slice.

Note:
* It points to a position in the array (by default the start).
* And has a number of items (by default the total number of items in the array).
---
It is not a copy, but refers it to the original!

Note:
* Modifying elements through a span will also update the original.
---
```c++ []
using std;

int main()
{
    std::span<int> my_span{};
    {
        std::array my_array{1, 2, 3, 4, 5};
        my_span = std::span{my_array};
    }
    my_span[0] = 3; // ouch, access violation! 😬
}
```
You are responsible to make sure the lifetime of the array to which it refers is long enough!
---
Use std::span to pass arrays to functions.
---
```c++
void modify_array(std::span<int> array)
{
    for (auto&& value : array)
    {
        value += 5;
    }
}
```
A span can be used to modify the elements in the original array.

Note:
* std::span CANNOT be used to add/remove elements!
---
```c++
void read_array(std::span<int const> array)
{
    for (auto const& value : array)
    {
        std::print("{},", value);
    }
}
```
Add const to the element type if you don't want to modify the original array.
---
```c++
std::array my_array{1, 2, 3, 4, 5};
std::vector my_vector{1, 2, 3, 4, 5};
int my_c_array[] = {1, 2, 3, 4, 5}; // don't do this in c++
```
```c++
read_array(my_array);
read_array(my_vector);
read_array(my_c_array);
```
```c++
modify_array(my_array);
modify_array(my_vector);
modify_array(my_c_array);
```

Note:
* Why use span over array?
* No template argument for number of elements required
* Accepts all sorts of array types (std::array, std::vector, c array, ...)
---
#### Best practices
---
* Use std::array when you know the number of elements at compile time.
* Use std::vector when you don't.
---
* Use std::span to pass arrays to functions.
* Add const to the element type for read-only access.
---
### std::unordered_map
---
std::unordered_map is an associative container that contains key-value pairs with unique keys.
---
* std::unordered_map - hashmap
* std::map - sorted by key

Note:
* std::map implemented as red-black tree
* Hashmap is faster
* std::map: search, insert, delete all O(log n)
* std::unoredered_map: search, insert, delete all O(1)
---
```c++
std::unordered_map<std::string, std::string> colors{
    {"red", "#FF0000"},
    {"green", "#00FF00"},
    {"blue", "#0000FF"}
};
```

Note:
* Two template arguments
* Key type
* Value type
---
```c++
colors["black"] = "#000000";
colors["white"] = "#FFFFFF";
```
```c++
// operator[] creates new entry if it does not exist
```
---
```c++
if (colors.contains("black"))
{
    std::println("black has value {}", colors["black"]);
}
```

Note:
* Use contains() to avoid accidentally creating default-initialized elements.
---
```c++
// read
for (auto const& [color, code] : colors)
{
    std::println("{} = {}", color, code);
}
```
```c++
// modify
for (auto&& [color, code] : colors)
{
    code = "[" + code + "]";
}
```
structured bindings

Note:
* Each iteration we get a key and a value.
* Syntax to extract them is [key, value].
* This is called structured bindings.
---
* std::string
* std::vector
* std::array
* std::span
* std::unordered_map

Note:
* Our STL journey so far.
---
## Errors!
---

<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="max-width: 55%;">

> I realized that from now on a large part of my life would be spent finding and correcting my own mistakes.

Maurice Wilkes, 1945

</div>
<div style="max-width: 45%;">

![Maurice Wilkes](./assets/maurice_wilkes.jpg)

</div>
</div>

---
Errors are simply unavoidable when you develop a program, yet the final program must be *free of errors\**.

Note:
* At least, free of critical errors.
---
### Error classifications
---
#### Compile-time errors
Errors found by the compiler. Can be further classified based on which language rule is violated.

Note:
* Syntax errors (for example missing braces, missing ;)
* Type errors (for example wrong number of function arguments, incorrect type of function arguments)
---
#### Link-time errors
Errors found by the linker when it is trying to combine object-files into an executable.

Note:
* Undefined references (for example function definition is not found)
---
#### Run-time errors
Errors found by checks in a running program.

aka Logic Errors

Note:
* Errors detected by the computer (OS or hardware, for example access violations, out of memory)
* Errors detected by a library (for example bounds checking in the stl)
* Errors detected by user code (for example unit tests)
---
C++ provides a mechanism to deal with errors.
---
### Exceptions
---
Separates the detection and handling of an error.

Note:
* Detection should be done in the called function
* Handling should be done in the calling function
---
Ensures that a detected error cannot be ignored.
---
#### What if a function detects an error it cannot handle?
---
It should not return normally.
---
Instead it should throw an exception and pass the responbility to handle the error to the caller.
---
```c++
int main()
try
{
    std::vector vec{1, 2, 3, 4, 5};
    vec.at(5) = 6; // out of bounds access
}
catch (std::exception const& e)
{
    std::cerr << "Exception caught: " << e.what() << '\n';
}
```
```text
Exception caught: vector
```

Note:
* Bounds checking at at() function, exception is thrown
---
```c++
int main()
try
{
    std::vector vec{1, 2, 3, 4, 5};
    vec[5] = 6; // out of bounds access
}
catch (std::exception const& e)
{
    // no exception thrown, application terminates
    std::cerr << e.what() << '\n';
}
```
```text
/usr/lib/llvm-19/bin/../include/c++/v1/vector:1436:
assertion __n < size() failed: vector[] index out of bounds
Aborted (core dumped)
```

Note:
* STL only does bounds checking in at() function, not in operator[]
* We have enabled STL hardening mode to also check in operator[], this will cause an assertion error and abort instead of exception
---
```c++
struct BadArea : std::exception {};
```
```c++
int calculate_area(int length, int width)
{
    if ((length < 0) || (width < 0)) { throw BadArea{}; }
    return length * width;
}
```
```c++
int main()
try
{
    calculate_area(5, -1);
}
catch (BadArea const& e)
{
    std::cerr << "Bad area exception!\n";
}
```

Note:
* Custom exceptions
* Best practice: inherit from std::exception
---
#### When to use exceptions?
---
#### Use exceptions for exceptional cases.
Invalid user input or failing to open a file is expected and should be handled properly.
---
### Avoiding and finding errors
---
#### Debugging
---
1. Get the program to compile.
2. Get the program to link.
3. Get the program to do what it is supposed to do.
---
Think about debugging before you start writing code.
---
* Add clear comments.
* Use meaningful names.
* Use a consistent layout (clang-format!).
* Break code into small functions.
* Avoid complicated sequences (nested loops, ifs, ...).
* Use libraries instead of reinventing the wheel.
---
#### Design by contract
---
A contract consists of preconditions, postconditions and invariants.
---
##### Preconditions
---
A precondition is a requirement of a function upon its arguments.
---
```c++
int calculate_area(int length, int width)
{
    if ((length < 0) || (width < 0)) { throw BadArea{}; }
    return length * width;
}
```
What are the preconditions?

Note:
* The function takes two arguments.
* Both arguments are of type int.
* Neither of the arguments is allowed to be a negative value.
---
Types are a form of precondition that is enforced by the compiler.
---
Some preconditions we can enforce by writing code.
---
Some preconditions cannot be expressed as code, but can be added as a comment.
---
##### Postconditions
---
A postcondition is a promise a function makes if and only off all preconditions are satisfied.
---
```c++
int calculate_area(int length, int width)
{
    if ((length < 0) || (width < 0)) { throw BadArea{}; }
    return length * width;
}
```
What are the postconditions?

Note:
* There is one return value.
* The type of the return value is an integer.
* If both length and width are positive, the area will also be positive.
---
##### Writing contracts in code
---
I don't want to add if statements with throw all over the place! 🙃
---
A helper function: expect()

Note:
* We have to implement expect() ourselves.
* It is not part of the standard library.
---
```c++ []
int calculate_area(int length, int width)
{
    // precondition
    expect([&]{ return (length >= 0) && (width >= 0); },
           "length and width cannot be negative");

    int result{length * width};

    // postcondition
    expect([&]{ return result >= 0; }, "area is positive");

    return result;
}
```
If you give me a positive length and width, I promise you that the area will also be positive.

Note:
* Preconditions are the most important!
* Postcondition are not often added as code.
* We are using lambdas here, a short way of writing functions.
* []{} declares a lambda.
* Between [] we say which variables we want to be available inside the lambda body {}.
* [&] means we want access to all variables.
* We write the function body between {}. In this case it should return a boolean.
---
### C++26 will support contracts! 👍
But for now we are stuck with expect().

Note:
* New syntax is accepted for C++26 that will allow you to write preconditions and postconditions.
---
## Exercises!
