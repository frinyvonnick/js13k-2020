import { Scene, keyPressed, Text } from "kontra";
import * as Sky from "../entities/Sky";
import { CPlayer } from "../utils/sound";
import { song } from "../utils/song";

const player = new CPlayer();
player.init(song);

export function makeSplashScreenScene({ onStart }) {
  const splashScreenTitle = Text({
    text: "Pataplateforme",
    font: "64px Arial",
    color: "black",
    x: 400,
    y: 200,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
  });

  const splashScreenText = Text({
    text: "Loading...",
    font: "24px Arial",
    color: "black",
    x: 400,
    y: 500,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
  });

  const splashScreenBackground = Sky.makeEntity({
    color: "#e3f0db",
    lightColor: "#f9fcf8",
    width: 800,
    height: 600,
    x: 400,
    y: 300,
    anchor: { x: 0.5, y: 0.5 },
  });
  return Scene({
    isGameStarted: false,
    isMusicGenerated: false,
    children: [splashScreenBackground, splashScreenText, splashScreenTitle],
    update: function () {
      if (!this.isMusicGenerated) {
        this.isMusicGenerated = player.generate() >= 1;
      }

      if (this.isMusicGenerated && !this.isGameStarted) {
        splashScreenText.text = "Press start to begin";
      }

      if (!this.isGameStarted && keyPressed("enter")) {
        const wave = player.createWave();
        const audio = document.createElement("audio");
        audio.loop = true;
        audio.src = URL.createObjectURL(
          new Blob([wave], { type: "audio/wav" })
        );
        audio.volume = 0.4;
        audio.play();
        this.isGameStarted = true;
        onStart();
      }
    },
  });
}
