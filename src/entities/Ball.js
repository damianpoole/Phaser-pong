import Phaser from "phaser";
import * as Colors from "../consts/Colors";

export default class Ball extends Phaser.GameObjects.Arc {
  /**
   * @type {Phaser.Physics.Arcade.Body}
   */
  body;

  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    super(scene, 400, 250, 10, 0, 360, false, Colors.white, 1);

    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(10);

    this.body.setCollideWorldBounds(true, 1, 1);

    this.body.setBounce(1, 1);

    return this;
  }

  get inLeftScoreZone() {
    return this.x < -30;
  }

  get inRightScoreZone() {
    return this.x > 830;
  }

  get isTrackable() {
    return this.x > 200;
  }

  resetBall() {
    const { physics } = this.scene;
    this.setPosition(400, 250);
    const possibleAngles = [
      Phaser.Math.Between(30, 70),
      Phaser.Math.Between(110, 155),
      Phaser.Math.Between(205, 250),
      Phaser.Math.Between(290, 340),
    ];
    const angle = possibleAngles[Math.abs(Phaser.Math.Between(0, 3))];

    const vec = physics.velocityFromAngle(angle, 300);

    this.body.setVelocity(vec.x, vec.y);
    this.body.setMaxSpeed(500);
  }

  increaseSpeed() {
    const { body } = this;

    body.setVelocity((body.velocity.x *= 1.07), (body.velocity.y *= 1.07));
  }

  update() {
    if (this.inLeftScoreZone) {
      this.resetBall();
    }

    if (this.inRightScoreZone) {
      this.resetBall();
    }
  }
}
