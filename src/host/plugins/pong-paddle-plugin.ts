import { Paddle } from "../scenes/main/paddle";

export class PongPaddlePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject(
            'pongPaddle',
            function(x: number, y: number) {
                const paddle = new Paddle(this.scene, x, y);
                this.scene.add.existing(paddle);
                this.scene.physics.add.existing(paddle);
                paddle.setCollideWorldBounds(true);
                paddle.setImmovable(true);
                return paddle;
            }
        )
    }
}