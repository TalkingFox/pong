export class Paddle extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'paddle');
    }
}