import Phaser from "phaser";
import TitleScene from "./scenes/TitleScene";
import Game from "./scenes/Game";
import GameBackground from "./scenes/GameBackground";
import GameOver from "./scenes/GameOver";
import * as SceneKeys from "./consts/SceneKeys";

const config = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  parent: "container",
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};

document.getElementById("container").style.width = "800px";
document.getElementById("container").style.backgroundColor = "#000";

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.TitleScene, TitleScene);
game.scene.add(SceneKeys.Game, Game);
game.scene.add(SceneKeys.GameBackground, GameBackground);
game.scene.add(SceneKeys.GameOver, GameOver);

game.scene.start(SceneKeys.TitleScene);
