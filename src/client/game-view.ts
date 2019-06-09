import { OverlayElement } from "../core/ui/overlay-element";

export class GameView extends OverlayElement {
    private playerNameElement: HTMLSpanElement;

    constructor(sliderValueChanged: (value: number) => void) {
        super('clientControl');
        const sliderElement = document.getElementById('clientSlider') as HTMLInputElement;
        sliderElement.addEventListener('input', () => {
            const reversedValue = Math.abs(100 - +sliderElement.value);
            sliderValueChanged(reversedValue);
        });

        this.playerNameElement = document.getElementById('playerName') as HTMLSpanElement;
    }

    public set PlayerName(name: string) {
        this.playerNameElement.textContent = name;
    }
}