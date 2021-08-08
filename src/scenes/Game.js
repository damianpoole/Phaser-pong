import Phaser from "phaser";
import Ball from "../entities/Ball";
import Paddle from "../entities/Paddle";
import { GameBackground } from "../consts/SceneKeys";
import * as Colors from "../consts/Colors";

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

  preload() {}

  create() {
    const { player, cpu, add } = this;

    this.scene.run(GameBackground);
    this.scene.sendToBack(GameBackground);

    this.physics.world.setBounds(-100, 0, 1000, 500);

    this.ball = new Ball(this);
    player.entity = new Paddle(this);
    cpu.entity = new Paddle(this, true);

    this.physics.add.collider(player.entity, this.ball);
    this.physics.add.collider(cpu.entity, this.ball);

    this.ball.resetBall();

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
  }

  update() {
    const { player, cpu } = this;

    player.entity.update(this.cursors, this.ball);
    cpu.entity.update(this.cursors, this.ball);

    this.calculateScore();

    this.ball.update();
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
}
