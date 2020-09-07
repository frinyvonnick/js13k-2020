const hitBoxWidth = 10;
const characterWidth = 32;
const characterHeight = 38;
const originX = Math.round(-characterWidth / 2 + hitBoxWidth / 2);
const headX = Math.round(originX + characterWidth / 2);
const headRadius = Math.round(characterHeight / 3.5);
const legSize = Math.round((characterHeight - headRadius * 2) / 2);
const footSize = Math.round(legSize / 2);

module.exports = {
  drawingConstants: {
    width: characterWidth,
    height: characterHeight,
    originX,
    headX,
    headRadius,
    legSize,
    footSize,
  },
};
