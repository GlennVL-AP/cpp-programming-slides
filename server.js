const express = require("express")
const fs = require("fs")
const path = require("path")

const port = 8000
const app = express()

const slide_decks = fs.readdirSync(path.join(__dirname, "slides"), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())

app.set("view engine", "ejs");

app.get("/slides/assets/:asset", (req, res, next) => {
    const asset = req.params.asset;
    const referer = req.headers.referer;
    if (referer == undefined) {
        res.status(404).send(`Asset "${asset}" not found`);
        return;
    }
    const slide_deck = new URL(referer).pathname;
    const asset_path = path.join(__dirname, slide_deck, "assets", asset);
    if (slide_decks.map((slide_deck => "/slides/" + slide_deck)).includes(slide_deck) && fs.existsSync(asset_path)) {
        res.sendFile(asset_path);
    } else {
        res.status(404).send(`Asset "${asset}" not found`);
    }
});

app.get('/favicon.ico', (req, res, next) => {
    res.sendFile(path.join(__dirname, "slides/session_1/assets/iso_cpp_logo.svg"));
});

app.get('/slides/:slide_deck', (req, res, next) => {
    const slide_deck = req.params.slide_deck;
    if (!slide_decks.includes(slide_deck)) {
        res.status(404).send(`Slide deck "${slide_deck}" does not exist`);
        return;
    }
    const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, "slides", slide_deck, "metadata.json")));
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
    slide_decks_metadata = slide_decks.map(slide_deck => {
        const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, "slides", slide_deck, "metadata.json")));
        return {
            location: "/slides/" + slide_deck,
            title: metadata.title,
            description: metadata.description
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
app.use("/reveal.js", express.static(path.join(__dirname, "node_modules/reveal.js")));

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
