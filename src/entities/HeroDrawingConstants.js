const hitBoxWidth = 10;
const characterWidth = 32;
const characterHeight = 38;
const originX = -characterWidth / 2 + hitBoxWidth / 2;
const headX = originX + characterWidth / 2;
const headRadius = characterHeight / 3.5;
const legSize = (characterHeight - headRadius * 2) / 2;
const footSize = legSize / 2;

export const drawingConstants = {
  width: characterWidth,
  height: characterHeight,
  originX,
  headX,
  headRadius,
  legSize,
  footSize,
};

