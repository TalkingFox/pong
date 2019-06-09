import { Message, MessageType } from "./message";

export class ReadyToPlay extends Message<void> {
    public readonly type: MessageType = MessageType.ReadyToPlay;

    constructor() {
        super();
    }
}