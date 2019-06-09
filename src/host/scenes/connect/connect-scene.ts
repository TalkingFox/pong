import * as FoxConnect from 'foxconnect';
import { environment } from '../../environment';
import { RoomCreatedResponse } from 'foxconnect/dist/models/roomCreatedResponse';
import { RoomView } from './room-view';
import { Message, MessageType } from '../../../core/messaging/message';
import { GameIsReady } from '../../../core/messaging/game-is-ready';
import { NetworkState } from '../../network-state';

export class ConnectScene extends Phaser.Scene {
    private host: FoxConnect.Host;
    private roomView: RoomView;

    private leftyIsReady: boolean = false;
    private rightyIsReady: boolean = false;

    constructor() {
        super({
            key: 'ConnectScene'
        });
        this.roomView = new RoomView();
        this.roomView.visible = true;

        this.host = new FoxConnect.Host({
            signalServer: environment.signalServer,
            onClientDisconnected: (clientId: string) => this.onClientDisconnected(clientId),
            onGuestJoined: (clientId: string) => this.guestJoined(clientId),
            onMessageReceived: (clientId: string, message: string) => NetworkState.intercept(clientId, message),
            onMessageFailed: (client: string, error: any) => {
                this.host.kickGuest(client);
            }
        });
        NetworkState.listen(this.messageReceived.bind(this));
    }

    preload(): void { }

    create(): void {
        this.host.createRoom()
            .then((response: RoomCreatedResponse) => {
                this.roomView.room = response.room;
            });
    }

    update(): void {
        if (NetworkState.leftyClientId && NetworkState.rightyClientId) {
            this.roomView.startGameButton.disabled = false;
        }

        if (this.leftyIsReady && this.rightyIsReady) {
            this.roomView.visible = false;
            this.host.sendTo(NetworkState.leftyClientId, new GameIsReady('Lefty'));
            this.host.sendTo(NetworkState.rightyClientId, new GameIsReady('Righty'));
            this.scene.start('MainScene', this.host);
        }
    }

    private onClientDisconnected(clientId: string): void {
        if (clientId == NetworkState.leftyClientId) {
            this.roomView.lefty = 'Waiting for a Lefty';
            NetworkState.leftyClientId = null;
        }

        if (clientId == NetworkState.rightyClientId) {
            this.roomView.righty = 'Waiting for a Righty';
            NetworkState.rightyClientId = null;
        }
    }

    private guestJoined(clientId: string): void {
        if (!NetworkState.leftyClientId) {
            NetworkState.leftyClientId = clientId;
            this.roomView.lefty = 'A Lefty has joined!';
            return;
        }

        if (!NetworkState.rightyClientId) {
            NetworkState.rightyClientId = clientId;
            this.roomView.righty = 'A Righty has joined!';
            return;
        }
    }

    private messageReceived(clientId: string, message: string): void {
        const baseMessage = JSON.parse(message) as Message<any>;
        switch (baseMessage.type) {
            case MessageType.ReadyToPlay:
                if (NetworkState.leftyClientId == clientId) {
                    this.leftyIsReady = true;
                    this.roomView.lefty = 'Left is ready to play!';
                }
                if (NetworkState.rightyClientId == clientId) {
                    this.rightyIsReady = true;
                    this.roomView.righty = 'Righty is ready to play!'
                }
                break;
            case MessageType.ChangePaddlePosition:

        }
    }
}