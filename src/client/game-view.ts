import { OverlayElement } from "../core/ui/overlay-element";

export class GameView extends OverlayElement {
    constructor(sliderValueChanged: (value: number) => void) {
        super('clientControl');
        const sliderElement = document.getElementById('clientSlider') as HTMLInputElement;
        sliderElement.addEventListener('input', () => {
            const reversedValue = Math.abs(100 - +sliderElement.value);
            sliderValueChanged(reversedValue);
        });
    }
}