const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const fse = require("fs-extra");

const OUTPUT_DIR = path.join(__dirname, "out");
const SLIDES_DIR = path.join(__dirname, "slides");
const PUBLIC_DIR = path.join(__dirname, "public");

const REVEAL_DIRS = [
    ["reveal.js", "node_modules/reveal.js"],
    ["reveal.js-mermaid-plugin", "node_modules/reveal.js-mermaid-plugin"],
    ["reveal.js-countdown", "node_modules/reveal.js-countdown"]
];

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function wrapNoBreak(text, noBreakWords) {
    return (noBreakWords || []).reduce((acc, word) => {
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
        return acc.replace(regex, `<span class="no-break">${word}</span>`);
    }, text);
}

function renderTemplate(templatePath, data) {
    return ejs.render(fs.readFileSync(templatePath, "utf-8"), data);
}

function build() {
    fse.emptyDirSync(OUTPUT_DIR);

    const courseMetadataPath = path.join(SLIDES_DIR, "course_metadata", "metadata.json");
    const courseMetadata = readJson(courseMetadataPath);

    // Copy public dir
    fse.copySync(PUBLIC_DIR, path.join(OUTPUT_DIR, "public"));

    // Copy Reveal.js and plugins
    for (const [outDir, srcDir] of REVEAL_DIRS) {
        fse.copySync(path.join(__dirname, srcDir), path.join(OUTPUT_DIR, outDir));
    }

    // Copy favicon and logo
    const favIcon = courseMetadata.favIcon || "ap_favicon.ico";
    const bgLogo = courseMetadata.bgLogo || "ap_logo.png";
    fse.copyFileSync(
        path.join(SLIDES_DIR, "course_metadata", favIcon),
        path.join(OUTPUT_DIR, "public", favIcon)
    );
    fse.copyFileSync(
        path.join(SLIDES_DIR, "course_metadata", bgLogo),
        path.join(OUTPUT_DIR, "public", bgLogo)
    );

    // Find slide decks
    const deckDirs = fs.readdirSync(SLIDES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory() && d.name !== "course_metadata");

    const decks = [];

    for (const dirent of deckDirs) {
        const name = dirent.name;
        const metadata = readJson(path.join(SLIDES_DIR, name, "metadata.json"));
        if (metadata.hidden) continue;

        const markdownPath = path.join(SLIDES_DIR, name, "index.md");
        let markdownContent = fs.readFileSync(markdownPath, "utf-8");
        markdownContent = markdownContent.replace(/\.\/assets\//g, `/slides/${name}/assets/`);

        // Render slide deck page
        const slideHtml = renderTemplate(path.join(__dirname, "views", "slide_deck.ejs"), {
            slide_deck_title: metadata.title,
            slide_deck_content_markdown: markdownContent,
            favicon: `/public/${favIcon}`
        });

        const outSlideDir = path.join(OUTPUT_DIR, "slides", name);
        fse.ensureDirSync(outSlideDir);
        fs.writeFileSync(path.join(outSlideDir, "index.html"), slideHtml);

        // Copy slide assets
        const assetSrcDir = path.join(SLIDES_DIR, name, "assets");
        if (fs.existsSync(assetSrcDir)) {
            fse.copySync(assetSrcDir, path.join(outSlideDir, "assets"));
        }

        decks.push({
            location: `/slides/${name}`,
            title: wrapNoBreak(metadata.title, courseMetadata.noBreakWords),
            description: wrapNoBreak(metadata.description, courseMetadata.noBreakWords)
        });
    }

    // Render home page
    const indexHtml = renderTemplate(path.join(__dirname, "views", "index.ejs"), {
        course: {
            title_raw: courseMetadata.title,
            title: wrapNoBreak(courseMetadata.title, courseMetadata.noBreakWords),
            description: wrapNoBreak(courseMetadata.description || "", courseMetadata.noBreakWords)
        },
        slide_decks: decks,
        favicon: `/public/${favIcon}`,
        course_logo: `/public/${bgLogo}`
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), indexHtml);

    // Render error 404 page
    const pageNotFound = renderTemplate(path.join(__dirname, "views", "error.ejs"), {
        status: 404,
        short_message: "Page Not Found",
        full_message: "Oops! The page you're looking for does not exist.",
        favicon: `/public/${favIcon}`,
        course_logo: `/public/${bgLogo}`,
        url: null
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, "404.html"), pageNotFound);

    // Render error 500 page
    const serverError = renderTemplate(path.join(__dirname, "views", "error.ejs"), {
        status: 500,
        short_message: "Internal Server Error",
        full_message: "Something went wrong on our side.",
        favicon: `/public/${favIcon}`,
        course_logo: `/public/${bgLogo}`,
        url: null
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, "500.html"), serverError);
}

build();
