import { Scene, Text } from "kontra";

export function makeCreditScreenScene() {
  const creditScreenTitle = Text({
    text: "Credits",
    font: "64px Arial",
    color: "black",
    x: 400,
    y: 200,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
  });

  const creditScreenText = Text({
    text: `Development: Vincent Poesmann, Yvonnick Frin\n
    Level design: Lucas Dupuy\n
    Music: Thomas Bazin\n
    Graphism: Yvonnick Frin`,
    font: "24px Arial",
    color: "black",
    x: 400,
    y: 400,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
  });

  return Scene({
    id: "credit",
    children: [creditScreenText, creditScreenTitle],
    x: 0,
    y: 0,
  });
}
