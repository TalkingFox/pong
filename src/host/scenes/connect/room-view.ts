import { OverlayElement } from "../../../core/ui/overlay-element";

export class RoomView extends OverlayElement {
    private roomName: HTMLParagraphElement;
    private leftyElement: HTMLParagraphElement;
    private rightyElement: HTMLParagraphElement;
    public startGameButton: HTMLButtonElement;

    constructor() {
        super('connectStatus');
        this.roomName = document.getElementById('roomName') as HTMLParagraphElement;
        this.room = 'Loading...';

        this.leftyElement = document.getElementById('lefty') as HTMLParagraphElement;
        this.lefty = 'Waiting for a lefty to join';

        this.rightyElement = document.getElementById('righty') as HTMLParagraphElement;
        this.righty = 'Waiting for a righty to join';

        this.startGameButton = document.getElementById('startGame') as HTMLButtonElement;
    }

    public set room(value: string) {
        this.roomName.textContent = value;
    }

    public set lefty(value: string) {
        this.leftyElement.textContent = value;
    }

    public set righty(value: string) {
        this.rightyElement.textContent = value;
    }
}