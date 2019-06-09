import * as FoxConnect from 'foxconnect';
import { environment } from '../../environment';
import { RoomCreatedResponse } from 'foxconnect/dist/models/roomCreatedResponse';
import { RoomView } from './room-view';
import { Message, MessageType } from '../../../core/messaging/message';
import { MainScene } from '../main/mainScene';

export class ConnectScene extends Phaser.Scene {
    private host: FoxConnect.Host;
    private roomView: RoomView;

    private leftyClientId: string;
    private rightyClientId: string;

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
            onMessageReceived: (clientId: string, message: string) => this.messageReceived(clientId, message),
            onMessageFailed: (client: string, error: any) => {
                console.log('message failed');
                this.host.kickGuest(client);
            }
        });
    }

    preload(): void { }

    create(): void {
        this.host.createRoom()
            .then((response: RoomCreatedResponse) => {
                this.roomView.room = response.room;
            });
    }

    update(): void {
        if (this.leftyClientId && this.rightyClientId) {
            this.roomView.startGameButton.disabled = false;
        }

        if (this.leftyIsReady && this.rightyIsReady) {
            this.roomView.visible = false;
            this.scene.start('MainScene');
        }
    }

    private onClientDisconnected(clientId: string): void {
        if (clientId == this.leftyClientId) {
            this.roomView.lefty = 'Waiting for a Lefty';
            this.leftyClientId = null;
        }

        if (clientId == this.rightyClientId) {
            this.roomView.righty = 'Waiting for a Righty';
            this.rightyClientId = null;
        }
    }

    private guestJoined(clientId: string): void {
        if (!this.leftyClientId) {
            this.leftyClientId = clientId;
            this.roomView.lefty = 'A Lefty has joined!';
            return;
        }
        
        if (!this.rightyClientId) {
            this.rightyClientId = clientId;
            this.roomView.righty = 'A Righty has joined!';
            return;
        }
    }

    private messageReceived(clientId: string, message: string): void {
        console.log(message);
        const baseMessage = JSON.parse(message) as Message<any>;
        console.log(baseMessage);

        switch(baseMessage.type) {
            case MessageType.ReadyToPlay: 
                if (this.leftyClientId == clientId) {
                    this.leftyIsReady = true;
                }
                if (this.rightyClientId == clientId) {
                    this.rightyIsReady = true;
                }
                console.log('someone is ready')
                break;
            default: 
                alert('fuck');
        }
    }
}