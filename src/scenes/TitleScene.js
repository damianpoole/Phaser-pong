import Phaser from "phaser";
import { Game } from "../consts/SceneKeys";
import { Easy, Medium, Hard } from "../consts/Difficulty";

export default class TitleScene extends Phaser.Scene {
  difficulty = Easy;
  difficultyDisplay;

  create() {
    const { add, input } = this;

    add
      .text(400, 200, "Phaser Pong", {
        fontSize: 44,
      })
      .setOrigin(0.5, 0.5);

    add
      .text(400, 300, "Press Space to Start", {
        fontSize: 22,
      })
      .setOrigin(0.5);

    add
      .text(400, 340, "< > To Change Difficulty", {
        fontSize: 22,
      })
      .setOrigin(0.5);

    this.difficultyDisplay = add
      .text(400, 380, `${this.difficulty}`, {
        fontFamily: "sans-serif",
        fontSize: 22,
        color: "#333",
      })
      .setOrigin(0.5);

    input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(Game, this.difficulty);
    });

    input.keyboard.on("keydown-RIGHT", this.increaseDifficulty, this);

    input.keyboard.on("keydown-LEFT", this.decreaseDifficulty, this);
  }

  increaseDifficulty() {
    const { difficulty, difficultyDisplay } = this;

    if (difficulty === Hard) return;

    if (difficulty === Easy) {
      this.difficulty = Medium;
      difficultyDisplay.text = Medium;
    }

    if (difficulty === Medium) {
      this.difficulty = Hard;
      difficultyDisplay.text = Hard;
    }
  }

  decreaseDifficulty() {
    const { difficulty, difficultyDisplay } = this;

    if (difficulty === Easy) return;

    if (difficulty === Hard) {
      this.difficulty = Medium;
      difficultyDisplay.text = Medium;
    }

    if (difficulty === Medium) {
      this.difficulty = Easy;
      difficultyDisplay.text = Easy;
    }
  }
}
