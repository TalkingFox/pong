import { ConnectView } from "./connect-view";
import * as FoxConnect from 'foxconnect';
import { environment } from "./environment";
import { WaitingView } from "./waiting-view";
import { ReadyToPlay } from "../core/messaging/ready-to-play";
import { Message, MessageType } from "../core/messaging/message";
import { GameView } from "./game-view";
import { ChangePaddlePosition } from "../core/messaging/change-paddle-position";
import { GameIsReady } from "../core/messaging/game-is-ready";

export class ClientApp {
    private connectView: ConnectView;
    private waitingView: WaitingView;
    private gameView: GameView;
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
        this.gameView = new GameView(this.sliderValueChanged.bind(this));
    }

    private joinRoom(roomName: string): void {
        this.connectView.isLoading = true;
        this.foxClient.joinRoom(roomName.trim())
            .then(() => {
                this.connectView.isLoading = false;
                this.connectView.visible = false;
                this.waitingView.visible = true;
            })
            .catch((error: string) => {
                this.connectView.errorMessage = error;
                this.connectView.isLoading = false;
            });
    }

    private readyToPlay(): void {
        const message = new ReadyToPlay();
        this.foxClient.send(message);
    }

    private sliderValueChanged(value: number): void {
        this.foxClient.send(new ChangePaddlePosition(value));
    }

    private onDisconnect(): void {
        alert('Lost connection to the host!');
    }

    private onMessageFailed(): void {
        alert('Failed to send a message!');
    }

    private onMessageReceived(message: string): void {
        const baseMessage = JSON.parse(message) as Message<any>;
        switch (baseMessage.type) {
            case MessageType.GameIsReady:
                const readyMessage = baseMessage as GameIsReady;
                this.waitingView.visible = false;
                this.gameView.PlayerName = readyMessage.body;
                this.gameView.visible = true;
                break;
        }
    }
}