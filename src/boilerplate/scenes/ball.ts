import { environment } from "../environment";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    private startingPosition: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ball');
        this.startingPosition = new Phaser.Math.Vector2(x, y);
    }

    public initialize(): void {
        this.setCollideWorldBounds(true);
        this.setMaxVelocity(environment.MaxBallVelocity);
        this.setBounce(1);
        this.reset();
    }

    public reset(): void {
        this.visible = true;
        const directionX = (Math.random() >= 0.5) ?
            1 :
            -1;
        const directionY = (Math.random() >= 0.5) ?
            1 :
            -1;
        const angle = Math.floor(Math.random() * environment.StartingBallVelocity + 1);

        this.setAngularVelocity(10);
        this.setVelocityX(directionX * environment.StartingBallVelocity);
        this.setVelocityY(directionY * angle);
        this.setPosition(this.startingPosition.x, this.startingPosition.y);
    }

    public stop(): void {
        this.setVelocity(0,0);
        this.visible = false;
    }
}