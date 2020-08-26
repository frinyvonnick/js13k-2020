const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

const PORT = 7000;

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        fs.writeFileSync(
          path.join(__dirname, "entities.json"),
          JSON.stringify(JSON.parse(body), undefined, 2)
        );
        res.writeHead(200);
        res.end("ok");
      });
    } else if (req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(fs.readFileSync(path.join(__dirname, "entities.json"), "utf8"));
    }
  })
  .listen(PORT);

console.log(`Design server running at http://localhost:${PORT}`);
