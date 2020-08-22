import { Scene } from "kontra";

import { Hero } from "../entities/Hero";

export class MainScene extends Scene {
  constructor() {
    const hero = new Hero()
    super({
      id: "game",
      children: [hero]
    })
  }

  update() {
    this.children.forEach(child => child.update());
    super.update();
  }

  render() {
    this.children.forEach(child => child.render());
    super.render();
  }
}
