export class Ball extends Phaser.Physics.Arcade.Sprite {
    private startingPosition: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ball');
        this.startingPosition = new Phaser.Math.Vector2(x, y);
    }

    public initiailize(): void {
        this.setCollideWorldBounds(true);
        this.setMaxVelocity(1000);
        this.setBounce(1);
        this.setVelocityX(250);
        this.setPosition(this.startingPosition.x, this.startingPosition.y);
    }

    public reset(): void {
        this.setVelocityX(250);
        this.setPosition(this.startingPosition.x, this.startingPosition.y);
    }
}