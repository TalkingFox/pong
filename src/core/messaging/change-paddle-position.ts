import { Message, MessageType } from "./message";

export class ChangePaddlePosition extends Message<number> {
    constructor(value: number) {
        super(value);
    }

    public readonly type: MessageType = MessageType.ChangePaddlePosition;
}