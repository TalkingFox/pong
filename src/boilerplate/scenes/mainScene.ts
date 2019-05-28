import { Wasd } from "../wasd";

export class MainScene extends Phaser.Scene {
    private leftPaddle: Phaser.Physics.Arcade.Image;
    private rightPaddle: Phaser.Physics.Arcade.Image;
    private ball: Phaser.Physics.Arcade.Sprite;
    
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private wasd: Wasd;


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
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = new Wasd(this.input);

        this.leftPaddle = this.physics.add.image(400, 300, "paddle");
        this.leftPaddle.setCollideWorldBounds(true);
        
        this.rightPaddle = this.physics.add.sprite(100, 300, 'paddle');
        this.rightPaddle.setCollideWorldBounds(true)
        
        this.ball = this.physics.add.sprite(250, 300, 'ball');
        this.ball.setCollideWorldBounds(true);
    }

    update(): void {
        this.leftPaddle.setVelocity(0);
        if (this.cursors.up.isDown) {
            this.leftPaddle.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.leftPaddle.setVelocityY(300)
        }

        this.rightPaddle.setVelocity(0);
        if (this.wasd.W.isDown) {
            this.rightPaddle.setVelocityY(-300);
        } else if (this.wasd.S.isDown) {
            this.rightPaddle.setVelocityY(300);
        }
    }
}
