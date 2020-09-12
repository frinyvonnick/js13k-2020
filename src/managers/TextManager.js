import { Scene, Text, keyPressed, Sprite } from "kontra";

import { drawShamanGhost } from '../entities/Shaman'

export function makeTextManager() {
  const content = Text({
    group: 0,
    text: "",
    font: "18px Arial",
    color: "black",
    x: 210,
    y: 485,
    width: 380,
    height: 60,
    textAlign: "center",
  });

  const next = Text({
    group: 0,
    text: "Press 'Enter' to continue",
    font: "14px Arial",
    color: "black",
    x: 210,
    y: 555,
    width: 380,
    height: 60,
    textAlign: "right",
  });
  const shamanGhost = Sprite({
    x: 400,
    y: 200,
    width: 32,
    height: 32,
    opacity: 0.5,
    render: drawShamanGhost,
  })

  const scene = Scene({
    id: "text",
    text: "",
    cullObjects: false,
    width: 800,
    height: 600,
    hasPressedEnter: false,
    isTextDisplayed: function() {
      return this.text !== ''
    },
    displayText: function (str, callback) {
      this.text = str;
      this.callback = callback;
      this.children[1].opacity = 1;
      this.show()
    },

    update: function () {
      this.x = this.parent.camera.x - this.width / 2;
      this.y = this.parent.camera.y - this.height / 2;

      this.children[0].text = this.text;

      if (keyPressed("enter")) {
        this.hasPressedEnter = true
      } else if (this.hasPressedEnter && !keyPressed("enter")) {
        this.hasPressedEnter = false
        this.text = "";
        this.children[1].opacity = 0;
        if (this.callback) {
          const cb = this.callback
          this.callback = null
          cb();
        }
        this.hide()
      }
    },

    render: function () {
      if (!this.text) {
        return;
      }

      this.context.beginPath();
      this.context.fillStyle = "white";
      this.context.strokeStyle = "black";
      this.context.lineWidth = 2;
      this.context.rect(200, 475, 400, 100);
      this.context.fill();
      this.context.stroke();
    },
    children: [content, next, shamanGhost],
  });

  scene.hide()

  return scene
}
