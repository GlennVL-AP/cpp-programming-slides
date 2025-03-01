const express = require("express")
const fs = require("fs")
const path = require("path")

const port = 8000
const app = express()

const slideDecks = () => {
    return fs.readdirSync(path.join(__dirname, "slides"), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
            const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, "slides", dirent.name, "metadata.json"), { encoding: "utf-8" }));
            return {
                [dirent.name]: metadata
            };
        })
        .flatMap(Object.entries);
};

app.set("view engine", "ejs");

app.get("/slides/assets/:asset", (req, res, next) => {
    const asset = req.params.asset;
    const referer = req.headers.referer;
    if (referer == undefined) {
        return next();
    }
    const slide_deck = new URL(referer).pathname;
    const asset_path = path.join(__dirname, slide_deck, "assets", asset);
    if (slideDecks().map((([slide_deck]) => "/slides/" + slide_deck)).includes(slide_deck) && fs.existsSync(asset_path)) {
        res.sendFile(asset_path);
    } else {
        next();
    }
});

app.get('/slides/:slide_deck', (req, res, next) => {
    const slide_deck = req.params.slide_deck;
    const slide_deck_entry = slideDecks().find(([name]) => name === slide_deck);
    if (!slide_deck_entry) {
        return next();
    }
    const [, metadata] = slide_deck_entry;
    const markdown_file = path.join(__dirname, "slides", slide_deck, "index.md");
    const markdown_content = fs.readFileSync(markdown_file, { encoding: "utf-8" });
    res.render(
        "slide_deck",
        { slidedeck_title: metadata.title, slidedeck_content_markdown: markdown_content },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        }
    );
});

app.get('/', (req, res, next) => {
    const words_to_prevent_break = ["C++"];
    function wrap_no_break(text) {
        return words_to_prevent_break.reduce((acc, word) => {
            const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g");
            return acc.replace(regex, `<span class="no-break">${word}</span>`);
        }, text);
    }
    const slide_decks_metadata = slideDecks()
        .filter(([slide_deck, metadata]) => !(metadata.hidden && metadata.hidden === true))
        .map(([slide_deck, metadata]) => ({
            location: "/slides/" + slide_deck,
            title: wrap_no_break(metadata.title),
            description: wrap_no_break(metadata.description)
        }));
    res.render(
        "index",
        { slide_decks: slide_decks_metadata },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        }
    );
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/favicon.ico", express.static(path.join(__dirname, "public", "iso_cpp_logo.svg")));
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
