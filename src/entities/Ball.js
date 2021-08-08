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

  resetBall() {
    const { physics } = this.scene;
    this.setPosition(400, 250);
    const angle = Phaser.Math.Between(0, 360);
    const vec = physics.velocityFromAngle(angle, 200);

    this.body.setVelocity(vec.x, vec.y);
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
