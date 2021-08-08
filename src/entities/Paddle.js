import Phaser from "phaser";
import Ball from "./Ball";
import * as Colors from "../consts/Colors";

export default class Paddle extends Phaser.GameObjects.Rectangle {
  cpu = false;
  movementVelocity = new Phaser.Math.Vector2(0, 0);

  /**
   * @type {Phaser.Physics.Arcade.Body}
   */
  body;

  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene, cpu) {
    super(scene, cpu ? 750 : 50, 250, 30, 100, Colors.white, 1);

    if (cpu) this.cpu = cpu;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    return this;
  }

  /**
   *
   * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors
   * @param {Ball} ball
   */
  update(cursors, ball) {
    if (!this.cpu) this.movePlayer(cursors);
    if (this.cpu) this.moveCpu(ball);
  }

  movePlayer(cursors) {
    if (cursors.up.isDown) this.y -= 10;
    if (cursors.down.isDown) this.y += 10;

    this.body.updateFromGameObject();
  }

  /**
   *
   * @param {Ball} ball
   */
  moveCpu(ball) {
    const diff = ball.y - this.y;
    const { movementVelocity } = this;
    const speed = 3;

    if (Math.abs(diff) < 10) return;

    if (diff < 0) {
      movementVelocity.y = -speed;
      if (movementVelocity.y < -10) {
        movementVelocity.y = -10;
      }
    } else if (diff > 0) {
      movementVelocity.y = speed;
      if (movementVelocity.y > 10) {
        movementVelocity.y = 10;
      }
    }

    this.y += this.movementVelocity.y;
    this.body.updateFromGameObject();
  }
}
