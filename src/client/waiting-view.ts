import { OverlayElement } from "../core/ui/overlay-element";

export class WaitingView extends OverlayElement {
    private goodToStartElement: HTMLInputElement;
    private loaderElement: HTMLDivElement;
    private clientGoodMessage: HTMLLabelElement;

    constructor(onReady: () => void) {
        super('clientWaiting');
        this.goodToStartElement = document.getElementById('clientGoodToStart') as HTMLInputElement;
        this.loaderElement = document.getElementById('waiting-loader') as HTMLDivElement;
        this.clientGoodMessage = document.getElementById('clientGoodMessage') as HTMLLabelElement;

        this.goodToStartElement.addEventListener('click', () => {
            this.loaderElement.classList.remove('hidden');
            this.clientGoodMessage.classList.remove('hidden');
            onReady();
        });
    }
}