import { OverlayElement } from "../core/ui/overlay-element";

export class ConnectView extends OverlayElement {
    private roomNameElement: HTMLInputElement;
    private roomJoinElement: HTMLButtonElement;
    private joinRoom: (room: string) => void;
    private spinner: HTMLDivElement;
    private errorElement: HTMLParagraphElement;

    constructor(joinRoom: (room: string) => void) {
        super('clientConnect');
        this.joinRoom = joinRoom;
        this.roomNameElement = document.getElementById('roomName') as HTMLInputElement;
        this.roomJoinElement = document.getElementById('roomJoin') as HTMLButtonElement;
        this.spinner = document.getElementById('circle-loader') as HTMLDivElement;
        this.errorElement = document.getElementById('errorMessage') as HTMLParagraphElement;
        this.roomJoinElement.addEventListener('click', () => {
            this.errorMessage = null;
            this.joinRoom(this.roomName);
        });
    }

    public get roomName(): string {
        return this.roomNameElement.value;
    }

    public set errorMessage(value: string) {
        this.errorElement.textContent = value;
        if (value) {
            this.errorElement.classList.remove('hidden');
        } else {
            this.errorElement.classList.add('hidden');
        }
    }

    public set isLoading(value: boolean) {
        if (value === true) {
            this.roomJoinElement.disabled = true;
            this.spinner.classList.remove('hidden');
        } else {
            this.roomJoinElement.disabled = false;
            this.spinner.classList.add('hidden');
        }
    }
}