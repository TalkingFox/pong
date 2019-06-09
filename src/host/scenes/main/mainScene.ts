import { Wasd } from "../../wasd";
import { ScoreBoard } from "./score";
import { Ball } from "./ball";
import { environment } from "../../environment";
import { GameOver } from "./game-over";
import { MusicMaker } from "../../music-maker";
import { Countdown } from "./countdown";
import * as FoxConnect from 'foxconnect';
import { NetworkState } from "../../network-state";
import { Message, MessageType } from "../../../core/messaging/message";
import { ChangePaddlePosition } from "../../../core/messaging/change-paddle-position";

export class MainScene extends Phaser.Scene {
    private leftPaddle: Phaser.Physics.Arcade.Image;
    private rightPaddle: Phaser.Physics.Arcade.Image;
    private ball: Ball;
    private host: FoxConnect.Host;

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

    init() {
        NetworkState.listen(this.messageReceived.bind(this));
    }

    preload(): void {
        this.load.image("ball", "./src/host/assets/ball.jpg");
        this.load.image("paddle", "./src/host/assets/paddle.jpg");
    }

    create(): void {
        this.score.register(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = new Wasd(this.input);

        this.leftPaddle = this.add['pongPaddle'](100, 300);
        this.rightPaddle = this.add['pongPaddle'](700, 300);
        this.ball = this.add['pongBall'](250, 300);

        this.physics.add.collider(this.ball, [this.leftPaddle, this.rightPaddle], () => {
            this.ball.setVelocityX(this.ball.body.velocity.x * 1.1);
            this.ball.setVelocityY(this.ball.body.velocity.y * 1.1);
            this.ball.setAngularVelocity((this.ball.body as any).angularVelocity * -1.5);
            this.music.Beep();
        });

        Phaser.Actions.Call(
            [this.ball],
            (ball) => {
                (ball.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;
            },
            null)
        this.physics.world.on('worldbounds', this.onWorldBounds.bind(this));
    }

    update(): void {
        this.rightPaddle.setVelocity(0);
        if (this.cursors.up.isDown) {
            this.rightPaddle.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.rightPaddle.setVelocityY(300)
        }

        this.leftPaddle.setVelocity(0);
        if (this.wasd.W.isDown) {
            this.leftPaddle.setVelocityY(-300);
        } else if (this.wasd.S.isDown) {
            this.leftPaddle.setVelocityY(300);
        }
    }

    messageReceived(clientId: string, message: string): void {
        const baseMessage = JSON.parse(message) as Message<any>;
        switch (baseMessage.type) {
            case MessageType.ChangePaddlePosition:
                const positionMessage = baseMessage as ChangePaddlePosition;
                let paddle: Phaser.Physics.Arcade.Image;
                if (clientId == NetworkState.leftyClientId) {
                    paddle = this.leftPaddle;
                } else if (clientId == NetworkState.rightyClientId) {
                    paddle = this.rightPaddle;
                }
                paddle.setPosition(
                    paddle.x,
                    <number>this.game.config.height * positionMessage.body / 100)
                break;
        }
    }

    onWorldBounds(_body, blockedUp: boolean, blockedDown: boolean, blockedLeft: boolean, blockedRight: boolean) {
        if (blockedUp || blockedDown) {
            this.music.Beep();
        }

        if (blockedRight) {
            this.score.Lefty++;
        } else if (blockedLeft) {
            this.score.Righty++;
        }

        if (this.score.HighestScore.value === environment.EndGameScore) {
            this.endGame();
        }

        if (blockedLeft || blockedRight) {
            this.music.OutOfBounds();
            this.ball.stop();
            const countdown = new Countdown();
            countdown.countFrom(3).then(() => {
                this.ball.active = true;
                this.ball.reset();
            });
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
