# cpp-programming-slides

The slides can be rendered in the browser using the `reveal.js` node package.

## Getting started

1. Navigate to the directory where you want to store the slides and open `git bash`
2. In `git bash` execute the following command

   ```bash
   git clone https://gitlab.apstudent.be/cpp-programming/cpp-programming-slides.git
   ```

3. Open the `cpp-programming-slides` directory with vscode
4. If vscode asks to install the `Dev Containers` plugin, accept
5. When vscode asks to launch the project in a dev container, accept
6. Open a new terminal in vscode `` ctrl+shift+` ``
7. In the vscode terminal execute the following command

   ```bash
   npm run start
   ```

8. Navigate to the following page in your preferred browser

   ```text
   http://localhost:8000
   ```

9. To view speaker notes, press `s`

## Export to pdf

1. Append `?print-pdf` to the url of a slide deck

   ```text
   http://localhost:8000/slides/session_0_docker?print-pdf
   ```

2. Open the print dialog `ctrl+p`
3. Change `Destination` to `Save to PDF`
4. Change `Layout` to `Landscape`
5. Change `Margins` to `None`
6. Enable `Print backgrounds` option
7. Click the `Save` button

## Required tools

* git - <https://git-scm.com>
* vscode - <https://code.visualstudio.com>
* docker - <https://www.docker.com>
