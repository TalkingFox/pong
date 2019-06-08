import * as FoxConnect from 'foxconnect';
import { environment } from '../../environment';
import { RoomCreatedResponse } from 'foxconnect/dist/models/roomCreatedResponse';
import { RoomView } from './room-view';

export class ConnectScene extends Phaser.Scene {
    private host: FoxConnect.Host;
    private roomView: RoomView;

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
                this.roomView.Room = response.room;
            });
    }

    private onClientDisconnected(clientId: string): void {

    }

    private guestJoined(clientId: string): void {
    }

    private messageReceived(clientId: string, message: string): void {

    }
}