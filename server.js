const express = require("express")
const fs = require("fs")
const path = require("path")

const port = 8000
const app = express()

const slidesPath = path.join(__dirname, "slides");
const slidePath = slideDeck => path.join(slidesPath, slideDeck);
const slideMarkdownPath = slideDeck => path.join(slidesPath, slideDeck, "index.md");
const slideMetadataPath = slideDeck => path.join(slidesPath, slideDeck, "metadata.json");
const slideAssetPath = (slideDeck, asset) => path.join(slidesPath, slideDeck, "assets", asset);
const courseMetadataPath = path.join(slidesPath, "course_metadata");
const courseMetadataFile = path.join(courseMetadataPath, "metadata.json");
const courseMetadata = () => JSON.parse(fs.readFileSync(courseMetadataFile, { encoding: "utf-8" }));
const courseFavIconPath = () => {
    const metadata = courseMetadata();
    return metadata.favIcon ? path.join(courseMetadataPath, metadata.favIcon) : null;
};
const courseBgLogoPath = () => {
    const metadata = courseMetadata();
    return metadata.bgLogo ? path.join(courseMetadataPath, metadata.bgLogo) : null;
};
const defaultFavIcon = path.join(__dirname, "public", "ap_favicon.ico");
const defaultBgLogo = path.join(__dirname, "public", "ap_logo.png");

const slideDecks = () => {
    return fs.readdirSync(slidesPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && slidePath(dirent.name) !== courseMetadataPath)
        .map(dirent => {
            const metadata = JSON.parse(fs.readFileSync(slideMetadataPath(dirent.name), { encoding: "utf-8" }));
            return [dirent.name, metadata];
        });
};

const wrapNoBreak = text => {
    return (courseMetadata().noBreakWords || []).reduce((acc, word) => {
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g");
        return acc.replace(regex, `<span class="no-break">${word}</span>`);
    }, text);
};

const sendImageWithMimeType = (res, imagePath) => {
    const mimeTypes = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".gif": "image/gif",
        ".webp": "image/webp"
    };

    const ext = path.extname(imagePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.sendFile(imagePath);
};

app.set("view engine", "ejs");

app.get("/slides/:slide_deck/assets/:asset", (req, res, next) => {
    const requestedPath = path.normalize(slideAssetPath(req.params.slide_deck, req.params.asset));

    if (!requestedPath.startsWith(slidesPath)) {
        var err = new Error("Forbidden: Invalid asset path");
        err.status = 403;
        return next(err);
    }

    if (!fs.existsSync(requestedPath)) {
        return next();
    }

    res.sendFile(requestedPath);
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
        { slide_deck_title: metadata.title, slide_deck_content_markdown: markdownContent },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        }
    );
});

app.get("/favicon.ico", (req, res, next) => {
    const favIconPath = courseFavIconPath();
    sendImageWithMimeType(res, favIconPath && fs.existsSync(favIconPath) ? favIconPath : defaultFavIcon);
});

app.get("/course-logo", (req, res, next) => {
    const bgLogoPath = courseBgLogoPath();
    sendImageWithMimeType(res, bgLogoPath && fs.existsSync(bgLogoPath) ? bgLogoPath : defaultBgLogo);
});

app.get('/', (req, res, next) => {
    const metadata = courseMetadata();
    const courseInfo = {
        title_raw: metadata.title,
        title: wrapNoBreak(metadata.title),
        description: wrapNoBreak(metadata.description || "")
    };

    const slideDecksMetadata = slideDecks()
        .filter(([, metadata]) => !(metadata.hidden && metadata.hidden === true))
        .map(([slideDeck, metadata]) => ({
            location: "/slides/" + slideDeck,
            title: wrapNoBreak(metadata.title),
            description: wrapNoBreak(metadata.description)
        }));

    res.render(
        "index",
        { course: courseInfo, slide_decks: slideDecksMetadata },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        }
    );
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/reveal.js", express.static(path.join(__dirname, "node_modules", "reveal.js")));
app.use("/reveal.js-mermaid-plugin", express.static(path.join(__dirname, "node_modules", "reveal.js-mermaid-plugin")));
app.use("/reveal.js-countdown", express.static(path.join(__dirname, "node_modules", "reveal.js-countdown")));

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
