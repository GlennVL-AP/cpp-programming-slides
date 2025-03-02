const express = require("express")
const fs = require("fs")
const path = require("path")

const port = 8000
const app = express()

const slidesPath = path.join(__dirname, "slides");
const slideMarkdownPath = slideDeck => path.join(slidesPath, slideDeck, "index.md");
const slideMetadataPath = slideDeck => path.join(slidesPath, slideDeck, "metadata.json");
const slideAssetPath = (slideDeck, asset) => path.join(slidesPath, slideDeck, "assets", asset);
const courseMetadataPath = path.join(slidesPath, "metadata.json");
const courseMetadata = () => JSON.parse(fs.readFileSync(courseMetadataPath));
const courseIconPath = () => path.join(slidesPath, courseMetadata().icon);

const slideDecks = () => {
    return fs.readdirSync(slidesPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
            const metadata = JSON.parse(fs.readFileSync(slideMetadataPath(dirent.name), { encoding: "utf-8" }));
            return {
                [dirent.name]: metadata
            };
        })
        .flatMap(Object.entries);
};

const wrapNoBreak = text => {
    return (courseMetadata().noBreakWords || []).reduce((acc, word) => {
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g");
        return acc.replace(regex, `<span class="no-break">${word}</span>`);
    }, text);
};

app.set("view engine", "ejs");

app.get("/slides/:slide_deck/assets/:asset", (req, res, next) => {
    res.sendFile(slideAssetPath(req.params.slide_deck, req.params.asset));
});

app.get('/slides/:slide_deck', (req, res, next) => {
    const slideDeckEntry = slideDecks().find(([slideDeck]) => slideDeck === req.params.slide_deck);
    if (!slideDeckEntry) {
        return next();
    }
    const [, metadata] = slideDeckEntry;
    const markdownContent = fs.readFileSync(slideMarkdownPath(req.params.slide_deck), { encoding: "utf-8" })
        .replace(/\.\/assets\//g, `/slides/${req.params.slide_deck}/assets/`);
    res.render(
        "slide_deck",
        { slidedeck_title: metadata.title, slidedeck_content_markdown: markdownContent },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        }
    );
});

app.get("/favicon.ico", (req, res, next) => {
    res.sendFile(courseIconPath());
});

app.get('/', (req, res, next) => {
    const metadata = courseMetadata();
    const slideDecksMetadata = slideDecks()
        .filter(([slideDeck, metadata]) => !(metadata.hidden && metadata.hidden === true))
        .map(([slideDeck, metadata]) => ({
            location: "/slides/" + slideDeck,
            title: wrapNoBreak(metadata.title),
            description: wrapNoBreak(metadata.description)
        }));
    res.render(
        "index",
        {
            course: {
                title_raw: metadata.title,
                title: wrapNoBreak(metadata.title),
                description: wrapNoBreak(metadata.description || "")
            },
            slide_decks: slideDecksMetadata
        },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        }
    );
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/reveal.js", express.static(path.join(__dirname, "node_modules", "reveal.js")));
app.use("/reveal.js-mermaid-plugin", express.static(path.join(__dirname, "node_modules", "reveal.js-mermaid-plugin")));

app.use((req, res, next) => {
    res.status(404).render("error", {
        status: 404,
        short_message: "Page Not Found",
        full_message: "Oops! The page you're looking for does not exist.",
        url: req.originalUrl
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).render("error", {
        status: err.status || 500,
        short_message: "Internal Server Error",
        full_message: err.message || "Internal Server Error",
        url: req.originalUrl
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
