export class MainScene extends Phaser.Scene {
    private player1: Phaser.GameObjects.Sprite;
    private player2: Phaser.GameObjects.Sprite;
    private ball: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        this.load.image("ball", "./src/boilerplate/assets/ball.jpg");
        this.load.image("paddle", "./src/boilerplate/assets/paddle.jpg");
    }

    create(): void {
        this.physics.world
        this.player1 = this.add.sprite(400, 300, "paddle");
        this.player2 = this.add.sprite(100, 300, 'paddle');
        this.ball = this.add.sprite(250, 300, 'ball');
    }
}
