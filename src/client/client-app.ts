import { ConnectView } from "./connect-view";
import * as FoxConnect from 'foxconnect';
import { environment } from "./environment";

export class ClientApp {
    private connectView: ConnectView;
    private foxClient: FoxConnect.Client;

    constructor() {
        this.connectView = new ConnectView(this.onRoomJoined);
        this.connectView.visible = true;
        this.foxClient = new FoxConnect.Client({
            signalServer: environment.signalServer,
            onDisconnect: this.onDisconnect,
            onMessageFailed: this.onMessageFailed,
            onMessageReceived: this.onMessageReceived
        });
    }

    private onRoomJoined(): void {
        alert('room joined!');
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