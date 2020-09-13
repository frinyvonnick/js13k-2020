import { Scene, Text } from "kontra";

export function makeCreditScreenScene() {
  const common = {
    x: 400,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    color: "black",
  };
  const creditScreenTitle = Text({
    ...common,
    text: "Credits",
    font: "64px Arial",
    y: 200,
  });

  const creditScreenText = Text({
    ...common,
    text: `Development: Vincent Poesmann, Yvonnick Frin\n
    Level design: Lucas Dupuy, Vincent Poesmann\n
    Music: Thomas Bazin\n
    Graphism: Yvonnick Frin`,
    font: "24px Arial",
    y: 400,
  });

  return Scene({
    children: [creditScreenText, creditScreenTitle],
  });
}
