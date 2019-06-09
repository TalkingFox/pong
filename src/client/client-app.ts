import { ConnectView } from "./connect-view";
import * as FoxConnect from 'foxconnect';
import { environment } from "./environment";
import { WaitingView } from "./waiting-view";
import { ReadyToPlay } from "../core/messaging/ready-to-play";
import { Message } from "../core/messaging/message";

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
        const message = new ReadyToPlay();
        this.foxClient.send(message);
    }

    private onDisconnect(): void {
        alert('Lost connection to the host!');
    }

    private onMessageFailed(): void {
        alert('Failed to send a message!');
    }

    private onMessageReceived(message: string): void {
        console.log(message);
        const baseMessage = JSON.parse(message) as Message<any>;
        console.log(baseMessage);
    }
}