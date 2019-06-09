import { Message, MessageType } from "./message";

export class GameIsReady extends Message<string> {
    constructor(playerName: string) {
        super(playerName);
    }

    public readonly type: MessageType = MessageType.GameIsReady;
}