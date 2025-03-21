# Development Containers

<!--- cSpell:ignore Wouter Peetermans --->

Crash course docker and development containers.

---

## Problem statement

---

I work on many projects. Each of them have their own tool requirements. Some even use the same tool, but a different version.

---

I have to figure out which tools I need. Download and install them. And use the right version for the right project. This is hard! ☹️

---

* I don't want to figure out which tools I need. The project should provide a list.
* I don't want to install the tools system wide to avoid conflicts with other versions for other projects.

---

## Solution

---

Create a virtual machine for each project?

(virtualbox, vmware, ...)

---

Several gigabytes in size, so not possible to add to version control (for example git repository).

---

* I don't want to figure out which tools I need. The project should provide a list. ⛔️
* I don't want to install the tools system wide to avoid conflicts with other versions for other projects. ✅

---

Can we do better?

---

![Docker logo](./assets/%20docker_logo.png)

Note:

* <https://www.docker.com/>

---

Build virtual machines from a text file with the required tools.

---

<!--- cSpell:disable --->
```dockerfile
# Pick operating system for virtual machine
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# Install required tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install software-properties-common \
                          build-essential cmake valgrind \
                          clang lldb llvm gdb
```
<!--- cSpell:enable --->

### Dockerfile

---

Dockerfile can be added to version control!

---

* I don't want to figure out which tools I need. The project should provide a list. ✅
* I don't want to install the tools system wide to avoid conflicts with other versions for other projects. ✅

---

But I'm still not happy...

---

* I don't want to manually build and run the docker container.
* I don't want to manually set up my IDE for remote development.

---

### Development Containers

Note:

* <https://containers.dev/>

---

<!-- .slide: data-background-color="white" -->

![dev containers](./assets/devcontainer-overview.png)

Note:

* Picture borrowed from <https://xebia.com>

---

Add devcontainer.json file in .devcontainer directory to project. IDE will pick this up automatically, build the devcontainer and connect to it.

---

<!--- cSpell:disable --->
```json
{
    "name": "My fancy C++ container",
    "build": {
        "dockerfile": "Dockerfile"
    },
    "customizations": {
        "vscode": {
            "extensions": [
                "ms-vscode.cpptools-extension-pack"
            ]
        }
    },
    "remoteUser": "vscode"
}
```
<!--- cSpell:enable --->

#### devcontainer.json

Note:

* Text file, so can be added to version control
* Can use Dockerfile or an existing image name
* Can configure IDE settings
* Can provide list of IDE extensions

---

* I don't want to manually build and run the docker container. ✅
* I don't want to manually set up my IDE for remote development. ✅

---

Now I'm happy! 😁

---

## Crash course development containers

---

### Starting a project in a devcontainer

---

#### Step 1: Open the project directory in your IDE

(vscode, clion)

Note:

* The project directory is the directory that contains the .devcontainer directory

---

#### Step 2: vscode will ask to install the Dev Containers extension, accept

(unless the extension is already installed)

---

<video controls width="600">
  <source src="./assets/vscode_open_devcontainer.mp4" type="video/mp4">
  <img src="./assets/vscode_open_devcontainer.png" alt="vscode open in devcontainer">
</video>

#### Step 3: vscode will ask to reopen the project in a devcontainer, accept

Note:

* This will take a while, the docker container has to be created and started

---

![vscode devcontainer connected](./assets/vscode_devcontainer_connected.png)

#### Step 4: Happy coding 😁

---

### devcontainer.json

---

<!--- cSpell:disable --->
```json
{
    "name": "C++",
    "build": {
        "dockerfile": "Dockerfile",
        "args": {
            "GCC_VERSION": "14",
            "CLANG_VERSION": "19",
            "CMAKE_VERSION": "3.31.4",
            "CPPCHECK_VERSION": "2.16.2"
        }
    },
    "customizations": {
        "vscode": {
            "settings": {
                "C_Cpp.intelliSenseEngine": "Tag Parser",
                "C_Cpp.default.configurationProvider": "ms-vscode.cmake-tools",
                "C_Cpp.codeAnalysis.clangTidy.enabled": false,
                "C_Cpp.codeAnalysis.clangTidy.path": "/usr/bin/clang-tidy",
                "C_Cpp.codeAnalysis.clangTidy.useBuildPath": true,
                "C_Cpp.codeAnalysis.runAutomatically": true,
                "C_Cpp.clang_format_path": "/usr/bin/clang-format",
                "plantuml.server": "https://www.plantuml.com/plantuml"
            },
            "extensions": [
                "ms-vscode.cpptools-extension-pack",
                "jebbs.plantuml",
                "DavidAnson.vscode-markdownlint",
                "cheshirekow.cmake-format"
            ]
        }
    },
    "remoteUser": "vscode"
}
```
<!--- cSpell:enable --->

Example devcontainer.json using Dockerfile

---

<!--- cSpell:disable --->
```json
{
    "name": "node.js",
    "image": "mcr.microsoft.com/devcontainers/typescript-node:16-bullseye",
    "postCreateCommand": "npm install",
    "remoteUser": "node"
}
```
<!--- cSpell:enable --->

Example devcontainer.json using existing image

---

For a full reference of the devcontainer.json file, see <https://containers.dev/implementors/json_reference/>

---

## Crash course docker

---

### Installing docker on windows

<https://docs.docker.com/desktop/setup/install/windows-install/>

---

Using development containers will leave a bunch of docker containers on your system that can take up quite a bit of disk space.

---

```bash
# show the list of docker images
docker images
```

```bash
# show the list of all running and stopped containers
docker ps -a
```

```bash
# remove all images that are not in use by running containers
# remove all stopped containers
docker system prune -af
```

---

Want to learn how to use docker without development containers?

---

<https://cursus.hermans.casa/embedded-linux/embedded-linux-h4/>

Check out this slide deck by Wouter Peetermans.
