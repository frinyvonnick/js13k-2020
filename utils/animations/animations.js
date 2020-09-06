const fs = require("fs");
const path = require("path");

const run = require("./HeroRunAnimation");
const fall = require("./HeroFallAnimation");
const idle = require("./HeroIdleAnimation");
const jump = require("./HeroJumpAnimation");

fs.writeFileSync(
  path.join(__dirname, "../../src/entities/animations.json"),
  JSON.stringify({ run, fall, idle, jump })
);
