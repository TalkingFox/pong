import "phaser";
import { PongBallPlugin } from "./plugins/pong-ball-plugin";
import { PongPaddlePlugin } from "./plugins/pong-paddle-plugin";
import { ConnectScene } from "./scenes/connect/connect-scene";
import { MainScene } from "./scenes/main/mainScene";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },    
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    type: Phaser.AUTO,
    scene: ConnectScene,
    plugins: {
        global: [
            { key: 'PongBallPlugin', plugin: PongBallPlugin, start: true },
            { key: 'PongPaddlePlugin', plugin: PongPaddlePlugin, start: true }
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
    game.scene.add('MainScene', MainScene);
});
