# C/C++ Programming
![iso_cpp_logo](./assets/iso_cpp_logo.png)
---
TODO
---
* Function overloading
* References
* Classes
* RAII
* Operator overloading
* Inheritance
* Run-time polymorphism
* Value categories
* Rule-of-5
---
## Value Categories
---
```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'darkMode': true }}}%%
graph TD;
    A["value categories"] --> B["generalized lvalue"];
    A --> C["rvalue"];
    B --> D["lvalue"];
    B --> E["expiring value"];
    C --> E;
    C --> F["pure rvalue"];
```
