export abstract class Message<T> {
    public abstract type: MessageType;

    constructor(public body: T){}
}

export enum MessageType {
    ReadyToPlay = 'ready-to-play',
}