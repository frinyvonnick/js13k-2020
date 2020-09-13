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

export function uncompress(str, colors) {
  let json = str;
  if (typeof json === "string") {
    json = JSON.parse(json);
  }

  return json.map((el) => {
    mapping.forEach(([target, dest]) => {
      if (dest in el) {
        el[target] = el[dest];
        delete el[dest];
      }
    });

    const typeMapping = typeMappingSave.find(([_, type]) => type === el.type);
    if (typeMapping) {
      const [typeValue] = typeMapping;
      el.type = typeValue;
    }

    Object.keys(el).forEach((key) => {
      const value = el[key];
      if (typeof value === "string" && value.includes("#")) {
        const index = value.slice(1);
        const color = colors[index];
        el[key] = color;
      }
    });

    return el;
  });
}
