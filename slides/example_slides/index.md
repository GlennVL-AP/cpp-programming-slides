# Example Slides

Showcasing reveal.js features.

---

![reveal.js logo](./assets/reveal_js_logo.svg)

<https://revealjs.com/>

---

<!-- .slide: data-visibility="hidden" -->

This slide is excluded.

---

<!-- .slide: data-background-color="white" -->

Black text on white background.

---

<!-- .slide: data-background-gradient="linear-gradient(to bottom, #0a0a0a, #1a1a2e, #222222)" -->

```css
.reveal .slides pre.code-wrapper:not(:has(> code.mermaid)) > code {
    background: color-mix(in srgb, currentColor 10%, transparent) !important;
}
```

Background gradient. Use the css above to make code segments semi transparent.

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

* lvalue <!-- .element: class="fragment semi-fade-out shrink" data-fragment-index="1" -->
* xvalue <!-- .element: class="fragment highlight-current-blue grow" data-fragment-index="1" -->
* prvalue <!-- .element: class="fragment semi-fade-out shrink" data-fragment-index="1" -->

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
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">a) lvalue</div>
    <div class="fragment highlight-current-blue grow" data-fragment-index="1">b) xvalue</div>
    <div class="fragment semi-fade-out shrink" data-fragment-index="1">c) prvalue</div>
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
