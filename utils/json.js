const mapping = [
  ["width", "w"],
  ["height", "h"],
  ["color", "c"],
  ["group", "g"],
  ["zIndex", "z"],
  ["blur", "b"],
  ["scaleX", "s"],
  ["foliageRadius", "fr"],
  ["foliageColor", "fc"],
  ["trunkWidth", "tw"],
  ["trunkHeight", "th"],
  ["trunkColor", "tc"],
  ["hillWidth", "hw"],
  ["hillHeight", "hh"],
  ["foliageShadowColor", "fsc"],
];

const typeMappingSave = [
  ["Bounce", "bo"],
  ["Bush", "bu"],
  ["Chest", "c"],
  ["Ground", "g"],
  ["Hill", "h"],
  ["Key", "k"],
  ["Land", "l"],
  ["Sequoia", "se"],
  ["Sky", "sk"],
  ["Slide", "sl"],
  ["Tree", "t"],
];

export function compress(json) {
  const copy = JSON.parse(JSON.stringify(json))
  let result = copy.map((el) => {
    delete el.id;

    mapping.forEach(([target, dest]) => {
      if (target in el) {
        el[dest] = el[target];
        delete el[target];
      }
    });

    const [_, typeValue] = typeMappingSave.find(([type]) => type === el.type);
    el.type = typeValue;

    return el;
  });

  return JSON.stringify(result);
}

export function uncompress(str) {
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

    const [typeValue] = typeMappingSave.find(([_, type]) => type === el.type);
    el.type = typeValue;

    return el;
  });
}
