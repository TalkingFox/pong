import { OverlayElement } from "../../ui/overlay-element";

export class RoomView extends OverlayElement {
    private roomName: HTMLParagraphElement;

    constructor() {
        super('connectStatus');
        this.roomName = document.getElementById('roomName') as HTMLParagraphElement;
        this.Room = 'Loading...';
    }

    public set Room(value: string) {
        this.roomName.textContent = value;
    }
}