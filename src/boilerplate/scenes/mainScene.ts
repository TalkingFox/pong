import { Wasd } from "../wasd";
import { ScoreBoard } from "./score";
import { Ball } from "./ball";
import { environment } from "../environment";
import { GameOver } from "./game-over";
import { MusicMaker } from "../music-maker";

export class MainScene extends Phaser.Scene {
    private leftPaddle: Phaser.Physics.Arcade.Image;
    private rightPaddle: Phaser.Physics.Arcade.Image;
    private ball: Ball;
    
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: Wasd;
    private score: ScoreBoard;

    private music: MusicMaker;

    private gameOver: GameOver;

    constructor() {
        super({
            key: "MainScene"
        });
        this.score = new ScoreBoard();
        this.gameOver = new GameOver();
        this.music = new MusicMaker();
    }

    preload(): void {
        this.load.image("ball", "./src/boilerplate/assets/ball.jpg");
        this.load.image("paddle", "./src/boilerplate/assets/paddle.jpg");
    }

    create(): void {
        this.score.register(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = new Wasd(this.input);

        this.leftPaddle = this.add['pongPaddle'](100, 300);
        this.rightPaddle = this.add['pongPaddle'](700, 300);
        this.ball = this.add['pongBall'](250, 300);

        this.physics.add.collider(this.ball, [this.leftPaddle, this.rightPaddle],() => {
            this.ball.setVelocityX(this.ball.body.velocity.x * 1.1);
            this.ball.setVelocityY(this.ball.body.velocity.y * 1.1);
            this.ball.setAngularVelocity((this.ball.body as any).angularVelocity * -1.5);
            this.music.Beep();
        });
        
        Phaser.Actions.Call(
            [this.ball],
            (ball) =>{
                (ball.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;
            },
            null)
        this.physics.world.on('worldbounds', this.onWorldBounds.bind(this));
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
        
        if (this.score.HighestScore.value === environment.EndGameScore) {
            this.endGame();
        }

        if (blockedLeft || blockedRight) {
            this.ball.reset();
        }
    }

    endGame(): void {
        this.ball.visible = false;
        this.scene.pause();
        var gameOver = new GameOver();
        gameOver.display(this.score.HighestScore.player).then(() => {
            gameOver.dispose();
            this.scene.restart()
        });
    }
}
