# C/C++ Programming
![iso_cpp_logo](./assets/iso_cpp_logo.png)
---
* STL containers
  * std::vector
  * std::array
  * std::map
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
---
### Arrays as function arguments
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
```c++
void modify_array(std::span<int> array)
{
    for (auto&& value : array)
    {
        value += 5;
    }
}
```

Note:
* A span is an array slice
* Does not copy, but refers to the original
* You are responsible to make sure the lifetime of the array to which it refers is long enough!
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
### Strings
---
```c++
void read_string(std::string_view string)
{
    std::println("{}", string);
}
```

Note:
* string_view is a read-only array slice
* Be mindful of lifetimes!
---
```c++
std::string my_string{"some text"};
std::string_view my_string_literal{"some text"};
char my_c_string[] = "some text"; // don't do this in c++
```
```c++
read_string(my_string);
read_string(my_string_literal);
read_string(my_c_string);
```

Note:
* Why use string_view over string?
* Accepts all sorts of strings (std::string, string literal, c char array, ...)
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
* structured bindings
---
## Error handling
---
TODO
