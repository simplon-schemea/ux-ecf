/**
 simple http server for serving the HTML
 necessary to run Lighthouse which only supports HTTP(S) and not file protocol
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const mimetypes = {
    ".svg": "image/svg+xml",
    ".html": "text/html",
    ".png": "image/png",
    ".css": "text/css",
    ".jpg": "image/jpeg"
};

const useMin = getParam("min", true);

console.log(`Using ${ useMin ? "minified" : "non-minified" } scripts and css`);

function getParam(name, isSwitch) {
    const index = process.argv.indexOf("--" + name);

    if (index >= 0) {
        return isSwitch || process.argv[index + 1];
    }
}

const server = http.createServer(function (req, res) {
    let filepath = path.join(__dirname, req.url);

    const ext = path.extname(filepath);

    if (!fs.existsSync(filepath) || !fs.statSync(filepath).isFile()) {
        if (/^(.html?)?$/.test(ext)) {
            filepath = useMin ? "dist/index.html" : "index.html";
        } else {
            res.writeHead(404);
            res.end();
            return;
        }
    }

    const headers = {
        "Cache-Control": "must-revalidate"
    };

    const mimetype = mimetypes[ext];
    if (mimetype) {
        headers["Content-Type"] = mimetype;
    }

    res.writeHead(200, headers);
    res.end(fs.readFileSync(filepath));
});

const port = parseInt(getParam("port")) || parseInt(process.env.PORT) || 8080;

console.log("Listening on", port);
server.listen(port);
