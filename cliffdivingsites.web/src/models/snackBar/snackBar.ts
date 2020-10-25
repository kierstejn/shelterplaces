export interface SnackBarMessage {
    message: string
    messageType: MessageTypes
}

export enum MessageTypes {
    Success,
    Info,
    Warning,
    Error
}