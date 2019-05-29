export class Score {
    private leftScore: number;
    public get Lefty(): number {
        return this.leftScore;
    }
    public set Lefty(score: number) {
        this.leftScore = score;
        this.leftText.setText('Lefty: ' + this.leftScore);
    }

    private rightScore: number;
    public get Righty(): number {
        return this.rightScore;
    }
    public set Righty(score: number) {
        this.rightScore = score;
        this.rightText.setText('Righty: ' + this.rightScore);
    }

    private leftText: Phaser.GameObjects.Text;
    private rightText: Phaser.GameObjects.Text;
    
    public register(scene: Phaser.Scene): void {
        this.leftText = scene.add.text(0, 0, '');
        this.rightText = scene.add.text(700, 0, '');
        this.Lefty = 0;
        this.Righty = 0;
    }
}