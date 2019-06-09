import { OverlayElement } from "../core/ui/overlay-element";

export class ConnectView extends OverlayElement {
    private roomNameElement: HTMLInputElement;
    private roomJoinElement: HTMLButtonElement;
    private onRoomJoined: () => void;

    constructor(onRoomJoined: () => void) {
        super('clientConnect');
        this.onRoomJoined = onRoomJoined;
        this.roomNameElement = document.getElementById('roomName') as HTMLInputElement;
        this.roomJoinElement = document.getElementById('roomJoin') as HTMLButtonElement;
        this.roomJoinElement.addEventListener('click', () => {
            this.roomJoinElement.disabled = true;
            this.onRoomJoined();
        });
    }

    public get roomName(): string {
        return this.roomNameElement.value;
    }
}