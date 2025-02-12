# C/C++ Programming
## Labo 2
---
## Devcontainer
<https://gitlab.apstudent.be/cpp-programming/devcontainer-labo-2>
---
### For each exercise
* Create new directory for exercise
* Add following line to main CMakeListst.txt file
```cmake
add_subdirectory(my_new_directory)
```
---
### Work in exercise directory
* Add source files
* Create CMakeLists.txt file
```cmake
cpprog_add_executable(
    TARGET exercise_1  # executable will be called exercise_1
    CXX_MODULES        # module source files here
    "my_module_1.cpp"
    "my_module_2.cpp"
    CXX_SOURCES        # old-style source files here
    "main.cpp"
)
```

Note:
* convenience cmake function that does the hard work for us
* compiler warnings, clang-tidy, ...
---
### Select exercise in vscode
```text
View > Command Palette... > CMake: Set Launch/Debug Target
```
---
## Exercises
See digitap.
