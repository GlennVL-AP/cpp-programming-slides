# C/C++ Programming

<!--- cSpell: ignore ssize --->

## Labo 5

---

```mermaid
kanban
  column1[Solutions]
    task1[Labo 1]
    task2[Labo 2]
    task3[Labo 3]
    task4[Labo 4]
  column2[Exercises]
    task5[Labo 5 Devcontainer]
    task6[Runtime Polymorphisms]
```

---

## Solutions Labo 1-4

---

<https://gitlab.apstudent.be/cpp-programming/cpp-programming-solutions>

---

A few new features are used in the solutions...

Note:

* Solutions use some stuff we haven't covered yet.

---

* static constexpr
* std::size_t
* static_cast
* std::optional
* designated initializers

---

### static constexpr

---

```c++
void counter()
{
    static int count{0};
    std::println("{}", ++count);
}
```

```c++
counter(); // prints 1
counter(); // prints 2
counter(); // prints 3
```

Static variables in a function.

Note:

* Static variables are shared between function calls.

---

```c++
class Counter
{
public:
    Counter() { std::println("{}", ++counter); }

private:
    inline static int counter{0};
};
```

```c++
Counter c1{}; // prints 1
Counter c2{}; // prints 2
Counter c3{}; // prints 3
```

Static member variables in a class.

Note:

* Static member variables are shared between instances.
* Either inline or initialization outside of class is required.

```c++
class Counter
{
    static int counter;
};

int Counter::counter{0};
```

---

```c++
class Counter
{
public:
    Counter() { std::println("{}", ++counter); }

    static int count() { return counter; }

private:
    inline static int counter{0};
};
```

```c++
Counter c1{};                         // prints 1
Counter c2{};                         // prints 2
std::println("{}", Counter::count()); // prints 2
```

Static functions in a class.

Note:

* Static functions in a class are called directly on the type instead of on a specific instance.

---

Compile time constants are shared between function calls or class instances. Make them static.

---

```c++
double circle_area(double radius)
{
    static constexpr double pi{3.14};
    return pi * radius * radius;
}
```

```c++
class Circle
{
private:
    static constexpr double pi{3.14};
};
```

---

```c++
// not in function or class, no static!
constexpr double pi{3.14};
```

```c++
double circle_area(double radius)
{
    return pi * radius * radius;
}
```

```c++
double circle_circumference(double radius)
{
    return 2 * pi * radius;
}
```

---

### std::size_t

---

std::size_t is used in the STL as index for operator[] and as result of the .size() member function of containers.

---

```c++
std::vector const my_vec{1, 2, 3, 4, 5};
```

```c++
auto vec_size = my_vec.size();      // type is std::size_t
```

```c++
std::size_t index{2};
auto third_element = my_vec[index]; // expects std::size_t
```

---

```c++
// print items in reverse
for (auto i{my_vec.size()-1}; i >= 0; --i)
{
    std::println("{}", my_vec[i]);
}
```

std::size_t is an unsigned integer.

Note:

* What is the issue with this code?
* Infinite loop: -1 does not exist, instead wraps around to largest positive number.

---

Always use int for arithmetic!

---

```c++
std::vector const my_vec{1, 2, 3, 4, 5};
```

```c++
for (int i{my_vec.size()}; i >= 0; --i) // compiler warning
{
    std::println("{}", my_vec[i]); // compiler warning
}
```

Note:

* my_vec.size() returns std::size_t
* my_vec[] expects std::size_t
* Warning because of narrowing conversions.

---

STL existed long before best practice of always using int was introduced.

---

* std::ssize() to get container size as signed value.
* No real solution for operator[].

Note:

* Can't change operator[] because backwards compatibility would be broken.

---

#### Best practices

---

* Always use int for arithmetic.
* Use std::ssize(container) to get container size. <!-- .element: class="fragment " data-fragment-index="1" -->
* Avoid operator[] if possible (use algorithms). <!-- .element: class="fragment " data-fragment-index="2" -->

---

```c++
std::vector const my_vec{1, 2, 3, 4, 5};
```

```c++
// print items in reverse
for (auto const& value : std::views::reverse(my_vec))
{
    std::println("{}", value);
}
```

No direct indexing required!

Note:

* <https://compiler-explorer.com/z/jWWa9ax4q>

---

But what if I have to use direct indexing?

---

### static_cast

---

Convert from one type to another without checking.

---

```c++
std::vector const my_vec{1, 2, 3, 4, 5};
```

```c++
// print items in reverse
for (auto i{std::ssize(my_vec)}; i >= 0; --i)
{
    std::println("{}", my_vec[static_cast<std::size_t>(i)]);
}
```

---

You are telling the compiler it is safe to do the conversion.

---

Don't do this unless you are absolutely certain it is.

---

```c++
int my_int{-1};
auto my_index = static_cast<std::size_t>(my_int);
std::println("my_index = {}", my_index);
```

```text
my_index = 18446744073709551615
```

The compiler won't complain!

Note:

* <https://compiler-explorer.com/z/b7oaKTTzK>

---

### std::optional

---

Sometimes a function may or may not return a value.

---

```c++
// look for needle in haystack, return index if found else -1
int my_search(std::vector<int> const& haystack, int needle)
{
    for (int index{0}; auto const& value : haystack)
    {
        if (value == needle)
        {
            return index; // found! return index
        }

        ++index;
    }

    return -1; // -1 for not found??
}
```

What if the needle is not found in the haystack?

---

```c++
// look for needle in haystack, return index if found
std::optional<int> my_search(std::vector<int> const& haystack, int needle)
{
    for (int index{0}; auto const& value : haystack)
    {
        if (value == needle)
        {
            return index; // found! return index
        }

        ++index;
    }

    return {}; // not found! return nothing
}
```

Much more expressive!

---

```c++
std::optional<int> my_search(std::vector<int> const& haystack, int needle)
```

```c++
std::vector const my_vec{1, 2, 3, 4, 5};
if (auto const result = my_search(my_vec, 5))
{
    std::println("Found at index {}!", *result);
}
else
{
    std::println("Not found!");
}
```

Use in simple if construction.

Note:

* <https://compiler-explorer.com/z/3x7srx7fe>
* Use `*` to get the value.
* Using `*` is only allowed if the optional is not empty!

---

Use std::optional if a function may or may not have a value to return!

---

### Designated initializers

---

```c++
struct MyType
{
    int first;
    int second;
};
```

```c++
MyType const my_value{1, 2};
```

```c++
std::println("{}", my_value.first);  // prints 1
std::println("{}", my_value.second); // prints 2
```

What we used so far.

---

```c++
struct MyType
{
    int first;
    int second;
};
```

```c++
MyType const my_value{ .first = 1, .second = 2 };
```

Designated initializers.

---

Be explicit, use designated initializers!

Note:

* Always aim to make your code as expressive as possible.

---

### Best practices

---

* Add static to constexpr in functions and classes.
* Always use int for arithmetic. <!-- .element: class="fragment" data-fragment-index="1" -->
* Prefer algorithms over direct indexing. <!-- .element: class="fragment" data-fragment-index="2" -->
* Ensure conversion is safe when using static_cast. <!-- .element: class="fragment" data-fragment-index="3" -->
* Be expressive: std::optional, designated initializers. <!-- .element: class="fragment" data-fragment-index="4" -->

note:

* Avoid static_cast unless really necessary.

---

## Exercises Runtime Polymorphisms

---

### Devcontainer

<https://gitlab.apstudent.be/cpp-programming/devcontainer-labo-4>

Note:

* Reuse labo 4 devcontainer.

---

### Exercises

See digitap.
