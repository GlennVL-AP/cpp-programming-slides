# Example Slides
Showcasing reveal.js features.
---
![reveal.js logo](./assets/reveal_js_logo.svg)

<https://revealjs.com/>
---
<!-- .slide: data-background-color="white" -->
Black text on white background.
---
```c++ []
import std;

int main()
{
    int x{5};
    some_function(std::move(x));
}
```
What is the value category of `x`?
* lvalue
* xvalue <!-- .element: class="fragment highlight-current-blue" -->
* prvalue

Note:
* Using fragments in markdown.
---
```c++ []
import std;

int main()
{
    int x{5};
    some_function(std::move(x));
}
```
What is the value category of `x`?
<div style="display: flex; justify-content: space-evenly;">
    <div>a) lvalue</div>
    <div class="fragment highlight-current-blue">b) xvalue</div>
    <div>c) prvalue</div>
</div>

Note:
* Using inline HTML.
---
![Mermaid logo](./assets/mermaid_logo.svg)
## Mermaid Plugin
<https://mermaid.js.org/ecosystem/tutorials.html>
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
* Source: <https://www.tiobe.com/tiobe-index/>
---
```mermaid
graph TD;
    A["value categories"] --> B["generalized lvalue"];
    A --> C["rvalue"];
    B --> D["lvalue"];
    B --> E["expiring value"];
    C --> E;
    C --> F["pure rvalue"];
```
