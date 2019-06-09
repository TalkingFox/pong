import { Message, MessageType } from "./message";

export class GameIsReady extends Message<void> {
    constructor() {
        super();
    }

    public readonly type: MessageType = MessageType.GameIsReady;
}