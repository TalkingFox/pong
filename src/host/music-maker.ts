import Tone = require("tone");

export class MusicMaker {
    private synth: Tone.Synth;
    private readonly boops: string[] = [
        'C4','G4'
    ]
    private boopIndex: number = 0;

    constructor() {
        this.synth = new Tone.Synth().toMaster();
    }

    public Beep(): void {
        this.synth.triggerAttackRelease(this.boops[this.boopIndex], '4n');
        this.boopIndex++;
        this.boopIndex %= this.boops.length;
    }

    public OutOfBounds(): void {
        this.synth.triggerAttackRelease('C3', '2n');
    }
}