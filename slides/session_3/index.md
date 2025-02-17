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
* Known the number of elements at compile-time? std::array
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
    my_span[0] = 3; // ouch, access violation!
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
    {"green", "##00FF00"},
    {"blue", "##0000FF"}
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
## Error handling
---
TODO
