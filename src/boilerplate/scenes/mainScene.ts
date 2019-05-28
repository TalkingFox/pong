import { Wasd } from "../wasd";
import { Score } from "./score";

export class MainScene extends Phaser.Scene {
    private leftPaddle: Phaser.Physics.Arcade.Image;
    private rightPaddle: Phaser.Physics.Arcade.Image;
    private ball: Phaser.GameObjects.GameObject;
    
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: Wasd;
    private score: Score;

    constructor() {
        super({
            key: "MainScene"
        });
        this.score = new Score();
    }

    preload(): void {
        this.load.image("ball", "./src/boilerplate/assets/ball.jpg");
        this.load.image("paddle", "./src/boilerplate/assets/paddle.jpg");
    }

    create(): void {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = new Wasd(this.input);

        this.leftPaddle = this.add['pongPaddle'](100, 300);
        this.rightPaddle = this.add['pongPaddle'](700, 300);
        this.ball = this.add['pongBall'](250, 300);

        this.physics.add.collider(this.ball, [this.leftPaddle, this.rightPaddle]);
        
        Phaser.Actions.Call(
            [this.ball],
            (ball) =>{
                (ball.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;
            },
            null)
        this.physics.world.on('worldbounds', this.onWorldBounds);
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

    onWorldBounds(_body, _blockedUp: boolean, _blockedDown: boolean, blockedLeft: boolean, blockedRight: boolean) {
        if (blockedRight) {
            this.score.Lefty++;
        } else if(blockedLeft) {
            this.score.Righty++;
        }
        
    }
}
