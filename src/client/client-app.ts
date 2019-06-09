import { ConnectView } from "./connect-view";
import * as FoxConnect from 'foxconnect';
import { environment } from "./environment";
import { WaitingView } from "./waiting-view";

export class ClientApp {
    private connectView: ConnectView;
    private waitingView: WaitingView;
    private foxClient: FoxConnect.Client;

    constructor() {
        this.foxClient = new FoxConnect.Client({
            signalServer: environment.signalServer,
            onDisconnect: this.onDisconnect.bind(this),
            onMessageFailed: this.onMessageFailed.bind(this),
            onMessageReceived: this.onMessageReceived.bind(this)
        });
        this.connectView = new ConnectView(this.joinRoom.bind(this));
        this.connectView.visible = true;

        this.waitingView = new WaitingView(this.readyToPlay.bind(this));
    }

    private joinRoom(roomName: string): void {
        this.connectView.isLoading = true;
        this.foxClient.joinRoom(roomName.trim()).then(() => {
            this.connectView.isLoading = false;
            this.connectView.visible = false;
            this.waitingView.visible = true;
        });
    }

    private readyToPlay(): void {
        alert('Are you ready, MR Krabs?');
    }

    private onDisconnect(): void {
        alert('Lost connection to the host!');
    }

    private onMessageFailed(): void {
        alert('Failed to send a message!');
    }

    private onMessageReceived(message: string): void {
        alert('Message received: ' + message);
    }
}