import { Ball } from "../scenes/ball";

export class PongBallPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject(
            'pongBall',
            function(x: number, y: number) {
                const ball = new Ball(this.scene, x, y);
                this.scene.add.existing(ball);
                this.scene.physics.add.existing(ball);
                ball.setCollideWorldBounds(true);
                ball.setVelocityX(200);
                return ball;
            }
        )
    }
}