import "phaser";
import { MainScene } from "./scenes/mainScene";
import { PongBallPlugin } from "./plugins/pong-ball-plugin";
import { PongPaddlePlugin } from "./plugins/pong-paddle-plugin";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  plugins: {  
    global: [
        {key: 'PongBallPlugin', plugin: PongBallPlugin, start: true},
        {key: 'PongPaddlePlugin', plugin: PongPaddlePlugin, start: true}
    ]
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }

  init() {
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new Game(config);
});
