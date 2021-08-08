import Phaser from "phaser";
import Ball from "../entities/Ball";
import Paddle from "../entities/Paddle";
import { GameBackground } from "../consts/SceneKeys";
import { Easy, Medium, Hard } from "../consts/Difficulty";

export default class Game extends Phaser.Scene {
  /**
   * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors
   */
  cursors;

  /**
   * @type {{ entity: Paddle, score: number, display: Phaser.GameObjects.Text }}
   */
  player = {
    entity: undefined,
    score: 0,
    display: undefined,
  };

  /**
   * @type {{ entity: Paddle, score: number, display: Phaser.GameObjects.Text }}
   */
  cpu = {
    entity: undefined,
    score: 0,
    display: undefined,
  };

  frameTime = 0;
  cpuTime = 0;

  difficulty;

  preload() {}

  create(difficulty) {
    const { player, cpu, add } = this;

    this.difficulty = difficulty;

    this.scene.run(GameBackground);
    this.scene.sendToBack(GameBackground);

    this.physics.world.setBounds(-100, 0, 1000, 500);

    this.ball = new Ball(this);
    player.entity = new Paddle(this);
    cpu.entity = new Paddle(this, true);

    this.physics.add.collider(
      player.entity,
      this.ball,
      this.insreaseBallSpeed,
      undefined,
      this
    );
    this.physics.add.collider(
      cpu.entity,
      this.ball,
      this.insreaseBallSpeed,
      undefined,
      this
    );

    player.display = add
      .text(300, 125, "0", {
        color: "#fff",
        fontSize: "42px",
      })
      .setOrigin(0.5);

    cpu.display = add
      .text(500, 375, "0", {
        color: "#fff",
        fontSize: "42px",
      })
      .setOrigin(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();

    // start the game
    this.time.delayedCall(1200, () => {
      this.ball.resetBall();
    });
  }

  update(time, delta) {
    this.frameTime += delta;
    this.cpuTime += delta;

    const cpuReaction = {
      [Easy]: 33,
      [Medium]: 25,
      [Hard]: 19,
    };

    const { player, cpu } = this;

    if (this.frameTime > 16.5) {
      this.frameTime = 0;
      player.entity.update(this.cursors, this.ball);
      this.calculateScore();

      this.ball.update();
    }

    if (this.cpuTime > cpuReaction[this.difficulty]) {
      this.cpuTime = 0;
      cpu.entity.update(this.cursors, this.ball);
    }
  }

  calculateScore() {
    const { ball, player, cpu } = this;

    if (ball.inLeftScoreZone) {
      cpu.score++;
      cpu.display.setText(cpu.score);
    }

    if (ball.inRightScoreZone) {
      player.score++;
      player.display.setText(`${player.score}`);
    }
  }

  insreaseBallSpeed() {
    this.ball.increaseSpeed();
  }
}
