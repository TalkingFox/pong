import { OverlayElement } from "../core/ui/overlay-element";

export class ConnectView extends OverlayElement {
    private roomNameElement: HTMLInputElement;
    private roomJoinElement: HTMLButtonElement;
    private joinRoom: (room: string) => void;
    private spinner: HTMLDivElement;    

    constructor(joinRoom: (room: string) => void) {
        super('clientConnect');
        this.joinRoom = joinRoom;
        this.roomNameElement = document.getElementById('roomName') as HTMLInputElement;
        this.roomJoinElement = document.getElementById('roomJoin') as HTMLButtonElement;
        this.spinner = document.getElementById('circle-loader') as HTMLDivElement;
        this.roomJoinElement.addEventListener('click', () => {
            this.roomJoinElement.disabled = true;
            this.joinRoom(this.roomName);
        });
    }

    public get roomName(): string {
        return this.roomNameElement.value;
    }

    public set isLoading(value: boolean) {
        if (value === true) {
            this.spinner.classList.remove('hidden');
        } else {
            this.spinner.classList.add('hidden');
        }
    }
}