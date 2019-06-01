import { OverlayElement } from "../ui/overlay-element";

export class Countdown extends OverlayElement {
    private counterElement: HTMLParagraphElement;
    private _counter: number;
    
    private get counter(): number {
        return this._counter;
    }
    private set counter(value: number) {
        this._counter = value;
        this.counterElement.textContent = value.toString();
    }


    public constructor() {
        super('countdown');
        this.counterElement = document.getElementById('countdownCounter') as HTMLParagraphElement;
    }

    public countFrom(numberInSeconds: number): Promise<void> {
        this.visible = true;
        const promise = new Promise<void>((resolve, reject) => {
            this.counter = numberInSeconds;
            const interval = setInterval(() => {
                this.counter--;
                this.counterElement.textContent = this.counter.toString();
                if (this.counter === 0) {
                    clearInterval(interval);
                    this.visible = false;
                    resolve();
                }
            }, 1000);
        });
        return promise;
    }
}