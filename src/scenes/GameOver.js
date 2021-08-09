import Phaser from "phaser";
import { TitleScene } from "../consts/SceneKeys";

export default class GameOver extends Phaser.Scene {
  create({ win = false }) {
    const { add, input } = this;

    document.getElementById("container").style.backgroundColor = "#000";

    add
      .text(400, 200, `${win ? "You Win!" : "Gave Over"}`, {
        fontSize: 44,
      })
      .setOrigin(0.5, 0.5);

    add
      .text(400, 300, "Press Space to Play Again", {
        fontSize: 22,
      })
      .setOrigin(0.5);

    input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(TitleScene);
    });
  }
}
