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
        const [compressedJson, colors] = compress(JSON.parse(body));
        fs.writeFileSync(
          path.join(__dirname, "../src/entities-prod.json"),
          JSON.stringify(compressedJson)
        );
        fs.writeFileSync(
          path.join(__dirname, "../src/colors.json"),
          JSON.stringify(colors)
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

function compress(json) {
  const mapping = [
    ["width", "a"],
    ["height", "b"],
    ["color", "c"],
    ["computedColor", "d"],
    ["group", "e"],
    ["zIndex", "f"],
    ["blur", "g"],
    ["scaleX", "h"],
    ["foliageRadius", "i"],
    ["foliageComputedColor", "j"],
    ["trunkWidth", "k"],
    ["trunkHeight", "l"],
    ["trunkComputedColor", "m"],
    ["hillWidth", "n"],
    ["hillHeight", "o"],
    ["foliageShadowComputedColor", "p"],
    ["lightColor", "q"],
    ["keyRadius", "r"],
    ["patternComputedColor", "s"],
    ["type", "t"],
  ];

  const fieldsToDelete = [
    "patternColor",
    "foliageColor",
    "trunkColor",
    "foliageShadowColor",
  ];

  const typeMappingSave = [
    ["Bounce", "A"],
    ["Bush", "B"],
    ["Chest", "C"],
    ["Ground", "D"],
    ["Hill", "E"],
    ["Key", "F"],
    ["Land", "G"],
    ["Sequoia", "H"],
    ["Sky", "I"],
    ["Slide", "J"],
    ["Tree", "K"],
    ["Fade", "L"],
    ["Tent", "M"],
  ];

  const colors = [];

  let result = json.map((el) => {
    delete el.id;

    if (el.blur === 0) {
      delete el.blur
    }

    if (el.scaleX === 1) {
      delete el.scaleX
    }

    const typeMapping = typeMappingSave.find(([type]) => type === el.type);
    if (typeMapping) {
      const [_, typeValue] = typeMapping;
      el.type = typeValue;
    }

    if (
      JSON.stringify(el).includes("computed") ||
      JSON.stringify(el).includes("Computed")
    ) {
      Object.keys(el).forEach((key) => {
        if (
          (key.includes("Color") || key.includes("color"))
        ) {
          if (!key.includes('computed') && !key.includes('Computed')) {
            delete el[key];
          }
        }
      });
    }

    mapping.forEach(([target, dest]) => {
      if (target in el) {
        el[dest] = el[target];
        delete el[target];
      }
    });

    fieldsToDelete.forEach((key) => {
      delete el[key];
    });

    Object.keys(el).forEach((key) => {
      const value = el[key];
      if (typeof value === "string" && value.includes("#")) {
        const color = value;
        if (colors.includes(color)) {
          const index = colors.findIndex((c) => c === color);
          el[key] = `#${index}`;
        } else {
          colors.push(color);
          el[key] = `#${colors.length - 1}`;
        }
      }
    });

    return el;
  });

  return [result, colors];
}

console.log(`Design server running at http://localhost:${PORT}`);
