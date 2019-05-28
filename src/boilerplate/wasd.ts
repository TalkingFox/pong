export class Wasd {
    public constructor(input: Phaser.Input.InputPlugin) {
        const wasd = input.keyboard.addKeys('W,A,S,D') as Wasd;
        this.W = wasd.W;
        this.A = wasd.A;
        this.S = wasd.S;
        this.D = wasd.D;
    }

    public W: Phaser.Input.Keyboard.Key;
    public A: Phaser.Input.Keyboard.Key;
    public S: Phaser.Input.Keyboard.Key;
    public D: Phaser.Input.Keyboard.Key;
}